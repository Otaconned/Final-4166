import bcrypt from 'bcrypt';
import 'dotenv/config';
import prisma from '../src/config/db.js';

try {
    await prisma.$queryRaw`TRUNCATE display_comments, display_items, displays, users RESTART IDENTITY CASCADE;`;

    const usersData = [
        { email: 'admin@retail.com', password: 'Admin123!', role: 'ADMIN'},
        { email: 'manager@retail.com', password: 'Manager123!', role: 'MANAGER'},
        { email: 'janeDoe@retail.com', password: 'Jane123!', role: 'EMPLOYEE'},
        { email: 'johnDoe@retail.com', password: 'John123!', role: 'EMPLOYEE'},
    ];

    const users = [];

    for (const userData of usersData) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const user = await prisma.user.create({
            data: {
                email: userData.email,
                password: hashedPassword, 
                role: userData.role,
            },
        });
        users.push(user);
    }

    console.log('Created users:', users.map(u => u.email));

    const admin = users.find(u => u.email === 'admin@retail.com')
    const manager = users.find(u => u.email === 'manager@retail.com')
    const jane = users.find(u => u.email === 'janeDoe@retail.com')
    const john = users.find(u => u.email === 'johnDoe@retail.com')

    const summerDisplay = await prisma.display.create({
        data: {
            name: 'Summer Display',
            location: 'Corner bump-out',
            status: 'active',
            authorId: manager.id,
        },
    });

    const shelfDisplay = await prisma.display.create({
        data: {
            name: 'Large Shelf Display',
            location: 'Shelf on main wall',
            status: 'active',
            authorId: manager.id,
        },
    });

    const counterDisplay = await prisma.display.create({
        data: {
            name: 'New Counter Items',
            location: 'Cashwrap counter',
            status: 'active',
            authorId: jane.id,
        },
    });

    console.log('Created displays');

    const lipBalm = await prisma.displayItem.create({
        data: {
            productName: 'SweetSpot LipBalm',
            plu: '1001',
            quantity: 12,
            status: 'active',
            location: 'Left side of cashwrap',
            displayId: counterDisplay.id,
            authorId: jane.id,
        },
    });

        const blueOnePiece = await prisma.displayItem.create({
        data: {
            productName: 'Blue one-piece outfit',
            plu: '1002',
            quantity: 3,
            status: 'active',
            location: 'Center of the shelf display',
            displayId: shelfDisplay.id,
            authorId: manager.id,
        },
    });

        const roseCandle = await prisma.displayItem.create({
        data: {
            productName: 'Rose-scented skincare candle',
            plu: '1003',
            quantity: 0,
            status: 'out_of_stock',
            location: 'Featured in Summer Display',
            displayId: summerDisplay.id,
            authorId: manager.id,
        },
    });

    console.log('Created display items')

    await prisma.displayComment.create({
        data: {
            content: 'Setup complete for summer display. Please make sure all items stay stocked!',
            actionType: 'add',
            displayId: summerDisplay.id,
            authorId: manager.id,
        },
    });

    await prisma.displayComment.create({
        data: {
            content: 'We are low on onepieces on the floor. Should we move this back?',
            actionType: 'note',
            displayId: shelfDisplay.id,
            displayItemId: blueOnePiece.id,
            authorId: jane.id,
        },
    });

    await prisma.displayComment.create({
        data: {
            content: 'Moved more lipbalms to the counter since shipment came in',
            actionType: 'update',
            displayId: counterDisplay.id,
            displayItemId: lipBalm.id,
            authorId: john.id,
        },
    });

    console.log('Seeded successfully');
} catch (error) {
    console.error('Seed failed:', error);
} finally {
    await prisma.$disconnect();
}