import React, { useState, lazy, Suspense } from "react";
import {
  Col,
  Row,
  Typography,
  List,
  Form,
  Input,
  Button,
  Layout,
  Checkbox,
  Tabs,
  Table,
  Select,
  Image,
  Pagination,
} from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import img1 from "../../assets/images/trend.png"
import img2 from "../../assets/images/trend2.png"
import img3 from "../../assets/images/trend.png"
import ClientLayout from "../../components/ClientLayout";
import { HiUsers,HiUser } from "react-icons/hi";
import {IoWallet} from "react-icons/io5"
import {FaBook } from "react-icons/fa";
import styles from "../../styles/Home.module.css";
import { render } from "react-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend
);


const data = {
  labels: ["Nov 2015", "March 2016", "July 2017", "August 2018", "Sep 2019", "Oct 2020", "July 2021","July 2021","July 2021"],
  datasets: [{
    label: "Users",
    data: [10, 20, 15, 45, 75, 35,30,12, 25 , 30],
    fill: true,
    backgroundColor: 'rgba(124,192,89,0.4)',
    borderColor: '#7cc059',
    pointRadius: 0,
  }]
};

const options = {
  maintainAspectRatio: false,
  responsive: true,
  tension:0.3,
  scales: {
    y: {
      title: {
        display: true,
        text: "Users",
        color: "#000000",
      },
      min: 0,
      max: 100,
    },
    x: {
      title: {
        display: true,
        text: "Months",
        color: "#000000",
      },
      grid: {
        display: false, // You can set this to true if you want to display horizontal grid lines on the y-axis
      },
    },
  },
  plugins: {
    legend: {
      display: false
    },
  }
};

const data3 = {
  labels: ["Nov 2015", "March 2016", "July 2017", "August 2018", "Sep 2019", "Oct 2020", "July 2021","July 2021","July 2021"],
  datasets: [{
    label: "Users",
    data: [10, 20, 15, 45, 75, 35,30,12, 25 , 30,10, 20, 15, 45, 75, 35,30,12, 25 , 30],
    fill: false,
    borderColor: '#5f41b2',
    pointRadius: 4,
  }]
};

const options4 = {
  maintainAspectRatio: false,
  responsive: true,
  tension:0.3,
  scales: {
    y: {
      title: {
        display: true,
        text: "Users",
        color: "#000000",
      },
      min: 0,
      max: 100,
    },
    x: {
      title: {
        display: true,
        text: "Months",
        color: "#000000",
      },
      grid: {
        display: false, // You can set this to true if you want to display horizontal grid lines on the y-axis
      },
    },
  },
  plugins: {
    legend: {
      display: false
    },
  }
};

const data4 = {
  labels: ["Nov 2015", "March 2016", "July 2017", "August 2018", "Sep 2019", "Oct 2020", "July 2021","July 2021","July 2021"],
  datasets: [{
    label: "Users",
    data: [14, 20, 5, 45, 75, 35,30,12, 25 , 30,10, 20 ],
    fill: true,
    backgroundColor: 'rgba(134,214,224,0.4)',
    borderColor: '#86D6E0',
    pointRadius: 4,
  },{
    label: "Users",
    data: [8, 16 ,10, 20, 15, 45, 75, 35,30,12, 25 , 30],
    fill: true,
    backgroundColor: 'rgba(124,192,89,0.4)',
    borderColor: '#7CC059',
    pointRadius: 4,
  }]
};

const options3 = {
  maintainAspectRatio: false,
  responsive: true,
  tension:0.3,
  scales: {
    y: {
      title: {
        display: true,
        text: "Users",
        color: "#000000",
      },
      min: 0,
      max: 100,
    },
    x: {
      title: {
        display: true,
        text: "Months",
        color: "#000000",
      },
      grid: {
        display: false, // You can set this to true if you want to display horizontal grid lines on the y-axis
      },
    },
  },
  plugins: {
    legend: {
      display: false
    },
  }
};

export const options2 = {
  plugins: {
    title: {
      display: true,
    },
  },
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
      grid: {
        display: false, // Hide vertical grid lines on the x-axis
      },
    },
    y: {
      stacked: true,
      grid: {
        display: true, // You can set this to true if you want to display horizontal grid lines on the y-axis
      },
      min: 0,
      max: 100,
    },
  },
  maintainAspectRatio: false, // To disable the aspect ratio constraint
  height:400,
  elements: {
    bar: {
      borderRadius: function(context) {
        return 10; // Adjust the borderRadius value as needed
      },
    },
  },
};

export const data2 = {
  labels: ["January", "Febuary", "March", "April", "May", "June", "July","August","September","October","November","December"],
  datasets: [{
    label: "Users",
    data: [30, 50, 30, 35, 35, 40, 45,35, 40, 45, 30, 35],
    fill: true,
    backgroundColor: '#86D6E0',
    borderColor: '#86D6E0',
    pointRadius: 3,
  },
  {
    label: "Helpers",
    data: [10, 20, 15, 20, 12, 20, 25, 12, 20, 25,45,20],
    fill: true,
    backgroundColor: '#EFEFEF',
    borderColor: '#EFEFEF',
    pointRadius: 3,
  }]
};

export default function Home() {
  return (
    <Layout className="configuration">
  
    {/* ================================ROW ONE START========================================= */}
    <div class="boxDetails2" style={{ padding: "30px",display:'flex' }}>
    <h5 class="sectionTitle">Dashboard</h5>
      <div>
      <Row gutter={[40, 10]}>
      <Col xs={24} md={6}>
        <div class="boxDetails1 analytics1" style={{backgroundColor:"#FFEBF6"}}>
          <Row
          gutter={20}
            style={{ width: "100%", display: "flex", alignItems: "center",justifyContent:'center'  }}
          >
               <Col>
                <div className="iconCircle">
                  <HiUser style={{fontSize:"40px",color:"#E86AAF"}}/>

                </div>
            </Col>
            
            <Col>
              <h6 class="analyticsTextSmall" style={{ margin: 0 }}>
            New Learner
              </h6>
              <br/>
              <h6 class="analyticsText" style={{ margin: 0 }}>
               33
              </h6>
            </Col>
         
          </Row>
        </div>
      </Col>
      <Col xs={24} md={6}>
        <div class="boxDetails1 analytics1" style={{backgroundColor:"#E7FAFF"}}>
          <Row
          gutter={20}
            style={{ width: "100%", display: "flex", alignItems: "center",justifyContent:'center'  }}
          >
               <Col>
                <div className="iconCircle">
                  <HiUsers style={{fontSize:"40px",color:"#27436B"}}/>

                </div>
            </Col>
            
            <Col>
              <h6 class="analyticsTextSmall" style={{ margin: 0 }}>
              New Tutor/Coach
              </h6>
              <br/>
              <h6 class="analyticsText" style={{ margin: 0 }}>
               33
              </h6>
            </Col>
         
          </Row>
        </div>
      </Col>
      <Col xs={24} md={6}>
        <div class="boxDetails1 analytics1" style={{backgroundColor:"#D7FDC3"}}>
          <Row
          gutter={20}
            style={{ width: "100%", display: "flex", alignItems: "center",justifyContent:'center'  }}
          >
               <Col>
                <div className="iconCircle">
                  <IoWallet style={{fontSize:"40px",color:"#7CC059"}}/>

                </div>
            </Col>
            
            <Col>
              <h6 class="analyticsTextSmall" style={{ margin: 0 }}>
              Total Earning
              </h6>
              <br/>
              <h6 class="analyticsText" style={{ margin: 0 }}>
               33
              </h6>
            </Col>
         
          </Row>
        </div>
      </Col>
      <Col xs={24} md={6}>
        <div class="boxDetails1 analytics1" style={{backgroundColor:"#BCF2F9"}}>
          <Row
          gutter={20}
            style={{ width: "100%", display: "flex", alignItems: "center",justifyContent:'center'  }}
          >
               <Col>
                <div className="iconCircle">
                  <FaBook style={{fontSize:"38px",color:"#264168"}}/>

                </div>
            </Col>
            
            <Col>
              <h6 class="analyticsTextSmall" style={{ margin: 0 }}>
              New Lesson
              </h6>
              <br/>
              <h6 class="analyticsText" style={{ margin: 0 }}>
               33
              </h6>
            </Col>
         
          </Row>
        </div>
      </Col>
    </Row>
      </div>
   
    </div>

    {/* ================================ROW ONE END========================================= */}
    <br />
    {/* ================================ROW TWO START========================================= */}
    <Row gutter={[20, 10]}>
      <Col xs={24}>
        <div class="boxDetails2" style={{ padding: "30px" }}>
          <Row
            style={{ width: "100%", display: "flex", alignItems: "center" }}
          >
            <Col xs={24} md={12}>
              <h5 class="sectionTitle">Total Earnings</h5>
            </Col>
            
          </Row>
          <Row style={{minHeight:"400px", overflowX:'auto'}}>
            <div style={{minWidth:"600px", width:'100%'}}>
              
          <Line options={options} data={data} />
            </div>
          </Row>
        </div>
      </Col>
    </Row>

    {/* ================================ROW TWO END========================================= */}
    <br />
    <br />

     {/* ================================ROW Three START========================================= */}
     <Row gutter={[20, 10]}>
      <Col xs={24}>
        <div class="boxDetails2" style={{ padding: "30px" }}>
          <Row
            style={{ width: "100%", display: "flex", alignItems: "center" }}
          >
            <Col xs={24} md={12}>
              <h5 class="sectionTitle">Total Lessons</h5>
            </Col>
            
          </Row>
          <Row style={{minHeight:"400px", overflowX:'auto'}}>
            <div style={{minWidth:"600px", width:'100%'}}>
              
            <Bar options={options2} data={data2}  />
            </div>
          </Row>
        </div>
      </Col>
    </Row>


    {/* ================================ROW Three END========================================= */}
    <br />
    <br />
     {/* ================================ROW Four START========================================= */}
     <Row gutter={[20, 10]}>
      <Col xs={24}>
        <div class="boxDetails2" style={{ padding: "30px" }}>
          <Row
            style={{ width: "100%", display: "flex", alignItems: "center" }}
          >
            <Col xs={24} md={12}>
              <h5 class="sectionTitle">Total Learner</h5>
            </Col>
            
          </Row>
          <Row style={{minHeight:"400px", overflowX:'auto'}}>
            <div style={{minWidth:"600px", width:'100%'}}>
              
            <Line options={options3} data={data3} />
            </div>
          </Row>
        </div>
      </Col>
    </Row>


    {/* ================================ROW Four END========================================= */}
    <br />
    <br />
    {/* ================================ROW Five START========================================= */}
    <Row gutter={[20, 10]}>
      <Col xs={24}>
        <div class="boxDetails2" style={{ padding: "30px" }}>
          <Row
            style={{ width: "100%", display: "flex", alignItems: "center" }}
          >
            <Col xs={24} md={12}>
              <h5 class="sectionTitle">Total Tutor / Coaches</h5>
            </Col>
            
          </Row>
          <Row style={{minHeight:"400px", overflowX:'auto'}}>
            <div style={{minWidth:"600px", width:'100%'}}>
              
            <Line options={options4} data={data4} />
            </div>
          </Row>
        </div>
      </Col>
    </Row>


    {/* ================================ROW Five END========================================= */}
    <br/>
    <br/>

  </Layout>
  );
}
