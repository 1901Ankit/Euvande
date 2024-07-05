import { Box, Card, Typography } from "@mui/material";
const BrandCard = (props) => {
  
  return (
    <Box>
      <Card
        sx={{
          padding: 3,
          borderRadius: 8,
          "&:hover": {
            transform: "scale(1.1)",
          },
          transition: "0.5s ease all",
          cursor: "pointer",
          height: 150,
        }}
        onClick={props.onClick}
      >
        <Box textAlign={"center"} marginBottom={2}>
          <img src={props.img} width={50} />
        </Box>
        <Typography
          fontSize={15}
          textAlign={"center"}
          fontWeight={600}
          textTransform={"capitalize"}
        >
          {props.brandName}
        </Typography>
        <Typography
          fontSize={12}
          textAlign={"center"}
          color={"#ao2ofo"}
          variant="h6"
        >
          {props.carNumber} Cars
        </Typography>
      </Card>
    </Box>
  );
};

export default BrandCard;
