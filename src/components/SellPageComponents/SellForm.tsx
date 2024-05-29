import { ReactElement, useState } from "react";
import {
  Alert,
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
  InputAdornment,
  useTheme,
} from "@mui/material";
import Carousel from "react-bootstrap/Carousel";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { AddressAutofill } from "@mapbox/search-js-react";
import { Condition, Listing, PaymentMethod } from "../../types";
import supabase from "../../auth/supabase";
import { useAuth } from "../../auth/AuthProvider";
import { v4 as uuidv4 } from "uuid";
import CustomCarousel from "../general/CustomCarousel";
import getLocalCurrency from "../general/LocalCurrency";

interface SellFormProps {
  listingName: string;
  setListingName: (value: string) => void;
  listingCondition: Condition;
  setListingCondition: (value: Condition) => void;
  listingDescription: string;
  setListingDescription: (value: string) => void;
  listingPrice: number | string;
  setListingPrice: (value: number | string) => void;
  listingPaymentMethods: PaymentMethod[];
  setListingPaymentMethods: (value: PaymentMethod[]) => void;
  listingLocation: string;
  setListingLocation: (value: string) => void;
  previewImageUrls: string[];
  setPreviewImageUrls: (value: string[]) => void;
  setAlert: (value: ReactElement | null) => void;
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
  setAlert,
}: SellFormProps) => {
  const [isCustom, setIsCustom] = useState<boolean>(true);
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const inputStyle = {
    height: "56px",
    borderRadius: "12px",
    backgroundColor: theme.palette.customColors.tan,
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
  const [media, setMedia] = useState<File[]>([]);

  const uploadListing = async () => {
    // Check if all fields are filled in
    if (
      !listingName ||
      listingCondition === Condition.EMPTY ||
      !listingCondition ||
      !listingDescription ||
      !listingPrice ||
      listingPaymentMethods.length === 0 ||
      !listingLocation ||
      media.length === 0
    ) {
      setAlert(
        <Alert variant="outlined" severity="warning">
          Please fill in all fields and upload at least one image.
        </Alert>
      );
      return;
    }

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
      created_at: new Date(),
      price:
        typeof listingPrice === "string"
          ? parseFloat(listingPrice)
          : listingPrice,
      seller: customUser,
      payment_methods: listingPaymentMethods,
      exchange_location: listingLocation,
      imageUrls: newUrls,
      condition: listingCondition,
      liked_by: [],
    };

    const { data: listingData, error: uploadError } = await supabase
      .from("Listings")
      .insert([
        {
          name: listing.name,
          created_at: new Date(),
          price: listing.price,
          payment_methods: listing.payment_methods,
          exchange_location: listing.exchange_location,
          school: listing.school,
          description: listing.description,
          imageUrls: listing.imageUrls,
          condition: listing.condition,
        },
      ])
      .select();

    if (uploadError) {
      console.error("Error inserting new listing:", uploadError);
      setAlert(
        <Alert variant="outlined" severity="error">
          Couldn't post listing!
        </Alert>
      );
      return;
    }

    console.log("Uploaded new listing:", listingData);

    const listingId = listingData[0].id;

    const updatedListings = customUser.listings
      ? [...customUser.listings, listingId]
      : [listingId];

    const { data: userData, error: userError } = await supabase
      .from("Users")
      .update({
        listings: updatedListings,
      })
      .eq("id", customUser.id);

    if (userError) {
      console.error("Error updating user listings:", userError);
      setAlert(
        <Alert variant="outlined" severity="error">
          Couldn't update user listings!
        </Alert>
      );
    } else {
      console.log("User listings updated:", userData);
      setAlert(
        <Alert variant="outlined" severity="success">
          New listing posted!
        </Alert>
      );
    }
  };

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

  const handleRemoveImage = (index: number) => {
    const updatedImageUrls = previewImageUrls.filter((_, i) => i !== index);
    const updatedMedia = media.filter((_, i) => i !== index);
    setPreviewImageUrls(updatedImageUrls);
    setMedia(updatedMedia);
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
          <Box paddingX={width * 0.018} paddingBottom="50px">
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
                      backgroundColor: theme.palette.customColors.tan,
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
                      backgroundColor: theme.palette.customColors.tan,
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
                    inputProps={{ style: {} }}
                    style={inputStyle}
                    value={listingCondition}
                    onChange={handleConditionChange}
                  >
                    {Object.values(Condition).map((condition) => (
                      <MenuItem key={condition} value={condition}>
                        <Typography>{condition}</Typography>
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
                      backgroundColor: theme.palette.customColors.tan,
                      borderRadius: "9px",
                      paddingLeft: "5px",
                      paddingRight: "5px",
                    },
                  }}
                  InputProps={{
                    style: {
                      borderRadius: "12px",

                      backgroundColor: theme.palette.customColors.tan,
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
          <Box paddingX={width * 0.018} paddingBottom="130px" marginTop="45px">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  color="secondary"
                  fullWidth
                  type="number"
                  sx={{ mt: "15px", height: "56px" }}
                  label="Listing Price"
                  variant="outlined"
                  InputProps={{
                    style: inputStyle,
                    startAdornment: (
                      <InputAdornment position="start">
                        {customUser ? getLocalCurrency(customUser) : ""}
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    style: {
                      backgroundColor: theme.palette.customColors.tan,
                      borderRadius: "9px",
                      paddingLeft: "5px",
                      paddingRight: "5px",
                    },
                  }}
                  value={listingPrice}
                  onChange={(event) => {
                    const value = event.target.value;
                    if (
                      value === "" ||
                      (Number(value) >= 0 && !value.startsWith("-"))
                    ) {
                      setListingPrice(value);
                    }
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth sx={{ height: "56px" }}>
                  <InputLabel
                    color="secondary"
                    sx={{
                      backgroundColor: theme.palette.customColors.tan,
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
                    inputProps={{ style: {} }}
                    style={inputStyle}
                  >
                    {Object.values(PaymentMethod).map((method) => (
                      <MenuItem key={method} value={method}>
                        <Typography>{method}</Typography>
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
                        backgroundColor: theme.palette.customColors.tan,
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
                            backgroundColor: theme.palette.customColors.tan,
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
            paddingX={width * 0.018}
            paddingBottom="55px"
          >
            <CustomCarousel
              hasDelete
              imageUrls={previewImageUrls}
              width={`${width * 0.41}px`}
              height={"300px"}
              onDeleteImage={handleRemoveImage}
            />

            <Button
              variant="contained"
              component="label"
              sx={{
                backgroundColor: theme.palette.customColors.cerise,
                "&:hover": {
                  backgroundColor: theme.palette.customColors.celestialBlue,
                },
                borderRadius: "10px",
                marginTop: "20px",
              }}
            >
              <Typography textTransform="lowercase">upload image</Typography>
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
            backgroundColor: theme.palette.customColors.celestialBlue,
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
        <Typography textTransform="lowercase">Submit Listing</Typography>
      </Button>
    </>
  );
};

export default SellForm;
