import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '../../../../src/lib/prisma';
import { signToken } from '../../../../src/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, email, password, full_name, phone } = body;

    // Validation
    if (!username || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Username, email, and password are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return NextResponse.json(
          { success: false, error: 'Email already registered' },
          { status: 409 }
        );
      }
      if (existingUser.username === username) {
        return NextResponse.json(
          { success: false, error: 'Username already taken' },
          { status: 409 }
        );
      }
    }

    // Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        full_name: full_name || null,
        phone: phone || null,
        role: 'user', // Default role
        is_active: true,
      },
    });

    // Generate JWT token (now async with jose)
    const token = await signToken({
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
    });

    // Remove password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = newUser;

    // Create response with cookie
    const response = NextResponse.json({
      success: true,
      data: {
        user: userWithoutPassword,
        token,
      },
      message: 'Account created successfully!',
    });

    // Set httpOnly cookie for authentication
    response.cookies.set('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    
    // More detailed error logging
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'An error occurred during registration',
        details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : String(error)) : undefined
      },
      { status: 500 }
    );
  }
}
