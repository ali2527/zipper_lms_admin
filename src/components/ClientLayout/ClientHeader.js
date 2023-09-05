import React, { useState } from "react";
import { Image, Badge, Avatar, Dropdown, Popover, Alert,Modal } from "antd";
import { MdMenu } from "react-icons/md";
import { AiFillCaretDown, AiFillApple } from "react-icons/ai";
import { FaBars, FaEllipsisV, FaUser, FaSignOutAlt } from "react-icons/fa";
import {
  Layout,
  Row,
  Col,
  Menu,
  Button,
  Drawer,
  Input,
  Typography,
  message,
} from "antd";
// import { useRouter } from "next/router";
import MainButton from "../MainButton";
// import Link from "next/link";
import { FaBell } from "react-icons/fa";


import { UPLOAD_URL,AUTH } from "../../config/constants";
import { useSelector,useDispatch } from "react-redux";

import {Get} from "../../config/api/get";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../../redux/slice/authSlice";
import logo from "../../assets/images/logo2.png"
import bg from "../../assets/images/logo.png"

const { Header } = Layout;



const ClientHeader = ({ visible, setVisible, visible2, setVisible2 }) => {
  const [logoutModal, setLogoutModal] = useState(false);
  const [path, setPath] = useState(
    window.location.pathname.slice(1, window.location.pathname.length)
  );
  const user = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.userToken);

  console.log("usersss", user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    setLogoutModal(true);

    Get(AUTH.logout, token)
      .then((response) => {
        console.log(">><><>", response);
        if (response?.response?.status === 401) {
          message.error(
            response.response.data.message || "Something went wrong"
          );
        } else {
          dispatch(removeUser());
          navigate("/signin");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const items = [
    {
      key: "1",
      label: (
        <div
          className="headerDropdown"
          style={{
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            padding: "5px 12px",
          }}
          onClick={() => navigate("/profile")}
        >
          <FaUser style={{ fontSize: "16px" }} /> &nbsp; My Profile
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          style={{
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            padding: "5px 12px",
          }}
          onClick={() => setLogoutModal(true)}
        >
          <FaSignOutAlt style={{ fontSize: "16px" }} />
          &nbsp; Logout
        </div>
      ),
    },
  ];

  const content = (
    <div style={{ width: "350px" }}>
      <div
        style={{
          padding: "10px 20px",
          display: "flex",
          fontSize:"20px",
          fontWeight:"bold",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Notifications</h3>
      
      </div>
      <hr
        style={{
          borderLeft: "none",
          borderBottom: "none",
          borderRight: "none",
          borderTop: "1px solid rgb(0 0 0 / 15%)",
        }}
      />
      <div style={{ height: "250px", overflow: "auto" }}>
        <div style={{ padding: 10 }}>
        <Row style={{ flexDirection: "row", justifyContent: "space-between",padding:10, borderBottom:"1px solid #dadada" }}>
          
            <Col>
              <p class="notificationText">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id nam
                veniam aperiam eveniet mollitia quos nemo! Officiis voluptates
                illo delectus.
              </p>
              <div style={{display:'flex',justifyContent:'space-between',flexDirection:"row"}}>
              <p class="notificationText" style={{color:'black',fontSize:"12px", fontWeight:"bold"}}>
                25, May 2023
              </p>
              <p class="notificationText" style={{color:'black',fontSize:"12px", fontWeight:"bold"}}>
                10:23 PM
              </p>
                </div>
            </Col>
          </Row>
        </div>

        <div style={{ padding: 10 }}>
          <Row
            style={{ flexDirection: "row", justifyContent: "space-between",padding:10, borderBottom:"1px solid #dadada" }}
          >
          
            <Col>
              <p class="notificationText">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id nam
                veniam aperiam eveniet mollitia quos nemo! Officiis voluptates
                illo delectus.
              </p>
              <div style={{display:'flex',justifyContent:'space-between',flexDirection:"row"}}>
              <p class="notificationText" style={{color:'black',fontSize:"12px", fontWeight:"bold"}}>
                25, May 2023
              </p>
              <p class="notificationText" style={{color:'black',fontSize:"12px", fontWeight:"bold"}}>
                10:23 PM
              </p>
                </div>
            </Col>
          </Row>
        </div>

        <div style={{ padding: 10 }}>
        <Row
            style={{ flexDirection: "row", justifyContent: "space-between",padding:10, borderBottom:"1px solid #dadada" }}
          >
          
            <Col>
              <p class="notificationText">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id nam
                veniam aperiam eveniet mollitia quos nemo! Officiis voluptates
                illo delectus.
              </p>
              <div style={{display:'flex',justifyContent:'space-between',flexDirection:"row"}}>
              <p class="notificationText" style={{color:'black',fontSize:"12px", fontWeight:"bold"}}>
                25, May 2023
              </p>
              <p class="notificationText" style={{color:'black',fontSize:"12px", fontWeight:"bold"}}>
                10:23 PM
              </p>
                </div>
            </Col>
          </Row>
        </div>
      </div>

      <hr
        style={{
          borderLeft: "none",
          borderBottom: "none",
          borderRight: "none",
          borderTop: "1px solid rgb(0 0 0 / 15%)",
        }}
      />

      <div
        style={{
          padding: "10px 20px",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button type="link">View All</Button>
      </div>
    </div>
  );

  console.log(">>>>>>>>>.....", user);

  return (
    <>
      <Row>
        <Col xs={0} md={24}>
          <Header
          className="header"
            style={{
              height: "12vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              padding: "25px 60px",
            }}
          >
          
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Popover
                content={content}
                placement="bottomRight"
                arrow={false}
                className="headerPopover"
              >
                <Badge count={0} style={{ backgroundColor: "#7e5bb2" }}>
                  <FaBell style={{ fontSize: "25px",color:"white", }} />
                </Badge>
              </Popover>
              &emsp; &emsp;
              <Avatar
                size={40}
                src={
                  !user.image ? "/images/avatar.png" : UPLOAD_URL + user.image
                }
              />
              <Dropdown
                menu={{
                  items,
                }}
                trigger={["click"]}
                placement="bottomRight"
              >
                <p
                  style={{
                    marginLeft: 10,
                    color:"white",
                    fontSize: "16px",
                    fontWeight:"bold",
                    textTransform: "capitalize",
                    cursor:"pointer"
                  }}
                >
                  {user?.firstName + " " + user?.lastName} <AiFillCaretDown fontSize={12} style={{color:"white"}} />{" "}
                </p>
              </Dropdown>
            </div>
          </Header>
        </Col>
      </Row>

      <Row>
        <Col xs={24} md={0}>
          <Header
          className="header"
            style={{
              height: "10vh",
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              padding: "15px 35px",
            }}
          >
            <Row
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FaEllipsisV
                  style={{ fontSize: 22, color: "white" }}
                  onClick={() => setVisible2(!visible2)}
                />
              </Col>
              <Col>
                <a href={"/"}>
                  <Image
                    preview={false}
                    alt={"Failed to load image"}
                    src={logo}
                    style={{ maxWidth: 120 }}
                  />
                </a>
              </Col>
              <Col
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FaBars
                  style={{ fontSize: 22, color: "white" }}
                  onClick={() => setVisible(!visible)}
                />
              </Col>
            </Row>
          </Header>
        </Col>
      </Row>

      <Modal
        visible={logoutModal}
        onOk={() => logout()}
        onCancel={() => setLogoutModal(false)}
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
        
        <Typography.Title level={4} style={{ fontSize: "25px" }}>
          Logout
        </Typography.Title>
        <Typography.Text style={{ fontSize: 16 }}>
          Are You Sure You Want To Logout ?
        </Typography.Text>
      </Modal>
    </>
  );
};

export default ClientHeader;
