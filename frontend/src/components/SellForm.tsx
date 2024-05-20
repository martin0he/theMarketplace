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
import supabase from "../auth/supabase";
import { useState } from "react";
import { AddressAutofill } from "@mapbox/search-js-react";
import { CustomUser, Listing, PaymentMethod } from "../types";
import { useAuth } from "../auth/AuthProvider";
import { useListing } from "./ListingContext";

const SellForm = () => {
  const [isCustom, setIsCustom] = useState<boolean>(true);
  const { width } = useWindowDimensions();
  const inputStyle = {
    borderRadius: "12px",
    fontFamily: "Josefin Sans",
    backgroundColor: Colors.tan,
  };

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);

    try {
      const { data, error } = await supabase.storage
        .from("pictures")
        .upload("public/avatar1.png", file, {
          cacheControl: "3600",
          upsert: false,
        });
      if (error) {
        throw error;
      }

      console.log("Image uploaded successfully:", data);
      setFile(null);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const [listingName, setListingName] = useState<string>("");
  const [listingCondition, setListingCondition] = useState<string>("");
  const [listingDescription, setListingDescription] = useState<string>("");
  const [listingPrice, setListingPrice] = useState<string>("");
  const [listingPaymentMethods, setListingPaymentMethods] = useState<
    PaymentMethod[]
  >([]);
  const [listingLocation, setListingLocation] = useState<string>("");

  const handlePaymentChange = (event: SelectChangeEvent<PaymentMethod[]>) => {
    const { value } = event.target;
    setListingPaymentMethods(
      typeof value === "string" ? (value.split(",") as PaymentMethod[]) : value
    );
  };

  const handleConditionChange = (event: SelectChangeEvent<string>) => {
    setListingCondition(event.target.value);
  };

  const { customUser } = useAuth();
  const { setListing } = useListing();

  const exampleUser: CustomUser = {
    username: "glazedGuat",
    email: "martin@email.com",
    password: "passywo",
    school: "Northeastern Uni",
  };

  const createListing = (): Listing => {
    return {
      name: listingName,
      description: listingDescription,
      school: customUser?.school || "NA",
      dateAdded: new Date(),
      price: parseFloat(listingPrice),
      seller: customUser || exampleUser,
      paymentMethod: listingPaymentMethods,
      exchangeLocation: listingLocation,
      imageUrls: [], // Add logic to handle image URLs if necessary
      condition: listingCondition,
    };
  };

  const handleSubmit = () => {
    const newListing = createListing();
    setListing(newListing);
    console.log("New Listing Created:", newListing);
    // Add logic to save the listing to your database
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
                sx={{ mt: "15px" }}
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
              <FormControl fullWidth>
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
                InputProps={{ style: inputStyle }}
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
            paddingBottom="137px"
            marginTop="45px"
          >
            <Grid item xs={12}>
              <TextField
                color="secondary"
                fullWidth
                type="text"
                sx={{ mt: "15px" }}
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
              <FormControl fullWidth>
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
              <Box display="flex" justifyContent="flex-end" mb={1}>
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
              </Box>
              {isCustom ? (
                <TextField
                  sx={{ mt: "28px" }}
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
                <Box marginTop="28px">
                  <form>
                    <AddressAutofill accessToken="your-mapbox-access-token">
                      <TextField
                        sx={{ height: "200px" }}
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
                        autoComplete="address-line1"
                        value={listingLocation}
                        onChange={(e) => setListingLocation(e.target.value)}
                      />
                    </AddressAutofill>
                  </form>
                </Box>
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
            <div>
              <input type="file" onChange={handleFileChange} />
              <button onClick={handleUpload} disabled={!file || uploading}>
                {uploading ? "Uploading..." : "Upload Image"}
              </button>
            </div>
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
