import { Response, NextFunction, Request } from "express";
import dotenv from "dotenv";
import { findUserToken } from "../token/token-service";
import { findByEmail } from "../Admin/auth/service/admin-service";
import { AdminAttributes } from "../Utils/type";
import { UnAuthorizedException } from "../Utils/unauthorized.exception";

dotenv.config();

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { authorization } = req.headers;
  if (!authorization) throw new UnAuthorizedException("No authorization token");

  const accessToken = authorization.split(" ")[1];
  if (!accessToken)
    throw new UnAuthorizedException("No authorization token provided");

  const userToken = await findUserToken(accessToken);
  if (!userToken) throw new UnAuthorizedException("Invalid token");

  const userEmail = userToken.email;

  const user = await findByEmail(userEmail);
  if (!user) throw new UnAuthorizedException("Invalid token");

  req.admin= user as AdminAttributes;
  next();
};
