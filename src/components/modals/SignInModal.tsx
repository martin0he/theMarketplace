/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import Colors from "../../assets/Colors";
import { FormEvent, ReactElement, useState } from "react";
import supabase from "../../auth/supabase";
import CloseIcon from "@mui/icons-material/Close";

interface SignInModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const SignInModal = ({ isOpen, handleClose }: SignInModalProps) => {
  const [alert, setAlert] = useState<ReactElement>();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (error) {
        setAlert(
          <Alert variant="outlined" severity="error">
            {error.message}
          </Alert>
        );
      } else {
        setAlert(
          <Alert variant="outlined" severity="success">
            Successfully signed in!
          </Alert>
        );
      }
      console.log(data, error);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogTitle
          sx={{
            fontFamily: "Josefin Sans",
            fontSize: "28px",
            color: Colors.celestialBlue,
          }}
        >
          sign in
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: Colors.celestialBlue,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          {alert}
          <Box margin={4}>
            <form onSubmit={handleSubmit}>
              <TextField
                type="email"
                label="University Email"
                placeholder="enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputProps={{
                  style: { fontFamily: "inherit", fontSize: "24px" },
                }}
                InputLabelProps={{
                  style: { fontFamily: "inherit", fontSize: "24px" },
                }}
                required
              />
              <TextField
                type={showPassword ? "text" : "password"}
                label="Password"
                placeholder="enter password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputProps={{
                  style: { fontFamily: "inherit", fontSize: "24px" },
                }}
                InputLabelProps={{
                  style: { fontFamily: "inherit", fontSize: "24px" },
                }}
                required
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showPassword}
                    onChange={handleTogglePasswordVisibility}
                    color="primary"
                  />
                }
                label={
                  <Typography fontFamily="Josefin Sans">
                    show password
                  </Typography>
                }
              />
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{
                  marginTop: "30px",
                  backgroundColor: "#8b3fc6",
                  color: "white",
                  fontFamily: "inherit",
                  textTransform: "lowercase",
                  fontSize: "18px",
                  borderRadius: "9px",
                  boxShadow: 1,
                  ":hover": { backgroundColor: "#571877" },
                }}
              >
                login
              </Button>
            </form>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SignInModal;
