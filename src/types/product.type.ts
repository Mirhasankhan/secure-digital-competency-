export type TProduct = {
  _id: string;
  category: string;
  flashSale: boolean;
  price: string;
  image: {
    imageUrl: string;
  };
  productName: string;
  subCategory: string;
  content: string;
  productId: string;
  discountPercentage: number;
  email: string;
  cartQuantity: number;
  quantity: number;
  totalCost: number;
  seller: string;
  sold: number;
  date: string;
  status: string;
  reviews: [{ username: string; rating: number; review: string }];
  address: { city: string; province: string; street: string };
};
