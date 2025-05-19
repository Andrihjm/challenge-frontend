import bcrypt from "bcryptjs";

export const hassPassword = async (password) => {
  const salt = 10;

  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
