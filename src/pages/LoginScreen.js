import React, { useState } from "react";
import styled from "styled-components";
function LoginScreen() {
  const [check, setCheck] = useState(true);
  return (
    <Container>
      {check ? (
        <Content>
          <label>Create Account</label>
          <span>
            Already have an account?{" "}
            <a href="#" onClick={() => setCheck(false)}>
              Sign in
            </a>
          </span>
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />
          <input type="text" placeholder="Url Avatar" required />
          <button type="submit">Sign Up</button>
        </Content>
      ) : (
        <Content>
          <label>Login Account</label>
          <span>
            Don't have account?{" "}
            <a href="#" onClick={() => setCheck(true)}>
              Sign up
            </a>
          </span>
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Sign In</button>
        </Content>
      )}
    </Container>
  );
}

export default LoginScreen;
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
`;
const Content = styled.form`
  width: max-content;
  margin: 0 auto;
  margin-top: -60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  -webkit-box-shadow: 1px 3px 13px 6px #3480eb;
  box-shadow: 1px 3px 13px 6px #3480eb;
  border-radius: 10px;
  label {
    font-size: 24px;
    margin-bottom: 4px;
    font-weight: bold;
  }
  input {
    width: 200px;
    height: 28px;
    outline: none;
    margin-top: 20px;
    border-radius: 4px;
    border: none;
    border: 1px solid #111;
    padding: 4px;
    transition: border 0.25s linear;
    &:focus {
      border: 1px solid #3480eb;
    }
  }
  button {
    background-color: #3480eb;
    border: none;
    margin-top: 20px;
    padding: 10px;
    color: #fff;
    border-radius: 4px;
    width: 100px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;
