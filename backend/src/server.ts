import app from './app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
	console.error('Uncaught Exception:', error);
	process.exit(1);
});

// Start the server
const server = app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
	console.log(`Environment: ${process.env.NODE_ENV}`);
});

// Connect to the database
async function connectToDB() {
	try {
		await prisma.$connect();
		console.log('Connected to PostgreSQL database');
	} catch (error) {
		console.error('Failed to connect to database:', error);
		process.exit(1);
	}
}

connectToDB();

// Handle graceful shutdown
const gracefulShutdown = async () => {
	console.log('Shutting down gracefully...');

	// Close the server
	server.close(() => {
		console.log('HTTP server closed');

		// Disconnect from the database
		prisma
			.$disconnect()
			.then(() => {
				console.log('Database connection closed');
				process.exit(0);
			})
			.catch((err) => {
				console.error('Error during database disconnection:', err);
				process.exit(1);
			});
	});
};

// Listen for termination signals
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
	console.error('Unhandled Rejection at:', promise, 'reason:', reason);
	// Don't exit the process in this case
});
