import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const dashboardData = {
            stats: {
                totalPatients: 186,
                availableBeds: 42,
                doctorsOnDuty: 28,
                emergencyQueue: 11
            },
            appointments: [
                { patient: "Aisha Khan", doctor: "Dr. Mehta", dept: "Cardiology", time: "10:30 AM", status: "Confirmed" },
                { patient: "Rohan Singh", doctor: "Dr. Iyer", dept: "General", time: "11:15 AM", status: "Pending" },
                { patient: "Meera Patel", doctor: "Dr. Sharma", dept: "Orthopedics", time: "12:00 PM", status: "Confirmed" },
                { patient: "Arjun Verma", doctor: "Dr. Nair", dept: "Pediatrics", time: "01:10 PM", status: "Cancelled" },
                { patient: "Neha Gupta", doctor: "Dr. Joshi", dept: "Cardiology", time: "02:45 PM", status: "Pending" },
                { patient: "Vikram Rao", doctor: "Dr. Desai", dept: "General", time: "03:20 PM", status: "Confirmed" }
            ],
            departmentLoad: [
                { id: 1, name: "Cardiology", load: 76 },
                { id: 2, name: "Orthopedics", load: 58 },
                { id: 3, name: "General", load: 64 },
                { id: 4, name: "Orthopedics", load: 49 }
            ],
            patientFlow: [12, 10, 22, 28, 38, 18],
            comparison: {
                opd: [52, 63, 58, 71, 68], // Mon to Fri
                ipd: [22, 32, 28, 35, 30]
            },
        };

        return NextResponse.json(dashboardData);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}