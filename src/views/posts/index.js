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
  Skeleton,
} from "antd";
import dayjs from "dayjs";
import { UserOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { FaCaretDown, FaFilter, FaArrowLeft } from "react-icons/fa";
import { Get } from "../../config/api/get";
import { UPLOAD_URL , NEWS } from "../../config/constants";
import { useNavigate,useParams } from "react-router-dom";
import VideoPlayer from "../../components/VideoPlayer";
import { useSelector } from "react-redux";
import { Post } from "../../config/api/post";
import uPic from "../../assets/images/u-pic.png";
import pic from "../../assets/images/pic.png";
import { CONTENT_TYPE } from "../../config/constants/index";
import { FaRegPaperPlane } from "react-icons/fa";

import {
    AiOutlineLike,
    AiOutlineHeart,
    AiOutlineCamera,
    AiOutlineVideoCamera,
  } from "react-icons/ai";
  import { ImAttachment } from "react-icons/im";
  import { BsPostcardHeart, BsCheck } from "react-icons/bs";


function Posts() {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user.userData);
    const token = useSelector((state) => state.user.userToken);
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState("");
    const [postTitle, setPostTitle] = useState("");
    const {id} = useParams()
    const [postText, setPostText] = useState("");
    const [selectedIndex, setSelectedIndex] = useState();
    const [news, setNews] = useState([]);
    const [file, setFile] = useState();
    const [postImages, setPostImages] = useState([]);
    const [postVideos, setPostVideos] = useState([]);
    const [page,setPage] = useState(1)
    const [hasMore,setHasMore] = useState(true)

  useEffect(() => {
    getNewsFeed();
  }, [])
  

  const getNewsFeed = async (pageNumber) => {
    setLoading(true);
    try {
      const response = await Get(NEWS.getUserPosts + id, token, {
        page: pageNumber ? pageNumber.toString() :  "1",
        limit: "2",
      });
      setLoading(false);
      console.log("response", response);
      if (response?.status) {

        if(response?.data?.posts.length == 0) {
          setHasMore(false);
          return;
        }
        if(pageNumber && pageNumber > 1){
          setNews([...news,...response?.data?.posts]);
        }else{
          setNews(response?.data?.posts);
        }
      } else {
        console.log("error====>", response);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };


  const likePost = async (index) => {
    let _news = [...news];
    let postId = _news[index]._id;

    try {
      const response = await Get(NEWS.likePost + "/" + postId, token, {});
      setLoading(false);
      console.log("response11", response);
      if (response?.status) {
        if (_news[index].likes.includes(user._id.toString())) {
          _news[index].likes.splice(index, 1);
        } else {
          _news[index].likes.push(user._id.toString());
        }

        setNews(_news);
      } else {
        console.log("error====>", response);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const lovePost = async (index) => {
    let _news = [...news];
    let postId = _news[index]._id;

    try {
      const response = await Get(NEWS.lovePost + "/" + postId, token, {});
      setLoading(false);
      console.log("response11", response);
      if (response?.status) {
        if (_news[index].loves.includes(user._id.toString())) {
          _news[index].loves.splice(index, 1);
        } else {
          _news[index].loves.push(user._id.toString());
        }

        setNews(_news);
      } else {
        console.log("error====>", response);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };









  const handleScroll = (event) => {
    const target = event.target;
    const isScrolledToBottom = target.scrollHeight - target.scrollTop === target.clientHeight;

    if (isScrolledToBottom) {
      if(hasMore){
        getNewsFeed(page+1);
        setPage(page+1);
      }
    }
  };




  return (
    <Layout className="configuration">
      <Row style={{ padding: "10px 20px" }}>
        <Col xs={24} md={12} style={{ display: "flex", alignItems: "center" }}>
          <FaArrowLeft
            style={{ fontWeight: "bold", fontSize: "20px" }}
            onClick={() => navigate(-1)}
          />
          &emsp;
          <h1 className="pageTitle" style={{ margin: 0 }}>
           Posts
          </h1>
        </Col>
      </Row>
      <br />
      <div >
        {loading && (
          <div
          className="boxDetails2"
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

        {!loading && user && (
          <>
          <div
                class="scrollNew boxDetails2"
                onScroll={(e)=>handleScroll(e)}
                style={{ maxHeight: "100vh", overflowY: "auto",color:'black',padding:"50px" }}
              >
              
                <br/>

                {news.length == 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "60vh",
                    }}
                  >
                    <BsPostcardHeart
                      style={{ color: "black", fontSize: "50px" }}
                    />
                    <h5 className="page-heading" style={{ fontSize: "40px",color:'black' }}>
                      No Posts Found
                    </h5>
                  </div>
                )}

                {news.length > 0 && (
                  <>
                    {news.map((item, index) => {
                      console.log("item", item);
                      return (
                        <div class="row">
                          <div class="user-comments-etc">
                            <div class="row">
                              <div class="col-md-6 order-lg-1 order-md-1 order-2">
                                <div class="d-flex align-items-center">
                                  <div class="flex-shrink-0">
                                    <img
                                      src={
                                        item?.author?.image
                                          ? UPLOAD_URL +
                                         
                                            item?.author?.image
                                          : pic
                                      }
                                      alt="..."
                                      class="img-fluid"
                                      style={{
                                        width: "40px",
                                        height: "40px",
                                        objectFit: "cover",
                                        borderRadius:"50px"
                                      }}
                                    />
                                  </div>
                                  <div class="flex-grow-1 ms-3" >
                                    <h5 style={{color:"black"}}>{item?.author?.fullName}</h5>
                                    <small style={{color:"black"}}>
                                      <i class="fas fa-edit"></i> Posted on{" "}
                                      {dayjs(item?.createdAt).format(
                                        "MM/DD/YYYY h:m A "
                                      )}{" "}
                                    </small>
                                  </div>
                                </div>
                              </div>

                              <div class="col-md-6 text-end order-lg-2 order-md-2 order-1">
                                <div class="btn-group custom-dropdown ml-2 mb-1">
                                  <button
                                    type="button"
                                    class="btn btn-drop-table btn-sm"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                  >
                                    {" "}
                                    <i class="fa fa-ellipsis-h text-black"></i>
                                  </button>
                                  <div class="dropdown-menu custom-dropdown">
                                    <a
                                      href="edit-post.php"
                                      class="dropdown-item"
                                    >
                                      <i class="fas fa-clipboard-list"></i>
                                      Edit
                                    </a>
                                    <a href="#_" class="dropdown-item">
                                      <i class="fas fa-trash"></i>
                                      Delete
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <br />
                            <br />

                            {item?.content && <p style={{color:"black"}}>{item?.content}</p>}
                            <br />
                            <div className="row">
                              {item?.images.length > 0 && (
                                <>
                                  {item.images.map((imag) => {
                                    return (
                                      <div className="col-xs-6 col-md-3">
                                        <img
                                          style={{
                                            width: "100%",
                                            height: "300px",
                                            objectFit: "cover",
                                          }}
                                          src={UPLOAD_URL  + imag}
                                          alt="..."
                                          class="img-fluid"
                                        />
                                      </div>
                                    );
                                  })}
                                </>
                              )}
                              {item?.videos && item?.videos?.length > 0 && (
                                <>
                                  {item?.videos.map((vdo) => {
                                    return (
                                      <div className="col-xs-6 col-md-3">
                                        {" "}
                                        <VideoPlayer
                                          vdo={UPLOAD_URL  + vdo}
                                        />{" "}
                                      </div>
                                    );
                                  })}
                                </>
                              )}
                            </div>
                            <br />
                            <div class="like-heart-box">
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  fontSize: "16px",
                                }}
                              >
                                <AiOutlineLike
                                  style={{
                                    color: item?.likes.includes(
                                      user._id.toString()
                                    )
                                      ? "blue"
                                      : "black",
                                    cursor: "pointer",
                                  }}
                                 
                                />{" "}
                                &nbsp;
                                <span style={{ color: "black" }}>
                                  {item?.likes?.length}
                                </span>
                                &emsp;{" "}
                                <AiOutlineHeart
                                  style={{
                                    color: item?.loves.includes(
                                      user._id.toString()
                                    )
                                      ? "red"
                                      : "black",
                                  }}
                                
                                />{" "}
                                &nbsp;
                                <span style={{ color: "black" }}>
                                  {item?.loves?.length}
                                </span>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  fontSize: "16px",
                                }}
                              >
                                {" "}
                                <span>{item?.comments?.length} Comments </span>
                              </div>
                            </div>
                          </div>
                          <br />
                          <div
                            class="row m-auto scrollNew"
                            style={{
                              padding: "20px",
                              margin: "100px",
                              maxHeight: "300px",
                              overflowY: "auto",
                            }}
                          >
                            {item?.comments &&
                              item?.comments.length > 0 &&
                              item?.comments.map((cmnt) => {
                                return (
                                  <>
                                    <div class="view-img-comm-box mw-100 ">
                                      <div class="d-flex">
                                        <div class="flex-shrink-0">
                                          <img
                                            src={
                                              cmnt?.author?.image
                                                ? UPLOAD_URL + cmnt?.author?.image
                                                : pic
                                            }
                                            alt="..."
                                            class="img-fluid"
                                            style={{
                                              width: "40px",
                                              height: "40px",
                                              objectFit: "cover",
                                              borderRadius: "50px",
                                            }}
                                          />
                                        </div>

                                        <div
                                          class="flex-grow-1 ms-3"
                                          style={{
                                            color: "black",
                                            display: "flex",
                                            justifyContent: "space-between",
                                          }}
                                        >
                                          <h5 style={{color:'black'}}>{cmnt?.author?.fullName}</h5>
                                          <small>
                                            <i class="fas fa-edit"></i>{" "}
                                            {dayjs(item?.createdAt).format(
                                              "MM/DD/YYYY h:m A "
                                            )}{" "}
                                          </small>
                                        </div>
                                      </div>
                                      <br />
                                      <p style={{ fontSize: "14px", color: "black",  }}>
                                        {cmnt?.text}
                                      </p>
                                      <br />
                                      {cmnt?.image && (
                                        <img
                                          src={
                                            UPLOAD_URL +
                                            "Uploads/" +
                                            cmnt?.image
                                          }
                                          alt="..."
                                          class="img-fluid"
                                          style={{
                                            width: "100px",
                                            height: "100px",
                                            objectFit: "cover",
                                          }}
                                        />
                                      )}
                                    </div>
                                  </>
                                );
                              })}
                          </div>
                          <br />
                       

                          <hr />
                          <br />
                          <br />
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
          
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
export default Posts;
