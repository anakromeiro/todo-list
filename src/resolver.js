const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const serverResolvers = {

	Query: {
		allTasks: () => prisma.task.findMany({
			include: {category: true},
		}),
		allCategories: () => prisma.category.findMany({
			include: {tasks: true}
		}),
		allLogs: () => prisma.category.findMany(),
		task: (parent, args) => {
			return prisma.task.findUnique({
				where: {
					id: args.id
				},
				include: {
					category: true
				}
			})
		},
		findCategoryById: (parent, args) => {
			return prisma.category.findUnique({
				where: {
					id: args.id
				},
			 	include: {
			 		tasks: true
			 	}
			})
		},
	},
	Mutation: {	
		createTask: (parent, args) => {
			const input = args.input
			return newTask = prisma.task.create({
				data: {
					title: input.title,
					frequency: input.frequency,
					category: {
						connectOrCreate: {
							where: {
								name: input.categoryName	
							},
							create: {
								name: input.categoryName
							}							
						}
					}
				},
				include: {
					category: true
				},
			})	
		},
		createCategory: (parent, args) => {
			return prisma.category.create({
				data: {
					name: args.name
				}
			})
		},
		createLog: (parent, args) => {
			return prisma.log.create({
				data: {
					task: {
						connect: {
							id: args.taskId
						}
					}
				},
				include: {
					task: true
				}
			})
		},
		updateTask: (parent, args) => {
			return updatedTask = prisma.task.update({
				where: {
					id: args.taskId
				},
				data: {					
					title: args.input.title					
				},
				include: {
					category: true
				}
			})
		},
		//TODO - merge this function with the one above
		updateTaskCategory: (parent, args) => {
			return updatedTask = prisma.task.update({
				where: {
					id: args.taskId
				},
				data: {
					category: {
						connect: {
							id: args.categoryId
						}
					}
				},
				include: {
					category: true
				}
			})
		},
		deleteTask: (parent, args) => {
			return deletedTask = prisma.task.delete({
				where: {
					id: args.taskId
				}
			})
		}
	},
};

module.exports = serverResolvers;