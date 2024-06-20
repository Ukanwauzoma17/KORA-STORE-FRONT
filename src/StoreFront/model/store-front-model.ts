import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
  } from "sequelize-typescript";
import Admin from "../../Admin/model/admin-model";
  
  @Table({ tableName: "stores" })
  class Stores extends Model {
    @PrimaryKey
    @ForeignKey(() => Admin)
    @Column(DataType.INTEGER)
    userId!: number;
  
    @Column(DataType.STRING)
    storeName!: string;
  
    @ForeignKey(() => Admin)
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  storeId!: string;

    @BelongsTo(() => Admin, "userId")
    userByUserId!: Admin;
    

  }
  
  export default Stores;
  