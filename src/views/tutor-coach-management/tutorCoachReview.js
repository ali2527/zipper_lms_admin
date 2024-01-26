import React, { useEffect, useState } from "react";
import { Col, Row, Typography,Rate,Progress,Image, Layout, Skeleton } from "antd";
import dayjs from "dayjs";
import { FaArrowRight ,FaArrowLeft } from "react-icons/fa";
import { Get } from "../../config/api/get";
import { REVIEWS,UPLOAD_URL } from "../../config/constants";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";


function CoachReview() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.userToken);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [reviews,setReviews] = useState([])
  const [ratings,setRatings] = useState({})
  const [paginationConfig, setPaginationConfig] = useState({
    pageNumber: 1,
    limit: 10,
    totalDocs: 0,
    totalPages: 0,
  });

  useEffect(() => {
    getReviews();
  }, []);

  const handlePageChange = (e) => {
    setPaginationConfig({
      ...paginationConfig,
      pageNumber: Number(e.selected) + 1,
    });

    getReviews(Number(e.selected) + 1);
  };

  const getReviews = async (pageNumber) => {
    setLoading(true);
    try {
      const response = await Get(REVIEWS.getAll + id, token, {
        page: pageNumber
          ? pageNumber.toString()
          : paginationConfig.pageNumber.toString(),
        limit: "5",
      });
      setLoading(false);
      console.log("response", response);
      if (response?.status) {
        setReviews(response?.data?.reviews);
        setRatings(response.data.ratings)
        setPaginationConfig({
          pageNumber: response?.data?.page,
          limit: response?.data?.limit,
          totalDocs: response?.data?.totalReviews,
          totalPages: response?.data?.totalPages,
        });
      } else {
        // message.error("Something went wrong!");
        console.log("error====>", response);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
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
             Ratings & Reviews
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

        {!loading &&  (
          <div style={{ padding: "30px" }}>
           <Row
                    gutter={[20, 0]}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      margin: 0,
                    }}
                  >
                    <Col>
                      <Typography.Text
                        className="fontFamily1"
                        style={{
                          fontSize: "14px",
                          color: "rgba(0, 0, 0, 0.50)",
                          textAlign: "left",
                        }}
                      >
                        5 Star
                      </Typography.Text>
                    </Col>
                    <Col>
                      <Rate
                      disabled 
                        allowHalf
                        value={5}
                        style={{ color: "#FABF35", marginTop: -10 }}
                      />
                    </Col>
                    <Col xs={18}>
                      <Progress
                        strokeLinecap="butt"
                        percent={ratings[5]}
                        strokeColor={{ from: "#FABF35", to: "#FABF35" }}
                        style={{ width: "100%", color: "#FABF35" }}
                      />
                    </Col>
                  </Row>

                  <Row
                    gutter={[20, 0]}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      margin: 0,
                    }}
                  >
                    <Col>
                      <Typography.Text
                        className="fontFamily1"
                        style={{
                          fontSize: "14px",
                          color: "rgba(0, 0, 0, 0.50)",
                          textAlign: "left",
                        }}
                      >
                        4 Star
                      </Typography.Text>
                    </Col>
                    <Col>
                      <Rate
                      disabled 
                        allowHalf
                        value={4}
                        style={{ color: "#FABF35", marginTop: -10 }}
                      />
                    </Col>
                    <Col xs={18}>
                      <Progress
                        strokeLinecap="butt"
                        percent={ratings[4]}
                        strokeColor={{ from: "#FABF35", to: "#FABF35" }}
                        style={{ width: "100%", color: "#FABF35" }}
                      />
                    </Col>
                  </Row>

                  <Row
                    gutter={[20, 0]}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      margin: 0,
                    }}
                  >
                    <Col>
                      <Typography.Text
                        className="fontFamily1"
                        style={{
                          fontSize: "14px",
                          color: "rgba(0, 0, 0, 0.50)",
                          textAlign: "left",
                        }}
                      >
                        3 Star
                      </Typography.Text>
                    </Col>
                    <Col>
                      <Rate
                      disabled 
                        allowHalf
                        value={3}
                        style={{ color: "#FABF35", marginTop: -10 }}
                      />
                    </Col>
                    <Col xs={18}>
                      <Progress
                        strokeLinecap="butt"
                        percent={ratings[3]}
                        strokeColor={{ from: "#FABF35", to: "#FABF35" }}
                        style={{ width: "100%", color: "#FABF35" }}
                      />
                    </Col>
                  </Row>

                  <Row
                    gutter={[20, 0]}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      margin: 0,
                    }}
                  >
                    <Col>
                      <Typography.Text
                        className="fontFamily1"
                        style={{
                          fontSize: "14px",
                          color: "rgba(0, 0, 0, 0.50)",
                          textAlign: "left",
                        }}
                      >
                        2 Star
                      </Typography.Text>
                    </Col>
                    <Col>
                      <Rate
                      disabled 
                        allowHalf
                        value={2}
                        style={{ color: "#FABF35", marginTop: -10 }}
                      />
                    </Col>
                    <Col xs={18}>
                      <Progress
                        strokeLinecap="butt"
                        percent={ratings[2]}
                        strokeColor={{ from: "#FABF35", to: "#FABF35" }}
                        style={{ width: "100%", color: "#FABF35" }}
                      />
                    </Col>
                  </Row>

                  <Row
                    gutter={[20, 0]}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      margin: 0,
                    }}
                  >
                    <Col>
                      <Typography.Text
                        className="fontFamily1"
                        style={{
                          fontSize: "14px",
                          color: "rgba(0, 0, 0, 0.50)",
                          textAlign: "left",
                        }}
                      >
                        1 Star
                      </Typography.Text>
                    </Col>
                    <Col>
                      <Rate
                      disabled 
                        allowHalf
                        value={1}
                        style={{ color: "#FABF35", marginTop: -10 }}
                      />
                    </Col>
                    <Col xs={18}>
                      <Progress
                        strokeLinecap="butt"
                        percent={ratings[1]}
                        strokeColor={{ from: "#FABF35", to: "#FABF35" }}
                        style={{ width: "100%", color: "#FABF35" }}
                      />
                    </Col>
                  </Row>

                  <br/>
                  <br/>

                  {reviews.length == 0 && <div className="flex" style={{width:"100%",minHeight:"300px"}}> <Typography.Title
                        className="fontFamily1"
                        style={{
                          fontSize: "25px",
                          color: "black",
                          textAlign: "left",
                        }}
                      >
                       No Reviews Yet
                      </Typography.Title></div>}
                {reviews.length > 0 && reviews.map((item,index) => {
                  return(   <Row
                    style={{
                      justifyContent: "flex-start",
                      flexDirection: "column",
                      padding: "10px 30px",
                      
                    }}
                  >
                  <div style={{width:"100%",background:"#EEFDFF",borderRadius:"27px",padding:"20px"}}>
                    <Row gutter={20}>
                      <Col xs={4}>
                      <Image
                    src={!item.student.image ? "/images/avatar.png" : UPLOAD_URL + "/" + item.student.image }
                    height={100}
                    width={100}
                    style={{ borderRadius: "100px", objectFit: "cover" }}
                  />
                      </Col>
                      <Col xs={20}>
                      <Typography.Title
                      className="fontFamily1"
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "black",
                        textAlign: "left",
                        marginTop: 0,
                        marginBottom: 0,
                      }}
                    >
                      {item?.student?.firstName + " " + item?.student?.lastName}
                    </Typography.Title>
                    <Row gutter={10} style={{display:"flex",alignItems:"center"}}>
                      <Col>
                      <Typography.Title
                      className="fontFamily1"
                      style={{
                        fontSize: "12px",
                        fontWeight: "bold",
                        color: "black",
                        textAlign: "left",
                        marginTop: 0,
                        marginBottom: 0,
                      }}
                    >
                      {item?.rating || 1} Stars
                    </Typography.Title>
                      </Col>
                      <Col>
                      <Rate
                      disabled 
                          value={item?.rating || 1}
                          style={{ fontSize:"12px", color: "#FABF35", marginTop: "-30px" }}
                        />
  
                      </Col>
                      <Col>
                      <Typography.Title
                      className="fontFamily1"
                      style={{
                        fontSize: "12px",
                        fontWeight: "bold",
                        color: "black",
                        textAlign: "left",
                        marginTop: 0,
                        marginBottom: 0,
                      }}
                    >
                      {dayjs(item?.createdAt).format("DD MMMM, YYYY")}
                    </Typography.Title>
  
                      </Col>
                    </Row>
                   
                    <Typography.Text
                      className="fontFamily1"
                      style={{
                        fontSize: "12px",
                        color: "rgba(0, 0, 0, 0.50)",
                        textAlign: "left",
                        lineHeight:"12px",
                        marginTop: 0,
                      }}
                    >
                      {item?.comment}
                    </Typography.Text>
                      </Col>
                    </Row>
  
                  </div>
                  </Row>);
                })}
             

                <ReactPaginate
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
            />

          </div>
        )}
      </div>
    </Layout>
  );
}
export default CoachReview;
