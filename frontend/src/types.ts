import { User } from "@supabase/supabase-js";

export interface Listing {
  name: string;
  description: string;
  school: string;
  dateAdded: Date;
  dateDeleted?: Date;
  price: number;
  seller: CustomUser;
  paymentMethod: PaymentMethod[];
  exchangeLocation: string;
  imageUrls: string[];
  condition: string;
  isSold?: boolean;
}

export enum PaymentMethod {
  CASH = "Cash",
  VENMO = "Venmo",
  Zelle = "Zelle",
  BOA = "BOA",
  OTHER = "Other",
}

export interface CustomUser extends Pick<User, "email" | "phone"> {
  username: string;
  password: string;
  school: string;
  itemsSold?: Listing[];
  itemsPurchased?: Listing[];
  itemsLiked?: Listing[];
}
