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
import { Get } from "../../config/api/get";
import { LESSON, lessons } from "../../config/constants";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function SubmittedLessons() {
  const token = useSelector((state) => state.user.userToken);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [paginationConfig, setPaginationConfig] = useState({
    pageNumber: 1,
    limit: 10,
    totalDocs: 0,
    totalPages: 0,
  });
  const navigate = useNavigate();

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

  

  const handlePageChange = (pageNumber) => {
    setPaginationConfig({
      ...paginationConfig,
      pageNumber: pageNumber,
    });

    getLessons(pageNumber);
  };

  const handleSearch = (value) => {
    setFilter({
      ...filter,
      keyword: value,
    });
  };

  const handleTypeChange = (value) => {
    setFilter({
      ...filter,
      type: value,
    });
  };

  const resetFilter = () => {
    setFilter({
      status: null,
      keyword: "",
      from: null,
      to: null,
    });
    getLessons(paginationConfig.pageNumber, paginationConfig.limit, "", true);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const handleFrom = (date) => {
    setFilter({
      ...filter,
      from: date,
    });
  };

  const handleTo = (date) => {
    setFilter({
      ...filter,
      to: date,
    });
  };

  const handleLimitChange = (pageSize) => {
    setPaginationConfig({
      ...paginationConfig,
      limit: pageSize,
      current: 1,
    });

    getLessons(1, pageSize);
  };

  const handleStatus = async () => {
    try {
      const index = lessons.findIndex((user) => user._id == selectedUser._id);

      console.log(index)
      const response = await Get(lessons.toggleStatus  + selectedUser._id , token,{});
      const newUsers = [...lessons];
      
      console.log(">>>>",newUsers[index].isActive)
      console.log(">>>>",selectedUser.isActive)
      newUsers[index].status = newUsers[index].status == "ACTIVE" ? "INACTIVE" : "ACTIVE"
      setModalOpen(false);
      setLessons(newUsers);
    } catch (error) {
      console.log(error.message);
    }  
    
  };
  
  const getLessons = async (pageNumber, pageSize, search, reset = false) => {
    setLoading(true);
    try {
      const response = await Get(LESSON.SubmittedLessons, token, {
        page: pageNumber
          ? pageNumber.toString()
          : paginationConfig.pageNumber.toString(),
        limit: pageSize
          ? pageSize.toString()
          : paginationConfig.limit.toString(),
        type: reset ? "" : filter.type || null,
        keyword: search ? search : null,
        from: reset ? "" : filter?.from ? filter?.from.toISOString() : "",
        to: reset ? "" : filter?.to ? filter?.to.toISOString() : "",
      });
      setLoading(false);
      console.log("response101", response.data);
      if (response?.status) {
        setLessons(response?.data?.docs);
        setPaginationConfig({
          pageNumber: response?.data?.page,
          limit: response?.data?.limit,
          totalDocs: response?.data?.totalDocs,
          totalPages: response?.data?.totalPages,
        });
      } else {
        message.error("Something went wrong!");
        console.log("error====>", response);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  console.log("paginationConfig", paginationConfig);

  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  };

  const columns = [
    {
      title: "S. No.	",
      dataIndex: "key",
      key: "key",
      width: 100,
      render: (value, item, index) => (index < 10 && "0") + (index + 1),
    },
    {
      title: "Learner Name",
      dataIndex: "firstName",
      key: "firstName",
      render: (value, item, index) => <>{item?.student?.firstName + " " + item?.student?.lastName }</>,
    },
    {
      title: "Tutor / Coach Name",
      dataIndex: "firstName",
      key: "firstName",
      render: (value, item, index) => <>{item?.coach?.firstName + " " + item?.coach?.lastName }</>,
    },
    {
      title: "Lesson Date",
      dataIndex: "lessonDate",
      key: "lessonDate",
      render: (item) => <span>{dayjs(item).format("MM/DD/YYYY")}</span>,
    },
    {
      title: "Lesson Charge",
      dataIndex: "charges",
      key: "charges",
      render: (item) => <span>${item}</span>,
    },
    {
      title: "Lesson Type",
      dataIndex: "lessonType",
      key: "lessonType",
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (item) => (
        <FaEye
          style={{ fontSize: "16px", color: "#203453",  cursor: "pointer" }}
             onClick={() => navigate("/lesson-details/" + item )}
        />
      ),
    },
  ];

  const filterContent = (
    <div className="filterDropdown">
      <div>
        <p className="mainLabel" style={{ padding: "10px" }}>
          Filter
        </p>
      </div>
      <hr style={{ margin: 0 }} />

      <div className="filterDropdownBody">
        <p className="mainLabel">Sort By:</p>
        <DatePicker
          className="mainInput filterInput"
          value={filter.from}
          onChange={(e) => handleFrom(e)}
        />
        <DatePicker
          className="mainInput filterInput"
          value={filter.to}
          onChange={(e) => handleTo(e)}
        />

        <p className="mainLabel">Filter by Type:</p>

        <Select
          size={"large"}
          className="filterSelectBox"
          placeholder="Select Lesson Type"
          value={filter.type}
          onChange={(e) => handleTypeChange(e)}
          style={{
            width: "100%",
            marginBottom: "10px",
            textAlign: "left",
          }}
          options={[
            { value: "TUTORING", label: "Tutoring" },
            { value: "COACHING", label: "Coaching" },
           
          ]}
        />

        <Button
          type="primary"
          shape="round"
          block
          size={"large"}
          style={{ marginBottom: "10px" }}
          className="mainButton primaryButton"
          onClick={() => getLessons()}
        >
          Apply
        </Button>
        <Button
          type="primary"
          shape="round"
          block
          size={"large"}
          className="mainButton primaryButton2"
          onClick={() => resetFilter()}
        >
          Clear All
        </Button>
      </div>
    </div>
  );

  return (
    <Layout className="configuration">
      

      <div className="boxDetails2">
      <Row style={{ padding: "10px 20px 0" }}>
          <h1 className="pageTitle">Submitted Lessons</h1>
        </Row>
       
        <Row style={{ padding: "10px 20px" }}>
          <Col xs={24} md={12}>
            <h5 style={{ display: "inline", fontSize: 16 }}>Show : </h5>
            <Select
              size={"large"}
              className="chartSelectBox"
              defaultValue={paginationConfig.limit}
              onChange={(e) => handleLimitChange(e)}
              style={{
                width: 70,
                textAlign: "left",
              }}
              options={[
                { value: 10, label: "10" },
                { value: 20, label: "20" },
                { value: 30, label: "30" },
                { value: 40, label: "40" },
                { value: 50, label: "50" },
              ]}
            />
            &emsp;
            <h5 style={{ display: "inline", fontSize: 16 }}>Entries</h5>
          </Col>
          <Col
            xs={24}
            md={12}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
               <Popover
              content={filterContent}
              trigger="click"
              open={open}
              onOpenChange={handleOpenChange}
              placement="bottomRight"
              arrow={false}
            >
              <Button
                style={{
                  padding: "8px 11px",
                  height: "auto",
                  borderRadius:"50px",
                  backgroundColor: "#7cc059",
                }}
              >
                <FaFilter style={{ fontSize: "16px", color: "white" }} />
              </Button>
            </Popover>
            &emsp;
            <Input
              style={{ width: "250px" }}
              className="mainInput dashInput"
              placeholder="Search"
              onChange={(e) => handleSearch(e.target.value)}
              suffix={
                <FaSearch
                  style={{
                    color: "#203453",
                    fontSize: 16,
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    getLessons(1, paginationConfig.limit, filter.keyword)
                  }
                />
              }
              onPressEnter={(e) =>
                getLessons(1, paginationConfig.limit, filter.keyword)
              }
            />
           
         
          </Col>
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
            <Table
              className="styledTable"
              dataSource={lessons}
              columns={columns}
              pagination={false}
            />
          )}
        </Row>
        <Row style={{ padding: "10px 20px" }}>
          <Col xs={24} md={12}>
            <p>{message}</p>
          </Col>
          <Col
            xs={24}
            md={12}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Pagination
              className="styledPagination"
              onChange={(e) => handlePageChange(e)}
              current={parseInt(paginationConfig.pageNumber)}
              pageSize={paginationConfig.limit}
              total={paginationConfig.totalDocs}
              itemRender={itemRender}
            />
          </Col>
        </Row>
        <br />
      </div>
      <br />
      <br />

    </Layout>
  );
}

export default SubmittedLessons;