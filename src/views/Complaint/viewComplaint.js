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
  CustomInput,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import { useParams } from "react-router-dom";

const EditStore = () => {
  const [showSubmitLoader, setShowSubmitLoader] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [errorText, setErrorText] = useState(null);
  const [initialTasks, setInitialTask] = useState({
    customerName: "",
    customerMobile: "",
    issueDetail: "",
    complaintDate: "",
    complaintStatus: [{ name: "true" }, { name: "false" }],
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

  if (showLoader) return <Loader />;
  return (
    <Card>
      <CardHeader>
        <CardTitle>View Complaint</CardTitle>
      </CardHeader>
      <hr />
      <CardBody>
        <Formik
          initialValues={initialTasks}
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
                      <Input value={initialTasks.customerName} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Customer Mobile No</span>
                    </Col>
                    <Col md="5">
                      <Input value={initialTasks.customerMobile} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Issue Details</span>
                    </Col>
                    <Col md="5">
                      <Input value={initialTasks.issueDetail} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Complaint Date</span>
                    </Col>
                    <Col md="5">
                      <Input value={initialTasks.complaintDate} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Complaint Status</span>
                    </Col>
                    <Col md="2">
                    <Input style={values.storeStatus === "true" ? {color : "green"} : {color : "red"}} value={values.storeStatus === "true" ? "Solved" : "Pending"}/>
                    </Col>
                  </FormGroup>
                  <Row>
                    <Col md="3"></Col>
                    <Col md="5">
                      <Button color="primary" onClick={() => history.goBack()}>
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

export default EditStore;
