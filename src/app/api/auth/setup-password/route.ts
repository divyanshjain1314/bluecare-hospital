import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { generateTokenAndUserResponse } from '@/lib/auth';

export async function POST(request: Request) {
    try {
        await connectDB();
        const { token, password } = await request.json();
        const user = await User.findOne({ invitationToken: token });

        if (!user) {
            console.log("User not found with this token");
            return NextResponse.json({ error: "Invalid token." }, { status: 400 });
        }
        const currentTime = new Date();
        if (user.invitationTokenExpires && user.invitationTokenExpires < currentTime) {
            console.log("Token expired. Expiry:", user.invitationTokenExpires, "Current:", currentTime);
            return NextResponse.json({ error: "This link has expired." }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        user.password = hashedPassword;
        user.status = 'Active';
        user.invitationToken = undefined;
        user.invitationTokenExpires = undefined;
        await user.save();
        const { token: jwtToken, user: userData } = generateTokenAndUserResponse(user);

        return NextResponse.json({
            message: "Password set and logged in successfully",
            user: userData,
            token: jwtToken
        }, { status: 200 });

    } catch (error: any) {
        console.error("Setup Password Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}