import { Request, Response } from "express";
import { findUserToken } from "../../../token/token-service";
import { ApiResponse } from "../../../Utils/api-response";
import ErrorResponse from "../../../Utils/error-response";
import { confirmMailInfo } from "../../validator/confirm-email-validator";
import { verifyMailSchema } from "../../validator/verify-mail";
import { findByEmail, sendVerifymail } from "../service/admin-service";
export async function verifyMail(req: Request, res: Response) {
  
    const verifyToken = { token: req.query.token as string };
    const admin = confirmMailInfo(verifyToken);

    if (admin.error) {
      return ErrorResponse.send(res, { error: admin.error.details[0].message });
    }

    const userToken = await findUserToken(verifyToken.token);

    if (!userToken) {
      return ErrorResponse.send(res, { error: "Invalid link" });
    }

    const user = await findByEmail(userToken.email);

    if (!user) {
      return ErrorResponse.send(res, { error: "Invalid link" });
    }

    if (user.verified) {
      return ErrorResponse.send(res, { error: "User already verified" });
    }
    user.verified = true;
    await user.save();

    return res.json(ApiResponse.formatSuccessResponse({ message: "Verified Successfully" }));
  } 

export async function resendConfirmationMail(req: Request, res: Response) {
  const data = verifyMailSchema(req.body);
  if (data.error) {
    return ErrorResponse.send(res, { error: data.error.details[0].message });
  }
  const user = await findByEmail(data.value.email);
  if (!user) {
    return ErrorResponse.send(res, { error: "User Does not exist" });
  }
  if (user.verified) {
    return ErrorResponse.send(res, { error: "User already verified" });
  }

  const receivedLink = await sendVerifymail(data.value.email);


  res.json(ApiResponse.formatSuccessResponse({ message: "Confirmation link sent successfully" ,
data:receivedLink}));
}
