import { Box, Divider, Grid, Typography } from "@mui/material";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Colors from "../../assets/Colors";
import ProfileStats from "./ProfileComponents/ProfileStats";
import { useAuth } from "../../auth/AuthProvider";
import ProfileForm from "./ProfileComponents/ProfileForm";

const ProfileSection = () => {
  const { height } = useWindowDimensions();
  const { customUser, user } = useAuth();

  return (
    <Grid
      container
      sx={{
        height: {
          xs: "auto",
          md: height * 0.68,
        },
        paddingTop: "20px",
      }}
      justifyContent="center"
      display="flex"
    >
      <Grid
        item
        xs={12}
        md={5.5} // Adjust to make space for the Divider
        padding="15px"
        container
        width={"100%"}
      >
        <ProfileForm />
      </Grid>

      <Divider
        orientation="vertical"
        flexItem
        sx={{
          display: { xs: "none", md: "block" },
          backgroundColor: Colors.royalBlue,
          width: "2.5px",
          borderRadius: "10px",
        }}
      />

      <Grid
        item
        xs={12}
        md={5.5}
        padding="15px"
        sx={{
          marginLeft: { md: "10px" },
          overflow: { xs: "visible", md: "hidden" }, // Allow overflow on small screens
        }}
      >
        {customUser && user ? (
          <Box
            sx={{
              "&::-webkit-scrollbar": {
                height: "8px",
                backgroundColor: "transparent",
              },
              "&::-webkit-scrollbar-track": {
                borderRadius: "4px",
                backgroundColor: "#d5d3d3",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: Colors.celestialBlue,
                borderRadius: "4px",
                "&:hover": {
                  backgroundColor: Colors.royalBlue,
                },
              },
              overflowY: { xs: "visible", md: "auto" },
              maxHeight: { md: height * 0.68 - 40 },
              paddingBottom: "20px",
            }}
          >
            <ProfileStats customUser={customUser} />
          </Box>
        ) : (
          <Typography fontFamily={"Josefin Sans"}>no stats :(</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default ProfileSection;
