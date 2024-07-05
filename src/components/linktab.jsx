import Ownership from "@/pages/sell-cars/ownership";
import { tabButton } from "@/utils/styles";
import { Done } from "@mui/icons-material";
import { Avatar, Tab, Tabs, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const LinkTab = (props) => {
  const router = useRouter();
  const [value, setvalue] = useState(0);
  const [disablePeriod, setDisablePeriod] = useState(true);
  const [disableModel, setDisableModel] = useState(true);
  const [disableVariant, setDisableVariant] = useState(true);
  const [disableOwnership, setDisableOwnerShip] = useState(true);
  const [disableOdometer, setDisableOdometer] = useState(true);
  const [disableLocation, setDisableLocation] = useState(true);
  const [disableSpecifications, setDisableSpecifiations] = useState(true);
  const [disablecontact, setDisableContact] = useState(true);
  const [disablePhotos, setDisablePhotos] = useState(true);
  const tabData = [
    { label: "Make", route: "/sell-cars/make" },
    { label: "Period", route: "/sell-cars/period", disable: disablePeriod },
    { label: "Model", route: "/sell-cars/model", disable: disableModel },
    { label: "Variant", route: "/sell-cars/variant", disable: disableVariant },
    {
      label: "Ownership",
      route: "/sell-cars/ownership",
      disable: disableOwnership,
    },
    {
      label: "Odometer",
      route: "/sell-cars/odometer",
      disable: disableOdometer,
    },
    {
      label: "Location",
      route: "/sell-cars/location",
      disable: disableLocation,
    },
    {
      label: "Specifications",
      route: "/sell-cars/specifications",
      disable: disableSpecifications,
    },
    {
      label: "Contact Information",
      route: "/sell-cars/contact-information",
      disable: disablecontact,
    },
    {
      label: "Photos",
      route: "/sell-cars/upload-picture",
      disable: disablePhotos,
    },
  ];

  useEffect(() => {
    const path = router.pathname;
    const index = tabData.findIndex((tab) => tab.route === path);
    if (index !== -1) {
      setvalue(index);
    }
  }, [router.pathname, tabData]);

  const handleRoute = (route) => {
    router.push(route);
  };

  const handleChange = (event, newValue) => {
    setvalue(newValue);
    handleRoute(tabData[newValue].route);
  };

  const carInfo = useSelector((state) => state.CarInfo);
  useEffect(() => {
    const make = carInfo && carInfo.make;
    const period = carInfo && carInfo.period;
    const model = carInfo && carInfo.model;
    const variant = carInfo && carInfo.variant;
    const ownerShip = carInfo && carInfo.ownership;
    const odometer = carInfo && carInfo.odometer;
    const location = carInfo && carInfo.location && carInfo.location.city;
    const specifications = carInfo && carInfo.specification;
    const contact = carInfo && carInfo.contactInfo;

    if (make) {
      setDisablePeriod(false);
    }
    if (period) {
      setDisableModel(false);
    }
    if (model) {
      setDisableVariant(false);
    }
    if (variant) {
      setDisableOwnerShip(false);
    }
    if (ownerShip) {
      setDisableOdometer(false);
    }
    if (odometer) {
      setDisableLocation(false);
    }
    if (location) {
      setDisableSpecifiations(false);
    }
    if (specifications && location && ownerShip && odometer) {
      setDisableContact(false);
    }
    if (contact) {
      setDisableContact(false);
    }
  }, [carInfo]);

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        sx={{
          border: "1px solid #ccc",
          borderRadius: "40px",
          padding: "8px",
          marginBottom: "20px",
        }}
      >
        {tabData.map((tab, index) => (
          <Tab
            icon={
              <Avatar
                sx={{
                  width: 20,
                  height: 20,
                  backgroundColor: tab.disable
                    ? ""
                    : value === index
                    ? "green"
                    : "#000",
                }}
              >
                {tab.disable ? (
                  <Typography sx={{ fontSize: 12 }}>{index + 1}</Typography>
                ) : (
                  // <Done sx={{ fontSize: 12 }} />
                  <Typography sx={{ fontSize: 12, color: "#fff" }}>
                    {index + 1}
                  </Typography>
                )}
              </Avatar>
            }
            iconPosition="start"
            key={index}
            label={tab.label}
            sx={{
              color: "#000",
              fontSize: "12px",
              fontWeight: "500",
              minHeight: "0",
              my: 0.3,
              mx: 0.5,
              "&.Mui-selected": {
                color: "#000 ",
                boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
                textDecoration: "none",
                borderRadius: "20px",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#ffffff",
              },
              ":hover": {
                boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
                borderRadius: 20,
                scale: 1.2,
                zIndex: 9999,
              },
            }}
            disabled={tab.disable}
          />
        ))}
      </Tabs>
    </div>
  );
};

export default LinkTab;
