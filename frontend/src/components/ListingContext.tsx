import React, { createContext, useState, useContext, ReactNode } from "react";
import { Listing } from "../types";

interface ListingContextProps {
  listing: Listing | null;
  setListing: React.Dispatch<React.SetStateAction<Listing | null>>;
}

interface ListingProviderProps {
  children: ReactNode;
}

const ListingContext = createContext<ListingContextProps | undefined>(
  undefined
);

export const ListingProvider: React.FC<ListingProviderProps> = ({
  children,
}) => {
  const [listing, setListing] = useState<Listing | null>(null);

  return (
    <ListingContext.Provider value={{ listing, setListing }}>
      {children}
    </ListingContext.Provider>
  );
};

export const useListing = () => {
  const context = useContext(ListingContext);
  if (!context) {
    throw new Error("useListing must be used within a ListingProvider");
  }
  return context;
};
