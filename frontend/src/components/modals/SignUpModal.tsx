/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import Colors from "../../assets/Colors";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth } from "../../auth/AuthProvider";

interface SignUpModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

const SignUpModal = ({ isOpen, handleClose }: SignUpModalProps) => {
  const { handleSubmit } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  console.log(formData);

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }
  /*
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
      const customUser: CustomUser = {
        ...data.user,
        username: formData.username,
        password: formData.password,
      };
      console.log("CustomUser:", customUser);
    } catch (error) {
      console.log("Sign-up error:", error);
      alert(error);
    }
  }
*/

  async function submit(e) {
    e.preventDefault();
    handleSubmit(e, formData.email, formData.password, formData.username);
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
        <Box margin={4}>
          <form onSubmit={submit}>
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