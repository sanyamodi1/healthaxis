"use server";

import db from "@/lib/db";
import {
  DoctorSchema,
  ServicesSchema,
  StaffSchema,
  WorkingDaysSchema,
} from "@/lib/schema";
import { generateRandomColor } from "@/utils";
import { checkRole } from "@/utils/roles";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function createNewStaff(data: any) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, msg: "Unauthorized" };
    }

    const isAdmin = await checkRole("ADMIN");

    if (!isAdmin) {
      return { success: false, msg: "Unauthorized" };
    }

    const values = StaffSchema.safeParse(data);

    if (!values.success) {
      return {
        success: false,
        errors: true,
        message: "Please provide all required info",
      };
    }

    const validatedValues = values.data;

    const client = await clerkClient();

    const user = await client.users.createUser({
      emailAddress: [validatedValues.email],
      password: validatedValues.password,
      firstName: validatedValues.name.split(" ")[0],
      lastName: validatedValues.name.split(" ")[1],
      publicMetadata: { role: "doctor" },
    });

    delete validatedValues["password"];

    const doctor = await db.staff.create({
      data: {
        name: validatedValues.name,
        phone: validatedValues.phone,
        email: validatedValues.email,
        address: validatedValues.address,
        role: validatedValues.role,
        license_number: validatedValues.license_number,
        department: validatedValues.department,
        // colorCode: generateRandomColor(),
        id: user.id,
        status: "ACTIVE",
      },
    });

    return {
      success: true,
      message: "Doctor added successfully",
      error: false,
    };
  } catch (error) {
    console.log(error);
    return { error: true, success: false, message: "Something went wrong" };
  }
}
export async function createNewDoctor(data: any) {
  try {
    const values = DoctorSchema.safeParse(data);

    const workingDaysValues = WorkingDaysSchema.safeParse(data?.work_schedule);

    if (!values.success || !workingDaysValues.success) {
      return {
        success: false,
        errors: true,
        message: "Please provide all required info",
      };
    }

    const validatedValues = values.data;
    const workingDayData = workingDaysValues.data!;

    const client = await clerkClient();

    const user = await client.users.createUser({
      emailAddress: [validatedValues.email],
      password: validatedValues.password,
      firstName: validatedValues.name.split(" ")[0],
      lastName: validatedValues.name.split(" ")[1],
      publicMetadata: { role: "doctor" },
    });

    delete validatedValues["password"];

    const doctor = await db.doctor.create({
      data: {
        ...validatedValues,
        id: user.id,
      },
    });

    await Promise.all(
      workingDayData?.map((el) =>
        db.workingDays.create({
          data: { ...el, doctor_id: doctor.id },
        })
      )
    );

    return {
      success: true,
      message: "Doctor added successfully",
      error: false,
    };
  } catch (error) {
    console.log(error);
    return { error: true, success: false, message: "Something went wrong" };
  }
}

export async function addNewService(data: any) {
  try {
    const isValidData = ServicesSchema.safeParse(data);

    const validatedData = isValidData.data;

    await db.services.create({
      data: { ...validatedData!, price: Number(data.price!) },
    });

    return {
      success: true,
      error: false,
      msg: `Service added successfully`,
    };
  } catch (error) {
    console.log(error);
    return { success: false, msg: "Internal Server Error" };
  }
}