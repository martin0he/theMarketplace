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
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ReactElement, useEffect, useState } from "react";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import supabase from "../../../auth/supabase";
import { AlertBox } from "../../../pages/SellPage";
import { Universities } from "../../../assets/Universities";

interface CustomTextFieldProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  type?: string;
  placeholder?: string;
  showPasswordToggle?: boolean;
  onTogglePasswordVisibility?: () => void;
  isPasswordVisible?: boolean;
}

const CustomTextField = ({
  value,
  onChange,
  type = "text",
  placeholder,
  showPasswordToggle = false,
  onTogglePasswordVisibility,
  isPasswordVisible,
}: CustomTextFieldProps) => {
  const { width } = useWindowDimensions();

  return (
    <Box sx={{ position: "relative", display: "inline-block" }}>
      <TextField
        value={value}
        onChange={onChange}
        type={type}
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
        placeholder={placeholder}
      />
      {showPasswordToggle && (
        <IconButton
          onClick={onTogglePasswordVisibility}
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      )}
    </Box>
  );
};

const ProfileForm = () => {
  const [alert, setAlert] = useState<ReactElement | null>(null);
  const [alertVisible, setAlertVisible] = useState<boolean>(false);
  const { customUser } = useAuth();

  const [editingUsername, setEditingUsername] = useState<boolean>(false);
  const [currentUsername, setCurrentUsername] = useState<string>(
    customUser?.username || "n/a"
  );
  const [username, setUsername] = useState<string>(currentUsername);

  const [editingEmail, setEditingEmail] = useState<boolean>(false);
  const [currentEmail, setCurrentEmail] = useState<string>(
    customUser?.email || "n/a"
  );
  const [email, setEmail] = useState<string>(currentEmail);

  const [school, setSchool] = useState<string>("n/a");

  const [currentPassword, setCurrentPassword] = useState<string>(
    customUser?.password || ""
  );
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [editingPassword, setEditingPassword] = useState<boolean>(false);
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] =
    useState<boolean>(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] =
    useState<boolean>(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState<boolean>(false);

  const fetchUserData = async () => {
    const { data, error } = await supabase
      .from("Users")
      .select()
      .eq("id", customUser?.id);

    if (error) {
      console.log("Error fetching user data", error);
    } else {
      const userData = data[0];
      setCurrentUsername(userData.username);
      setUsername(userData.username);
      setCurrentEmail(userData.email);
      setEmail(userData.email);
      const emailDomain = userData.email.split("@")[1];
      const matchedUniversity = Universities.find((uni) =>
        uni.domains.includes(emailDomain)
      );
      setSchool(matchedUniversity ? matchedUniversity.name : "n/a");
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

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
          console.log(rawData);
          console.log(
            "updated username to ",
            updateUsername ? updateUsername[0].username : "n/a"
          );
          setAlert(
            <Alert variant="outlined" severity="success">
              Successfully updated username!
            </Alert>
          );
          setCurrentUsername(username);
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
          console.log(data);
          console.log("updated email to ", updatedUser);
          setAlert(
            <Alert variant="outlined" severity="success">
              Check your inbox to confirm new email!
            </Alert>
          );
          setCurrentEmail(email);
        }
      }
    } else if (inputType === "password") {
      if (currentPassword !== customUser?.password) {
        setAlert(
          <Alert variant="outlined" severity="error">
            Current password is incorrect!
          </Alert>
        );
        return;
      }
      if (newPassword !== confirmPassword) {
        setAlert(
          <Alert variant="outlined" severity="error">
            New passwords do not match!
          </Alert>
        );
        return;
      }

      setEditingPassword(false);
      const { data: rawData, error: rawError } = await supabase.auth.updateUser(
        { password: newPassword }
      );

      if (rawError) {
        console.log("couldn't update password ", rawError);
        setAlert(
          <Alert variant="outlined" severity="error">
            Couldn't update password!
          </Alert>
        );
      } else {
        const { error: updatePasswordError } = await supabase
          .from("Users")
          .update({ password: newPassword })
          .eq("id", customUser?.id);
        if (updatePasswordError) {
          console.log("custom password couldnt update");
        } else {
          setAlert(
            <Alert variant="outlined" severity="success">
              Successfully updated password!
            </Alert>
          );
          console.log(rawData);
          setNewPassword("");
          setConfirmPassword("");
        }
      }
    }
  };

  const handleCancel = (inputType: string) => {
    if (inputType === "username") {
      setUsername(currentUsername);
      setEditingUsername(false);
    } else if (inputType === "email") {
      setEmail(currentEmail);
      setEditingEmail(false);
    } else if (inputType === "password") {
      setNewPassword("");
      setConfirmPassword("");
      setEditingPassword(false);
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
                <IconButton onClick={() => handleCancel("username")}>
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
                <IconButton onClick={() => handleCancel("email")}>
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
            <Typography
              fontFamily="inherit"
              fontSize={23}
              display={"flex"}
              flexDirection={"row"}
              gap={1}
            >
              password:{" "}
              {editingPassword ? (
                <CustomTextField
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  type={isCurrentPasswordVisible ? "text" : "password"}
                  placeholder="Current Password"
                  showPasswordToggle
                  onTogglePasswordVisibility={() =>
                    setIsCurrentPasswordVisible(!isCurrentPasswordVisible)
                  }
                  isPasswordVisible={isCurrentPasswordVisible}
                />
              ) : (
                <>
                  <Typography fontFamily="inherit" fontSize={23}>
                    {isCurrentPasswordVisible
                      ? currentPassword
                      : "•".repeat(currentPassword.length)}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, ml: 1 }}>
                    <IconButton
                      onClick={() =>
                        setIsCurrentPasswordVisible(!isCurrentPasswordVisible)
                      }
                    >
                      {isCurrentPasswordVisible ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                    <IconButton onClick={() => setEditingPassword(true)}>
                      <EditNoteIcon sx={{ fontSize: "25px" }} />
                    </IconButton>
                  </Box>
                </>
              )}
            </Typography>
          </Box>
          {editingPassword && (
            <>
              <Box display="flex" alignItems="center" mt={1}>
                <CustomTextField
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  type={isNewPasswordVisible ? "text" : "password"}
                  placeholder="New Password"
                  showPasswordToggle
                  onTogglePasswordVisibility={() =>
                    setIsNewPasswordVisible(!isNewPasswordVisible)
                  }
                  isPasswordVisible={isNewPasswordVisible}
                />
              </Box>
              <Box display="flex" alignItems="center" mt={1}>
                <CustomTextField
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  placeholder="Confirm New Password"
                  showPasswordToggle
                  onTogglePasswordVisibility={() =>
                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                  }
                  isPasswordVisible={isConfirmPasswordVisible}
                />
              </Box>
              <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                <IconButton onClick={() => handleUpdate("password")}>
                  <SaveAltIcon sx={{ fontSize: "25px" }} />
                </IconButton>
                <IconButton onClick={() => handleCancel("password")}>
                  <CancelIcon sx={{ fontSize: "25px" }} />
                </IconButton>
              </Box>
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileForm;
