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
  message,
  Select,
  Image,
  Modal,
  Skeleton,
} from "antd";
import dayjs from "dayjs";
import { UserOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { FaCaretDown, FaFilter, FaArrowLeft } from "react-icons/fa";
import { Get } from "../../config/api/get";
import { UPLOAD_URL,UPLOAD_URL2 , GALLERY } from "../../config/constants";
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
    const [gallery, setGallery] = useState([]);
    const [page,setPage] = useState(1)
    const [hasMore,setHasMore] = useState(true)

    useEffect(() => {
          getMyGallery();
    }, []);
  
    const getMyGallery = async (pageNumber, keyword, max, min, sbj, days) => {
      setLoading(true);
      try {
        const response = await Get(GALLERY.getMyGallery + id,token);
        setLoading(false);
        console.log("response", response);
        if (response?.status) {
          setGallery(response?.data?.gallery);
        } else {
          message.error("Something went wrong!");
          console.log("error====>", response);
        }
      } catch (error) {
        console.log(error.message);
        setLoading(false);
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
           Gallery
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
                class="boxDetails2"
                style={{ maxHeight: "100vh", overflowY: "auto",color:'black',padding:"50px" }}
              >
              
                <br/>

                {gallery.length == 0 && (
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
                      No Images Found
                    </h5>
                  </div>
                )}

{gallery.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                   
                      justifyContent: "center",
                      alignItems: "center",
                      
                    }}
                  >
{ gallery.map((item,index) => {
                return(<div class="col-lg-3">
                <div class="contest-gallery">
                 
                    <Image src={UPLOAD_URL + "/" +item.image} alt="" class="img-fluid w-100" style={{width:"100%",height:"300px",objectFit:"cover"}} />
                </div>
              </div>);
            })}

                  </div>)}


           
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
