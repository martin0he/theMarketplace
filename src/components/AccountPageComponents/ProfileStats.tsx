import { Grid, Box, Typography } from "@mui/material";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { CustomUser } from "../../types";
import { datePipe } from "../../pipes/sellDatePipe";

interface ProfileStatsProps {
  customUser: CustomUser;
}

const ProfileStats = ({ customUser }: ProfileStatsProps) => {
  const { width, height } = useWindowDimensions();

  interface StatsBoxProps {
    text: string;
    numValue?: number;
    stringValue?: string;
    width: number;
    height: number;
    color: string;
    isRight?: boolean;
  }

  const StatsBox = ({
    text,
    numValue,
    width,
    height,
    color,
    stringValue,
  }: StatsBoxProps) => {
    return (
      <Box
        boxShadow="2px 1px 3px #675f5f"
        borderRadius="12px"
        sx={{
          backgroundColor: color,
          height: {
            xs: height * 0.4,
            md: height * 0.3,
          },
          width: { xs: width * 0.7, md: width * 0.2 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "16px",
        }}
      >
        <Typography
          fontFamily="Josefin Sans"
          color="white"
          sx={{
            fontSize: {
              xs: "15px",
              sm: "20px",
              md: "25px",
            },
          }}
        >
          {text}
        </Typography>
        <Typography
          fontFamily="Josefin Sans"
          color="white"
          sx={{
            fontSize: {
              xs: "25px",
              sm: "30px",
              md: "35px",
            },
            alignSelf: "flex-end",
          }}
        >
          {numValue !== undefined ? numValue : stringValue}
        </Typography>
      </Box>
    );
  };

  return (
    <Grid
      container
      spacing={10}
      justifyContent="center"
      overflow="auto"
      width="fit-content"
      padding="10px"
    >
      <Grid
        item
        xs={12}
        display="flex"
        sx={{
          justifyContent: {
            sm: "center",
            md: "flex-start",
          },
        }}
      >
        <StatsBox
          text="items liked"
          numValue={
            customUser.items_liked.length ? customUser.items_liked.length : 0
          }
          width={width}
          height={height}
          color="#D48B94"
        />
      </Grid>
      <Grid
        item
        xs={12}
        display="flex"
        sx={{
          justifyContent: {
            sm: "center",
            md: "flex-end",
          },
        }}
      >
        <StatsBox
          text="items sold"
          numValue={
            customUser.items_sold.length ? customUser.items_sold.length : 0
          }
          width={width}
          height={height}
          color="#AADBD8"
        />
      </Grid>
      <Grid
        item
        xs={12}
        display="flex"
        sx={{
          justifyContent: {
            sm: "center",
            md: "flex-start",
          },
        }}
      >
        <StatsBox
          text="listings"
          numValue={customUser.listings.length ? customUser.listings.length : 0}
          width={width}
          height={height}
          color="#9FA8D6"
        />
      </Grid>
      <Grid
        item
        xs={12}
        display="flex"
        sx={{
          justifyContent: {
            sm: "center",
            md: "flex-end",
          },
        }}
      >
        <StatsBox
          text="member since"
          stringValue={datePipe(customUser.created_at.toString()) || "N/A"}
          width={width}
          height={height}
          color="#B593C8"
        />
      </Grid>
    </Grid>
  );
};

export default ProfileStats;
