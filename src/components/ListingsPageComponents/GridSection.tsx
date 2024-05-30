// src/components/GridSection.tsx
import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import supabase from "../../auth/supabase";
import { useAuth } from "../../auth/AuthProvider";
import { Listing } from "../../types";
import SmallItem from "./SmallItem";
import ListingModal from "./ListingModal";

const GridSection = () => {
  const { customUser } = useAuth();
  const [currentListings, setCurrentListings] = useState<Listing[]>([]);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleFetchingListings = async () => {
    if (!customUser) return;
    const { data: Listings, error } = await supabase
      .from("Listings")
      .select("*")
      .eq("school", customUser.school);

    if (error) {
      console.error("Error fetching listings:", error);
      return;
    }

    setCurrentListings(Listings as Listing[]);
  };

  const handleOpenModal = (listing: Listing) => {
    setSelectedListing(listing);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedListing(null);
  };

  useEffect(() => {
    handleFetchingListings();
  }, [customUser]);

  return (
    <Box>
      <Grid container spacing={2} paddingTop="10px">
        {currentListings.map((listing) => (
          <Grid item xs={12} sm={4} md={3} key={listing.id}>
            <SmallItem listing={listing} onClick={handleOpenModal} />
          </Grid>
        ))}
      </Grid>
      <ListingModal
        open={modalOpen}
        handleClose={handleCloseModal}
        listing={selectedListing}
      />
    </Box>
  );
};

export default GridSection;
