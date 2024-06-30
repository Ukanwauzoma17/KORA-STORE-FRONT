import { BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import Admin from "../../Admin/model/admin-model";

@Table({ tableName: "products" })
class Products extends Model {
  @ForeignKey(() => Admin)
  @Column(DataType.INTEGER)
  userId!: number;

  @Column(DataType.STRING)
  productName!: string;

  @PrimaryKey
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  productId!: string;

  @Column(DataType.DECIMAL(10, 2))
  price!: number;

  @Column(DataType.STRING)
  description!: string;

  @Column(DataType.INTEGER)
  quantity!: number;

  @Column(DataType.INTEGER)
  count!:number

  @BelongsTo(() => Admin, "userId")
  user!: Admin;

  
}

export default Products;