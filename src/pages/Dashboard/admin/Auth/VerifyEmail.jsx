import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";

const VerifyEmail = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30); // Countdown starts at 30 seconds
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();

  // Countdown Timer Effect
  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Allow only numbers
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next field if input is filled
    if (value !== "" && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleNext = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 4) {
      setError("Please enter the full OTP.");
      return;
    }

    setLoading(true);
    setError("");

    setTimeout(() => {
      if (otpCode === "4711") { // Simulated correct OTP
        console.log("OTP Verified Successfully!");
        navigate("/Login"); // Redirect to dashboard
      } else {
        setError("Invalid OTP. Please try again.");
      }
      setLoading(false);
    }, 2000);
  };

  const handleResend = () => {
    if (!canResend) return;

    console.log("Resending OTP...");
    setTimer(30); // Reset timer
    setCanResend(false); // Disable button until timer resets
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 animate-fadeIn">
      <div className="bg-white shadow-lg rounded-2xl flex w-full max-w-6xl overflow-hidden">
        
        {/* Left Section - Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-10 py-10">
        <div className="flex justify-center mb-6">
                <img
        src="/images/logo.png"
        className="w-40 h-15 cursor-pointer justify-center"
        alt="Logo"
        onClick={() => navigate("/dashboard")}
      />
      </div>
          <h2 className="text-2xl font-semibold text-center">Verify your email</h2>
          <p className="text-gray-600 text-sm text-center mt-2">
            We've sent a verification email to <strong>khalid@gmail.com</strong>
          </p>
          <p className="text-gray-500 text-center text-sm mb-6">Please enter the code</p>

          {/* OTP Inputs */}
          <div className="flex justify-center gap-4 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                className="w-12 h-12 text-xl text-center border border-gray-300 rounded-md focus:outline-none focus:border-purple-500 transition transform focus:scale-110"
              />
            ))}
          </div>

          {/* Submit Button */}
          <Button text={loading ? "Verifying..." : "Next"} fullWidth onClick={handleNext} disabled={loading} />

          {error && <p className="text-red-500 text-center text-sm mt-2">{error}</p>}

          {/* Resend Code */}
          <p className="text-center text-sm text-gray-600 mt-4">
            {canResend ? (
              <button onClick={handleResend} className="text-purple-600 font-semibold">
                Resend code
              </button>
            ) : (
              <span className="text-gray-500">Resend code in {timer}s</span>
            )}
          </p>
        </div>

        {/* Right Section - Image */}
        <div className="hidden md:block w-1/2 relative px-2 py-2">
          <img
            src="/images/vec.png"
            alt="Verification"
            className="w-full h-full object-cover rounded-l-lg"
          />
        </div>

      </div>
    </div>
  );
};

export default VerifyEmail;
