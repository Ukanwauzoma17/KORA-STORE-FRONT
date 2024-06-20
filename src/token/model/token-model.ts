import {
  Table,
  Column,
  Model,
  IsEmail,
  Unique,
  PrimaryKey,
  DataType,
} from "sequelize-typescript";

@Table
class Token extends Model {
  @IsEmail
  @Unique
  @Column
  email!: string;

  @PrimaryKey
  @Unique
  @Column({ defaultValue: DataType.UUIDV4 })
  token!: string;

  @Column
  expiresAt!: Date;
}

export default Token;
