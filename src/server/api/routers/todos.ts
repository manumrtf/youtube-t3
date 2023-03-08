import { z } from "zod";
import { prisma } from "../../db";
import { createTRPCRouter, adminProcedure, protectedProcedure } from "../trpc";

export const todosRouter = createTRPCRouter({
  createTodo: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      const todo = prisma.todo.create({
        data: {
          name: input.name,
          description: input.description,
          userId: ctx.session.user.id,
        },
      });
      return todo;
    }),
  getTodos: protectedProcedure.query(async ({ ctx }) => {
    const todos = await prisma.todo.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
    return todos;
  }),

  deleteTodo: adminProcedure
    .input(
      z.object({
        todoId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const deletedTodo = await prisma.todo.delete({
        where: {
          id: input.todoId,
        },
      });

      return deletedTodo;
    }),
});
