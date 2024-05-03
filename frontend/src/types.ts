interface Listing {
  name: string;
  dateAdded: Date;
  dateDeleted?: Date;
  price: number;
  seller: User;
  paymentMethod: string[];
  exchangeLocation: string;
  imageUrl: string;
}

interface User {
  username: string;
  email: string;
  password: string;
  itemsSold?: Listing[];
  itemsPurchased?: Listing[];
  itemsLiked?: Listing[];
}
