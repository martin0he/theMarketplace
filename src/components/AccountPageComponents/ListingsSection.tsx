import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Listing } from "../../types";
import { useAuth } from "../../auth/AuthProvider";
import supabase from "../../auth/supabase";
import ListingCard from "./ListingCard";
import { Carousel } from "react-bootstrap";
import useWindowDimensions from "../../hooks/useWindowDimensions";

const ListingsSection = () => {
  const [myListings, setMyListings] = useState<Listing[]>([]);
  const { user, customUser } = useAuth();
  const { width } = useWindowDimensions();
  useEffect(() => {
    const fetchUserListings = async () => {
      const { data: Listings, error } = await supabase
        .from("Listings")
        .select("*")
        .eq("seller_id", user?.id);

      if (error) {
        console.error("Error fetching user listings:", error);
      } else {
        setMyListings(Listings as Listing[]);
      }
    };

    fetchUserListings();
  }, [user]);

  return (
    <Box
      sx={{
        padding: "10px",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography fontFamily="inherit" variant="h5" paddingBottom="20px">
        {customUser ? `${customUser.username}'s Listings` : "Not Signed In"}
      </Typography>
      {myListings.length > 0 ? (
        <Carousel
          interval={null}
          touch
          variant="dark"
          style={{
            width: "min-content",
            height: "min-content",
            marginTop: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          {myListings.map((l) => (
            <Carousel.Item>
              <Box paddingX={width * 0.017} paddingBottom="50px">
                <ListingCard listing={l} />
              </Box>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <Typography>no</Typography>
      )}
    </Box>
  );
};

export default ListingsSection;
