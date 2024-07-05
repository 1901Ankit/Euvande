import { getUserProfile } from "@/api/apiCalling/authenticationApi";
import { HeaderLinks } from "@/assests/routes";
import logoBlack from "@/logo/EUVandeLogoBlack.svg";
import logo from "@/logo/EUVandeLogoWhite.svg";
import { removeDetails } from "@/redux/reducers/userdetails";
import styles from "@/styles/Header.module.css";
import CloseIcon from "@mui/icons-material/Close";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonIcon from "@mui/icons-material/Person";
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Divider,
  Drawer,
  FormHelperText,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
// import Button from "./button";
import { Close, Logout, MenuOpen, Person } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [show, setShow] = useState(false);
  const router = useRouter();
  const isAuthenticated = useSelector(
    (state) => state.userInfo.isAuthenticated
  );

  useEffect(() => {
    if (
      router.pathname === "/" ||
      router.pathname === "/sell-cars/car-details"
    ) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [router.pathname, show]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [popOver, setIsPopOver] = useState(false);
  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
    setAnchorEl(null);
    setShowMenu(false);
    // setIsPopOver(false);
    dispatch(removeDetails());
  };
  const dispatch = useDispatch();
  const routePage = (event) => {
    !isAuthenticated
      ? router.push("/registerorlogin")
      : setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    localStorage.getItem("accessToken")
      ? getUserProfile({ dispatch })
      : () => {};
  }, []);

  const userProfile = () => {
    router.push("/user-profile");
    setAnchorEl(null);
    setShowMenu(false);
  };

  const linksList = [
    {
      name: "User Profile",
      icon: <PersonIcon />,
      onClick: userProfile,
    },

    {
      name: "Logout",
      icon: <LogoutIcon />,
      onClick: handleLogout,
    },
  ];

  const selector = useSelector((state) => state.userInfo);
  const name = selector.name;
  return (
    <div className={`container-fluid ${show ? "" : styles.header} `}>
      <div
        style={{ maxWidth: 1300 }}
        className={`container ${show ? styles.mainHeader : ""} p-2 `}
      >
        <div className="d-flex align-items-center justify-content-between p-2">
          <Link href={"/"}>
            <Image src={show ? logo : logoBlack} width={150} alt="logo" />
          </Link>

          <Stack
            direction={"row"}
            spacing={1}
            alignItems={"center"}
            className={styles.desktopView}
          >
            {/* <Stack direction="row" alignItems={"center"} spacing={1}>
              <LocalPhoneOutlinedIcon
                style={{
                  fill: show ? "#fff" : "#000",
                  border: show ? "1px solid #fff" : "1px solid #000",
                  borderRadius: "50%",
                  width: "25px",
                  height: "25px",
                  padding: "5px",
                }}
              />
              <Typography color={show ? "#ffffff" : "#000000"} fontSize={14}>
                +49 6542682861
              </Typography>
            </Stack> */}

            <Divider
              flexItem
              orientation="vertical"
              variant="middle"
              sx={{
                backgroundColor: "#fff",
                opacity: 1,
                height: 20,
                alignSelf: "center",
              }}
            />
            <Link href={"/buy-cars"} className="link">
              <Typography color={show ? "#ffffff" : "#000000"} fontSize={14}>
                Buy Car
              </Typography>
            </Link>
            {/* <Divider
              flexItem
              orientation="vertical"
              variant="middle"
              sx={{
                backgroundColor: "#fff",
                opacity: 1,
                height: 20,
                alignSelf: "center",
              }}
            /> */}
            <Link href={ "/sell-cars"} className="link">
              <Typography color={show ? "#ffffff" : "#000000"} fontSize={14}>
                Sell Car
              </Typography>
            </Link>
            {/* <Divider
              flexItem
              orientation="vertical"
              variant="middle"
              sx={{
                backgroundColor: "#fff",
                opacity: 1,
                height: 20,
                alignSelf: "center",
              }}
            /> */}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: show ? "1px solid #fff" : "1px solid #000",
                cursor: "pointer",
                padding: 0.2,
                width: 90,
                justifyContent: "center",
                borderRadius: 20,
              }}
              onClick={() => setShowMenu(true)}
            >
              <MenuOpen
                sx={{
                  fill: show ? "#fff" : "#000",
                  fontSize: 25,
                }}
              />
              <Avatar
                sx={{
                  width: 25,
                  height: 25,
                  backgroundColor: isAuthenticated && "#000",
                  border: !show ? "1px solid #000" : "1px solid #fff",
                  ml: 0.5,
                }}
              >
                {isAuthenticated ? (
                  <Typography fontSize={12}>{name.slice(0, 1)}</Typography>
                ) : (
                  <Person sx={{ fontSize: 20 }} />
                )}
              </Avatar>
            </Box>
          </Stack>

          <FaUser className={styles.mobileView} />
        </div>

        <div>
          <Drawer
            open={showMenu}
            onClose={() => setShowMenu(false)}
            anchor="right"
            sx={{
              zIndex: 10000,
              "& .MuiDrawer-paper": {
                width: "300px",
                boxSizing: "border-box",
                height: "100%",
              },
            }}
          >
            <Box textAlign={"end"}>
              <IconButton
                onClick={() => setShowMenu(false)}
                // sx={{ width: 25, height: 25 }}
              >
                <Close />
              </IconButton>
            </Box>
            {isAuthenticated && (
              <Stack direction={"row"} p={1} spacing={2}>
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    backgroundColor: "#000",
                    color: "#fff",
                  }}
                >
                  {name.slice(0, 1)}
                </Avatar>
                <Box>
                  <Typography
                    fontSize={20}
                    textTransform={"capitalize"}
                    fontWeight={600}
                  >
                    {" "}
                    {name}
                  </Typography>
                  <Button
                    sx={{
                      fontSize: 10,
                      // border: "1px solid #000",
                      p: 0.3,
                      color: "#000",
                      borderRadius: 20,
                      // width: 100,
                      textAlign: "center",
                      ":hover": {
                        // color: "#fff",
                        // backgroundColor: "#000",
                        textDecoration: "underline",
                      },
                      transition: "0.5s ease all",
                    }}
                    onClick={userProfile}
                  >
                    View Profile
                  </Button>
                </Box>
              </Stack>
            )}

            <Divider sx={{ backgroundColor: "#000" }} />
            <Box>
              <List
                sx={{
                  "& .MuiButtonBase-root-MuiMenuItem-root": {
                    fontSize: 12,
                  },
                  position: "relative",
                }}
              >
                {HeaderLinks.map((item, index) => (
                  <Link
                    href={item.url}
                    key={index}
                    className=" link"
                    onClick={() => setShowMenu(false)}
                  >
                    <ListItemButton
                      disablePadding
                      sx={{
                        ":hover": {
                          color: "#fff",
                          backgroundColor: "#000",
                        },
                        transition: "0.5s ease all",
                      }}
                    >
                      <ListItemAvatar>{item.icon}</ListItemAvatar>
                      <ListItemText
                        primary={item.title}
                        style={{ fontSize: 30 }}
                      />
                    </ListItemButton>
                    {/* <Divider sx={{ backgroundColor: "#000" }} /> */}
                  </Link>
                ))}
                {isAuthenticated ? (
                  <ListItemButton
                    disablePadding
                    sx={{
                      top: "40vh",
                      ":hover": {
                        color: "#fff",
                        backgroundColor: "#000",
                      },
                      transition: "0.5s ease all",
                    }}
                    onClick={handleLogout}
                  >
                    <ListItemAvatar>
                      <Logout />
                    </ListItemAvatar>
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                ) : (
                  <Link
                    href={"/login"}
                    className="link"
                    onClick={() => setShowMenu(false)}
                  >
                    <ListItemButton
                      sx={{
                        ":hover": {
                          color: "#fff",
                          backgroundColor: "#000",
                        },
                        transition: "0.5s ease all",
                      }}
                      disablePadding
                    >
                      <ListItemAvatar>
                        <Person />
                      </ListItemAvatar>
                      <ListItemText primary="Login" />
                    </ListItemButton>
                  </Link>
                )}
              </List>
            </Box>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
