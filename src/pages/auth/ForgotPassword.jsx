import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import "./Login.css";
import Image from "../../assets/images/login_image.webp";
import { verifyRecovery, resetPassword } from "../../services/authService";

function ForgotPassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [resetToken, setResetToken] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleVerifyDetails = async (e) => {
    e.preventDefault();

    if (loading) return;

    const email = formData.email.trim().toLowerCase();
    const phone = formData.phone.trim();

    if (!email || !phone) {
      toast.error("Enter your email and phone number");
      return;
    }

    try {
      setLoading(true);

      const response = await verifyRecovery({ email, phone });

      // Assumes verifyRecovery returns the Axios response object.
      const token = response?.data?.resetToken;

      if (!token) {
        throw new Error(
          response?.data?.message || "The server did not return a reset token",
        );
      }

      setResetToken(token);
      setStep(2);
      toast.success("Details verified successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unable to verify your details",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (loading) return;

    const { newPassword, confirmPassword } = formData;

    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in both password fields");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must contain at least 8 characters");
      return;
    }

    if (new TextEncoder().encode(newPassword).length > 72) {
      toast.error("Password is too long");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await resetPassword({
        resetToken,
        newPassword,
        confirmPassword,
      });

      // Supports either an Axios response or response.data.
      const result = response?.data ?? response;

      if (result?.success === false) {
        throw new Error(result.message || "Unable to reset password");
      }

      toast.success(result?.message || "Password reset successfully");
      navigate("/login", { replace: true });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unable to reset password",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-section">
      <div className="login-image">
        <img src={Image} alt="Account recovery" />
      </div>

      <div className="login-form">
        <form onSubmit={step === 1 ? handleVerifyDetails : handleResetPassword}>
          <h1>{step === 1 ? "Forgot Password?" : "Create New Password"}</h1>

          <p className="auth-description">
            {step === 1
              ? "Enter the email address and phone number registered with your account."
              : "Choose a new password for your account."}
          </p>

          {step === 1 ? (
            <>
              <input
                type="email"
                name="email"
                placeholder="Registered Email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />

              <br />
              <br />

              <input
                type="tel"
                name="phone"
                placeholder="Registered Phone Number"
                value={formData.phone}
                onChange={handleChange}
                autoComplete="tel"
                required
              />

              <br />
              <br />

              <button type="submit" disabled={loading}>
                {loading ? "Verifying..." : "Verify Details"}
              </button>
            </>
          ) : (
            <>
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={formData.newPassword}
                onChange={handleChange}
                autoComplete="new-password"
                minLength={8}
                required
              />

              <br />
              <br />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm New Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                minLength={8}
                required
              />

              <br />
              <br />

              <button type="submit" disabled={loading || !resetToken}>
                {loading ? "Updating..." : "Reset Password"}
              </button>
            </>
          )}

          <p className="signup-text">
            Remember your password?{" "}
            <span
              role="button"
              tabIndex={0}
              onClick={() => navigate("/login")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  navigate("/login");
                }
              }}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
