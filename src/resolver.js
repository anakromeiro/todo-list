const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const serverResolvers = {

	Query: {
		allTasks: () => prisma.task.findMany(),
		allCategories: () => prisma.category.findMany(),
		allLogs: () => prisma.category.findMany(),
	},
};

module.exports = serverResolvers;