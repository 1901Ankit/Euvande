import { authControllers } from "@/api/authentication";
import Button from "@/components/button";
import { hideModal } from "@/redux/reducers/modal";
import { Divider, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const DeleteAddress = ({ value, getUserAddress }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const deleteAddress = (id) => {
    setLoading(true);
    authControllers
      .removeAddress(id)
      .then((res) => {
        toast.success(res.data.message);
        setLoading(false);
        dispatch(hideModal());
        getUserAddress();
      })
      .catch((err) => {
        let errMessage =
          err.message || err.response.data.message || "Network Error";
        toast.error(errMessage);
        setLoading(false);
      });
  };
  return (
    <div>
      <Typography variant="h6">Delete Address ?</Typography>
      <Divider style={{ backgroundColor: "#000" }} />
      <p className="my-2">Are you sure want to delete this address?</p>
      <Stack
        direction={"row"}
        spacing={2}
        justifyContent={"space-between"}
        className="mt-3"
      >
        <Button
          className="custom_btn"
          width={150}
          disabled={loading}
          onClick={() => deleteAddress(value.id)}
        >
          <span>Delete</span>
          <span>Delete</span>
        </Button>
        <Button
          className="custom_btn_white"
          backgroundColor="#000"
          color="#ffffff"
          width={150}
          onClick={() => dispatch(hideModal())}
        >
          <span>Cancel</span>
          <span>Cancel</span>
        </Button>
      </Stack>
    </div>
  );
};

export default DeleteAddress;
