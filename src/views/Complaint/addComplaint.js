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

import moment from "moment";
import axios from "axios";
import { toast } from "react-toastify";
import { ComplaintService } from "../../services/api.service";

const AddPhone = (props) => {
  const [showSubmitLoader, setShowSubmitLoader] = useState(false);
  const { history, match } = props;
  const [errorText, setErrorText] = useState(null);
  const fileUploader = useRef(null);
  const [showLoader, setShowLoader] = useState(false);
  const [formValues, setFormValues] = useState({
    customerName: "",
    customerMobile: "",
    issueDetail: "",
    complaintDate: "",
    complaintStatus: [{ name: "true" }, { name: "false" }],
  });

  const onSubmit = async (values) => {
    setErrorText(null);
    setShowLoader(true);
    console.log(values);
    try {
      const value = { ...values };
      const response = await ComplaintService.addComplaint(value);
      console.log(response);
      history.push("/Complaints");
      toast.success(`${value.customerName} Added Successfully Successfully`);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setShowLoader(false);
    }
  };

  if (showLoader) return <Loader />;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Complaint</CardTitle>
      </CardHeader>
      <hr />
      <CardBody>
        <Formik
          initialValues={formValues}
          onSubmit={async (values) => {
            onSubmit(values);
          }}
          validationSchema={Yup.object().shape({
            customerName: Yup.string().required(),
            customerMobile: Yup.string().required(),
            issueDetail: Yup.string().required(),
            complaintDate: Yup.date().required(),
            complaintStatus: Yup.string().required(),
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
                      <span>Customer Name</span>
                    </Col>
                    <Col md="5">
                      <Input
                        type="text"
                        name="customerName"
                        placeholder="Enter Customer Name"
                        value={values.customerName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${
                          touched.customerName && errors.customerName
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {touched.customerName && errors.customerName && (
                        <div className="invalid-feedback">
                          {errors.customerName}
                        </div>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Mobile Number</span>
                    </Col>
                    <Col md="5">
                      <Input
                        type="number"
                        name="customerMobile"
                        placeholder="Enter Customer Phone Number"
                        value={values.customerMobile}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${
                          touched.customerMobile && errors.customerMobile
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {touched.customerMobile && errors.customerMobile && (
                        <div className="invalid-feedback">
                          {errors.customerMobile}
                        </div>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Issue Details</span>
                    </Col>
                    <Col md="5">
                      <Input
                        type="textarea"
                        name="issueDetail"
                        placeholder="Enter Issue"
                        value={values.issueDetail}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${
                          touched.issueDetail && errors.issueDetail
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {touched.issueDetail && errors.issueDetail && (
                        <div className="invalid-feedback">
                          {errors.issueDetail}
                        </div>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Complaint Date</span>
                    </Col>
                    <Col md="5">
                      <Input
                        type="date"
                        name="complaintDate"
                        placeholder=""
                        value={values.complaintDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${
                          touched.complaintDate && errors.complaintDate
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {touched.complaintDate && errors.complaintDate && (
                        <div className="invalid-feedback">
                          {errors.complaintDate}
                        </div>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Complaint Status</span>
                    </Col>
                    <Col md="5">
                      <Input
                        type="select"
                        name="complaintStatus"
                        value={values.complaintStatus}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${
                          touched.complaintStatus && errors.complaintStatus
                            ? "is-invalid"
                            : ""
                        }`}
                      >
                        <option value="">Complaint Status</option>
                        {formValues.complaintStatus.map((option, index) => (
                          <option key={index} value={option.name}>
                            {option.name === "true" ? "Solved" : "Pending"}
                          </option>
                        ))}

                        {touched.complaintStatus && errors.complaintStatus && (
                          <div className="invalid-feedback">
                            {errors.complaintStatus}
                          </div>
                        )}
                      </Input>
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
                          "Submit"
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

export default AddPhone;
