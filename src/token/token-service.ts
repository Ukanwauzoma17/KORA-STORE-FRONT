import { Op } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import Token from "./model/token-model";

const TOKEN_EXPIRATION = 30 * 60 * 1000; // 30 minutes in milliseconds
export async function generateToken(email: string): Promise<string> {
  const expiresAt = new Date(Date.now() + TOKEN_EXPIRATION);

  // Check if a token already exists for the given email and delete it
  const userExist = await Token.findOne({ where: { email } });
  if (userExist) {
    await Token.destroy({ where: { email } });
  }

  // Generate a UUID token
  const token = uuidv4();

  // Save the new token in the Token model
  await Token.create({ email, token, expiresAt });

  return token;
}

// Verify a token

export const findUserToken = async (token: string): Promise<Token | null> => {
  const user = await Token.findOne({
    where: {
      token,
      expiresAt: {
        [Op.gt]: Date.now(),
      },
    },
  });
  return user;
};
