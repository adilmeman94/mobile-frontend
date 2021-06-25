import React from "react";
import { useHistory } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import { Formik, FieldArray } from "formik";
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
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ViewSales = () => {
  const [showSubmitLoader, setShowSubmitLoader] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [errorText, setErrorText] = useState(null);
  const [initialTasks, setInitialTask] = useState({
    customerName: "",
    customerMobile: "",
    sellDate: "",
    billAmount: "",
    productDetail: [],
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
      const { data } = await axios.get(`${API_URL}/sells/${_id}`, {
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

  if (showLoader) return <Loader />;
  console.log("storeMobile", initialTasks.storeMobile);
  return (
    <Card>
      <CardHeader>
        <CardTitle>View Sales</CardTitle>
      </CardHeader>
      <hr />
      <CardBody>
        <Formik
          enableReinitialize={true}
          initialValues={initialTasks}
          validationSchema={Yup.object().shape({
            customerName: Yup.string().required(),
            customerMobile: Yup.string().required(),
            sellDate: Yup.date().required(),
            billAmount: Yup.string().required(),
            productDetail: Yup.string().required(),
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
                      <span>Customer Name</span>
                    </Col>
                    <Col md="5">
                      <Input value={values.customerName} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Selling Date</span>
                    </Col>
                    <Col md="5">
                      <Input disables type="date" value={values.sellDate} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Customer Mobile No</span>
                    </Col>
                    <Col md="5">
                      <Input value={values.customerMobile} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Prodcut Detail</span>
                    </Col>
                    <Col md="5">
                      <FieldArray name="productDetail">
                        {(fieldArrayProps) => {
                          const { push, remove, form } = fieldArrayProps;
                          return (
                            <>
                              <Row>
                                {values.productDetail.map((element, index) => (
                                  <Fragment key={index}>
                                    <Col md="5" className="text-center">
                                      <FormGroup>
                                        <span>Product Id</span>
                                        <Input
                                          name={`productDetail[${index}].productId`}
                                          value={values.productDetail.map(
                                            (obj) => {
                                              return obj.productId;
                                            }
                                          )}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                      <FormGroup>
                                      <span>Product Qty</span>
                                        <Input
                                          name={`productDetail[${index}].productQty`}
                                          value={values.productDetail.map(
                                            (obj) => {
                                              return obj.productQty;
                                            }
                                          )}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                      <FormGroup>
                                        <span>Total Price</span>
                                        <Input
                                          name={`productDetail[${index}].productTotalPrice`}
                                          value={values.productDetail.map(
                                            (obj) => {
                                              return obj.productTotalPrice;
                                            }
                                          )}
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

export default ViewSales;
