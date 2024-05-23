import { Box, Grid, Typography } from "@mui/material";
import Colors from "../assets/Colors";
import useWindowDimensions from "../hooks/useWindowDimensions";
import SmallListingCard from "../components/general/SmallListingCard";
import { useAuth } from "../auth/AuthProvider";
import UniversityTitle from "../components/general/UniversityTitle";
import supabase from "../auth/supabase";
import { Listing } from "../types";
import { useEffect, useState } from "react";

const HomePage = () => {
  const { width } = useWindowDimensions();
  const { customUser, user } = useAuth();
  const [userListings, setUserListings] = useState<Listing[]>([]);
  useEffect(() => {
    const fetchUserListings = async () => {
      const { data: Listings, error } = await supabase
        .from("Listings")
        .select("*")
        .eq("seller_id", user?.id);

      if (error) {
        console.error("Error fetching listings:", error);
      } else {
        setUserListings(Listings as Listing[]);
      }
    };

    fetchUserListings();
  }, [user]);

  return (
    <Box paddingTop={10} paddingBottom={40}>
      <Box justifyContent="center" display="flex" alignItems="center">
        <Typography fontFamily={"inherit"} fontSize={30} marginTop={7}>
          {customUser !== null
            ? `Hello ${customUser?.username}`
            : "Not Logged In"}
        </Typography>
      </Box>

      <Box marginTop={8} marginLeft={5}>
        <UniversityTitle />
      </Box>
      <Box
        justifyContent={"center"}
        alignItems={"center"}
        display={"flex"}
        marginTop="30px"
      >
        <Grid container width={0.88 * width} height="260px">
          <Grid
            item
            container
            flexDirection="row"
            width="100%"
            height="100%"
            columnGap={4}
          >
            <Grid item xs={12} md={5} paddingY="10px">
              {/* insert first component here */}
              <Box
                width="100%"
                height="100%"
                sx={{
                  backgroundColor: "#bedcee",
                  borderRadius: "10px",
                  border: 0.7,
                  borderColor: "#3aacd9cc",
                  boxShadow: 1,
                }}
              >
                <Typography
                  padding="8px"
                  fontSize={20}
                  fontFamily={"inherit"}
                  color={"black"}
                >
                  Your Items
                </Typography>

                <Box
                  marginTop="10px"
                  marginLeft="30px"
                  justifyContent="flex-start"
                  display="flex"
                >
                  <Box
                    maxWidth="90%"
                    height="fit-content"
                    paddingBottom="10px"
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "nowrap",
                      overflowX: "auto",
                      "&::-webkit-scrollbar": {
                        height: "8px",
                        backgroundColor: "transparent",
                      },
                      "&::-webkit-scrollbar-track": {
                        borderRadius: "4px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: Colors.celestialBlue,
                        borderRadius: "4px",
                        "&:hover": {
                          backgroundColor: Colors.royalBlue,
                        },
                      },
                    }}
                  >
                    {userListings.map((listing, index) => (
                      <SmallListingCard key={index} listing={listing} />
                    ))}
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} paddingY="10px">
              {/* insert second component here */}
              <Box
                width="100%"
                height="100%"
                sx={{
                  backgroundColor: "#caeec8e0",
                  borderRadius: "10px",
                  border: 0.7,
                  borderColor: "#49d049cc",
                  boxShadow: 1,
                }}
              >
                <Typography
                  padding="8px"
                  fontSize={20}
                  fontFamily={"inherit"}
                  color={"black"}
                >
                  Your Likes
                </Typography>
                <Box
                  marginTop="10px"
                  marginLeft="30px"
                  justifyContent="flex-start"
                  display="flex"
                >
                  <Box
                    maxWidth="90%"
                    height="fit-content"
                    paddingBottom="10px"
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "nowrap",
                      overflowX: "auto",
                      "&::-webkit-scrollbar": {
                        height: "8px",
                        backgroundColor: "transparent",
                      },
                      "&::-webkit-scrollbar-track": {
                        borderRadius: "4px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: Colors.celestialBlue,
                        borderRadius: "4px",
                        "&:hover": {
                          backgroundColor: Colors.royalBlue,
                        },
                      },
                    }}
                  >
                    {userListings.map((listing, index) => (
                      <SmallListingCard key={index} listing={listing} />
                    ))}
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Grid
            item
            container
            flexDirection="row"
            width="100%"
            height="100%"
            columnGap={4}
            marginTop="7px"
          >
            <Grid item xs={12} md={6} paddingY="10px">
              {/* insert third component here */}
              <Box
                width="100%"
                height="100%"
                sx={{
                  backgroundColor: "#caeec8e0",
                  borderRadius: "10px",
                  border: 0.7,
                  borderColor: "#49d049cc",
                  boxShadow: 1,
                }}
              >
                <Typography
                  padding="8px"
                  fontSize={20}
                  fontFamily={"inherit"}
                  color={"black"}
                >
                  Recently Posted
                </Typography>
                <Box
                  marginTop="10px"
                  marginLeft="30px"
                  justifyContent="flex-start"
                  display="flex"
                >
                  <Box
                    maxWidth="90%"
                    height="fit-content"
                    paddingBottom="10px"
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "nowrap",
                      overflowX: "auto",
                      "&::-webkit-scrollbar": {
                        height: "8px",
                        backgroundColor: "transparent",
                      },
                      "&::-webkit-scrollbar-track": {
                        borderRadius: "4px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: Colors.celestialBlue,
                        borderRadius: "4px",
                        "&:hover": {
                          backgroundColor: Colors.royalBlue,
                        },
                      },
                    }}
                  >
                    {userListings.map((listing, index) => (
                      <SmallListingCard key={index} listing={listing} />
                    ))}
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={5} paddingY="10px">
              {/* insert fourth component here */}
              <Box
                width="100%"
                height="100%"
                sx={{
                  backgroundColor: "#bedcee",
                  borderRadius: "10px",
                  border: 0.7,
                  borderColor: "#3aacd9cc",
                  boxShadow: 1,
                }}
              >
                <Typography
                  padding="8px"
                  fontSize={20}
                  fontFamily={"inherit"}
                  color={"black"}
                >
                  Recently Sold
                </Typography>
                <Box
                  marginTop="10px"
                  marginLeft="30px"
                  justifyContent="flex-start"
                  display="flex"
                >
                  <Box
                    maxWidth="90%"
                    height="fit-content"
                    paddingBottom="10px"
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "nowrap",
                      overflowX: "auto",
                      "&::-webkit-scrollbar": {
                        height: "8px",
                        backgroundColor: "transparent",
                      },
                      "&::-webkit-scrollbar-track": {
                        borderRadius: "4px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: Colors.celestialBlue,
                        borderRadius: "4px",
                        "&:hover": {
                          backgroundColor: Colors.royalBlue,
                        },
                      },
                    }}
                  >
                    {userListings.map((listing, index) => (
                      <SmallListingCard key={index} listing={listing} />
                    ))}
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;
