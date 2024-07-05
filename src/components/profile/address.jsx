import AddressCard from "./addressCard";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { showModal } from "@/redux/reducers/modal";
import AddAddress from "@/assests/modalcalling/address/addAddress";
import { listingController } from "@/api/listing";
import DeleteAddress from "@/assests/modalcalling/address/deleteAddress";

const Address = () => {
  const dispatch = useDispatch();
  const openAddAddressModal = () => {
    dispatch(showModal(<AddAddress getAddress={getUserAddress} />));
  };
  const [data, setData] = useState([]);
  const getUserAddress = () => {
    listingController
      .getuserAddress()
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const openDeleteAddressModal = (val) => {
    dispatch(
      showModal(<DeleteAddress value={val} getUserAddress={getUserAddress} />)
    );
  };

  useEffect(() => {
    getUserAddress();
  }, []);

  return (
    <div>
      {data.length ? (
        <AddressCard
          data={data}
          getAddress={getUserAddress}
          onDelete={openDeleteAddressModal}
        />
      ) : (
        <Typography
          color={"blue"}
          fontSize={12}
          className="pointer"
          onClick={openAddAddressModal}
        >
          + Add Address
        </Typography>
      )}
    </div>
  );
};

export default Address;
