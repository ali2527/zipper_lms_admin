import React, { useEffect, useLayoutEffect, useState } from "react";
// import Head from "next/head";
// import Image from "next/image";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

// import router from "next/router";
import { Breadcrumb, Layout, Menu, theme, Row, Col, Drawer,Image } from "antd";
import { AiFillCaretDown, AiFillApple } from "react-icons/ai";
import { Badge, Avatar, Dropdown, Popover, Alert, Button } from "antd";
import { FaBars, FaEllipsisV, FaUser, FaSignOutAlt } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import { SITE_NAME } from "../../config/constants";
import "../../styles/Home.module.css";
import ClientHeader from "./ClientHeader";
import side1 from  "../../assets/images/dashboard.png"
import side2 from  "../../assets/images/user-management.png"
import side3 from  "../../assets/images/subscription-management.png"
import side4 from  "../../assets/images/appointment-logs.png"
import side5 from  "../../assets/images/property-management.png"
import side6 from  "../../assets/images/chat.png"
import logo from "../../assets/images/logo.png"
import { HiOutlineSquares2X2,HiOutlineDocumentText,HiOutlineCalendar } from "react-icons/hi2";
import {FiUser,FiMonitor} from "react-icons/fi"
import {BsClipboard,BsChatLeft,BsQuestionSquare} from "react-icons/bs"
import {TfiLayoutListThumb} from "react-icons/tfi"
import {CgPlayListCheck} from "react-icons/cg"
import {SlWallet} from "react-icons/sl"
import {BiNotification,BiListCheck} from "react-icons/bi"
const { Header, Content, Sider } = Layout;


const sideNavItems = [
  { key: 1, icon: <HiOutlineSquares2X2 style={{fontSize:20}}/>, label: "Dashboard", path: "/" },
  {
    key: 2,
    icon: <FiUser style={{fontSize:20}}/>,
    label: "Learner Management",
    path: "/learner-management",
  },
  {
    key: 3,
    icon: <BsClipboard style={{fontSize:18}}/>,
    label: "Tutor/Coach Management",
    path: "/tutor-coach-management",
  },
  {
    key: 4,
    icon: <HiOutlineDocumentText style={{fontSize:20}}/>,
    label: "Comission Management",
    path: "/comission-management",
  },
  {
    key: 5,
    icon: <FiMonitor style={{fontSize:18}}/>,
    label: "Live Lessons",
    path: "/live-lessons",
  },
  {
    key: 6,
    icon: <TfiLayoutListThumb style={{fontSize:18}}/>,
    label: "Upcoming Lessons",
    path: "/upcoming-lessons",
  },
  {
    key: 7,
    icon: <BsChatLeft style={{fontSize:18}}/>,
    label: "Completed Lessons",
    path: "/completed-lessons",
  },
  {
    key: 8,
    icon: <BiListCheck style={{fontSize:28}}/>,
    label: "Submitted Lessons",
    path: "/submitted-lessons",
  },
  {
    key: 9,
    icon: <HiOutlineCalendar style={{fontSize:20}}/>,
    label: "Calander",
    path: "/calander",
  },
  {
    key: 10,
    icon: <SlWallet style={{fontSize:18}}/>,
    label: "Payment Logs",
    path: "/feedback-management",
  },
  {
    key: 11,
    icon: <BiNotification style={{fontSize:18}}/>,
    label: "Push Notifications",
    path: "/notifications",
  },
  {
    key: 12,
    icon: <BsQuestionSquare style={{fontSize:18}}/>,
    label: "Queries",
    path: "/feedback-management",
  },

]

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

const ClientLayout = ({ children, head }) => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [selectedItem, setSelectedItem] = useState("1");
  const navigate = useNavigate();

  useLayoutEffect(() => {
    // get the path and set selected item to key of the path that matches
    const path = window.location.pathname;
    const item = sideNavItems.find((item) => item.path == path);
    if (item) {
      setSelectedItem(item.key.toString());
    }
  }, []);

  let title = head?.title ? head?.title : "";
  if (title) {
    title = `${SITE_NAME} | ${title}`;
  } else {
    title = SITE_NAME;
  }

  // set the page title
  useEffect(() => {
    document.title = title;
  }, [title]);

  const containerStyle = {
    position: "relative",
    height: 200,
    padding: 48,
    overflow: "hidden",
    textAlign: "center",
  };

  return (
    <Layout style={{ backgroundColor: "white", scrollBehavior: "smooth" ,height:'100vh'}}>
     
     

      <Layout style={{ height: "100vh" }}>
        <Row
          className="siderWrapper"
          style={{
            background: "green",
          }}
        >
          <Col xs={0} md={24}>
            <Sider
              width={280}
              className="mainSider"
            >
              <br/>
              <div className="logoBox">
              <Image
                src={logo}
                alt="Picture of the author"
                style={{maxWidth:"130px"}}
                preview={false}
              />
              </div>
              <br/>
              <Menu
                mode="inline"
                selectedKeys={[selectedItem]}
                style={{
                  height: "100%",
                  borderRight: 0,
                  background:'transparent'
                }}
              >
                {sideNavItems.map((item) => (
                  <Menu.Item
                    key={item.key}
                    icon={item.icon}
                    onClick={() => {
                      navigate(item.path);
                      setSelectedItem(item.key.toString());
                    }}
                  >
                    {item.label}
                  </Menu.Item>
                ))}
              </Menu>
            </Sider>
          </Col>
        </Row>

        <Layout
          style={{
            padding: "0px",
            // height:"100vh",
            // overflow: "auto",
            backgroundColor: "#f4f4f4",
            position: "relative",
            outline: "none",
          }}
        >
          <ClientHeader
        visible={visible}
        setVisible={setVisible}
        visible2={visible2}
        setVisible2={setVisible2} 
      />
          {visible2 && (
            <div
              style={{
                width: "100%",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            >
              <Row style={{ alignItems: "flex-end" }}>
                <Col xs={24} md={0}>
                  <div
                    style={{
                      backgroundColor: "#203453",
                      padding: "20px",
                      display: "flex",position:'absolute',
                      zIndex:2,
                      width:"100%",
                      justifyContent: "flex-end",
                      transition: "all 0.5s ease-in-out",
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
                        placement="bottom"
                        arrow={false}
                        className="headerPopover"
                      >
                        <Badge count={5} style={{ backgroundColor: "#203453" }}>
                          <FiBell
                            style={{ fontSize: "25px", color: "white" }}
                          />
                        </Badge>
                      </Popover>
                      &emsp; &emsp;
                      <Avatar size={40} src="/images/avatar.png" />
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
                            fontSize: "16px",
                            color: "white",
                          }}
                        >
                          Masooma Albert <AiFillCaretDown fontSize={12} />{" "}
                        </p>
                      </Dropdown>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          )}
            <Layout
          style={{
            padding: "0px",
            // height:"100vh",
            overflow: "auto",
            backgroundColor: "#f4f4f4",
            position: "relative",
            outline: "none",
          }}
        >

          {children}

        </Layout>


          <Drawer
            className="drawer"
            placement={"left"}
            size={"default"}
            closable={false}
            onClose={() => setVisible(false)}
            visible={visible}
            getContainer={false}
            key={"drawer"}
          >
            <Menu
              mode="inline"
              selectedKeys={[selectedItem]}
              style={{
                height: "100%",
                borderRight: 0,
              }}
            >
              {sideNavItems.map((item) => (
                <Menu.Item
                  key={item.key}
                  icon={item.icon}
                  onClick={() => {
                    navigate(item.path);
                    setSelectedItem(item.key.toString());
                  }}
                >
                  {item.label}
                </Menu.Item>
              ))}
            </Menu>
          </Drawer>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ClientLayout;
