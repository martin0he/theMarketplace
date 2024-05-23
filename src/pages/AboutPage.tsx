import { Box, Typography } from "@mui/material";

const AboutPage = () => {
  return (
    <Box paddingY={10} paddingX={7} textAlign="center" marginTop="40px">
      <Typography variant="h4" color="#68ac53" fontFamily="inherit">
        Welcome to theMarketplace!
      </Typography>

      <Typography variant="h6" fontFamily="inherit" marginTop="15px">
        This is the premiere, college-exclusive online markeplace to sell and
        buy items on your campus.
      </Typography>

      <Typography
        variant="h5"
        textAlign="left"
        fontFamily="inherit"
        marginTop="20px"
        marginLeft="35px"
      >
        How It Works
      </Typography>

      <Typography
        variant="h6"
        fontFamily="inherit"
        textAlign="left"
        marginLeft="35px"
        marginTop="20px"
      >
        To use theMarketplace you must first sign in with your
        <span
          style={{ fontWeight: "bold", fontStyle: "italic", color: "#1d7ec9" }}
        >
          {" "}
          university-administrated '.edu'
        </span>{" "}
        email address. Here, you can see all available listings posted on your
        local college campus as well as being able to list your own items for
        sale.
      </Typography>

      <Typography
        variant="h5"
        textAlign="left"
        fontFamily="inherit"
        marginTop="20px"
        marginLeft="35px"
      >
        Why It Exists
      </Typography>

      <Typography
        variant="h6"
        fontFamily="inherit"
        textAlign="left"
        marginLeft="35px"
        marginTop="20px"
      >
        Having to search on general markeplaces or broad social media stories to
        buy your fellow students' second-hand possessions is an inefficient
        problem not belonging to this day and age. Moving out and need some
        quick cash? Waiting weeks for a response just doesn't cut it anymore,
        list your items here today and get things rolling! When you think about
        going{" "}
        <span
          style={{ fontWeight: "bold", fontStyle: "italic", color: "#57c157" }}
        >
          second-hand
        </span>
        , think about{" "}
        <span
          style={{ fontWeight: "bold", fontStyle: "italic", color: "#57c157" }}
        >
          theMarketplace
        </span>
        .
      </Typography>
    </Box>
  );
};

export default AboutPage;
