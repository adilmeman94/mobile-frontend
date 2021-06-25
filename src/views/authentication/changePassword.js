import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  UncontrolledAlert,
  Input,
  Form,
  FormGroup,
  Button,
  Spinner,
  Col,
  Row,
} from "reactstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import Loader from "../../components/Loader";
import { history } from "../../history";
import { AuthService } from "../../services/api.service";
import { useSelector } from "react-redux";
import { TOKEN_KEY, API_URL } from "../../configs/constant";
import { axios } from "axios";
import { toast } from 'react-toastify';

const ChangePassword = (props) => {
  const [formValues, setFormValues] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showLoader, setShowLoader] = useState(false);
  const { history, match } = props;
  const [showSubmitLoader, setShowSubmitLoader] = useState(false);
  const [errorText, setErrorText] = useState(null);

  const onSubmit = async (data) => {
    setShowSubmitLoader(true);
    try {
      await AuthService.changePassword(data);
      history.push("/");
      toast.success("Password Changed")
    } catch (ex) {
      console.log(ex);
      toast.error(ex)
    } finally {
      setShowSubmitLoader(false);
    }
  };

  if (showLoader) return <Loader />;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
      </CardHeader>
      <hr />
      <CardBody>
        <Formik
          initialValues={formValues}
          onSubmit={async (values) => {
            onSubmit(values);
          }}
          validationSchema={Yup.object().shape({
            oldPassword: Yup.string().required(),
            newPassword:Yup.string().required(),
            confirmPassword: Yup.string().oneOf([Yup.ref('newPassword'), null],'Password Doesnt Match').required(),
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
            console.log(errors);
            return (
              <>
                <Row>
                  <Col md="3"></Col>
                  <Col md="5">
                    {errorText && (
                      <UncontrolledAlert color="danger">
                        {errorText}
                      </UncontrolledAlert>
                    )}
                  </Col>
                </Row>
                <Form onSubmit={handleSubmit}>
                <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Old Password *</span>
                    </Col>
                    <Col md="5">
                      <Input
                        type="password"
                        name="oldPassword"
                        placeholder="Enter your New Password"
                        value={values.oldPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${
                          touched.oldPassword && errors.oldPassword
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {touched.oldPassword && errors.oldPassword && (
                        <div className="invalid-feedback">
                          {errors.oldPassword}
                        </div>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>New Password *</span>
                    </Col>
                    <Col md="5">
                      <Input
                        type="password"
                        name="newPassword"
                        placeholder="Enter your New Password"
                        value={values.newPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${
                          touched.newPassword && errors.newPassword
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {touched.newPassword && errors.newPassword && (
                        <div className="invalid-feedback">
                          {errors.newPassword}
                        </div>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Confirm Password *</span>
                    </Col>
                    <Col md="5">
                      <Input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${
                          touched.confirmPassword && errors.confirmPassword
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {touched.confirmPassword && errors.confirmPassword && (
                        <div className="invalid-feedback">
                          {errors.confirmPassword}
                        </div>
                      )}
                    </Col>
                  </FormGroup>
                  <Row>
                    <Col md="3"></Col>
                    <Col md="5">
                      <Button
                        className="mr-3"
                        color="primary"
                        type="submit"
                        disabled={showSubmitLoader}
                      >
                        {showSubmitLoader ? (
                          <>
                            <Spinner color="white" size="sm" type="grow" />
                            <span className="ml-50">Loading...</span>
                          </>
                        ) : (                               
                          "Change"
                        )}
                      </Button>
                      <Button
                        color="secondary"
                        outline
                        onClick={() => history.goBack()}
                      >
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </>
            );
          }}
        </Formik>
      </CardBody>
    </Card>
  );
};

export default ChangePassword;
