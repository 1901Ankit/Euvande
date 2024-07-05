import { Box, Button, Card, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const Thankyou = () => {
  const router = useRouter();
  return (
    <div>
      <div>
        <Head>
          <script src="https://static-bundles.visme.co/forms/vismeforms-embed.js"></script>
        </Head>
      </div>
      <div
        class="visme_d"
        data-title="Custom Form"
        data-url="319eo1jq-custom-form?fullPage=true"
        data-domain="forms"
        data-full-page="true"
        data-min-height="100vh"
        data-form-id="30273"
      ></div>
      {/* <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card sx={{ width: 450, p: 2 }}>
          <Typography textAlign={"center"} fontSize={20} fontWeight={550}>
            Thank you for your interest in purchasing a car with us!
          </Typography>
          <Typography fontSize={12} textAlign={"center"} my={2}>
            We appreciate your decision to buy a car through our platform. Your
            request has been received, and we are currently processing it.
            However, please note that before finalizing your purchase, it needs
            to be approved by our administrative team.
          </Typography>
          <Button
            sx={{
              border: "1px solid #000",
              color: "#000",
              backgroundColor: "#fff",
              mt: 2,
            }}
            fullWidth
            onClick={() => router.push("/buy-cars")}
          >
            Browse More Cars
          </Button>
        </Card>
      </Box> */}
    </div>
  );
};

export default Thankyou;
