// lib/auth.ts
import jwt from 'jsonwebtoken';

export const generateTokenAndUserResponse = (user: any) => {
    const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: '1d' }
    );

    const userData = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        department: user.department,
        status: user.status,
        specialization: user.specialization,
        phone: user.phone,
        image: user.image,
        hospitalId: user.hospitalId
    };

    return { token, user: userData };
};