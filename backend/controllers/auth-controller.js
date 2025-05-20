import prisma from "../libs/prisma-client.js";
import { asyncHandler } from "../middlewares/async-handler.js";
import { ValidationError } from "../utils/app-error.js";
import generateToken from "../utils/generate-token.js";
import { comparePassword, hassPassword } from "../utils/password.js";
import { generateResetToken } from "../utils/token.js";
import { handleForgotPassword } from "../helpers/auth-helper.js";

export const userSignUp = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new ValidationError("Please fill all the inputs.");
  }

  if (password.length < 6) {
    throw new ValidationError("Password must be at least 6 characters.");
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

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!userExists || !(await comparePassword(password, userExists.password))) {
    throw new ValidationError("Invalid email or password");
  }

  generateToken(res, userExists.id);

  return res.status(200).json({
    status: 200,
    message: "User signed in successfully",
    data: {
      id: userExists.id,
      name: userExists.name,
      email: userExists.email,
      createdAt: userExists.createdAt,
      updatedAt: userExists.updatedAt,
    },
  });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  await handleForgotPassword(req, res);
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!token) {
    throw new ValidationError("Reset token is required.");
  }

  if (!password || password.length < 6) {
    throw new ValidationError("Password must be at least 6 characters.");
  }

  const { token: resetToken, hashedToken } = generateResetToken(token);

  const user = await prisma.user.findFirst({
    where: {
      resetToken: hashedToken,
      resetTokenExpiry: {
        gte: new Date(),
      },
    },
  });

  if (!user) {
    throw new ValidationError("Invalid or expired reset token");
  }

  const hashedPassword = await hassPassword(password, 10);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    },
  });

  res.status(200).json({
    status: 200,
    message: "Password has been reset successfully",
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
