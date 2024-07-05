import data from "@/assests/data";

import {
  getAllMakePublic,
  getModelByYear,
  getPeriod,
} from "@/api/apiCalling/listingApi";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ReactSelect from "react-select";
import { toast } from "react-toastify";
const BannerForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const vatDeductionHandler = (e) => {
    let { id, checked } = e.target;
    setState({ ...state, [id]: checked });
  };

  const [brand, setBrand] = useState([]);
  const [period, setPeriod] = useState([]);
  const [model, setModel] = useState([]);
  const [state, setState] = useState({
    make: "",
    period: "",
    model: "",
    price: "",
    mileage: "",
    vatDeduction: false,
  });

  const makeHandler = (e) => {
    setState({ ...state, make: e.value });
    let data = {
      makeId: e.value,
    };
    getPeriod({ setPeriod, data });
    let body = state.period
      ? {
          makeId: e.value,
          period: state.period,
        }
      : {
          makeId: e.value,
        };
    getModelByYear({ setModel, data: body });
  };

  const periodHandler = (e) => {
    setState({ ...state, period: e.value });

    let body = {
      makeId: state.make,
      periodYear: e.label,
    };
    getModelByYear({ setModel, data: body });
  };
  const modelHandler = (e) => {
    setState({ ...state, model: e.value });
  };
  const priceHandler = (e) => {
    setState({ ...state, price: e.value });
  };
  const mileageHandler = (e) => {
    setState({ ...state, mileage: e.value });
  };

  const searchHandler = (e) => {
    e.preventDefault();
    if (
      state.make === "" ||
      state.mileage === "" ||
      state.model === "" ||
      state.period === "" ||
      state.price === ""
    ) {
      toast.error("Please Enter Details for Search");
      return false;
    } else {
      let data = {
        make: state.make,
        model: state.model,
        mileage: state.mileage,
        period: state.period,
        vatDeduction: state.vatDeduction,
        price: state.price,
      };
      const body = encodeURIComponent(JSON.stringify(data));
      // dispatch(setSearchData({ ...searchData }));
      router.push(`/buy-cars?state=${body}`);
    }
  };

  useEffect(() => {
    getAllMakePublic({ setBrand });
  }, []);

  const colorStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      backgroundColor: "transparent",
      borderColor: "#fff",
      boxShadow: "none",
      fontSize: "12px",
      width: "100%",
      fontWeight: "400",
      color: "#fff",
      borderWidth: 0.2,
    }),
    option: (styles, { isSelected }) => {
      return {
        ...styles,
        textTransform: "upperCase",
        backgroundColor: isSelected ? "#000" : "#ffffff",
        zIndex: 999,
        color: isSelected ? "#fff" : "#000",
      };
    },
    placeholder: (baseStyles, state) => {
      return {
        ...baseStyles,
        color: "#fff",
      };
    },
    singleValue: (provided, state) => ({
      ...provided,
      color: "#fff",
      textTransform: "capitalize",
    }),
    input: (provided, state) => ({
      ...provided,
      color: "#fff",
    }),
  };
  return (
    <Grid container>
      <Grid item xs={12} sm={9} marginLeft={{ lg: "2rem" }}>
        <Paper elevation={3} sx={{ backgroundColor: "#ffffff17", p: 4 }}>
          <Grid container>
            <Grid lg={7}>
              <Typography
                variant="h1"
                fontSize={{ xs: 18, lg: 26 }}
                lineHeight={{ xs: 1.7, lg: 1.2 }}
                color={"#fff"}
                fontWeight={600}
                textAlign={"justify"}
                textTransform={"capitalize"}
                // className="my-3"
              >
                Customize, click, & get ready to drive.
              </Typography>
            </Grid>
            <Grid lg={1}></Grid>
            <Grid lg={4}>
              <Typography
                color={"#fff"}
                sx={{ fontSize: { xs: 18, lg: 13 }, fontWeight: "normal" }}
              >
                We deliver <br /> your dream car, <br />
                stress-free.
              </Typography>
            </Grid>
          </Grid>
          <form className="mt-4" onSubmit={searchHandler}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <ReactSelect
                  options={brand.map((val, i) => {
                    return {
                      label: val.makeName,
                      value: val.id,
                    };
                  })}
                  placeholder="Make"
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  styles={colorStyles}
                  onChange={makeHandler}
                />
              </Grid>
              <Grid item xs={6}>
                <ReactSelect
                  options={data.mileage.map((val) => {
                    return {
                      label: val.number,
                      value: val.number,
                    };
                  })}
                  placeholder="Mileage"
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  onChange={mileageHandler}
                  styles={colorStyles}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} className="my-2">
              <Grid item xs={6}>
                <ReactSelect
                  placeholder="Year"
                  options={period.map((val) => {
                    return {
                      label: val.year,
                      value: val.id,
                    };
                  })}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  onChange={periodHandler}
                  styles={colorStyles}
                />
              </Grid>
              <Grid item xs={6}>
                {" "}
                <ReactSelect
                  placeholder="Price"
                  options={data.price.map((val) => {
                    return {
                      label: val.price,
                      value: val.price,
                    };
                  })}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  styles={colorStyles}
                  onChange={priceHandler}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} className="my-2">
              <Grid item xs={6}>
                <ReactSelect
                  options={model.map((val) => {
                    return {
                      label: val.modelName,
                      value: val.id,
                    };
                  })}
                  placeholder="Choose Model"
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  styles={colorStyles}
                  onChange={modelHandler}
                />
              </Grid>

              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={vatDeductionHandler}
                      id="vatDeduction"
                      sx={{
                        color: "#fff",
                        "& .MuiSvgIcon-root": {
                          color: "#fff",
                        },
                      }}
                    />
                  }
                  label="VAT Deduction"
                  // style={{ color: "#fff" }}
                  sx={{
                    fontSize: 12,
                    color: "#fff",
                  }}
                />
              </Grid>
            </Grid>
            {/* <Grid container spacing={2}>
              <Grid item xs={4}>
                <ReactSelect
                  options={data.brandsSelector.map((val, i) => {
                    return {
                      label: val.name,
                      value: val.name,
                    };
                  })}
                  placeholder="Make"
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  styles={colorStyles}
                />
              </Grid>
              <Grid item xs={4}>
                <ReactSelect
                  options={data.carModel.map((val) => {
                    return {
                      label: val.name,
                      value: val.name,
                    };
                  })}
                  placeholder="Choose Model"
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  styles={colorStyles}
                />
              </Grid>
              <Grid item xs={4}>
                <ReactSelect
                  options={data.mileage.map((val) => {
                    return {
                      label: val.number,
                      value: val.number,
                    };
                  })}
                  placeholder="Mileage"
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  styles={colorStyles}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} className="my-1" alignItems={"center"}>
              <Grid item xs={4}>
                <ReactSelect
                  placeholder="Year"
                  options={data.Year.map((val) => {
                    return {
                      label: val.year,
                      value: val.year,
                    };
                  })}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  styles={colorStyles}
                />
              </Grid>
              <Grid item xs={4}>
                <ReactSelect
                  placeholder="Price"
                  options={data.price.map((val) => {
                    return {
                      label: val.price,
                      value: val.price,
                    };
                  })}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  styles={colorStyles}
                />
              </Grid>
              <Grid item xs={4} textAlign={"center"}>
                <FormControlLabel
                  control={
                    <Checkbox onChange={vatDeductionHandler} id="test" />
                  }
                  label="VAT Deduction"
                />
              </Grid>
            </Grid> */}
            <Grid container alignItems={"center"} spacing={1} className="my-2">
              <Grid item xs={6}>
                {/* <Stack direction={"row"} alignItems={"center"} spacing={1}>
                  <Typography color={"#ffffff"} fontSize={12}>
                    Advanced Search
                  </Typography>
                  <FaAngleRight color="#ffffff" size={15} />
                </Stack> */}
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  sx={{
                    color: "#000",
                    backgroundColor: "#fff",
                    ":hover": {
                      color: "#fff",
                      backgroundColor: "#000",
                    },
                    border: "1px solid #fff",
                    fontSize: 12,
                    fontWeight:550
                  }}
                  type="submit"
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default BannerForm;
