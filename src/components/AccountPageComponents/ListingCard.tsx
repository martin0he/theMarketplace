import {
  Box,
  Button,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import DeleteIcon from "@mui/icons-material/Delete";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import Colors from "../../assets/Colors";
import { Condition, CustomUser, Listing, PaymentMethod } from "../../types";
import { useEffect, useState } from "react";
import supabase from "../../auth/supabase";
import getLocalCurrency from "../general/LocalCurrency";
import { useAuth } from "../../auth/AuthProvider";

interface ListingCardProps {
  listing: Listing;
  onUpdate: () => void;
}

const ListingCard = ({ listing, onUpdate }: ListingCardProps) => {
  useEffect(() => {
    const fetchLikes = async () => {
      const { data: Likers, error } = await supabase
        .from("Users")
        .select("*")
        .in("id", listing.liked_by);

      if (error) {
        console.error("Error fetching this listing's likes:", error);
      } else {
        setLikes(Likers as CustomUser[]);
      }
    };

    fetchLikes();
  }, [listing.liked_by]);

  const handleMarkAsSold = async () => {
    const { error: updateError } = await supabase
      .from("Listings")
      .update({ date_deleted: new Date() })
      .eq("id", listing.id);
    if (updateError) {
      console.log(updateError);
    } else {
      setDateDeleted(new Date());
      console.log("mark as sold successful");
      onUpdate();
    }
  };

  const handleDelete = async () => {
    const { error: deleteError } = await supabase
      .from("Listings")
      .delete()
      .eq("id", listing.id);
    if (deleteError) {
      console.log(deleteError);
    } else {
      console.log("delete successful");
      onUpdate();
    }
  };

  const handleSave = async () => {
    const { error: saveError } = await supabase
      .from("Listings")
      .update({
        name: name,
        price: price,
        description: description,
        condition: condition,
        payment_methods: paymentMethods,
        exchange_location: location,
      })
      .eq("id", listing.id);
    if (saveError) {
      console.log(saveError);
    } else {
      console.log("save successful");
      setIsEditing(false);
      onUpdate();
    }
  };

  const { width, height } = useWindowDimensions();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [price, setPrice] = useState<number | string>(listing.price);
  const [name, setName] = useState<string>(listing.name);
  const [description, setDescription] = useState<string>(listing.description);
  const [condition, setCondition] = useState<Condition>(
    listing.condition || Condition.EMPTY
  );
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(
    listing.payment_methods
  );
  const [location, setLocation] = useState<string>(listing.exchange_location);
  const [likes, setLikes] = useState<CustomUser[]>([]);
  const [dateDeleted, setDateDeleted] = useState<Date | null>(
    listing.date_deleted || null
  );
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSaveDialog, setOpenSaveDialog] = useState(false);

  const { customUser } = useAuth();

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmDelete = async () => {
    await handleDelete();
    setOpenDeleteDialog(false);
  };

  const handleOpenSaveDialog = () => {
    setOpenSaveDialog(true);
  };

  const handleCloseSaveDialog = () => {
    setOpenSaveDialog(false);
  };

  const handleConfirmSave = async () => {
    await handleSave();
    setOpenSaveDialog(false);
  };

  const inputStyle = {
    height: "56px",
    borderRadius: "12px",
    fontFamily: "Josefin Sans",
    backgroundColor: Colors.tan,
    width: width * 0.65 * 0.75,
  };

  const handleConditionChange = (event: SelectChangeEvent<Condition>) => {
    const { value } = event.target;
    setCondition(value as Condition);
  };

  const handlePaymentChange = (event: SelectChangeEvent<PaymentMethod[]>) => {
    const { value } = event.target;
    setPaymentMethods(
      typeof value === "string" ? (value.split(",") as PaymentMethod[]) : value
    );
  };

  return (
    <Box
      borderRadius="12px"
      width={width * 0.65}
      height={height * 0.58}
      sx={{ backgroundColor: Colors.tan, position: "relative" }}
      boxShadow="1px 1px 2px #7c6741"
    >
      {isEditing ? (
        <IconButton
          onClick={handleOpenSaveDialog}
          sx={{ position: "absolute", top: "5px", right: "50px", zIndex: 2 }}
        >
          <SaveIcon />
        </IconButton>
      ) : (
        <IconButton
          onClick={() => setIsEditing(true)}
          sx={{ position: "absolute", top: "5px", right: "50px", zIndex: 2 }}
        >
          <EditIcon />
        </IconButton>
      )}

      <Button
        sx={{
          position: "absolute",
          bottom: "5px",
          left: "50%",
          transform: "translateX(-50%)",
          textTransform: "lowercase",
          borderRadius: "8px",
          backgroundColor: "#f1f2f3",
          "&:hover": {
            backgroundColor: "#dbdee1",
          },
          zIndex: 2,
          boxShadow: "1px 1px 2px #838181",
        }}
        onClick={handleMarkAsSold}
      >
        <Typography
          fontFamily="Josefin Sans"
          color={Colors.turquoise}
          sx={{ zIndex: 1 }}
        >
          mark as sold
        </Typography>
      </Button>

      <IconButton
        sx={{
          position: "absolute",
          top: "5px",
          right: "5px",
          textTransform: "lowercase",
          zIndex: 2,
        }}
        onClick={handleOpenDeleteDialog}
      >
        <DeleteIcon />
      </IconButton>

      <Dialog
        sx={{}}
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          sx={{ fontFamily: "Josefin Sans" }}
          id="alert-dialog-title"
        >
          {"Confirm Deletion"}
        </DialogTitle>
        <DialogContent>
          <Typography id="alert-dialog-description" fontFamily={"Josefin Sans"}>
            Are you sure you want to delete this listing?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              fontFamily: "Josefin Sans",
              color: Colors.turquoise,
              textTransform: "lowercase",
            }}
            onClick={handleCloseDeleteDialog}
          >
            no
          </Button>
          <Button
            sx={{
              fontFamily: "Josefin Sans",
              color: Colors.cerise,
              textTransform: "lowercase",
            }}
            onClick={handleConfirmDelete}
            autoFocus
          >
            yes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openSaveDialog}
        onClose={handleCloseSaveDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          sx={{ fontFamily: "Josefin Sans" }}
          id="alert-dialog-title"
        >
          {"Confirm Changes"}
        </DialogTitle>
        <DialogContent>
          <Typography fontFamily="inherit" id="alert-dialog-description">
            Are you sure you want to save these changes?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              fontFamily: "Josefin Sans",
              color: Colors.royalBlue,
              textTransform: "lowercase",
            }}
            onClick={handleCloseSaveDialog}
          >
            no
          </Button>
          <Button
            sx={{
              fontFamily: "Josefin Sans",
              color: Colors.royalBlue,
              textTransform: "lowercase",
            }}
            onClick={handleConfirmSave}
            color="primary"
            autoFocus
          >
            yes
          </Button>
        </DialogActions>
      </Dialog>

      {isEditing ? (
        <Box
          padding="30px"
          paddingBottom="50px"
          sx={{
            maxHeight: "100%",
            overflow: "auto",
            borderRadius: "12px",
            "&::-webkit-scrollbar": {
              width: "8px",
              borderRadius: "12px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: Colors.celestialBlue,
              borderRadius: "12px",
              zIndex: 2,
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: Colors.royalBlue,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
              borderRadius: "12px",
            },
          }}
        >
          <Typography
            fontFamily={"inherit"}
            fontSize={21}
            sx={{ textDecoration: "underline" }}
          >
            update listing
          </Typography>
          <TextField
            color="secondary"
            sx={{ height: "56px", mt: "15px" }}
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
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
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
                fontFamily: "Josefin Sans",
                backgroundColor: Colors.tan,
                borderRadius: "9px",
                paddingLeft: "5px",
                paddingRight: "5px",
              },
            }}
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel
              color="secondary"
              sx={{
                fontFamily: "Josefin Sans",
                backgroundColor: Colors.tan,
                borderRadius: "9px",
                paddingLeft: "5px",
                paddingRight: "5px",
                mt: "15px",
              }}
            >
              Listing Condition
            </InputLabel>
            <Select
              sx={{ mt: "15px", height: "56px" }}
              color="secondary"
              fullWidth
              inputProps={{ style: { fontFamily: "Josefin Sans" } }}
              style={inputStyle}
              value={condition}
              onChange={handleConditionChange}
            >
              {Object.values(Condition).map((condition) => (
                <MenuItem key={condition} value={condition}>
                  <Typography fontFamily="Josefin Sans">{condition}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            color="secondary"
            fullWidth
            sx={{ mt: "15px", height: "56px" }}
            label="Listing Description"
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
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <FormControl fullWidth sx={{ height: "56px" }}>
            <InputLabel
              color="secondary"
              sx={{
                fontFamily: "Josefin Sans",
                backgroundColor: Colors.tan,
                borderRadius: "9px",
                paddingLeft: "5px",
                paddingRight: "5px",
                mt: "15px",
              }}
            >
              Preferred Payment Methods
            </InputLabel>
            <Select
              sx={{ mt: "15px", height: "56px" }}
              color="secondary"
              fullWidth
              multiple
              value={paymentMethods}
              onChange={handlePaymentChange}
              renderValue={(selected) => selected.join(", ")}
              inputProps={{ style: { fontFamily: "Josefin Sans" } }}
              style={inputStyle}
            >
              {Object.values(PaymentMethod).map((method) => (
                <MenuItem key={method} value={method}>
                  <Typography fontFamily="Josefin Sans">{method}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            sx={{ mt: "30px", height: "56px" }}
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
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Box>
      ) : (
        <Box
          paddingLeft="30px"
          paddingTop="25px"
          paddingBottom="50px"
          sx={{
            maxHeight: "100%",
            overflow: "auto",
            borderRadius: "12px",
            "&::-webkit-scrollbar": {
              width: "8px",
              borderRadius: "12px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: Colors.celestialBlue,
              borderRadius: "12px",
              zIndex: 2,
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: Colors.royalBlue,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
              borderRadius: "12px",
            },
          }}
        >
          <Typography fontSize={21} fontFamily={"inherit"}>
            Name: {name}
          </Typography>
          <Typography fontSize={21} fontFamily="inherit">
            Price: {customUser ? getLocalCurrency(customUser) : ""}
            {price}
          </Typography>
          <Typography fontSize={21} fontFamily="inherit">
            Date Posted: {listing.created_at.toString()}
          </Typography>
          <Typography fontSize={21} fontFamily="inherit">
            {dateDeleted ? `Date Sold: ${dateDeleted.toString()}` : "Not Sold"}
          </Typography>
          <Typography fontSize={21} fontFamily="inherit">
            Condition: {condition}
          </Typography>
          <Typography fontSize={21} fontFamily="inherit">
            Description: {description}
          </Typography>
          <Typography fontSize={21} fontFamily="inherit">
            {Array.isArray(paymentMethods) && paymentMethods.length > 0 ? (
              `Payment Methods: ${paymentMethods.join(", ")}`
            ) : (
              <Typography fontSize={21} fontFamily={"inherit"}>
                Payment methods are not available.
              </Typography>
            )}
          </Typography>

          <Typography fontSize={21} fontFamily="inherit">
            {Array.isArray(likes) && likes.length > 0 ? (
              `Liked By: ${likes.map((like) => like.username).join(", ")}`
            ) : (
              <Typography fontSize={21} fontFamily={"inherit"}>
                No one has liked your listing.
              </Typography>
            )}
          </Typography>
          <Typography fontSize={21} fontFamily="inherit">
            Exchange Location: {location}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ListingCard;
