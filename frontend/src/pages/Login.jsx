import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
    setMessage("");
  };

  const validate = () => {

    if (!formData.email.trim()) {

      setError(
        "Email is required."
      );

      return false;
    }

    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(formData.email)) {

      setError(
        "Invalid email address."
      );

      return false;
    }

    if (!formData.password) {

      setError(
        "Password is required."
      );

      return false;
    }

    if (formData.password.length < 6) {

      setError(
        "Password must be at least 6 characters."
      );

      return false;
    }

    return true;
  };

  const handleLogin = async (e) => {

    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {

      setLoading(true);

      setError("");
      setMessage("");

      const res =
        await loginUser(formData);

      if (res.success) {

        /*
         * Login ke baad hi token save hoga.
         */

        localStorage.setItem(
          "token",
          res.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(res.user)
        );

        setMessage(
          "Login Successful."
        );

        /*
         * IMPORTANT:
         * Login ke baad /home par jayega.
         * / par nahi.
         */

        setTimeout(() => {

          navigate("/home", {
            replace: true,
          });

        }, 1000);

      } else {

        setError(
          res.message ||
          "Login failed."
        );
      }

    } catch (err) {

      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Unable to login. Please try again."
      );

    } finally {

      setLoading(false);

    }
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
        boxSizing: "border-box",
      }}
    >

      <form
        onSubmit={handleLogin}
        style={{
          width: "420px",
          maxWidth: "100%",
          background: "#ffffff",
          borderRadius: "20px",
          padding: "35px",
          boxShadow:
            "0 15px 40px rgba(0,0,0,0.2)",
          boxSizing: "border-box",
        }}
      >

        {/* TITLE */}

        <h1
          style={{
            textAlign: "center",
            color: "#2563eb",
            marginBottom: "8px",
          }}
        >
          🩺 MediPredict AI
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "25px",
          }}
        >
          Login to your account
        </p>

        {/* ERROR */}

        {error && (

          <div
            style={{
              background: "#fee2e2",
              color: "#b91c1c",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "15px",
            }}
          >
            {error}
          </div>

        )}

        {/* SUCCESS */}

        {message && (

          <div
            style={{
              background: "#dcfce7",
              color: "#166534",
              padding: "10px",
              borderRadius: "8px",
              marginBottom: "15px",
            }}
          >
            {message}
          </div>

        )}

        {/* EMAIL */}

        <label>
          Email
        </label>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "5px",
            marginBottom: "18px",
            borderRadius: "8px",
            border:
              "1px solid #ccc",
            outline: "none",
            boxSizing: "border-box",
          }}
        />

        {/* PASSWORD */}

        <label>
          Password
        </label>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "5px",
            marginBottom: "20px",
          }}
        >

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            style={{
              flex: 1,
              padding: "12px",
              borderRadius: "8px",
              border:
                "1px solid #ccc",
              outline: "none",
              boxSizing: "border-box",
            }}
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            style={{
              padding: "0 15px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              background: "#2563eb",
              color: "#fff",
            }}
          >
            {showPassword
              ? "Hide"
              : "Show"}
          </button>

        </div>

        {/* LOGIN BUTTON */}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            background: loading
              ? "#93c5fd"
              : "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            cursor: loading
              ? "not-allowed"
              : "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          {loading
            ? "Please wait..."
            : "Login"}
        </button>

        {/* REGISTER LINK */}

        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          Don't have an account?{" "}

          <Link
            to="/register"
            style={{
              color: "#2563eb",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Register
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Login;