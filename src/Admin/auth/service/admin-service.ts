import { generateToken } from "../../../token/token-service";
import Admin from "../../model/admin-model";
import Mailer from "../../../Utils/mail"
export const findByEmail = async (email: string): Promise<Admin | null> => {
    const user = await Admin.findOne({
      where: { email },
    
    });
  
    return user;
  };

  export const findUserPhoneNumber= async (phoneNumber:string):Promise<Admin | null>=>{
    const user = await Admin.findOne({where:{phoneNumber}})
    return user
  }
 
  export async function sendVerifymail(email: string) {
    const token = await generateToken(email);
    const user = await findByEmail(email);
    const url = process.env.EMAIL_CONFIRMATION_URL;
    if (!user) {
      return "User does not exist";
    }
    const mailData = {
      to: email,
      subject: "Account verification link",
      text: `Hello, ${user.firstName} Please verify your email by
          clicking this link :
          ${url}${token} `,
    };
  
    await Mailer.sendMail(mailData);
    const sent_URL = `${url}${token} `;
    return sent_URL;
  }
  
  export const findByUserId = async (userId: number): Promise<Admin | null> => {
    const user = await Admin.findOne({ where: { id: userId }});
    return user;
  };