import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import ForgotPasswordModal from "../../components/ForgotPasswordModal";
import {  postLogin } from "@/utils/api";// Adjust the import path as necessary

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const navigate = useNavigate();
  

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    // Load Google Identity script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      const data = await postLogin( email, password);

       if (data) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        console.log("User Logged in!");
        navigate("/profile-setup");
      } else {
        throw new Error("Error while logging in");
      }
      
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: "YOUR_GOOGLE_CLIENT_ID", // <-- Replace with actual client ID
        scope: "email profile openid",
        callback: async (response) => {
          if (response.access_token) {
            try {
              const data = await post("/auth/google/", { token: response.access_token });
              localStorage.setItem("milkha_token", data.token);
              navigate("/dashboard");
            } catch (err) {
              setError(err.message);
            }
          }
        },
      });

      client.requestAccessToken();
    } catch {
      setError("Google login failed. Please try again.");
    }
  };

  const handleAppleLogin = () => {
    const clientID = "YOUR_APPLE_CLIENT_ID"; // <-- Replace with actual client ID
    const redirectURI = "https://yourfrontend.com/apple-callback"; // <-- Match with Apple config

    const appleAuthURL = `https://appleid.apple.com/auth/authorize?response_type=code&client_id=${clientID}&redirect_uri=${redirectURI}&scope=name%20email&response_mode=form_post`;
    window.location.href = appleAuthURL;
  };

  return (
    <div>
      <div className="max-h-screen w-full flex items-center justify-center bg-white p-4 transform scale-[0.95] origin-center overflow-hidden">
        <div className="transform scale-[0.8] origin-center bg-white shadow-lg rounded-2xl flex w-full max-w-6xl  px-3 py-3">
          {/* Left section */}
          <div
            data-aos="flip-right"
            data-aos-delay="100"
            data-aos-offset="150"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            className="max-w-full scale-[0.85] md:w-1/2 flex flex-col justify-center px-8 py-8"
          >
            <div className="flex justify-center mb-6">
              <img
                src="/images/logo3.png"
                className="w-45 h-25 cursor-pointer justify-center hover:scale-110 transition"
                alt="Logo"
                onClick={() => navigate("/profile-setup")}
              />
            </div>
            <h2 className="text-3x1 font-semibold text-center">Welcome Back</h2>
            <p className="text-gray-800 text-lg text-center mt-2">
              A meaningful connection is just a click away
            </p>

            {/* Social login buttons */}
            <div data-aos="slide-right" data-aos-delay="200" className="mt-6">
              <button
                onClick={handleAppleLogin}
                className="w-full flex items-center justify-center border border-gray-400 rounded-lg py-2 mb-3 hover:scale-120 transition-transform"
              >
                <FontAwesomeIcon icon={faApple} className="mr-2" />
                Sign up with Apple
              </button>
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center border border-gray-400 rounded-lg py-2 hover:scale-120 transition-transform"
              >
                <FontAwesomeIcon icon={faGoogle} className="mr-2 text-red-500" />
                Sign up with Google
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-400" />
              <span className="mx-3 text-gray-600 text-sm">OR LOG IN WITH YOUR EMAIL</span>
              <hr className="flex-grow border-gray-400" />
            </div>

            {/* Login form */}
<form>
  <InputField
    type="email"
    placeholder="hello@gmail.com"
    icon={faEnvelope}
    label="Email Address"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
  <InputField
    type="password"
    placeholder="********"
    icon={faLock}
    label="Input Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />

  <div className="flex justify-between items-center mt-3">
    <label className="flex items-center text-gray-700 text-lg">
      <input
        type="checkbox"
        checked={rememberMe}
        onChange={() => setRememberMe(!rememberMe)}
        className="mr-2"
      />
      Remember me
    </label>
    <span
      className="text-purple-600 text-lg cursor-pointer hover:scale-105 transition-transform"
      onClick={() => setIsForgotPasswordOpen(true)}
    >
      Forgot Password
    </span>
  </div>

  <Button
    type="button"
    text={loading ? "Logging in..." : "Login"}
    fullWidth
    onClick={handleLogin}
    disabled={loading}
    className="hover:border-purple-600 hover:scale-100 transition-transform"
  />

  {error && (
    <p className="text-red-600 text-center text-md mt-2">{error}</p>
  )}
</form>


            {/* Sign up redirect */}
            <p className="text-center text-lg text-gray-800 mt-4">
              Don’t have an account?{" "}
              <span
                className="text-purple-600 font-semibold hover:scale-105 transition cursor-pointer"
                onClick={() => navigate("/SignUp")}
              >
                SignUp
              </span>
            </p>
          </div>

          {/* Right image section */}
          <div data-aos="flip-left" data-aos-delay="200" className="hidden md:block w-1/2 relative">
            <img
              src="/images/vec.png"
              alt="Login"
              className="w-full max-h-full hover:scale-105 transition text-center justify-center object-auto"
            />
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotPasswordOpen}
        onClose={() => setIsForgotPasswordOpen(false)}
      />
    </div>
  );
};

export default Login;
