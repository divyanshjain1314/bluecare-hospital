import { NextResponse } from 'next/server';

import connectDB from '@/lib/mongodb';
import Patient from '@/models/Patient';

export async function GET(request: Request) {
    try {
        await connectDB();
        const patients = await Patient.find({}).lean();

        const formattedPatients = patients.map((p: any) => ({
            ...p,
            id: p._id.toString(),
        }));

        return NextResponse.json(formattedPatients);
    } catch (error) {
        return NextResponse.json({ error: "Fetch Failed" }, { status: 500 });
    }
}


export async function POST(request: Request) {
    try {
        await connectDB();

        const body = await request.json();
        const { name, age, gender, bloodGroup, phone, status, createdBy } = body;

        if (!name || !createdBy) {
            return NextResponse.json({ error: "Name and Creator email are required" }, { status: 400 });
        }

        const newPatient = await Patient.create({
            name,
            age: Number(age),
            gender,
            bloodGroup,
            phone,
            status: status || 'Stable',
            lastVisit: new Date().toISOString().split('T')[0],
            createdBy
        });

        return NextResponse.json(newPatient, { status: 201 });

    } catch (error: any) {
        console.error("POST Error:", error);
        return NextResponse.json({
            error: "Failed to create patient",
            details: error.message
        }, { status: 500 });
    }
}

