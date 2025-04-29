import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
	console.log('Starting seed...');

	// Clear existing data
	await prisma.medication.deleteMany();
	await prisma.shipment.deleteMany();
	await prisma.weightEntry.deleteMany();
	await prisma.user.deleteMany();

	// Create test user
	const hashedPassword = await bcrypt.hash('Password123!', 12);
	const user = await prisma.user.create({
		data: {
			email: 'test@acme.com',
			password: hashedPassword,
			name: 'Test Patient',
		},
	});

	console.log(`Created user: ${user.email}`);

	// Create 10 weight entries spanning 6 months
	const today = new Date();
	const sixMonthsAgo = new Date();
	sixMonthsAgo.setMonth(today.getMonth() - 6);

	for (let i = 0; i < 10; i++) {
		const recordDate = new Date(
			sixMonthsAgo.getTime() +
				(today.getTime() - sixMonthsAgo.getTime()) * (i / 9)
		);

		// Random weight between 150 and 200 lbs, with a slight downward trend
		const baseWeight = 195 - i * 4.5;
		const randomVariation = Math.random() * 5 - 2.5; // Random variation of ±2.5 lbs
		const weight = baseWeight + randomVariation;

		// Calculate BMI (assuming height of 5'10" = 1.778m)
		const heightInMeters = 1.778;
		const weightInKg = weight * 0.453592; // Convert lbs to kg
		const bmi = parseFloat(
			(weightInKg / (heightInMeters * heightInMeters)).toFixed(2)
		);

		await prisma.weightEntry.create({
			data: {
				userId: user.id,
				weight,
				bmi,
				recordedAt: recordDate,
			},
		});
	}

	console.log('Created 10 weight entries');

	// Create 5 shipments (3 past, 2 upcoming)
	const shipmentStatuses = [
		'Delivered',
		'Delivered',
		'Shipped',
		'Pending',
		'Pending',
	];
	const now = new Date();

	for (let i = 0; i < 5; i++) {
		const shipmentDate = new Date();
		// First 3 are in the past, last 2 are in the future
		if (i < 3) {
			shipmentDate.setDate(now.getDate() - (30 - i * 10)); // 30, 20, 10 days ago
		} else {
			shipmentDate.setDate(now.getDate() + (i - 2) * 10); // 10, 20 days in future
		}

		const trackingNumber =
			i < 3
				? `TRK${Math.floor(Math.random() * 10000000)
						.toString()
						.padStart(7, '0')}US`
				: null;

		await prisma.shipment.create({
			data: {
				userId: user.id,
				medicationType: 'GLP-1',
				dosage: `${(i * 0.25 + 0.25).toFixed(2)}mg`,
				shipmentDate,
				status: shipmentStatuses[i],
				trackingInfo: trackingNumber,
			},
		});
	}

	console.log('Created 5 shipments');

	// Create 1 active medication
	const startDate = new Date();
	startDate.setMonth(startDate.getMonth() - 1);

	const endDate = new Date();
	endDate.setMonth(endDate.getMonth() + 5);

	await prisma.medication.create({
		data: {
			userId: user.id,
			type: 'GLP-1',
			dosage: '0.5mg',
			startDate,
			endDate,
		},
	});

	console.log('Created 1 medication record');
	console.log('Seed completed successfully!');
}

main()
	.catch((e) => {
		console.error('Error during seed:', e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
