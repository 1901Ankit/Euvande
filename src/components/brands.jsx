import { Box, Card } from "@mui/material";
import logo from "@/logo/EUVandeLogoBlack.svg";
const Brands = (props) => {
  const borderStyle = props.selected ? "1px solid #000" : "1px solid #eee";
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={props.onClick}
    >
      <Card
        sx={{
          width: props.width,
          height: props.height,
          display: "grid",
          placeContent: "center",
          cursor: "pointer",
          "&:hover": {
            border: "1px solid #00000038",
            backgroundColor: "#00000038",
            color: "#000",
          },

          border: borderStyle,
        }}
        className={`${props.className} `}
      >
        <div className="text-center">
          <img src={props.img || logo.src} width={50} className="mb-1" />
          <p className="text-uppercase f-10 mb-0">{props.brands}</p>
        </div>
      </Card>
    </Box>
  );
};

export default Brands;
