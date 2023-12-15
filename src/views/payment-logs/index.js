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
  Radio,
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
import { PAYMENT } from "../../config/constants";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function PaymentLogs() {
  const token = useSelector((state) => state.user.userToken);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [users2, setUsers2] = useState([]);
  const [paginationConfig, setPaginationConfig] = useState({
    pageNumber: 1,
    limit: 10,
    totalDocs: 0,
    totalPages: 0,
  });

  const [paginationConfig2, setPaginationConfig2] = useState({
    pageNumber: 1,
    limit: 10,
    totalDocs: 0,
    totalPages: 0,
  });
  const [mode, setMode] = useState('lesson');
  const handleModeChange = (e) => {
    setMode(e.target.value);
  };

  const navigate = useNavigate();

  const [filter, setFilter] = useState({
    status: null,
    keyword: "",
    from: null,
    to: null,
  });

  const [filter2, setFilter2] = useState({
    status: null,
    keyword: "",
    from: null,
    to: null,
  });

  const startIndex = (paginationConfig.pageNumber - 1) * paginationConfig.limit + 1;
  const endIndex = Math.min(
    startIndex + paginationConfig.limit - 1,
    paginationConfig.totalDocs
  );
  const message = `Showing records ${endIndex} of ${paginationConfig.totalDocs}`;


  const startIndex2 = (paginationConfig2.pageNumber - 1) * paginationConfig2.limit + 1;
  const endIndex2 = Math.min(
    startIndex2 + paginationConfig2.limit - 1,
    paginationConfig2.totalDocs
  );
  const message2 = `Showing records ${endIndex2} of ${paginationConfig2.totalDocs}`;


  useEffect(() => {
    getPaymentLogs();
    getPaymentLogs2();
  }, []);

  

  const handlePageChange = (pageNumber) => {
    setPaginationConfig({
      ...paginationConfig,
      pageNumber: pageNumber,
    });

    getPaymentLogs(pageNumber);
  };

  const handlePageChange2 = (pageNumber) => {
    setPaginationConfig2({
      ...paginationConfig2,
      pageNumber: pageNumber,
    });

    getPaymentLogs2(pageNumber);
  };

  const handleSearch = (value) => {
    setFilter({
      ...filter,
      keyword: value,
    });
  };

  const handleSearch2 = (value) => {
    setFilter2({
      ...filter,
      keyword: value,
    });
  };

  const handleStatusChange = (value) => {
    setFilter({
      ...filter,
      status: value,
    });
  };

  const handleStatusChange2 = (value) => {
    setFilter2({
      ...filter2,
      status: value,
    });
  };

  const resetFilter = () => {
    setFilter({
      status: null,
      keyword: "",
      from: null,
      to: null,
    });
    getPaymentLogs(paginationConfig.pageNumber, paginationConfig.limit, "", true);
  };

  const resetFilter2 = () => {
    setFilter2({
      status: null,
      keyword: "",
      from: null,
      to: null,
    });
    getPaymentLogs2(paginationConfig2.pageNumber, paginationConfig2.limit, "", true);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const handleOpenChange2 = (newOpen) => {
    setOpen2(newOpen);
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

  const handleFrom2 = (date) => {
    setFilter2({
      ...filter2,
      from: date,
    });
  };

  const handleTo2 = (date) => {
    setFilter2({
      ...filter2,
      to: date,
    });
  };


  const handleLimitChange = (pageSize) => {
    setPaginationConfig({
      ...paginationConfig,
      limit: pageSize,
      current: 1,
    });

    getPaymentLogs(1, pageSize);
  };

  const handleLimitChange2 = (pageSize) => {
    setPaginationConfig2({
      ...paginationConfig2,
      limit: pageSize,
      current: 1,
    });

    getPaymentLogs2(1, pageSize);
  };

 
  const getPaymentLogs = async (pageNumber, pageSize, search, reset = false) => {
    setLoading(true);
    try {
      const response = await Get(PAYMENT.getAllLessonPayments, token, {
        page: pageNumber
          ? pageNumber.toString()
          : paginationConfig.pageNumber.toString(),
        limit: pageSize
          ? pageSize.toString()
          : paginationConfig.limit.toString(),
        status: reset ? "" : filter.status || null,
        keyword: search ? search : null,
        from: reset ? "" : filter?.from ? filter?.from.toISOString() : "",
        to: reset ? "" : filter?.to ? filter?.to.toISOString() : "",
      });
      setLoading(false);
      console.log("response", response);
      if (response?.status) {
        setUsers(response?.data?.docs);
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

  
  const getPaymentLogs2 = async (pageNumber, pageSize, search, reset = false) => {
    setLoading2(true);
    try {
      const response = await Get(PAYMENT.getAllCoursePayments, token, {
        page: pageNumber
          ? pageNumber.toString()
          : paginationConfig2.pageNumber.toString(),
        limit: pageSize
          ? pageSize.toString()
          : paginationConfig2.limit.toString(),
        status: reset ? "" : filter.status || null,
        keyword: search ? search : null,
        from: reset ? "" : filter2?.from ? filter2?.from.toISOString() : "",
        to: reset ? "" : filter2?.to ? filter2?.to.toISOString() : "",
      });
      setLoading2(false);
      console.log("response", response);
      if (response?.status) {
        setUsers2(response?.data?.docs);
        setPaginationConfig2({
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
      setLoading2(false);
    }
  };

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
      render: (value, item, index) => (index < 9 && "0") + (index + 1),
    },
    {
      title: "Lesson ID	",
      dataIndex: "lesson",
      key: "lesson",
      render: (value, item, index) => value?.lessonId || "",
    },
    {
      title: "Learner Name",
      dataIndex: "payee",
      key: "payee",
      render: (item) => (item?.firstName  + " " + item?.lastName ) || "",
    },
    {
      title: "Stripe ID",
      dataIndex: "lesson",
      key: "lesson",
      render: (item , value ) => item?.coach?.stripeAccount || "_" ,
    },
    {
      title: "Tutor/Coach Name",
      dataIndex: "lesson",
      key: "lesson",
      render: (item , value ) => value.type == "LESSON" ? (item?.coach?.firstName + " " + item?.coach?.lastName) : "-",
    },
    {
      title: "No of Lessons",
      dataIndex: "lesson",
      key: "lesson",
      render: (item) => item?.noOfLesson,
    },
    {
      title: "Lesson Date",
      dataIndex: "lesson",
      key: "lesson",
      render: (item) => <span>{dayjs(item?.lessonDate).format("M/D/YYYY")}</span>,
    },
    {
      title: "Paid Amount",
      dataIndex: "payout",
      key: "payout",
      render: (item) => <>${item}</>,
    },
    {
      title: "Paid Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (item) => <span>{dayjs(item).format("M/D/YYYY")}</span>,
    },

   
  ];

  const columns2 = [
    {
      title: "S. No.	",
      dataIndex: "key",
      key: "key",
      render: (value, item, index) => (index < 9 && "0") + (index + 1),
    },
    {
      title: "Course Code	",
      dataIndex: "course",
      key: "course",
      render: (value, item, index) => value?.courseCode || "",
    },
    {
      title: "Learner Name",
      dataIndex: "payee",
      key: "payee",
      render: (item) => (item?.firstName  + " " + item?.lastName ) || "",
    },

    {
      title: "Stripe ID",
      dataIndex: "course",
      key: "course",
      render: (item , value ) => item?.author?.stripeAccount || "_" ,
    },
    {
      title: "Author Name",
      dataIndex: "course",
      key: "course",
      render: (item , value ) => item?.author.firstName + " " + item?.author?.lastName,
    },
    {
      title: "Paid Amount",
      dataIndex: "amount",
      key: "amount",
      render: (item) => <>${item}</>,
    },
    {
      title: "Paid Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (item) => <span>{dayjs(item).format("M/D/YYYY")}</span>,
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
        <p className="mainLabel">Creation Date:</p>
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

        <p className="mainLabel">Filter by Status:</p>

        <Select
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
        />

        <Button
          type="primary"
          shape="round"
          block
          size={"large"}
          style={{ marginBottom: "10px" }}
          className="mainButton primaryButton"
          onClick={() => getPaymentLogs()}
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


  const filterContent2 = (
    <div className="filterDropdown">
      <div>
        <p className="mainLabel" style={{ padding: "10px" }}>
          Filter
        </p>
      </div>
      <hr style={{ margin: 0 }} />

      <div className="filterDropdownBody">
        <p className="mainLabel">Creation Date:</p>
        <DatePicker
          className="mainInput filterInput"
          value={filter2.from}
          onChange={(e) => handleFrom2(e)}
        />
        <DatePicker
          className="mainInput filterInput"
          value={filter2.to}
          onChange={(e) => handleTo2(e)}
        />

        <p className="mainLabel">Filter by Status:</p>

        <Select
          size={"large"}
          className="filterSelectBox"
          placeholder="Select Status"
          value={filter2.status}
          onChange={(e) => handleStatusChange2(e)}
          style={{
            width: "100%",
            marginBottom: "10px",
            textAlign: "left",
          }}
          options={[
            { value: "active", label: "Active" },
            { value: "inactive", label: "Inactive" },
          ]}
        />

        <Button
          type="primary"
          shape="round"
          block
          size={"large"}
          style={{ marginBottom: "10px" }}
          className="mainButton primaryButton"
          onClick={() => getPaymentLogs2()}
        >
          Apply
        </Button>
        <Button
          type="primary"
          shape="round"
          block
          size={"large"}
          className="mainButton primaryButton2"
          onClick={() => resetFilter2()}
        >
          Clear All
        </Button>
      </div>
    </div>
  );
  return (
    <Layout className="configuration">
      <div className="boxDetails2">
      <Row style={{ padding: "10px 20px",display:'flex',justifyContent:'space-between' }}>
          <h1 className="pageTitle">Payment Logs</h1>
          <Radio.Group
          className="radioSelector"
          size="large"
        onChange={handleModeChange}
        value={mode}
        style={{
          marginBottom: 8,
        }}
      >
        <Radio.Button value="lesson">Lesson Payments</Radio.Button>
        <Radio.Button value="course">Course Payments</Radio.Button>
      </Radio.Group>

        </Row>
      {mode =="lesson" ? <div className="">
        

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
                    getPaymentLogs(1, paginationConfig.limit, filter.keyword)
                  }
                />
              }
              onPressEnter={(e) =>
                getPaymentLogs(1, paginationConfig.limit, filter.keyword)
              }
            />
            &emsp;
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
                  padding: "10px 15px",
                  height: "auto",
                  backgroundColor: "#203453",
                }}
              >
                <FaFilter style={{ fontSize: "16px", color: "white" }} />
              </Button>
            </Popover>
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
          ) : (<>
            <Table
              className="styledTable"
              dataSource={users}
              columns={columns}
              pagination={false}
            />
          </>
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
      </div> : <div className="">
        

        <Row style={{ padding: "10px 20px" }}>
          <Col xs={24} md={12}>
            <h5 style={{ display: "inline", fontSize: 16 }}>Show : </h5>
            <Select
              size={"large"}
              className="chartSelectBox"
              defaultValue={paginationConfig2.limit}
              onChange={(e) => handleLimitChange2(e)}
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
            <Input
              style={{ width: "250px" }}
              className="mainInput dashInput"
              placeholder="Search"
              onChange={(e) => handleSearch2(e.target.value)}
              suffix={
                <FaSearch
                  style={{
                    color: "#203453",
                    fontSize: 16,
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    getPaymentLogs2(1, paginationConfig2.limit, filter2.keyword)
                  }
                />
              }
              onPressEnter={(e) =>
                getPaymentLogs2(1, paginationConfig2.limit, filter2.keyword)
              }
            />
            &emsp;
            <Popover
              content={filterContent2}
              trigger="click"
              open={open2}
              onOpenChange={handleOpenChange2}
              placement="bottomRight"
              arrow={false}
            >
              <Button
                style={{
                  padding: "10px 15px",
                  height: "auto",
                  backgroundColor: "#203453",
                }}
              >
                <FaFilter style={{ fontSize: "16px", color: "white" }} />
              </Button>
            </Popover>
          </Col>
        </Row>

        <Row style={{ padding: 20, overflow: "auto" }}>
          {loading2 ? (
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
          ) : (<>
             <Table
            className="styledTable"
            dataSource={users2}
            columns={columns2}
            pagination={false}
          />
          </>
          )}
        </Row>
        <Row style={{ padding: "10px 20px" }}>
          <Col xs={24} md={12}>
            <p>{message2}</p>
          </Col>
          <Col
            xs={24}
            md={12}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Pagination
              className="styledPagination"
              onChange={(e) => handlePageChange2(e)}
              current={parseInt(paginationConfig2.pageNumber)}
              pageSize={paginationConfig2.limit}
              total={paginationConfig2.totalDocs}
              itemRender={itemRender}
            />
          </Col>
        </Row>
        <br />
      </div>}
      </div>
      <br />
    
    </Layout>
  );
}

export default PaymentLogs;
