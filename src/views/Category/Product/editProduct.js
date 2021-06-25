import React from "react";
import { useHistory } from "react-router-dom";
import { useState, useEffect, Fragment, useRef } from "react";
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

const EditProduct = () => {
  const [showSubmitLoader, setShowSubmitLoader] = useState(false);
  const [productImage, setProductImage] = useState("");
  const [removedImage, setRemovedImage] = useState(false);
  const fileUploader = useRef(null);
  const [showLoader, setShowLoader] = useState(false);
  const [errorText, setErrorText] = useState(null);
  const [storeLocations, setStoreLocations] = useState([]);
  const [initialTasks, setInitialTask] = useState({
    productName: "",
    brandName: "",
    productPrice: "",
    discountPrice: "",
    stockByStore: [],
  });

  useEffect(() => {
    loadData();
    loadStoreData();
  }, []);

  const { _id } = useParams();
  let history = useHistory();
  console.log("id", _id);

  const loadStoreData = async () => {
    try {
      const token = `Bearer ${localStorage.getItem(TOKEN_KEY)}`;
      const { data } = await axios.get(`${API_URL}/stores`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(data);
      data.map((ele) => {
        return (ele.value = ele._id), (ele.label = ele.storeAddress);
      });

      setStoreLocations(data);
      console.log("data.data", data);
    } catch (e) {
      console.log(e);
    }
  };

  const loadData = async () => {
    try {
      const token = `Bearer ${localStorage.getItem(TOKEN_KEY)}`;
      const { data } = await axios.get(`${API_URL}/products/${_id}`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(data);
      data.value = data.stockByStore;
      setInitialTask(data);
      setProductImage(data?.productImage);
      console.log("data.data", data);
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = async (value) => {
    try {
      const token = `Bearer ${localStorage.getItem(TOKEN_KEY)}`;
      await axios.put(`${API_URL}/products/${_id}`, value, {
        headers: {
          Authorization: token,
        },
      });
      history.push("/Products");
      toast("Update Successfully");
    } catch (e) {
      console.log(e);
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
        setProductImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onRemoveFile = () => {
    setProductImage(null);
    setRemovedImage(true);
  };

  if (showLoader) return <Loader />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Product</CardTitle>
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
            stockByStore: Yup.string().required(),
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
                      <span>Product Name</span>
                    </Col>
                    <Col md="5">
                      <Input
                        type="text"
                        name="productName"
                        placeholder="Enter Product Name"
                        value={values.productName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${
                          touched.productName && errors.productName
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {touched.productName && errors.productName && (
                        <div className="invalid-feedback">
                          {errors.productName}
                        </div>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Brand Name</span>
                    </Col>
                    <Col md="5">
                      <Input
                        type="text"
                        name="brandName"
                        placeholder="Enter Store Manager Name"
                        value={values.brandName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${
                          touched.brandName && errors.brandName
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {touched.brandName && errors.brandName && (
                        <div className="invalid-feedback">
                          {errors.brandName}
                        </div>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Product Price</span>
                    </Col>
                    <Col md="5">
                      <Input
                        type="number"
                        name="productPrice"
                        placeholder="Enter Product Price"
                        value={values.productPrice}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${
                          touched.productPrice && errors.productPrice
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {touched.productPrice && errors.productPrice && (
                        <div className="invalid-feedback">
                          {errors.productPrice}
                        </div>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Discount Price</span>
                    </Col>
                    <Col md="5">
                      <Input
                        type="number"
                        name="discountPrice"
                        placeholder="Enter Discount Price"
                        value={values.discountPrice}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${
                          touched.discountPrice && errors.discountPrice
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {touched.discountPrice && errors.discountPrice && (
                        <div className="invalid-feedback">
                          {errors.discountPrice}
                        </div>
                      )}
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
                                {values.stockByStore.map((element, index) => {
                                  return (
                                    <Fragment key={index}>
                                      <Col md="4" className="text-center">
                                        <FormGroup>
                                          <span>Location</span>
                                          <Select
                                            options={storeLocations}
                                            value={storeLocations.find(
                                              (e) =>
                                                element.storeId ===
                                                e._id
                                            )}
                                            onChange={(e) =>
                                              setFieldValue(
                                                `stockByStore[${index}].storeId`,
                                                e?.value
                                              )
                                            }
                                          />
                                        </FormGroup>
                                      </Col>

                                      <Col md="4" className="text-center">
                                        <span>Quantity</span>
                                        <Input
                                          type="number"
                                          value={element?.stock}
                                          name={`stockByStore[${index}].stock`}
                                          onChange={handleChange}
                                        />
                                      </Col>

                                      <Col md="3">
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
                                  );
                                })}
                                <Col md="12">
                                  <Button
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
                      <span>Upload Product</span>
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
                      {productImage && (
                        <aside className="thumb-container">
                          <div className="dz-thumb">
                            <div className="dz-thumb-inner">
                              <img
                                height="100"
                                width="100"
                                src={productImage}
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
                          "Edit Product"
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

export default EditProduct;
