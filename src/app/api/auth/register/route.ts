import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Setting from '@/models/Setting';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();

        // Destructure all possible fields from dynamic form
        const {
            firstName, lastName, email, password, role,
            hospitalName, address, // Admin fields
            specialization, licenseNumber, // Doctor fields
            bloodGroup, gender, dob // Patient/Common fields
        } = body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return NextResponse.json({ error: "User already exists with this email" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        let finalHospitalId = null;

        // --- ROLE SPECIFIC ---

        if (role === 'admin') {
            if (!hospitalName) return NextResponse.json({ error: "Hospital name is required for Admin" }, { status: 400 });

            const newHospital = await Setting.create({
                hospitalName,
                address: address || '',
                registryId: `HOSP-${Math.floor(1000 + Math.random() * 9000)}`,
                contactEmail: email
            });
            finalHospitalId = newHospital._id;
        }

        else if (role === 'doctor') {
            finalHospitalId = body.hospitalId || null;
        }

        const userData: any = {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: role || 'patient',
            gender,
            dob,
            phone: body.phone,
            hospitalId: finalHospitalId,
        };

        if (role === 'doctor') {
            userData.specialization = specialization;
            userData.licenseNumber = licenseNumber;
            userData.status = 'Active';
        }

        if (role === 'patient') {
            userData.bloodGroup = bloodGroup;
            userData.status = 'Active';
        }

        const newUser = await User.create(userData);

        return NextResponse.json({
            message: `${role.toUpperCase()} registered successfully`,
            user: {
                id: newUser._id,
                role: newUser.role,
                hospitalId: newUser.hospitalId
            }
        }, { status: 201 });

    } catch (error: any) {
        console.error("Registration Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}