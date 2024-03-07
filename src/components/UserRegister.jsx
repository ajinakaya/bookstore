import React, {useState} from "react";
import "../css/UserRegister.css";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from 'axios'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



const UserRegister = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username:'',
    email:'',
    password:'',
    confirmpassword:'',
  })

  const registerUser =  async(e) =>{
    e.preventDefault();
    const {username,email,password,confirmpassword}=data
    try{
      const {data}=await axios.post('/register',{
        username,email,password,confirmpassword
      })
      if(data.error){
        toast.error(data.error)
      } else{
        setData({})
        toast.success('register Successful.welcome!')
        navigate('/login')
      }
    } catch (error){
      console.log(error)

    }
    
  }

  return (
    <div className="main-register-wrapper">
      <div className="bacground-image"></div>
      <div>
        <div className="wrapper1">
          <div className="form-box register">
            <h2>Register</h2>

            <form onSubmit={registerUser}>
              <div className="inputbox">
                <input type="username" 
                value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })}
                required
                 />
                <label>Username</label>
                <a href="#">
                  <span className="user-icon-register">
                    <FaUser />
                  </span>
                </a>
              </div>

              <div className="inputbox">
                <input type="email" 
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
               required
                />
                <label>Email</label>
                <a href="#">
                  <span className="user-icon-register">
                    <MdEmail />
                  </span>
                </a>
              </div>

              <div className="inputbox">
                <input type="password"
                  value={data.password}
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                  required 
                  />
                <label>Password</label>
                <a href="#">
                  <span className="user-icon-register">
                    <RiLockPasswordFill />
                  </span>
                </a>
              </div>

              
              <div className="inputbox">
                <input type="confirmpassword" 
                value={data.confirmpassword}
                onChange={(e) => setData({ ...data, confirmpassword: e.target.value })}
                required />
                <label>Confirm Password</label>
                <a href="#">
                  <span className="user-icon-register">
                    <RiLockPasswordFill />
                  </span>
                </a>
              </div>

              <div className="conditions">
                <label>
                  <input type="checkbox" />I agree the terms & conditions
                </label>
              </div>

              <button type="submit" className="register-btn">
                Register
              </button>

              <div className="login">
                <p>
                  Already have an account?
                  <a href="login" className="Register-link">
                    {" "}
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;
