import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing data (for development only)
  await prisma.review.deleteMany();
  await prisma.wishlist.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.order.deleteMany();
  await prisma.book.deleteMany();
  await prisma.category.deleteMany();

  // Create Categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Design',
        slug: 'design',
        description: 'Books about design thinking, UI/UX, and visual aesthetics',
        is_active: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Technology',
        slug: 'technology',
        description: 'Books about programming, software engineering, and tech innovation',
        is_active: true,
      },
    }),
    prisma.category.create({
      data: {
        name: 'Philosophy',
        slug: 'philosophy',
        description: 'Books about thinking, psychology, and life principles',
        is_active: true,
      },
    }),
  ]);

  // Create Books (8 books from dashboard.tsx)
  const books = await Promise.all([
    // Design Books
    prisma.book.create({
      data: {
        title: 'The Design of Everyday Things',
        slug: 'the-design-of-everyday-things',
        description: 'A powerful primer on how design serves as the communication between object and user. Essential reading for understanding human-centered design principles.',
        category_id: categories[0].id, // Design
        author: 'Don Norman',
        publisher: 'Basic Books',
        isbn: '978-0-465-05065-9',
        price: 185000,
        stock: 15,
        cover_image: '/The Design of Everyday Things.png',
        rating_average: 4.8,
        rating_count: 342,
        is_active: true,
      },
    }),
    prisma.book.create({
      data: {
        title: 'Refactoring UI',
        slug: 'refactoring-ui',
        description: 'Learn how to design awesome UIs by yourself using specific tactics explained from a developer\'s point-of-view. A practical guide to modern interface design.',
        category_id: categories[0].id, // Design
        author: 'Adam Wathan & Steve Schoger',
        publisher: 'Refactoring UI',
        isbn: '978-1-7336-7701-8',
        price: 225000,
        stock: 8,
        cover_image: '/Refactoring UI.png',
        rating_average: 4.9,
        rating_count: 287,
        is_active: true,
      },
    }),
    prisma.book.create({
      data: {
        title: "Don't Make Me Think",
        slug: 'dont-make-me-think',
        description: 'A common sense approach to web usability. Steve Krug\'s guide to intuitive navigation and information design has become a classic in the field.',
        category_id: categories[0].id, // Design
        author: 'Steve Krug',
        publisher: 'New Riders',
        isbn: '978-0-321-96551-6',
        price: 175000,
        stock: 12,
        cover_image: "/Don't Make Me Think.png",
        rating_average: 4.7,
        rating_count: 421,
        is_active: true,
      },
    }),
    // Technology Books
    prisma.book.create({
      data: {
        title: 'Clean Code',
        slug: 'clean-code',
        description: 'A handbook of agile software craftsmanship. Learn to write code that is easy to read, maintain, and understand. Essential for every professional developer.',
        category_id: categories[1].id, // Technology
        author: 'Robert C. Martin',
        publisher: 'Prentice Hall',
        isbn: '978-0-13-235088-4',
        price: 295000,
        stock: 6,
        cover_image: '/Clean Code.png',
        rating_average: 4.6,
        rating_count: 512,
        is_active: true,
      },
    }),
    prisma.book.create({
      data: {
        title: 'The Pragmatic Programmer',
        slug: 'the-pragmatic-programmer',
        description: 'Your journey to mastery. Covers topics ranging from personal responsibility and career development to architectural techniques for keeping your code flexible.',
        category_id: categories[1].id, // Technology
        author: 'David Thomas & Andrew Hunt',
        publisher: 'Addison-Wesley',
        isbn: '978-0-13-595705-9',
        price: 315000,
        stock: 18,
        cover_image: '/The Pragmatic Programmer.png',
        rating_average: 4.8,
        rating_count: 398,
        is_active: true,
      },
    }),
    prisma.book.create({
      data: {
        title: 'Zero to One',
        slug: 'zero-to-one',
        description: 'Notes on startups, or how to build the future. Peter Thiel shows how we can find singular ways to create new things and build a better future.',
        category_id: categories[1].id, // Technology
        author: 'Peter Thiel',
        publisher: 'Crown Business',
        isbn: '978-0-804-13929-6',
        price: 245000,
        stock: 0,
        cover_image: '/Zero to One.png',
        rating_average: 4.5,
        rating_count: 276,
        is_active: true,
      },
    }),
    // Philosophy Books
    prisma.book.create({
      data: {
        title: 'Thinking, Fast and Slow',
        slug: 'thinking-fast-and-slow',
        description: 'Daniel Kahneman reveals where we can trust our intuitions and how we can tap into the benefits of slow thinking. A landmark book in psychology and decision-making.',
        category_id: categories[2].id, // Philosophy
        author: 'Daniel Kahneman',
        publisher: 'Farrar, Straus and Giroux',
        isbn: '978-0-374-27563-1',
        price: 265000,
        stock: 22,
        cover_image: '/Thinking, Fast and Slow.png',
        rating_average: 4.7,
        rating_count: 489,
        is_active: true,
      },
    }),
    prisma.book.create({
      data: {
        title: 'Atomic Habits',
        slug: 'atomic-habits',
        description: 'Tiny changes, remarkable results. James Clear reveals practical strategies for forming good habits, breaking bad ones, and mastering the tiny behaviors that lead to remarkable results.',
        category_id: categories[2].id, // Philosophy
        author: 'James Clear',
        publisher: 'Avery',
        isbn: '978-0-735-21129-2',
        price: 235000,
        stock: 25,
        cover_image: '/Atomic Habits.png',
        rating_average: 4.9,
        rating_count: 634,
        is_active: true,
      },
    }),
  ]);

  console.log('🎉 Seed completed successfully!');
  console.log(`   - Categories: ${categories.length}`);
  console.log(`   - Books: ${books.length}`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
