import React from "react";
import { useHistory } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Loader from "../../../components/Loader";
import { API_URL } from "../../../configs/constant";
import { TOKEN_KEY } from "../../../configs/constant";
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

const ViewProduct = () => {
  const [showSubmitLoader, setShowSubmitLoader] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [errorText, setErrorText] = useState(null);
  const [productImage, setProductImage] = useState("");
  const [initialTasks, setInitialTask] = useState({
    productName: "",
    brandName: "",
    productPrice: "",
    discountPrice: "",
    stockByStore: [],
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
      const { data } = await axios.get(`${API_URL}/products/${_id}`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(data);
      setInitialTask(data);
      setProductImage(data?.productImage);
      console.log("data.data", data);
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
            productName: Yup.string().required(),
            brandName: Yup.string().required(),
            productPrice: Yup.string().required(),
            discountPrice: Yup.number().required(),
            // stockByStore: Yup.string().required(),
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
                      <span>Product Name</span>
                    </Col>
                    <Col md="5">
                      <Input value={values.productName} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Brand Name</span>
                    </Col>
                    <Col md="5">
                      <Input value={values.brandName} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Product Price</span>
                    </Col>
                    <Col md="5">
                      <Input value={values.productPrice} />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Discount Price</span>
                    </Col>
                    <Col md="5">
                      <Input value={values.discountPrice} />
                    </Col>
                  </FormGroup>

                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Store By Stock</span>
                    </Col>
                    <Col md="5">
                      <Row>
                        
                        <FieldArray name="stockByStore">
                          {(fieldArrayProps) => {
                            const { push, remove, form } = fieldArrayProps;
                            return (
                              <>
                                {values.stockByStore.map((element, index) => (
                                  <Fragment key={index}>
                                    <Col md="4" className="text-center">
                                      <FormGroup>
                                        <span>Location</span>
                                        <Input value={element?.storeId} />
                                      </FormGroup>
                                    </Col>
                                    <Col md="4" className="text-center">
                                      <span>Quantity</span>
                                      <Input value={element?.stock} />
                                    </Col>
                                    <Col md="3">
                                      <br />
                                      {index > 0 && (
                                        <Button
                                          disabled
                                          outline
                                          style={{ color: "red" }}
                                          onClick={() => remove(index)}
                                        >
                                          Remove
                                        </Button>
                                      )}
                                    </Col>
                                  </Fragment>
                                ))}
                                <Col md="12">
                                  <Button
                                    disabled
                                    style={{ color: "green" }}
                                    outline
                                    onClick={() => push()}
                                  >
                                    Add
                                  </Button>
                                </Col>
                              </>
                            );
                          }}
                        </FieldArray>
                        {touched.stockByStore && errors.stockByStore && (
                          <div className="invalid-feedback">
                            {errors.stockByStore}
                          </div>
                        )}
                      </Row>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Product Image</span>
                    </Col>
                    <Col md="5">
                      <img
                        style={{ width: 100, height: 100 }}
                        src={values.productImage}
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

export default ViewProduct;
