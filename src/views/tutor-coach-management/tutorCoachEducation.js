import React, { useEffect, useState } from "react";
import { Col,Button, Row, Typography, Layout, Skeleton } from "antd";
import dayjs from "dayjs";
import { FaArrowLeft } from "react-icons/fa";
import { Get } from "../../config/api/get";
import { COACH, UPLOAD_URL } from "../../config/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function CoachEducation() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [coach, setCoach] = useState(null);

  useEffect(() => {
    getCoaches();
  }, []);

  console.log("JJJJJ", window.location);

  const getCoaches = async () => {
    setLoading(true);
    const coach = await Get(`${COACH.getCoachById}${id}`, token);
    console.log("coachss", coach);
    setCoach(coach.data.coach);
    setLoading(false);
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
              Education
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

        {!loading && coach && (
          <div style={{ padding: "30px" }}>
            {coach?.education.map((item, index) => {
              console.log("item", item);
              return (
                <>
                  <Row>
                    <Typography.Text
                      className="fontFamily1"
                      style={{
                        fontSize: "18px",
                        textDecoration: "underline",
                        color: "#3C3C3B",
                        textAlign: "left",
                        marginTop: 0,
                        marginBottom: 20,
                      }}
                    >
                      Education {index + 1}
                    </Typography.Text>
                  </Row>

                  <Row>
                    <Col xs={12} sm={6}>
                      <Typography.Title
                        className="fontFamily1"
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                          color: "black",
                          textAlign: "left",
                          marginTop: 0,
                        }}
                      >
                        School Name
                      </Typography.Title>
                      <Typography.Text
                        className="fontFamily1"
                        style={{
                          fontSize: "14px",
                          color: "grey",
                          textAlign: "left",
                        }}
                      >
                        {item?.school}
                      </Typography.Text>
                    </Col>

                    <Col xs={12} sm={6}>
                      <Typography.Title
                        className="fontFamily1"
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                          color: "black",
                          textAlign: "left",
                          marginTop: 0,
                        }}
                      >
                        Start Date
                      </Typography.Title>
                      <Typography.Text
                        className="fontFamily1"
                        style={{
                          fontSize: "14px",
                          color: "grey",
                          textAlign: "left",
                        }}
                      >
                        {item.start}
                      </Typography.Text>
                    </Col>
                  </Row>
                  <br />
                  <Row>
                    <Col xs={12} sm={6}>
                      <Typography.Title
                        className="fontFamily1"
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                          color: "black",
                          textAlign: "left",
                          marginTop: 0,
                        }}
                      >
                        End Date
                      </Typography.Title>
                      <Typography.Text
                        className="fontFamily1"
                        style={{
                          fontSize: "14px",
                          color: "grey",
                          textAlign: "left",
                        }}
                      >
                        {item.end}
                      </Typography.Text>
                    </Col>
                    <Col xs={12} sm={6}>
                      <Typography.Title
                        className="fontFamily1"
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                          color: "black",
                          textAlign: "left",
                          marginTop: 0,
                        }}
                      >
                        Diploma Earned
                      </Typography.Title>
                      <Typography.Text
                        className="fontFamily1"
                        style={{
                          fontSize: "14px",
                          color: "grey",
                          textAlign: "left",
                        }}
                      >
                        {item?.isDiploma ? "Yes" : "No"}
                      </Typography.Text>
                    </Col>
                  </Row>

                  <br />
                  <Row>
                    <Col xs={12}>
                      <Typography.Title
                        className="fontFamily1"
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                          color: "black",
                          textAlign: "left",
                          marginTop: 0,
                        }}
                      >
                        Subject Studied
                      </Typography.Title>
                      <Typography.Text
                        className="fontFamily1"
                        style={{
                          fontSize: "14px",
                          color: "grey",
                          textAlign: "left",
                        }}
                      >
                        {item.subject.join(",")}
                      </Typography.Text>
                    </Col>
                  </Row>

                  {index < coach.education.length - 1 && (
                    <>
                      <br />
                      <br />
                    </>
                  )}


                </>
              );
            })}

            
<br/>
{coach.resume && <Button
                  type="primary"
                  htmlType="submit"
                  className="loginButton"
                  onClick={() => window.open(UPLOAD_URL + coach.resume)}
                  style={{ fontWeight: "bold" }}
                >
                  View Resume
                </Button> }
            
&emsp;
                {coach.photoId && <Button
                  type="primary"
                  htmlType="submit"
                  className="loginButton"
                  onClick={() => window.open(UPLOAD_URL + coach.photoId)}
                  style={{ fontWeight: "bold" }}
                >
                  View PhotoId
                </Button> }
          </div>
        )}
      </div>
    </Layout>
  );
}
export default CoachEducation;
