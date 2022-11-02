import { Context } from '../index'

export const Query = {
  products: async (_: any, __: any, { prisma }: Context) => {
    const products = await prisma.product.findMany()
    return products;
  },
};
