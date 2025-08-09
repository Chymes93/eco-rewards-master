import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import VerifyEmail from "./components/VerifyEmail";
import VerifyPhone from "./components/VerifyPhone";
import ForgotPassword from "./components/ForgotPassword";
import Dashboard from "./components/Dashboard";
import LeaderboardPage from "./pages/LeaderboardPage";
import UploadReceipt from "./components/UploadReceipt";
import ReceiptHistory from "./components/ReceiptHistory";
import JoinChallenge from "./components/JoinChallenge";
import ReferFriend from "./components/ReferFriend";
import ChallengePage from "./pages/ChallengePage";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import RewardsPage from "./components/RewardsPage";
import Settings from "./components/Settings";
import NotificationDetail from "./components/NotificationDetail";
import QRGenerator from "./components/qr/QRGenerator";
import QRCodeDisplay from "./components/qr/QRCodeDisplay";
import QRScanLandingPage from "./components/qr/QRScanLandingPage";
import FAQ from "./components/FAQ";
import About from "./components/About";
import PrivacyPolicy from "./components/PrivacyPolicy";
import CommunityPage from "./pages/CommunityPage";
import PartnersPage from "./pages/PartnersPage";
import { LeaderboardProvider } from "./context/LeaderboardContext";
import { ActivitiesProvider } from "./context/ActivitiesContext";

const NavbarWrapper = () => {
  const location = useLocation();
  const hideNavbarPaths = [
    "/dashboard",
    "/leaderboard",
    "/upload-receipt",
    "/receipt-history",
    "/join-challenge",
    "/refer-friend",
    "/login",
    "/signup",
    "/verify-email",
    "/verify-phone",
    "/forgot-password",
    "/settings",
    "/qr/generate",
    "/qr/display",
    "/qr/scan",
  ];

  // Hide navbar for notification detail page
  if (location.pathname.startsWith("/notifications-detail/")) {
    return null;
  }

  // Check if navbar should be hidden
  const shouldShowNavbar =
    !hideNavbarPaths.includes(location.pathname) &&
    !location.pathname.startsWith("/challenge/") &&
    !location.pathname.startsWith("/qr/");

  return shouldShowNavbar ? <Navbar /> : null;
};

const Display = () => {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <LeaderboardProvider>
            <ActivitiesProvider>
              <NavbarWrapper />
              <Routes>
                <Route index element={<LandingPage />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                <Route path="/verify-phone" element={<VerifyPhone />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                <Route path="/verify-email/:token" element={<VerifyEmail />} />

                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="/upload-receipt" element={<UploadReceipt />} />
                <Route path="/receipt-history" element={<ReceiptHistory />} />
                <Route path="/join-challenge" element={<JoinChallenge />} />
                <Route path="/refer-friend" element={<ReferFriend />} />
                <Route path="/challenge/:id" element={<ChallengePage />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/rewards" element={<RewardsPage />} />
                <Route
                  path="/notifications-detail/:id"
                  element={<NotificationDetail />}
                />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/about" element={<About />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/partners" element={<PartnersPage />} />

                {/* QR Code Routes */}
                <Route path="/qr-generate" element={<QRGenerator />} />
                <Route path="/qr/display/:qrId" element={<QRCodeDisplay />} />
                <Route path="/qr/scan/:qrId" element={<QRScanLandingPage />} />
              </Routes>
            </ActivitiesProvider>
          </LeaderboardProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default Display;
