/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import Colors from "../../assets/Colors";
import { useState, ReactElement } from "react";
import CloseIcon from "@mui/icons-material/Close";
import supabase from "../../auth/supabase";
import { Universities } from "../../assets/Universities";

interface SignUpModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const SignUpModal = ({ isOpen, handleClose }: SignUpModalProps) => {
  const [alert, setAlert] = useState<ReactElement>();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            fullname: formData.username,
          },
        },
      });
      if (error) {
        setAlert(
          <Alert variant="outlined" severity="error">
            {error.message}
          </Alert>
        );
      } else {
        // New user signed up successfully, now add to custom user table
        const domain = formData.email?.split("@")[1];
        const userUniversity = Universities.find((uni: any) =>
          uni.domains.includes(domain)
        );
        const { data: newUser, error: insertError } = await supabase
          .from("Users")
          .insert([
            {
              id: data?.user?.id,
              email: formData.email,
              username: formData.username,
              password: formData.password,
              school: userUniversity?.name,
            },
          ]);
        if (insertError) {
          console.error("Error inserting new user:", insertError);
          setAlert(
            <Alert variant="outlined" severity="error">
              Error creating user. Please try again.
            </Alert>
          );
        } else {
          setAlert(
            <Alert variant="outlined" severity="success">
              Successfully registered! Check your inbox for verification email.
            </Alert>
          );
        }
      }
    } catch (error) {
      console.log("Sign-up error:", error);
    }
  }

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle
        sx={{
          fontFamily: "Josefin Sans",
          fontSize: "28px",
          color: Colors.celestialBlue,
        }}
      >
        sign up
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
              label="Username"
              placeholder="enter username"
              name="username"
              value={formData.username}
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
              type="password"
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
              register
            </Button>
          </form>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SignUpModal;
