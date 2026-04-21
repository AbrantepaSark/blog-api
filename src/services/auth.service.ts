import bcrypt from "bcrypt";
import * as authQuery from "../queries/user.query";
import { generateTokens } from "../utils/auth.util";

export const register = async (
  username: string,
  email: string,
  password: string,
  role: string,
) => {
  //check if user already exists
  const existingUser = await authQuery.getUserByEmail(email);
  if (existingUser) {
    throw new Error("User already exists");
  }
  //hash password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create new user
  const user = await authQuery.createUser(
    username,
    email,
    hashedPassword,
    role,
  );
  //delete password from user object before returning
  delete user.password;
  return user;
};

export const login = async (email: string, password: string) => {
  //check if user exists
  const user = await authQuery.getUserByEmail(email);
  if (!user) {
    throw new Error("User not found");
  }
  //compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }
  //delete password from user object before returning
  delete user.password;
  //generate token
  const { accessToken } = generateTokens({ userId: user.id, role: user.role });
  return { accessToken, user };
};
