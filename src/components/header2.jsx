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
  Chip,
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
  Popover,
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
const Header = () => {
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
    dispatch(removeDetails());
  };
  const dispatch = useDispatch();
  const routePage = (event) => {
    !isAuthenticated ? router.push("/login") : setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    localStorage.getItem("accessToken")
      ? getUserProfile({ dispatch })
      : () => {};
  }, []);

  const userProfile = () => {
    router.push("/user-profile");
    setAnchorEl(null);
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
  const email = selector.email;
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
            spacing={2}
            alignItems={"center"}
            className={styles.desktopView}
          >
            {HeaderLinks.map((val, i) => (
              <Link href={val.url} className="link" key={i}>
                <Typography
                  fontSize={14}
                  color={show ? "#fff" : "#000"}
                  letterSpacing={1}
                >
                  {val.title}
                </Typography>
              </Link>
            ))}
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
            <Chip
              avatar={
                <Person
                  sx={{
                    fill: show ? "#fff" : "#000",
                    fontSize: 12,
                    letterSpacing: 1,
                  }}
                />
              }
              label={`Hello, ${isAuthenticated ? name : "Sign In"} `}
              sx={{
                color: show ? "#fff" : "#000",
                fontSize: 14,
                cursor: "pointer",
                backgroundColor: "transparent",
              }}
              onClick={routePage}
            />
          </Stack>

          <FaUser className={styles.mobileView} />
        </div>

        {/* <div>
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
              <IconButton onClick={() => setShowMenu(false)}>
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
                      p: 0.3,
                      color: "#000",
                      borderRadius: 20,
                      textAlign: "center",
                      ":hover": {
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
        </div> */}
        <Popover
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          sx={{
            "& .MuiPopover-paper": {
              width: 150,
              p: 1,
            },
          }}
        >
          <Stack>
            <Typography fontSize={12}>Hello, {name}</Typography>
            <Typography fontSize={10}>{email}</Typography>
          </Stack>
          <Divider sx={{ backgroundColor: "#000" }} />
          <List disablePadding>
            <ListItemButton
              onClick={userProfile}
              sx={{
                "& .MuiTypography-root": {
                  fontSize: 14,
                  //   fontWeight: 550,
                },
              }}
            >
              <ListItemText primary="Profile" />
            </ListItemButton>
            <Divider sx={{ backgroundColor: "#000" }} />
            <ListItemButton
              onClick={handleLogout}
              sx={{
                "& .MuiTypography-root": {
                  fontSize: 14,
                },
              }}
            >
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </Popover>
      </div>
    </div>
  );
};

export default Header;
