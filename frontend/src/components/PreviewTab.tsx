import { Box, Grid, Typography } from "@mui/material";
import { useAuth } from "../auth/AuthProvider";
import useWindowDimensions from "../hooks/useWindowDimensions";

interface PreviewTabProps {
  listingName: string;
  listingCondition: string;
  listingDescription: string;
  listingPrice: string;
  listingPaymentMethods: string[];
  listingLocation: string;
}

const PreviewTab = ({
  listingName,
  listingCondition,
  listingDescription,
  listingPrice,
  listingPaymentMethods,
  listingLocation,
}: PreviewTabProps) => {
  const { customUser } = useAuth();
  const formattedDate = new Date().toLocaleDateString();
  const { width, height } = useWindowDimensions();

  return (
    <Box
      sx={{
        padding: "10px",
      }}
    >
      <Grid container>
        <Grid item>
          <Typography
            fontFamily="Josefin Sans"
            sx={{
              fontSize: "33px",
              marginBottom: "10px",
              fontWeight: "bold",
            }}
          >
            {listingName ? `${listingName} for sale` : "Name not specified"}
          </Typography>
        </Grid>

        <Grid item container>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography
                fontFamily="Josefin Sans"
                sx={{ margin: "5px 0", fontSize: "19px" }}
              >
                <strong>Posted: </strong>
                {formattedDate}
              </Typography>
              <Typography
                fontFamily="Josefin Sans"
                sx={{ margin: "5px 0", fontSize: "19px" }}
              >
                <strong>By: </strong>
                {customUser?.username}
              </Typography>
              <Typography
                fontFamily="Josefin Sans"
                sx={{ margin: "5px 0", fontSize: "19px" }}
              >
                <strong>Condition: </strong>
                {listingCondition ? `${listingCondition}` : "Not Selected"}
              </Typography>
              <Box
                sx={{
                  display: "inline-block",
                  maxWidth: 0.35 * width,
                  maxHeight: 0.25 * height,
                  overflow: "hidden",
                  width: "fit-content",
                  height: "fit-content",
                  wordWrap: "break-word",
                  whiteSpace: "pre-wrap",
                }}
              >
                <Typography
                  fontFamily="Josefin Sans"
                  sx={{
                    margin: "5px 0",
                    fontSize: "19px",
                    wordWrap: "break-word",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  <strong>Description: </strong>
                  {listingDescription ? `${listingDescription}` : "N/A"}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              width="300px"
              height="300px"
              marginBottom="25px"
              sx={{ backgroundColor: "green" }}
            ></Box>
          </Grid>
        </Grid>

        <Grid container item>
          <Grid item xs={12} md={6}>
            <Typography
              fontFamily="Josefin Sans"
              sx={{ margin: "5px 0", fontSize: "19px" }}
            >
              <strong>Payment: </strong>
            </Typography>
            <ul style={{ paddingLeft: "18px", margin: "3px" }}>
              {listingPaymentMethods && listingPaymentMethods.length > 0
                ? listingPaymentMethods.map((method, index) => (
                    <li key={index} style={{ fontSize: "18px" }}>
                      {method}
                    </li>
                  ))
                : "N/A"}
            </ul>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              fontFamily="Josefin Sans"
              sx={{ margin: "5px 0", fontSize: "19px" }}
            >
              <strong>Exchange At: </strong>
              {listingLocation ? `${listingLocation}` : "Not Specified"}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PreviewTab;
