import React from 'react'
import ClientLayout from "../../components/ClientLayout";
import {
    Col,
    Row,
    Typography,
    List,
    Form,
    Input,
    Button,
    Checkbox,
    Tabs,
    Table,
    Image,
    Divider,
  } from "antd";

function LearningVideoManagement() {
  return (
    <ClientLayout head={{ title: "User Management", description: "Some Description." }}>
<div class="configuration">
    <div class="container-fluid">
        <div class="box">

            <div class="row align-items-center mb-4">
                <div class="col-lg-6">
                    <div class="backTitle mb-3">
                        <div class="pageTitleInner">
                            <h1 class="pageTitle text-capitalize m-0">Learning Video Management</h1>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 text-end">
                    <div class="d-flex align-items-baseline justify-content-end">
                        <a href="./edit-video.php" class="mainButton primaryButton">Add Video</a>
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-12">
                    {/* Filters Starts Here */}
                    <div class="row mb-2">
                        <div class="col-12">
                            <div class="customFilters my-3">
                                <div class="d-xl-flex align-items-baseline justify-content-between mb-xl-3">
                                    <div class="userInput mb-3">
                                        <label class="mainLabel d-inline-block">Show:</label>
                                        <select class="d-inline-block mainInput dashInput smDropDown">
                                            <option value="10" selected>10</option>
                                            <option value="20">20</option>
                                            <option value="30">30</option>
                                            <option value="40">40</option>
                                            <option value="50">50</option>
                                        </select>
                                        <label class="mainLabel d-inline-block">Entries</label>
                                    </div>
                                    <div class="userInput mb-3">
                                        <div class="d-flex align-items-center justify-content-end">
                                            <div class="dashSearchWrap">
                                                <form action="" method="POST">
                                                    <input type="search" id="searchInput" class="mainInput dashInput search-input w-100" placeholder="Search" />
                                                    <button type="button" class="searchIcon"><i class="fas fa-search"></i></button>
                                                </form>
                                            </div>
                                            <div class="dropFilter">
                                                <button class="btn primaryButton ms-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i class="fas fa-filter"></i>
                                                </button>
                                                <div class="dropdown-menu filterDropdown">
                                                    <div class="filterDropdownHeader">
                                                        <p class="mainLabel m-0">Filter</p>
                                                    </div>
                                                    <div class="dropdown-divider"></div>
                                                    <div class="filterDropdownBody">
                                                        <div class="userInput mb-3">
                                                            <label for="" class="mainLabel">Creation Date:</label>
                                                            <div class="mb-2">
                                                                <input class="mainInput filterInput" type="date" />
                                                            </div>
                                                            <div class="mb-2">
                                                                <input class="mainInput filterInput" type="date" />
                                                            </div>
                                                        </div>
                                                        <div class="userInput mb-3">
                                                            <label for="" class="mainLabel">Filter by Status:</label>
                                                            <div class="mb-2">
                                                                <select name="" id="" class="mainInput filterInput">
                                                                    <option value="s">Select Status</option>
                                                                    <option value="1">Active</option>
                                                                    <option value="2">Inactive</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="filterAction">
                                                            <button type="button" class="mainButton primaryButton">Apply</button>
                                                        </div>
                                                        <div class="filterAction">
                                                            <button type="button" class="mainButton primaryButton2">Clear All</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Filters Ends Here */}



                    {/* Table Starts Here */}
                    <div class="row">
                        <div class="col-md-6">
                            <div class="videoBoxVBL mb-4">
                                <div class="d-flex align-items-center">
                                    <a href="video-detail.php" class="videoBoxVBLImg">
                                        {/* <img src="./../../assets/images/videosMImg1.png" alt=""> */}
                                        <Image
                src={"/images/videosMImg1.png"}
                alt=""
                preview={false}
              />
                                    </a>
                                    <div class="videoBoxVBLText">
                                        <h4>How To Make Youtube Video</h4>
                                        <div class="d-flex align-items-center">
                                            <div class="userImageFrame h-auto w-auto">
                                                {/* <img src="./../../assets/images/reportPostImg.png" alt="" class="userImage h-auto w-auto"> */}
                                                <Image
                src={"/images/reportPostImg.png"}
                alt=""
                preview={false}
              />
                                            </div>
                                            <div class="ps-3">
                                                <h6 class="mb-0">Posted By Admin</h6>
                                                <p class="mb-0">2 hrs ago</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="videoBoxVBLIcon">
                                    <button type="button" class="postAction" data-bs-toggle="dropdown"><i class="fas fa-ellipsis-v"></i></button>
                                    {/* <div class="dropdown-menu postDropdown">
                                        <a href="./booking-payment-completed.php" type="button" class="dropdown-item dropButton"><i class="far fa-eye-slash"></i> View</a>
                                    </div>                                     */}
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="videoBoxVBL mb-4">
                                <div class="d-flex align-items-center">
                                    <a href="video-detail.php" class="videoBoxVBLImg">
                                        {/* <img src="./../../assets/images/videosMImg2.png" alt=""> */}
                                        <Image
                src={"/images/videosMImg2.png"}
                alt=""
                preview={false}
              />
                                            
                                    </a>
                                    <div class="videoBoxVBLText">
                                        <h4>How To Make Youtube Video</h4>
                                        <div class="d-flex align-items-center">
                                            <div class="userImageFrame h-auto w-auto">
                                                {/* <img src="./../../assets/images/reportPostImg.png" alt="" class="userImage h-auto w-auto"> */}
                                                <Image
                src={"/images/reportPostImg.png"}
                alt=""
                preview={false}
              />
                                            </div>
                                            <div class="ps-3">
                                                <h6 class="mb-0">Posted By Admin</h6>
                                                <p class="mb-0">2 hrs ago</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="videoBoxVBLIcon">
                                    <button type="button" class="postAction" data-bs-toggle="dropdown"><i class="fas fa-ellipsis-v"></i></button>
                                    {/* <div class="dropdown-menu postDropdown">
                                        <a href="./booking-payment-completed.php" type="button" class="dropdown-item dropButton"><i class="far fa-eye-slash"></i> View</a>
                                    </div>                                     */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-4">
                        <div class="col-md-6">
                            <div class="videoBoxVBL mb-4">
                                <div class="d-flex align-items-center">
                                    <a href="video-detail.php" class="videoBoxVBLImg">
                                        {/* <img src="./../../assets/images/videosMImg3.png" alt=""> */}
                                        <Image
                src={"/images/videosMImg3.png"}
                alt=""
                preview={false}
              />
                                    </a>
                                    <div class="videoBoxVBLText">
                                        <h4>How To Make Youtube Video</h4>
                                        <div class="d-flex align-items-center">
                                            <div class="userImageFrame h-auto w-auto">
                                                {/* <img src="./../../assets/images/reportPostImg.png" alt="" class="userImage h-auto w-auto"> */}
                                                <Image
                src={"/images/reportPostImg.png"}
                alt=""
                preview={false}
              />
                                            </div>
                                            <div class="ps-3">
                                                <h6 class="mb-0">Posted By Admin</h6>
                                                <p class="mb-0">2 hrs ago</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="videoBoxVBLIcon">
                                    <button type="button" class="postAction" data-bs-toggle="dropdown"><i class="fas fa-ellipsis-v"></i></button>
                                    {/* <div class="dropdown-menu postDropdown">
                                        <a href="./booking-payment-completed.php" type="button" class="dropdown-item dropButton"><i class="far fa-eye-slash"></i> View</a>
                                    </div>                                     */}
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="videoBoxVBL mb-4">
                                <div class="d-flex align-items-center">
                                    <a href="video-detail.php" class="videoBoxVBLImg">
                                        {/* <img src="./../../assets/images/videosMImg4.png" alt=""> */}
                                        <Image
                src={"/images/videosMImg4.png"}
                alt=""
                preview={false}
              />
                                    </a>
                                    <div class="videoBoxVBLText">
                                        <h4>How To Make Youtube Video</h4>
                                        <div class="d-flex align-items-center">
                                            <div class="userImageFrame h-auto w-auto">
                                                {/* <img src="./../../assets/images/reportPostImg.png" alt="" class="userImage h-auto w-auto"> */}
                                                <Image
                src={"/images/reportPostImg.png"}
                alt=""
                preview={false}
              />
                                            </div>
                                            <div class="ps-3">
                                                <h6 class="mb-0">Posted By Admin</h6>
                                                <p class="mb-0">2 hrs ago</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="videoBoxVBLIcon">
                                    <button type="button" class="postAction" data-bs-toggle="dropdown"><i class="fas fa-ellipsis-v"></i></button>
                                    {/* <div class="dropdown-menu postDropdown">
                                        <a href="./booking-payment-completed.php" type="button" class="dropdown-item dropButton"><i class="far fa-eye-slash"></i> View</a>
                                    </div>                                     */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-4">
                        <div class="col-md-6">
                            <div class="videoBoxVBL mb-4">
                                <div class="d-flex align-items-center">
                                    <a href="video-detail.php" class="videoBoxVBLImg">
                                        {/* <img src="./../../assets/images/videosMImg5.png" alt=""> */}
                                        <Image
                src={"/images/videosMImg5.png"}
                alt=""
                preview={false}
              />
                                    </a>
                                    <div class="videoBoxVBLText">
                                        <h4>How To Make Youtube Video</h4>
                                        <div class="d-flex align-items-center">
                                            <div class="userImageFrame h-auto w-auto">
                                                {/* <img src="./../../assets/images/reportPostImg.png" alt="" class="userImage h-auto w-auto"> */}
                                                <Image
                src={"/images/reportPostImg.png"}
                alt=""
                preview={false}
              />
                                            </div>
                                            <div class="ps-3">
                                                <h6 class="mb-0">Posted By Admin</h6>
                                                <p class="mb-0">2 hrs ago</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="videoBoxVBLIcon">
                                    <button type="button" class="postAction" data-bs-toggle="dropdown"><i class="fas fa-ellipsis-v"></i></button>
                                    {/* <div class="dropdown-menu postDropdown">
                                        <a href="./booking-payment-completed.php" type="button" class="dropdown-item dropButton"><i class="far fa-eye-slash"></i> View</a>
                                    </div>                                     */}
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="videoBoxVBL mb-4">
                                <div class="d-flex align-items-center">
                                    <a href="video-detail.php" class="videoBoxVBLImg">
                                        {/* <img src="./../../assets/images/videosMImg6.png" alt=""> */}
                                        <Image
                src={"/images/videosMImg6.png"}
                alt=""
                preview={false}
              />
                                    </a>
                                    <div class="videoBoxVBLText">
                                        <h4>How To Make Youtube Video</h4>
                                        <div class="d-flex align-items-center">
                                            <div class="userImageFrame h-auto w-auto">
                                                {/* <img src="./../../assets/images/reportPostImg.png" alt="" class="userImage h-auto w-auto"> */}
                                                <Image
                src={"/images/reportPostImg.png"}
                alt=""
                preview={false}
              />
                                            </div>
                                            <div class="ps-3">
                                                <h6 class="mb-0">Posted By Admin</h6>
                                                <p class="mb-0">2 hrs ago</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="videoBoxVBLIcon">
                                    <button type="button" class="postAction" data-bs-toggle="dropdown"><i class="fas fa-ellipsis-v"></i></button>
                                    {/* <div class="dropdown-menu postDropdown">
                                        <a href="./booking-payment-completed.php" type="button" class="dropdown-item dropButton"><i class="far fa-eye-slash"></i> View</a>
                                    </div>                                     */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-4">
                        <div class="col-md-6">
                            <div class="videoBoxVBL mb-4">
                                <div class="d-flex align-items-center">
                                    <a href="video-detail.php" class="videoBoxVBLImg">
                                        {/* <img src="./../../assets/images/videosMImg7.png" alt=""> */}
                                        <Image
                src={"/images/videosMImg7.png"}
                alt=""
                preview={false}
              />
                                    </a>
                                    <div class="videoBoxVBLText">
                                        <h4>How To Make Youtube Video</h4>
                                        <div class="d-flex align-items-center">
                                            <div class="userImageFrame h-auto w-auto">
                                                {/* <img src="./../../assets/images/reportPostImg.png" alt="" class="userImage h-auto w-auto"> */}
                                                <Image
                src={"/images/reportPostImg.png"}
                alt=""
                preview={false}
              />
                                            </div>
                                            <div class="ps-3">
                                                <h6 class="mb-0">Posted By Admin</h6>
                                                <p class="mb-0">2 hrs ago</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="videoBoxVBLIcon">
                                    <button type="button" class="postAction" data-bs-toggle="dropdown"><i class="fas fa-ellipsis-v"></i></button>
                                    {/* <div class="dropdown-menu postDropdown">
                                        <a href="./booking-payment-completed.php" type="button" class="dropdown-item dropButton"><i class="far fa-eye-slash"></i> View</a>
                                    </div>                                     */}
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="videoBoxVBL mb-4">
                                <div class="d-flex align-items-center">
                                    <a href="video-detail.php" class="videoBoxVBLImg">
                                        {/* <img src="./../../assets/images/videosMImg8.png" alt=""> */}
                                        <Image
                src={"/images/videosMImg8.png"}
                alt=""
                preview={false}
              />
                                    </a>
                                    <div class="videoBoxVBLText">
                                        <h4>How To Make Youtube Video</h4>
                                        <div class="d-flex align-items-center">
                                            <div class="userImageFrame h-auto w-auto">
                                                {/* <img src="./../../assets/images/reportPostImg.png" alt="" class="userImage h-auto w-auto"> */}
                                                <Image
                src={"/images/reportPostImg.png"}
                alt=""
                preview={false}
              />
                                            </div>
                                            <div class="ps-3">
                                                <h6 class="mb-0">Posted By Admin</h6>
                                                <p class="mb-0">2 hrs ago</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="videoBoxVBLIcon">
                                    <button type="button" class="postAction" data-bs-toggle="dropdown"><i class="fas fa-ellipsis-v"></i></button>
                                    {/* <div class="dropdown-menu postDropdown">
                                        <a href="./booking-payment-completed.php" type="button" class="dropdown-item dropButton"><i class="far fa-eye-slash"></i> View</a>
                                    </div>                                     */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row mb-4">
                        <div class="col-md-6">
                            <div class="videoBoxVBL mb-4">
                                <div class="d-flex align-items-center">
                                    <a href="video-detail.php" class="videoBoxVBLImg">
                                        {/* <img src="./../../assets/images/videosMImg9.png" alt=""> */}
                                        <Image
                src={"/images/videosMImg9.png"}
                alt=""
                preview={false}
              />
                                    </a>
                                    <div class="videoBoxVBLText">
                                        <h4>How To Make Youtube Video</h4>
                                        <div class="d-flex align-items-center">
                                            <div class="userImageFrame h-auto w-auto">
                                                {/* <img src="./../../assets/images/reportPostImg.png" alt="" class="userImage h-auto w-auto"> */}
                                                <Image
                src={"/images/reportPostImg.png"}
                alt=""
                preview={false}
              />
                                            </div>
                                            <div class="ps-3">
                                                <h6 class="mb-0">Posted By Admin</h6>
                                                <p class="mb-0">2 hrs ago</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="videoBoxVBLIcon">
                                    <button type="button" class="postAction" data-bs-toggle="dropdown"><i class="fas fa-ellipsis-v"></i></button>
                                    {/* <div class="dropdown-menu postDropdown">
                                        <a href="./booking-payment-completed.php" type="button" class="dropdown-item dropButton"><i class="far fa-eye-slash"></i> View</a>
                                    </div>                                     */}
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="videoBoxVBL mb-4">
                                <div class="d-flex align-items-center">
                                    <a href="video-detail.php" class="videoBoxVBLImg">
                                        {/* <img src="./../../assets/images/videosMImg10.png" alt=""> */}
                                        <Image
                src={"/images/videosMImg10.png"}
                alt=""
                preview={false}
              />
                                    </a>
                                    <div class="videoBoxVBLText">
                                        <h4>How To Make Youtube Video</h4>
                                        <div class="d-flex align-items-center">
                                            <div class="userImageFrame h-auto w-auto">
                                                {/* <img src="./../../assets/images/reportPostImg.png" alt="" class="userImage h-auto w-auto"> */}
                                                <Image
                src={"/images/reportPostImg.png"}
                alt=""
                preview={false}
              />
                                            </div>
                                            <div class="ps-3">
                                                <h6 class="mb-0">Posted By Admin</h6>
                                                <p class="mb-0">2 hrs ago</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="videoBoxVBLIcon">
                                    <button type="button" class="postAction" data-bs-toggle="dropdown"><i class="fas fa-ellipsis-v"></i></button>
                                    {/* <div class="dropdown-menu postDropdown">
                                        <a href="./booking-payment-completed.php" type="button" class="dropdown-item dropButton"><i class="far fa-eye-slash"></i> View</a>
                                    </div>                                     */}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Table Ends Here */}



                    {/* Pagination starts */}
                    <div class="d-flex align-items-center justify-content-between flex-wrap">
                        <h6 class="pagination-details mb-3"> Showing 05 out of 40 records </h6>
                        <div class="customPagination mb-3">
                            <nav aria-label="Page navigation example">
                                <ul class="pagination">
                                    <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                                    <li class="page-item active"><a class="page-link" aria-current="page" href="#">1</a></li>
                                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                                    <li class="page-item"><a class="page-link" href="#">4</a></li>
                                    <li class="page-item"><a class="page-link" href="#">5</a></li>
                                    <li class="page-item"><a class="page-link" href="#">Next</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    {/* Pagination Ends */}
                </div>
            </div>


        </div>
    </div>
</div>
    </ClientLayout>
  )
}

export default LearningVideoManagement