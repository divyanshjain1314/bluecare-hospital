import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { generateTokenAndUserResponse } from '@/lib/auth';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'secret');

export async function POST(request: Request) {
    try {
        await connectDB();
        const { email, password } = await request.json();

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 401 });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }
        const { token: jwtToken, user: userData } = generateTokenAndUserResponse(user);
        return NextResponse.json({
            message: "logged in successfully",
            user: userData,
            token: jwtToken
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: "Login failed" }, { status: 500 });
    }
}