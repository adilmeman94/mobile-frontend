import React, { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
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
import { Mail, Lock, Check, Phone, User, Calendar } from "react-feather";
import Checkbox from "./../../components/checkbox/CheckboxesVuexy";
import loginImg from "./../../assets/img/login.png";
import "./../../assets/scss/pages/authentication.scss";
import { TOKEN_KEY } from "./../../configs/constant";
import { Formik } from "formik";
import * as Yup from "yup";
import { history } from "../../history";
import { AuthService } from "./../../services/api.service";
import moment from "moment";
import { toast } from 'react-toastify';

export const Register = (props) => {
  const dispatch = useDispatch();
  const [errorText, setErrorText] = useState(null);
  const [showLoader, setShowLoader] = useState(false);

  const [initvalues, setInitValues] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const register = async (values) => {
    setErrorText(null);
    setShowLoader(true);
    console.log(values);
    try {
      const value = { ...values };
      const response = await AuthService.register(value);
      console.log(response);
      history.push("/login");
      toast(`${value.firstName} Registered Successfully Successfully`);
    } catch (error) {
      // setErrorText(error.message);
      toast.error(error.message);
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
                  <h4>Register</h4>
                  <p>*Welcome Register Here*</p>
                  <Formik
                    initialValues={initvalues}
                    onSubmit={async (values) => {
                      register(values);
                    }}
                    validationSchema={Yup.object().shape({
                      email: Yup.string().required().email(),
                      password: Yup.string().required(),
                      firstName: Yup.string().required(),
                      lastName: Yup.string().required(),
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
                            <FormGroup className="position-relative has-icon-left">
                              <Input
                                type="password"
                                name="password"
                                placeholder="Enter Your Password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`form-control ${
                                  touched.password && errors.password
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                              {touched.password && errors.password && (
                                <div className="invalid-feedback">
                                  {errors.password}
                                </div>
                              )}
                              <div className="form-control-position">
                                <Lock size={15} />
                              </div>
                            </FormGroup>
                            <Label>First Name *</Label>
                            <FormGroup className="position-relative has-icon-left">
                              <Input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`form-control ${
                                  touched.firstName && errors.firstName
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                              <div className="form-control-position">
                                <User size={15} />
                              </div>
                              {touched.firstName && errors.firstName && (
                                <div className="invalid-feedback">
                                  {errors.firstName}
                                </div>
                              )}
                            </FormGroup>
                            <Label>Last Name *</Label>
                            <FormGroup className="position-relative has-icon-left">
                              <Input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={values.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`form-control ${
                                  touched.lastName && errors.lastName
                                    ? "is-invalid"
                                    : ""
                                }`}
                              />
                              <div className="form-control-position">
                                <User size={15} />
                              </div>
                              {touched.lastName && errors.lastName && (
                                <div className="invalid-feedback">
                                  {errors.lastName}
                                </div>
                              )}
                            </FormGroup>
                            <div className="container">
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
                                  "Register"
                                )}
                              </Button>
                              <br />
                              <Button
                                className="block"
                                color="primary"
                                type="submit"
                                onClick={() => history.goBack()}
                              >
                                Back to Login
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
export default Register;
