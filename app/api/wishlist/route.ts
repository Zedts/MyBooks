import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { verifyToken } from '@/src/lib/jwt';

// GET - Fetch user's wishlist
export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const decoded = await verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      );
    }

    const wishlists = await prisma.wishlist.findMany({
      where: {
        user_id: decoded.userId,
      },
      include: {
        book: {
          include: {
            category: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return NextResponse.json({
      success: true,
      data: wishlists,
    });
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch wishlist' },
      { status: 500 }
    );
  }
}

// POST - Toggle wishlist (add/remove)
export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const decoded = await verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { success: false, error: 'Invalid token' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { bookId } = body;

    if (!bookId) {
      return NextResponse.json(
        { success: false, error: 'Book ID is required' },
        { status: 400 }
      );
    }

    // Check if book exists
    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!book) {
      return NextResponse.json(
        { success: false, error: 'Book not found' },
        { status: 404 }
      );
    }

    // Check if already in wishlist
    const existing = await prisma.wishlist.findUnique({
      where: {
        user_id_book_id: {
          user_id: decoded.userId,
          book_id: bookId,
        },
      },
    });

    if (existing) {
      // Remove from wishlist
      await prisma.wishlist.delete({
        where: {
          id: existing.id,
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Removed from wishlist',
        action: 'removed',
      });
    } else {
      // Add to wishlist
      await prisma.wishlist.create({
        data: {
          user_id: decoded.userId,
          book_id: bookId,
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Added to wishlist',
        action: 'added',
      });
    }
  } catch (error) {
    console.error('Error toggling wishlist:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update wishlist' },
      { status: 500 }
    );
  }
}
