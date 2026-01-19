export interface Patient {
    id: string;
    name: string;
    age: number;
    gender: 'Male' | 'Female' | 'Other';
    bloodGroup: string;
    phone: string;
    lastVisit: string;
    status: 'Stable' | 'Critical' | 'Recovered';
    createdBy: string;
}

export const mockPatientDb: Patient[] = [
    {
        id: "P-101",
        name: "Aisha Khan",
        age: 28,
        gender: "Female",
        bloodGroup: "O+",
        phone: "+91 98765-43210",
        lastVisit: "2026-01-15",
        status: "Stable",
        createdBy: "sadmin@gmail.com"
    },
    {
        id: "P-102",
        name: "Aisha Khan",
        age: 28,
        gender: "Female",
        bloodGroup: "O+",
        phone: "+91 98765-43210",
        lastVisit: "2026-01-15",
        status: "Stable",
        createdBy: "sadmin@gmail.com"
    }
];