import { Box, Typography } from "@mui/material";
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
      <Typography
        fontFamily="Josefin Sans"
        sx={{
          fontSize: "29px",
          marginBottom: "10px",
          fontWeight: "bold",
          marginLeft: "16px",
        }}
      >
        {listingName}
      </Typography>
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
        {listingCondition}
      </Typography>
      <Box
        width="wrap-content"
        maxWidth={0.35 * width}
        height={0.25 * height}
        sx={{
          overflow: "hidden",
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
          {listingDescription}
        </Typography>
      </Box>

      <Box sx={{ marginTop: "20px" }}>
        <Typography
          fontFamily="Josefin Sans"
          sx={{ margin: "5px 0", fontSize: "19px" }}
        >
          <strong>Payment: </strong>
        </Typography>
        <ul style={{ paddingLeft: "18px", margin: 0 }}>
          {listingPaymentMethods.map((method, index) => (
            <li key={index} style={{ fontSize: "18px" }}>
              {method}
            </li>
          ))}
        </ul>
      </Box>
      <Box sx={{ marginTop: "20px" }}>
        <Typography
          variant="body2"
          sx={{ fontSize: "16px", fontWeight: "bold" }}
        >
          Exchange:
        </Typography>
        <Typography variant="body2" sx={{ fontSize: "16px" }}>
          Location: {listingLocation}
        </Typography>
      </Box>
      <Box
        sx={{
          position: "relative",
          width: "300px",
          height: "200px",
          marginTop: "20px",
          border: "1px solid #ced4da",
          borderRadius: "8px",
          backgroundColor: "rgba(0, 0, 255, 0.2)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            backgroundColor: "#d0e8e0",
            padding: "5px 10px",
            borderRadius: "8px",
          }}
        >
          <Typography
            variant="body2"
            sx={{ fontSize: "16px", fontWeight: "bold" }}
          >
            ${listingPrice}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PreviewTab;
