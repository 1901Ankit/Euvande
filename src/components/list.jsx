import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const List = (props) => {
  const user = useSelector((state) => state.userInfo);
  return (
    <div>
      <h5 className="mb-4 fw-bold text-white">{props.heading}</h5>
      <ul className="list">
        {props.data.map((val, i) => (
          <Link
            href={
              val.link != "/sell-cars"
                ? val.link
                : !user.isAuthenticated
                ? "/login"
                : val.link
            }
            className="link"
          >
            <li key={i} className="mb-2 pointer fw-normal f-12 text-white">
              {val.label}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default List;
