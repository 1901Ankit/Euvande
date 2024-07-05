import {
  Box,
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import service1 from "@/icons/services/services-finance.svg";
import { CheckCircle } from "@mui/icons-material";
const ServicesCard = () => {
  return (
    <Card sx={{ padding: 5 }}>
      <Box textAlign={"center"} marginBottom={5}>
        <img src={service1.src} alt="" />
      </Box>
      <Typography
        variant="h4"
        fontSize={30}
        textAlign={"center"}
        fontWeight={600}
      >
        Financing
      </Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <CheckCircle sx={{ color: "green" }} />
          </ListItemIcon>
          <ListItemText />
        </ListItem>
      </List>
    </Card>
  );
};

export default ServicesCard;
