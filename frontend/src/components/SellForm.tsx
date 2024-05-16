import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Carousel from "react-bootstrap/Carousel";
import Colors from "../assets/Colors";
import useWindowDimensions from "../hooks/useWindowDimensions";

const SellForm = () => {
  const { width } = useWindowDimensions();
  const inputStyle = {
    borderRadius: "12px",
    fontFamily: "Josefin Sans",
    backgroundColor: Colors.tan,
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
                //variant="outlined"
                defaultValue=""
                inputProps={{
                  style: {
                    fontFamily: "Josefin Sans",
                  },
                }}
                style={inputStyle}
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
            />
          </Grid>
        </Grid>
      </Carousel.Item>
      <Carousel.Item>
        <Grid
          minWidth="500px"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          paddingX="170px"
          paddingBottom="150px"
          height="100%"
          width="100%"
        >
          <Grid width="100%" item sx={{ marginBottom: "35px" }}>
            <TextField
              color="secondary"
              variant="standard"
              fullWidth
              label="Listing Name"
              InputProps={{
                style: {
                  fontFamily: "inherit",
                  fontSize: "24px",
                  paddingLeft: "8px",
                  paddingBottom: "14px",
                },
              }}
              InputLabelProps={{
                style: {
                  fontFamily: "inherit",
                  fontSize: "19px",
                  padding: "8px",
                  color: "#7a7a78",
                },
              }}
              required
              sx={{
                borderRadius: "10px",
                backgroundColor: Colors.tan,
              }}
            />
          </Grid>

          <Grid width="100%" item sx={{ marginBottom: "35px" }}>
            <TextField
              color="secondary"
              variant="standard"
              fullWidth
              label="Listing Name"
              InputProps={{
                style: {
                  fontFamily: "inherit",
                  fontSize: "24px",
                  paddingLeft: "8px",
                  paddingBottom: "14px",
                },
              }}
              InputLabelProps={{
                style: {
                  fontFamily: "inherit",
                  fontSize: "19px",
                  padding: "8px",
                  color: "#7a7a78",
                },
              }}
              required
              sx={{
                borderRadius: "10px",
                backgroundColor: Colors.tan,
              }}
            />
          </Grid>

          <Grid item width="100%">
            <TextField
              color="secondary"
              variant="standard"
              fullWidth
              label="Listing Name"
              InputProps={{
                style: {
                  fontFamily: "inherit",
                  fontSize: "24px",
                  paddingLeft: "8px",
                  paddingBottom: "14px",
                },
              }}
              InputLabelProps={{
                style: {
                  fontFamily: "inherit",
                  fontSize: "19px",
                  padding: "8px",
                  color: "#7a7a78",
                },
              }}
              required
              sx={{
                borderRadius: "10px",
                backgroundColor: Colors.tan,
              }}
            />
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
          <Grid width="100%" item sx={{ marginBottom: "35px" }}>
            <TextField
              color="secondary"
              variant="standard"
              fullWidth
              label="Listing Name"
              InputProps={{
                style: {
                  fontFamily: "inherit",
                  fontSize: "24px",
                  paddingLeft: "8px",
                  paddingBottom: "14px",
                },
              }}
              InputLabelProps={{
                style: {
                  fontFamily: "inherit",
                  fontSize: "19px",
                  padding: "8px",
                  color: "#7a7a78",
                },
              }}
              required
              sx={{
                borderRadius: "10px",
                backgroundColor: Colors.tan,
              }}
            />
          </Grid>

          <Grid width="100%" item sx={{ marginBottom: "35px" }}>
            <TextField
              color="secondary"
              variant="standard"
              fullWidth
              label="Listing Name"
              InputProps={{
                style: {
                  fontFamily: "inherit",
                  fontSize: "24px",
                  paddingLeft: "8px",
                  paddingBottom: "14px",
                },
              }}
              InputLabelProps={{
                style: {
                  fontFamily: "inherit",
                  fontSize: "19px",
                  padding: "8px",
                  color: "#7a7a78",
                },
              }}
              required
              sx={{
                borderRadius: "10px",
                backgroundColor: Colors.tan,
              }}
            />
          </Grid>

          <Grid item width="100%">
            <TextField
              color="secondary"
              variant="standard"
              fullWidth
              label="Listing Name"
              InputProps={{
                style: {
                  fontFamily: "inherit",
                  fontSize: "24px",
                  paddingLeft: "8px",
                  paddingBottom: "14px",
                },
              }}
              InputLabelProps={{
                style: {
                  fontFamily: "inherit",
                  fontSize: "19px",
                  padding: "8px",
                  color: "#7a7a78",
                },
              }}
              required
              sx={{
                borderRadius: "10px",
                backgroundColor: Colors.tan,
              }}
            />
          </Grid>
        </Grid>
      </Carousel.Item>
    </Carousel>
  );
};

export default SellForm;
