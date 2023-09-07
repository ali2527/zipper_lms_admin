import React, { useEffect, useState } from "react";
import { Col, Row, Typography, Layout, Skeleton } from "antd";
import dayjs from "dayjs";
import { FaArrowLeft } from "react-icons/fa";
import { Get } from "../../config/api/get";
import { SCHEDULE } from "../../config/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function CoachSchedule() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [coach, setCoach] = useState(null);
  const [days, setDays] = useState([
    { day: "Sunday", selected: false, dayNo: 0,slots:[] },
    { day: "Monday", selected: false, dayNo: 1,slots:[] },
    { day: "Tuesday", selected: false, dayNo: 2,slots:[] },
    { day: "Wednesday", selected: false, dayNo: 3,slots:[] },
    { day: "Thursday", selected: false, dayNo: 4,slots:[] },
    { day: "Friday", selected: false, dayNo: 5,slots:[] },
    { day: "Saturday", selected: false, dayNo: 6,slots:[] },
  ]);


  useEffect(() => {
    getSchedule();
  }, []);


  function updateStateFromResponse(responseObj) {
    let _days = [...days];
    const selectedDay = _days.find((day) => day.dayNo === responseObj.day);
  
    if (selectedDay) {
      selectedDay.selected = true;
      selectedDay.slots = responseObj.timeSlots ;
    }
  }

  const getSchedule = () => {
    try {
      Get(SCHEDULE.getScheduleByCoachId + id, token).then((response) => {
        console.log("response", response);
        if (response?.status) {
          response?.data?.forEach((responseObj) => {
            updateStateFromResponse(responseObj);
          });
          setDays([...days]);
  
          // The 'days' array has been directly updated with selected days and slots
          console.log("updated days", days);
        } else {
          console.log("response", response);
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log("days",days)


  return (
    <Layout className="configuration">
      <div className="boxDetails2">
        <Row style={{ padding: "10px 20px" }}>
          <Col
            xs={24}
            md={12}
            style={{ display: "flex", alignItems: "center" }}
          >
            <FaArrowLeft
              style={{ fontWeight: "bold", fontSize: "20px" }}
              onClick={() => navigate(-1)}
            />
            &emsp;
            <h1 className="pageTitle" style={{ margin: 0 }}>
              Schedule
            </h1>
          </Col>
        </Row>
        <br />
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <Skeleton active paragraph={{ rows: 10 }} />
          </div>
        )}

        {!loading && (
          <div style={{ padding: "30px" }}>
            {days.filter(item => item.selected).map(item =>{
              return(<>
              <Typography.Title
                        className="fontFamily1"
                        style={{
                          fontSize: "18px",
                          fontWeight: 600,
                          color: "black",
                          textAlign: "left",
                          marginTop: 16,
                        }}
                      >
                        {item.day}
                      </Typography.Title>
                      {item.slots.map(subItem =>{
                        return(<><Typography.Text
                          className="fontFamily1"
                          style={{
                            fontSize: "16px",
                            color: "grey",
                            textAlign: "left",
                          }}
                        >
                         {dayjs(new Date(subItem.startTime)).format('hh:mm A') + " to " + dayjs(new Date(subItem.endTime)).format('hh:mm A') }
                        </Typography.Text> &emsp;</>)
                         
                      })}
                     
              </>)
            })}
           
          </div>
        )}
      </div>
    </Layout>
  );
}
export default CoachSchedule;
