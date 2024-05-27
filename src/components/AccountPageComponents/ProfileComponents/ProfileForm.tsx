import {
  Alert,
  Box,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "../../../auth/AuthProvider";
import EditNoteIcon from "@mui/icons-material/EditNote";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import { ReactElement, useEffect, useState } from "react";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import supabase from "../../../auth/supabase";
import { AlertBox } from "../../../pages/SellPage";
import { Universities } from "../../../assets/Universities";

interface CustomTextFieldProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

const CustomTextField = ({ value, onChange }: CustomTextFieldProps) => {
  const { width } = useWindowDimensions();

  return (
    <TextField
      value={value}
      onChange={onChange}
      sx={{
        width: {
          md: 0.2 * width,
          sm: 0.4 * width,
          xs: 0.3 * width,
        },
      }}
      inputProps={{
        style: {
          fontFamily: "Josefin Sans",
          height: "8px",
          fontSize: 19,
          justifyContent: "center",
        },
      }}
    />
  );
};

const ProfileForm = () => {
  const [alert, setAlert] = useState<ReactElement | null>(null);
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const { customUser } = useAuth();
  const [editingUsername, setEditingUsername] = useState<boolean>(false);
  const [username, setUsername] = useState<string>(
    customUser?.username || "n/a"
  );
  const [editingEmail, setEditingEmail] = useState<boolean>(false);
  const [email, setEmail] = useState<string>(customUser?.email || "n/a");
  const [school, setSchool] = useState<string>("n/a");

  useEffect(() => {
    const updateSchool = () => {
      const emailDomain = email.split("@")[1];
      const matchedUniversity = Universities.find((uni) =>
        uni.domains.includes(emailDomain)
      );
      setSchool(matchedUniversity ? matchedUniversity.name : "n/a");
    };

    updateSchool();
  }, [email]);

  useEffect(() => {
    if (alert) {
      setAlertVisible(true);
      const timer = setTimeout(() => {
        setAlertVisible(false);
        setTimeout(() => {
          setAlert(null);
        }, 500);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [alert]);

  const handleUpdate = async (inputType: string) => {
    if (inputType === "username") {
      setEditingUsername(false);
      const { data: rawData, error: rawError } = await supabase.auth.updateUser(
        {
          data: { fullname: username },
        }
      );

      if (rawError) {
        console.log("couldn't update username ", rawError);
        setAlert(
          <Alert variant="outlined" severity="error">
            Couldn't update username!
          </Alert>
        );
      } else {
        const { data: updateUsername, error: updateUsernameError } =
          await supabase
            .from("Users")
            .update({ username: username })
            .eq("id", customUser?.id)
            .select();
        if (updateUsernameError) {
          console.log("couldn't update custom user", updateUsernameError);
        } else {
          console.log(
            "updated username to ",
            updateUsername ? updateUsername[0].username : "n/a"
          );
          console.log(rawData);
          setAlert(
            <Alert variant="outlined" severity="success">
              Successfully updated username!
            </Alert>
          );
        }
      }
    } else if (inputType === "email") {
      setEditingEmail(false);
      const { data, error } = await supabase.auth.updateUser({
        email: email,
      });
      if (error) {
        console.log("couldn't update email ", error);
        setAlert(
          <Alert variant="outlined" severity="error">
            Couldn't update email!
          </Alert>
        );
      } else {
        const { data: updatedUser, error: updateEmailError } = await supabase
          .from("Users")
          .update({ email: email })
          .eq("id", customUser?.id)
          .select();

        if (updateEmailError) {
          setAlert(
            <Alert variant="outlined" severity="error">
              Couldn't update email!
            </Alert>
          );
        } else {
          console.log("updated email to ", updatedUser);

          console.log(data);
          setAlert(
            <Alert variant="outlined" severity="success">
              Check your inbox to confirm new email!
            </Alert>
          );
        }
      }
    }
  };

  return (
    <Box>
      {alert && (
        <AlertBox style={{ opacity: alertVisible ? 1 : 0 }}>{alert}</AlertBox>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            display="grid"
            gridTemplateColumns="auto max-content"
            alignItems="center"
          >
            <Typography fontFamily="inherit" fontSize={23}>
              username:{" "}
              {editingUsername ? (
                <CustomTextField
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              ) : (
                username
              )}
            </Typography>
            {editingUsername ? (
              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton onClick={() => handleUpdate("username")}>
                  <SaveAltIcon sx={{ fontSize: "25px" }} />
                </IconButton>
                <IconButton onClick={() => setEditingUsername(false)}>
                  <CancelIcon sx={{ fontSize: "25px" }} />
                </IconButton>
              </Box>
            ) : (
              <IconButton onClick={() => setEditingUsername(true)}>
                <EditNoteIcon sx={{ fontSize: "25px" }} />
              </IconButton>
            )}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            display="grid"
            gridTemplateColumns="auto max-content"
            alignItems="center"
          >
            <Typography fontFamily="inherit" fontSize={23}>
              email:{" "}
              {editingEmail ? (
                <CustomTextField
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              ) : (
                email
              )}
            </Typography>
            {editingEmail ? (
              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton onClick={() => handleUpdate("email")}>
                  <SaveAltIcon sx={{ fontSize: "25px" }} />
                </IconButton>
                <IconButton onClick={() => setEditingEmail(false)}>
                  <CancelIcon sx={{ fontSize: "25px" }} />
                </IconButton>
              </Box>
            ) : (
              <IconButton onClick={() => setEditingEmail(true)}>
                <EditNoteIcon sx={{ fontSize: "25px" }} />
              </IconButton>
            )}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            display="grid"
            gridTemplateColumns="auto max-content"
            alignItems="center"
          >
            <Typography fontFamily="inherit" fontSize={23}>
              school: {school}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            display="grid"
            gridTemplateColumns="auto max-content"
            alignItems="center"
          >
            <Typography fontFamily="inherit" fontSize={23}>
              password: {customUser ? customUser.password : "n/a"}
            </Typography>
            <IconButton>
              <EditNoteIcon sx={{ fontSize: "25px" }} />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileForm;
