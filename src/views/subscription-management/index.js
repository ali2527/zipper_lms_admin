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
  Dropdown,
  Skeleton,
  Table,
  Space,
  Select,
  Image,
  Pagination,
  DatePicker,
  message,
} from "antd";
import dayjs from "dayjs";
import { UserOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { FaSearch, FaFilter, FaCaretDown, FaEye,FaTrash,FaEdit } from "react-icons/fa";
import {AiOutlineEdit} from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import ClientLayout from "../../components/ClientLayout";
import { Get } from "../../config/api/get";
import { Post } from "../../config/api/post";
import { SUBSCRIPTION } from "../../config/constants";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";


const items = [
  {
    key: 'view',
    label: 'View',
    icon:<FaEye/>
  },
  {
    key: 'edit',
    label: 'Edit',
    icon:<FaEdit/>
  },
  {
    key: 'delete',
    label: 'Delete',
    icon:<FaTrash/>
  },
]; 


function PlanManagement() {
  const token = useSelector((state) => state.user.userToken);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
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
    getSubscriptions();
  }, []);

  const handlePageChange = (pageNumber) => {
    setPaginationConfig({
      ...paginationConfig,
      pageNumber: pageNumber,
    });

    getSubscriptions(pageNumber);
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
    getSubscriptions(paginationConfig.pageNumber, paginationConfig.limit, "", true);
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

    getSubscriptions(1, pageSize);
  };

  const handleStatus = async () => {
    try {
      const index = subscriptions.findIndex((user) => user._id == selectedPlan._id);

      console.log(index);
      const response = await Post(
        SUBSCRIPTION.edit  + selectedPlan._id,{
            isActive: !selectedPlan.isActive,
        },
        token,
        {}
      );
      const newUsers = [...subscriptions];

      console.log(">>>>", newUsers[index].isActive);
      console.log(">>>>", selectedPlan.isActive);
      newUsers[index].isActive = !selectedPlan.isActive;
      setModalOpen(false);
      setSubscriptions(newUsers);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleRedirect = (key,value) => {
    if(key == "delete"){
      setModalOpen2(true);
      setSelectedPlan(value);
    }else{
      navigate("/subscription-management/" + key + "/" + value);
    }
  };

  console.log(
    "subscriptions",
    subscriptions.map((item) => item.isActive)
  );

  const getSubscriptions = async (pageNumber, pageSize, search, reset = false) => {
    setLoading(true);
    try {
      const response = await Get(SUBSCRIPTION.get, token, {
        page: "1",
        limit: 10,
        status: reset ? "" : filter.status || null,
        keyword: search ? search : null,
        from: reset ? "" : filter?.from ? filter?.from.toISOString() : "",
        to: reset ? "" : filter?.to ? filter?.to.toISOString() : "",
      });
      setLoading(false);
      console.log("response", response);
      if (response?.docs) {
        setSubscriptions(response?.docs);
        setPaginationConfig({
          pageNumber: response?.page,
          limit: response?.limit,
          totalDocs: response?.totalDocs,
          totalPages: response?.totalPages,
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

  const deleteSubscriptions = async (value) => {
    setLoading(true);
    try {
      const response = await Get(SUBSCRIPTION.delete + selectedPlan, token);
      setLoading(false);
      console.log("response22", response);
      if (response?.status) {
     swal("Success","Plan Deleted Successfully",'success')
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
      title: "Package Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Duration",
      dataIndex: "durationInDays",
      key: "durationInDays",
    },

    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (value, item, index) => (
        <Select
          className={value ? "greenSelect" : "redSelect"}
          suffixIcon={<FaCaretDown style={{ fontSize: "16px" }} />}
          value={value ? "active" : "inactive"}
          bordered={false}
          onChange={() => {
            setModalOpen(true);
            setSelectedPlan(subscriptions[index]);
          }}
          options={[
            {
              value: "active",
              label: "Activate",
            },
            {
              value: "inactive",
              label: "Deactivate",
            },
          ]}
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (value) => (
        <Space size="middle">
          <Dropdown
            menu={{
              items,
              onClick: ({key}) => {
                handleRedirect(key,value);
              }
            }}
          >
           <BiDotsVerticalRounded style={{fontSize:'20px'}}/>
          </Dropdown>
        </Space>
      ),

//       render: (item) => (<>
//         <AiOutlineEdit
//           style={{ fontSize: "16px", color: "#203453", cursor: "pointer" }}
//           onClick={() => navigate("/subscription-management/edit/" + item)}
//         />
//         &emsp;

//         <FaEye
//           style={{ fontSize: "16px", color: "#203453", cursor: "pointer" }}
//           onClick={() => navigate("/subscription-management/view/" + item)}
//         />

// &emsp;

// <FaTrash
//   style={{ fontSize: "14px", color: "#203453", cursor: "pointer" }}
// />

//         </>
//       ),
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
          onClick={() => getSubscriptions()}
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
        <Row style={{ padding: "10px 20px" }}>
          <Col
            xs={24}
            md={12}
            style={{ display: "flex", alignItems: "center" }}
          >
            <h1 className="pageTitle">Subscriptions</h1>
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
              style={{ padding: "12px 40px", height: "auto" }}
              className="mainButton primaryButton"
              onClick={() => navigate("/subscription-management/add")}
            >
              Add
            </Button>
          </Col>
        </Row>
        <br />
      <div className="boxDetails2">
      

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
                    getSubscriptions(1, paginationConfig.limit, filter.keyword)
                  }
                />
              }
              onPressEnter={(e) =>
                getSubscriptions(1, paginationConfig.limit, filter.keyword)
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
          ) : (
            <Table
              className="styledTable"
              dataSource={subscriptions}
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
          {selectedPlan?.isActive ? "Deactivate" : "Activate"}
        </Typography.Title>
        <Typography.Text style={{ fontSize: 16 }}>
          Do You Want To {selectedPlan?.isActive ? "Deactivate" : "Activate"}{" "}
          This User?
        </Typography.Text>
      </Modal>

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
          {selectedPlan?.isActive ? "Deactivate" : "Activate"}
        </Typography.Title>
        <Typography.Text style={{ fontSize: 16 }}>
        Do You Want To  {selectedPlan?.isActive ? "Deactivate" : "Activate"} This PLan?
        </Typography.Text>
      </Modal>
      <Modal
        visible={modalOpen2}
        onOk={() => deleteSubscriptions()}
        onCancel={() => setModalOpen2(false)}
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
          Delete
        </Typography.Title>
        <Typography.Text style={{ fontSize: 16 }}>
        Do You Want To  Delete This PLan?
        </Typography.Text>
      </Modal>

    </Layout>
  );
}

export default PlanManagement;
