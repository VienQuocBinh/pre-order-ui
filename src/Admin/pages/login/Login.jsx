import React, { useState, useEffect } from "react";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import useLogin from "../../hooks/auth/useLogin";
import useUserContext from "../../hooks/useUserContext";
import useAuthContext from "../../hooks/useAuthContext";
import { useToast } from "@chakra-ui/react";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "string@gmail.com",
    password: "string",
  });
  const navigate = useNavigate();
  const {login} = useLogin();
  const toast = useToast();
  const { SetUser, SetAccessToken, SetRefreshToken, accessToken } =
    useUserContext();
  const { user: FbUser, loading } = useAuthContext();

  useEffect(() => {
    if (FbUser) {
      navigate("/home");
    }
  }, [FbUser, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // You can add your login logic here, such as sending the data to the server.
    console.log("Form data:", formData);
    try {
      const res = await login(formData.email,formData.password);
      console.log("Login user response:", res.data.data);
      if(res.data.status.success === true){
        SetUser(res.data.data); // Extracting the "data" object and updating state
        toast({
          title: "Đăng nhập thành công!",
          status: "success",
          position: "top-right",
          isClosable: true,
          duration: 1000,
        });
        navigate("/home");
      }else{
        toast({
          title: "Đăng nhập thất bại",
          status: "error",
          position: "top-right",
          isClosable: true,
          duration: 1000,
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
          title: "Đăng nhập thất bại",
          status: "error",
          position: "top-right",
          isClosable: true,
          duration: 1000,
        });
    }
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
