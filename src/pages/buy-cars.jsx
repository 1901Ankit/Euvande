import {
  getAllMakePublic,
  getCars,
  getModelByYear,
  getPeriod,
} from "@/api/apiCalling/listingApi";
import BoxCar from "@/components/cars-box";
import Filterbar from "@/components/filter-bar";
import FilterSection from "@/components/filterSection";
import { FILTERS } from "@/utils/enum";
import { Delete } from "@mui/icons-material";
import {
  Box,
  Card,
  Container,
  Divider,
  Grid,
  Stack,
  TablePagination,
  Tooltip,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "react-loading";
import { useDispatch, useSelector } from "react-redux";

const BuyCars = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState(FILTERS.NEWESTAD);
  const [loading, setLoading] = useState(true);
  const [carData, setCarData] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const user = useSelector((state) => state.userInfo);

  const pageChangeHandler = (e, newValue) => {
    setPage(newValue);
    let body = {
      userId: user.id,
    };
    getCars({
      loading: setLoading,
      setCarData,
      page: newValue + 1,
      pageSize,
      body,
    });
  };

  const rowsChangeHandler = (event) => {
    setPageSize(event.target.value);
    let body = {
      userId: user.id,
    };
    getCars({
      loading: setLoading,
      setCarData,
      page: page + 1,
      pageSize: event.target.value,
      body,
    });
  };

  const [make, setMake] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState("");

  const [selectedMake, setSelectedMake] = useState("");
  const [period, setPeriod] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [model, setModel] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      getAllMakePublic({ setBrand: setMake });
    };
    fetchData();
  }, []);
  const handlePeriodSelector = (e) => {
    setSelectedPeriod(e.target.value);
    let body = {
      makeId: parseInt(selectedMake),
      periodId: parseInt(e.target.value),
    };
    getCars({ body, loading: setLoading, setCarData, page, pageSize });
  };

  const handleMakeSelector = (e) => {
    setSelectedMake(e.target.value);
    let body = {
      makeId: parseInt(e.target.value),
    };
    getCars({ body, setCarData, page, pageSize, loading: setLoading });
    getPeriod({ data: body, setPeriod });
    getModelByYear({ setModel, data: body });
  };
  const handleModelSelector = (e) => {
    setSelectedModel(e.target.value);

    let body = {
      makeId: parseInt(selectedMake),
      modelId: parseInt(e.target.value),
      periodId: parseInt(selectedPeriod),
    };
    let data = {
      makeId: parseInt(selectedMake),
      periodId: parseInt(selectedPeriod),
    };
    getCars({ body, setCarData, page, pageSize, loading: setLoading });
    getModelByYear({ setModel, data });
  };

  const removeFilter = () => {
    setSelectedMake("");
    setSelectedPeriod("");
    setSelectedModel("");
    getCars({ loading: setLoading, setCarData, pageSize, page });
  };
  const [sortingValue, setSortingValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const filteredData = router.query.state;
      if (filteredData) {
        const data = JSON.parse(filteredData);
        const priceData =
          data && data.price && data.price.replace(/[^\d]/g, "");
        const body = {
          makeId: data.make,
          ...(data.modelId && { modelId: data.model }),
          ...(data.periodId && { periodId: data.period }),
          ...(priceData && { price: parseInt(priceData) }),
          userId: user.id,
        };
        await getCars({
          loading: setLoading,
          setCarData,
          body,
          page,
          pageSize,
        });
        // Set selected make and other filters
        if (data.make) {
          setSelectedMake(data.make);
          getPeriod({ data: { makeId: data.make }, setPeriod });
          getModelByYear({ data: { makeId: data.make }, setPeriod });
        }
        if (data.period) {
          setSelectedPeriod(data.period);
          getModelByYear({
            data: { makeId: data.make, periodId: data.period },
            setModel,
          });
        }
        if (data.model) {
          setSelectedModel(data.model);
        }
      } else {
        const body = {
          ...(user.isAuthenticated && { userId: user.id }),
        };
        await getCars({
          loading: setLoading,
          setCarData,
          body,
          page,
          pageSize,
        });
      }
    };
    fetchData();
  }, [user]);
  // sorting
  const sortingHandler = (e) => {
    if (e) {
      setSortingValue(sortingValue);
      if (e.value === FILTERS.NEWESTAD) {
        if (user.isAuthenticated) {
          getCars({
            body: { sortBy: { createdAT: "ASC" }, userId: user.id },
            loading: setLoading,
            setCarData,
            page,
            pageSize,
          });
        } else {
          getCars({
            body: { sortBy: { createdAT: "ASC" } },
            loading: setLoading,
            setCarData,
            page,
            pageSize,
          });
        }
      } else {
        if (user.isAuthenticated) {
          getCars({
            body: {
              sortBy: {
                price: e.value === FILTERS.HIGHESTPRICE ? "DESC" : "ASC",
              },
              userId: user.id,
            },
            loading: setLoading,
            setCarData,
            page,
            pageSize,
          });
        } else {
          getCars({
            body: {
              sortBy: {
                price: e.value === FILTERS.HIGHESTPRICE ? "DESC" : "ASC",
              },
            },
            loading: setLoading,
            setCarData,
            page,
            pageSize,
          });
        }
      }
    }
  };
  return (
    <Container maxWidth="1400px">
      <Head>
        <title>Buy Cars</title>
      </Head>
      <Box>
        <Grid container spacing={6}>
          <Grid item lg={3} sx={{ mt: 5 }}>
            <Card>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 3,
                }}
              >
                <Typography variant="h6" fontWeight={550}>
                  Filter
                </Typography>
                <Tooltip title="Clear Filters" placement="top" arrow>
                  <Delete onClick={removeFilter} sx={{ cursor: "pointer" }} />
                </Tooltip>
              </Box>
              <Divider sx={{ backgroundColor: "#000" }} />
              <FilterSection
                make={make}
                selectedMake={selectedMake}
                makeHandleChange={handleMakeSelector}
                period={period}
                periodHandler={handlePeriodSelector}
                selectedPeriod={selectedPeriod}
                model={model}
                selectedModel={selectedModel}
                modelHandler={handleModelSelector}
              />
            </Card>
          </Grid>
          <Grid item lg={9} mt={5} p={10}>
            <Typography fontSize={30} letterSpacing={1} fontWeight={600}>
              Verified Cars
            </Typography>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              spacing={1}
            >
              <Stack direction={"row"} alignItems={"center"}>
                <Typography fontSize={13} fontWeight={600}>
                  {carData.totalDocs}
                </Typography>
                <Typography fontSize={13} ml={0.5}>
                  Results
                </Typography>

                <Divider
                  flexItem
                  orientation="vertical"
                  variant="middle"
                  sx={{
                    backgroundColor: "#000",
                    opacity: 1,
                    height: 15,
                    alignSelf: "center",
                    ml: 1,
                  }}
                />
                <Filterbar onChange={sortingHandler} />
              </Stack>
              {!loading && (
                <Box>
                  <TablePagination
                    rowsPerPage={pageSize}
                    page={page}
                    count={carData && carData.totalDocs}
                    onPageChange={pageChangeHandler}
                    onRowsPerPageChange={rowsChangeHandler}
                  />
                </Box>
              )}
            </Stack>
            <Box marginTop={3}>
              {loading ? (
                <Loading
                  type={"bars"}
                  color="#000"
                  width={30}
                  height={30}
                  className="m-auto"
                />
              ) : carData.docs.length ? (
                <BoxCar
                  data={carData.docs}
                  setCarData={setCarData}
                  setLoading={setLoading}
                  page={page}
                  pageSize={pageSize}
                />
              ) : (
                <Typography fontSize={20} textAlign={"center"}>
                  No Car Found
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default BuyCars;
