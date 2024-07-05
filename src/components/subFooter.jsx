import { Avatar, Box, Container, Stack, Typography } from "@mui/material";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import card1 from "@/banner_image/visa.svg";
import card2 from "@/banner_image/visa-electron.svg";
import card3 from "@/banner_image/mastercard.svg";
import card4 from "@/banner_image/maestro.svg";
import card5 from "@/banner_image/discover.svg";
import card6 from "@/banner_image/diners-club.svg";
const SubFooter = () => {
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

  const cards = [
    {
      img: card1.src,
    },
    {
      img: card2.src,
    },
    {
      img: card3.src,
    },
    {
      img: card4.src,
    },
    {
      img: card5.src,
    },
    {
      img: card6.src,
    },
  ];

  return (
    <Container style={{ maxWidth: 1300 }} sx={{ p: 2 }}>
      {/* <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          ml: 3,
        }}
      >
        <Typography color={"#fff"} fontSize={12}>
          &#169; {new Date().getFullYear()} Euvande
        </Typography>
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          <Typography color={"#fff"} fontSize={14}>
            Connect :{" "}
          </Typography>
          <Stack direction={"row"} alignItems={"center"} spacing={1}>
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
        </Stack>
      </Box> */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography color={"#fff"} fontSize={12}>
          We accept online card payments as well as wire transfers.
        </Typography>
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          {cards.map((image, i) => (
            <img src={image.img} key={i} />
          ))}
        </Stack>
      </Box>
      <Typography fontSize={12} color={"#fff"} textAlign={"justify"} mt={3}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum libero
        incidunt numquam neque impedit veniam quis dolores ad, nam perspiciatis
        corrupti atque. Numquam eligendi veniam consequatur vero odio pariatur
        commodi ut quibusdam qui similique. Molestiae vero praesentium sint? Rem
        minima aut libero iste assumenda totam asperiores expedita facere quasi
        beatae, nihil, excepturi voluptates! Possimus nisi ut id laudantium.
        Fuga beatae maiores amet commodi autem facilis nisi accusantium
        architecto inventore quae. Perspiciatis, inventore atque a voluptatum
        deserunt alias ducimus architecto natus labore placeat nam hic
        cupiditate quod laudantium! Nisi earum accusamus doloremque quo quidem.
        Ipsum porro nisi sed consequatur recusandae quod, rem explicabo, ut
        incidunt laudantium quas corrupti facere, asperiores repellendus tempora
        est sit eum totam minus voluptas quidem dolorem! Assumenda fugiat velit
        eum non sunt quis cumque consequatur, reiciendis quia culpa voluptas ad
        voluptate amet laborum alias minima tempora sint similique. Minus
        pariatur reprehenderit ea cumque ipsam sunt? Neque natus eos ex,
        blanditiis id, labore quisquam quae odit temporibus commodi officiis
        debitis excepturi dolorem. Quis fugit quos molestias quisquam odio
        nobis, quaerat facilis reiciendis, saepe quia dolorum placeat ratione
        modi. Enim quia exercitationem rem quibusdam possimus ipsum recusandae
        quae, doloribus asperiores at laudantium inventore. Et accusamus minus
        sunt error rem?
      </Typography>
    </Container>
  );
};

export default SubFooter;
