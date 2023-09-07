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
import ContestManagement from "../../views/contest-management";
import ContestDetails from "../../views/contest-management/contestDetails";
import ContestView from "../../views/contest-management/contestView";
import PaymentLogs from "../../views/payment-logs";
import PaymentAndBooking from "../../views/booking-and-payment-details";
import FeedbackManagement from "../../views/feedback-management";
import FeedbackDetails from "../../views/feedback-management/feedbackDetails";
import Notifications from "../../views/notifications";
import NotificationDetails from "../../views/notifications/notificationDetails";
import QueryManagement from "../../views/queries-management";
import QueryDetails from "../../views/queries-management/queryDetails";
import Dashboard from "../../views/dashboard";
import Profile from "../../views/profile";
import ChangePassword from "../../views/change-password"
import Posts from "../../views/posts";
import Gallery from "../../views/gallery"

//components imports
import UserAuthCheck from "../../components/AuthCheck/UserAuthCheck";
// import AdminAuthCheck from "../../components/AuthCheck/AdminAuthCheck";
import ClientLayout from "../../components/ClientLayout";

const MyRouter = () => {
  return (
    <BrowserRouter >
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
          path="/posts/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Posts",
                  description: "Some Description.",
                }}
              >
                <Posts />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

<Route
          path="/gallery/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Posts",
                  description: "Some Description.",
                }}
              >
                <Gallery />
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
          path="/feedback-management"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "User Management",
                  description: "Some Description.",
                }}
              >
                <FeedbackManagement />
              </ClientLayout>
            </UserAuthCheck>
          }
        />
        <Route
          path="/feedback-management/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Service Provider Management",
                  description: "Some Description.",
                }}
              >
                <FeedbackDetails />
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
          path="/contest-management"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Contest Management",
                  description: "Some Description.",
                }}
              >
                <ContestManagement />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

<Route
          path="/contest-management/edit/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Article Category Edit",
                  description: "Some Description.",
                }}
              >
                <ContestDetails />
              </ClientLayout>
            </UserAuthCheck>
          }
        />

<Route
          path="/contest-management/view/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Article Category Edit",
                  description: "Some Description.",
                }}
              >
                <ContestView/>
              </ClientLayout>
            </UserAuthCheck>
          }
        />
<Route
          path="/contest-management/add"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Article Category Add",
                  description: "Some Description.",
                }}
              >
                <ContestDetails />
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
          path="/article-management/edit/:id"
          index
          element={
            <UserAuthCheck>
              <ClientLayout
                head={{
                  title: "Article Edit",
                  description: "Some Description.",
                }}
              >
                <ContestDetails />
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