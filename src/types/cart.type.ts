export type TCart = {
  _id: string;
  productName: string;
  sellerEmail: string;
  buyerEmail: string;
  image: {
    imageUrl: string;
  };
  price: string;
  referenceId: string;
  category: string;
  subCategory: string;
  flashSale: boolean;
  cartQuantity: number;
  totalCost: number;
};
