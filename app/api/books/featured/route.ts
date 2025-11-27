import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function GET() {
  try {
    // Fetch top-rated books (rating >= 4.7 and rating_count > 200)
    const featuredBooks = await prisma.book.findMany({
      where: {
        is_active: true,
        deleted_at: null,
        rating_average: {
          gte: 4.7,
        },
        rating_count: {
          gt: 200,
        },
      },
      orderBy: {
        rating_average: 'desc',
      },
      take: 6, // Limit to 6 books for carousel
      include: {
        category: true,
      },
    });

    // Convert Prisma Decimal to number for JSON serialization
    const serializedBooks = featuredBooks.map(book => ({
      ...book,
      price: Number(book.price),
      rating_average: Number(book.rating_average),
    }));

    return NextResponse.json({
      success: true,
      data: serializedBooks,
    });
  } catch (error) {
    console.error('Error fetching featured books:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch featured books' },
      { status: 500 }
    );
  }
}
