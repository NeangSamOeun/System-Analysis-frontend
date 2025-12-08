import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import OTPSign from "./pages/AuthPages/OTPSignIn";
import SignInForm from "./components/auth/SignInForm";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProtectedOTPRoute from "./routes/ProtectedOTPRoute";
import PublicRoute from "./routes/PublicRoute";
import StudentEnrollmentForm from "./components/students/StudentEnrollmentForm";
import GetUsers from "./components/form/create-user/GetUsers";
import CreateUserPage from "./components/form/create-user/CreateUserPage";
import CreateMajor from "./components/major/CreateMajor";
import GetMajors from "./components/major/GetMajors";
import StudentList from "./components/students/StudentList";
import StudentDetail from "./components/students/StudentDetail";


export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        {/* Public */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <SignInForm />
            </PublicRoute>
          }
        />
        <Route path="/signup" element={<SignUp />} />

        {/* OTP Protected */}
        <Route
          path="/otp"
          element={
            <ProtectedOTPRoute>
              <OTPSign />
            </ProtectedOTPRoute>
          }
        />

        {/* App Protected Area */}
        <Route
          path=""
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Home />} />
          <Route path="profile" element={<UserProfiles />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="blank" element={<Blank />} />
          <Route path="form-elements" element={<FormElements />} />
          <Route path="basic-tables" element={<BasicTables />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="avatars" element={<Avatars />} />
          <Route path="badge" element={<Badges />} />
          <Route path="buttons" element={<Buttons />} />
          <Route path="images" element={<Images />} />
          <Route path="videos" element={<Videos />} />
          <Route path="line-chart" element={<LineChart />} />
          <Route path="bar-chart" element={<BarChart />} />

          {/* User Management */}
          <Route path="enroll" element={<StudentEnrollmentForm/>} />
          <Route path="users" element={<GetUsers />} />
          <Route path="user-create" element={<CreateUserPage />} />

          <Route path="create-major" element={<CreateMajor/>} />
          <Route path="get-major" element={<GetMajors/>} />
          <Route path="student-list" element={<StudentList/>} />
          {/* <Route path="/Enrollment/detail/:id" element={<StudentDetail/>} /> */}
          <Route path="/Enrollment/detail/:id" element={<StudentDetail />} />
          <Route path="/enrollment/edit/:id" element={<StudentEnrollmentForm />} /> {/* Edit route */}


        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
