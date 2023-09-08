import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Typography,
  List,
  Form,
  Input,
  Modal,
  Button,
  Layout,
  Popover,
  Space,
  Dropdown,
  Skeleton,
  Table,
  Spin,
  Select,
  message,
  Image,
  Pagination,
  DatePicker,
  Menu,
} from "antd";
import dayjs from "dayjs";
import { UserOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { FaSearch,FaEdit,FaEye, FaFilter, FaCaretDown, FaTrash } from "react-icons/fa";
import { BiDotsVerticalRounded } from "react-icons/bi";
import {DownOutlined, UpOutlined} from '@ant-design/icons';
import ClientLayout from "../../components/ClientLayout";
import { Get } from "../../config/api/get";
import { Post } from "../../config/api/post";
import { COMISSSION } from "../../config/constants";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";



function ComissionManagement() {
  const token = useSelector((state) => state.user.userToken);
  const [editMode, setEditMode] = useState(false)
  const [comissions, setComissions] = useState({
    coachingCommission: 0,
    tutoringCommission: 0,
  });
  const navigate = useNavigate();

  const [filter, setFilter] = useState({
    status: null,
    keyword: "",
    from: null,
    to: null,
  });

  

  const onFinish = (values) => {
  
    Post(COMISSSION.addComission, values, token)
      .then((response) => {
        if (response?.data?.status) {

          swal("Success!", "Comission Updated Successfully", "success");

          setEditMode(false);
          getComissions()
        } else {
          swal("Oops!", response.data.message, "error");
        }
      })
      .catch((e) => {
        console.log(e)
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };



 
  useEffect(() => {

    getComissions();
  }, []);

  const getComissions = () => {
    try {
      Get(COMISSSION.getComission, token).then((response) => {
        if (response?.status) {
          if(response?.data){
            setComissions(response?.data);
          }
        } else {
          console.log("response", response);
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  };



  return (
    <Layout className="configuration">
      <div>
        


<div  className="boxDetails2">
<Row style={{ padding: "10px 20px" }}>
          <Col
            xs={24}
            md={12}
            style={{ display: "flex", alignItems: "center" }}
          >
           <h1 className="pageTitle">Comission Management</h1>
          </Col>
       
        </Row>
        <br/>
        <Form
          layout="vertical"
          name="basic"
          className="contactForm"
          labelCol={{
            span: 0,
          }}
          wrapperCol={{
            span: 24,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
        {!editMode ?  <><Row gutter={[20, 20]} style={{padding:"10px 20px"}}>
                <Col xs={24} md={12} >
                <Typography.Title
                    className="fontFamily1"
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "black",
                      textAlign: "left",
                      marginTop: 0,
                      marginBottom: 10,
                    }}
                  >
                   Coaching Commission
                  </Typography.Title>
                    <Typography.Text
                      className="fontFamily1"
                      style={{
                        fontSize: "18px",
                        color: "black",
                        textAlign: "left",
                        marginTop: 0,
                        marginBottom: 20,
                      }}
                    >
                       {comissions?.coachingCommission} %
                    </Typography.Text>
                </Col>
                </Row>
                <br/>
                <br/>
                <Row gutter={[20, 20]} style={{padding:"10px 20px"}}>
                <Col xs={24} md={12} >
                <Typography.Title
                    className="fontFamily1"
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "black",
                      textAlign: "left",
                      marginTop: 0,
                      marginBottom: 10,
                    }}
                  >
                   Tutoring Commission
                  </Typography.Title>
                    <Typography.Text
                      className="fontFamily1"
                      style={{
                        fontSize: "18px",
                        color: "black",
                        textAlign: "left",
                        marginTop: 0,
                        marginBottom: 20,
                      }}
                    >
                       {comissions?.tutoringCommission} %
                    </Typography.Text>
                </Col>
                </Row><br/>
                <br/></> :    <><Row gutter={[20, 20]} style={{padding:"10px 20px"}}>
                <Col xs={24} md={12} >
                <Typography.Title
                    className="fontFamily1"
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "black",
                      textAlign: "left",
                      marginTop: 0,
                      marginBottom: 10,
                    }}
                  >
                   Coaching Commission
                  </Typography.Title>
                  <Form.Item
                        name="coachingCommission"
                        initialValue={comissions?.coachingCommission}
                        style={{ width: "100%" }}
                        rules={[
                          {
                            required: true,
                            message: "Please input your coaching Commission percentage",
                          },
                        ]}
                      >
                        <Input
                          size="large"
                          placeholder="Enter coaching Commission"
                          className="signupFormInput"
                          suffix="%"
                        />
                      </Form.Item>
                </Col>
                </Row>
                <br/>
                <br/>
                <Row gutter={[20, 20]} style={{padding:"10px 20px"}}>
                <Col xs={24} md={12} >
                <Typography.Title
                    className="fontFamily1"
                    style={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "black",
                      textAlign: "left",
                      marginTop: 0,
                      marginBottom: 10,
                    }}
                  >
                   Tutoring Commission
                  </Typography.Title>
                  <Form.Item
                        name="tutoringCommission"
                        initialValue={comissions?.tutoringCommission}
                        style={{ width: "100%" }}
                        rules={[
                          {
                            required: true,
                            message: "Please input your tutoring Commission Percentage",
                          },
                        ]}
                      >
                        <Input
                          size="large"
                          placeholder="Enter tutoring Commission"
                          className="signupFormInput"
                          suffix="%"
                        />
                      </Form.Item>
                </Col>
                </Row></>}

                  <Row  style={{padding:"10px 20px"}}>
                {editMode && <Button
                  type="primary"
                  htmlType="submit"
                  className="loginButton"
                  // onClick={() => setModalOpen(true)}
                  style={{ fontWeight: "bold" }}
                >
                  Update Comission
                </Button> }
                </Row>

                </Form>
                <Row>
                {!editMode &&  <Button
                  type="primary"
                  htmlType="button"
                  className="loginButton"
                  onClick={(e) => setEditMode(true)}
                  style={{ fontWeight: "bold" }}
                >
                  Edit Comission
                </Button> }
                </Row>

             
     
     
        </div>
        <br />
      </div>
      <br />
      <br />
    </Layout>
  );
}

export default ComissionManagement;
