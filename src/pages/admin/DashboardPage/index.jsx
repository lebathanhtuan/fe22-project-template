import React from "react";
import moment from "moment";

function DashboardPage() {
  const time = "17:00 28_06_2022";
  const today = moment(time, "HH:mm DD_MM_YYYY").fromNow();
  return <div>Dashboard - {today}</div>;
}

export default DashboardPage;
