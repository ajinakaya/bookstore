import { useState } from "react";
import "../css/UserLogin.css";
import { MdEmail } from "react-icons/md";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "./AuthContext";

function UserLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const loginUser = async (e) => {
    e.preventDefault();

    const { email, password } = data;

    try {
      setLoading(true);

      const response = await axios.post('/login', {
        email,
        password,
      });
      console.log('Server Response:', response);

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        // Clear the input fields
        setData({ email: '', password: '' });
        console.log('Server Token:', response.data.token);
        login(response.data.token);
        navigate('/');
      }
    } catch (error) {
      console.error('Error during login:', error);
      toast.error('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="main-login-wrapper">
        <div className="bacground-image"></div>
        <div className="wrapper">
          <div className="form-box login">
            <h2>Login</h2>

            <form onSubmit={loginUser}>
              <div className="input-box">
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  required
                />
                <label>Email</label>
                <a href="#">
                  <span className="email-icon-login">
                    <MdEmail />
                  </span>
                </a>
              </div>

              <div className="input-box">
                <input
                  type="password"
                  value={data.password}
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                  required
                />
                <label>Password</label>
              </div>

              <div className="remember-forgot">
                <label>
                  <input type="checkbox" />
                  Remember me
                </label>
                <a href="forgotpassword" className="forgetpassword">
                  Forgot Password?
                </a>
              </div>

              <button type="submit" className="btn">
                Login
              </button>

              <div className="register">
                <p>
                  Don't have an account?
                  <a href="register" className="Login-link">
                    {" "}
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserLogin;
