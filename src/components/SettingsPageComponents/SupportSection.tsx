import {
  Box,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  Typography,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SupportRequestForm } from "./SupportRequestForm";

const SupportSection = () => {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="h5"
        style={{ color: theme.palette.customColors.cerise }}
      >
        faq
      </Typography>
      <Box padding="20px">
        <Accordion sx={{ backgroundColor: theme.palette.customColors.inputBG }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography fontWeight={600}>
              what is theMarketplace for?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            theMarketplace is designed to help students buy, sell, and exchange
            items with other students on campus. It's a convenient way to find
            textbooks, electronics, dorm supplies, and more.
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ backgroundColor: theme.palette.customColors.inputBG }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography fontWeight={600}>
              who can use theMarketplace?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            This website is exclusively for students, faculty, and staff of any
            college/university. You need a valid '.edu' email address to sign
            up.
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ backgroundColor: theme.palette.customColors.inputBG }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography fontWeight={600}>
              can I edit/delete my listing?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            Yes, you can edit or delete your listings anytime by going to the
            "Listings" tab under your account page.
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ backgroundColor: theme.palette.customColors.inputBG }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography fontWeight={600}>
              where do exchanges usually take place?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            Exchanges typically take place in safe, public locations on campus,
            such as the library, student center, or dining halls. We recommend
            meeting during daylight hours and bringing a friend along for added
            safety.
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ backgroundColor: theme.palette.customColors.inputBG }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography fontWeight={600}>how do I buy an item?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            To buy an item, browse the listings and click on the item you are
            interested in. Contact the seller directly through their visible
            email address to arrange payment and pick-up details.
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ backgroundColor: theme.palette.customColors.inputBG }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography fontWeight={600}>
              why does my school not seem to be recognized?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            In the case that your institution is not already in our database,
            please send in a request via the support form provided below for any
            bug/improvement/question/etc.
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ backgroundColor: theme.palette.customColors.inputBG }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography sx={{ textDecoration: "underline" }} fontWeight={600}>
              support request form
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <SupportRequestForm />
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default SupportSection;
