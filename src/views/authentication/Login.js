import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { useDispatch } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  UncontrolledAlert,
  Spinner,
} from "reactstrap";
import { Mail, Lock } from "react-feather";
// import Checkbox from "./../../components/checkbox/CheckboxesVuexy";

import loginImg from "./../../assets/img/login.png";
import "./../../assets/scss/pages/authentication.scss";
import { TOKEN_KEY, R_TOKEN } from "./../../configs/constant";
import { Formik } from "formik";
import * as Yup from "yup";
import { AuthService } from "./../../services/api.service";
import { history } from "../../history";
// import { data } from "jquery";
// import { axios } from "axios";
import { toast } from "react-toastify";

const Login = (props) => {
  const dispatch = useDispatch();
  
  const [errorText, setErrorText] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const login = async (values) => {
    setErrorText(null);
    setShowLoader(true);
    try {
      const { token, userInfo } = await AuthService.login({
        email: values.email,
        password: values.password,
      });
      
      localStorage.setItem("userId", userInfo._id)
      localStorage.setItem(TOKEN_KEY, token.token);
      console.log("token", token.token);
      localStorage.setItem(R_TOKEN, token.refreshToken)
      console.log(R_TOKEN, token.refreshToken)
      dispatch({
        type: "SET_AUTH",
        payload: userInfo,
      });
      history.push("/");
      toast(`${userInfo.firstName} Login Successfully`);

    } catch (error) {
      // setErrorText(error.message);
      toast.error(error.message)
      console.log("error message",error)
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <Row className="m-0 justify-content-center">
      <Col
        sm="8"
        xl="7"
        lg="10"
        md="8"
        className="d-flex justify-content-center"
      >
        <Card className="bg-authentication login-card rounded-0 mb-0 w-100">
          <Row className="m-0">
            <Col
              lg="6"
              className="d-lg-block d-none text-center align-self-center px-1 py-0"
            >
              <img src={loginImg} alt="loginImg" />
            </Col>
            <Col lg="6" md="12" className="p-0">
              <Card className="rounded-0 mb-0 px-2">
                <CardBody className="mt-5 mb-5">
                  <h4>Login</h4>
                  <p>Welcome back, please login to your account.</p>
                  <Formik
                    initialValues={{ email: "", password: "" }}
                    onSubmit={async (values) => {
                      login(values);
                    }}
                    validationSchema={Yup.object().shape({
                      email: Yup.string()
                        .required("Enter email")
                        .email("Enter valid email"),
                      password: Yup.string().required("Enter Password"),
                    })}
                  >
                    {(props) => {
                      const {
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                      } = props;
                      return (
                        <>
                          {errorText && (
                            <UncontrolledAlert color="danger">
                              {errorText}
                            </UncontrolledAlert>
                          )}
                          <Form onSubmit={handleSubmit}>
                            <Label>Email *</Label>
                            <FormGroup className="position-relative has-icon-left">
                              <Input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`form-control ${
                                  touched.email && errors.email
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                              {touched.email && errors.email && (
                                <div className="invalid-feedback">
                                  {errors.email}
                                </div>
                              )}
                              <div className="form-control-position">
                                <Mail size={15} />
                              </div>
                            </FormGroup>
                            <Label>Password *</Label>
                            <FormGroup className="has-icon-left position-relative">
                              <Input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`${
                                  touched.password && errors.password
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                              <div className="form-control-position">
                                <Lock size={15} />
                              </div>
                              {touched.password && errors.password && (
                                <div className="invalid-feedback">
                                  {errors.password}
                                </div>
                              )}
                            </FormGroup>
                            <FormGroup className="d-flex justify-content-between align-items-center">
                              {/* <Checkbox
                                color="primary"
                                icon={<Check className="vx-icon" size={16} />}
                                label="Remember me"
                              /> */}
                              <NavLink
                                to="/forgot-password"
                                className="float-right text-primary"
                              >
                                Forgot Password?
                              </NavLink>
                            </FormGroup>
                            <div className="d-flex justify-content-center">
                              <Button
                                className="block"
                                color="primary"
                                type="submit"
                                disabled={showLoader}
                              >
                                {showLoader ? (
                                  <>
                                    <Spinner
                                      color="white"
                                      size="sm"
                                      type="grow"
                                    />
                                    <span className="ml-50">Loading...</span>
                                  </>
                                ) : (
                                  "Login"
                                )}
                              </Button>
                            </div>
                            <br />
                            <div className="d-flex justify-content-center">
                              <Button
                                className="block"
                                color="primary"
                                onClick={() =>
                                  history.push("/authentication/reg")
                                }
                                // disabled={showLoader}
                              >
                                Register
                              </Button>
                            </div>
                          </Form>
                        </>
                      );
                    }}
                  </Formik>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};
export default Login;
