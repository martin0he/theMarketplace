import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import Colors from "../assets/Colors";
import SupportSection from "../components/SettingsPageComponents/SupportSection";

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

const SettingsPage = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log(event);
  };
  return (
    <Box paddingTop={12} paddingX={5}>
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
                appearance
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
                support
              </Typography>
            }
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}></CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <SupportSection />
      </CustomTabPanel>
    </Box>
  );
};

export default SettingsPage;
