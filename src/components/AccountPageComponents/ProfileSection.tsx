import { Divider, Grid, Typography } from "@mui/material";
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
          xs: height * 0.9,
          md: height * 0.6,
          paddingTop: "20px",
        },
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
        sx={{ marginLeft: "10px" }} // Tiny gap between the divider and ProfileStats
      >
        {customUser && user ? (
          <ProfileStats customUser={customUser} />
        ) : (
          <Typography fontFamily={"Josefin Sans"}>no stats :(</Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default ProfileSection;
