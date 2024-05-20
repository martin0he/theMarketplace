import { Box, Typography } from "@mui/material";
import { PaymentMethod } from "../types";

interface PreviewProps {
  listingName: string;
  listingCondition: string;
  listingDescription: string;
  listingPrice: string;
  listingPaymentMethods: PaymentMethod[];
  listingLocation: string;
}

const PreviewTab = ({
  listingName,
  listingCondition,
  listingDescription,
  listingPrice,
  listingPaymentMethods,
  listingLocation,
}: PreviewProps) => {
  return (
    <Box padding="20px" border="1px solid gray" borderRadius="12px" mt="20px">
      <Typography variant="h5">Preview</Typography>
      <Typography variant="body1">
        <strong>Name:</strong> {listingName}
      </Typography>
      <Typography variant="body1">
        <strong>Condition:</strong> {listingCondition}
      </Typography>
      <Typography variant="body1">
        <strong>Description:</strong> {listingDescription}
      </Typography>
      <Typography variant="body1">
        <strong>Price:</strong> {listingPrice}
      </Typography>
      <Typography variant="body1">
        <strong>Payment Methods:</strong> {listingPaymentMethods.join(", ")}
      </Typography>
      <Typography variant="body1">
        <strong>Location:</strong> {listingLocation}
      </Typography>
    </Box>
  );
};

export default PreviewTab;
