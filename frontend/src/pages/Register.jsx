import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    gender: "",
    bloodGroup: "",
    height: "",
    weight: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
    setMessage("");
  };

  const validate = () => {
    if (!formData.fullName.trim()) {
      setError("Full name is required.");
      return false;
    }

    if (!formData.email.trim()) {
      setError("Email is required.");
      return false;
    }

    const emailRegex =
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(formData.email)) {
      setError("Invalid email address.");
      return false;
    }

    if (!formData.password) {
      setError("Password is required.");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }

    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const res = await registerUser(formData);

      if (res.success) {

        /*
         * IMPORTANT:
         * Registration ke time token save nahi karna.
         * Pehle user ko Login page par bhejna hai.
         */

        setMessage(
          "Registration Successful. Please login."
        );

        setTimeout(() => {
          navigate("/login", {
            replace: true,
          });
        }, 1000);

      } else {
        setError(
          res.message || "Registration failed."
        );
      }

    } catch (err) {

      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Registration failed. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)",
        padding: "30px",
        boxSizing: "border-box",
      }}
    >

      <form
        onSubmit={handleRegister}
        style={{
          width: "500px",
          maxWidth: "100%",
          background: "#fff",
          borderRadius: "20px",
          padding: "35px",
          boxShadow:
            "0 15px 40px rgba(0,0,0,.2)",
          boxSizing: "border-box",
        }}
      >

        {/* TITLE */}

        <h1
          style={{
            textAlign: "center",
            color: "#2563eb",
            marginBottom: "10px",
          }}
        >
          🩺 Create Account
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "25px",
          }}
        >
          Register to use MediPredict AI
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

        {/* FULL NAME */}

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          style={inputStyle}
        />

        {/* EMAIL */}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
        />

        {/* PASSWORD */}

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "15px",
          }}
        >

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={{
              ...inputStyle,
              marginBottom: 0,
              flex: 1,
            }}
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            style={{
              border: "none",
              borderRadius: "8px",
              background: "#2563eb",
              color: "#fff",
              padding: "0 15px",
              cursor: "pointer",
            }}
          >
            {showPassword
              ? "Hide"
              : "Show"}
          </button>

        </div>

        {/* PHONE */}

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          style={inputStyle}
        />

        {/* AGE + GENDER */}

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            style={{
              ...inputStyle,
              flex: 1,
            }}
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            style={{
              ...inputStyle,
              flex: 1,
            }}
          >

            <option value="">
              Gender
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Female">
              Female
            </option>

            <option value="Other">
              Other
            </option>

          </select>

        </div>

        {/* BLOOD GROUP + HEIGHT + WEIGHT */}

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >

          <input
            type="text"
            name="bloodGroup"
            placeholder="Blood Group"
            value={formData.bloodGroup}
            onChange={handleChange}
            style={{
              ...inputStyle,
              flex: 1,
            }}
          />

          <input
            type="number"
            name="height"
            placeholder="Height (cm)"
            value={formData.height}
            onChange={handleChange}
            style={{
              ...inputStyle,
              flex: 1,
            }}
          />

          <input
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            value={formData.weight}
            onChange={handleChange}
            style={{
              ...inputStyle,
              flex: 1,
            }}
          />

        </div>

        {/* REGISTER BUTTON */}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px",
            border: "none",
            borderRadius: "10px",
            background: loading
              ? "#93c5fd"
              : "#2563eb",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: loading
              ? "not-allowed"
              : "pointer",
            marginTop: "10px",
          }}
        >
          {loading
            ? "Creating Account..."
            : "Register"}
        </button>

        {/* LOGIN LINK */}

        <p
          style={{
            textAlign: "center",
            marginTop: "20px",
          }}
        >
          Already have an account?{" "}

          <Link
            to="/login"
            style={{
              color: "#2563eb",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  outline: "none",
  boxSizing: "border-box",
};

export default Register;