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
import { UPLOAD_URL, SERVICE_PROVIDERS } from "../../config/constants";
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
  const [serviceProvider, setServiceProvider] = useState(null);

  useEffect(() => {
    getServiceProvider();
  }, []);

  const getServiceProvider = async () => {
    setLoading(true);
    const serviceProvider = await Get(
      `${SERVICE_PROVIDERS.getOne}${id}`,
      token
    );

    setServiceProvider(serviceProvider);
    setLoading(false);
  };

  const handleStatus = async () => {
    try {
      const response = await Get(
        SERVICE_PROVIDERS.toggleStatus + "/" + serviceProvider._id,
        token,
        {}
      );
      const newUser = { ...serviceProvider };

      newUser.isActive = !serviceProvider.isActive;
      setModalOpen(false);
      setServiceProvider(newUser);
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
              Service Provider Profile
            </h1>
          </Col>
          <Col
            xs={24}
            md={12}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {serviceProvider && (
              <Select
                className={
                  serviceProvider?.isActive ? "greenSelect" : "redSelect"
                }
                suffixIcon={<FaCaretDown style={{ fontSize: "16px" }} />}
                value={serviceProvider?.isActive ? "active" : "inactive"}
                onChange={() => setModalOpen(true)}
                style={{
                  fontSize: 16,
                }}
                bordered={false}
                options={[
                  {
                    value: "active",
                    label: "Activate",
                  },
                  {
                    value: "inactive",
                    label: "Deactivate",
                  },
                ]}
              />
            )}
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

            {!loading && serviceProvider && (
              <>
              <Row style={{ padding: "10px 20px" }}>
          <Col
            xs={24}
            md={12}
            style={{ display: "flex", alignItems: "center" }}
          >
            <Avatar
              size={100}
              icon={
                !serviceProvider?.image ? (
                  <UserOutlined />
                ) : (
                  <Avatar size={50} src={UPLOAD_URL + serviceProvider.image} />
                )
              }
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
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
            <h1 className="pageTitle" style={{ margin: 0 }}>
              {serviceProvider?.followers || 0}{" "}
            </h1>
            <p>Followers</p>
          </Col>
        </Row>
        <Row style={{ padding: "20px" }}>
          <Col xs={24} md={16}>
            <Row style={{ padding: "10px" }}>
              <Col xs={24} md={12}>
                <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    fontWeight: 600,
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
                  {serviceProvider?.fullname}
                </h5>
              </Col>
              <Col xs={24} md={12}>
                <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    fontWeight: 600,
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
                  {serviceProvider?.email}
                </h5>
              </Col>
            </Row>
            <Row style={{ padding: "10px" }}>
              <Col xs={24} md={12}>
                <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    fontWeight: 600,
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
                  {serviceProvider?.phone_no}
                </h5>
              </Col>
              <Col xs={24} md={12}>
                <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    fontWeight: 600,
                  }}
                >
                  Location{" "}
                </h5>
                <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    color: "#7a7e7f",
                    fontWeight: "normal",
                  }}
                >
                  {serviceProvider?.country || "-"}
                </h5>
              </Col>
            </Row>

            <Row style={{ padding: "10px" }}>
              <Col xs={24}>
                <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    fontWeight: 600,
                  }}
                >
                  Bio{" "}
                </h5>
                <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    color: "#7a7e7f",
                    fontWeight: "normal",
                  }}
                >
                  {serviceProvider?.bio || "-"}
                </h5>
              </Col>
            </Row>

            <Row style={{ padding: "10px" }}>
              <Col xs={24} md={12}>
                <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    fontWeight: 600,
                  }}
                >
                  Profession{" "}
                </h5>
                <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    color: "#7a7e7f",
                    fontWeight: "normal",
                  }}
                >
                  {serviceProvider?.profession || "-"}
                </h5>
              </Col>
              <Col xs={24} md={12}>
                <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    fontWeight: 600,
                  }}
                >
                  Subscription Type
                </h5>
                <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    color: "#7a7e7f",
                    fontWeight: "normal",
                  }}
                >
                  {serviceProvider?.subscription_type || "-"}
                </h5>
              </Col>
            </Row>

            <Row style={{ padding: "10px" }}>
              <Col xs={24} md={12}>
                <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    fontWeight: 600,
                  }}
                >
                  Free Services
                </h5>
                <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    color: "#7a7e7f",
                    fontWeight: "normal",
                  }}
                >
                  {serviceProvider?.services.length == 0
                    ? "No Free Services"
                    : serviceProvider?.services
                        .filter((item) => item.service_type.isPaid)
                        .map((service) => service.name)}
                </h5>
              </Col>
              <Col xs={24} md={12}>
                <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    fontWeight: 600,
                  }}
                >
                  Permium Services
                </h5>
                <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    color: "#7a7e7f",
                    fontWeight: "normal",
                  }}
                >
                  {serviceProvider?.services.length == 0
                    ? "No Premium Services"
                    : serviceProvider?.services
                        .filter((item) => !item.service_type.isPaid)
                        .map((service) => service.name)}
                </h5>
              </Col>
            </Row>
          </Col>
        </Row>
        {serviceProvider?.experiences?.length > 0 && (
          <>
            <Row style={{ padding: "10px 20px" }}>
              <Col
                xs={24}
                md={12}
                style={{ display: "flex", alignItems: "center" }}
              >
                <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    fontWeight: 600,
                  }}
                >
                  Experiances
                </h5>
              </Col>
            </Row>

            <Row style={{ padding: "5px 20px 20px" }}>
              <Col xs={24} md={16}>
                {serviceProvider?.experiences.map((item, index) => {
                  return (
                    <>
                      <Row
                        style={{
                          padding: "10px",
                          borderLeft: "1px solid #dadada",
                        }}
                      >
                        <Col xs={24} md={12}>
                          <h5
                            style={{
                              fontSize: 14,
                              fontWeight: "normal",
                              color: "black",
                              marginBottom: 10,
                            }}
                          >
                            {item?.company}
                          </h5>
                          <h5
                            style={{
                              fontSize: 14,
                              fontWeight: "normal",
                              color: "#7a7e7f",
                              marginBottom: 10,
                            }}
                          >
                            {item?.jobType}{" "}
                            {item?.isCurrent
                              ? dayjs(item?.startDate).diff(dayjs(), "year") +
                                " years"
                              : Math.floor(
                                  dayjs(item?.startDate).diff(
                                    dayjs(item?.endDate),
                                    "months"
                                  ) / 12
                                ) + " years"}
                          </h5>
                          <h5
                            style={{
                              fontSize: 14,
                              fontWeight: "normal",
                              color: "#7a7e7f",
                              marginBottom: 10,
                            }}
                          >
                            {dayjs(item?.startDate).format("MMM YYYY")} -{" "}
                            {item?.isCurrent
                              ? "Present"
                              : dayjs(item?.endDate).format("MMM YYYY")}
                          </h5>
                          <h5
                            style={{
                              fontSize: 14,
                              fontWeight: "normal",
                              color: "#7a7e7f",
                            }}
                          >
                            {item?.description}
                          </h5>
                        </Col>
                      </Row>
                      <br />
                    </>
                  );
                })}
              </Col>
            </Row>
          </>
        )}

        {serviceProvider?.availability.length > 0 && (
          <>
            <Row style={{ padding: "10px 20px" }}>
              <Col
                xs={24}
                md={12}
                style={{ display: "flex", alignItems: "center" }}
              >
                <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    fontWeight: 600,
                  }}
                >
                  Availability
                </h5>
              </Col>
            </Row>

            <Row style={{ padding: "10px 20px" }}>
              <Col
                xs={24}
                md={14}
                style={{ display: "flex", alignItems: "center" }}
              >
                <table
                  className="table"
                  style={{ border: "1px solid #dee2e6", width: "100%" }}
                >
                  <thead
                    style={{
                      backgroundColor: "#203453",
                      color: "white",
                      textAlign: "center",
                      fontSize: "20px",
                    }}
                  >
                    <tr>
                      <th style={{ padding: "10px" }}>Days</th>
                      <th>From</th>
                      <th>To</th>
                    </tr>
                  </thead>
                  <tbody
                    style={{
                      color: "#a49a92",
                      textAlign: "center",
                      fontSize: "14px",
                    }}
                  >
                    {serviceProvider.availability
                      .sort((a, b) => a.dayOfWeek - b.dayOfWeek)
                      .map((item) => {
                        return (
                          <tr>
                            <td style={{ padding: "10px" }}>
                              {days[item.dayOfWeek]}
                            </td>
                            <td>{dayjs(item.startTime).format("hh:mm A")}</td>
                            <td>{dayjs(item.endTime).format("hh:mm A")}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </Col>
            </Row>
          </>
        )}

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
          {serviceProvider?.isActive ? "Deactivate" : "Activate"}
        </Typography.Title>
        <Typography.Text style={{ fontSize: 16 }}>
          Do You Want To {serviceProvider?.isActive ? "Deactivate" : "Activate"}{" "}
          This User?
        </Typography.Text>
      </Modal>

      <br />
      <br />
    </Layout>
  );
}
export default SPDetails;
