import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Typography,
  message,
  Form,
  Input,
  Button,
  Popover,
  Layout,
  Avatar,
  Upload,
  Table,
  Select,
  Image,
  Modal,
  DatePicker,
  Skeleton,
} from "antd";
import dayjs from "dayjs";
import { InboxOutlined } from "@ant-design/icons";
import { FaCaretDown, FaFilter, FaArrowLeft } from "react-icons/fa";
import { Get } from "../../config/api/get";
import {
  UPLOAD_URL,
  LECTURES,
  COURSE,
  CONTENT_TYPE,
  CATEG,
  LECTURESORIES,
} from "../../config/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Post } from "../../config/api/post";
import swal from "sweetalert";
import { TbCameraPlus } from "react-icons/tb";
import VideoPlayer from "../../components/VideoPlayer2";
import { useForm } from "antd/es/form/Form";
const { Option } = Select;

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function LectureAdd() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [lecture, setLecture] = useState(null);
  const [courses, setCourses] = useState([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    setLoading(true);
    try {
      const response = await Get(COURSE.getAllCourses, token, {
        page: "1",
        limit: "100",
      });
      setLoading(false);
      console.log("response", response);
      if (response?.data?.docs) {
        setCourses(response?.data?.docs);
      } else {
        message.error("Something went wrong!");
        console.log("error====>", response);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };


  const onFinish = (values) => {
    const formObject = new FormData();

    if (values.video) {
      formObject.append("video", values.video.fileList[0].originFileObj);
    }

    for (const key in values) {
      if (key !== "video") {
        const item = values[key];
        formObject.append(key, item);
      }
    }

    Post(
      LECTURES.addLecture,
      formObject,
      token,
      null,
      CONTENT_TYPE.FORM_DATA
    )
      .then((response) => {
        if (response?.data?.status) {
          console.log(response?.data);

          swal("Success!", "Lecture Added Successfully", "success");
          navigate(-1);

          form.resetFields();
        } else {
          swal("Oops!", response.data.message, "error");
        }
      })
      .catch((e) => {});
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
              Add Lecture
            </h1>
          </Col>
        </Row>
        <br />
        <Form
          layout="vertical"
          name="basic"
          form={form}
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
          <Row style={{ padding: "20px" }}>
            <Col xs={24} md={18}>
              <Row gutter={30} style={{ padding: "0 20px" }}>
                <Form.Item name="video" rules={[
                      {
                        required: true,
                        message: "Please Add Video",
                      },
                    ]}>
                  <Upload
                    name="video"
                    style={{ position: "relative" }}
                    beforeUpload={(file) => {
                      return false;
                    }}
                  >
                    <div
                      style={{
                        height: 300,
                        width: 500,
                        padding: 20,
                        display: "flex",
                        textAlign: "center",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#fafafa",
                        border: "2px dashed #dadada",
                        borderRadius: "10px",
                      }}
                    >
                      {" "}
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined style={{ fontSize: "30px" }} />
                      </p>
                      <p className="ant-upload-text">
                        Click or drag file to this area to upload
                      </p>
                      <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibited
                        from uploading company data or other banned files.
                      </p>
                    </div>
                  </Upload>
                </Form.Item>
              </Row>

              <br />

              <Row gutter={20}>
                <Col
                  xs={24}
                  sm={12}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    flexDirection: "column",
                  }}
                >
                  <Typography.Title
                    className="fontFamily1"
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "black",
                      textAlign: "left",
                      marginBottom: 20,
                    }}
                  >
                    Lecture No :
                  </Typography.Title>

                  <Form.Item
                    name="lectureNo"
                    initialValue={lecture?.lectureNo}
                    style={{ width: "100%" }}
                    rules={[
                      {
                        required: true,
                        message: "Please input your Lecture Number",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Enter lectureNo"
                      className="signupFormInput"
                    />
                  </Form.Item>
                </Col>
                <Col
                  xs={24}
                  sm={12}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    flexDirection: "column",
                  }}
                >
                  <Typography.Title
                    className="fontFamily1"
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "black",
                      textAlign: "left",
                      marginBottom: 20,
                    }}
                  >
                    Title :
                  </Typography.Title>

                  <Form.Item
                    name="title"
                    initialValue={lecture?.title}
                    style={{ width: "100%" }}
                    rules={[
                      {
                        required: true,
                        message: "Please input lecture title",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Enter Title"
                      className="signupFormInput"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={20}>
                <Col
                  xs={24}
                  sm={12}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    flexDirection: "column",
                  }}
                >
                  <Typography.Title
                    className="fontFamily1"
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "black",
                      textAlign: "left",
                      marginBottom: 20,
                    }}
                  >
                    Description:
                  </Typography.Title>

                  <Form.Item
                    name="description"
                    initialValue={lecture?.description}
                    style={{ width: "100%" }}
                    rules={[
                      {
                        required: true,
                        message: "Please input Lecture description",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Enter Description"
                      className="signupFormInput"
                    />
                  </Form.Item>
                </Col>
                <Col
                  xs={24}
                  sm={12}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    flexDirection: "column",
                  }}
                >
                  <Typography.Title
                    className="fontFamily1"
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: "black",
                      textAlign: "left",
                      marginBottom: 20,
                    }}
                  >
                    Course :
                  </Typography.Title>

                  <Form.Item
                    name="course"
                    initialValue={lecture?.course._id}
                    style={{ width: "100%" }}
                    rules={[
                      {
                        required: true,
                        message: "Please input lecture course",
                      },
                    ]}
                  >
                    <Select
                      placeholder="Select Course"
                      className="signupSelectBox"
                    >
                      {courses.map((item) => {
                        return <Option value={item._id}>{item?.title}</Option>;
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row style={{ marginTop: 30 }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="loginButton"
                >
                  Add Lecture
                </Button>
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
                  onClick={(e) => {
                    e.preventDefault();
                    form.resetFields();
                  }}
                >
                  Cancel
                </Button>
              </Row>
            </Col>
          </Row>
        </Form>

        <br />
        <br />
      </div>

      <br />
      <br />
    </Layout>
  );
}
export default LectureAdd;
