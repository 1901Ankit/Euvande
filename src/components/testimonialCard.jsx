import { Box, Card, Rating, Typography } from "@mui/material";
const TestimonialCard = (props) => {
  //   const [value, setValue] = useState(0);
  return (
    <div>
      <Card sx={{ width: "90%", height: 410 }}>
        <img src={props.img} width="100%" height={180} />
        <Box>
          <Typography fontSize={14} fontWeight={550} paddingX={2} paddingY={1}>
            {props.name}
          </Typography>
          <Rating value={5} readOnly sx={{ paddingX: 2 }} />
          <Typography fontSize={13} padding={2} textAlign={"justify"}>
            {props.testimonial}
          </Typography>
        </Box>
      </Card>
    </div>
  );
};

export default TestimonialCard;
