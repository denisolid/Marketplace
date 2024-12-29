// Cookie configuration constants
export const COOKIE_CONFIG = {
  token: {
    name: "token",
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    },
  },
};
