import React, { ReactElement, useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import SellForm from "../components/SellPageComponents/SellForm";
import PreviewTab from "../components/SellPageComponents/PreviewTab";
import { Condition, PaymentMethod } from "../types";
import { styled, useTheme } from "@mui/material/styles";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const AlertBox = styled(Box)(() => ({
  position: "fixed",
  top: "20px",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 10,
  width: "80%",
  transition: "opacity 0.5s ease-in-out",
  backgroundColor: "beige",
}));

const SellPage = () => {
  const [value, setValue] = useState(0);
  const [alert, setAlert] = useState<ReactElement | null>(null); // Add alert state
  const [alertVisible, setAlertVisible] = useState<boolean>(false); // Visibility state

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log(event);
  };

  const [listingName, setListingName] = useState<string>("");
  const [listingCondition, setListingCondition] = useState<Condition>(
    Condition.EMPTY
  );
  const [listingDescription, setListingDescription] = useState<string>("");
  const [listingPrice, setListingPrice] = useState<number | string>(""); // Initialize as empty string
  const [listingPaymentMethods, setListingPaymentMethods] = useState<
    PaymentMethod[]
  >([]);
  const [listingLocation, setListingLocation] = useState<string>("");
  const [previewImageUrls, setPreviewImageUrls] = useState<string[]>([]);

  useEffect(() => {
    if (alert) {
      setAlertVisible(true);
      const timer = setTimeout(() => {
        setAlertVisible(false);
        setTimeout(() => {
          setAlert(null);
        }, 500); // Match this duration with the CSS transition duration
      }, 3000); // Alert display duration in milliseconds

      return () => clearTimeout(timer);
    }
  }, [alert]);

  const theme = useTheme();

  return (
    <Box paddingTop={12} paddingBottom={10} paddingX={5}>
      {alert && (
        <AlertBox style={{ opacity: alertVisible ? 1 : 0 }}>{alert}</AlertBox>
      )}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          indicatorColor="secondary"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            "& .MuiTabs-indicator": {
              backgroundColor: theme.palette.customColors.royalBlue,
            },
          }}
        >
          <Tab
            label={
              <Typography
                style={{
                  color: theme.palette.customColors.royalBlue,
                  fontSize: 18,
                  textTransform: "lowercase",
                  fontWeight: value === 0 ? "bold" : "normal",
                }}
              >
                sell
              </Typography>
            }
            {...a11yProps(0)}
          />
          <Tab
            label={
              <Typography
                style={{
                  color: theme.palette.customColors.royalBlue,
                  fontSize: 18,
                  textTransform: "lowercase",
                  fontWeight: value === 1 ? "bold" : "normal",
                }}
              >
                preview
              </Typography>
            }
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Box justifyContent="center" alignItems="center" display="flex">
          <SellForm
            listingName={listingName}
            setListingName={setListingName}
            listingCondition={listingCondition}
            setListingCondition={setListingCondition}
            listingDescription={listingDescription}
            setListingDescription={setListingDescription}
            listingPrice={listingPrice}
            setListingPrice={setListingPrice}
            listingPaymentMethods={listingPaymentMethods}
            setListingPaymentMethods={setListingPaymentMethods}
            listingLocation={listingLocation}
            setListingLocation={setListingLocation}
            previewImageUrls={previewImageUrls}
            setPreviewImageUrls={setPreviewImageUrls}
            setAlert={setAlert}
          />
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <PreviewTab
          listingName={listingName}
          listingCondition={listingCondition}
          listingDescription={listingDescription}
          listingPrice={listingPrice}
          listingPaymentMethods={listingPaymentMethods}
          listingLocation={listingLocation}
          listingPreviewImages={previewImageUrls}
        />
      </CustomTabPanel>
    </Box>
  );
};

export default SellPage;
