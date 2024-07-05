import { Box } from "@mui/material";

const Dot = (props) => {
  return (
    <div>
      <Box
        sx={{
          width: props.width,
          height: props.height,
          borderRadius: "50%",
          backgroundColor: props.bgColor,
        }}
      />
    </div>
  );
};

export default Dot;
