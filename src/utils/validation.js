export const loginValidation = ({ state, setError, error, viaOtp }) => {
  let { identity, countryCode, password } = state;

  if (
    viaOtp
      ? identity === "" || countryCode === ""
      : identity === "" || password === ""
  ) {
    setError(
      viaOtp
        ? {
            ...error,
            identity: identity === "" && "Please Enter Valid  Email Id",
            countryCode: countryCode === "" && "Please Select Your Country",
          }
        : {
            ...error,
            identity: identity === "" && "Please Enter Valid Email Id ",
            password: password === "" && "Please Enter Password",
          }
    );
    return false;
  } else {
    return true;
  }
};

export const registerValidation = ({ state, error, setError }) => {
  let { email, password, name } = state;

  if (name === "" || password === "" || email === "") {
    setError({
      ...error,
      name: name === "" && "Name is Required",

      password: password === "" && "Password is Required",
      email: email === "" && "Email Address is Required",
    });
    return false;
  } else {
    return true;
  }
};

export const contactValidation = ({ state, error, setError, setLoading }) => {
  let { name, phoneNumber, country, zipCode, email } = state;

  if (name === "" || phoneNumber === "" || country === "" || zipCode === "") {
    setError({
      ...error,
      name: name === "" && "Please Enter Name ",
      phoneNumber: phoneNumber === "" && "Please Enter Phone Number",
      country: country === "" && "Please Select Country",
      zipCode: zipCode === "" && "Please Enter Zip Code",
      email: email === "" && "Please Enter Valid Email",
    });
    setLoading(false);
    return false;
  } else {
    return true;
  }
};

export const updateDetailsValidation = ({ state, setError, error }) => {
  let { name, email, phoneNo, countryName, countryCode } = state;
  if (name === "" || email === "" || phoneNo === "" || countryName === "") {
    setError({
      ...error,
      name: name === "" && "Pelase Enter Full Name",
      email: email === "" && "Please Enter Email Address",
      phoneNo: phoneNo === "" && "Please Enter Mobile No.",
      countryName: countryName === "" && "Please Select Country",
    });
    return false;
  } else {
    return true;
  }
};

export const changePasswordValidation = ({ state, setError, error }) => {
  let { oldPassword, newPassword } = state;

  if (oldPassword === "" || newPassword === "") {
    setError({
      ...error,
      oldPassword: oldPassword === "" && "Please Enter Your Current Password",
      newPassword: newPassword === "" && "Please Enter Your New Password",
    });

    return false;
  } else {
    return true;
  }
};

export const addAddressValidation = ({ state, setError, error }) => {
  const { street, houseNumber, postalCode, city, countryName } = state;

  if (
    street === "" ||
    houseNumber === "" ||
    postalCode === "" ||
    city === "" ||
    countryName === ""
  ) {
    setError({
      ...error,
      street: street === "" && "Please Enter Street Name",
      houseNumber: houseNumber === "" && "Please Enter House Number",
      postalCode: postalCode === "" && "Please Enter Postal Code",
      city: city === "" && "Please Enter City",
      countryName: countryName === "" && "Please Select Country",
    });
    return false;
  } else {
    return true;
  }
};
