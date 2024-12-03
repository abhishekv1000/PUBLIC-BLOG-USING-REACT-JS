import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const formatErrorMessage = (errorData) => {
    if (typeof errorData === 'string') return errorData;
    // if (errorData.code && errorData.message) return ${errorData.code}; ${errorData.message};
    if (errorData.message) return errorData.message;
    return JSON.stringify(errorData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", inputs);
      navigate("/login");
    } catch (error) {
      console.error("Error object:", error); // Log the entire error object for debugging
      const errorMessage = error.response?.data
        ? formatErrorMessage(error.response.data)
        : "An error occurred. Please try again.";
      setError(errorMessage);
    }
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(to right, #0c1213, #0698f9)', // Blue gradient background
      color: '#fff',
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
    },
    form: {
      background: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black background
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
      width: '90%',
      maxWidth: '400px',
      boxSizing: 'border-box',
      marginTop: '50px', // Adjusted margin top
    },
    input: {
      width: '100%',
      padding: '12px', // Reduced padding
      margin: '10px 0', // Adjusted margin
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '16px', // Reduced font size
    },
    button: {
      backgroundColor: '#0069d9', // Blue color
      color: '#fff',
      border: 'none',
      padding: '15px 30px',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '18px',
      marginTop: '15px',
      marginRight: '10px', // Space between buttons
    },
    buttonHover: {
      backgroundColor: '#0056b3', // Darker blue on hover
    },
    error: {
      color: '#ff6f61', // Red color for errors
      fontWeight: 'bold',
      margin: '10px 0',
      fontSize: '16px', // Adjusted font size
    },
    link: {
      color: '#0698f9', // Lighter blue color for link
      textDecoration: 'none',
      fontSize: '16px', // Adjusted font size
    },
    linkHover: {
      textDecoration: 'underline',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={{ fontSize: '36px', marginBottom: '30px' }}>Sign Up</h1>
      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          required
          type="text"
          placeholder="Username"
          name="username"
          style={styles.input}
          onChange={handleChange}
        />
        <input
          required
          type="email"
          placeholder="Email"
          name="email"
          style={styles.input}
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="Password"
          name="password"
          style={styles.input}
          onChange={handleChange}
        />
        <button
          type="submit"
          style={styles.button}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}
        >
          Sign Up
        </button>
        {err && <p style={styles.error}>{err}</p>}
        <span style={{ fontSize: '16px' }}>
          {"  "}
          <Link to="/login" style={styles.link} onMouseEnter={(e) => e.currentTarget.style.textDecoration = styles.linkHover.textDecoration} onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}>
            Sign In
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Register; 