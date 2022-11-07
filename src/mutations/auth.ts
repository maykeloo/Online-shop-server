import { Context } from "../index";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import { JWT_SIGNATURE } from "../keys";

interface UserArgs {
  user: {
    name: string;
    email: string;
    password: string;
  };
}

interface UserPayloadType {
  errors: {
    message: string;
  }[];
  token: string | null;
}

export const Auth = {
  signUp: async (_: any,{ user: u }: UserArgs,{ prisma }: Context): Promise<UserPayloadType> => {
    const { name, email, password } = u;

    const isEmail = validator.isEmail(email);
    const isValidPassword = validator.isLength(password, {
      min: 5,
    });

    //NAME
    if (!name) {
      return {
        errors: [
          {
            message: "Name not found.",
          },
        ],
        token: null,
      };
    }
    //EMAIL
    if (!isEmail) {
      return {
        errors: [
          {
            message: "Invalid e-mail syntax.",
          },
        ],
        token: null,
      };
    }
    //PASSWORD
    if (!isValidPassword) {
      return {
        errors: [
          {
            message: "Invalid password syntax.",
          },
        ],
        token: null,
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const letters = ["ą", "ć", "ę", "ł", "ń", "ó", "ś", "ź", "ż"];
    const replacement = ["a", "c", "e", "l", "n", "o", "s", "z", "z"];
    let nameEN = name.toLocaleLowerCase();

    for (let i = 0; i < letters.length; ++i) {
      nameEN = nameEN.replace(letters[i], replacement[i]);
    }


    const user = await prisma.user.create({
      data: {
        name,
        nameEN,
        email,
        password: hashedPassword,
      },
    });
    const days360 = 31_104_000;
    const token = JWT.sign(
      {
        userId: user.id,
      },
      JWT_SIGNATURE,
      {
        expiresIn: days360,
      }
    );

    return {
      errors: [],
      token,
    };
  },
  signIn: async (_: any,{ user: u }: UserArgs,{ prisma }: Context): Promise<UserPayloadType> => {
    const { email, password } = u;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!email && !password) {
      return {
        errors: [
          {
            message: "Invalid credentials.",
          },
        ],
        token: null,
      };
    }
    if (!email) {
      return {
        errors: [
          {
            message: "Invalid e-mail",
          },
        ],
        token: null,
      };
    }
    if (!password) {
      return {
        errors: [
          {
            message: "Invalid password",
          },
        ],
        token: null,
      };
    }
    if (!user) {
      return {
        errors: [
          {
            message: "Invalid credentials",
          },
        ],
        token: null,
      };
    }
    const isPasswordMatches = await bcrypt.compare(password, user.password);
    if (!isPasswordMatches) {
      return {
        errors: [
          {
            message: "Invalid password",
          },
        ],
        token: null,
      };
    }

    const days360 = 31_104_000;
    const token = JWT.sign(
      {
        userId: user.id,
      },
      JWT_SIGNATURE,
      {
        expiresIn: days360,
      }
    );

    return {
      errors: [],
      token,
    };
  },
};
