import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Setting from '@/models/Setting';
import User from '@/models/User';

export async function GET(req: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const hospitalId = searchParams.get('hospitalId');

        if (!hospitalId) {
            return NextResponse.json({ error: "Hospital ID is required" }, { status: 400 });
        }

        const settings = await Setting.findById(hospitalId);

        return NextResponse.json(settings);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        await connectDB();
        const body = await req.json();
        const { userId, role, hospitalId, profile, hospital } = body;

        await User.findByIdAndUpdate(userId, {
            phone: profile.phone,
            gender: profile.gender,
            dob: profile.dob,
            address: profile.address,
        });

        if (role === 'admin' && hospitalId) {
            await Setting.findByIdAndUpdate(hospitalId, {
                hospitalName: hospital.hospitalName,
                address: hospital.address,
                hospitalLogo: hospital.hospitalLogo
            });
        }

        return NextResponse.json({ message: "All settings updated successfully" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}