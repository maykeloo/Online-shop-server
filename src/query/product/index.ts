import { Product as ProductInterface } from "@prisma/client"
import { Context } from "../../index"

export const Product = {
      rating: async (parent: any, __: any, { prisma }: Context) => {
            const rating = await prisma.rating.findUnique({
                  where: {
                        id: parent.ratingId
                  }
            })
            return rating
      },
      image: async(parent: ProductInterface, __: any, { prisma }: Context) => {
            const image = await prisma.image.findUnique({
                  where: {
                        id: parent.imageId
                  }
            })
            return image
      }
}