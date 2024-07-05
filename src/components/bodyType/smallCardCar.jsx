import { Box, Card, Stack, Typography } from "@mui/material";
const SmallCarCard = (props) => {
  return (
    <div>
      <Card
        sx={{
          width: { xs: "100%", lg: "100%" },
          height: { xs: "100%", lg: "100%" },
        }}
      >
        <img src={props.img} width={"100%"} height="150px" />
        <Box padding={1}>
          <Typography
            fontSize={{ xs: 12, lg: 18 }}
            // fontWeight={600}
            className="mb-2"
          >
            {props.name.slice(0, 20)}...
          </Typography>
          <Stack
            direction={{ xs: "row", lg: "row" }}
            alignItems={{ xs: "flex-start", lg: "center" }}
            spacing={1}
          >
            <Typography fontSize={{ xs: 10, lg: 13 }}>
              {props.driven} km
            </Typography>
            <Box
              className="dot"
              style={{ width: "2px", height: "2px" }}
              sx={{ display: { xs: "none", lg: "block" } }}
            ></Box>
            <Typography fontSize={{ xs: 10, lg: 13 }}>
              {props.transmission}
            </Typography>
            <Box
              className="dot"
              style={{ width: "2px", height: "2px" }}
              sx={{ display: { xs: "none", lg: "block" } }}
            ></Box>
            <Typography fontSize={{ xs: 10, lg: 13 }}>
              {props.variant}
            </Typography>
          </Stack>
          <Typography fontSize={{ xs: 15, lg: 20 }}>
            {props.price} €{" "}
          </Typography>
        </Box>
      </Card>
    </div>
  );
};

export default SmallCarCard;
