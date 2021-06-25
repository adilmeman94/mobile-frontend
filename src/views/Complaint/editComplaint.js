import React from "react";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Loader from "../../components/Loader";
import { API_URL } from "../../configs/constant";
import { TOKEN_KEY } from "../../configs/constant";
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
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditComplaint = () => {
  const [showSubmitLoader, setShowSubmitLoader] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [errorText, setErrorText] = useState(null);
  const [initialTasks, setInitialTask] = useState({
    customerName: "",
    customerMobile: "",
    issueDetail: "",
    complaintDate: "",
    storeStatus: [{name:"true"}, {name:"false"}],
  });

  useEffect(() => {
    loadData();
  }, []);

  const { _id } = useParams();
  let history = useHistory();
  console.log("id", _id);

  const loadData = async () => {
    try {
      const token = `Bearer ${localStorage.getItem(TOKEN_KEY)}`;
      const { data } = await axios.get(`${API_URL}/complaints/${_id}`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(data);
      setInitialTask(data);
      console.log("data", data);
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = async (value) => {
       
    try {
      const token = `Bearer ${localStorage.getItem(TOKEN_KEY)}`;
      await axios.put(`${API_URL}/complaints/${_id}`, value, {
        headers: {
          Authorization: token,
        },
      });
      history.push("/Complaints");
      toast("Update Successfully");
    } catch (e) {
      console.log(e);
    }
  };

  if (showLoader) return <Loader />;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Complaint</CardTitle>
      </CardHeader>
      <hr />
      <CardBody>
        <Formik
          enableReinitialize={true}
          initialValues={initialTasks}
          validationSchema={Yup.object().shape({
            customerName: Yup.string().required(),
            customerMobile: Yup.string().required(),
            issueDetail: Yup.string().required(),
            complaintDate: Yup.date().required(),
            complaintStatus: Yup.string().required(),
          })}
          onSubmit={(values) => {
            onSubmit(values);
          }}
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
                      <span>Customer Mobile</span>
                    </Col>
                    <Col md="5">
                      <Input
                        type="number"
                        name="customerMobile"
                        placeholder="Enter Customer Mobile No"
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
                        placeholder="Enter Customer Issue"
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
                    <Col md="2">
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
                        <option value={true}>Solved</option>
                        <option value={false}>Pending</option>
                        {touched.complaintStatus && errors.complaintStatus && (
                          <div className="invalid-feedback">
                            {errors.complaintStatus}
                          </div>
                        )}
                      </Input>
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
                          "Edit Complaint"
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

export default EditComplaint;
