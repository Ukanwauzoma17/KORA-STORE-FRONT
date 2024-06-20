
import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import _ from "lodash";
import { generateToken } from "../../../token/token-service";
import { ApiResponse } from "../../../Utils/api-response";
import ErrorResponse from "../../../Utils/error-response";
import Admin from "../../model/admin-model";
import { loginInfo } from "../../validator/login-validator";
import { validateUser } from "../../validator/sign-up-validator";
import { findByEmail, findUserPhoneNumber } from "../service/admin-service";

// Sign up a new user
export const signUp = async (req: Request, res: Response): Promise<void> => {
  // Validate user input
  const validate = validateUser(req.body);
  const { firstName, lastName, confirmPassword, phoneNumber, email, password,businessName } =
    validate.value;

  if (validate.error) {
    // Send error response if validation fails
    res.status(400).json({ error: validate.error.details[0].message });
    return;
  }

  const user = await findByEmail(email);
  if (user) {
    // Send error response if user already exists
    res.status(400).json({ message: "User Already Exists. Login Instead" });
    return;
  }

  const userPhoneNumber = await findUserPhoneNumber(phoneNumber);
  if (userPhoneNumber) {
    // Send error response if phone number already exists
    res.status(400).json({ message: "Phone number already exists" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const accessToken = await generateToken(email);
  // Create user details
  const adminDetails = Admin.create({
    firstName,
    lastName,
    phoneNumber,
    password: hashedPassword,
    email,
    businessName,
  });

  const details = _.pick(req.body, ["firstName", "lastName", "email","businessName"]);

  // Send success response with user details and access token
  res.json(ApiResponse.formatSuccessResponse({message:"Login successful", data: { accessToken,...details } }));

  // Save user details to the database
  await (await adminDetails).save();
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const adminLogin = loginInfo(req.body);
  if (adminLogin.error) {
    ErrorResponse.send(res, { error: adminLogin.error.details[0].message });
    return;
  }

  const { email, password } = adminLogin.value;
  const loginAttemptsThreshold = 5;
  const user = await findByEmail(email);
  if (!user) {
    ErrorResponse.send(res, { error: "User does not exist" });
    return;
  }

  if (!user.verified) {
    ErrorResponse.send(res, { error: "User email not verified" });
    return;
  }

  const hashedPassword = user.password;
  const isPasswordValid = await bcrypt.compare(password, hashedPassword);
  if (!isPasswordValid) {
    user.loginAttempts += 1;
    await user.save();
    if (user.loginAttempts >= loginAttemptsThreshold) {
      user.locked = true;
      await user.save();
      res.status(400).send({ error: "Account locked. Please reset password." });
      return;
    }
    res.status(400).send({ error: "Invalid password" });
  } else {
    user.loginAttempts = 0; // Reset login attempts upon successful login
    await user.save();
    const token = await generateToken(email);
    const loginDetails = _.pick(user, ["firstName", "lastName", "email"]);
    res.json(ApiResponse.formatSuccessResponse({ message: "Login successful", data: { token, ...loginDetails } }));
  }
};