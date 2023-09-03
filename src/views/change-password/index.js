import React from "react";
import { Post } from "../../config/api/post";
import { useSelector, useDispatch } from "react-redux";
import { ADMIN } from "../../config/constants";
import { useNavigate,useLocation } from "react-router";
import { Col, Row,Image, Typography, Layout, Card,Form,  Input,
  Button } from "antd";
import { FiMail, FiLock } from "react-icons/fi";
import swal from "sweetalert";
import iconImage from "../../assets/images/change-ps.png"



function ChangePassword() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const user = useSelector((state) => state.user?.userData);
  const token = useSelector((state) => state.user?.userToken);
  const [loading, setLoading] = React.useState(false);

  const onFinish = (values) => {
    console.log("Success:", values);
    setLoading(true);

    Post(ADMIN.changePassword, values,token)
      .then((response) => {
        setLoading(false);
        if (response?.data?.status) {
          swal("Success", response?.data?.message, "success");
          form.resetFields();
        } else {
          swal("Oops!", response?.data?.message || response?.response?.data?.message, "error");
        }
      })
      .catch((e) => {
        swal("Oops!","internal server error", "error");
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };


  return (


    <Layout className="configuration">
      <h1 className="pageTitle" style={{ marginBottom: 20 }}>
        Change Password
              </h1>
      <div className="boxDetails2" style={{ padding: "50px" }}>
     <Row>
               <Col xs={24} md={12}>
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
                  <Form.Item
                   label="Old Password*"
                   name="old_password"
                   rules={[
                     {
                       required: true,
                       message: "Please input your current password!",
                     },
                   ]}
                 >
                   <Input.Password
                     size="large"
                     
                     placeholder="Enter Current Password"
                     className="signupFormInput2"
                   />
                 </Form.Item>

                 <Form.Item
                   label="New Password*"
                   name="new_password"
                   rules={[
                     {
                       required: true,
                       message: "Please input your new password!",
                     },
                   ]}
                 >
                   <Input.Password
                     size="large"
                     
                     placeholder="Enter New Password"
                     className="signupFormInput2"
                   />
                 </Form.Item>
                 <Form.Item
                   label="Confirm Password*"
                   name="confirmPassword"
                   rules={[
                     {
                       required: true,
                       message: "Please confirm your new password!",
                     },
                   ]}
                 >
                   <Input.Password
                     size="large"
                     
                     placeholder="Confirm New Password"
                     className="signupFormInput2"
                   />
                 </Form.Item>
                 <br />

                 <Form.Item>
                   <Button
                     type="primary"
                     htmlType="submit"
                     className="loginButton"
                   >
                     {loading ? "Loading..." : "Update Password"}
                   </Button>
                 </Form.Item>
               </Form>
               </Col>
             
             </Row>

      </div>
    </Layout>
  );
}

export default ChangePassword;
