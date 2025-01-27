import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import jwt from "jsonwebtoken";

namespace cookieManagement {
  export function verifyJwtFromCookies(req: NextApiRequest, res: NextApiResponse): string | null {
    const cookies = req.headers.cookie;
    if (!cookies) {
      res.status(401).json({ success: false, message: "No se encontraron cookies" });
      return null;
    }

    const parsedCookies = cookie.parse(cookies);
    const jwtToken = parsedCookies.jwtToken;
    if (!jwtToken) {
      res.status(401).json({ success: false, message: "No se encontró el token en las cookies" });
      return null;
    }

    try {
      const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY as string) as { email: string };
      return decoded.email;
    } catch (error) {
      res.status(401).json({ success: false, message: "Token inválido o expirado" });
      return null;
    }
  }
}

export default cookieManagement;
