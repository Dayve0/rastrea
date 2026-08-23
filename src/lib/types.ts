export type Store = {
  id: string
  name: string
  short: string
  color: string
}

export type Offer = {
  storeId: string;
  title: string;
  seller: string;
  manufacturer: string;
  source: string;
  current_price: number;
  old_price: number | null;
  pix_price: number;
  max_parcels: string;
  discount: number;
  stock: number;
  rating: number;
  ratingCount: number;
  available: boolean;
  img_link: string;
  cupoum: string | null;
  free_shipping: boolean;
}

export type StoreProgress = {
  storeId: string
  status: "pending" | "scanning" | "done" | "error"
  found: number
}
