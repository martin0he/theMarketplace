import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import Carousel from "react-bootstrap/Carousel";
import Colors from "../assets/Colors";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { AddressAutofill } from "@mapbox/search-js-react";
import { PaymentMethod } from "../types";

interface SellFormProps {
  listingName: string;
  setListingName: (value: string) => void;
  listingCondition: string;
  setListingCondition: (value: string) => void;
  listingDescription: string;
  setListingDescription: (value: string) => void;
  listingPrice: string;
  setListingPrice: (value: string) => void;
  listingPaymentMethods: PaymentMethod[];
  setListingPaymentMethods: (value: PaymentMethod[]) => void;
  listingLocation: string;
  setListingLocation: (value: string) => void;
  handleSubmit: () => void;
}

const SellForm = ({
  listingName,
  setListingName,
  listingCondition,
  setListingCondition,
  listingDescription,
  setListingDescription,
  listingPrice,
  setListingPrice,
  listingPaymentMethods,
  setListingPaymentMethods,
  listingLocation,
  setListingLocation,
  handleSubmit,
}: SellFormProps) => {
  const [isCustom, setIsCustom] = useState<boolean>(true);
  const { width } = useWindowDimensions();
  const inputStyle = {
    height: "56px",
    borderRadius: "12px",
    fontFamily: "Josefin Sans",
    backgroundColor: Colors.tan,
  };

  const handlePaymentChange = (event: SelectChangeEvent<PaymentMethod[]>) => {
    const { value } = event.target;
    setListingPaymentMethods(
      typeof value === "string" ? (value.split(",") as PaymentMethod[]) : value
    );
  };

  const handleConditionChange = (event: SelectChangeEvent<string>) => {
    setListingCondition(event.target.value);
  };

  return (
    <>
      <Carousel
        variant="dark"
        style={{
          width: 0.8 * width,
          marginTop: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        <Carousel.Item>
          <Grid container spacing={2} paddingX="170px" paddingBottom="64px">
            <Grid item xs={12}>
              <TextField
                color="secondary"
                fullWidth
                sx={{ mt: "15px", height: "56px" }}
                label="Listing Name"
                variant="outlined"
                InputProps={{ style: inputStyle }}
                InputLabelProps={{
                  style: {
                    fontFamily: "Josefin Sans",
                    backgroundColor: Colors.tan,
                    borderRadius: "9px",
                    paddingLeft: "5px",
                    paddingRight: "5px",
                  },
                }}
                value={listingName}
                onChange={(event) => setListingName(event.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth sx={{ height: "56px" }}>
                <InputLabel
                  color="secondary"
                  sx={{
                    fontFamily: "Josefin Sans",
                    backgroundColor: Colors.tan,
                    borderRadius: "9px",
                    paddingLeft: "5px",
                    paddingRight: "5px",
                  }}
                >
                  Listing Condition
                </InputLabel>
                <Select
                  color="secondary"
                  fullWidth
                  defaultValue=""
                  inputProps={{ style: { fontFamily: "Josefin Sans" } }}
                  style={inputStyle}
                  value={listingCondition}
                  onChange={handleConditionChange}
                >
                  <MenuItem value="new">
                    <Typography fontFamily="Josefin Sans">New</Typography>
                  </MenuItem>
                  <MenuItem value="like_new">
                    <Typography fontFamily="Josefin Sans">Like New</Typography>
                  </MenuItem>
                  <MenuItem value="good_condition">
                    <Typography fontFamily="Josefin Sans">
                      Good Condition
                    </Typography>
                  </MenuItem>
                  <MenuItem value="heavily_used">
                    <Typography fontFamily="Josefin Sans">
                      Heavily Used
                    </Typography>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                color="secondary"
                fullWidth
                multiline
                rows={8}
                label="Description"
                variant="outlined"
                InputLabelProps={{
                  style: {
                    fontFamily: "Josefin Sans",
                    backgroundColor: Colors.tan,
                    borderRadius: "9px",
                    paddingLeft: "5px",
                    paddingRight: "5px",
                  },
                }}
                InputProps={{
                  style: {
                    borderRadius: "12px",
                    fontFamily: "Josefin Sans",
                    backgroundColor: Colors.tan,
                  },
                }}
                value={listingDescription}
                onChange={(event) => setListingDescription(event.target.value)}
              />
            </Grid>
          </Grid>
        </Carousel.Item>
        <Carousel.Item>
          <Grid
            container
            spacing={2}
            paddingX="170px"
            paddingBottom="147px"
            marginTop="25px"
          >
            <Grid item xs={12}>
              <TextField
                color="secondary"
                fullWidth
                type="text"
                sx={{ mt: "15px", height: "56px" }}
                label="Listing Price"
                variant="outlined"
                InputProps={{ style: inputStyle }}
                InputLabelProps={{
                  style: {
                    fontFamily: "Josefin Sans",
                    backgroundColor: Colors.tan,
                    borderRadius: "9px",
                    paddingLeft: "5px",
                    paddingRight: "5px",
                  },
                }}
                value={listingPrice}
                onChange={(event) => setListingPrice(event.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth sx={{ height: "56px" }}>
                <InputLabel
                  color="secondary"
                  sx={{
                    fontFamily: "Josefin Sans",
                    backgroundColor: Colors.tan,
                    borderRadius: "9px",
                    paddingLeft: "5px",
                    paddingRight: "5px",
                  }}
                >
                  Preferred Payment Methods
                </InputLabel>
                <Select
                  color="secondary"
                  fullWidth
                  multiple
                  value={listingPaymentMethods}
                  onChange={handlePaymentChange}
                  renderValue={(selected) => selected.join(", ")}
                  inputProps={{ style: { fontFamily: "Josefin Sans" } }}
                  style={inputStyle}
                >
                  {Object.values(PaymentMethod).map((method) => (
                    <MenuItem key={method} value={method}>
                      <Typography fontFamily="Josefin Sans">
                        {method}
                      </Typography>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" justifyContent="flex-end">
                <Typography>
                  <Button onClick={() => setIsCustom(true)}>
                    <Typography
                      sx={{ textDecoration: isCustom ? "underline" : "none" }}
                      fontFamily="Josefin Sans"
                      textTransform="lowercase"
                      color="black"
                    >
                      custom
                    </Typography>
                  </Button>
                  |
                  <Button onClick={() => setIsCustom(false)}>
                    <Typography
                      sx={{ textDecoration: isCustom ? "none" : "underline" }}
                      fontFamily="Josefin Sans"
                      textTransform="lowercase"
                      color="black"
                    >
                      address
                    </Typography>
                  </Button>
                </Typography>
              </Box>
              {isCustom ? (
                <TextField
                  color="secondary"
                  fullWidth
                  label="Exchange Location"
                  variant="outlined"
                  InputLabelProps={{
                    style: {
                      fontFamily: "Josefin Sans",
                      backgroundColor: Colors.tan,
                      borderRadius: "9px",
                      paddingLeft: "5px",
                      paddingRight: "5px",
                    },
                  }}
                  InputProps={{ style: inputStyle }}
                  value={listingLocation}
                  onChange={(e) => setListingLocation(e.target.value)}
                />
              ) : (
                <form>
                  <AddressAutofill accessToken="pk.eyJ1IjoibWFydGluaGVtYSIsImEiOiJjbHdhZnM0M2IwOTY2MnFsZGd1eDNnZndnIn0._wuaWK6OY8ve2xMXx_4WhQ">
                    <TextField
                      color="secondary"
                      fullWidth
                      label="Exchange Address"
                      variant="outlined"
                      InputLabelProps={{
                        style: {
                          fontFamily: "Josefin Sans",
                          backgroundColor: Colors.tan,
                          borderRadius: "9px",
                          paddingLeft: "5px",
                          paddingRight: "5px",
                        },
                      }}
                      InputProps={{ style: inputStyle }}
                      autoComplete="address-line1"
                      value={listingLocation}
                      onChange={(e) => setListingLocation(e.target.value)}
                    />
                  </AddressAutofill>
                </form>
              )}
            </Grid>
          </Grid>
        </Carousel.Item>
        <Carousel.Item>
          <Grid
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            paddingX="170px"
            paddingBottom="150px"
            height="100%"
            width="100%"
          >
            <div></div>
          </Grid>
        </Carousel.Item>
      </Carousel>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#52c777",
          "&:hover": {
            backgroundColor: Colors.celestialBlue,
          },
          borderRadius: "10px",
          position: "fixed",
          bottom: "45px",
          right: "35px",
          zIndex: "2",
        }}
        onClick={handleSubmit}
      >
        <Typography textTransform="lowercase" fontFamily="Josefin Sans">
          Submit Listing
        </Typography>
      </Button>
    </>
  );
};

export default SellForm;
