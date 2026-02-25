export type Role = 'admin' | 'doctor' | 'patient' | 'nurse' | 'superadmin';

export interface Permissions {
    view: boolean;
    add: boolean;
    edit: boolean;
    delete: boolean;
}

export const ROLE_PERMISSIONS: Record<Role, Record<string, Permissions>> = {
    admin: {
        dashboard: { view: true, add: true, edit: true, delete: true },
        patients: { view: true, add: true, edit: true, delete: true },
        appointments: { view: true, add: false, edit: false, delete: false },
        beds: { view: true, add: true, edit: true, delete: true },
        doctors: { view: true, add: true, edit: true, delete: true },
        departments: { view: true, add: true, edit: true, delete: true },
        reports: { view: true, add: true, edit: true, delete: true },
        settings: { view: true, add: true, edit: true, delete: true },
    },
    doctor: {
        dashboard: { view: true, add: false, edit: false, delete: false },
        patients: { view: true, add: true, edit: true, delete: false },
        appointments: { view: true, add: true, edit: true, delete: false },
        beds: { view: true, add: false, edit: false, delete: false },
        reports: { view: true, add: false, edit: false, delete: false },
        settings: { view: true, add: false, edit: true, delete: false },
    },
    patient: {
        dashboard: { view: true, add: false, edit: false, delete: false },
        appointments: { view: true, add: true, edit: false, delete: false },
        reports: { view: true, add: false, edit: false, delete: false },
        settings: { view: true, add: false, edit: true, delete: false },
    },
    nurse: {
        dashboard: { view: true, add: false, edit: false, delete: false },
        patients: { view: true, add: false, edit: true, delete: false },
        beds: { view: true, add: false, edit: true, delete: false },
    },
    superadmin: {
        all: { view: true, add: true, edit: true, delete: true }
    }
};