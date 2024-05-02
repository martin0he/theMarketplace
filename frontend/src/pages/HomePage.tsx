import { Box, Grid, Typography } from "@mui/material";
import Colors from "../assets/Colors";
import useWindowDimensions from "../hooks/useWindowDimensions";
import SmallListingCard from "../components/SmallListingCard";

const HomePage = () => {
  const { width } = useWindowDimensions();

  const exampleUser: User = {
    username: "glazedGuat",
    email: "martin@email.com",
    password: "passywo",
    itemsSold: [],
    itemsPurchased: [],
    itemsLiked: [],
  };

  const exampleListing: Listing = {
    name: "Example Small Item",
    dateAdded: new Date(),
    price: 28.6,
    seller: exampleUser,
    paymentMethod: [],
    exchangeLocation: "",
    imageUrl: "",
  };

  return (
    <Box paddingTop={10} paddingBottom={40}>
      <Box justifyContent="center" display="flex" alignItems="center">
        <Typography fontFamily={"inherit"} fontSize={30} marginTop={7}>
          Welcome, John
        </Typography>
      </Box>

      <Box marginTop={8} marginLeft={5}>
        <Typography
          fontWeight="bold"
          fontSize={27}
          fontFamily="inherit"
          color={Colors.royalBlue}
        >
          Northeastern University Marketplace
        </Typography>
      </Box>

      <Box
        justifyContent={"center"}
        alignItems={"center"}
        display={"flex"}
        marginTop="30px"
      >
        <Grid width={0.88 * width} height="260px">
          <Grid
            item
            container
            flexDirection="row"
            width="100%"
            height="100%"
            columnGap={4}
          >
            <Grid item xs={12} md={5} paddingY="10px">
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
                  justifyContent="center"
                  alignItems="center"
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
                      overflowX: "scroll",
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
                    <SmallListingCard listing={exampleListing} />
                    <SmallListingCard listing={exampleListing} />
                    <SmallListingCard listing={exampleListing} />
                    <SmallListingCard listing={exampleListing} />
                    <SmallListingCard listing={exampleListing} />
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} paddingY="10px">
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
              </Box>
            </Grid>
            <Grid item xs={12} md={5} paddingY="10px">
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
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;
