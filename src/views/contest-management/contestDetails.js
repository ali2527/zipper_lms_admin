import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Typography,
  List,
  Form,
  Input,
  Button,
  InputNumber,
  Layout,
  Avatar,
  Tabs,
  Table,
  Select,
  Upload,
  Image,
  message,
  DatePicker,
  Skeleton,
} from "antd";
import dayjs from "dayjs";
import { UserOutlined,LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { FaCaretDown, FaFilter, FaArrowLeft } from "react-icons/fa";
import { Get } from "../../config/api/get";
import { Post } from "../../config/api/post";
import { UPLOAD_URL, CONTEST } from "../../config/constants";
import { useNavigate, useParams } from "react-router-dom";
import {AiFillPlusCircle} from 'react-icons/ai'
import { useSelector } from "react-redux";

function ContestDetails() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState();
  const [contest, setContest] = useState({
    startDate:dayjs(),
    endDate:dayjs()
  });
  const [formData, setFormData] = useState({
    picture: null,
    image : null,
  });


  useEffect(() => {
    if(id){
      getContest();
    }
  }, []);

  const addcontest = () => {

    console.log(contest);
    if(!contest?.title || !contest?.fee || !contest?.prize || !contest?.description || !contest?.startDate || !contest?.endDate){
      message.error('Please fill all fields')
      return
    }
     

    Post(CONTEST.addContest, contest, token).then((response) => {
      console.log(response);
      if (response.status) {

        message.success('Contest created successfully!')
        navigate(-1)
      }
      else {
        message.error(response.message)
      }
    })
  }


  const getContest = async () => {
    setLoading(true);
    const _contest = await Get(`${CONTEST.getOne}${id}`, token);
    setContest(_contest.data);
    setLoading(false);
  };

  const updateContest = () => {
    Post(`${CONTEST.updateContest}${id}`,contest, token).then((response) => {
      console.log(response);
      if (response.status) {
          message.success('Contest updated successfully!')
          navigate(-1)
      }
      else {
          message.error(response.message)
      }
  })




    console.log(formData);
  }


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
              {id ? "Edit Contest" : "Add Contest"}
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

        {/* ==================================================== View Mode =====================================================  */}
        {!loading  && (
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
                    fontWeight: "normal",
                  }}
                >
                  Contest Title
                </h5>
                <Input
                  style={{ width: "100%" ,color:"black"}}
                  className="mainInput dashInput"
                  placeholder="contest Title"
                  value={contest?.title}
                  onChange={(e) =>
                    setContest({ ...contest, title: e.target.value })
                  }
                />
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
                    fontWeight: "normal",
                  }}
                >
                  Contest Description
                </h5>
                <Input
                  style={{ width: "100%",color:"black" }}
                  className="mainInput dashInput"
                  placeholder="contest description"
                  value={contest?.description}
                  onChange={(e) =>
                    setContest({
                      ...contest,
                      description: e.target.value,
                    })
                  }
                />
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
                    fontWeight: "normal",
                  }}
                >
                  Contest Fee
                </h5>
                <InputNumber
                  size="small"
                  style={{ width: "100%",color:"black" }}
                  className="mainInput dashInput"
                  placeholder="Contest Fee"
                  value={contest?.fee}
                  onChange={(e) =>
                    setContest({
                      ...contest,
                      fee: e,
                    })
                  }
                />
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
                    fontWeight: "normal",
                  }}
                >
                  Contest Prize
                </h5>
                <InputNumber
                size="small"
                  style={{ width: "100%",color:"black" }}
                  className="mainInput dashInput"
                  placeholder="Contest Fee"
                  value={contest?.prize}
                  onChange={(e) =>
                    setContest({
                      ...contest,
                      prize: e,
                    })
                  }
                />
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
                    fontWeight: "normal",
                  }}
                >
                  Start Date
                </h5>
                <DatePicker  defaultValue={dayjs(contest.startDate, 'YYYY-MM-DD')}  style={{ width: "100%",color:"black" }}  className="mainInput dashInput"  placeholder="Start Date"  onChange={(e) =>
                    setContest({
                      ...contest,
                      startDate: e,
                    })
                  }/>
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
                    fontWeight: "normal",
                  }}
                >
                  End Date
                </h5>
                <DatePicker  defaultValue={dayjs(contest.endDate, 'YYYY-MM-DD')}    style={{ width: "100%",color:"black" }}  className="mainInput dashInput"  placeholder="End Date"  onChange={(e) =>
                    setContest({
                      ...contest,
                      endDate: e,
                    })
                  }/>
              </Col>
            </Row>


            <br/>
           
            <Row style={{ padding: "10px 20px" }}>
            <Button
              type="primary"
              shape="round"
              size={"large"}
              style={{ padding: "12px 40px", height: "auto" }}
              className="mainButton primaryButton"
              onClick={() => {id ? updateContest() :addcontest()}}
          
            >
             {id ? "Update Contest" : "Add Contest"}
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
export default ContestDetails;
