import { Box, Tab, Tabs, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import ProfileSection from "../components/AccountPageComponents/ProfileSection";
import ListingsSection from "../components/AccountPageComponents/ListingsSection";

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
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const AccountPage = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log(event);
  };
  const theme = useTheme();
  return (
    <Box paddingTop={12} paddingBottom={7} paddingX={5}>
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
                profile
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
                listings
              </Typography>
            }
            {...a11yProps(1)}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ProfileSection />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ListingsSection />
      </CustomTabPanel>
    </Box>
  );
};

export default AccountPage;
