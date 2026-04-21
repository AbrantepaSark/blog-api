import type { Request, Response } from "express";
import { register, login } from "../services/auth.service";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role = "user" } = req.body;
    const user = await register(username, email, password, role);
    res.status(201).json({ user, message: "User created successfully" });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const signIn = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    const { accessToken, user } = await login(email, password);
    res.status(200).json({ accessToken, user, message: "Login successful" });
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};
