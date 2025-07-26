import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { verifyEmail, resendVerification } from "@/utils/api"; 

const VerifyEmail = () => {
  const [code, setcode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();

  const email = localStorage.getItem("verify_email") || "";

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newcode = [...code];
    newcode[index] = value;
    setcode(newcode);
    if (value !== "" && index < 5) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };

  const handleNext = async () => {
    const codeCode = code.join("");
    if (codeCode.length !== 6) {
      setError("Please enter the full 6-digit code.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await verifyEmail(email, codeCode);

      if (response) {
        console.log("Email verified successfully!");
        navigate("/Login");
      } else {
        throw new Error("Verification failed. Please check the code and try again.");
      }
    } catch (err) {
      setError(err.message || "Invalid code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    setError(""); // reset error message
    try {
      await resendVerification(email);
      setTimer(60);
      setCanResend(false);
      setError("Verification code resent! Check your email.");
    } catch (err) {
      setError("Failed to resend code. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 animate-fadeIn">
      <div className="bg-white shadow-lg rounded-2xl flex w-full max-w-4xl overflow-hidden">
        {/* Left Section */}
        <div className="w-full md:w-1/2 flex flex-col justify-center px-10 py-10">
          <div className="flex justify-center mb-6">
            <img
              src="/images/logo3.png"
              className="w-45 h-25 cursor-pointer justify-center"
              alt="Logo"
              onClick={() => navigate("/")}
            />
          </div>

          <h2 className="text-2xl font-semibold text-center">Verify your email</h2>
          <p className="text-gray-600 text-sm text-center mt-2">
            We've sent a verification code to <strong>{email}</strong>
          </p>
          <p className="text-gray-500 text-center text-sm mb-6">Please enter the 6-digit code</p>

          <div className="flex justify-center gap-4 mb-6">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                className="w-12 h-12 text-xl text-center border border-gray-300 rounded-md focus:outline-none focus:border-purple-500 transition transform focus:scale-110"
              />
            ))}
          </div>

          <Button
            text={loading ? "Verifying..." : "Next"}
            fullWidth
            onClick={handleNext}
            disabled={loading}
          />

          {error && <p className="text-red-500 text-center text-sm mt-2">{error}</p>}

          <p className="text-center text-sm text-gray-600 mt-4">
            {canResend ? (
              <button onClick={handleResend} className="text-purple-600 font-semibold">
                Resend verification code
              </button>
            ) : (
              <span className="text-gray-500">Resend code in {timer}s</span>
            )}
          </p>
        </div>

        {/* Right Section */}
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
