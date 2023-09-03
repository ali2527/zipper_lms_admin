import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Col,
  Image,
  Select,
  Button,
  InputNumber,
  Row,
  Avatar,
  DatePicker,
  Typography,
  Layout,
  Card,
  Form,
  Input,
  Radio,
  Upload,
} from "antd";
import { useNavigate } from "react-router";
import { UPLOAD_URL } from "../../config/constants";
import { Post } from "../../config/api/post";
import { AUTH, ADMIN } from "../../config/constants";
import { addUser, removeUser } from "../../redux/slice/authSlice";
import { CONTENT_TYPE } from "../../config/constants/index";
import swal from "sweetalert";
import dayjs from "dayjs";

import iconImage from "../../assets/images/profiel-loti.png";
//icons
import {
  FaCaretDown,
  FaArrowLeft,
  FaUserAlt,
  FaBox,
  FaUsers,
} from "react-icons/fa";
import { TbCameraPlus } from "react-icons/tb";

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.userData);
  const token = useSelector((state) => state.user?.userToken);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [editMode, setEditMode] = useState(false);
  const [imageNew, setImageNew] = useState();

  React.useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  console.log("imageNew", imageNew);

  const onFinish = (values) => {
    setLoading(true);
    const formObject = new FormData();

    if (imageNew) {
      formObject.append("image", values.image.fileList[0].originFileObj);
    }

    for (const key in values) {
      if (key !== "image") {
        const item = values[key];
        formObject.append(key, item);
      }
    }

    Post(ADMIN.updateProfile, formObject, token, null, CONTENT_TYPE.FORM_DATA)
      .then((response) => {
        setLoading(false);
        if (response?.data?.status) {
          console.log(response?.data);
          dispatch(addUser({ user: response.data.data, token: token }));

          swal("Success!", "Profile Updated Successfully", "success");
          setLoading(false);
          setEditMode(false);
          setImageNew();
        } else {
          swal("Oops!", response.data.message, "error");
        }
      })
      .catch((e) => {
        setLoading(false);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Layout className="configuration">
      <h1 className="pageTitle" style={{ marginBottom: 20 }}>
        Profile Information
      </h1>
      <div className="boxDetails2" style={{ padding: "50px" }}>
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
          <Row>
            <Col xs={24} md={12}>
              <Row>
                {editMode ? (
                  <Form.Item name="image">
                    <Upload
                      name="image"
                      showUploadList={false}
                      style={{ position: "relative" }}
                      beforeUpload={(file) => {
                        setImageNew(URL.createObjectURL(file));
                        return false;
                      }}
                    >
                      {" "}
                      <div
                        style={{
                          padding: "8px",
                          position: "absolute",
                          right: -10,
                          zIndex: 2,
                          bottom: 40,
                          backgroundColor: "#9b76d2",
                          display: "flex",
                          maxWidth: "fit-content",
                          color: "white",
                          borderRadius: "20px",
                        }}
                      >
                        <TbCameraPlus />
                      </div>{" "}
                      <Avatar
                        size={150}
                        src={
                          imageNew
                            ? imageNew
                            : !user?.image
                            ? "/images/avatar.png"
                            : UPLOAD_URL + "/" + user?.image
                        }
                      />
                    </Upload>
                  </Form.Item>
                ) : (
                  <Avatar
                    size={150}
                    src={
                      !user?.image
                        ? "/images/avatar.png"
                        : UPLOAD_URL + "/" + user?.image
                    }
                  />
                )}
              </Row>

              <br />
              <br />

              {editMode ? (
                <>
                  <Row>
                    <Col
                      xs={12}
                      sm={10}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Typography.Title
                        className="fontFamily1"
                        style={{
                          fontSize: "18px",
                          fontWeight: 600,
                          color: "black",
                          textAlign: "left",
                          marginBottom: 20,
                        }}
                      >
                        Full Name :
                      </Typography.Title>
                    </Col>

                    <Col
                      xs={12}
                      sm={12}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Form.Item
                        name="fullName"
                        initialValue={user?.fullName}
                        style={{ width: "100%" }}
                        rules={[
                          {
                            required: true,
                            message: "Please input your full name",
                          },
                        ]}
                      >
                        <Input
                          size="large"
                          placeholder="Enter FullName"
                          className="signupFormInput2"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <br />

                  <Row>
                    <Col xs={12} sm={10}>
                      <Typography.Title
                        className="fontFamily1"
                        style={{
                          fontSize: "18px",
                          fontWeight: 600,
                          color: "black",
                          textAlign: "left",
                          marginTop: 0,
                        }}
                      >
                        Email Address :
                      </Typography.Title>
                    </Col>

                    <Col xs={12} sm={12}>
                      <Typography.Text
                        className="fontFamily1"
                        style={{
                          fontSize: "16px",
                          color: "grey",
                          textAlign: "left",
                        }}
                      >
                        {user?.email}
                      </Typography.Text>
                    </Col>
                  </Row>
                </>
              ) : (
                <>
                  <Row>
                    <Col xs={12} sm={10}>
                      <Typography.Title
                        className="fontFamily1"
                        style={{
                          fontSize: "18px",
                          fontWeight: 600,
                          color: "black",
                          textAlign: "left",
                          marginTop: 0,
                        }}
                      >
                        Full Name :
                      </Typography.Title>
                    </Col>

                    <Col xs={12} sm={12}>
                      <Typography.Text
                        className="fontFamily1"
                        style={{
                          fontSize: "16px",
                          color: "grey",
                          textAlign: "left",
                        }}
                      >
                        {user?.fullName}
                      </Typography.Text>
                    </Col>
                  </Row>
                  <br />

                  <Row>
                    <Col xs={12} sm={10}>
                      <Typography.Title
                        className="fontFamily1"
                        style={{
                          fontSize: "18px",
                          fontWeight: 600,
                          color: "black",
                          textAlign: "left",
                          marginTop: 0,
                        }}
                      >
                        Email Address :
                      </Typography.Title>
                    </Col>

                    <Col xs={12} sm={12}>
                      <Typography.Text
                        className="fontFamily1"
                        style={{
                          fontSize: "16px",
                          color: "grey",
                          textAlign: "left",
                        }}
                      >
                        {user?.email}
                      </Typography.Text>
                    </Col>
                  </Row>
                </>
              )}

              <Row style={{ marginTop: 30 }}>
                {editMode && (
                  <>
                    {" "}
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="loginButton"
                    >
                      Save Changes
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
                      onClick={(e) => {
                        e.preventDefault();
                        setEditMode(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                )}
                {!editMode && (
                  <Row justify={"center"}>
                    <Col style={{ textAlign: "center" }}>
                      <Button
                        type="primary"
                        htmlType="button"
                        className="loginButton"
                        onClick={() => setEditMode(true)}
                      >
                        Edit Profile Information
                      </Button>
                    </Col>
                  </Row>
                )}
              </Row>
            </Col>
          </Row>
        </Form>

        {/* <Row>
          <Col xs={24} md={8}>
            {!editMode && (
              <Row justify={"center"}>
                <Col style={{ textAlign: "center" }}>
                  <Button
                    type="primary"
                    htmlType="button"
                    className="loginButton"
                    onClick={() => setEditMode(true)}
                  >
                    Edit Profile Information
                  </Button>
                  <br />
                  <Typography.Text
                    className="fontFamily1"
                    style={{
                      fontSize: "14px",
                      color: "black",
                      justifyContent: "center",
                      textAlign: "center",
                      marginTop: 0,
                      marginBottom: 30,
                    }}
                  >
                    <>
                      <span
                        onClick={() => navigate("/change-password")}
                        style={{
                          cursor: "pointer",
                          fontWeight: "bold",
                          textDecoration: "underline",
                        }}
                      >
                        Change Password
                      </span>
                    </>
                  </Typography.Text>
                </Col>
              </Row>
            )}
          </Col>
        </Row> */}
      </div>
    </Layout>
  );
}

export default Profile;
