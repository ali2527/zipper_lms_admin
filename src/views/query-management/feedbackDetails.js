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
  DatePicker,
  Skeleton,
} from "antd";
import dayjs from "dayjs";
import { UserOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { FaCaretDown, FaFilter, FaArrowLeft } from "react-icons/fa";
import { Get } from "../../config/api/get";
import { UPLOAD_URL, FEEDBACK } from "../../config/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function SPDetails() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    getFeedback();
  }, []);

  const getFeedback = async () => {
    setLoading(true);
    const feedback = await Get(
      `${FEEDBACK.getOne}${id}`,
      token
    );

    setFeedback(feedback);
    setLoading(false);
  };

  const handleStatus = async () => {
    try {
      const response = await Get(
        FEEDBACK.toggleStatus + "/" + feedback._id,
        token,
        {}
      );
      const newUser = { ...feedback };

      newUser.isActive = !feedback.isActive;
      setModalOpen(false);
      setFeedback(newUser);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Layout className="configuration">
      <div className="boxDetails">
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
              Feedback Details
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
            <Skeleton active  paragraph={{ rows:10 }} />
          </div>
        )
            }

            {!loading && feedback && (<>

        <Row style={{ padding: "20px" }}>
          <Col xs={24} md={16}>
            <Row style={{ padding: "10px" }}>
              <Col xs={24} md={12}>
                <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    fontWeight: "normal",
                  }}
                >
                  Name{" "}
                </h5>
                <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    color: "#7a7e7f",
                    fontWeight: "normal",
                  }}
                >
                  {feedback?.name}
                </h5>
              </Col>
              <Col xs={24} md={12}>
              <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    fontWeight: "normal",
                  }}
                >
                  Email Address{" "}
                </h5>
                <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    color: "#7a7e7f",
                    fontWeight: "normal",
                  }}
                >
                  {feedback?.email}
                </h5>
              </Col>
            </Row>
            <Row style={{ padding: "10px" }}>
              <Col xs={24} md={12}>
              <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    fontWeight: "normal",
                  }}
                >
                  Phone Number{" "}
                </h5>
                <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    color: "#7a7e7f",
                    fontWeight: "normal",
                  }}
                >
                  {feedback?.phone}
                </h5>
              </Col>
              <Col xs={24} md={12}>
              <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    fontWeight: "normal",
                  }}
                >
                  Subject
                </h5>
                <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    color: "#7a7e7f",
                    fontWeight: "normal",
                  }}
                >
                  {feedback?.subject}
                </h5>
              </Col>
            </Row>

            <Row style={{ padding: "10px" }}>
              <Col xs={24} md={12}>
              <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    fontWeight: "normal",
                  }}
                >
                  Message{" "}
                </h5>
                <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    color: "#7a7e7f",
                    fontWeight: "normal",
                  }}
                >
                  {feedback?.message}
                </h5>
              </Col>
            
            </Row>

           
          </Col>
        </Row>
        
            </>)}


        
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
        <Image
          src="../images/question.png"
          preview={false}
          width={100}
          height={120}
        />
        <Typography.Title level={4} style={{ fontSize: "25px" }}>
          {feedback?.isActive ? "Deactivate" : "Activate"}
        </Typography.Title>
        <Typography.Text style={{ fontSize: 16 }}>
        Do you want to  {feedback?.isActive ? "Deactivate" : "Activate"} This User?
        </Typography.Text>
      </Modal>


      <br />
      <br />
    </Layout>
  );
}
export default SPDetails;
