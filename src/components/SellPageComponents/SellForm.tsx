/* eslint-disable @typescript-eslint/no-explicit-any */
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
import Colors from "../../assets/Colors";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { AddressAutofill } from "@mapbox/search-js-react";
import { Condition, Listing, PaymentMethod } from "../../types";
import supabase from "../../auth/supabase";
import { useAuth } from "../../auth/AuthProvider";
import { v4 as uuidv4 } from "uuid";
import CustomCarousel from "../general/CustomCarousel";

interface SellFormProps {
  listingName: string;
  setListingName: (value: string) => void;
  listingCondition: Condition;
  setListingCondition: (value: Condition) => void;
  listingDescription: string;
  setListingDescription: (value: string) => void;
  listingPrice: string;
  setListingPrice: (value: string) => void;
  listingPaymentMethods: PaymentMethod[];
  setListingPaymentMethods: (value: PaymentMethod[]) => void;
  listingLocation: string;
  setListingLocation: (value: string) => void;
  previewImageUrls: string[];
  setPreviewImageUrls: (value: string[]) => void;
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
  previewImageUrls,
  setPreviewImageUrls,
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

  const handleConditionChange = (event: SelectChangeEvent<Condition>) => {
    const { value } = event.target;
    setListingCondition(value as Condition);
  };

  const { customUser } = useAuth();
  const [media, setMedia] = useState<any[]>([]);

  /*const urlsToUpload = media.map(
    (file) =>
      `https://egnuwqvtuxctatbhwrfq.supabase.co/storage/v1/object/public/pictures/${customUser?.school}/${customUser?.username}/${file.name}`
  );
  */

  const uploadListing = async () => {
    if (!customUser || !media || media.length === 0) return;

    const newUrls: string[] = [];

    // Upload files and collect URLs
    for (const file of media) {
      const filePath = `${customUser.school}/${
        customUser.username
      }/${uuidv4()}`;
      const tempUrl = `https://egnuwqvtuxctatbhwrfq.supabase.co/storage/v1/object/public/pictures/${filePath}`;

      const { data, error } = await supabase.storage
        .from("pictures")
        .upload(filePath, file);

      if (error) {
        console.error("Error uploading image:", error);
      } else {
        console.log("Image uploaded successfully:", data);
        newUrls.push(tempUrl);
      }
    }

    const listing: Listing = {
      name: listingName,
      description: listingDescription,
      school: customUser.school,
      dateAdded: new Date(),
      price: parseFloat(listingPrice),
      seller: customUser,
      paymentMethod: listingPaymentMethods,
      exchangeLocation: listingLocation,
      imageUrls: newUrls,
      condition: listingCondition,
    };

    const { data: listingData, error: uploadError } = await supabase
      .from("Listings")
      .insert([
        {
          name: listing.name,
          created_at: new Date(),
          price: listing.price,
          payment_method: listing.paymentMethod,
          exchange_location: listing.exchangeLocation,
          school: listing.school,
          description: listing.description,
          imageUrls: listing.imageUrls,
          condition: listing.condition,
        },
      ])
      .select();

    if (uploadError) {
      console.error("Error inserting new listing:", uploadError);
    } else {
      console.log("Uploaded new listing:", listingData);
    }
  };

  {
    /*this handles converting images from files to url strings so that they can be previewed, NO uploading here*/
  }

  const handleImageSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const files = Array.from(e.target.files);
    setMedia(files);
    const newImageUrls: string[] = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (result) {
          newImageUrls.push(result as string);
          if (newImageUrls.length === files.length) {
            setPreviewImageUrls([...previewImageUrls, ...newImageUrls]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <Carousel
        interval={null}
        touch
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
          <Box paddingX="200px" paddingBottom="65px">
            <Grid container spacing={2}>
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
                    inputProps={{ style: { fontFamily: "Josefin Sans" } }}
                    style={inputStyle}
                    value={listingCondition}
                    onChange={handleConditionChange}
                  >
                    {Object.values(Condition).map((condition) => (
                      <MenuItem key={condition} value={condition}>
                        <Typography fontFamily="Josefin Sans">
                          {condition}
                        </Typography>
                      </MenuItem>
                    ))}
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
                  onChange={(event) =>
                    setListingDescription(event.target.value)
                  }
                />
              </Grid>
            </Grid>
          </Box>
        </Carousel.Item>
        <Carousel.Item>
          <Box paddingX="200px" paddingBottom="145px" marginTop="45px">
            <Grid container spacing={2}>
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
          </Box>
        </Carousel.Item>
        <Carousel.Item>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            paddingX="200px"
            paddingBottom="55px"
          >
            <CustomCarousel
              imageUrls={previewImageUrls}
              width={"450px"}
              height={"330px"}
            />

            <Button
              variant="contained"
              component="label"
              sx={{
                backgroundColor: Colors.cerise,
                "&:hover": {
                  backgroundColor: Colors.celestialBlue,
                },
                borderRadius: "10px",
                marginTop: "20px",
              }}
            >
              <Typography textTransform="lowercase" fontFamily="Josefin Sans">
                upload image
              </Typography>
              <input
                type="file"
                hidden
                multiple
                accept="image/*"
                onChange={(e) => handleImageSelection(e)}
              />
            </Button>
          </Box>
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
        onClick={uploadListing}
        disabled={customUser === null}
      >
        <Typography textTransform="lowercase" fontFamily="Josefin Sans">
          Submit Listing
        </Typography>
      </Button>
    </>
  );
};

export default SellForm;
