import { FILTERS } from "@/utils/enum";
import {
  Box,
  Dialog,
  DialogContentText,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";

const FilterDialog = ({ onSelect, selectedValue, open }) => {
  const filterItem = [
    {
      label: FILTERS.LOWESTPRICE,
    },
    {
      label: FILTERS.HIGHESTPRICE,
    },
    {
      label: FILTERS.NEWESTAD,
    },
    {
      label: FILTERS.RECOMMENDED,
    },
    {
      label: FILTERS.LOWESTMILEAGE,
    },
    {
      label: FILTERS.HIGHESTDISCOUNT,
    },
  ];
  const handleItemClick = (value) => {
    onSelect(value);
  };
  return (
    <div>
      <Dialog onClose={onSelect} open={open}>
        <Box>
          <List>
            {filterItem.map((val, i) => (
              <ListItemButton onClick={() => handleItemClick(val.label)} key={i}>
                <ListItemText primary={val.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Dialog>
    </div>
  );
};

export default FilterDialog;
