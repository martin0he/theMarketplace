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
  condition: Condition | undefined;
  isSold?: boolean;
}

export enum PaymentMethod {
  CASH = "Cash",
  VENMO = "Venmo",
  Zelle = "Zelle",
  BANKTRANSFER = "Bank Transfer",
  OTHER = "Other",
}

export enum Condition {
  NEW = "New",
  LIKENEW = "Like New",
  GOODCONDITION = "Good Condition",
  HEAVILYUSED = "Heavily Used",
  EMPTY = "",
}

export interface CustomUser extends Pick<User, "email" | "phone"> {
  username: string;
  password: string;
  school: string;
  itemsSold?: Listing[];
  itemsPurchased?: Listing[];
  itemsLiked?: Listing[];
}
