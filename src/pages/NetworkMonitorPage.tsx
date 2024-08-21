import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import {
  JsonView,
  allExpanded,
  // darkStyles,
  defaultStyles,
} from "react-json-view-lite";
import moment from "moment";

const NetworkMonitorPage = () => {
  const netWorkErrors = useSelector((state: RootState) => state.networkError);
  return (
    <div
      style={{
        width: "80%",
        margin: "0 auto",
        background: "white",
        padding: "40px",
      }}
    >
      {netWorkErrors?.data?.map((error: any) => {
        return (
          <>
            <div style={{ background: "skyblue" }}>
              <b>Report Time:</b>{" "}
              {error?.time?.timestamp &&
                moment(error?.time?.timestamp).format("DD-MM-YYYY HH:mm:ss")}
            </div>
            <JsonView
              data={error}
              shouldExpandNode={allExpanded}
              style={defaultStyles}
            />
            <div style={{ marginBottom: "40px" }}></div>
          </>
        );
      })}
    </div>
  );
};

export default NetworkMonitorPage;
