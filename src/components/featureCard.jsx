import { Box, Divider, Typography } from "@mui/material";
import React from "react";

const FeatureCard = ({ data }) => {
  return data.map((val, i) => (
    <Box key={i}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
          mt: 1,
        }}
      >
        <Typography fontSize={12}>{val.label}</Typography>
        <Typography fontSize={12}>{val.value}</Typography>
      </Box>

      {i !== data.length - 1 && (
        <Divider sx={{ backgroundColor: "#000" }} />
      )}
    </Box>
  ));
};

export default FeatureCard;
