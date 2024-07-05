export const searchTextField = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",

  "& .MuiOutlinedInput-input": {
    padding: "12px",
    borderRadius: "8px",
    "&:focus": {
      outline: "none",
      boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
    },
  },
  "& label.Mui-focused": {
    background:
      "linear-gradient( rgba(255, 255, 255, 1) 50%,rgba(36, 35, 35, 1) 50% )",
    color: "transparent",
    backgroundClip: "text",
    fontWeight: "600",
    top: "0",
  },
  "& label": {
    top: "-4px",
  },

  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#ffffff",
      borderRadius: "8px",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ffffff",
    },
  },
};

export const loginTextField = {
  "& label.Mui-focused": {
    color: "#000000",
  },
  "& label": {
    fontSize: "15px",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "1px solid #000000",
    },
    "&:hover fieldset": {
      borderColor: "#000000",
    },
    "&.Mui-focused fieldset": {
      border: "1px solid #000000",
    },
  },

  "& .Mui-error": {
    "& fieldset": {
      border: "1px solid #d32f2f",
    },
    "&:hover fieldset": {
      border: "1px solid #d32f2f",
    },
    "&.Mui-focused fieldset": {
      border: "1px solid #d32f2f",
    },
    "& label.Mui-focused": {
      color: "#d32f2f",
    },
  },
  "& .MuiInputLabel-root.Mui-error": {
    color: "#d32f2f",
  },
};

export const loginWhiteTextField = {
  "& label.Mui-focused": {
    color: "#ffffff",
  },
  "& label": {
    fontSize: "15px",
    color: "#ffffff",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#fff",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "1px solid #ffffff",
      color: "#fff",
    },
    "&:hover fieldset": {
      borderColor: "#ffffff",
    },
    "&.Mui-focused fieldset": {
      border: "1px solid #ffffff",
    },
  },
  "& .MuiInputBase-input": {
    color: "#ffffff",
  },
  "& .Mui-error": {
    "& fieldset": {
      border: "1px solid #d32f2f",
    },
    "&:hover fieldset": {
      border: "1px solid #d32f2f",
    },
    "&.Mui-focused fieldset": {
      border: "1px solid #d32f2f",
    },
    "& label.Mui-focused": {
      color: "#d32f2f",
    },
  },
  "& .MuiInputLabel-root.Mui-error": {
    color: "#d32f2f",
  },
};

export const phonetextField = {
  "& label.Mui-focused": {
    color: "#000000",
  },
  "& label": {
    fontSize: "15px",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      border: "1px solid #000000",
      borderLeft: "none",
      borderTopLeftRadius: "0px",
      borderBottomLeftRadius: "0px",
    },
    "&:hover fieldset": {
      borderColor: "#000000",
    },
    "&.Mui-focused fieldset": {
      border: "1px solid #000000",
      borderLeft: "none",
    },
  },

  "& .Mui-error": {
    "& fieldset": {
      border: "1px solid #d32f2f",
      borderLeft: "none",
      borderTopLeftRadius: "0px",
      borderBottomLeftRadius: "0px",
    },
    "&:hover fieldset": {
      border: "1px solid #d32f2f",
      borderLeft: "none",
      borderTopLeftRadius: "0px",
      borderBottomLeftRadius: "0px",
    },
    "&.Mui-focused fieldset": {
      border: "1px solid #d32f2f",
      borderLeft: "none",
    },
    "& label.Mui-focused": {
      color: "#d32f2f",
    },
  },
  "& .MuiInputLabel-root.Mui-error": {
    color: "#d32f2f",
  },
};

export const cardStyles = {
  position: "relative",
  bottom: "50px",
};

export const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export const tabButton = {
  color: "#000",
  fontSize: "12px",
  fontWeight: "500",
  minHeight: "0",
  "&.Mui-selected": {
    color: "#000 ",
    border: "1px solid #000",
    textDecoration: "none",
    borderRadius: "20px",
    // backgroundColor: "#fff",
    background: "#e0e0e0",
    boxShadow: "20px -20px 40px #bebebe -20px 20px 40px #ffffff",
  },
  "&.MuiTabs-indicator": {
    backgroundColor: "#ffffff",
  },
};
export const tabsectionButton = {
  color: "#000",
  fontSize: "13px",
  fontWeight: "500",
  minHeight: "0",
  "&.Mui-selected": {
    color: "#333 ",
    border: "none",
    borderBottom: "1px solid  #ddd",
    textDecoration: "none",
  },
  "&.MuiTabs-indicator": {
    backgroundColor: "#000000",
  },
};
export const varianttabButton = {
  color: "#ffffff",
  fontSize: "12px",
  fontWeight: "500",
  minHeight: "0",
  "&.Mui-selected": {
    color: "#000 ",
    border: "1px solid #eee",
    textDecoration: "none",
    borderRadius: "20px",
    backgroundColor: "#eee",
  },
  "&.MuiTabs-indicator": {
    backgroundColor: "#000",
    fontSize: "10px",
  },
};

export const bodyTypeTabButton = {
  color: "#000",
  "&.Mui-selected": {
    color: "#000",
    // border: "1px solid #000",
    borderRadius: "8px",
    boxShadow: "0px 0px 2px 2px #d7d7d7",
  },
  borderRadius: "8px",
  transition: "0.5s ease-in-out",
  // width: 1,
  mx: 1,
  my: 1,
  ":hover": {
    boxShadow: "0px 0px 2px 2px #d7d7d7",
  },
};

export const orderTabButton = {
  borderBottom: "1px solid #d7d7d7",
  width: "100%",
  fontSize: "15px",
  fontWeight: "600",
  "&.Mui-selected": {
    borderBottom: "2px solid purple",
    color: "Purple",
    // borderRadius: "20px",
  },
};

export const colorStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    backgroundColor: "transparent",
    border: "1px solid #fff",
    boxShadow: "none",
    fontSize: "12px",
    width: "100%",
    fontWeight: "400",
    color: "#fff",
  }),
  option: (styles, { isSelected }) => {
    return {
      ...styles,
      textTransform: "capitalize",
      backgroundColor: isSelected ? "#fff" : "#ffffff",
      zIndex: 999,
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
