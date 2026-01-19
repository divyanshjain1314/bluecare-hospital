import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Department from '@/models/Department';

export async function GET() {
    try {
        await connectDB();
        const departments = await Department.find().sort({ createdAt: -1 });
        return NextResponse.json(departments);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();
        const dept = await Department.create(body);
        return NextResponse.json(dept, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Duplicate or Invalid Data" }, { status: 400 });
    }
}

export async function PUT(req: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: "Department ID is required" }, { status: 400 });
        }

        const body = await req.json();

        const updatedDept = await Department.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true, runValidators: true }
        );

        if (!updatedDept) {
            return NextResponse.json({ error: "Department not found" }, { status: 404 });
        }

        return NextResponse.json(updatedDept, { status: 200 });

    } catch (error: any) {
        console.error("Update Error:", error);
        return NextResponse.json({ error: "Failed to update department" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) {
            return NextResponse.json({ error: "Department ID is required" }, { status: 400 });
        }
        const deletedDept = await Department.findByIdAndDelete(id);
        if (!deletedDept) {
            return NextResponse.json({ error: "Department not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Department deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete department" }, { status: 500 });
    }
}