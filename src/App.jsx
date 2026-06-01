import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Register from "./pages/Authentication/Register";
import Login from "./pages/Authentication/Login";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import Profile from "./pages/Profile.jsx/Profile";
import ProductGut from "./pages/Products/ProductGut";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation/OrderConfirmation";
import OrderDetails from "./pages/OrderDetails/OrderDetails";
import PaymentSuccess from "./pages/OrderConfirmation/PaymentSuccess";
import PaymentFailure from "./pages/OrderConfirmation/PaymentFailure";
import OrderRedirect from "./pages/OrderConfirmation/OrderRedirect";
import Blogs from "./pages/Blogs/Blogs";
import BlogDetail from "./pages/Blogs/BlogDetail";
import Testimonials from "./pages/Testimonials/Testimonials";
import FirstContent from "./pages/Blogs/Topics/FirstContent";
import SecondContent from "./pages/Blogs/Topics/SecondContent";
import ThirdContent from "./pages/Blogs/Topics/ThirdContent";
import FourthContent from "./pages/Blogs/Topics/FourthContent";
import FifthContent from "./pages/Blogs/Topics/FifthContent";
import SixthContent from "./pages/Blogs/Topics/SixthContent";
import SeventhContent from "./pages/Blogs/Topics/SeventhContent";
import PrivacyPolicy from "./pages/Legal/PrivacyPolicy";
import TermsOfService from "./pages/Legal/TermsOfService";
import NotFound from "./pages/404/NotFound";
import Contact from "./pages/Contact/Contact";
import ScrollToTop from "./components/ScrollToTop";
import TBClub from "./pages/TBClub/TBClub";
import Quiz from "./pages/Gut Scoring/Quiz";
import FAQ from "./pages/FAQ/FAQ";
import PromoPopup from "./components/PromoPopup";

function ProtectedRoute({ children }) {
  const isAuthenticated =
    useSelector((state) => state.auth.isAuthenticated) ||
    !!localStorage.getItem("token");
  return isAuthenticated ? children : <Navigate to="/user/login" replace />;
}

function GuestRoute({ children }) {
  const isAuthenticated =
    useSelector((state) => state.auth.isAuthenticated) ||
    !!localStorage.getItem("token");
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const redirect = params.get("redirect");
  return !isAuthenticated ? (
    children
  ) : (
    <Navigate to={redirect || "/"} replace />
  );
}

function App() {
  return (
    <>
      <ScrollToTop />
      <PromoPopup />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductGut />} />
        <Route path="/products/:categorySlug" element={<ProductGut />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderRedirect />} />
        <Route
          path="/order-confirmation/:orderNumber"
          element={<OrderConfirmation />}
        />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/payment/failure" element={<PaymentFailure />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/detail/:id" element={<BlogDetail />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/blogs/gut-brain-axis" element={<SecondContent />} />
        <Route path="/blogs/scfa-health" element={<ThirdContent />} />
        <Route
          path="/blogs/Thirdbiome GTB-super-molecule"
          element={<FourthContent />}
        />
        <Route
          path="/blogs/microencapsulated-tryThirdbiome GTB"
          element={<FifthContent />}
        />
        <Route
          path="/blogs/traditional-probiotics"
          element={<SixthContent />}
        />
        <Route path="/blogs/poop-health-decoder" element={<SeventhContent />} />
        <Route path="/blogs/:topicSlug" element={<FirstContent />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/404-not-found" element={<NotFound />} />
        <Route path="/t3b-club" element={<TBClub />} />
        <Route path="/gut-scoring/interactive-quiz" element={<Quiz />} />
        <Route path="/faq" element={<FAQ />} />

        {/* Guest routes - only accessible when not authenticated */}
        <Route
          path="/user/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          path="/user/register"
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          }
        />
        <Route
          path="/user/forgot-password"
          element={
            <GuestRoute>
              <ForgotPassword />
            </GuestRoute>
          }
        />

        {/* Protected routes - only accessible when authenticated */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/:orderNumber"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />

        {/* Catch-all route for any unmatched paths - must be last */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
