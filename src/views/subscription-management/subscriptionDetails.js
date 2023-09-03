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
  InputNumber,
  Skeleton,
  message,
} from "antd";
import dayjs from "dayjs";
import { UserOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { FaCaretDown, FaFilter, FaArrowLeft } from "react-icons/fa";
import { Get } from "../../config/api/get";
import { UPLOAD_URL, SUBSCRIPTION } from "../../config/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Post } from "../../config/api/post";

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
  const { TextArea } = Input;
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState({});
  const { mode,id } = useParams();
  const [subscriptions, setSubscriptions] = useState({});

  useEffect(() => {
    if(id){
      getSubscription();
    }
  }, []);

  const getSubscription = async () => {
    setLoading(true);
    const subscriptions = await Get(
      `${SUBSCRIPTION.getOne}${id}`,
      token
    );

    setSubscription(subscriptions.data);
    setLoading(false);
  };


  const addSubscription = async () => {

    try {
      const response = await Post(SUBSCRIPTION.create,subscription, token);

      if(response.status === 200){
        message.success("Subscription Created Successfully");
        navigate(-1);
      }


      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };


  const updateSubscription = async () => {
    try {
      const response = await Post(
        SUBSCRIPTION.edit + id,
        subscription,
        token,
        {}
      );

      if(response.status === 200){
        message.success("Subscription Updated Successfully");
        navigate(-1);
      }

      console.log(response);
     
     
    } catch (error) {
      console.log(error.message);
    }
  };



  const handleStatus = async () => {
    try {
      const response = await Get(
        SUBSCRIPTION.toggleStatus + "/" + subscriptions._id,
        token,
        {}
      );
      const newUser = { ...subscriptions };

      newUser.isActive = !subscriptions.isActive;
      setModalOpen(false);
      setSubscriptions(newUser);
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
            {id ? (mode == "view" ? "Package Details" : "Edit Subscription Package" ) :"Create New Subscription Package"}
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

        {!loading && subscriptions && (
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
                  className="pageTitle2"
                  style={{
                    fontSize: "16px",
                    margin: 10,
                    textTransform: "capitalize",
                  }}
                >
                  Package Name
                </h5>
                {mode == "view" ? <h4
                  className="pageTitle2"
                  style={{
                    fontSize: "14px",
                    margin: "10px 20px",
                    color:"grey",
                    textTransform: "capitalize",
                  }}
                >
                  {subscription?.title}
                </h4>:
                <Input
                  style={{ width: "100%" }}
                  className="mainInput dashInput"
                  placeholder="Enter Package Name"
                  value={subscription?.title}
                  onChange={(e) =>
                    setSubscription({ ...subscription, title: e.target.value })
                  }
                />}
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
                  className="pageTitle2"
                  style={{
                    fontSize: "16px",
                    margin: 10,
                    textTransform: "capitalize",
                  }}
                >
                  Package price
                </h5>
                {mode == "view" ? <h4
                  className="pageTitle2"
                  style={{
                    fontSize: "14px",
                    margin: "10px 20px",
                    color:"grey",
                    textTransform: "capitalize",
                  }}
                >
                  ${subscription?.price}
                </h4>:
                <InputNumber
                size="small"
                  style={{ width: "100%" }}
                  className="mainInput dashInput"
                  placeholder="Enter Package Price"
                  value={subscription?.price}
                  onChange={(e) =>
                    setSubscription({ ...subscription, price: e })
                  }
                />}
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
                  className="pageTitle2"
                  style={{
                    fontSize: "16px",
                    margin: 10,
                    textTransform: "capitalize",
                  }}
                >
                  Package Duration
                </h5>

                {mode == "view" ? <h4
                  className="pageTitle2"
                  style={{
                    fontSize: "14px",
                    margin: "10px 20px",
                    color:"grey",
                    textTransform: "capitalize",
                  }}
                >
                  {subscription?.durationInDays} Days
                </h4>:
                <InputNumber
                size="small"
                  style={{ width: "100%" }}
                  className="mainInput dashInput"
                  placeholder="Enter Package Duration in Days"
                  value={subscription?.durationInDays}
                  onChange={(e) =>
                    setSubscription({ ...subscription, durationInDays: e })
                  }
                />}
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
                  className="pageTitle2"
                  style={{
                    fontSize: "16px",
                    margin: 10,
                    textTransform: "capitalize",
                  }}
                >
                  Features
                </h5>

                {mode == "view" ? <>{ subscription?.features && subscription?.features?.map((item) => {
                  return(<h4
                    className="pageTitle2"
                    style={{
                      fontSize: "14px",
                      margin: "5px 20px",
                      color:"grey",
                      textTransform: "capitalize",
                    }}
                  >
                    {item}
                  </h4>)})}</>:
                <Input
                  style={{ width: "100%" }}
                  className="mainInput dashInput"
                  placeholder="Comma separated features"
                  value={subscription?.features}
                  onChange={(e) =>
                    setSubscription({ ...subscription, features: e.target.value })
                  }
                />}
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
                  className="pageTitle2"
                  style={{
                    fontSize: "16px",
                    margin: 10,
                    textTransform: "capitalize",
                  }}
                >
                  Package Description
                </h5>
                {mode == "view" ? <h4
                  className="pageTitle2"
                  style={{
                    fontSize: "14px",
                    margin: "10px 20px",
                    color:"grey",
                    textTransform: "capitalize",
                  }}
                >
                  {subscription?.description} 
                </h4>:
                <TextArea className="mainInput dashInput" rows={4} placeholder="Enter Package Description"
                  value={subscription?.description}
                  onChange={(e) =>
                    setSubscription({ ...subscription, description: e.target.value })
                  }/>}
              
              </Col>
            </Row>
            <Row style={{ padding: "20px 20px" }}>
            <Button
              type="primary"
              shape="round"
              size={"large"}
              style={{ padding: "12px 40px", height: "auto" }}
              className="mainButton primaryButton"
              onClick={() =>    {id ? updateSubscription() : addSubscription() }}
            >
              {id ? "Update" : "Add" }
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
export default SPDetails;
