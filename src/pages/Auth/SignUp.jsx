import AOS from 'aos';
import 'aos/dist/aos.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { post } from "@/utils/api";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  // ✅ Email Sign-Up
  const handleSignUp = async (e) => {
    e.preventDefault();
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

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      console.log({ email, password1: password, password2: confirmPassword });
  await post("/auth/register/", {
    email,
    password1: password,
    password2: confirmPassword,
  });
  setLoading(false);
  navigate("/verify-email");
} catch (err) {
  setError(err.message);
  setLoading(false);
}

  };

    

  // ✅ Google Signup
  const handleGoogleSignup = () => {
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: "YOUR_GOOGLE_CLIENT_ID", // Replace with actual Client ID
      scope: "email profile openid",
      callback: async (response) => {
        if (response.access_token) {
          try {
            const data = await post("/auth/google/", { token: response.access_token });
            localStorage.setItem("milkha_token", data.token);
            navigate("/profile-setup"); // Or dashboard
          } catch (err) {
            setError(err.message);
          }
        }
      },
    });

    client.requestAccessToken();
  };

  // ✅ Apple Signup
  const handleAppleSignup = () => {
    const clientID = "YOUR_APPLE_CLIENT_ID"; // Replace
    const redirectURI = "https://yourfrontend.com/apple-callback"; // Must match Apple config

    const appleURL = `https://appleid.apple.com/auth/authorize?response_type=code&client_id=${clientID}&redirect_uri=${redirectURI}&scope=name%20email&response_mode=form_post`;

    window.location.href = appleURL;
  };

  return (
    <div className="max-h-screen flex max-w-full items-center justify-center bg-white p-4 transform scale-[0.95] origin-center overflow-hidden">
      <div className="transform scale-[0.8] origin-center bg-white shadow-lg rounded-2xl flex w-full max-w-6xl px-3 py-3">

        {/* Left Section - Form */}
        <div
          data-aos="flip-right"
          data-aos-delay="100"
          data-aos-offset="150"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          className="transform scale-[0.85] origin-center w-full md:w-1/2 flex flex-col justify-center px-10"
        >
          <div data-aos="fade-down" data-aos-delay="200" className="flex justify-center mb-6">
            <img
              src="/images/logo3.png"
              className="w-45 h-25 cursor-pointer justify-center hover:scale-110 transition"
              alt="Logo"
              onClick={() => navigate("/sign-up")}
            />
          </div>

          <h2 className="text-3xl font-semibold text-center">
            A meaningful connection is just a click away
          </h2>
          <p className="text-gray-800 text-lg text-center mt-2">
            By signing up, I agree to Milkha’s{" "}
            <span className="text-purple-600 hover:scale-105 transition cursor-pointer">Terms</span> and{" "}
            <span className="text-purple-600 hover:scale-105 transition cursor-pointer">Privacy Policy</span>
          </p>

          {/* Social Signups */}
          <div data-aos="slide-right" data-aos-delay="200" className="mt-6">
            <button
              onClick={handleAppleSignup}
              className="w-full flex items-center justify-center border border-gray-400 rounded-lg py-2 mb-3 hover:scale-120 transition-transform"
            >
              <FontAwesomeIcon icon={faApple} className="mr-2" />
              Sign up with Apple
            </button>
            <button
              onClick={handleGoogleSignup}
              className="w-full flex items-center justify-center border border-gray-400 rounded-lg py-2 hover:scale-120 transition-transform"
            >
              <FontAwesomeIcon icon={faGoogle} className="mr-2 text-red-500" />
              Sign up with Google
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-400" />
            <span className="mx-3 text-gray-600 text-sm">OR SIGN UP WITH YOUR EMAIL</span>
            <hr className="flex-grow border-gray-400" />
          </div>

         <div className="hover:scale-105 transition">
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
    label="Create a Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
  <InputField
    type="password"
    placeholder="********"
    icon={faLock}
    label="Confirm Password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
  />

  <Button
    text={loading ? "Creating account..." : "Sign Up"}
    fullWidth
    onClick={handleSignUp}
    disabled={loading}
    className="hover:scale-105 transition"
  />

  {error && (
    <p className="text-red-600 text-center text-lg mt-2">{error}</p>
  )}
</div>


          {/* Login Redirect */}
          <p className="text-center text-lg text-gray-600 mt-4 hover:scale-105 transition">
            Already have an account?{" "}
            <span
              className="text-purple-600 font-semibold hover:scale-105 transition cursor-pointer"
              onClick={() => navigate("/Login")}
            >
              Login
            </span>
          </p>
        </div>

        {/* Right Section - Image */}
        <div data-aos="flip-left" data-aos-delay="200" className="hidden md:block w-1/2 relative">
          <img
            src="/images/vec.png"
            alt="Sign Up"
            className="w-full max-h-full hover:scale-105 transition text-center justify-center object-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
