import EditUserProfile from "@/assests/modalcalling/editUserProfile";
import { showModal } from "@/redux/reducers/modal";
import { Done, Info, Lock, Person, Verified } from "@mui/icons-material";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import EmailIcon from "@mui/icons-material/Email";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  IconButton,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { FaPhoneAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import ChangePassword from "./change-password";
import Address from "./address";
import VerifyPhone from "@/assests/modalcalling/verifyPhoneNumber/verifyPhoneNumber";
const ProfileSettings = (props) => {
  const user = props.userDetails;
  const loading = props.loading;
  const setUser = props.setUser;
  const setLoading = props.setLoading;
  const router = useRouter();
  const dispatch = useDispatch();
  const editProfileModal = () => {
    dispatch(
      showModal(
        <EditUserProfile
          value={user}
          setUser={setUser}
          setLoading={setLoading}
        />
      )
    );
  };
  const verifyPhoneNumber = (userInfo) => {
    dispatch(
      showModal(
        <VerifyPhone
          user={userInfo}
          userDetails={user}
          setUser={setUser}
          setLoading={loading}
        />
      )
    );
  };
  return (
    <div>
      <div>
        <h4 className="fw-semibold mb-2">Profile Settings</h4>

        <div className="container ">
          <div className="row">
            <div className="col-sm-12">
              <Accordion defaultExpanded={true} className="mb-2">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Stack direction={"row"} spacing={1}>
                    <Person />
                    <Typography variant="h6" fontWeight={600} fontSize={18}>
                      Contact Information
                    </Typography>
                  </Stack>
                </AccordionSummary>
                <Divider style={{ backgroundColor: "#000" }} />
                <AccordionDetails>
                  <div className="d-flex align-items-center justify-content-between">
                    {loading ? (
                      <Skeleton animation="wave" variant="text" />
                    ) : (
                      <Typography
                        fontSize={20}
                        letterSpacing={1}
                        variant="h4"
                        className="mb-1"
                        textTransform={"capitalize"}
                      >
                        {user.name}
                      </Typography>
                    )}
                    <Typography
                      className="f-12 text-primary pointer"
                      onClick={editProfileModal}
                    >
                      Edit Details
                    </Typography>
                  </div>
                  {loading ? (
                    <Skeleton animation="wave" variant="rectangular" />
                  ) : (
                    <p className="f-12 fw-semibold ">
                      <EmailIcon className="me-2" fontSize="12px" />
                      {user.email}
                    </p>
                  )}
                  <div className="d-flex align-items-center justify-content-between">
                    <p
                      className={`f-12 fw-semibold ${
                        user.isPhoneNoVerified ? "text-success" : "text-danger"
                      } `}
                    >
                      <FaPhoneAlt className="me-2" fontSize="12px" />
                      {user.phoneNo}
                    </p>
                    <Tooltip
                      title={
                        user.isPhoneNoVerified
                          ? "Phone Number Verified"
                          : "Verify Phone Number"
                      }
                      placement="top"
                    >
                      {user.isPhoneNoVerified ? (
                        <Verified sx={{ fill: "green" }} />
                      ) : (
                        <IconButton onClick={() => verifyPhoneNumber(user)}>
                          <Info
                            fontSize="12px"
                            className="pointer"
                            style={{ color: "red" }}
                          />
                        </IconButton>
                      )}
                    </Tooltip>
                  </div>
                </AccordionDetails>
              </Accordion>
              <Accordion className="mb-2">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Stack direction={"row"} spacing={1}>
                    <Lock />
                    <Typography variant="h6" fontWeight={600} fontSize={18}>Change Password</Typography>
                  </Stack>
                </AccordionSummary>
                <Divider style={{ backgroundColor: "#000" }} />
                <AccordionDetails>
                  <ChangePassword />
                </AccordionDetails>
              </Accordion>
              <Accordion className="mb-2">
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Stack direction={"row"} spacing={1} alignItems={"center"}>
                    <ContactMailIcon />
                    <Typography variant="h6" fontWeight={600} fontSize={18}>Address</Typography>
                  </Stack>
                </AccordionSummary>
                <Divider style={{ backgroundColor: "#000" }} />
                <AccordionDetails>
                  <Address />
                </AccordionDetails>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
