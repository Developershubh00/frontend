import { useState } from "react";
import "./Login.css";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Image from "../../assets/images/login_image.webp";
import { Eye, EyeOff } from "lucide-react";

import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const res = await loginUser({
        email,
        password,
      });

      if (!res?.success || !res?.user || !res?.token) {
        throw new Error(res?.message || "Invalid login response");
      }

      // Save user and token using your existing AuthContext.
      login(res.user, res.token);

      toast.success(res.message || "Login successful");

      const from = location.state?.from;

      const redirectTo = from?.pathname
        ? `${from.pathname}${from.search || ""}${from.hash || ""}`
        : "/";

      navigate(redirectTo, { replace: true });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-section">
      <div className="login-image">
        <img src={Image} alt="Login illustration" />
      </div>

      <div className="login-form">
        <img
          src="https://cdn.dribbble.com/userupload/48551110/file/f730ea2ceb0ebb81692e526e355c1c90.png"
          alt="Welcome"
        />

        <form onSubmit={handleSubmit}>
          <h1>Login</h1>

          <br />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
            disabled={loading}
          />

          <br />
          <br />

          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
              disabled={loading}
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              disabled={loading}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <p className="forgot-password">
            <span
              role="button"
              tabIndex={0}
              onClick={() => navigate("/forgot-password")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  navigate("/forgot-password");
                }
              }}
            >
              Forgot Password?
            </span>
          </p>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="signup-text">
            Don't have an account?{" "}
            <span
              role="button"
              tabIndex={0}
              onClick={() => navigate("/register")}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  navigate("/register");
                }
              }}
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
