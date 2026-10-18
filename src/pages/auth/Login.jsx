import { useState } from "react";
import "./Login.css";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Image from "../../assets/images/login_image.webp";

import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      const res = await loginUser(formData);

      // Save user & token in AuthContext + localStorage
      const from = location.state?.from;

      login(res.user, res.token);

      toast.success(res.message);

      navigate(from?.pathname ? from.pathname + from.search + from.hash : "/", {
        replace: true,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-section">
      <div className="login-image">
        <img src={Image} alt="" />
      </div>

      <div className="login-form">
        <img
          src="https://cdn.dribbble.com/userupload/48551110/file/f730ea2ceb0ebb81692e526e355c1c90.png"
          alt=""
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
          />

          <br />
          <br />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <p className="forgot-password">
            <span onClick={() => navigate("/forgot-password")}>
              Forgot Password?
            </span>
          </p>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="signup-text">
            Don't have an account?{" "}
            <span onClick={() => navigate("/register")}>Sign up</span>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
