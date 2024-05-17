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

const SellForm = () => {
  const [isCustom, setIsCustom] = useState<boolean>(true);
  const { width } = useWindowDimensions();
  const inputStyle = {
    borderRadius: "12px",
    fontFamily: "Josefin Sans",
    backgroundColor: Colors.tan,
  };

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
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

      // Once uploaded, you can store the image URL or metadata in your database
      console.log("Image uploaded successfully:", data);

      // Reset file state after successful upload
      setFile(null);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const [listingName, setListingName] = useState<string>();
  const [listingCondition, setListingCondition] = useState<string>();
  const [listingDescription, setListingDescription] = useState<string>();
  const [listingPrice, setListingPrice] = useState<string>();
  const [listingPaymentMethods, setListingPaymentMethods] = useState([]);
  const [listingLocation, setListingLocation] = useState<string>("");

  const handlePaymentChange = (
    event: SelectChangeEvent<typeof listingPaymentMethods>
  ) => {
    const { value } = event.target;
    setListingPaymentMethods(value);
  };

  const handleConditionChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    setListingCondition(value);
  };

  return (
    <Carousel
      variant="dark"
      style={{
        width: 0.8 * width,
        marginTop: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Carousel.Item>
        <Grid container spacing={2} paddingX="170px" paddingBottom="64px">
          {/* First Grid Item */}
          <Grid item xs={12}>
            <TextField
              color="secondary"
              fullWidth
              sx={{ mt: "15px" }}
              label="Listing Name"
              variant="outlined"
              InputProps={{
                style: inputStyle,
              }}
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
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setListingName(event.target.value);
              }}
              defaultValue={listingName}
            />
          </Grid>

          {/* Second Grid Item */}
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
                inputProps={{
                  style: {
                    fontFamily: "Josefin Sans",
                  },
                }}
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

          {/* Third Grid Item */}
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
                style: inputStyle,
              }}
              value={listingDescription}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setListingDescription(event.target.value);
              }}
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
          {/* First Grid Item */}
          <Grid item xs={12}>
            <TextField
              color="secondary"
              fullWidth
              type="text"
              sx={{ mt: "15px" }}
              label="Listing Price"
              variant="outlined"
              InputProps={{
                style: inputStyle,
              }}
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
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setListingPrice(event.target.value);
              }}
            />
          </Grid>

          {/* Second Grid Item */}
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
                multiple // Allow multiple selections
                value={listingPaymentMethods} // Set the selected values
                onChange={handlePaymentChange}
                renderValue={() => listingPaymentMethods.join(", ")}
                inputProps={{
                  style: {
                    fontFamily: "Josefin Sans",
                  },
                }}
                style={inputStyle}
              >
                <MenuItem value="cash">
                  <Typography fontFamily="Josefin Sans">cash</Typography>
                </MenuItem>
                <MenuItem value="venmo">
                  <Typography fontFamily="Josefin Sans">venmo</Typography>
                </MenuItem>
                <MenuItem value="zelle">
                  <Typography fontFamily="Josefin Sans">zelle</Typography>
                </MenuItem>
                <MenuItem value="bank_transfer">
                  <Typography fontFamily="Josefin Sans">
                    bank transfer
                  </Typography>
                </MenuItem>
                <MenuItem value="other">
                  <Typography fontFamily="Josefin Sans">other</Typography>
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Third Grid Item */}

          <Grid item xs={12} position="relative">
            {/* Clickable Text */}
            <Box position="absolute" right="0">
              <Button onClick={() => setIsCustom(true)}>
                <Typography
                  sx={{
                    textDecoration: isCustom ? "underline" : "none",
                  }}
                  fontFamily="Josefin Sans"
                  textTransform="lowercase"
                  color="black"
                >
                  custom{" "}
                </Typography>
              </Button>
              |
              <Button onClick={() => setIsCustom(false)}>
                <Typography
                  sx={{
                    textDecoration: isCustom ? "none" : "underline",
                  }}
                  fontFamily="Josefin Sans"
                  textTransform="lowercase"
                  color="black"
                >
                  {" "}
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
                InputProps={{
                  style: inputStyle,
                }}
                value={listingLocation}
                onChange={(e) => setListingLocation(e.target.value)}
              />
            ) : (
              <Box marginTop="28px">
                <form>
                  <AddressAutofill accessToken="pk.eyJ1IjoibWFydGluaGVtYSIsImEiOiJjbHdhZnM0M2IwOTY2MnFsZGd1eDNnZndnIn0._wuaWK6OY8ve2xMXx_4WhQ">
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
                      InputProps={{
                        style: inputStyle,
                      }}
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
  );
};

export default SellForm;
