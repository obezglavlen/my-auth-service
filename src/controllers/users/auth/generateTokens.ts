import jwt from "jsonwebtoken";

export default function generateTokens(username: string) {
  const refreshToken = jwt.sign(
    { username, trust: 1 },
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: "30d" }
  );

  const accessToken = jwt.sign(
    { username, trust: 1 },
    process.env.JWT_ACCESS_SECRET as string,
    { expiresIn: "20m" }
  );

  return {
    accessToken,
    refreshToken,
  };
}
