import db from "@/lib/db";
import { getMonth, format, startOfYear, endOfMonth, isToday } from "date-fns";
import { daysOfWeek } from "..";
import { $Enums } from "@/lib/generated/prisma";


type AppointmentStatus = "PENDING" | "SCHEDULED" | "COMPLETED" | "CANCELLED";

interface Appointment {
  id: number;
  status: $Enums.AppointmentStatus;
  appointmentDate: Date;
  patient: {
    first_name: string;
    last_name: string;
    date_of_birth: Date;
    gender: $Enums.GENDER;
    img: string | null;
  };
  doctor: {
    name: string;
    id: string;
    img: string | null;
    specialization: string;
  };
}

function isValidStatus(status: string): status is AppointmentStatus {
  return ["PENDING", "SCHEDULED", "COMPLETED", "CANCELLED"].includes(status);
}

const initializeMonthlyData = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  return Array.from({ length: currentMonth + 1 }, (_, index) => ({
    name: format(new Date(currentYear, index), "MMM"),
    appointment: 0,
    completed: 0,
  }));
};

export const processAppointments = (appointments: Appointment[]) => {
  const monthlyData = initializeMonthlyData();
  const currentYearStart = startOfYear(new Date());
  const currentMonthEnd = endOfMonth(new Date());

  const appointmentCounts = appointments.reduce<
    Record<AppointmentStatus, number>
  >(
    (acc, appointment) => {
      const status = appointment.status;
      const appointmentDate = new Date(appointment.appointmentDate);
      const monthIndex = getMonth(appointmentDate);

      // Count monthly appointments
      if (
        appointmentDate >= currentYearStart &&
        appointmentDate <= currentMonthEnd
      ) {
        monthlyData[monthIndex].appointment += 1;
        if (status === "COMPLETED") {
          monthlyData[monthIndex].completed += 1;
        }
      }

      // Count by status
      if (isValidStatus(status)) {
        acc[status] = (acc[status] || 0) + 1;
      }

      return acc;
    },
    {
      PENDING: 0,
      SCHEDULED: 0,
      COMPLETED: 0,
      CANCELLED: 0,
    }
  );

  return { appointmentCounts, monthlyData };
};

export async function getPatientDashboardStatistics(id: string) {
  try {
    if (!id) {
      return {
        success: false,
        message: "No data found",
        data: null,
      };
    }

    const data = await db.patient.findUnique({
      where: { id },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        gender: true,
        img: true,
      },
    });

    if (!data) {
      return {
        success: false,
        message: "Patient data not found",
        status: 200,
        data: null,
      };
    }

    const appointments = await db.appointment.findMany({
      where: { patient_id: data?.id },
      include: {
        doctor: {
          select: {
            id: true,
            name: true,
            img: true,
            specialization: true,
          },
        },
        patient: {
          select: {
            first_name: true,
            last_name: true,
            gender: true,
            date_of_birth: true,
            img: true,
          },
        },
      },

      orderBy: { appointmentDate: "desc" },
    });

    const { appointmentCounts, monthlyData } = await processAppointments(
      appointments
    );
    const last5Records = appointments.slice(0, 5);

    const today = daysOfWeek[new Date().getDay()];

 const availableDoctor = await db.doctor.findMany({
  select: {
    id: true,
    name: true,
    specialization: true,
    img: true,
  },
  take: 4,
});

    console.log(availableDoctor);
    return {
      success: true,
      data,
      appointmentCounts,
      last5Records,
      totalAppointments: appointments.length,
      availableDoctor,
      monthlyData,
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal Server Error", status: 500 };
  }
}

export async function getPatientById(id: string) {
  try {
    const patient = await db.patient.findUnique({
      where: { id },
    });

    if (!patient) {
      return {
        success: false,
        message: "Patient data not found",
        status: 200,
        data: null,
      };
    }

    return { success: true, data: patient, status: 200 };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal Server Error", status: 500 };
  }
}

export async function getPatientFullDataById(id: string) {
  try {
    const patient = await db.patient.findFirst({
      where: {
        OR: [
          {
            id,
          },
          { email: id },
        ],
      },
      include: {
        _count: {
          select: {
            appointments: true,
          },
        },
        appointments: {
          select: {
            appointmentDate: true,
          },
          orderBy: {
            appointmentDate: "desc",
          },
          take: 1,
        },
      },
    });

    if (!patient) {
      return {
        success: false,
        message: "Patient data not found",
        status: 404,
      };
    }
    const lastVisit = patient.appointments[0]?.appointmentDate || null;

    return {
      success: true,
      data: {
        ...patient,
        totalAppointments: patient._count.appointments,
        lastVisit,
      },
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal Server Error", status: 500 };
  }
}

export async function getAllPatients({
  page,
  limit,
  search,
}: {
  page: number | string;
  limit?: number | string;
  search?: string;
}) {
  try {
    const PAGE_NUMBER = Number(page) <= 0 ? 1 : Number(page);
    const LIMIT = Number(limit) || 10;

    const SKIP = (PAGE_NUMBER - 1) * LIMIT;

    const [patients, totalRecords] = await Promise.all([
      db.patient.findMany({
        where: {
          OR: [
            { first_name: { contains: search, mode: "insensitive" } },
            { last_name: { contains: search, mode: "insensitive" } },
            { phone: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
          ],
        },
        include: {
          appointments: {
            select: {
              medical: {
                select: { created_at: true, treatment_plan: true },
                orderBy: { created_at: "desc" },
                take: 1,
              },
            },
            orderBy: { appointmentDate: "desc" },
            take: 1,
          },
        },
        skip: SKIP,
        take: LIMIT,
        orderBy: { first_name: "asc" },
      }),
      db.patient.count(),
    ]);

    const totalPages = Math.ceil(totalRecords / LIMIT);

    return {
      success: true,
      data: patients,
      totalRecords,
      totalPages,
      currentPage: PAGE_NUMBER,
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal Server Error", status: 500 };
  }
}

// function processAppointments(appointments: ({ patient: { first_name: string; last_name: string; date_of_birth: Date; gender: $Enums.GENDER; img: string | null; }; doctor: { name: string; id: string; img: string | null; specialization: string; }; } & { id: number; created_at: Date; updated_at: Date; patient_id: string; doctor_id: string; appointmentDate: Date; appointmentTime: string; status: $Enums.AppointmentStatus; type: string; note: string | null; reason: string | null; })[]): { appointmentCounts: any; monthlyData: any; } | PromiseLike<{ appointmentCounts: any; monthlyData: any; }> {
//   throw new Error("Function not implemented.");
// }
