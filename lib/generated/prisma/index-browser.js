
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.PatientScalarFieldEnum = {
  id: 'id',
  first_name: 'first_name',
  last_name: 'last_name',
  date_of_birth: 'date_of_birth',
  gender: 'gender',
  phone: 'phone',
  email: 'email',
  marital_status: 'marital_status',
  address: 'address',
  emergency_contact_name: 'emergency_contact_name',
  emergency_contact_number: 'emergency_contact_number',
  relation: 'relation',
  blood_group: 'blood_group',
  allergies: 'allergies',
  medical_conditions: 'medical_conditions',
  medical_history: 'medical_history',
  insurance_provider: 'insurance_provider',
  insurance_number: 'insurance_number',
  privacy_consent: 'privacy_consent',
  service_consent: 'service_consent',
  medical_consent: 'medical_consent',
  img: 'img',
  colorCode: 'colorCode',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.DoctorScalarFieldEnum = {
  id: 'id',
  email: 'email',
  name: 'name',
  specialization: 'specialization',
  license_number: 'license_number',
  phone: 'phone',
  address: 'address',
  department: 'department',
  img: 'img',
  availability_status: 'availability_status',
  type: 'type',
  colorCode: 'colorCode',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.WorkingDaysScalarFieldEnum = {
  id: 'id',
  doctor_id: 'doctor_id',
  day: 'day',
  start_time: 'start_time',
  close_time: 'close_time',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.StaffScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  phone: 'phone',
  address: 'address',
  department: 'department',
  img: 'img',
  license_number: 'license_number',
  role: 'role',
  status: 'status',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.AppointmentScalarFieldEnum = {
  id: 'id',
  patient_id: 'patient_id',
  doctor_id: 'doctor_id',
  appointmentDate: 'appointmentDate',
  appointmentTime: 'appointmentTime',
  status: 'status',
  type: 'type',
  note: 'note',
  reason: 'reason',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.PaymentScalarFieldEnum = {
  id: 'id',
  bill_id: 'bill_id',
  patient_id: 'patient_id',
  appointment_Id: 'appointment_Id',
  bill_date: 'bill_date',
  payment_Date: 'payment_Date',
  discount: 'discount',
  total_amount: 'total_amount',
  amount_paid: 'amount_paid',
  payment_method: 'payment_method',
  status: 'status',
  receipt_number: 'receipt_number',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.PatientBillsScalarFieldEnum = {
  id: 'id',
  bill_id: 'bill_id',
  service_id: 'service_id',
  service_date: 'service_date',
  quantity: 'quantity',
  unit_cost: 'unit_cost',
  total_cost: 'total_cost',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.LabTestScalarFieldEnum = {
  id: 'id',
  record_id: 'record_id',
  test_date: 'test_date',
  result: 'result',
  status: 'status',
  notes: 'notes',
  service_id: 'service_id',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.MedicalRecordsScalarFieldEnum = {
  id: 'id',
  patient_id: 'patient_id',
  appointment_id: 'appointment_id',
  doctor_id: 'doctor_id',
  treatment_plan: 'treatment_plan',
  prescriptions: 'prescriptions',
  lab_request: 'lab_request',
  notes: 'notes',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.VitalSignsScalarFieldEnum = {
  id: 'id',
  patient_id: 'patient_id',
  medical_id: 'medical_id',
  body_temperature: 'body_temperature',
  systolic: 'systolic',
  diastolic: 'diastolic',
  heartRate: 'heartRate',
  respiratoryRate: 'respiratoryRate',
  oxygen_saturation: 'oxygen_saturation',
  weight: 'weight',
  height: 'height',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.DiagnosisScalarFieldEnum = {
  id: 'id',
  patient_id: 'patient_id',
  medical_id: 'medical_id',
  diagnosis: 'diagnosis',
  doctor_id: 'doctor_id',
  symptoms: 'symptoms',
  notes: 'notes',
  prescribed_medications: 'prescribed_medications',
  follow_up_plan: 'follow_up_plan',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.AuditLogScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  record_id: 'record_id',
  action: 'action',
  details: 'details',
  model: 'model',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.RatingScalarFieldEnum = {
  id: 'id',
  patient_id: 'patient_id',
  staff_id: 'staff_id',
  rating: 'rating',
  comment: 'comment',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.ServicesScalarFieldEnum = {
  id: 'id',
  service_name: 'service_name',
  description: 'description',
  price: 'price',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.GENDER = exports.$Enums.GENDER = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
  OTHER: 'OTHER'
};

exports.JOBTYPE = exports.$Enums.JOBTYPE = {
  FULL: 'FULL',
  PART: 'PART'
};

exports.Role = exports.$Enums.Role = {
  ADMIN: 'ADMIN',
  NURSE: 'NURSE',
  DOCTOR: 'DOCTOR',
  LAB_TECHNICIAN: 'LAB_TECHNICIAN',
  PATIENT: 'PATIENT',
  CASHIER: 'CASHIER'
};

exports.Status = exports.$Enums.Status = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  DORMANT: 'DORMANT'
};

exports.AppointmentStatus = exports.$Enums.AppointmentStatus = {
  PENDING: 'PENDING',
  SCHEDULED: 'SCHEDULED',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED'
};

exports.PaymentMethod = exports.$Enums.PaymentMethod = {
  CASH: 'CASH',
  CARD: 'CARD',
  UPI: 'UPI'
};

exports.PaymentStatus = exports.$Enums.PaymentStatus = {
  PAID: 'PAID',
  UNPAID: 'UNPAID',
  PART: 'PART'
};

exports.Prisma.ModelName = {
  Patient: 'Patient',
  Doctor: 'Doctor',
  WorkingDays: 'WorkingDays',
  Staff: 'Staff',
  Appointment: 'Appointment',
  Payment: 'Payment',
  PatientBills: 'PatientBills',
  LabTest: 'LabTest',
  MedicalRecords: 'MedicalRecords',
  VitalSigns: 'VitalSigns',
  Diagnosis: 'Diagnosis',
  AuditLog: 'AuditLog',
  Rating: 'Rating',
  Services: 'Services'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
