import {
    BeforeSave,
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

    @BeforeSave
    static async formatEmail(user: Admin) {
      if (user.email) {
        user.email = user.email.toLowerCase();
      }
    }
  }
  
  export default Admin;
  