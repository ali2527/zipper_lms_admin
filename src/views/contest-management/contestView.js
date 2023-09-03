import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Typography,
  List,
  Card,
  Input,
  Button,
  InputNumber,
  Layout,
  Modal,
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
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { Get } from "../../config/api/get";
import { Post } from "../../config/api/post";
import ReactPaginate from "react-paginate";
import { UPLOAD_URL, CONTEST } from "../../config/constants";
import { useNavigate, useParams } from "react-router-dom";
import {AiFillPlusCircle} from 'react-icons/ai'
import { useSelector } from "react-redux";
import swal from "sweetalert";



function ContestView() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const [entries, setEntries] = useState([]);
  const [imageUrl, setImageUrl] = useState();
  const [contest, setContest] = useState({
    startDate:dayjs(),
    endDate:dayjs()
  });
  const [formData, setFormData] = useState({
    picture: null,
    image : null,
  });

  const [paginationConfig, setPaginationConfig] = useState({
    pageNumber: 1,
    limit: 10,
    totalDocs: 0,
    totalPages: 0,
  });


  useEffect(() => {
    if(id){
      getContest();
      getContestEntries();
    }
  }, []);

  const addcontest = () => {

    console.log(contest);
    if(!contest?.title || !contest?.fee || !contest?.prize || !contest?.description || !contest?.startDate || !contest?.endDate){
      message.error('Please fill all fields')
      return
    }
     

    Post(CONTEST?.addContest, contest, token).then((response) => {
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

  const showModal = (userId) => {
    setIsModalOpen(true)
    setSelectedUser(userId)
  };

    
  const handleOk = () => {
    Post(CONTEST.selectWinner+"/"+contest._id,{userId:selectedUser},token,)
    .then((response) => {
      setLoading(false);
      if (response?.status) { 
        swal("Success!", "Winner Selected Successfully", "success");
        // getMyGallery();
        getContest()
        setLoading(false);
      } else {
        swal("Oops!", response.data.message, "error");
      }
    })
    .catch((e) => {

      setLoading(false);
    });


    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handlePageChange = (e) => {
    setPaginationConfig({
      ...paginationConfig,
      pageNumber: Number(e.selected) + 1,
    });

    getContestEntries(Number(e.selected) + 1);
  };


  const getContestEntries = async (pageNumber) => {

    try {
      const response = await Get(CONTEST.getAllContestEntries+id,token, {
        page: pageNumber
          ? pageNumber.toString()
          : paginationConfig.pageNumber.toString(),
        limit: "10",
      });
   
      console.log("response", response);
      if (response?.status) {
        setEntries(response?.data?.docs);
        // setRatings(response.data.ratings)
        setPaginationConfig({
          pageNumber: response?.data?.page,
          limit: response?.data?.limit,
          totalDocs: response?.data?.totalReviews,
          totalPages: response?.data?.totalPages,
        });
      } else {
        message.error("Something went wrong!");
        console.log("error====>", response);
      }
    } catch (error) {
      console.log(error.message);
    }
  };



  const getContest = async () => {
    setLoading(true);
    const _contest = await Get(`${CONTEST?.getOne}${id}`, token);
    setContest(_contest?.data);
    setLoading(false);
  };

  const updateContest = () => {
    Post(`${CONTEST?.updateContest}${id}`,contest, token).then((response) => {
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
              View Contest Details
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
                    fontWeight:"bolder",
                    textTransform: "capitalize",
                  }}
                >
                  Contest Title
                </h5>
                <h5
                  className="pageTitle2"
                  style={{
                    fontSize: "14px",
                    margin: 10,
                    textTransform: "capitalize",
                    fontWeight: "normal",
                  }}
                >
                  {contest?.title}
                </h5>
              </Col>
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
                    fontWeight:"bolder",
                    textTransform: "capitalize",
                  }}
                >
                  Contest Description
                </h5>
                <h5
                  className="pageTitle2"
                  style={{
                    fontSize: "14px",
                    margin: 10,
                    textTransform: "capitalize",
                    fontWeight: "normal",
                  }}
                >
                  {contest?.description}
                </h5>
              </Col>
            </Row>
            <br/>
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
                    fontWeight:"bolder",
                    textTransform: "capitalize",
                  }}
                >
                  Contest Fee
                </h5>
                <h5
                  className="pageTitle2"
                  style={{
                    fontSize: "14px",
                    margin: 10,
                    textTransform: "capitalize",
                    fontWeight: "normal",
                  }}
                >
                  ${contest?.fee}
                </h5>
              </Col>
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
                    fontWeight:"bolder",
                    textTransform: "capitalize",
                  }}
                >
                  Contest Prize
                </h5>
                <h5
                  className="pageTitle2"
                  style={{
                    fontSize: "14px",
                    margin: 10,
                    textTransform: "capitalize",
                    fontWeight: "normal",
                  }}
                >
                  ${contest?.prize}
                </h5>
              </Col>
            </Row>
            <br/>
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
                    fontWeight:"bolder",
                    textTransform: "capitalize",
                  }}
                >
                  Start Date
                </h5>
                <h5
                  className="pageTitle2"
                  style={{
                    fontSize: "14px",
                    margin: 10,
                    textTransform: "capitalize",
                    fontWeight: "normal",
                  }}
                >
                    {dayjs(contest?.startDate).format(
                                            "MM/DD/YYYY"
                                          )}
                </h5>
              </Col>
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
                    fontWeight:"bolder",
                    textTransform: "capitalize",
                  }}
                >
                  End Date
                </h5>
                <h5
                  className="pageTitle2"
                  style={{
                    fontSize: "14px",
                    margin: 10,
                    textTransform: "capitalize",
                    fontWeight: "normal",
                  }}
                >
                       {dayjs(contest?.endDate).format(
                                            "MM/DD/YYYY"
                                          )}
                </h5>
              </Col>
            </Row>
            

            <br/>
            <hr/>
            <br/>
            <h1 className="pageTitle" style={{ margin: 0 }}>
              Contest Submissions
            </h1>
            <br/>

            <Row gutter={[30, 30]}>

            {entries.length == 0 && <div style={{width:"100%",minHeight:"400px",display:'flex',justifyContent:'center',alignItems:"center"}}>
              
            <Typography.Title
                                className="fontFamily1"
                                style={{
                                  fontSize: "25px",
                                  fontWeight: "bold",
                                  color: "white",
                                  textAlign: "left",
                                  marginTop: 0,
                                }}
                              >
                              No Entries Found
                              </Typography.Title>
                              </div>}



              {entries.length > 0 &&
                entries.map((item, index) => {
                  console.log("item", item);
                  return (
                    <Col xs={24} sm={12} lg={6}>
                      <Card
                        cover={
                          <img
                            alt="example"
                            src={UPLOAD_URL + item?.image}
                            style={{
                              width: "100%",
                              height: "250px",
                              objectFit: "cover",
                            }}
                          />
                        }
                        className="tutorCard2"
                      >
                        <Row
                          style={{
                            justifyContent: "space-between",
                          }}
                          gutter={30}
                        >
                          <Col
                            xs={24}
                            md={12}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent:'center'
                            }}
                          >
                            <Typography.Title
                              className="fontFamily1"
                              style={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                color: "black",
                                textAlign: "left",
                                marginTop: 10,
                                marginBottom: 0,
                              }}
                            >
                              {item.contestant.fullName}
                            </Typography.Title>
                          </Col>
                          <Col
                            xs={24}
                            md={12}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                                 <div class="bestSellerRgt3" style={{position:"absolute",right:"0px"}}>Votes: {item.votes.length}</div>
                          </Col>
                        </Row>
                        <br />
                        <br />
                      {!contest?.winner ?  <Row
                          style={{
                            justifyContent: "center",
                          }}
                          gutter={30}
                        >
                          <Col
                            xs={24}
                            md={16}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent:"center",
                              alignItems:"center"
                            }}
                          >
                           <Button
              type="primary"
              shape="round"
              size={"large"}
              style={{ padding: "12px 40px", height: "auto" }}
              className="mainButton primaryButton"
              onClick={() => showModal(item.contestant._id)}
          
            >
           Select Winner
            </Button>
                          </Col>
                        </Row> : 
                        <>
                        {item?.contestant?._id == contest?.winner && <Row
                          style={{
                            justifyContent: "center",
                          }}
                          gutter={30}
                        >
                          <Col
                            xs={24}
                            md={16}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent:"center",
                              alignItems:"center"
                            }}
                          >
                           <Button
              type="primary"
              shape="round"
              size={"large"}
              style={{ padding: "12px 40px", height: "auto" }}
              className="mainButton primaryButton"         
            >
           Winner
            </Button>
                          </Col>
                        </Row>}
                        </>
                       }
                      </Card>
                    </Col>
                  );
                })}
            </Row>
            <br />

          {entries.length > 0 &&   <ReactPaginate
              breakLabel="..."
              nextLabel={<FaArrowRight style={{ color: "grey" }} />}
              pageRangeDisplayed={window.innerWidth > 500 ? 4 : 1}
              marginPagesDisplayed={window.innerWidth > 500 ? 4 : 1} //handle Pa
              onPageChange={handlePageChange}
              pageCount={paginationConfig?.totalPages}
              forcePage={paginationConfig?.pageNumber - 1}
              previousLabel={<FaArrowLeft style={{ color: "grey" }} />}
              renderOnZeroPageCount={null}
              pageClassName="page-item" //m
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="paginationContainer"
              activeClassName="active"
            />}
          </>
        )}


    

        <br />
        <br />
      </div>

      <Modal
        
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
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
            border: "2px solid #3d1c6f",
            color: "#3d1c6f",
            height: "auto",
            padding: "6px 35px",
            borderRadius: "50px",
            fontSize: "16px",
            marginTop: "15px",
          },
        }}
        okButtonProps={{
          style: {
            backgroundColor: "#3d1c6f",
            color: "white",
            marginTop: "15px",
            height: "auto",
            padding: "5px 35px",
            borderRadius: "50px",
            fontSize: "16px",
            border: "2px solid #3d1c6f",
          },
        }}
      >
        
        <Typography.Title level={4} style={{ fontSize: "25px" }}>
          Select Winner
        </Typography.Title>
        <Typography.Text style={{ fontSize: 16 }}>
        Are You Sure You Want To  Make this Entry the Winner
        </Typography.Text>
      </Modal>
      <br />
      <br />
    </Layout>
  );
}
export default ContestView;
