import { orderTabButton } from "@/utils/styles";
import {
  Box,
  Button,
  Tab,
  TablePagination,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TabPanel from "../tabPanel";
import CarsForSell from "./carsForSell";
import { useRouter } from "next/router";
import { CarStatus } from "@/utils/enum";
import { getSellerPendingCars } from "@/api/apiCalling/listingApi";

const Order = () => {
  const tabs = ["Cars to Buy", "Cars for Sell"];
  const [value, setValue] = useState(0);
  const router = useRouter();
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  const carStatus = [
    {
      label: CarStatus["In-Progress"],
    },
    {
      label: CarStatus.Pending,
    },
    {
      label: CarStatus.Available,
    },
  ];
  const [carStatusValue, setCarStatusvalue] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleRoute = (carId) => {
    router.push(`/cars/${carId}/car-details`);
  };
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [status, setStatus] = useState(CarStatus["In-Progress"]);

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
    setLoading(true);
    getSellerPendingCars({
      status,
      setData,
      setLoading,
      page: newPage + 1,
      pageSize,
    });
  };
  const handleRowsChange = (e) => {
    setPageSize(e.target.value);
    setLoading(true);
    getSellerPendingCars({
      status,
      setData,
      setLoading,
      page,
      pageSize: e.target.value,
    });
  };

  const changeCarStatusHandler = (e, newValue) => {
    setStatus(e.target.textContent);
    setLoading(true);
    getSellerPendingCars({
      status: e.target.textContent,
      setData,
      setLoading,
      page,
      pageSize,
    });
    setCarStatusvalue(newValue);
  };
  useEffect(() => {
    getSellerPendingCars({ status, page, pageSize, setData, setLoading });
  }, []);
  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{
          "& .MuiPaper-root-MuiCard-root": {
            height: 500,
          },
        }}
      >
        {tabs.map((val, i) => (
          <Tab label={val} key={i} sx={orderTabButton} />
        ))}
      </Tabs>
      <TabPanel index={0} value={value}>
        <Box sx={{ display: "grid", placeItems: "center", height: "60vh" }}>
          <Box textAlign={"center"}>
            <Typography sx={{ fontSize: 30, fontWeight: 550 }}>
              No Cars Found
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 3 }}
              onClick={() => router.push("/buy-cars")}
            >
              Browse Cars
            </Button>
          </Box>
        </Box>
      </TabPanel>
      <TabPanel index={1} value={value}>
        <Tabs
          value={carStatusValue}
          onChange={changeCarStatusHandler}
          sx={{
            marginTop: 2,
            borderRadius: 8,
            p: 1,
            boxShadow: "0px 0px 2px 2px #eee",
          }}
        >
          {carStatus.map((val, i) => (
            <Tab
              label={val.label}
              key={i}
              sx={{
                "&.Mui-selected": {
                  color: "#000",
                  fontSize: 12,
                  boxShadow:
                    "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                },
                fontSize: 12,
                ":hover": {
                  boxShadow:
                    "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                },
                transition: "0.5s ease all",
                my: 0.4,
                borderRadius: 8,
                mx: 2,
                width: 200,
              }}
            />
          ))}
        </Tabs>
        {carStatus.map((val, i) => (
          <TabPanel value={carStatusValue} index={i}>
            <Box
              sx={{
                textAlign: "end",
                mt: 2,
              }}
            >
              <TablePagination
                page={page}
                rowsPerPage={pageSize}
                count={data && data.totalDocs}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleRowsChange}
              />
            </Box>
            <CarsForSell
              status={status}
              data={data}
              loading={loading}
              setLoading={setLoading}
              setData={setData}
              page={page}
              pageSize={pageSize}
            />
          </TabPanel>
        ))}
      </TabPanel>
    </div>
  );
};

export default Order;
