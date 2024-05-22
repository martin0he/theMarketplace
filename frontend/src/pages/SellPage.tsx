import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Colors from "../assets/Colors";
import SellForm from "../components/SellForm";
import PreviewTab from "../components/PreviewTab";
import { PaymentMethod } from "../types";

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

const SellPage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [listingName, setListingName] = useState<string>("");
  const [listingCondition, setListingCondition] = useState<string>("");
  const [listingDescription, setListingDescription] = useState<string>("");
  const [listingPrice, setListingPrice] = useState<string>("");
  const [listingPaymentMethods, setListingPaymentMethods] = useState<
    PaymentMethod[]
  >([]);
  const [listingLocation, setListingLocation] = useState<string>("");
  const [previewImageUrls, setPreviewImageUrls] = useState<string[]>([]);

  return (
    <Box paddingTop={12} paddingBottom={10} paddingX={5} zIndex={0}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          indicatorColor="secondary"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label={
              <Typography
                style={{
                  color: Colors.royalBlue,
                  fontSize: 18,
                  fontFamily: "Josefin Sans",
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
                  color: Colors.royalBlue,
                  fontSize: 18,
                  fontFamily: "Josefin Sans",
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
