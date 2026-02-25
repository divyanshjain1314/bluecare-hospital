import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Setting from '@/models/Setting';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

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

export async function PUT(request: Request) {
    try {
        await connectDB();

        const authHeader = request.headers.get('authorization');
        const token = authHeader?.split(' ')[1];

        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

        const body = await request.json();

        let targetId;

        if (decoded.role === 'admin' || decoded.role === 'superadmin' || decoded.role === 'doctor') {
            targetId = body.id;
        } else {
            targetId = decoded.id;
        }

        if (!targetId) {
            return NextResponse.json({ error: "Target ID is missing" }, { status: 400 });
        }

        const { firstName, lastName, email, phone, ...otherFields } = body;

        if (phone) {
            const existingPhone = await User.findOne({
                phone: phone.trim(),
                _id: { $ne: targetId }
            });
            if (existingPhone) return NextResponse.json({ error: "Phone already in use" }, { status: 400 });
        }

        if (email) {
            const existingEmail = await User.findOne({
                email: email.toLowerCase().trim(),
                _id: { $ne: targetId }
            });
            if (existingEmail) return NextResponse.json({ error: "Email already in use" }, { status: 400 });
        }

        const updatedUser = await User.findByIdAndUpdate(
            targetId,
            { firstName, lastName, email, phone, ...otherFields },
            { new: true }
        );

        return NextResponse.json(updatedUser, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}