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
import { UPLOAD_URL , USERS } from "../../config/constants";
import { useNavigate,useParams } from "react-router-dom";
import { useSelector } from "react-redux";


function LearnerDetails() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const {id} = useParams()
  const [user,setUser]=useState(null);

  useEffect(() => {
    getUser();
  }, [])

  console.log("JJJJJ",window.location)
  

  const getUser = async () => {
    setLoading(true);
    const user = await Get(`${USERS.getStudentById}${id}`, token);
    console.log("userss",user)
    setUser(user.data);
    setLoading(false);
  };

  const handleStatus = async () => {
    try {
      const response = await Get(USERS.toggleStatus + user._id , token,{});
      const newUser = {...user};
      newUser.status = newUser.status =="ACTIVE" ? "INACTIVE" : "ACTIVE";
      
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
              Learner Details
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

        {!loading && user && (
          <>
            <Row style={{ padding: "10px 20px" }}>
              <Col
                xs={24}
                md={12}
                style={{ display: "flex", alignItems: "center" }}
              >
                {!user?.image ? (
                  <Avatar
                    size={140}
                    icon={<UserOutlined />}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  />
                ) : (
                  <Avatar size={140} src={UPLOAD_URL + user.image} />
                )}{" "}
                &emsp;
                <h1
                  className="pageTitle"
                  style={{ margin: 0, textTransform: "capitalize" }}
                >
                  {user?.fullname}
                </h1>
              </Col>
             
            </Row>
            <Row style={{ padding: "20px 30px" }}>
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
                  First Name
                </Typography.Title>
                <Typography.Text
                  className="fontFamily1"
                  style={{
                    fontSize: "14px",
                    color: "grey",
                    textAlign: "left",
                  }}
                >
                  {user?.firstName}
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
                  Last Name
                </Typography.Title>
                <Typography.Text
                  className="fontFamily1"
                  style={{
                    fontSize: "14px",
                    color: "grey",
                    textAlign: "left",
                  }}
                >
                  {user?.lastName}
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
                  Date of Birth
                </Typography.Title>
                <Typography.Text
                  className="fontFamily1"
                  style={{
                    fontSize: "14px",
                    color: "grey",
                    textAlign: "left",
                  }}
                >
                  {dayjs(user?.birthday).format("MM/DD/YYYY")}
                </Typography.Text>
              </Col>
            </Row>

            <Row style={{ padding: "20px 30px" }}>
              <Col xs={12} sm={12}>
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
                  Name of Parent/ Guardian
                </Typography.Title>
                <Typography.Text
                  className="fontFamily1"
                  style={{
                    fontSize: "14px",
                    color: "grey",
                    textAlign: "left",
                  }}
                >
                  {user?.parent}
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
                  Email Address
                </Typography.Title>
                <Typography.Text
                  className="fontFamily1"
                  style={{
                    fontSize: "14px",
                    color: "grey",
                    textAlign: "left",
                  }}
                >
                  {user?.email}
                </Typography.Text>
              </Col>
            </Row>

            <Row style={{ padding: "20px 30px" }}>
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
                  Phone Number
                </Typography.Title>
                <Typography.Text
                  className="fontFamily1"
                  style={{
                    fontSize: "14px",
                    color: "grey",
                    textAlign: "left",
                  }}
                >
                  {user?.phoneNumber}
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
                  Home Number
                </Typography.Title>
                <Typography.Text
                  className="fontFamily1"
                  style={{
                    fontSize: "14px",
                    color: "grey",
                    textAlign: "left",
                  }}
                >
                  {user?.homeNumber}
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
                  {user?.school}
                </Typography.Text>
              </Col>
            </Row>

            <Row style={{ padding: "20px 30px" }}>
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
                  Grade Level
                </Typography.Title>
                <Typography.Text
                  className="fontFamily1"
                  style={{
                    fontSize: "14px",
                    color: "grey",
                    textAlign: "left",
                  }}
                >
                  {user?.gradeLevel}
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
                  City
                </Typography.Title>
                <Typography.Text
                  className="fontFamily1"
                  style={{
                    fontSize: "14px",
                    color: "grey",
                    textAlign: "left",
                  }}
                >
                  {user?.city}
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
                  State
                </Typography.Title>
                <Typography.Text
                  className="fontFamily1"
                  style={{
                    fontSize: "14px",
                    color: "grey",
                    textAlign: "left",
                  }}
                >
                  {user?.state}
                </Typography.Text>
              </Col>
            </Row>

            <Row style={{ padding: "20px 30px" }}>
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
                  Zip Codes
                </Typography.Title>
                <Typography.Text
                  className="fontFamily1"
                  style={{
                    fontSize: "14px",
                    color: "grey",
                    textAlign: "left",
                  }}
                >
                  {user?.zip}
                </Typography.Text>
              </Col>

              <Col xs={12} sm={12}>
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
                  Interested Subjects
                </Typography.Title>
                <Typography.Text
                  className="fontFamily1"
                  style={{
                    fontSize: "14px",
                    color: "grey",
                    textAlign: "left",
                  }}
                >
                  {user?.subjects.join(" , ")}
                </Typography.Text>
              </Col>
            </Row>

            <Row style={{ padding: "20px" }}>
              {user.status == "ACTIVE" ? (
                <Button
                  type="primary"
                  htmlType="submit"
                  className="loginButton2"
                  onClick={() => setModalOpen(true)}
                  style={{ fontWeight: "bold" }}
                >
                  Inactive
                </Button>
              ) : (
                <Button
                  type="primary"
                  htmlType="submit"
                  className="loginButton"
                  onClick={() => setModalOpen(true)}
                  style={{ fontWeight: "bold" }}
                >
                  Acitve
                </Button>
              )}
              &emsp;
              <Button
                className="fontFamily1"
                style={{
                  marginTop: "0px",
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
              >
                Message
              </Button>
            </Row>
          </>
        )}
      </div>

      <Modal
        open={modalOpen}
        onOk={() => handleStatus()}
        onCancel={() => setModalOpen(false)}
        okText="Yes"
        className="StyledModal"
        style={{
          left: 0,
          right: 0,
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "center",
        }}
        cancelText="No"
        cancelButtonProps={{
          style: {
            border: "2px solid #203453",
            color: "#203453",
            height: "auto",
            padding: "6px 35px",
            borderRadius: "50px",
            fontSize: "16px",
            marginTop: "15px",
          },
        }}
        okButtonProps={{
          style: {
            backgroundColor: "#203453",
            color: "white",
            marginTop: "15px",
            height: "auto",
            padding: "5px 35px",
            borderRadius: "50px",
            fontSize: "16px",
            border: "2px solid #203453",
          },
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="89" height="77" viewBox="0 0 89 77" fill="none">
<g clip-path="url(#clip0_37_2211)">
<path d="M39.7398 40.8903H30.9475L25.2341 48.0488L19.5159 40.8903H10.7224C7.87865 40.8903 5.15136 39.759 3.14052 37.7453C1.12968 35.7316 0 33.0004 0 30.1526V10.7413C0 7.89346 1.12968 5.16227 3.14052 3.14855C5.15136 1.13484 7.87865 0.00354004 10.7224 0.00354004H39.7398C42.5836 0.00354004 45.3108 1.13484 47.3217 3.14855C49.3325 5.16227 50.4622 7.89346 50.4622 10.7413V30.1526C50.4622 31.5627 50.1849 32.9589 49.646 34.2617C49.1072 35.5645 48.3174 36.7482 47.3217 37.7453C46.326 38.7424 45.144 39.5333 43.8431 40.0729C42.5422 40.6126 41.1479 40.8903 39.7398 40.8903Z" fill="#005EB0"/>
<path d="M28.0915 26.4964H22.3733V16.9529H25.2324C25.8453 16.9529 26.4445 16.7709 26.9541 16.4299C27.4637 16.0889 27.8609 15.6042 28.0955 15.0371C28.3301 14.47 28.3914 13.846 28.2718 13.244C28.1523 12.642 27.8571 12.089 27.4237 11.655C26.9903 11.221 26.4381 10.9254 25.837 10.8057C25.2358 10.6859 24.6127 10.7474 24.0465 10.9823C23.4802 11.2172 22.9962 11.6149 22.6557 12.1253C22.3151 12.6356 22.1334 13.2357 22.1334 13.8495H16.4141C16.4141 12.2269 16.8605 10.6356 17.7043 9.25041C18.5482 7.86522 19.7568 6.73962 21.1975 5.99719C22.6383 5.25475 24.2554 4.92419 25.8714 5.04178C27.4875 5.15937 29.0399 5.72056 30.3584 6.66376C31.6768 7.60696 32.7102 8.8957 33.3453 10.3885C33.9803 11.8813 34.1923 13.5205 33.9581 15.126C33.7239 16.7316 33.0525 18.2415 32.0175 19.49C30.9826 20.7385 29.6242 21.6773 28.0915 22.2034V26.4964Z" fill="white"/>
<path d="M22.375 31.0995H28.0931V36.5133H22.375V31.0995Z" fill="white"/>
<path d="M78.2711 28.9512H50.4604V30.1525C50.4604 33.0004 49.3307 35.7316 47.3199 37.7453C45.309 39.759 42.5818 40.8903 39.738 40.8903H38.5312V59.1037C38.5312 60.5138 38.8086 61.9101 39.3474 63.2129C39.8863 64.5157 40.6761 65.6994 41.6718 66.6965C42.6674 67.6936 43.8495 68.4845 45.1504 69.0241C46.4513 69.5637 47.8456 69.8415 49.2537 69.8415H58.046L63.7641 77L69.4823 69.8415H78.2746C79.6827 69.8415 81.077 69.5637 82.3779 69.0241C83.6788 68.4845 84.8608 67.6936 85.8565 66.6965C86.8522 65.6994 87.642 64.5157 88.1808 63.2129C88.7197 61.9101 88.997 60.5138 88.997 59.1037V39.6925C88.997 38.282 88.7195 36.8853 88.1804 35.5822C87.6412 34.2791 86.851 33.0952 85.8548 32.0981C84.8586 31.1009 83.6761 30.3101 82.3746 29.7707C81.0732 29.2314 79.6784 28.9541 78.2699 28.9547L78.2711 28.9512Z" fill="#E82828"/>
<path d="M60.9062 36.1534H66.6244V41.572H60.9062V36.1534Z" fill="white"/>
<path d="M60.9062 46.4888H66.6244V62.6404H60.9062V46.4888Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_37_2211">
<rect width="89" height="77" fill="white"/>
</clipPath>
</defs>
</svg>
        <Typography.Title level={4} style={{ fontSize: "25px" }}>
          {user?.status == "ACTIVE" ? "Deactivate" : "Activate"}
        </Typography.Title>
        <Typography.Text style={{ fontSize: 16 }}>
          Do You Want To {user?.status == "ACTIVE" ? "Deactivate" : "Activate"}{" "}
          This User?
        </Typography.Text>
      </Modal>
    </Layout>
  );
}
export default LearnerDetails;
