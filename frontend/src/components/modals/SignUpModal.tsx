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

  const { signUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(formData.email, formData.password, formData.username);
      alert("check your email");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

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
