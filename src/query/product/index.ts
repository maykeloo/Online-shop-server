import { Context } from "../../index"

export const Product = {
      rating: async (parent: any, __: any, { prisma }: Context) => {
            const rating = await prisma.rating.findUnique({
                  where: {
                        id: parent.ratingId
                  }
            })
            return rating
      }
}