import connectDB from '@/lib/mongodb';
import Appointment from '@/models/Appointment';
import { NextResponse } from 'next/server';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const updated = await Appointment.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(updated);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    await connectDB();
    const { id } = await params;
    await Appointment.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted" });
}