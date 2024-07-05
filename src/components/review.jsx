import { Box, Card, Stack, Typography } from "@mui/material";
import React from "react";
import styles from "@/styles/review.module.css";
const Review = (props) => {
  return (
    <div>
      <Card sx={{ width: "95%", my: 3, p: 2, height: 200 }}>
        {/* <Typography sx={{ fontSize: 12 }}>
          {props.review.slice(0, 550)}
        </Typography> */}

        <p className="f-12 fw-normal px-1">
          {props.review.slice(0, 500)}.
          {/* <span onClick={props.onClick} className={styles.readMore}>
            Read More
          </span> */}
        </p>
        {/* <Box sx={{ position: "relative" }}>
          <Stack
            spacing={2}
            direction={"row"}
            alignItems={"center"}
            sx={{ position: "absolute" }}
          >
            <img className={styles.reviewer_image} src={props.img} />
            <div>
              <p>{props.name}</p>
            </div>
          </Stack>
        </Box> */}
      </Card>
    </div>
  );
};

export default Review;
