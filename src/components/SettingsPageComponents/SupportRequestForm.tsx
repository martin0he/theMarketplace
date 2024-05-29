import { useRef, FormEvent, useState } from "react";
import emailjs from "@emailjs/browser";
import { useAuth } from "../../auth/AuthProvider";
import { useTheme } from "@mui/material";

export const SupportRequestForm = () => {
  const { customUser } = useAuth();
  const form = useRef<HTMLFormElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();
  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm(
          "service_e6m4wtx",
          "template_o7ai51s",
          form.current,
          "a0B5wezVW8WnChYhJ"
        )
        .then(
          () => {
            console.log("SUCCESS!");
          },
          (error) => {
            console.log("FAILED...", error.text);
          }
        );
    }
  };

  return (
    <form
      ref={form}
      onSubmit={sendEmail}
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "2rem",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <label
        style={{
          display: "block",
          fontSize: "1rem",
          marginBottom: "0.5rem",
          color: "#333",
        }}
      >
        Name
      </label>
      <input
        type="text"
        name="from_name"
        required
        style={{
          width: "100%",
          padding: "0.75rem",
          marginBottom: "1rem",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "1rem",
        }}
      />
      <label
        style={{
          display: "block",
          fontSize: "1rem",
          marginBottom: "0.5rem",
          color: "#333",
        }}
      >
        School
      </label>
      <input
        type="text"
        name="from_school"
        value={customUser?.school || "n/a"}
        readOnly
        style={{
          width: "100%",
          padding: "0.75rem",
          marginBottom: "1rem",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "1rem",
          backgroundColor: "#e9ecef",
        }}
      />
      <label
        style={{
          display: "block",
          fontSize: "1rem",
          marginBottom: "0.5rem",
          color: "#333",
        }}
      >
        Message
      </label>
      <textarea
        name="message"
        required
        style={{
          width: "100%",
          padding: "0.75rem",
          marginBottom: "1rem",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "1rem",
          resize: "vertical",
        }}
      />
      <input
        type="submit"
        value="Send"
        style={{
          width: "100%",
          padding: "0.75rem",
          border: "none",
          borderRadius: "4px",
          backgroundColor: isHovered
            ? theme.palette.customColors.cerise
            : theme.palette.customColors.submitButton,
          color: "white",
          fontSize: "1rem",
          cursor: "pointer",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </form>
  );
};
