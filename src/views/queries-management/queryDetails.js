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
import { UPLOAD_URL, QUERY } from "../../config/constants";
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

function QueryDetails() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
    const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [query, setQuery] = useState(null);

  useEffect(() => {
    getQuery();
  }, []);

  const getQuery = async () => {
    setLoading(true);
    const response = await Get(
      `${QUERY.getOne}${id}`,
      token
    );

    setQuery(response?.data?.query);
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
              Query Details
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

            {!loading && query && (<>

        <Row style={{ padding: "20px" }}>
          <Col xs={24} md={16}>
            <Row style={{ padding: "10px" }}>

              <Col xs={24} md={24}>
              <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    fontWeight: "normal",
                  }}
                >
                  Full Name{" "}
                </h5>
                <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    color: "#7a7e7f",
                    fontWeight: "normal",
                  }}
                >
                  {query?.name}
                </h5>
              </Col>
            </Row>
            <Row style={{ padding: "10px" }}>
              <Col xs={24} md={24}>
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
                  {query?.email}
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
                  {query?.subject}
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
                  {query?.message}
                </h5>
              </Col>
            
            </Row>

           
          </Col>
        </Row>
        
            </>)}


        
        <br />
        <br />
      </div>

     

      <br />
      <br />
    </Layout>
  );
}
export default QueryDetails;
