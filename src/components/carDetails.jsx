import { Box, Card, Divider, Skeleton, Typography } from "@mui/material";
import React from "react";

const AddCarDetails = ({ data, loading }) => {
  const details = [
    {
      label: data && data.make && "Make",
      value: data && data.make && data.make.makeName,
    },
    {
      label: data && data.period && "Period",
      value: data && data.period && data.period.year,
    },
    {
      label: data && data.model && "Model",
      value: data && data.model && data.model.modelName,
    },
    {
      label: data && data.variant && "Variant",
      value: data && data.variant && data.variant.variantName,
    },
    {
      label: data && data.variant && "Fuel Type",
      value: data && data.variant && data.variant.fuelType,
    },
    {
      label: data && data.ownership && "Ownership",
      value: data && data.ownership,
    },
    {
      label: data && data.odometer && "Odometer",
      value: data && data.odometer,
    },
    {
      label: data && data.location && "Location",
      value: data && data.location && data.location.city,
    },
    {
      label:
        data &&
        data.specification &&
        data.specification.transmission &&
        "Transmission",
      value: data && data.specification && data.specification.transmission,
    },
    {
      label:
        data &&
        data.specification &&
        data.specification.vehicleType &&
        "Body Type",
      value: data && data.specification && data.specification.vehicleType,
    },
    {
      label: data && data.specification && data.specification.doors && "Doors",
      value: data && data.specification && data.specification.doors,
    },
    {
      label: data && data.specification && data.specification.seats && "Seats",
      value: data && data.specification && data.specification.seats,
    },
    {
      label:
        data &&
        data.specification &&
        data.specification.interiorMaterial &&
        "Interior",
      value: data && data.specification && data.specification.interiorMaterial,
    },
    {
      label:
        data &&
        data.specification &&
        data.specification.vatDeduction &&
        "Vat Deduction",
      value: data && data.specification && data.specification.vatDeduction,
    },
    {
      label: data && data.specification && data.specification.power && "Power",
      value: `${data && data.specification && data.specification.power} kw`,
    },
    {
      label: data && data.specification && data.specification.color && "Color",
      value: data && data.specification && data.specification.color,
    },
    {
      label:
        data &&
        data.specification &&
        data.specification.equipments &&
        "Equipments",
      value: `${
        data &&
        data.specification &&
        data.specification.equipments &&
        data.specification.equipments.slice(0, 2)
      } ...`,
    },
    {
      label: data && data.contactInfo && data.contactInfo.name && "Name",
      value: data && data.contactInfo && data.contactInfo.name,
    },
    {
      label:
        data && data.contactInfo && data.contactInfo.phoneNo && "Phone Number",
      value: data && data.contactInfo && data.contactInfo.phoneNo,
    },
    {
      label: data && data.contactInfo && data.contactInfo.country && "country",
      value: data && data.contactInfo && data.contactInfo.country,
    },
  ];
  return (
    <Box>
      {loading ? (
        <Skeleton variant="rectangular" />
      ) : (
        <Card sx={{ p: 2 }}>
          <Divider sx={{ fontSize: 20, fontWeight: 600 }}>Car Details</Divider>
          {details.map((val, i) => (
            <React.Fragment key={i}>
              {val.label && (
                <React.Fragment key={i}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      p: 2,
                    }}
                  >
                    <Typography fontSize={13}>{val.label}</Typography>
                    <Typography fontSize={12}>{val.value}</Typography>
                  </Box>
                  <Divider sx={{ backgroundColor: "#000" }} />
                </React.Fragment>
              )}
            </React.Fragment>
          ))}
        </Card>
      )}
    </Box>
  );
};

export default AddCarDetails;
