import React, { useState } from "react";
import "./signup.css";
function Signup() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [checked, setChecked] = useState(false);

  const [notName, setNotName] = useState(false);
  const [notUserName, setNotUserName] = useState(false);
  const [notEmail, setNotEmail] = useState(false);
  const [notMobile, setNotMobile] = useState(false);
  const [notChecked, setNotChecked] = useState(false);

  function checkName(str) {
    const regex = /[A-Za-z].*[A-Za-z]/;
    return regex.test(str);
  }
  function checkUserName(str) {
    const regex = /[A-Za-z].*[A-Za-z]/;
    if (regex.test(str)) {
      return true;
    }

    return false;
  }
  function checkEmail(str) {
    const regex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return regex.test(str);
  }
  function checkMobile(str) {
    const regex = /^\d{10}$/;
    return regex.test(str);
  }

  function handleSubmit(e) {
    let allFieldsCorrect = true;
    e.preventDefault();
    // setting all errors to be true initally
    setNotName(true);
    setNotUserName(true);
    setNotEmail(true);
    setNotMobile(true);
    setNotChecked(true);
    console.log("submitted");
    // check name
    if (checkName(name)) {
      setNotName(false);
    } else {
      allFieldsCorrect = false;
    }
    //check userName
    if (checkUserName(userName)) {
      setNotUserName(false);
    } else {
      allFieldsCorrect = false;
    }
    // check email
    if (checkEmail(email)) {
      setNotEmail(false);
    } else {
      allFieldsCorrect = false;
    }
    // check mobile number
    if (checkMobile(mobile)) {
      setNotMobile(false);
    } else {
      allFieldsCorrect = false;
    }
    if (checked === true) {
      setNotChecked(false);
    } else {
      allFieldsCorrect = false;
    }

    if (allFieldsCorrect) {
      let userData = {
        name: name,
        userName: userName,
        email: email,
        mobile: mobile,
      };
      console.log(userData)
      localStorage.setItem("userData",JSON.stringify(userData));
    }
  }
  return (
    <>
      <div className="signupContainer">
        <div className="signupLeft">
          <div className="signupLeftText">
            <h1>Discover new things on Superapp</h1>
          </div>
        </div>
        <div className="signupRight">
          <div className="signupRightContainer">
            <form onSubmit={handleSubmit}>
              <h1>Super app</h1>
              <h3>create your account</h3>
              <div className="inputContainer">
                <input
                  type="text"
                  className={`signupName input ${notName ? "invalid" : ""}`}
                  placeholder="Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                {notName ? <p className="error">Field is required</p> : ""}
                <br />
                <input
                  type="text"
                  className={`signupUserName input ${
                    notUserName ? "invalid" : ""
                  }`}
                  placeholder="UserName"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                />
                {notUserName ? <p className="error">Field is required</p> : ""}
                <br />
                <input
                  type="text"
                  className={`signupEmail input ${notEmail ? "invalid" : ""}`}
                  placeholder="e-mail"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                {notEmail ? <p className="error">Field is required</p> : ""}
                <br />
                <input
                  type="text"
                  className={`signupMobile input ${notMobile ? "invalid" : ""}`}
                  placeholder="Mobile"
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value);
                  }}
                />
                {notMobile ? <p className="error">Field is required</p> : ""}
                <br />
              </div>
              <div className="checkbox">
                <input
                  type="checkbox"
                  className="checkboxSquare"
                  onChange={(e) => {
                    setChecked(e.target.checked);
                  }}
                />
                <span className="signupCheckboxSpan">
                  Share my registration data with Superapp
                </span>
              </div>
              {notChecked ? (
                <p className="error">Check this box if you want to proceed</p>
              ) : (
                ""
              )}
              <div className="signupButton">
                <button>SIGN UP</button>
              </div>
              <span className="span1">
                By clicking on Sign up. you agree to Superapp
              </span>
              <span className="span2"> Terms and Conditions of Use</span>
              <br /> <br />
              <span className="span1">
                To learn more about how Superapp collects, uses, shares and
                protects your personal data please head Superapp{" "}
              </span>
              <span className="span2"> Privacy Policy</span>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
