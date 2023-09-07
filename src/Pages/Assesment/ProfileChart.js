import React from "react";
import GraphData from "../Front/GraphData";
import "bootstrap/dist/css/bootstrap.min.css";
import { checkOptionSetting } from "../../Context/functions";
import styles from "./assesment.module.css";
import style from "../Analyticsresult/analyticsresult.module.css";

var data = ""; //"Here's you compare to others with similar profile as yours."

export const ProfileChart1 = ({ dictChartData, options }) => {
  //   console.log("resultData555", resultData);
    return (
      <div>
        <div>
          {checkOptionSetting(110, 1, options) && (
            <>
        <div className={style.resutlPageBreak}>
              <div className={style.contantforresult}>
                <h2>{data}</h2>
  
                <div className={style.compareGraph}>
                  <GraphData
                    data={dictChartData}
                    title={true}
                    // style={{ color: "red" }}
                    chartType={"7"}
                  />
                </div>
              </div>
        </div>
            </>
          )}
        </div>
      </div>
    );
  };
  

export function ProfileChart({ dictChartData, options }) {
  
  // console.log("profiledata props", resultData);
  
  return (
    <div>
      {checkOptionSetting(110, 1,options) &&
        dictChartData &&
        dictChartData.hasOwnProperty("7") && (
          <>
            <div className={styles.contantforresult}>
              <h2 className={styles.mianheadingtopbanner}>{data}</h2>

              {/* <div className={styles.compareGraph}><Bargraph /></div>  */}
              {checkOptionSetting(82, 1,options) && (
                <div className={styles.compareGraphBar}>
                  <GraphData
                    data={
                      dictChartData
                    }
                    title={true}
                    chartType={"7"}
                  />
                </div>
              )}
            </div>
          </>
        )}
    </div>
  );
}

