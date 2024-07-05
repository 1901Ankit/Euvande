import { loginTextField } from "@/utils/styles";
import {
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import Button from "../button";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { changePasswordValidation } from "@/utils/validation";
import { changePassword } from "@/api/apiCalling/authenticationApi";
import { toast } from "react-toastify";
import DoneIcon from "@mui/icons-material/Done";
import data from "@/assests/data";
import { isPasswordValid } from "@/utils/regex";
import Loading from "react-loading";

const ChangePassword = () => {
  const [toggleOldPassword, setToggleOldPassword] = useState(false);
  const [toggleNewPassword, setToggleNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [error, setError] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const inputChangeHandler = (e) => {
    let { id, value } = e.target;
    setState({ ...state, [id]: value });
    setError({
      ...error,
      [id]:
        id === "newPassword"
          ? isPasswordValid(value)
            ? ""
            : "Password must be 8 characters long, include at least one alphabet, one number, and one special character from !@#$%^&*."
          : "",
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    let body = {
      oldPassword: state.oldPassword,
      newPassword: state.newPassword,
    };

    if (changePasswordValidation({ state, setError, error })) {
      changePassword({ body, setLoading, setState });
    } else {
      toast.error("Please Fill Required Fields");
      setLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={submitHandler}>
        <Grid container spacing={2} marginBottom={2} marginTop={1}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              sx={loginTextField}
              label="Current Password*"
              type={toggleOldPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton
                      onClick={() => setToggleOldPassword(!toggleOldPassword)}
                    >
                      {toggleOldPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              id="oldPassword"
              error={error.oldPassword}
              helperText={error.oldPassword}
              onChange={inputChangeHandler}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              type={toggleNewPassword ? "text" : "password"}
              sx={loginTextField}
              label="New Password*"
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton
                      onClick={() => setToggleNewPassword(!toggleNewPassword)}
                    >
                      {toggleNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              id="newPassword"
              error={error.newPassword}
              helperText={error.newPassword}
              onChange={inputChangeHandler}
            />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <List disablePadding={true}>
              {data.passwordRequirement.map((val, i) => (
                <ListItem disablePadding={true}>
                  <ListItemAvatar sx={{ minWidth: "30px" }}>
                    <DoneIcon />
                  </ListItemAvatar>
                  <ListItemText key={i} primary={val.title} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
        <div className="text-end">
          <Button
            className="custom_btn_white"
            backgroundColor="#000"
            color="#fff"
            width="150px"
          >
            {loading ? (
              <Loading
                type="bars"
                color="#e1ad01"
                width={20}
                height={20}
                className="m-auto"
              />
            ) : (
              <>
                <span>Submit</span>
                <span>Submit</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
