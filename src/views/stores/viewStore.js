import React from "react";
import { useHistory } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Loader from "../../components/Loader";
import { API_URL } from "../../configs/constant";
import { TOKEN_KEY, R_TOKEN } from "../../configs/constant";
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
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditStore = () => {
  const [showSubmitLoader, setShowSubmitLoader] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [errorText, setErrorText] = useState(null);
  const [initialTasks, setInitialTask] = useState({
    storeName: "",
    storeManagerName: "",
    storeLogo: "",
    storeAddress: "",
    storeMobile: [],
    storeStatus: [{ name: "Active" }, { name: "NonActive" }],
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
      const { data } = await axios.get(`${API_URL}/stores/${_id}`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(data);
      setInitialTask(data);
      console.log("data.data", data);
    } catch (e) {
      console.log(e);
    }
  };

  //   const onSubmit = async (value) => {
  //     try {
  //       const token = `Bearer ${localStorage.getItem(TOKEN_KEY)}`;
  //       await axios.put(`${API_URL}/stores/${_id}`, value,{
  //         headers: {
  //           Authorization: token,
  //         },
  //       });
  //       history.push("/Store");
  //       toast("Update Successfully")
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  if (showLoader) return <Loader />;
  console.log("storeMobile", initialTasks.storeMobile);
  return (
    <Card>
      <CardHeader>
        <CardTitle>View Store</CardTitle>
      </CardHeader>
      <hr />
      <CardBody>
        <Formik
          enableReinitialize={true}
          initialValues={initialTasks}
          validationSchema={Yup.object().shape({
            storeName: Yup.string().required(),
            storeManagerName: Yup.string().required(),
            storeAddress: Yup.string().required(),
            // storeMobile: Yup.string().required(),
            storeStatus: Yup.string().required(),
          })}
          onSubmit={(values) => {
            loadData(values);
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
                      <span>Store Name</span>
                    </Col>
                    <Col md="5">
                      <Input value={values.storeName} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Store Manager</span>
                    </Col>
                    <Col md="5">
                      <Input value={values.storeManagerName} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Address</span>
                    </Col>
                    <Col md="5">
                      <Input value={values.storeAddress} />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Store Status</span>
                    </Col>
                    <Col md="2">
                      <Input style={values.storeStatus === "true" ? {color : "green"} : {color : "red"}} value={values.storeStatus === "true" ? "Active" : "Not Active"}/>
                      
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Phone Numbers</span>
                    </Col>
                    <Col md="5">
                      <FieldArray name="storeMobile">
                        {(fieldArrayProps) => {
                          const { push, remove, form } = fieldArrayProps;
                          return (
                            <>
                              <Row>
                                {values.storeMobile.map((element, index) => (
                                  <Fragment key={index}>
                                    <Col md="5" className="text-center">
                                      <FormGroup>
                                        <Input
                                          type="number"
                                          name={`storeMobile[${index}]`}
                                          value={element}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Col>
                                    <Col md="3">
                                      {/* {index > 1 && ( */}
                                      {/* <Button
                                        outline
                                        style={{ color: "red" }}
                                        onClick={() => remove(index)}
                                      >
                                        Remove
                                      </Button> */}
                                      {/* )} */}
                                    </Col>
                                  </Fragment>
                                ))}
                                <Col md="12">
                                  {/* <Button
                                    style={{ color: "green" }}
                                    outline
                                    onClick={() => push()}
                                  >
                                    Add
                                  </Button> */}
                                </Col>
                              </Row>
                            </>
                          );
                        }}
                      </FieldArray>
                    </Col>
                  </FormGroup>
                  <Row>
                    <Col md="3"></Col>
                    <Col md="5">
                      <Button
                        color="primary"
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

export default EditStore;
