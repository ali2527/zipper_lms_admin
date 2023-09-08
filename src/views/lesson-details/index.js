import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Typography,
  List,
  Form,
  Input,
  Button,
  Popover,
  Layout,
  Avatar,
  Tabs,
  Table,
  Select,
  Image,
  Modal,
  Skeleton,
} from "antd";
import dayjs from "dayjs";
import { UserOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { FaCaretDown, FaFilter, FaArrowLeft } from "react-icons/fa";
import { Get } from "../../config/api/get";
import { UPLOAD_URL, LESSON, USERS } from "../../config/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import swal from "sweetalert";

function LessonDetails() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lesson, setLesson] = useState({});
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getLessonDetails();
  }, []);

  console.log("JJJJJ", window.location);

  const getLessonDetails = async () => {
    try {
      const response = await Get(LESSON.getLessonById + id, token);

      console.log("response", response);
      if (response?.status) {
        setLesson(response?.data?.lesson);
      } else {
        swal("Error", response?.data?.message, "error");
      }
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const handleStatus = async () => {
    try {
      const response = await Get(USERS.toggleStatus + user._id, token, {});
      const newUser = { ...user };
      newUser.status = newUser.status == "ACTIVE" ? "INACTIVE" : "ACTIVE";

      // newUser.status =="ACTIVE" ? user.status =="INACTIVE" : user.status =="ACTIVE";
      setModalOpen(false);
      setUser(newUser);
    } catch (error) {
      console.log(error.message);
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
              Lesson Details
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

        {!loading && lesson && (
          <>
            <Row style={{padding:"10px 30px"}}>
              <Col xs={24} md={22}>
                <Row>
                  <Col xs={12} sm={5}>
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
                      Lesson ID
                    </Typography.Title>
                    <Typography.Text
                      className="fontFamily1"
                      style={{
                        fontSize: "14px",
                        color: "grey",
                        textAlign: "left",
                      }}
                    >
                      {lesson?.lessonId}
                    </Typography.Text>
                  </Col>

                  <Col xs={12} sm={5}>
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
                      No. of Lessons
                    </Typography.Title>
                    <Typography.Text
                      className="fontFamily1"
                      style={{
                        fontSize: "14px",
                        color: "grey",
                        textAlign: "left",
                      }}
                    >
                      {lesson?.noOfLesson}
                    </Typography.Text>
                  </Col>
                </Row>

                <Row style={{ marginTop: 40 }}>
                  <Col xs={12} sm={5}>
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
                      Lesson Type
                    </Typography.Title>
                    <Typography.Text
                      className="fontFamily1"
                      style={{
                        fontSize: "14px",
                        color: "grey",
                        textAlign: "left",
                      }}
                    >
                      {lesson.lessonType}
                    </Typography.Text>
                  </Col>

                  <Col xs={12} sm={5}>
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
                      Service/ Subject Name
                    </Typography.Title>
                    <Typography.Text
                      className="fontFamily1"
                      style={{
                        fontSize: "14px",
                        color: "grey",
                        textAlign: "left",
                      }}
                    >
                      {lesson?.subject &&
                        lesson?.subject[0].toUpperCase() +
                          lesson?.subject.slice(1)}
                    </Typography.Text>
                  </Col>
                </Row>

                <Row style={{ marginTop: 40 }}>
                  <Col xs={12} sm={5}>
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
                      Lesson Date
                    </Typography.Title>
                    <Typography.Text
                      className="fontFamily1"
                      style={{
                        fontSize: "14px",
                        color: "grey",
                        textAlign: "left",
                      }}
                    >
                      {dayjs(lesson?.LessonDate).format("DD/MM/YYYY")}
                    </Typography.Text>
                  </Col>

                  <Col xs={12} sm={5}>
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
                      Lesson Time
                    </Typography.Title>
                    <Typography.Text
                      className="fontFamily1"
                      style={{
                        fontSize: "14px",
                        color: "grey",
                        textAlign: "left",
                      }}
                    >
                      {lesson?.slots?.length > 0 &&
                        lesson?.slots.map((item) => {
                          return (
                            <>
                              {dayjs(item.lessonStartTime).format("hh:mm a") +
                                " to " +
                                dayjs(item.lessonEndTime).format("hh:mm a")}
                            </>
                          );
                        })}
                    </Typography.Text>
                  </Col>
                </Row>

                <Row style={{ marginTop: 40 }}>
                  <Col xs={12} sm={5}>
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
                      Lesson Charge
                    </Typography.Title>
                    <Typography.Text
                      className="fontFamily1"
                      style={{
                        fontSize: "14px",
                        color: "grey",
                        textAlign: "left",
                      }}
                    >
                      ${lesson.charges}
                    </Typography.Text>
                  </Col>
                </Row>

                <Row style={{ marginTop: 40 }}>
                  <Typography.Text
                    className="fontFamily1"
                    style={{
                      fontSize: "18px",
                      textDecoration: "underline",
                      color: "grey",
                      textAlign: "left",
                    }}
                  >
                    Coach/ Tutor General Information
                  </Typography.Text>
                </Row>
                <br />
                <Row>
                  <Col>
                    {" "}
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
                      Coach/ Tutor Name
                    </Typography.Title>
                    <Typography.Text
                      className="fontFamily1"
                      style={{
                        fontSize: "14px",
                        color: "grey",
                        textAlign: "left",
                      }}
                    >
                      {lesson?.coach?.firstName + " " + lesson?.coach?.lastName}
                    </Typography.Text>
                  </Col>
                </Row>
                <Button
                  className="fontFamily1"
                  style={{
                    marginTop: "20px",
                    padding: "10px 30px",
                    cursor: "pointer",
                    color: "black",
                    borderRadius: "5px",
                    height: "auto",
                    border: "1px solid #203657",
                    fontWeight: "bold",
                  }}
                  ghost
                  size="large"
                  onClick={() => navigate("/tutor-coach-management/" + lesson?.coach?._id )}
                >
                  View Profile
                </Button>

                <Row style={{ marginTop: 30 }}>
                  <Typography.Text
                    className="fontFamily1"
                    style={{
                      fontSize: "18px",
                      textDecoration: "underline",
                      color: "grey",
                      textAlign: "left",
                    }}
                  >
                    Learner Information
                  </Typography.Text>
                </Row>
                <br />
                <Row>
                  <Col>
                    {" "}
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
                      Learner Name
                    </Typography.Title>
                    <Typography.Text
                      className="fontFamily1"
                      style={{
                        fontSize: "14px",
                        color: "grey",
                        textAlign: "left",
                      }}
                    >
                      {lesson?.student?.firstName +
                        " " +
                        lesson?.student?.lastName}
                    </Typography.Text>
                  </Col>
                </Row>
                <Button
                  className="fontFamily1"
                  style={{
                    marginTop: "20px",
                    padding: "10px 30px",
                    cursor: "pointer",
                    color: "black",
                    borderRadius: "5px",
                    height: "auto",
                    border: "1px solid #203657",
                    fontWeight: "bold",
                  }}
                  ghost
                  size="large"
                  onClick={() => navigate("/learner-management/" + lesson?.student?._id )}
                >
                  View Profile
                </Button>
              </Col>
            </Row>
          </>
        )}
      </div>
      <br/>  <br/> 
    </Layout>
  );
}
export default LessonDetails;
