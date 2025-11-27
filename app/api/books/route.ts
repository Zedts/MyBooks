import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'newest';

    // Build where clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {
      is_active: true,
      deleted_at: null,
    };

    if (category && category !== 'all') {
      const categoryData = await prisma.category.findFirst({
        where: { slug: category },
      });
      if (categoryData) {
        where.category_id = categoryData.id;
      }
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { author: { contains: search, mode: 'insensitive' } },
        { publisher: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Build orderBy clause
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let orderBy: any = {};
    switch (sortBy) {
      case 'rating':
        orderBy = { rating_average: 'desc' };
        break;
      case 'price-asc':
        orderBy = { price: 'asc' };
        break;
      case 'price-desc':
        orderBy = { price: 'desc' };
        break;
      case 'newest':
      default:
        orderBy = { created_at: 'desc' };
        break;
    }

    const books = await prisma.book.findMany({
      where,
      orderBy,
      include: {
        category: true,
      },
    });

    // Convert Prisma Decimal to number for JSON serialization
    const serializedBooks = books.map(book => ({
      ...book,
      price: Number(book.price),
      rating_average: Number(book.rating_average),
    }));

    return NextResponse.json({
      success: true,
      data: serializedBooks,
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch books' },
      { status: 500 }
    );
  }
}
