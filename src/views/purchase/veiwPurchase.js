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
import Select from "react-select";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ViewPurchase = () => {
  const [showSubmitLoader, setShowSubmitLoader] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [errorText, setErrorText] = useState(null);
  const [billImage, setBillImage] = useState("");
  const [initialTasks, setInitialTask] = useState({
    sellerName: "",
    sellerContact: [],
    purchaseDescription: "",
    billAmount: "",
    paidAmount: "",
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
      const { data } = await axios.get(`${API_URL}/purchases/${_id}`, {
        headers: {
          Authorization: token,
        },
      });

      setInitialTask(data);
      setBillImage(data?.billImage);
    } catch (e) {
      console.log(e);
    }
  };

  // const onSubmit = async (value) => {
  //   try {
  //     const token = `Bearer ${localStorage.getItem(TOKEN_KEY)}`;
  //     await axios.put(`${API_URL}/products/${_id}`, value, {
  //       headers: {
  //         Authorization: token,
  //       },
  //     });
  //     history.push("/Products");
  //     toast("Update Successfully");
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  if (showLoader) return <Loader />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>View Product</CardTitle>
      </CardHeader>
      <hr />
      <CardBody>
        <Formik
          enableReinitialize={true}
          initialValues={initialTasks}
          validationSchema={Yup.object().shape({
            sellerName: Yup.string().required(),
            sellerContact: Yup.string().required(),
            purchaseDescription: Yup.string().required(),
            billAmount: Yup.string().required(),
            paidAmount: Yup.string().required(),
          })}
          // onSubmit={(values) => {
          //   onSubmit(values);
          // }}
        >
          {(props) => {
            const {
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
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
                      <span>Seller Name</span>
                    </Col>
                    <Col md="5">
                      <Input value={values.sellerName} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Seller Contact No.</span>
                    </Col>
                    <Col md="5">
                      <FieldArray name="storeMobile">
                        {(fieldArrayProps) => {
                          const { push, remove, form } = fieldArrayProps;
                          return (
                            <>
                              <Row>
                                {values.sellerContact.map((element, index) => (
                                  <Fragment key={index}>
                                    <Col md="5" className="text-center">
                                      <FormGroup>
                                        <Input value={element} />
                                      </FormGroup>
                                    </Col>
                                    <Col md="3">
                                      <Button
                                        outline
                                        style={{ color: "red" }}
                                        onClick={() => remove(index)}
                                      >
                                        Remove
                                      </Button>
                                    </Col>
                                  </Fragment>
                                ))}
                                <Col md="12">
                                  <Button
                                    style={{ color: "green" }}
                                    outline
                                    onClick={() => push()}
                                  >
                                    Add
                                  </Button>
                                </Col>
                              </Row>
                            </>
                          );
                        }}
                      </FieldArray>
                      {touched.storeMobile && errors.storeMobile && (
                        <div className="invalid-feedback">
                          {errors.storeMobile}
                        </div>
                      )}
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Purchase Detail</span>
                    </Col>
                    <Col md="5">
                      <Input
                        type="textarea"
                        value={values.purchaseDescription}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Bill Amount</span>
                    </Col>
                    <Col md="5">
                      <Input value={values.billAmount} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Paid Amount</span>
                    </Col>
                    <Col md="5">
                      <Input value={values.paidAmount} />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Bill Image</span>
                    </Col>
                    <Col md="5">
                      <img
                        style={{ width: 100, height: 100 }}
                        src={values.billImage}
                      />
                    </Col>
                  </FormGroup>
                  <Row>
                    <Col md="3"></Col>
                    <Col md="5">
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

export default ViewPurchase;
