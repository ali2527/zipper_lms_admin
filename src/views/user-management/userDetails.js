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


function UserDetails() {
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
    const user = await Get(`${USERS.getOne}${id}`, token);
    console.log("userss",user)
    setUser(user.data);
    setLoading(false);
  };

  const handleStatus = async () => {
    try {
      const response = await Get(USERS.toggleStatus + "/" + user._id , token,{});
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
      <Row style={{ padding: "10px 20px" }}>
        <Col xs={24} md={12} style={{ display: "flex", alignItems: "center" }}>
          <FaArrowLeft
            style={{ fontWeight: "bold", fontSize: "20px" }}
            onClick={() => navigate(-1)}
          />
          &emsp;
          <h1 className="pageTitle" style={{ margin: 0 }}>
            Users Details
          </h1>
        </Col>
      </Row>
      <br />
      <div className="boxDetails2">
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
              <Col
                xs={24}
                md={12}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                {user && (
                  <Select
                    className={
                      user?.status == "ACTIVE" ? "greenSelect" : "redSelect"
                    }
                    suffixIcon={<FaCaretDown style={{ fontSize: "16px" }} />}
                    value={user?.status}
                    onChange={() => setModalOpen(true)}
                    style={{
                      fontSize: 16,
                    }}
                    bordered={false}
                    options={[
                      {
                        value: "ACTIVE",
                        label: "Active",
                      },
                      {
                        value: "INACTIVE",
                        label: "Inactive",
                      },
                    ]}
                  />
                )}
              </Col>
            </Row>
            <Row style={{ padding: "20px" }}>
              <Col xs={24} md={16}>
                <Row style={{ padding: "10px" }}>
                  <Col xs={24} md={12}>
                    <h5
                      style={{
                        display: "inline",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      Full Name:
                    </h5>
                  </Col>
                  <Col xs={24} md={12}>
                    <h5
                      style={{
                        display: "inline",
                        fontSize: 18,
                        color: "#7a7e7f",
                      }}
                    >
                      {user?.fullName}
                    </h5>
                  </Col>
                </Row>
                <Row style={{ padding: "10px" }}>
                  <Col xs={24} md={12}>
                    <h5
                      style={{
                        display: "inline",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      Email{" "}
                    </h5>
                  </Col>
                  <Col xs={24} md={12}>
                    <h5
                      style={{
                        display: "inline",
                        fontSize: 18,
                        color: "#7a7e7f",
                      }}
                    >
                      {user?.email}
                    </h5>
                  </Col>
                </Row>

                <Row style={{ padding: "10px" }}>
                  <Col xs={24} md={12}>
                    <h5
                      style={{
                        display: "inline",
                        fontSize: 18,
                        fontWeight: "bold",
                      }}
                    >
                      Phone No{" "}
                    </h5>
                  </Col>
                  <Col xs={24} md={12}>
                    <h5
                      style={{
                        display: "inline",
                        fontSize: 18,
                        color: "#7a7e7f",
                      }}
                    >
                      {user?.phoneNumber || "-"}
                    </h5>
                  </Col>
                </Row>

      
              </Col>
            </Row>

            <Row style={{ padding: "20px" }}>
                
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="loginButton"
                      onClick={() => navigate("/posts/"+id)}
                    >
                    
                     Posts
                    </Button>
                    &emsp;
                    <Button
                      className="fontFamily1"
                      style={{
                        marginTop: "0px",
                        padding: "10px 30px",
                        cursor: "pointer",
                        color: "black",
                        borderRadius: "50px",
                        height: "auto",
                        border: "1px solid #203657",
                        fontWeight: "bold",
                      }}
                      ghost
                      size="large"
                      onClick={() => navigate("/gallery/"+id)}
                    >
                       
                      Gallery
                    </Button>
                 
              
              </Row>
          
          </>
        )}

        <br />
        <br />
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
            border: "2px solid #3d1c6f",
            color: "#3d1c6f",
            height: "auto",
            padding: "6px 35px",
            borderRadius: "50px",
            fontSize: "16px",
            marginTop: "15px",
          },
        }}
        okButtonProps={{
          style: {
            backgroundColor: "#3d1c6f",
            color: "white",
            marginTop: "15px",
            height: "auto",
            padding: "5px 35px",
            borderRadius: "50px",
            fontSize: "16px",
            border: "2px solid #3d1c6f",
          },
        }}
      >
        <Image
          src="../images/question.png"
          preview={false}
          width={100}
          height={120}
        />
        <Typography.Title level={4} style={{ fontSize: "25px" }}>
          {user?.status == "ACTIVE" ? "Deactivate" : "Activate"}
        </Typography.Title>
        <Typography.Text style={{ fontSize: 16 }}>
          Do You Want To {user?.status == "ACTIVE" ? "Deactivate" : "Activate"}{" "}
          This User?
        </Typography.Text>
      </Modal>

      <br />
      <br />
    </Layout>
  );
}
export default UserDetails;
