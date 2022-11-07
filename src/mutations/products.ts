import { Context } from "../index";

interface InputAddProduct {
  title: string;
  price: number;
  description: string;
  category: string;
  longDescription: string;
  image: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
}

export const Products = {
  addProduct: async (
    _: any,
    { product }: { product: InputAddProduct },
    { prisma }: Context
  ) => {
    const generateRandomRateNumbers = (max: number, min: number) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const slug = product.title.toLocaleLowerCase().replace(/\s/g, "-");
    console.log(product.image)
    const productItem = await prisma.product.create({
      data: {
        category: product.category,
        description: product.description,
        longDescription: product.longDescription,
        price: product.price,
        title: product.title,
        slug,
        image: {
          create: {
            alt: product.image.alt,
            width: product.image.width,
            height: product.image.height,
            url: product.image.url,
          },
        },
        rating: {
          create: {
            count: +generateRandomRateNumbers(1, 400).toFixed(0),
            rate: +generateRandomRateNumbers(1, 5).toFixed(2),
          },
        },
      },
    });

    console.log(productItem)

    return {
      product: productItem,
      errors: {
        message: [],
      },
    };
  },
};
