import { Add, Remove } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import React, { useState } from "react";
import styles from "@/styles/accordion.module.css";
const FAQ = () => {
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const accordionSummary = [
    {
      panel: "panel1",
      title: "What is Lorem ipsum",
      summary: "Lorem Ipsum is a dummy text.",
    },
    {
      panel: "panel2",
      title: "What is Lorem ipsum",
      
      summary: "Lorem Ipsum is a dummy text.",
    },
    {
      panel: "panel3",
      title: "What is Lorem ipsum",
      summary: "Lorem Ipsum is a dummy text.",
    },
    {
      panel: "panel4",
      title: "What is Lorem ipsum",
      summary: "Lorem Ipsum is a dummy text.",
    },
    {
      panel: "panel5",
      title: "What is Lorem ipsum",
      summary: "Lorem Ipsum is a dummy text.",
    },
  ];
  return (
    <div>
      {accordionSummary.map((val, i) => (
        <Accordion
          expanded={expanded === val.panel}
          onChange={handleChange(val.panel)}
        >
          <AccordionSummary
            expandIcon={
              expanded === val.panel ? (
                <Remove  />
              ) : (
                <Add />
              )
            }
            className={" border-bottom "}
          >
            {i + 1}. {val.title}
          </AccordionSummary>
          <AccordionDetails>{val.summary}</AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default FAQ;
