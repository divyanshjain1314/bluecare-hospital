export interface User {
    firstName: string;
    lastName: string;
    email: string;
    department: string;
    password?: string;
    role?: 'superadmin' | 'admin' | 'doctor' | 'nurse' | 'staff';
}

export const mockUserDb: User[] = [
    {
        firstName: "Super",
        lastName: "Admin",
        email: "sadmin@gmail.com",
        department: "Administration",
        password: "sadmin@123",
        role: "superadmin"
    },
    {
        firstName: "Admin",
        lastName: "User",
        email: "admin@bluecare.com",
        department: "General",
        password: "password123",
        role: "admin"
    }
];