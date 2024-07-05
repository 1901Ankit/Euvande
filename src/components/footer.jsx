import whitelogo from "@/logo/EUVandeLogoWhite.svg";
import styles from "@/styles/footer.module.css";
import { Avatar, Box, Grid, Stack, Typography } from "@mui/material";
import {
  FaFacebookF,
  FaFacebookSquare,
  FaInstagram,
  FaInstagramSquare,
  FaLinkedin,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import List from "./list";
import data from "@/assests/data";
import Dot from "./dot";
const Footer = () => {
  const icons = [
    {
      icon: <FaFacebookF color="#fff" size={25} />,
    },
    {
      icon: <FaInstagram color="#fff" size={25} />,
    },
    {
      icon: <FaLinkedinIn color="#fff" size={25} />,
    },
    {
      icon: <FaYoutube color="#fff" size={25} />,
    },
  ];
  return (
    <Box
      sx={{ borderTop: "1px solid #eee", mt: 4, backgroundColor: "#000" }}
      paddingY={10}
    >
      <div className="container" style={{ maxWidth: 1250, padding: 0 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={4}>
            <img src={whitelogo.src} width={150} />
            <Typography
              fontSize={12}
              marginY={3}
              textAlign={"justify"}
              color="#fff"
              width={300}
            >
              EuVande takes the thrill of luxury car ownership to new heights,
              offering an unparalleled platform where enthusiasts can seamlessly
              buy, sell, and even participate in exciting auctions for the most
              coveted vehicles.
            </Typography>

            <Stack direction={"row"} alignItems={"center"} spacing={2} my={2}>
              {icons.map((val, i) => (
                <Avatar
                  sx={{
                    width: 25,
                    height: 25,
                    p: 1,
                    backgroundColor: "#000",
                    border: "1px solid #fff",
                    ":hover": {
                      transform: "scale(1.2)",
                    },
                    transition: "0.5s ease all",
                  }}
                >
                  {val.icon}
                </Avatar>
              ))}
            </Stack>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <Typography color={"#fff"} fontSize={12}>
                EuVande {new Date().getFullYear()}
              </Typography>
              <Dot bgColor="#fff" width={4} height={4} />
              <Typography color={"#fff"} fontSize={12}>
                All Rights Reserved
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6} lg={2}>
            <List heading="EuVande" data={data.list1} />
          </Grid>
          <Grid item xs={6} lg={2}>
            <List heading="Services" data={data.list2} />
          </Grid>
          <Grid item xs={6} lg={2}>
            <List heading="For Dealers" data={data.list3} />
          </Grid>
          <Grid item xs={6} lg={2}>
            <List heading="Company" data={data.list4} />
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default Footer;
