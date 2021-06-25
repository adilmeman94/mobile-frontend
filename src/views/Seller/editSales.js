import React from "react";
import { useHistory } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Loader from "../../components/Loader";
import { ProductService } from "../../services/api.service";
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
import Select from "react-select";

const EditSales = () => {
  const [showSubmitLoader, setShowSubmitLoader] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [errorText, setErrorText] = useState(null);
  const [productList, setProductList] = useState([]);
  const [productDataList, setProductDataList] = useState([]);
  const [initialTasks, setInitialTask] = useState({
    customerName: "",
    customerMobile: "",
    sellDate: "",
    billAmount: "",
    productDetail: [],
  });

  useEffect(() => {
    loadData();
    loadProductList();
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
      console.log("data", data);
    } catch (e) {
      console.log(e);
    }
  };

  const loadProductList = async () => {
    try {
      const token = `Bearer ${localStorage.getItem(TOKEN_KEY)}`;
      const{data} = await axios.get(`${API_URL}/products`, {
        headers: {
          Authorization: token,
        },
      });
      console.log("product",data);
      
      data.map((ele)=>{
        return (ele.value = ele._id), (ele.label = ele.productName)
      })
      console.log("append",data)
      setProductDataList(data);
      console.log("data.data", data);
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = async (value) => {
    try {
      const token = `Bearer ${localStorage.getItem(TOKEN_KEY)}`;
      await axios.put(`${API_URL}/sells/${_id}`, value, {
        headers: {
          Authorization: token,
        },
      });
      history.push("/Sales");
      toast("Update Successfully");
    } catch (e) {
      console.log(e);
    }
  };

  // if (showLoader) return <Loader />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Sales</CardTitle>
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
                      <span>Customer Mobile Number</span>
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
                      <span>Product Details</span>
                    </Col>
                    <Col md="5">
                      <Row>
                        <FieldArray name="productDetail">
                          {(fieldArrayProps) => {
                            const { push, remove, form } = fieldArrayProps;
                            return (
                              <>
                                {values.productDetail.map((element, index) => (
                                  <Fragment key={index}>
                                    <Col md="6">
                                      <FormGroup>
                                        <span>Product</span>
                                        <Select
                                          options={productDataList}
                                          value={productDataList.find(
                                            (e) => element.productId === e._id
                                          )}
                                          onChange={(e) =>
                                            setFieldValue(
                                              `productDetail[${index}].productId`,
                                              e?.value
                                            )
                                          }
                                        />
                                      </FormGroup>
                                    </Col>
                                    <Col md="2" className="text-center">
                                      <FormGroup>
                                        <span>Quantity</span>
                                        <Input
                                          type="number"
                                          value={element?.productQty}
                                          onChange={(e) => {
                                            handleChange(e);
                                            const selectedProduct =
                                            productDataList.find(
                                                (o) =>
                                                  o._id === element.productId
                                              );
                                            console.log(selectedProduct);
                                            if (selectedProduct) {
                                              setFieldValue(
                                                `productDetail[${index}].productTotalPrice`,
                                                e.target.value *
                                                  selectedProduct?.productPrice
                                              );
                                            }
                                          }}
                                          name={`productDetail[${index}].productQty`}
                                        />
                                      </FormGroup>
                                    </Col>

                                    <Col md="2" className="text-center">
                                      <FormGroup>
                                        <span>Total</span>
                                        <Input
                                          disabled
                                          name={`productDetail[${index}].productTotalPrice`}
                                          onChange={handleChange}
                                          value={element?.productTotalPrice}
                                        />
                                      </FormGroup>
                                    </Col>

                                    <Col md="2">
                                      <br />
                                      {index > 0 && (
                                        <Button
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
                                    style={{ color: "green" }}
                                    outline
                                    onClick={() =>
                                      push({
                                        productId: "",
                                        productTotalPrice: "",
                                        productQty: 0,
                                      })
                                    }
                                  >
                                    Add
                                  </Button>
                                </Col>
                              </>
                            );
                          }}
                        </FieldArray>
                        {touched.productPurchased &&
                          errors.productPurchased && (
                            <div className="invalid-feedback">
                              {errors.productPurchased}
                            </div>
                          )}
                      </Row>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Date</span>
                    </Col>
                    <Col md="5">
                      <Input
                        type="date"
                        name="sellDate"
                        value={values.sellDate}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${
                          touched.sellDate && errors.sellDate
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {touched.sellDate && errors.sellDate && (
                        <div className="invalid-feedback">
                          {errors.sellDate}
                        </div>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Bill Amount</span>
                    </Col>
                    <Col md="5">
                      <Input
                        type="number"
                        name="billAmount"
                        value={values.billAmount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${
                          touched.billAmount && errors.billAmount
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {touched.billAmount && errors.billAmount && (
                        <div className="invalid-feedback">
                          {errors.billAmount}
                        </div>
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

export default EditSales;
