import React, { lazy, Suspense } from "react";
import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

// Custom Loader Spinner
const Loader = () => (
  <div className="flex justify-center items-center h-screen">
    <FaSpinner className="animate-spin text-purple-600 text-4xl" />
  </div>
);

// Lazy-loaded components
const LandingPage = lazy(() => import("../pages/Landing/LandingPage"));
const SignUp = lazy(() => import("../pages/Auth/SignUp"));
const Login = lazy(() => import("../pages/Auth/Login"));
const ForgotPasswordModal = lazy(() => import("../components/ForgotPasswordModal"));
const ResetLinkSentModal = lazy(() => import("../components/ResetLinkSentModal"));
const VerifyEmail = lazy(() => import("../pages/Auth/VerifyEmail"));

const ProfileSetup = lazy(() => import("../pages/ProfileSetup/ProfileSetup"));
const ProfileBio = lazy(() => import("../pages/ProfileSetup/ProfileBio"));
const ProfileModal = lazy(() => import("../pages/ProfileSetup/ProfileModal"));

const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const Messages = lazy(() => import("../pages/Dashboard/Messages"));
const Search = lazy(() => import("../pages/Dashboard/Search"));
const Profile = lazy(() => import("../pages/Dashboard/Profile"));
const Notifications = lazy(() => import("../pages/Dashboard/Notifications"));
const ShortListedProfile = lazy(() => import("../pages/ProfileSetup/ShortListedProfile"));
const Settings = lazy(() => import("../pages/Dashboard/Settings"));
const MatchPage = lazy(() => import("../pages/Match/MatchPage"));

const About = lazy(() => import("../pages/Landing/AboutUs"));
const Pricing = lazy(() => import("../pages/Landing/Pricing"));
const BlogPost = lazy(() => import("../pages/Landing/BlogPost"));
const BlogList = lazy(() => import("../pages/Landing/BlogList"));

const AdminLogin = lazy(() => import("../pages/Dashboard/admin/Auth/Login"));
const ForgotPasswordPage = lazy(() => import("../pages/Dashboard/admin/Auth/ForgotPasswordPage"));
const ResetLinkSentPage = lazy(() => import("../pages/Dashboard/admin/Auth/ResetLinkSentPage"));
const SetPasswordPage = lazy(() => import("../pages/Dashboard/admin/Auth/SetPasswordPage"));
const PasswordResetSuccessPage = lazy(() => import("../pages/Dashboard/admin/Auth/PasswordResetSuccessPage"));

const AdminLayout = lazy(() => import("../pages/Dashboard/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("../pages/Dashboard/admin/AdminDashboard"));
const UserManagement = lazy(() => import("../pages/Dashboard/admin/UserManagement"));
const Reports = lazy(() => import("../pages/Dashboard/admin/Reports"));
const ProfileSettings = lazy(() => import("../pages/Dashboard/admin/ProfileSettings"));
const PasswordSettings = lazy(() => import("../pages/Dashboard/admin/PasswordSettings"));

// Authentication checkers
const isUserAuthenticated = () => !!localStorage.getItem("access_token");
const isAdminAuthenticated = () => localStorage.getItem("adminLoggedIn") === "true";

// Route guards
const ProtectedUserRoute = ({ children }) =>
  isUserAuthenticated() ? children : <Navigate to="/login" replace />;

const ProtectedAdminRoute = ({ children }) =>
  isAdminAuthenticated() ? children : <Navigate to="/admin/login" replace />;

// RedirectIfAuthenticated Component
const RedirectIfAuthenticated = ({ children }) => {
  if (isUserAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  if (isAdminAuthenticated()) {
    return <Navigate to="/admin" replace />;
  }

  return children; // Render the public content if not authenticated
};

const AppRoutes = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Public Pages */}
          <Route
            path="/"
            element={
              <RedirectIfAuthenticated>
                <LandingPage />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/signup"
            element={
              <RedirectIfAuthenticated>
                <SignUp />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectIfAuthenticated>
                <Login />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <RedirectIfAuthenticated>
                <ForgotPasswordModal />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/reset-link-sent"
            element={
              <RedirectIfAuthenticated>
                <ResetLinkSentModal />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/about"
            element={
              <RedirectIfAuthenticated>
                <About />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/pricing"
            element={
              <RedirectIfAuthenticated>
                <Pricing />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/blog"
            element={
              <RedirectIfAuthenticated>
                <BlogPost />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/blog-list"
            element={
              <RedirectIfAuthenticated>
                <BlogList />
              </RedirectIfAuthenticated>
            }
          />

          {/* Profile Setup (optional auth) */}
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/profile-bio" element={<ProfileBio />} />
          <Route path="/profile-modal" element={<ProfileModal />} />

          {/* Protected User Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedUserRoute>
                <Dashboard />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="/verify-email"
            element={
              <ProtectedUserRoute>
                <VerifyEmail />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedUserRoute>
                <Messages />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedUserRoute>
                <Search />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedUserRoute>
                <Profile />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedUserRoute>
                <Notifications />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="/shortlisted"
            element={
              <ProtectedUserRoute>
                <ShortListedProfile />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedUserRoute>
                <Settings />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="/match"
            element={
              <ProtectedUserRoute>
                <MatchPage />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <ProtectedUserRoute>
                <Profile />
              </ProtectedUserRoute>
            }
          />

          {/* Admin Auth Routes */}
          <Route
            path="/admin/login"
            element={
              <RedirectIfAuthenticated>
                <AdminLogin />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/admin/forgot-password"
            element={
              <RedirectIfAuthenticated>
                <ForgotPasswordPage />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/admin/reset-link"
            element={
              <RedirectIfAuthenticated>
                <ResetLinkSentPage />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/admin/set-password"
            element={
              <RedirectIfAuthenticated>
                <SetPasswordPage />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/admin/password-reset-success"
            element={
              <RedirectIfAuthenticated>
                <PasswordResetSuccessPage />
              </RedirectIfAuthenticated>
            }
          />
          <Route
            path="/admin/set-password/:uidb64/:token"
            element={
              <RedirectIfAuthenticated>
                <SetPasswordPage />
              </RedirectIfAuthenticated>
            }
          />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminLayout />
              </ProtectedAdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="reports" element={<Reports />} />
            <Route path="profile" element={<ProfileSettings />} />
            <Route path="password" element={<PasswordSettings />} />
          </Route>

          {/* Catch-All */}
          <Route path="*" element={<SignUp />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRoutes;