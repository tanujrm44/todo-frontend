import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/UserContext"
import { useLogoutMutation } from "../slices/api/authApiSlice"
import { useMessage } from "../context/MessageContext"
import { Button, Dropdown, Flex, Space } from "antd"
import {
  UpOutlined,
  DownOutlined,
  UserOutlined,
  GoogleOutlined,
  LoginOutlined,
} from "@ant-design/icons"

const Header = () => {
  const navigate = useNavigate()
  const { localAuth, clearAuthentication } = useAuth()
  const { showMessage } = useMessage()
  const [logout] = useLogoutMutation()
  const logoutHandler = async () => {
    try {
      await logout().unwrap()
      showMessage("Logout Successful", "success")
      clearAuthentication()
      navigate("/login")
    } catch (err) {
      showMessage(err?.data?.errors || "Could not perform operation", "error")
    }
  }
  const items = [
    {
      key: "1",
      label: <p onClick={() => navigate("/profile")}>Profile</p>,
    },
    {
      key: "2",
      label: <p onClick={logoutHandler}>Logout</p>,
      danger: true,
    },
  ]
  return (
    <nav style={{ padding: "1rem 2rem" }} className="bgSecColor">
      <div className="flexContainer">
        <div className="flexContainer">
          <Link to="/" className="navLink">
            Todo App
          </Link>
        </div>
        {localAuth?.name ? (
          <div className="flexContainer cursor-pointer">
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <Flex>
                <p className="userText">
                  <UserOutlined />
                  {localAuth?.name.split(" ")[0]}
                </p>
                <DownOutlined style={{ color: "white" }} />
              </Flex>
            </Dropdown>
          </div>
        ) : (
          <Space>
            <Button onClick={() => navigate("/login")}>Login </Button>
            <Button type="primary" onClick={() => navigate("/register")}>
              Sign Up
            </Button>
          </Space>
        )}
      </div>
    </nav>
  )
}

export default Header
