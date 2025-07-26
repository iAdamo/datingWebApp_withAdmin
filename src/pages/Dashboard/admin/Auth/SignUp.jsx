import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import InputField from "../../components/InputField";
import Button from "../../components/Button";


const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ Form Validation and API Integration
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // ✅ Basic Validation
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

    // ✅ Simulating API Request (Dummy API)
    try {
      const response = await fetch("https://dummyjson.com/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
    
      const data = await response.json();
    
      if (response.ok) {
        console.log("User Registered:", data);
        setLoading(false);
        navigate("/verify-email"); // ✅ Redirects only after successful signup
      } else {
        setError("Signup failed. Try again.");
        setLoading(false);
      }
    } catch (err) {
      console.error("API Request Failed:", err);
      setError("Network error. Please try again.");
      setLoading(false);
    }
     // Simulate API delay
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl flex w-full max-w-6xl h-[120vh] px-3 py-3">
        
        {/* Left Section - Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-10">
        <div className="flex justify-center mb-6">
                <img
        src="/images/logo.png"
        className="w-40 h-15 cursor-pointer justify-center"
        alt="Logo"
        onClick={() => navigate("/dashboard")}
      />
      </div>
          <h2 className="text-2xl font-semibold text-center">
            A meaningful connection is just a click away
          </h2>
          <p className="text-gray-600 text-sm text-center mt-2">
            By signing up, I agree to Milkha’s{" "}
            <span className="text-purple-600 cursor-pointer">Terms</span> and{" "}
            <span className="text-purple-600 cursor-pointer">Privacy Policy</span>
          </p>

          {/* Social Logins */}
          <div className="mt-6">
            <button className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 mb-3">
              <FontAwesomeIcon icon={faApple} className="mr-2" />
              Sign up with Apple
            </button>
            <button className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2">
              <FontAwesomeIcon icon={faGoogle} className="mr-2 text-red-500" />
              Sign up with Google
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-3 text-gray-500 text-sm">OR SIGN UP WITH YOUR EMAIL</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Input Fields */}
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

            {/* Submit Button */}
            <Button 
              text={loading ? "Creating account..." : "Next"} 
              fullWidth 
              onClick={handleSignUp} 
              disabled={loading} 
            />

            {error && <p className="text-red-500 text-center text-sm mt-2">{error}</p>}
          </form>

          {/* Login Redirect */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <span className="text-purple-600 font-semibold cursor-pointer"
            onClick={() => navigate("/Login")}>Login</span>
          </p>
        </div>

        {/* Right Section - Image */}
        <div className="hidden md:block w-1/2 relative">
          <img
            src="/images/vec.png"
            alt="Sign Up"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </div>
  );
};

export default SignUp;
