import { Product } from '@prisma/client'
import { Context } from '../index'

export const Products = {
      addProduct: async (_:any, { product }: { product: Product }, { prisma }: Context) => {
            const generateRandomRateNumbers = (max: number, min: number) => {
                  return Math.floor(Math.random() * (max - min + 1)) + min;
            }


            const productItem = await prisma.product.create({
                  data: {
                        category: product.category,
                        description: product.description,
                        image: product.image,
                        longDescription: product.longDescription,
                        price: product.price,
                        title: product.title,
                        rating: {
                              create: {
                                    count: +generateRandomRateNumbers(1, 400).toFixed(0),
                                    rate: +generateRandomRateNumbers(1, 5).toFixed(2)
                              }
                        }
                  },

            })

            return {
                  product: productItem,
                  errors:  {
                        messages: []
                  }
            }
      },
}