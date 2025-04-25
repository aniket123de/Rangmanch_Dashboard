import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined, GoogleOutlined } from "@ant-design/icons";
import { useAuth } from "../contexts/AuthContext";

interface SignInProps {}

const SignIn: React.FC<SignInProps> = () => {
  const [loading, setLoading] = useState(false);
  const { signIn, signInWithGoogle } = useAuth();
  const history = useHistory();

  const onFinish = async (values: { username: string; password: string }) => {
    try {
      setLoading(true);
      await signIn(values.username, values.password);
      message.success("Successfully signed in!");
      history.push("/");
    } catch (error: any) {
      message.error(error.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      message.success("Successfully signed in with Google!");
      history.push("/");
    } catch (error: any) {
      message.error(error.message || "Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-in-page">
      <div className="sign-in-box">
        <h2>Sign In</h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              type="email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Button type="link" onClick={() => {}}>
              Forgot password
            </Button>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
            >
              Log in
            </Button>
            <Button
              icon={<GoogleOutlined />}
              onClick={handleGoogleSignIn}
              className="login-form-button"
              style={{ marginTop: 10 }}
              loading={loading}
            >
              Sign in with Google
            </Button>
            Or <Button type="link" onClick={() => history.push("/signup")}>register now!</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignIn; 