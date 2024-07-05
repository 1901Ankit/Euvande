import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";

const FilterSection = ({
  make,
  period,
  makeHandleChange,
  selectedMake,
  periodHandler,
  selectedPeriod,
  model,
  selectedModel,
  modelHandler,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleAccordion = (panel) => (e, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box>
      <Accordion
        sx={{
          boxShadow: "none",
          width: "100%",
        }}
        onChange={handleAccordion("panel1")}
        // expanded={expanded === "panel1"}
        defaultExpanded={true}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          sx={{ borderBottom: expanded === "panel1" ? "1px solid #eee" : "1px solid #eee" }}
        >
          <Typography variant="h4" fontSize={15}>
            Make
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ height: 200, overflowY: "auto" }}>
          <List>
            {make.map((val, i) => (
              <ListItem disablePadding key={i}>
                <FormControl>
                  <RadioGroup
                    name="make"
                    onChange={makeHandleChange}
                    value={selectedMake}
                  >
                    <FormControlLabel
                      control={<Radio size="small" />}
                      value={val.id}
                      label={val.makeName}
                      sx={{
                        "& .MuiTypography-root": {
                          fontSize: 13,
                          textTransform: "capitalize",
                        },
                      }}
                    />
                  </RadioGroup>
                </FormControl>
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
      </Accordion>
      <Divider />
      <Accordion
        sx={{
          boxShadow: "none",
          width: "100%",
        }}
        onChange={handleAccordion("panel2")}
        expanded={expanded === "panel2"}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          sx={{ borderBottom: expanded === "panel2" ? "1px solid #eee" : "" }}
        >
          <Typography variant="h4" fontSize={15}>
            Year
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{ height: period.length ? 200 : 50, overflowY: "auto" }}
        >
          <List>
            {period.length ? (
              period.map((val, i) => (
                <ListItem disablePadding key={i}>
                  <FormControl>
                    <RadioGroup
                      name="period"
                      onChange={periodHandler}
                      value={selectedPeriod}
                    >
                      <FormControlLabel
                        control={<Radio size="small" />}
                        value={val.id}
                        label={val.year}
                        sx={{
                          "& .MuiTypography-root": {
                            fontSize: 13,
                            textTransform: "capitalize",
                          },
                        }}
                      />
                    </RadioGroup>
                  </FormControl>
                </ListItem>
              ))
            ) : (
              <Typography fontSize={12} color={"#ff0000"}>
                Please Select Make
              </Typography>
            )}
          </List>
        </AccordionDetails>
      </Accordion>
      <Divider />
      <Accordion
        sx={{
          boxShadow: "none",
          width: "100%",
        }}
        onChange={handleAccordion("panel3")}
        expanded={expanded === "panel3"}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          sx={{ borderBottom: expanded === "panel3" ? "1px solid #eee" : "" }}
        >
          <Typography variant="h4" fontSize={15}>
            Model
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{ height: model.length ? 200 : 50, overflowY: "auto" }}
        >
          <List>
            {model.length ? (
              model.map((val, i) => (
                <ListItem disablePadding key={i}>
                  <FormControl>
                    <RadioGroup
                      name="model"
                      onChange={modelHandler}
                      value={selectedModel}
                    >
                      <FormControlLabel
                        control={<Radio size="small" />}
                        value={val.id}
                        label={val.modelName}
                        sx={{
                          "& .MuiTypography-root": {
                            fontSize: 13,
                            textTransform: "capitalize",
                          },
                        }}
                      />
                    </RadioGroup>
                  </FormControl>
                </ListItem>
              ))
            ) : (
              <Typography fontSize={12} color={"#ff0000"}>
                Please Select Year and Make
              </Typography>
            )}
          </List>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FilterSection;
