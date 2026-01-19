// app/api/doctors/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import crypto from 'crypto';
import { sendWelcomeEmail } from '@/lib/mail';

export async function GET() {
    try {
        await connectDB();
        const doctors = await User.find({ role: 'doctor' })
            .select('-password')
            .sort({ createdAt: -1 });

        return NextResponse.json(doctors);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch doctors" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();

        if (!body.email || !body.firstName) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const invitationToken = crypto.randomBytes(32).toString('hex');
        const invitationTokenExpires = Date.now() + 24 * 60 * 60 * 1000;

        const newDoctor = await User.create({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            phone: body.phone,
            department: body.department,
            specialization: body.specialization,
            role: 'doctor',
            status: 'Inactive',
            invitationToken,
            invitationTokenExpires,
        });

        try {
            await sendWelcomeEmail(
                newDoctor.email,
                `${newDoctor.firstName} ${newDoctor.lastName}`,
                invitationToken
            );
        } catch (mailError) {
            console.error("Mail Error:", mailError);
            return NextResponse.json({
                message: "Doctor created but email failed to send.",
                error: "Mail service error"
            }, { status: 201 });
        }

        return NextResponse.json({ message: "Invitation sent!" }, { status: 201 });

    } catch (error: any) {
        console.error("API Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}