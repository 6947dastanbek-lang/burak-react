// [KETMA-KETLIK-COMMENT: 1.1-BOSQICH (DEFINE)] Savatchadagi mahsulot modeli (CartItem interfeysi)
export interface CartItem {
  _id: string;
  quantity: number;
  name: string;
  price: number;
  image: string;
}
