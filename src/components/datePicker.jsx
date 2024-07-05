import React from "react";
import ReactDatePicker from "react-datepicker";
import styles from "@/styles/datePicker.module.css";
const DateSelector = (props) => {
  return (
    <div>
      <ReactDatePicker
        dateFormat="yyyy"
        showYearPicker={props.showYearPicker}
        selected={props.onSelect}
        onChange={props.onChange}
        className={styles.date_picker}
      />
    </div>
  );
};

export default DateSelector;
