import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;

        const deletedUser = await User.findOneAndDelete({
            _id: id,
            role: 'patient'
        });

        if (!deletedUser) {
            return NextResponse.json(
                { error: "Patient not found or unauthorized" },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: "Patient deleted successfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params;
        const body = await request.json();

        const updatedUser = await User.findOneAndUpdate(
            { _id: id, role: 'patient' },
            {
                age: body.age,
                bloodGroup: body.bloodGroup,
                firstName: body.firstName,
                lastName: body.lastName,
                phone: body.phone,
                status: body.status
            },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return NextResponse.json(
                { error: "Patient not found or unauthorized" },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedUser, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}