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
  CustomInput,
} from "reactstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import Loader from "../../components/Loader";
import { useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";
import { API_URL, TOKEN_KEY } from "../../configs/constant";
import { toast } from 'react-toastify';

const EditProfile = (props) => {
  const [showSubmitLoader, setShowSubmitLoader] = useState(false);
  const { history, match } = props;
  const [errorText, setErrorText] = useState(null);
  const fileUploader = useRef(null);
  const [showLoader, setShowLoader] = useState(false);
  const currentUser = useSelector((state) => state.auth.currentUser);
  currentUser.dob = moment(new Date(currentUser.dob)).format("YYYY-MM-DD");
  const [formValues, setFormValues] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    phoneNumber: currentUser.phoneNumber,
    dob: currentUser.dob,
    gender: currentUser.gender,
    image: currentUser.image,
  });

  const { id: editId } = match.params;
  console.log("match", editId);
  // console.log(formValues.image)

  useEffect(() => {
    
  }, []);

  const onSubmit = async (values) => {
    const token = `Bearer ${localStorage.getItem(TOKEN_KEY)}`;
    // console.log("Submit Calling");
    console.log("values", values);
    try {
      const value = { ...values};
      console.log("values:", value);
      // console.log("values after change:", value);
      await axios.put(`${API_URL}/users/updateProfile`, value, {
        headers: {
          Authorization: token,
        },
      });
      history.push("/");
      toast.success("Profile Updated")
    } catch (ex) {
      console.log(ex);
      toast.error(ex)
    }
  };

  if (showLoader) return <Loader />;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Your Details</CardTitle>
      </CardHeader>
      <hr />
      <CardBody>
        <Formik
          enableReinitialize={true}
          initialValues={formValues}
          onSubmit={async (values) => {
            onSubmit(values);
          }}
          validationSchema={Yup.object().shape({
            firstName: Yup.string().required(),
            lastName: Yup.string().required(),
            email: Yup.string().required().email(),
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
            // console.log(errors);
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
                      <span>First Name</span>
                    </Col>
                    <Col md="5">
                      <Input
                        type="text"
                        name="firstName"
                        value={values.firstName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${
                          touched.firstName && errors.firstName
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {touched.firstName && errors.firstName && (
                        <div className="invalid-feedback">
                          {errors.firstName}
                        </div>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Last Name</span>
                    </Col>
                    <Col md="5">
                      <Input
                        type="text"
                        name="lastName"
                        value={values.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${
                          touched.lastName && errors.lastName
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {touched.lastName && errors.lastName && (
                        <div className="invalid-feedback">
                          {errors.lastName}
                        </div>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>E-Mail</span>
                    </Col>
                    <Col md="5">
                      <Input
                        type="text"
                        name="email"
                        placeholder="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${
                          touched.email && errors.email ? "is-invalid" : ""
                        }`}
                      />
                      {touched.email && errors.email && (
                        <div className="invalid-feedback">{errors.email}</div>
                      )}
                    </Col>
                  </FormGroup>
                  <hr />
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
                          "Update"
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

export default EditProfile;
