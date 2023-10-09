import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//views imports
import Signin from "../../views/signin";
import ForgotPassword from "../../views/forget-password-1";
import ForgotPassword2 from "../../views/forget-password-2";
import ForgotPassword3 from "../../views/forget-password-3";
import LearnerManagement from "../../views/learner-management";
import LearnerDetails from "../../views/learner-management/learnerDetails";
import TutorCoachManagement from "../../views/tutor-coach-management"
import TutorCoachDetails from "../../views/tutor-coach-management/tutorCoachDetails"
import TutorCoachEducation from "../../views/tutor-coach-management/tutorCoachEducation"
import TutorCoachRates from "../../views/tutor-coach-management/tutorCoachRates"
import TutorCoachReview from "../../views/tutor-coach-management/tutorCoachReview"
import TutorCoachSchedule from "../../views/tutor-coach-management/tutorCoachSchedule"
import ServiceProviderManaqgement from "../../views/service-provider-management";
import ServiceProviderDetails from "../../views/service-provider-management/spDetails";
import SubscriptionManagement from "../../views/subscription-management";
import SubscriptionDetails from "../../views/subscription-management/subscriptionDetails";
import ArticleManagement from "../../views/article-management";
import AddArticle from "../../views/article-management/addArticle";
import ComissionManagement from "../../views/comission-management";
import UpcomingLessons from "../../views/upcoming-lessons";
import CompletedLessons from "../../views/completed-lessons";
import LiveLessons from "../../views/live-lessons";
import SubmittedLessons from "../../views/submitted-lessons"
import LessonDetails from "../../views/lesson-details";
import Calander from "../../views/calander"
import PaymentLogs from "../../views/payment-logs";
import PaymentAndBooking from "../../views/booking-and-payment-details";
import Notifications from "../../views/notifications";
import MyNotifications from "../../views/myNotifications"
import NotificationDetails from "../../views/notifications/notificationDetails";
import QueryManagement from "../../views/queries-management";
import QueryDetails from "../../views/queries-management/queryDetails";
import Dashboard from "../../views/dashboard";
import Profile from "../../views/profile";
import ChangePassword from "../../views/change-password"
import CourseManagement from  "../../views/course-management"
import CourseDetails from "../../views/course-management/courseDetails";
import CourseAdd from "../../views/course-management/courseAdd"
import Category from "../../views/course-management/category"
import LectureManagement from "../../views/lecture-management"
import LectureDetails from "../../views/lecture-management/lectureDetails"
import LectureAdd from "../../views/lecture-management/lectureAdd"

//components imports
import UserAuthCheck from "../../components/AuthCheck/UserAuthCheck";
// import AdminAuthCheck from "../../components/AuthCheck/AdminAuthCheck";
import ClientLayout from "../../components/ClientLayout";

const MyRouter = () => {
  return (
    <BrowserRouter basename="/zipperlms/zipperlmsadmin">
      <Routes>
        <Route path="/signin" index element={<Signin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-password-2" element={<ForgotPassword2 />} />
        <Route path="/forgot-password-3" element={<ForgotPassword3 />} />
       
        <Route
          path="/"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{ title: "Dashboard", description: "Some Description." }}
                headerStyle={{ height: { base: "40px", md: 14 } }}
              >
                <Dashboard />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
          <Route
          path="/profile"
          activeTab=""
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "My Profile",
                  description: "Some Description.",
                }}
              >
                <Profile />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
          <Route
          path="/change-password"
          activeTab=""
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Change Password",
                  description: "Some Description.",
                }}
              >
                <ChangePassword />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/learner-management"
          activeTab="test"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Learner Management",
                  description: "Some Description.",
                }}
              >
                <LearnerManagement />
              </ClientLayout>
            </UserAuthCheck>
          }
        />




        <Route
          path="/learner-management/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Learner Management",
                  description: "Some Description.",
                }}
              >
                <LearnerDetails />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

<Route
          path="/upcoming-lessons"
          activeTab="test"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Upcoming Lessons",
                  description: "Some Description.",
                }}
              >
                <UpcomingLessons />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

<Route
          path="/completed-lessons"
          activeTab="test"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Completed Lessons",
                  description: "Some Description.",
                }}
              >
                <CompletedLessons />
              </ClientLayout>
            </UserAuthCheck>
          }
        />


<Route
          path="/live-lessons"
          activeTab="test"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Live Lessons",
                  description: "Some Description.",
                }}
              >
                <LiveLessons />
              </ClientLayout>
            </UserAuthCheck>
          }
        />


<Route
          path="/submitted-lessons"
          activeTab="test"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Submitted Lessons",
                  description: "Some Description.",
                }}
              >
                <SubmittedLessons />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

<Route
          path="/calander"
          activeTab="test"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Calander",
                  description: "Some Description.",
                }}
              >
                <Calander/>
              </ClientLayout>
            </UserAuthCheck>
          }
        />
<Route
          path="/lesson-details/:id"
          activeTab="test"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Lessons Details",
                  description: "Some Description.",
                }}
              >
                <LessonDetails />
              </ClientLayout>
            </UserAuthCheck>
          }
        />



         <Route
          path="/tutor-coach-management"
          activeTab="test"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Tutor/Coach Management",
                  description: "Some Description.",
                }}
              >
                <TutorCoachManagement />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/tutor-coach-management/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Tutor/Coach Management",
                  description: "Some Description.",
                }}
              >
                <TutorCoachDetails />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
          <Route
          path="/tutor-coach-education/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Tutor/Coach Management",
                  description: "Some Description.",
                }}
              >
                <TutorCoachEducation />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
         <Route
          path="/tutor-coach-schedule/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Tutor/Coach Schedule",
                  description: "Some Description.",
                }}
              >
                <TutorCoachSchedule />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/tutor-coach-review/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Tutor/Coach Review",
                  description: "Some Description.",
                }}
              >
                <TutorCoachReview />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

<Route
          path="/tutor-coach-rates/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Tutor/Coach Rates",
                  description: "Some Description.",
                }}
              >
                <TutorCoachRates />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

        <Route
          path="/service-provider-management"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "User Management",
                  description: "Some Description.",
                }}
              >
                <ServiceProviderManaqgement />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/service-provider-management/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Service Provider Management",
                  description: "Some Description.",
                }}
              >
                <ServiceProviderDetails />
              </ClientLayout>
            </UserAuthCheck>
          }
        />


        <Route
          path="/subscription-management"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "User Management",
                  description: "Some Description.",
                }}
              >
                <SubscriptionManagement />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/subscription-management/add"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Subscription Add",
                  description: "Some Description.",
                }}
              >
                <SubscriptionDetails />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

        <Route
          path="/subscription-management/:mode/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Subscription Edit",
                  description: "Some Description.",
                }}
              >
                <SubscriptionDetails />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

        <Route
          path="/payment-logs"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Payment Logs",
                  description: "Some Description.",
                }}
              >
                <PaymentLogs />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

<Route
          path="/category"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Category",
                  description: "Some Description.",
                }}
              >
                <Category />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

        <Route
          path="/notifications"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Notifications",
                  description: "Some Description.",
                }}
              >
                <Notifications />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

<Route
          path="/myNotifications"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "My Notifications",
                  description: "Some Description.",
                }}
              >
                <MyNotifications />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

        <Route
          path="/notifications/edit/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Notification Details",
                  description: "Some Description.",
                }}
              >
                <NotificationDetails />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

        <Route
          path="/notifications/add"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Notification Details",
                  description: "Some Description.",
                }}
              >
                <NotificationDetails />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

<Route
          path="/course-management"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Course Management",
                  description: "Some Description.",
                }}
              >
                <CourseManagement />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

<Route
          path="/lecture-management"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Lecture Management",
                  description: "Some Description.",
                }}
              >
                <LectureManagement />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

<Route
          path="/lecture-details/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Lecture Details",
                  description: "Some Description.",
                }}
              >
                <LectureDetails />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

<Route
          path="/lecture-details/add"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Lecture Add",
                  description: "Some Description.",
                }}
              >
                <LectureAdd />
              </ClientLayout>
            </UserAuthCheck>
          }
        />




<Route
          path="/course-details/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Course Details",
                  description: "Some Description.",
                }}
              >
                <CourseDetails />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

<Route
          path="/course-details/add"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Course Add",
                  description: "Some Description.",
                }}
              >
                <CourseAdd />
              </ClientLayout>
            </UserAuthCheck>
          }
        />


        {/* <Route
          path="/booking-and-payment-details"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Booking And Payment Details",
                  description: "Some Description.",
                }}
              >
                <BookingAndPaymentDetails />
              </ClientLayout>
            </UserAuthCheck>
          }
        /> */}


<Route
          path="/queries-management"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Query Management",
                  description: "Some Description.",
                }}
              >
                <QueryManagement />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/queries-management/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Service Provider Management",
                  description: "Some Description.",
                }}
              >
                <QueryDetails />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
         <Route
          path="/comission-management"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Comission Management",
                  description: "Some Description.",
                }}
              >
                <ComissionManagement />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

<Route
          path="/article-management"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Article Management",
                  description: "Some Description.",
                }}
              >
                <ArticleManagement />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

<Route
          path="/article-management/add"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Article Add",
                  description: "Some Description.",
                }}
              >
                <AddArticle />
              </ClientLayout>
            </UserAuthCheck>
          }
        />









      </Routes>
    </BrowserRouter>
  );
};

export default MyRouter;