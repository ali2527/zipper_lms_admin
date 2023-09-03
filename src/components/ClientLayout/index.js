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


const { Header, Content, Sider } = Layout;


const sideNavItems = [
  { key: 1, icon: side1, label: "Dashboard", path: "/" },
  {
    key: 2,
    icon: side2,
    label: "User",
    path: "/user-management",
  },
  {
    key: 3,
    icon: side3,
    label: "Subscription",
    path: "/subscription-management",
  },
  {
    key: 4,
    icon: side4,
    label: "Contest",
    path: "/contest-management",
  },

  {
    key: 5,
    icon: side6,
    label: "Payment Logs",
    path: "/payment-logs",
  },
  {
    key: 6,
    icon: side5,
    label: "Feedbacks",
    path: "/feedback-management",
  },

].map((item, index) => {
  return {
    key: item.key,
    icon: (
      <Image
        src={item.icon}
        alt="Picture of the author"
        preview={false}
        style={{paddingRight:"10px"}}
      />
    ),
    label: item.label,
    path: item.path,
  };
});

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
    <Layout style={{ backgroundColor: "white", scrollBehavior: "smooth" }}>
     
      <ClientHeader
        visible={visible}
        setVisible={setVisible}
        visible2={visible2}
        setVisible2={setVisible2} 
      />

      <Layout style={{ height: "88vh" }}>
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
            padding: "30px",
            overflow: "auto",
            backgroundColor: "#f4f4f4",
            position: "relative",
            outline: "none",
          }}
        >
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
                      backgroundColor: "#3d1c6f",
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
                        <Badge count={5} style={{ backgroundColor: "#3d1c6f" }}>
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

          {children}

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
