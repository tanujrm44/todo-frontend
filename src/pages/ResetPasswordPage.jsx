import React, { useEffect, useState } from "react"
import { Form, Input, Button } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { useNavigate, useParams } from "react-router-dom"
import {
  useLoginMutation,
  useResetPasswordMutation,
} from "../slices/api/authApiSlice"
import { useMessage } from "../context/MessageContext"
import { useAuth } from "../context/UserContext"

const ResetPasswordPage = () => {
  const { userId, token } = useParams()
  const { localAuth } = useAuth()

  const navigate = useNavigate()
  const { showMessage } = useMessage()
  const [resetPassword] = useResetPasswordMutation()

  const onFinish = async (values) => {
    if (values.password !== values.confirm_password)
      return showMessage("Passwords do not match", "error")
    try {
      const res = await resetPassword({
        password: values.password,
        password_confirmation: values.confirm_password,
        id: userId,
        token,
      }).unwrap()
      showMessage(res.message || "Password reset successful", "success")
      navigate("/login")
    } catch (err) {
      showMessage(
        err?.data?.message || "Something went wrong, try again later",
        "error"
      )
    }
  }

  return (
    <div className="loginContainer">
      <img src="/logo.png" alt="Company Logo" className="logo" />
      <h4 style={{ textAlign: "center", marginBottom: "1rem" }}>
        Reset Password
      </h4>
      <Form onFinish={onFinish}>
        <Input
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          placeholder="New Password"
          name="password"
        />

        <Input
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          placeholder="Confirm Password"
          name="confirm_password"
        />

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ResetPasswordPage
