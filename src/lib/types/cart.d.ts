// export interface CartType {
//     _id: string;
//     product: {
//         _id: string;
//         title: string;
//         slug: string;
//         description: string;
//         price: number;
//         priceAfterDiscount: number;
//         imgCover: string;
//         images?: string[];
//     };
//     quantity: number;
//     price: number;
// }

export interface Root {
  message: string
  numOfCartItems: number
  cart: Cart
}

export interface CartType {
  _id: string
  user: string
  cartItems: CartItem[]
  appliedCoupons: any[]
  totalPrice: number
  createdAt: string
  updatedAt: string
  __v: number
}

export interface CartItem {
  product: Product
  price: number
  quantity: number
  _id: string
}

export interface Product {
  _id: string
  title: string
  slug: string
  description: string
  imgCover: string
  images: string[]
  price: number
  priceAfterDiscount: number
  quantity: number
  category: string
  occasion: string
  createdAt: string
  updatedAt: string
  __v: number
  isSuperAdmin: boolean
  sold: number
  rateAvg: number
  rateCount: number
  id: string
}

