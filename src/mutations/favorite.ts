import { Context } from '../index'
export const Favorite = {
      addToFavorite: async (_:any, { productId }: { productId: number }, { prisma, userInfo }: Context) => {
            console.log(productId)
            const favorite = await prisma.productsOnUser.create({
                  data: {
                        user: {
                              connect: {
                                    id: userInfo?.userId
                              }
                        },
                        product: {
                              connect: {
                                    id: +productId
                              }
                        }
                  }
            })
            return favorite
      }
}