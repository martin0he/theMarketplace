import { User } from "@supabase/supabase-js";

export interface Listing {
  id?: string;
  name: string;
  description: string;
  school: string;
  created_at: Date;
  date_deleted?: Date;
  price: number;
  seller: CustomUser;
  payment_methods: PaymentMethod[];
  exchange_location: string;
  imageUrls: string[];
  condition: Condition | undefined;
  liked_by: string[];
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
  id?: string;
  username: string;
  password: string;
  school: string;
  items_sold: string[];
  items_liked: string[];
  phone?: string;
  listings: string[];
  created_at?: Date;
}
