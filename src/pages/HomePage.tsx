/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Grid, Tooltip, Typography } from "@mui/material";
import Colors from "../assets/Colors";
import useWindowDimensions from "../hooks/useWindowDimensions";
import SmallListingCard from "../components/general/SmallListingCard";
import { useAuth } from "../auth/AuthProvider";
import UniversityTitle from "../components/general/UniversityTitle";
import supabase from "../auth/supabase";
import { Listing } from "../types";
import { useEffect, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { formatISO, subDays } from "date-fns";

const HomePage = () => {
  const { width } = useWindowDimensions();
  const { customUser, user } = useAuth();
  const [userListings, setUserListings] = useState<Listing[]>([]);
  const [usersLikedListings, setUsersLikedListings] = useState<Listing[]>([]);
  const [recentListings, setRecentListings] = useState<Listing[]>([]);
  const [recentlySoldListings, setRecentlySoldListings] = useState<Listing[]>(
    []
  );

  const fetchUserLikedListings = async () => {
    const { data: Listings, error } = await supabase
      .from("Listings")
      .select("*")
      .contains("liked_by", [user?.id]);

    if (error) {
      console.error("Error fetching users liked listings:", error);
    } else {
      setUsersLikedListings(Listings as Listing[]);
    }
  };

  useEffect(() => {
    const fetchUserListings = async () => {
      const { data: Listings, error } = await supabase
        .from("Listings")
        .select("*")
        .eq("seller_id", user?.id);

      if (error) {
        console.error("Error fetching user listings:", error);
      } else {
        setUserListings(Listings as Listing[]);
      }
    };

    const fetchRecentListings = async () => {
      const sevenDaysAgo = formatISO(subDays(new Date(), 7), {
        representation: "date",
      });
      const { data: Listings, error } = await supabase
        .from("Listings")
        .select("*")
        .gt("created_at", sevenDaysAgo)
        .eq("school", customUser?.school);

      if (error) {
        console.error("Error fetching recent listings:", error);
      } else {
        setRecentListings(Listings as Listing[]);
      }
    };

    const fetchRecentlySoldListings = async () => {
      const sevenDaysAgo = formatISO(subDays(new Date(), 7), {
        representation: "date",
      });
      const { data: Listings, error } = await supabase
        .from("Listings")
        .select("*")
        .gt("date_deleted", sevenDaysAgo)
        .eq("school", customUser?.school);

      if (error) {
        console.error("Error fetching recently sold listings:", error);
      } else {
        setRecentlySoldListings(Listings as Listing[]);
      }
    };

    fetchUserListings();
    fetchRecentListings();
    fetchRecentlySoldListings();
    fetchUserLikedListings();
  }, [user]);

  return (
    <Box paddingTop={10} paddingBottom={40}>
      <Box justifyContent="center" display="flex" alignItems="center">
        {customUser !== null ? (
          <Typography fontFamily={"inherit"} fontSize={30} marginTop={7}>
            {`Hello ${customUser?.username}`}
          </Typography>
        ) : (
          <Tooltip
            arrow
            placement="bottom"
            title={
              <Typography fontFamily="Josefin Sans">
                to use theMarketplace, you need to be signed in
              </Typography>
            }
          >
            <span style={{ display: "flex", alignItems: "center" }}>
              <Typography fontFamily="Josefin Sans" fontSize={30} marginTop={7}>
                Not Logged In
              </Typography>
              <InfoIcon fontSize="small" sx={{ marginLeft: 1 }} />
            </span>
          </Tooltip>
        )}
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
                    {userListings.length > 0 ? (
                      userListings.map((listing, index) => (
                        <SmallListingCard key={index} listing={listing} />
                      ))
                    ) : (
                      <Typography fontFamily="Josefin Sans">
                        You haven't posted anything!
                      </Typography>
                    )}
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
                    {usersLikedListings.length > 0 ? (
                      usersLikedListings.map((listing, index) => (
                        <SmallListingCard
                          key={index}
                          listing={listing}
                          onLikeChange={fetchUserLikedListings}
                        />
                      ))
                    ) : (
                      <Typography fontFamily="Josefin Sans">
                        You haven't liked any listings!
                      </Typography>
                    )}
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
                    {recentListings.length > 0 ? (
                      recentListings.map((listing, index) => (
                        <SmallListingCard
                          key={index}
                          listing={listing}
                          isLikable
                          onLikeChange={fetchUserLikedListings}
                        />
                      ))
                    ) : (
                      <Typography fontFamily="Josefin Sans">
                        Nothing has been posted within the last week :(
                      </Typography>
                    )}
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
                    {recentlySoldListings.length > 0 ? (
                      recentlySoldListings.map((listing, index) => (
                        <SmallListingCard key={index} listing={listing} />
                      ))
                    ) : (
                      <Typography fontFamily="Josefin Sans">
                        Nothing sold within the last week!
                      </Typography>
                    )}
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
