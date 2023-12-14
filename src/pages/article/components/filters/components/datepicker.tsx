import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

interface props {}

const ArticlesDatepicker: React.FC<props> = () => {
  const rangePresets: {
    label: string;
    value: [Dayjs, Dayjs];
  }[] = [
    { label: "Today", value: [dayjs().add(0, "d"), dayjs()] },
    { label: "Yesterday", value: [dayjs().add(-1, "d"), dayjs()] },
    { label: "Last  7 Days", value: [dayjs().add(-7, "d"), dayjs()] },
    { label: "Last 30 Days", value: [dayjs().add(-30, "d"), dayjs()] },
    {
      label: "Last month",
      value: [
        dayjs().add(-1, "month").startOf("month"),
        dayjs().add(-1, "month").endOf("month"),
      ],
    },
    {
      label: "This month",
      value: [dayjs().startOf("month"), dayjs().endOf("month")],
    },
  ];

  const onRangeChange = (
    dates: null | (Dayjs | null)[],
    dateStrings: string[]
  ) => {
    if (dates) {
      console.log("From: ", dates[0], ", to: ", dates[1]);
      console.log("From: ", dateStrings[0], ", to: ", dateStrings[1]);
    } else {
      console.log("Clear");
    }
  };

  return (
    <RangePicker
      presets={rangePresets}
      size={"large"}
      onChange={onRangeChange}
    />
  );
};

export default ArticlesDatepicker;
