import { User } from "@supabase/supabase-js";

export interface Listing {
  name: string;
  dateAdded: Date;
  dateDeleted?: Date;
  price: number;
  seller: CustomUser;
  paymentMethod: string[];
  exchangeLocation: string;
  imageUrl: string;
}

export interface CustomUser extends Pick<User, "email" | "phone"> {
  username: string;
  password: string;
  itemsSold?: Listing[];
  itemsPurchased?: Listing[];
  itemsLiked?: Listing[];
}
