import prisma from "../libs/prisma-client.js";
import { asyncHandler } from "../middlewares/async-handler.js";
import { ValidationError } from "../utils/app-error.js";
import generateToken from "../utils/generate-token.js";
import { comparePassword, hassPassword } from "../utils/password.js";

export const userSignUp = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new ValidationError("Please fill all the inputs.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ValidationError("Please provide a valid email address.");
  }

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    throw new ValidationError("Email already is use.");
  }

  const hashedPassword = await hassPassword(password, 10);

  const createUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // generate Token
  generateToken(res, createUser.id);

  return res.status(201).json({
    status: 201,
    message: "User signed up successfully",
    data: {
      id: createUser.id,
      name: createUser.name,
      email: createUser.email,
      createdAt: createUser.createdAt,
      updatedAt: createUser.updatedAt,
    },
  });
});

export const userSignIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ValidationError("Please fill all the inputs.");
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (
    !existingUser ||
    !(await comparePassword(password, existingUser.password))
  ) {
    throw new ValidationError("Invalid email or password");
  }

  // generate Token
  generateToken(res, existingUser.id);

  return res.status(200).json({
    status: 200,
    message: "User signed in successfully",
    data: {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      createdAt: existingUser.createdAt,
      updatedAt: existingUser.updatedAt,
    },
  });
});

export const userSignOut = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({
    status: 200,
    message: "User signed out successfully",
  });
});
