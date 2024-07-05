import styles from "@/styles/profileSidebar.module.css";
import { tabsectionButton } from "@/utils/styles";
import { Card, Divider, Skeleton, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { FaBoxOpen, FaHeart } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import TabPanel from "../tabPanel";
import ProfileSettings from "./profile-settings";
import { authControllers } from "@/api/authentication";
import { getUserProfile } from "@/api/apiCalling/authenticationApi";
import { useDispatch } from "react-redux";
import Order from "./order";
import ShortListedVehicle from "./shortListedVehicle";
const ProfileSidebar = () => {
  const [user, setUser] = useState({});
  const [placeholderLoading, setPlaceholderLoading] = useState(true);

  const tabsSection = [
    {
      label: "Orders",
      icon: <FaBoxOpen />,
    },
    {
      label: "Shortlisted Vehicle",
      icon: <FaHeart />,
    },
    {
      label: "Profile Settings",
      icon: <IoIosSettings />,
    },
  ];
  const dispatch = useDispatch();

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    // getUserDetails();
    getUserProfile({ dispatch, setUser, setLoading: setPlaceholderLoading });
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className="row">
        <div className="col-sm-3">
          <Card>
            <div className={styles.profile_wrapper}>
              <div className="p-3">
                {placeholderLoading ? (
                  <Skeleton
                    className="m-auto"
                    animation="wave"
                    variant="circular"
                    width={40}
                    height={40}
                  />
                ) : (
                  <div className={styles.profile_image}>
                    {user.name.slice(0, 1)}
                  </div>
                )}
                {placeholderLoading ? (
                  <Skeleton
                    animation="wave"
                    className="m-auto"
                    variant="text"
                    width={100}
                  />
                ) : (
                  <p className="mt-2 mb-0 text-center text-capitalize">
                    {user.name}
                  </p>
                )}
                {placeholderLoading ? (
                  <Skeleton animation="wave" variant="text" width={200} />
                ) : (
                  <p>{user.email}</p>
                )}
              </div>
            </div>
            <Divider style={{ background: "#000", width: "100%" }} />
            <div className="p-3">
              <Tabs
                orientation="vertical"
                value={value}
                onChange={handleChange}
              >
                {tabsSection.map((val, i) => (
                  <Tab
                    icon={val.icon}
                    label={val.label}
                    key={i}
                    iconPosition="start"
                    sx={tabsectionButton}
                    className="mb-3 justify-content-start"
                  />
                ))}
              </Tabs>
            </div>
          </Card>
        </div>
        <div className="col-sm-9">
          <TabPanel value={value} index={0}>
            <Order />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ShortListedVehicle />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ProfileSettings
              userDetails={user}
              loading={placeholderLoading}
              setUser={setUser}
              setLoading={setPlaceholderLoading}
            />
          </TabPanel>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
