import React, { useEffect, useState } from "react";
import { Col, Row, Typography, Layout, Skeleton ,Card } from "antd";
import dayjs from "dayjs";
import { FaArrowLeft } from "react-icons/fa";
import { Get } from "../../config/api/get";
import { RATES, COMISSSION } from "../../config/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function CoachRates() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const user = useSelector((state) => state.user.userData);

  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [rates, setRates] = useState({
    hourlyRate: 0,
    tutoringRate: 0,
    coachingRate: 0,
  });
  const [commissions, setCommissions] = useState({
    coachingCommission: 0,
    tutoringCommission: 0,
  });

  useEffect(() => {
    if (user) {
      getMyRates();
      getCommissions();
    }
  }, []);


  const getMyRates = () => {
    try {
      Get(RATES?.getCoachRates + id, token).then((response) => {
        if (response?.status) {
          setRates(response?.data?.rates);
        } else {
          console.log("response", response);
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  
  const getCommissions = () => {
    try {
      Get(COMISSSION.getCommission, token).then((response) => {
        if (response?.status) {
          setCommissions(response?.data);
        } else {
          console.log("response", response);
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  };

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
              Session Rates
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
            <Row gutter={[20, 50]}>
                {/* <Col xs={24} >
                  <Typography.Title
                    className="fontFamily1"
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "black",
                      textAlign: "left",
                      marginTop: 0,
                      marginBottom: 10,
                    }}
                  >
                    Average Session Rates
                  </Typography.Title>
                  <Typography.Text
                      className="fontFamily1"
                      style={{
                        fontSize: "18px",
                        color: "black",
                        textAlign: "left",
                        marginTop: 0,
                        marginBottom: 20,
                      }}
                    >
                      $ {rates?.hourlyRate} / Session
                    </Typography.Text>
                </Col> */}
                <Col xs={24} >
                  <Typography.Title
                    className="fontFamily1"
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "black",
                      textAlign: "left",
                      marginTop: 0,
                      marginBottom: 10,
                    }}
                  >
                    Tutoring Session Rates
                  </Typography.Title>
                  <Typography.Text
                      className="fontFamily1"
                      style={{
                        fontSize: "18px",
                        color: "black",
                        textAlign: "left",
                        marginTop: 0,
                        marginBottom: 20,
                      }}
                    >
                      $ {rates?.tutoringRate} / Session
                    </Typography.Text>
                </Col>
                <Col xs={24} >
                  <Typography.Title
                    className="fontFamily1"
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "black",
                      textAlign: "left",
                      marginTop: 0,
                      marginBottom: 10,
                    }}
                  >
                    Coaching Session Rates
                  </Typography.Title>

                  <Typography.Text
                      className="fontFamily1"
                      style={{
                        fontSize: "18px",
                        color: "black",
                        textAlign: "left",
                        marginTop: 0,
                        marginBottom: 20,
                      }}
                    >
                      $ {rates?.coachingRate} / Session
                    </Typography.Text>
                </Col>
              </Row>
              <br />            
     
          </div>
        )}
      </div>
    </Layout>
  );
}
export default CoachRates;
