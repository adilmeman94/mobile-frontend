import React, { useState, useRef, Fragment } from "react";
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
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { PurchaseService } from "../../services/api.service";

const AddPurchase = (props) => {
  const [billImage, setBillImage] = useState("");
  const [removedImage, setRemovedImage] = useState(false);
  const [showSubmitLoader, setShowSubmitLoader] = useState(false);
  const { history, match } = props;
  const [errorText, setErrorText] = useState(null);
  const fileUploader = useRef(null);
  const [showLoader, setShowLoader] = useState(false);
  const [formValues, setFormValues] = useState({
    sellerName: "",
    sellerContact: [],
    purchaseDescription: "",
    billAmount: "",
    paidAmount: "",
  });


  const onSubmit = async (values) => {
    setErrorText(null);
    setShowLoader(true);
    console.log(values);
    try {
      const value = { ...values, billImage };
      const response = await PurchaseService.addPurchase(value);
      console.log(response);
      history.push("/Purchases");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setShowLoader(false);
    }
  };

  const onFileChange = (event) => {
    event.stopPropagation();
    event.preventDefault();
    const regEx = /(.*?)\.(jpg|jpeg|png)$/;
    for (let file of event.target.files) {
      const fileSize = file.size / (1024 * 1024);
      if (!String(file["name"]).toLowerCase().match(regEx)) continue;
      if (fileSize > 3) continue;
      const reader = new FileReader();
      reader.onload = function (e) {
        setBillImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onRemoveFile = () => {
    setBillImage(null);
    setRemovedImage(true);
  };

  if (showLoader) return <Loader />;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Purchase</CardTitle>
      </CardHeader>
      <hr />
      <CardBody>
        <Formik
          initialValues={formValues}
          onSubmit={async (values) => {
            onSubmit(values);
          }}
          validationSchema={ Yup.object().shape({
            sellerName: Yup.string().required(),
            sellerContact: Yup.string().required(),
            purchaseDescription: Yup.string().required(),
            billAmount: Yup.string().required(),
            paidAmount: Yup.string().required(),
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
                      <span>Seller Name</span>
                    </Col>
                    <Col md="5">
                      <Input
                        type="text"
                        name="sellerName"
                        placeholder="Enter Seller Name"
                        value={values.sellerName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${
                          touched.sellerName && errors.sellerName
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {touched.sellerName && errors.sellerName && (
                        <div className="invalid-feedback">
                          {errors.sellerName}
                        </div>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Seller Phone No.</span>
                    </Col>
                    <Col md="5">
                      <FieldArray name="sellerContact">
                        {(fieldArrayProps) => {
                          const { push, remove, form } = fieldArrayProps;
                          return (
                            <>
                              <Row>
                                {values.sellerContact.map((element, index) => (
                                  <Fragment key={index}>
                                    <Col md="5" className="text-center">
                                      <FormGroup>
                                        <Input
                                          type="number"
                                          name={`sellerContact[${index}]`}
                                          onChange={handleChange}
                                          onBlur={handleBlur}
                                        />
                                      </FormGroup>
                                    </Col>
                                    <Col md="3">
                                      {/* {index > 1 && ( */}
                                      <Button
                                        outline
                                        style={{ color: "red" }}
                                        onClick={() => remove(index)}
                                      >
                                        Remove
                                      </Button>
                                      {/* )} */}
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
                        name="purchaseDescription"
                        placeholder="Purchase Detail"
                        value={values.purchaseDescription}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${
                          touched.purchaseDescription &&
                          errors.purchaseDescription
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {touched.purchaseDescription &&
                        errors.purchaseDescription && (
                          <div className="invalid-feedback">
                            {errors.purchaseDescription}
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
                        placeholder="Bill Amount"
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
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Paid Amount</span>
                    </Col>
                    <Col md="5">
                      <Input
                        type="number"
                        name="paidAmount"
                        placeholder="Paid Amount"
                        value={values.paidAmount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${
                          touched.paidAmount && errors.paidAmount
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {touched.paidAmount && errors.paidAmount && (
                        <div className="invalid-feedback">
                          {errors.paidAmount}
                        </div>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Upload Bill</span>
                    </Col>
                    <Col md="1">
                      <Button
                        color="primary"
                        outline
                        onClick={() => fileUploader.current.click()}
                      >
                        Upload
                      </Button>
                    </Col>
                    <input
                      type="file"
                      onChange={(e) => onFileChange(e)}
                      ref={fileUploader}
                      hidden
                      multiple
                    />
                    <br />
                    <Col md="1">
                      {billImage && (
                        <aside className="thumb-container">
                          <div className="dz-thumb">
                            <div className="dz-thumb-inner">
                              <img
                                height="100"
                                width="100"
                                src={billImage}
                                alt="files"
                                className="img-fluid rounded-sm"
                              />
                              <span
                                className="cursor-pointer"
                                onClick={() => onRemoveFile()}
                              >
                                Remove File
                              </span>
                            </div>
                          </div>
                        </aside>
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

export default AddPurchase;
