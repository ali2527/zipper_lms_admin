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
  Popover,
  Layout,
  Checkbox,
  Skeleton,
  Table,
  Spin,
  Select,
  Image,
  Pagination,
  DatePicker,
  message,
} from "antd";
import dayjs from "dayjs";
import { UserOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { FaSearch, FaFilter, FaCaretDown, FaEye } from "react-icons/fa";
import ClientLayout from "../../components/ClientLayout";
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import { Get } from "../../config/api/get";
import { LESSON, lessons } from "../../config/constants";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-big-calendar/lib/css/react-big-calendar.css"


function Calander() {
  const token = useSelector((state) => state.user.userToken);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [paginationConfig, setPaginationConfig] = useState({
    pageNumber: 1,
    limit: 10,
    totalDocs: 0,
    totalPages: 0,
  });
  const navigate = useNavigate();
  const localizer = dayjsLocalizer(dayjs)

  const [filter, setFilter] = useState({
    type: null,
    keyword: "",
    from: null,
    to: null,
  });

  const startIndex =
    (paginationConfig.pageNumber - 1) * paginationConfig.limit + 1;
  const endIndex = Math.min(
    startIndex + paginationConfig.limit - 1,
    paginationConfig.totalDocs
  );
  const message = `Showing records ${endIndex} of ${paginationConfig.totalDocs}`;

  useEffect(() => {
    getLessons();
  }, []);

 

  
  const getLessons = async (month,year) => {
 
    console.log("SSS",new Date().getFullYear())
    try {
      const response = await Get(LESSON.getLessonsByMonth , token, {
        month: month
          ? month.toString()
          : new Date().getMonth().toString(),
        year: year
          ? year.toString()
          : new Date().getFullYear().toString(),
      });
 
      console.log("response101", response.data);
      if (response?.status) {
        setEvents(response?.data.map(item => {return({
          title:item.lessonId,start: new Date(item.lessonDate),end: new Date(item.lessonDate),coach:item?.coach.firstName + " " + item?.coach.lastName,student:item?.student.firstName + " " + item?.student.lastName 
        })}));
      } else {
        message.error("Something went wrong!");
        console.log("error====>", response);
      }
    } catch (error) {
      console.log(error.message);
    
    }
  };

  console.log("paginationConfig", paginationConfig);


const  handleNavigate = (date, view) => {
  console.log(date)
  getLessons(new Date(date).getMonth(),new Date(date).getFullYear())
}


const CustomTooltip = ({ event }) => {
  console.log("event",event)
  return(
  <div className="custom-tooltip" style={{padding:"10px"}}>
    <h3 style={{textAlign:'center'}}>{event.title}</h3>
    <p style={{margin:'5px'}}><span style={{fontWeight:'bold'}}>Coach: </span> {event.coach}</p>
    <p style={{margin:'5px'}}><span style={{fontWeight:'bold'}}>Student: </span> {event.student}</p>
    {/* Add more event details as needed */}
  </div>
)};

  return (
    <Layout className="configuration">
      

      <div className="boxDetails2">
      <Row style={{ padding: "10px 20px 0" }}>
          <h1 className="pageTitle">Calander</h1>
        </Row>
       
   

        <Row style={{ padding: 20, overflow: "auto" }}>
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Skeleton active />
              <br />
            </div>
          ) : (
          <div style={{ width: "100%"}}><Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onNavigate={(e)=> handleNavigate(e)}
          components={{
            event: CustomTooltip, // Use the CustomTooltip component for event tooltips
          }}
          style={{ height: 800 }}
        /></div>
          )}
        </Row>
   
        <br />
      </div>
      <br />
      <br />
  
    </Layout>
  );
}

export default Calander;
