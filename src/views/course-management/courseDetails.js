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
  Upload,
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
import { UPLOAD_URL, COURSE,ADMIN,CONTENT_TYPE, CATEGORIES } from "../../config/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Post } from "../../config/api/post";
import swal from "sweetalert";
import { TbCameraPlus } from "react-icons/tb";
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

function CourseDetails() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [categories, setCategories] = useState([]);
  const [editMode, setEditMode] = useState(false)
  const [imageNew, setImageNew] = useState();


  useEffect(() => {
    getCourse();
    getCategories();
  }, []);

  const getCourse = async () => {
    setLoading(true);
    const res = await Get(
      `${COURSE.getCourseById}${id}`,
      token
    );

    console.log("<<<<",course)

    setCourse(res.data.course);
    setLoading(false);
  };

  const getCategories = async () => {
    setLoading(true);
    const res = await Get(
      `${CATEGORIES.getAllcategories}`,
      token,{
        limit:"100"
      }
    );

    console.log("<<<<>>>>>",res)

    setCategories(res.data.docs);
    setLoading(false);
  };

  const handleStatus = async () => {
    try {
      const response = await Get(
        COURSE.toggleStatus + "/" + course._id,
        token,
        {}
      );
      const newUser = { ...course };

      newUser.isActive = !course.isActive;
      setModalOpen(false);
      setCourse(newUser);
    } catch (error) {
      console.log(error.message);
    }
  };

  const onFinish = (values) => {

    const formObject = new FormData();

    if (imageNew) {
      formObject.append("image", values.image.fileList[0].originFileObj);
    }

    formObject.append("features", values.features.toString().split(","));

    for (const key in values) {
      if (key !== "image" && key !== "features") {
        const item = values[key];
        formObject.append(key, item);
      }
    }

    Post(COURSE.updateCourse+id, formObject, token, null, CONTENT_TYPE.FORM_DATA)
      .then((response) => {
        if (response?.data?.status) {
          console.log(response?.data);
  
          swal("Success!", "Course Updated Successfully", "success");
          getCourse()

          setEditMode(false);
          setImageNew();
        } else {
          swal("Oops!", response.data.message, "error");
        }
      })
      .catch((e) => {
      });
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
              {editMode ? "Edit Course Details" : "View Course Details"}
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

            {!loading && course && (<>


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
          <Row style={{ padding: "20px" }}>
            <Col xs={24} md={18}>
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
                          backgroundColor: "#7CC059",
                          display: "flex",
                          maxWidth: "fit-content",
                          color: "white",
                          borderRadius: "20px",
                        }}
                      >
                        <TbCameraPlus />
                      </div>{" "}

<Image
preview={false}
                  src={imageNew
                    ? imageNew
                    : !course?.image
                    ? "/images/avatar.png"
                    : UPLOAD_URL + "/" + course?.image }
                  height={300}
                  width={500}
                  style={{ borderRadius: "10px", objectFit: "cover" }}
                />
                    </Upload>
                  </Form.Item>
                ) : (
                  <Image
                  src={!course.image ? "/images/avatar.png" : UPLOAD_URL + "/" + course.image }
                  height={300}
                  width={500}
                  style={{ borderRadius: "10px", objectFit: "cover" }}
                />
                )}
              </Row>

              <br />
              <br />

              {editMode ? (
                <>
                  <Row gutter={20}>
                    <Col
                      xs={24}
                      sm={12}
                      style={{ display: "flex", alignItems: "flex-start",flexDirection:'column' }}
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
                        Course Code :
                      </Typography.Title>
                   
                      <Form.Item
                        name="courseCode"
                        initialValue={course?.courseCode}
                        style={{ width: "100%" }}
                        rules={[
                          {
                            required: true,
                            message: "Please input your Course Code",
                          },
                        ]}
                      >
                        <Input
                          size="large"
                          placeholder="Enter CourseCode"
                          className="signupFormInput"
                        />
                      </Form.Item>
                    </Col>
                    <Col
                      xs={24}
                      sm={12}
                      style={{ display: "flex", alignItems: "flex-start",flexDirection:'column' }}
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
                        initialValue={course?.title}
                        style={{ width: "100%" }}
                        rules={[
                          {
                            required: true,
                            message: "Please input course title",
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
                      style={{ display: "flex", alignItems: "flex-start",flexDirection:'column' }}
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
                        initialValue={course?.description}
                        style={{ width: "100%" }}
                        rules={[
                          {
                            required: true,
                            message: "Please input Course description",
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
                      style={{ display: "flex", alignItems: "flex-start",flexDirection:'column' }}
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
                        Category :
                      </Typography.Title>
                   
                      <Form.Item
                        name="category"
                        initialValue={course?.category._id}
                        style={{ width: "100%" }}
                        rules={[
                          {
                            required: true,
                            message: "Please input course category",
                          },
                        ]}
                      >
                         <Select
           placeholder="Select Category"
           className="signupSelectBox"
        >
          {categories.map((item,index) => {
            return(<Option value={item._id}>{item.title}</Option>)
          })}

        </Select>
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={20}>
                    <Col
                      xs={24}
                      sm={12}
                      style={{ display: "flex", alignItems: "flex-start",flexDirection:'column' }}
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
                       Start Date :
                      </Typography.Title>
                   
                      <Form.Item
                        name="startDate"
                        initialValue={dayjs(course?.startDate)}
                        style={{ width: "100%" }}
                        rules={[
                          {
                            required: true,
                            message: "Please input start Date",
                          },
                        ]}
                      >
                        <DatePicker  style={{width:"100%"}} size="large"
                          placeholder="Enter start Date"
                          className="signupFormInput"/>
                      </Form.Item>
                    </Col>
                    <Col
                      xs={24}
                      sm={12}
                      style={{ display: "flex", alignItems: "flex-start",flexDirection:'column' }}
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
                        Duration :
                      </Typography.Title>
                   
                      <Form.Item
                        name="duration"
                        initialValue={course?.duration}
                        style={{ width: "100%" }}
                        rules={[
                          {
                            required: true,
                            message: "Please input course duration",
                          },
                        ]}
                      >
                        <Input
                          size="large"
                          placeholder="Enter Duration"
                          className="signupFormInput"
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={20}>
                  <Col
                      xs={24}
                      sm={12}
                      style={{ display: "flex", alignItems: "flex-start",flexDirection:'column' }}
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
                        Price :
                      </Typography.Title>
                   
                      <Form.Item
                        name="price"
                        initialValue={course?.price}
                        style={{ width: "100%" }}
                        rules={[
                          {
                            required: true,
                            message: "Please input price",
                          },
                        ]}
                      >
                        <Input
                        prefix="$"
                          size="large"
                          placeholder="Enter Price"
                          className="signupFormInput"
                        />
                      </Form.Item>
                    </Col>
                    <Col
                      xs={24}
                      sm={12}
                      style={{ display: "flex", alignItems: "flex-start",flexDirection:'column' }}
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
                        Features :
                      </Typography.Title>
                   
                      <Form.Item
                        name="features"
                        initialValue={course?.features}
                        style={{ width: "100%" }}
                        rules={[
                          {
                            required: true,
                            message: "Please input Features",
                          },
                        ]}
                      >
                        <Input
                          size="large"
                          placeholder="Enter Features"
                          className="signupFormInput"
                        />
                      </Form.Item>
                    </Col>
                 
                  </Row>
         
                
                 
              

                
                </>
              ) : (
                <>
                     <Row style={{ padding: "10px" }}>
            <Col xs={24} md={12}>
                <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    fontWeight: "bold",
                    marginBottom:10
                  }}
                >
                  Course Code{" "}
                </h5>
                <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    color: "#7a7e7f",
                    fontWeight: "normal",
                  }}
                >
                  {course?.courseCode}
                </h5>
              </Col>
              <Col xs={24} md={12}>
                <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    fontWeight: "bold",
                    marginBottom:10
                  }}
                >
                  Title{" "}
                </h5>
                <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    color: "#7a7e7f",
                    fontWeight: "normal",
                  }}
                >
                  {course?.title}
                </h5>
              </Col>
              
            </Row>

            <br/>
            <Row style={{ padding: "10px" }}>
            <Col xs={24} md={12}>
              <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    fontWeight: "bold",
                    marginBottom:10
                  }}
                >
                  Description{" "}
                </h5>
                <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    color: "#7a7e7f",
                    fontWeight: "normal",
                  }}
                >
                  {course?.description}
                </h5>
              </Col>
              <Col xs={24} md={12}>
              <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    fontWeight: "bold",
                    marginBottom:10
                  }}
                >
                  Category
                </h5>
                <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    color: "#7a7e7f",
                    fontWeight: "normal",
                  }}
                >
                  {course?.category.title}
                </h5>
              </Col>
            </Row>
            <br/>

            <Row style={{ padding: "10px" }}>
              <Col xs={24} md={12}>
              <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    fontWeight: "bold",
                    marginBottom:10
                  }}
                >
                  Start Date{" "}
                </h5>
                <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    color: "#7a7e7f",
                    fontWeight: "normal",
                  }}
                >
                  {dayjs(course?.startDate).format("M/D/YYYY")}
                  
                </h5>
              </Col>
              <Col xs={24} md={12}>
              <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    fontWeight: "bold",
                    marginBottom:10
                  }}
                >
                  Duration{" "}
                </h5>
                <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    color: "#7a7e7f",
                    fontWeight: "normal",
                  }}
                >
                  {course?.duration}
                </h5>
              </Col>
            
            </Row>
            <br/>
            <Row style={{ padding: "10px" }}>
            <Col xs={24} md={12}>
              <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    fontWeight: "bold",
                    marginBottom:10
                  }}
                >
                  Price{" "}
                </h5>
<h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    color: "#7a7e7f",
                    fontWeight: "normal",
                    margin:"10px 0px"
                  }}
                >
                 $ {course.price}
                
                </h5>
               
              </Col>
              <Col xs={24} md={12}>
              <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    fontWeight: "bold",
                    marginBottom:10
                  }}
                >
                  Features{" "}
                </h5>
                {course?.features.length > 0 && course?.features.toString().split(",").map(item => { return( <h5
                  style={{
                    display: "block",
                    fontSize: 16,
                    color: "#7a7e7f",
                    fontWeight: "normal",
                    margin:"10px 0px"
                  }}
                >
                  {item}
                  
                </h5>)})}
               
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
                        borderRadius: "5px",
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
                        Edit Course
                      </Button>
                    </Col>
                  </Row>
                )}
              </Row>
            </Col>
          </Row>
        </Form>

        
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
          {course?.isActive ? "Deactivate" : "Activate"}
        </Typography.Title>
        <Typography.Text style={{ fontSize: 16 }}>
        Do You Want To  {course?.isActive ? "Deactivate" : "Activate"} This User?
        </Typography.Text>
      </Modal>


      <br />
      <br />
    </Layout>
  );
}
export default CourseDetails;
