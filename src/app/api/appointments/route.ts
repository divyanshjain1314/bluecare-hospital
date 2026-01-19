import connectDB from '@/lib/mongodb';
import Appointment from '@/models/Appointment';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);

        const email = searchParams.get('email');
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const status = searchParams.get('status');
        const skip = (page - 1) * limit;

        let query: any = { doctorEmail: email };
        if (status && status !== 'All') query.status = status;

        const appointments = await Appointment.find(query)
            .sort({ date: 1, time: 1 })
            .skip(skip)
            .limit(limit);

        const total = await Appointment.countDocuments(query);

        return NextResponse.json({
            data: appointments,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();
        const newAppointment = await Appointment.create(body);
        return NextResponse.json(newAppointment, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create" }, { status: 500 });
    }
}