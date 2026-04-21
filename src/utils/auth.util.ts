import jwt from "jsonwebtoken";

const generateAccessToken = (payload: { userId: string; role: string }) => {
  const token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: "1d",
  });
  return token;
};

const generateRefreshToken = (payload: { userId: string; role: string }) => {
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "7d",
  });
  return refreshToken;
};

export const generateTokens = (payload: { userId: string; role: string }) => {
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);
  return { accessToken, refreshToken };
};
