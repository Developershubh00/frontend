import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Image from "../../assets/images/login_image.webp";
import "./Register.css";
import { Eye, EyeOff } from "lucide-react";

import { registerUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const phone = formData.phone.trim();
    const { password, confirmPassword } = formData;

    if (!name || !email || !phone || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    // bcrypt only processes up to 72 bytes of a password.
    if (new TextEncoder().encode(password).length > 72) {
      toast.error("Password is too long");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await registerUser({
        name,
        email,
        phone,
        password,
      });

      // This assumes registerUser returns response.data.
      if (!res?.success || !res?.user || !res?.token) {
        throw new Error(res?.message || "Registration response was incomplete");
      }

      login(res.user, res.token);

      toast.success(res.message || "Registration successful");
      navigate("/", { replace: true });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Registration failed. Please try again.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-section">
      <div className="register-image">
        <img src={Image} alt="Register" />
      </div>

      <div className="register-form">
        <img
          src="https://cdn.dribbble.com/userupload/48551110/file/f730ea2ceb0ebb81692e526e355c1c90.png"
          alt="Logo"
        />

        <form onSubmit={handleSubmit}>
          <h1>Create Account</h1>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            autoComplete="tel"
            required
          />

          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              minLength={6}
              required
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="password-field">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              minLength={6}
              required
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              aria-label={
                showConfirmPassword
                  ? "Hide confirm password"
                  : "Show confirm password"
              }
              aria-pressed={showConfirmPassword}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Register"}
          </button>

          <p className="login-text">
            Already have an account?{" "}
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
              Log In
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
