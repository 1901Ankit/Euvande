import { Box, Typography } from "@mui/material";
const HowWorks = (props) => {
  return (
    <div>
      <Box textAlign={"center"}>
        <img src={props.img} width={100} className="mb-4" />
      </Box>
      <Typography
        fontSize={25}
        textAlign={"center"}
        variant="h5"
        fontWeight={700}
        sx={{ whiteSpace: "pre-line" }}
      >
        {props.heading1}
      </Typography>
      <Typography
        fontSize={25}
        textAlign={"center"}
        variant="h5"
        fontWeight={700}
        sx={{ whiteSpace: "pre-line" }}
      >
        {props.heading2}
      </Typography>
      <Typography fontSize={12} className="mt-3" textAlign={"center"}>
        {props.description}
      </Typography>
    </div>
  );
};

export default HowWorks;
