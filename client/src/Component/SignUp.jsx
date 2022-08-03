import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  let [userName, setUserName] = useState("");
  let [password, setPassword] = useState("");
  let [notification, setNotification] = useState("");

  let navigate = useNavigate();

  let handleOnchange = (e, type) => {
    if (type === "userName") {
      setUserName(e.target.value);
    }
    if (type === "password") {
      setPassword(e.target.value);
    }
  };

  let handleOnclickSignUp = async (e) => {
    e.preventDefault();
    let data = {
      userName,
      password,
    };
    
    try {
      let res = await axios.post("http://localhost:5000/sign-up", data);
      if (res && res.data && res.data.errCode === 0) {
        console.log(res.data.errMessage);
        setNotification(res.data.errMessage);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        console.log(res.data.errMessage);
        setNotification(res.data.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className="Login">
        <h1 className="ml-4">Sign up</h1>
        <form className="m-4">
          <div class="form-group">
            <label for="exampleInputEmail1">Email</label>
            <input
              type="email"
              className="form-control col-4"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={userName}
              onChange={(e) => handleOnchange(e, "userName")}
            ></input>
            <small id="emailHelp" class="form-text text-muted"></small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control col-4"
              placeholder="Password"
              value={password}
              onChange={(e) => handleOnchange(e, "password")}
            ></input>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => handleOnclickSignUp(e)}
          >
            Submit
          </button>
        </form>
      </div>
      <h4 className="mx-4">{notification}</h4>
    </>
  );
}
