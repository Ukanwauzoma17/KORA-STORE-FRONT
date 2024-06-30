import Products from "../model/product-model";

export const findUserProduct = async (productId:string): Promise<Products | null> => {
    const user = await Products.findOne({
      where: {productId},
    
    });
  
    return user;
  };
