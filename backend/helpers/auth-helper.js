import prisma from "../libs/prisma-client.js";
import { ValidationError } from "../utils/app-error.js";
import { sendEmail } from "../utils/mail/send-email.js";
import { generateResetToken } from "../utils/token.js";
import dayjs from "dayjs";

export const sendResetURL = async (email, name, resetUrl) => {
  return sendEmail(email, "Reset Password Request", "reset-password", {
    name,
    resetUrl,
  });
};

export const handleForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new ValidationError("Please provide your email address.");
    }

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (!userExists) {
      throw new ValidationError("User with this email does not exist.");
    }

    const { token: resetToken, hashedToken } = generateResetToken();
    const expiry = dayjs().add(15, "minutes").toDate();

    await prisma.user.update({
      where: { email },
      data: {
        resetToken: hashedToken,
        resetTokenExpiry: expiry,
      },
    });

    const resetUrl = `${process.env.PUBLIC_URL}/auth/reset-password/${resetToken}`;

    await sendResetURL(userExists.email, userExists.name, resetUrl);

    return res.status(200).json({
      status: 200,
      message: "Reset password email has been sent successfully.",
    });
  } catch (error) {
    console.log("Forgot password error", error);
    return error;
  }
};
