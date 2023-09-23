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
  message,
  Table,
  Select,
  Image,
  Modal,
  DatePicker,
  Skeleton,
} from "antd";
import dayjs from "dayjs";
import { UserOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { FaCaretDown, FaFilter, FaArrowLeft } from "react-icons/fa";
import { Get } from "../../config/api/get";
import { Post } from "../../config/api/post";
import { UPLOAD_URL,COACH, NOTIFICATION, USERS } from "../../config/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Notifications from ".";
import swal from "sweetalert";
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const { Option } = Select;


function NotificationDetails() {
  const navigate = useNavigate();
  const { TextArea } = Input;
  const token = useSelector((state) => state.user.userToken);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [students, setStudents] = useState([]);
  const { id } = useParams();
  const [notification, setNotification] = useState(null);
  const [pushNotifcation,setPushNotification] = useState({
    title:"",
    description:"",
    notificationType:"NOTIFICATION",
    sentTo:"allUsers",
    selectedTutors:[],
    selectedStudents:[]
  })

  useEffect(() => {
    if (id) {
      getNotificationDetails();
    }
    getUsers()
    getStudents()
  }, []);
  

  const getNotificationDetails = async () => {
    setLoading(true);
    const response = await Get(`${NOTIFICATION.getOne}${id}`, token);

    setNotification(response.data.notification);
    setLoading(false);
  };

  const getUsers = async (search) => {
    setLoading(true);
    try {
      const response = await Get(COACH.getAllTutorAndCoaches, token, {
        keyword: search ? search : null,
      });
      setLoading(false);
      console.log("response101", response.data);
      if (response?.status) {
        setUsers(response?.data?.docs);
      } else {
        message.error("Something went wrong!");
        console.log("error====>", response);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

const handleChange = (item,value) =>{
  let _pushNotification = {...pushNotifcation}
  _pushNotification[item] = value;
  setPushNotification(_pushNotification)
}



const handleUserChange = (item,value) =>{
  let _pushNotification = {...pushNotifcation}
  let users = value.map(item => item.split("/")[1])
  console.log(users)
  _pushNotification[item] = users
  setPushNotification(_pushNotification)
}
  const getStudents = async (search) => {
    setLoading(true);
    try {
      const response = await Get(USERS.getAllStudents, token, {
        keyword: search ? search : null,
      });
      setLoading(false);
      console.log("response101", response.data);
      if (response?.status) {
        setStudents(response?.data?.docs);
      } else {
        message.error("Something went wrong!");
        console.log("error====>", response);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };


  const addNotification = async () => {
    try {
      if(!pushNotifcation.title || !pushNotifcation.description){
        swal("Error","Notification Title and Description is required","error");
        return;
      }

      if(pushNotifcation.sentTo == "selectStudents" && pushNotifcation.selectedStudents.length == 0){
        swal("Error","Please Select a Student","error");
        return;
      }

      if(pushNotifcation.sentTo == "selectTutors" && pushNotifcation.selectedTutors.length == 0){
        swal("Error","Please Select a Tutor / Coach","error");
        return;
      }
      const data ={
        title : pushNotifcation.title,
        content: pushNotifcation.description,
        type: pushNotifcation.notificationType,
        sendTo: pushNotifcation.sentTo,
        selectedStudents: pushNotifcation.selectedStudents.length > 0 ? pushNotifcation.selectedStudents : [],
        selectedTutors:  pushNotifcation.selectedTutors.length > 0 ? pushNotifcation.selectedTutors : [],
      }

      const response = await Post(NOTIFICATION.sendPushNotification, data, token);

      console.log("FFFFFF",response)
      if (response.status) {
        message.success("Notification Created Successfully");
        navigate(-1);
      }

      console.log(response);
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
              {id ? "View Notification Details" : "Post New Notification"}
            </h1>
          </Col>
        </Row>
        <br />

        {id ? (
          <>
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

            {!loading && notification && (
              <>
                <Row style={{ padding: "20px" }}>
                  <Col xs={24} md={16}>
                    <Row style={{ padding: "10px" }}>
                      <Col xs={24} md={12}>
                        <h5
                          style={{
                            display: "block",
                            fontSize: 16,
                            marginTop:10,
                            fontWeight: 600,
                          }}
                        >
                          Notification Title{" "}
                        </h5>
                        <h5
                          style={{
                            display: "block",
                            fontSize: 16,
                            marginTop:10,
                            color: "#7a7e7f",
                            fontWeight: "normal",
                          }}
                        >
                          {notification?.title}
                        </h5>
                      </Col>
                    </Row>
                    <Row style={{ padding: "10px" }}>
                      <Col xs={24} md={12}>
                        <h5
                          style={{
                            display: "block",
                            fontSize: 16,
                            marginTop:10,
                            fontWeight: 600,
                          }}
                        >
                          Notification Type{" "}
                        </h5>
                        <h5
                          style={{
                            display: "block",
                            fontSize: 16,
                            marginTop:10,
                            color: "#7a7e7f",
                            fontWeight: "normal",
                          }}
                        >
                          {notification?.type}
                        </h5>
                      </Col>
                    </Row>
                    <Row style={{ padding: "10px" }}>
                      <Col xs={24} md={12}>
                        <h5
                          style={{
                            display: "block",
                            fontSize: 16,
                            marginTop:10,
                            fontWeight: 600,
                          }}
                        >
                          Sent On{" "}
                        </h5>
                        <h5
                          style={{
                            display: "block",
                            fontSize: 16,
                            marginTop:10,
                            color: "#7a7e7f",
                            fontWeight: "normal",
                          }}
                        >
                          {notification?.createdAt}
                        </h5>
                      </Col>
                    </Row>

                    <Row style={{ padding: "10px" }}>
                      <Col xs={24} md={12}>
                        <h5
                          style={{
                            display: "block",
                            fontSize: 16,
                            marginTop:10,
                            fontWeight: 600,
                          }}
                        >
                          Sent To{" "}
                        </h5>
                        <h5
                          style={{
                            display: "block",
                            fontSize: 16,
                            marginTop:10,
                            color: "#7a7e7f",
                            fontWeight: "normal",
                          }}
                        >
                          {notification?.sendTo}
                        </h5>
                      </Col>
                    </Row>


                    <Row style={{ padding: "10px" }}>
                      <Col xs={24} md={12}>
                        <h5
                          style={{
                            display: "block",
                            fontSize: 16,
                            marginTop:10,
                            fontWeight: 600,
                          }}
                        >
                          Discriptive Text{" "}
                        </h5>
                        <h5
                          style={{
                            display: "block",
                            fontSize: 16,
                            marginTop:10,
                            color: "#7a7e7f",
                            fontWeight: "normal",
                          }}
                        >
                          {notification?.content}
                        </h5>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </>
            )}
          </>
        ) : (
          <>
            <Row style={{ padding: "5px 20px" }}>
              <Col
                xs={24}
                md={12}
                style={{
                  display: "flex",
                  alignItems: "left",
                  flexDirection: "column",
                }}
              >
                <h5
                  className="pageTitle"
                  style={{
                    fontSize: "16px",
                    margin: 10,
                    textTransform: "capitalize",
                    fontWeight: "normal",
                  }}
                >
                  Notification Title
                </h5>
                <Input
                  style={{ width: "100%" }}
                  className="signupFormInput"
                  placeholder="Notification ABC"
                  value={pushNotifcation?.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                />
              </Col>
            </Row>
            <Row style={{ padding: "5px 20px" }}>
              <Col
                xs={24}
                md={12}
                style={{
                  display: "flex",
                  alignItems: "left",
                  flexDirection: "column",
                }}
              >
                <h5
                  className="pageTitle"
                  style={{
                    fontSize: "16px",
                    margin: 10,
                    textTransform: "capitalize",
                    fontWeight: "normal",
                  }}
                >
                  Notification Type
                </h5>
                <Select
                  className="signupSelectBox"
                  suffixIcon={<FaCaretDown style={{ fontSize: "16px" }} />}
                  value={pushNotifcation.notificationType}
                  bordered={false}
                  onChange={(e) => {
                    handleChange("notificationType", e);
                  }}
                  options={[
                    {
                      value: "NOTIFICATION",
                      label: "Notification",
                    },
                    {
                      value: "ANNOUNCEMENT",
                      label: "Announcement",
                    },
                    {
                      value: "ALERT",
                      label: "Alert",
                    },
                  ]}
                />
              </Col>
            </Row>
            <Row style={{ padding: "5px 20px" }}>
              <Col
                xs={24}
                md={12}
                style={{
                  display: "flex",
                  alignItems: "left",
                  flexDirection: "column",
                }}
              >
                <h5
                  className="pageTitle"
                  style={{
                    fontSize: "16px",
                    margin: 10,
                    textTransform: "capitalize",
                    fontWeight: "normal",
                  }}
                >
                  Send To
                </h5>
                <Select
                  className="signupSelectBox"
                  suffixIcon={<FaCaretDown style={{ fontSize: "16px" }} />}
                  value={pushNotifcation.sentTo}
                  bordered={false}
                  onChange={(e) => {
                    handleChange("sentTo", e);
                  }}
                  options={[
                    {
                      value: "allUsers",
                      label: "All Users",
                    },
                    {
                      value: "allStudents",
                      label: "All Students",
                    },
                    {
                      value: "allTutors",
                      label: "All Tutors & Coaches",
                    },
                    {
                      value: "selectStudents",
                      label: "Select Students",
                    },
                    {
                      value: "selectTutors",
                      label: "Select Tutors & Coaches",
                    },
                  ]}
                />
              </Col>
            </Row>

           {pushNotifcation.sentTo == "selectStudents" && <Row style={{ padding: "5px 20px" }}>
              <Col
                xs={24}
                md={12}
                style={{
                  display: "flex",
                  alignItems: "left",
                  flexDirection: "column",
                }}
              >
                <h5
                  className="pageTitle"
                  style={{
                    fontSize: "16px",
                    margin: 10,
                    textTransform: "capitalize",
                    fontWeight: "normal",
                  }}
                >
                  Select Users
                </h5>
                <Select
                  showSearch
                  mode="multiple"
                  onSearch={(e) => getStudents(e)}
                  onChange={(e) => handleUserChange("selectedStudents",e)}
                  className="signupSelectBoxMultiple"
                  suffixIcon={<FaCaretDown style={{ fontSize: "16px" }} />}
                  bordered={false}
                >
                  {students.map((item) => {
                    return (
                      <Option
                        value={item.firstName + "/" + item._id}
                        label={item.firstName + " " + item.lastName}
                      >
                        {item.firstName + " " + item.lastName}
                      </Option>
                    );
                  })}
                </Select>
              </Col>
            </Row>}

            {pushNotifcation.sentTo == "selectTutors" && <Row style={{ padding: "5px 20px" }}>
              <Col
                xs={24}
                md={12}
                style={{
                  display: "flex",
                  alignItems: "left",
                  flexDirection: "column",
                }}
              >
                <h5
                  className="pageTitle"
                  style={{
                    fontSize: "16px",
                    margin: 10,
                    textTransform: "capitalize",
                    fontWeight: "normal",
                  }}
                >
                  Select Tutors & Coaches
                </h5>
                <Select
                  showSearch
                  mode="multiple"
                  onSearch={(e) => getUsers(e)}
                  onChange={(e) => handleUserChange("selectedTutors",e)}
                  className="signupSelectBoxMultiple"
                  suffixIcon={<FaCaretDown style={{ fontSize: "16px" }} />}
                  bordered={false}
                >
                  {users.map((item) => {
                    return (
                      <Option
                        value={item.firstName + "/" + item._id}
                        label={item.firstName + " " + item.lastName}
                      >
                        {item.firstName + " " + item.lastName}
                      </Option>
                    );
                  })}
                </Select>
              </Col>
            </Row>}

            <Row style={{ padding: "5px 20px" }}>
              <Col
                xs={24}
                md={12}
                style={{
                  display: "flex",
                  alignItems: "left",
                  flexDirection: "column",
                }}
              >
                <h5
                  className="pageTitle"
                  style={{
                    fontSize: "16px",
                    margin: 10,
                    textTransform: "capitalize",
                    fontWeight: "normal",
                  }}
                >
                  Descriptive Text
                </h5>

                <TextArea
                  className="signupTextField"
                  rows={4}
                  placeholder="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                  value={pushNotifcation?.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </Col>
            </Row>
            <Row style={{ padding: "20px" }}>
              <Button
                type="primary"
                shape="round"
                size={"large"}
                style={{ padding: "12px 40px", height: "auto" }}
                className="loginButton"
                onClick={() => addNotification()}
              >
                Post
              </Button>
            </Row>
          </>
        )}

        <br />
        <br />
      </div>

      <br />
      <br />
    </Layout>
  );
}
export default NotificationDetails;
