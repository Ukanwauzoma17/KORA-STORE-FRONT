import {
  BeforeSave,
  Column,
  IsEmail,
  Model,
  Table,
  Unique,
  Validate,
} from "sequelize-typescript";

@Table({ tableName: "Admin" })
class Admin extends Model {
  @Column
  declare firstName: string;

  @Column
  declare lastName: string;

  @Column
  declare businessName: string;

  @Unique
  @IsEmail
  @Column
  declare email: string;

  @Column
  declare password: string;

  @Column
  declare phoneNumber: string;

  @Column
  declare loginAttempts: number;

  @Column
  declare locked: boolean;

  @Column
  declare newBusiness: boolean;

  @Column
  declare preExistingBusiness: boolean;

  @Validate({
    isIn: {
      args: [["Nigeria"]], 
      msg: "We're only avaailable in Nigeria for now",
    },
  })

  @BeforeSave
  static async formatEmail(user: Admin) {
    if (user.email) {
      user.email = user.email.toLowerCase();
    }
  }
}

export default Admin;
