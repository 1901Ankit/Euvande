import { Box, Card, Grid, Typography } from "@mui/material";
import React from "react";
import { Carousel } from "react-responsive-carousel";

const Testimonials = (props) => {
  return (
    <div>
      <Carousel
        showThumbs={false}
        showArrows={false}
        autoPlay={true}
        interval={1500}
        infiniteLoop={true}
      >
        {props.data.map((val, i) => (
          <Box sx={{ p: 4, mb: 4 }} key={i}>
            <Box
              sx={{
                backgroundColor: "#fff",
                color: "#000",
                height: 370,
                border: "1px solid #eee",
              }}
            >
              <Grid container>
                <Grid item lg={4} p={6} sx={{ position: "relative", left: 20 }}>
                  <img
                    src={val.img.src}
                    style={{
                      borderRadius: 10,
                      height: 430,
                      zIndex: 999,
                      position: "absolute",
                      right: 0,
                      width: 400,
                      top: -20,
                      padding: 6,
                    }}
                  />
                </Grid>
                <Grid item lg={8} p={6}>
                  <Typography
                    textAlign={"justify"}
                    fontSize={30}
                    fontWeight={550}
                  >
                    {val.heading}
                  </Typography>

                  <Typography
                    fontSize={12}
                    sx={{ mt: 2 }}
                    textAlign={"justify"}
                    lineHeight={2}
                  >
                    {val.review}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      mt: 3,
                    }}
                  >
                    <Typography
                      variant="p"
                      fontSize={20}
                      textAlign={"start"}
                      fontWeight={550}
                      letterSpacing={2}
                    >
                      {val.name}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        ))}
      </Carousel>
    </div>
  );
};

export default Testimonials;
