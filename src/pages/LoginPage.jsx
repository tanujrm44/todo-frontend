import React, { useEffect, useState } from "react"
import { Form, Input, Button, Spin } from "antd"
import { UserOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { useLoginMutation } from "../slices/api/authApiSlice"
import { useMessage } from "../context/MessageContext"
import { useAuth } from "../context/UserContext"

const LoginPage = () => {
  const { setAuthenticated } = useAuth()
  const navigate = useNavigate()
  const { showMessage } = useMessage()
  const [login, { isLoading }] = useLoginMutation()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  // useEffect(() => {
  //   if (localStorage.getItem("auth")) {
  //     navigate("/")
  //   }
  // }, [])

  const onFinish = async (values) => {
    setFormData(values)
    try {
      const res = await login(values).unwrap()
      setAuthenticated(res)
      showMessage("Login successful!", "success")
      navigate("/")
    } catch (err) {
      showMessage(err?.data?.errors, "error")
    }
  }

  return (
    <div className="loginContainer">
      <h3 style={{ textAlign: "center", marginBottom: "2rem" }}>Login</h3>
      <Form onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter your email!",
            },
          ]}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        >
          <Input
            prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter your password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            loading={isLoading}
            type="primary"
            htmlType="submit"
            style={{ width: "100%" }}
          >
            Login
          </Button>
          <div
            style={{
              textAlign: "center",
              marginTop: "1rem",
              cursor: "pointer",
            }}
          >
            Don't have an account?{" "}
            <span
              className="register-link"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </span>
          </div>
          <Button icon={<GoogleOutlined />} className={"google-btn"}>
            {" "}
            Login with Google
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default LoginPage
