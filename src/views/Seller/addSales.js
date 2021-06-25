import React, { Fragment, useState, useEffect } from "react";
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
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import Loader from "../../components/Loader";
import Select from "react-select";
import { toast } from "react-toastify";
import {
  ProductService,
  SalesService,
  StoreService,
} from "../../services/api.service";

const AddSales = (props) => {
  const [showSubmitLoader, setShowSubmitLoader] = useState(false);
  const { history, match } = props;
  const [errorText, setErrorText] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [productList, setProductList] = useState([]);
  const [storeIds, setStoreIds] = useState([]);
  const [formValues, setFormValues] = useState({
    storeId:"",
    customerName: "",
    customerMobile: "",
    sellDate: "",
    billAmount: "",
    productDetail: [],
  });

  useEffect(() => {
    getProductLists();
    getStoreList();
  }, []);

  const getProductLists = async () => {
    try {
      const data = await ProductService.getProductList();
      setProductList(
        data.map((ele) => {
          return { value: ele._id, label: ele.productName, ...ele };
        })
      );
         
    } catch (ex) {
      console.log(ex);
    } finally {
      setShowLoader(false);
    }
  };

  const getStoreList = async () => {
    try {
      const storeData = await StoreService.getstoreLists();
      setStoreIds(
        storeData.map((s) => {
          return { value: s._id, label: s.storeAddress, ...s };
        })
      );
      console.log("store", storeData);
    } catch (ex) {
      console.log(ex);
    } finally {
      setShowLoader(false);
    }
  };

  const onSubmit = async (values) => {
    setErrorText(null);
    setShowLoader(true);
    console.log(values);
    try {
      const value = { ...values };
      const response = await SalesService.addSales(value);
      toast.success("Record Added Successfully")
      history.push("/Sales");
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
        <CardTitle>Add Sales</CardTitle>
      </CardHeader>
      <hr />
      <CardBody>
        <Formik
          initialValues={formValues}
          onSubmit={async (values) => {
            onSubmit(values);
          }}
          validationSchema={Yup.object().shape({
            storeId: Yup.string().required(),
            customerName: Yup.string().required(),
            customerMobile: Yup.number().required(),
            productDetail: Yup.string().required(),
            sellDate: Yup.date().required(),
            billAmount: Yup.number().required(),
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
                      <span>Store Location</span>
                    </Col>
                    <Col md="5">
                      <Select name="storeId" options={storeIds}
                      onChange={(e)=>{
                        setFieldValue(`storeId`, e?.value)
                      }} 
                      />
                    </Col>
                  </FormGroup>
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
                                          options={productList}
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
                                          onChange={(e) => {
                                            handleChange(e);
                                            const selectedProduct =
                                              productList.find(
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
                          "Add"
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

export default AddSales;
