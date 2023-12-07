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
import { COURSE ,CATEGORIES } from "../../config/constants";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const { Option } = Select;



function CourseManagement() {
  const token = useSelector((state) => state.user.userToken);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [paginationConfig, setPaginationConfig] = useState({
    pageNumber: 1,
    limit: 10,
    totalDocs: 0,
    totalPages: 0,
  });
  const navigate = useNavigate();

  const [filter, setFilter] = useState({
    status: null,
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
    getCourses();
    getCategories();
  }, []);


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
  

  const handlePageChange = (pageNumber) => {
    setPaginationConfig({
      ...paginationConfig,
      pageNumber: pageNumber,
    });

    getCourses(pageNumber);
  };

  const handleSearch = (value) => {
    setFilter({
      ...filter,
      keyword: value,
    });
  };

  const handleStatusChange = (value) => {
    setFilter({
      ...filter,
      category: value,
    });
  };

  const resetFilter = () => {
    setFilter({
      category: "",
      keyword: "",
      from: null,
      to: null,
    });
    getCourses(paginationConfig.pageNumber, paginationConfig.limit, "", true);
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

    getCourses(1, pageSize);
  };

  const handleStatus = async () => {
    try {
      const index = courses.findIndex((user) => user._id == selectedUser._id);

      console.log(index)
      const response = await Get(COURSE.toggleStatus + "/" + selectedUser._id , token,{});
      const newUsers = [...courses];
      
      console.log(">>>>",newUsers[index].isActive)
      console.log(">>>>",selectedUser.isActive)
      newUsers[index].isActive = !selectedUser.isActive;
      setModalOpen(false);
      setCourses(newUsers);
    } catch (error) {
      console.log(error.message);
    }  
    
  };
  



  const getCourses = async (pageNumber, pageSize, search, reset = false) => {
    setLoading(true);
    try {
      const response = await Get(COURSE.getAllCourses, token, {
        page: pageNumber
          ? pageNumber.toString()
          : paginationConfig.pageNumber.toString(),
        limit: pageSize
          ? pageSize.toString()
          : paginationConfig.limit.toString(),
        category: reset ? "" : filter.category || null,
        keyword: search ? search : null,
        from: reset ? "" : filter?.from ? filter?.from.toISOString() : "",
        to: reset ? "" : filter?.to ? filter?.to.toISOString() : "",
      });
      setLoading(false);
      console.log("response", response);
      if (response?.data?.docs) {
        setCourses(response?.data?.docs);
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
      render: (value, item, index) => (index < 10 && "0") + (index + 1),
    },
    {
      title: "Course Code",
      dataIndex: "courseCode",
      key: "courseCode",
    },
    {
      title: "Title	",
      dataIndex: "title",
      key: "title",
    },
    
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (item) => item.title,
    },
    // {
    //     title: "Duration",
    //     dataIndex: "duration",
    //     key: "duration",
        
    //   },
    //   {
    //     title: "Start Date",
    //     dataIndex: "startDate",
    //     key: "startDate",
    //     render: (item) => <span>{dayjs(item).format("M/D/YYYY")}</span>,
    //   },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (item) => (
        <FaEye
          style={{ fontSize: "16px", color: "#203453",  cursor: "pointer" }}
             onClick={() => navigate("/course-details/" + item )}
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
        <p className="mainLabel">Start Date:</p>
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

        <p className="mainLabel">Filter by Category:</p>

        {/* <Select
          size={"large"}
          className="filterSelectBox"
          placeholder="Select Status"
          value={filter.status}
          onChange={(e) => handleStatusChange(e)}
          style={{
            width: "100%",
            marginBottom: "10px",
            textAlign: "left",
          }}
          options={[
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
          ]}
        /> */}

<Select
           size={"large"}
           className="filterSelectBox"
           placeholder="Select Category"
           value={filter.category}
           onChange={(e) => handleStatusChange(e)}
           style={{
             width: "100%",
             marginBottom: "10px",
             textAlign: "left",
           }}
        >
          {categories.map((item,index) => {
            return(<Option value={item._id}>{item.title}</Option>)
          })}

        </Select>

        <Button
          type="primary"
          shape="round"
          block
          size={"large"}
          style={{ marginBottom: "10px" }}
          className="mainButton primaryButton"
          onClick={() => getCourses()}
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
      <Row style={{ padding: "10px 20px" }}>
          <Col
            xs={24}
            md={12}
            style={{ display: "flex", alignItems: "center" }}
          >
            <h1 className="pageTitle">Course Management</h1>
          </Col>
          <Col
            xs={24}
            md={12}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Button
              type="primary"
              shape="round"
              size={"large"}
              style={{ padding: "8px 40px", height: "auto" }}
              className="loginButton"
              onClick={() => navigate("/category")}
            >
              Add Category
            </Button>
            &emsp;
            <Button
              type="primary"
              shape="round"
              size={"large"}
              style={{ padding: "8px 40px", height: "auto" }}
              className="loginButton"
              onClick={() => navigate("/course-details/add")}
            >
              Add Course
            </Button>

          </Col>
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
                    getCourses(1, paginationConfig.limit, filter.keyword)
                  }
                />
              }
              onPressEnter={(e) =>
                getCourses(1, paginationConfig.limit, filter.keyword)
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
              dataSource={courses}
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
      <Modal
        visible={modalOpen}
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
        
        <Typography.Title level={4} style={{ fontSize: "25px" }}>
          {selectedUser?.isActive ? "Deactivate" : "Activate"}
        </Typography.Title>
        <Typography.Text style={{ fontSize: 16 }}>
        Do You Want To  {selectedUser?.isActive ? "Deactivate" : "Activate"} This Service Provider?
        </Typography.Text>
      </Modal>
    </Layout>
  );
}

export default CourseManagement;
