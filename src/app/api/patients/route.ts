import { NextResponse } from 'next/server';

import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function GET(req: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const role = searchParams.get('role');
        const hospitalId = searchParams.get('hospitalId');
        const email = searchParams.get('email');

        let query = {};

        if (role === 'superadmin') {
            query = { role: 'patient' };
        }
        else if (role === 'admin') {
            query = { role: 'patient', hospitalId: hospitalId };
        }
        else if (role === 'doctor') {
            query = { role: 'patient', hospitalId: hospitalId };
        }
        else {
            query = { role: 'patient', email: email };
        }

        const patients = await User.find(query).sort({ createdAt: -1 });
        return NextResponse.json(patients);

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();

        const {
            firstName,
            lastName,
            email,
            phone,
            gender,
            bloodGroup,
            dob,
            hospitalId,
            address
        } = body;

        if (!hospitalId) {
            return NextResponse.json({ error: "Hospital ID are required" }, { status: 400 });
        }

        if (email) {
            const existingPatient = await User.findOne({ email });
            if (existingPatient) {
                return NextResponse.json({ error: "Patient with this email already exists" }, { status: 400 });
            }
        }

        const defaultPassword = await bcrypt.hash("Patient@123", 10);

        const newPatient = await User.create({
            firstName,
            lastName,
            email: email || `temp_${Date.now()}@wardos.com`,
            password: defaultPassword,
            role: 'patient',
            phone,
            gender,
            bloodGroup,
            dob,
            address,
            hospitalId,
            status: 'Active'
        });

        return NextResponse.json(newPatient, { status: 201 });

    } catch (error: any) {
        console.error("POST Error:", error);
        return NextResponse.json({
            error: "Failed to create patient record",
            details: error.message
        }, { status: 500 });
    }
}

