import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Bed from '@/models/Bed';

export async function GET() {
    try {
        await connectDB();

        const beds = await Bed.find()
            .populate('createdBy', 'firstName lastName')
            .sort({ bedNumber: 1 })
            .collation({ locale: "en", numericOrdering: true });

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

export async function DELETE(req: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);

        const id = searchParams.get('id');
        const ids = searchParams.get('ids');
        const department = searchParams.get('department');

        if (id) {
            const bed = await Bed.findById(id);
            if (bed?.status === 'Occupied') {
                return NextResponse.json({ error: "Occupied bed cannot be deleted" }, { status: 400 });
            }
            await Bed.findByIdAndDelete(id);
            return NextResponse.json({ message: "Bed deleted" });
        }

        if (ids) {
            const idsArray = ids.split(',');

            const occupiedCount = await Bed.countDocuments({
                _id: { $in: idsArray },
                status: 'Occupied'
            });

            if (occupiedCount > 0) {
                return NextResponse.json({
                    error: "Selection contains occupied beds. Please deselect them first."
                }, { status: 400 });
            }

            await Bed.deleteMany({ _id: { $in: idsArray } });
            return NextResponse.json({ message: "Selected beds deleted" });
        }

        if (department) {
            await Bed.deleteMany({
                department: department,
                status: { $ne: 'Occupied' }
            });
            return NextResponse.json({ message: "Available beds cleared in department" });
        }

        return NextResponse.json({ error: "Invalid request" }, { status: 400 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}