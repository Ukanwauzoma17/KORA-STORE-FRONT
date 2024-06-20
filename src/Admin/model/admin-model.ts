import {
  Column,
  IsEmail,
  Model,
  Table,
  Unique,
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
  declare verified:boolean

  @Column
  declare newBusiness: boolean;

  @Column
  declare preExistingBusiness: boolean;

}

export default Admin;
