import { PrismaClient } from '@prisma/client';
import util from 'util';

export const dbClient = new PrismaClient();
export const xPrisma = dbClient.$extends({
  name: 'db request logs',
  query: {
    async $allOperations({ operation, model, args, query }) {
      const start = performance.now();
      const result = await query(args);
      const end = performance.now();
      const time = end - start;
      console.log(
        util.inspect(
          `took ${time.toFixed(2)}ms to run ${operation} on ${model} model`,
          { showHidden: false, depth: null, colors: true }
        )
      );
      return result;
    },
  },
});
export const exclude = (data: any, keys: string[]) => {
  return Object.fromEntries(
    Object.entries(data).filter(([key]) => !keys.includes(key))
  );
};
