import { Box } from "@mui/material";
import { useRouter } from "next/router";
import Loading from "react-loading";
import PendingCar from "./pendingCarCard";

const CarsForSell = ({
  status,
  data,
  loading,
  setLoading,
  page,
  pageSize,
  setData,
}) => {
  const router = useRouter();
  const handleRoute = (carId) => {
    router.push(`/cars/${carId}/car-details?status=${status}`);
  };

  return (
    <div>
      {loading ? (
        <Loading
          type="bars"
          className="m-auto my-3"
          color="000"
          width={20}
          height={20}
        />
      ) : (
        <Box>
          <PendingCar
            data={data && data.docs}
            loading={loading}
            handleRoute={handleRoute}
            setData={setData}
            setLoading={setLoading}
            page={page}
            pageSize={pageSize}
            totalDocs={data && data.totalDocs}
          />
        </Box>
      )}
    </div>
  );
};

export default CarsForSell;
