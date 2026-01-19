import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Bed from '@/models/Bed';

export async function GET() {
    try {
        await connectDB();
        const beds = await Bed.find()
            .populate('createdBy', 'firstName lastName')
            .sort({ bedNumber: 1 });

        return NextResponse.json(beds);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const { prefix, startNumber, count, type, department, createdBy } = await req.json();

        if (!prefix || !count || !createdBy) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const bedsToCreate = [];

        for (let i = 0; i < count; i++) {
            const currentNum = Number(startNumber) + i;
            bedsToCreate.push({
                bedNumber: `${prefix}-${currentNum}`,
                type,
                department,
                createdBy,
                status: 'Available'
            });
        }

        const createdBeds = await Bed.insertMany(bedsToCreate, { ordered: false });

        return NextResponse.json({
            message: `${createdBeds.length} beds generated successfully`,
            data: createdBeds
        }, { status: 201 });

    } catch (error: any) {
        if (error.code === 11000) {
            return NextResponse.json({
                error: "Some bed numbers already exist. Please check your starting number."
            }, { status: 400 });
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}