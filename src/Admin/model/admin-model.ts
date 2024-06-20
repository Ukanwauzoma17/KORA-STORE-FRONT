import {
  Column,
  HasOne,
  IsEmail,
  Model,
  Table,
  Unique,
} from "sequelize-typescript";
import Stores from "../../StoreFront/model/store-front-model";

@Table({ tableName: "admin" })
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

  @HasOne(() => Stores, "userId")
  storeByUserId!: Stores;

}

export default Admin;
