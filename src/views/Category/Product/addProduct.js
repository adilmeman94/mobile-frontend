import React, { Fragment, useEffect, useState, useRef } from "react";
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
import { toast } from "react-toastify";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import Loader from "../../../components/Loader";
import {
  CategoryService,
  ProductService,
  StoreService,
} from "../../../services/api.service";
import { useParams } from "react-router-dom";

const AddProduct = (props) => {
  const [showSubmitLoader, setShowSubmitLoader] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [cateList, setCateList] = useState([]);
  const [subCateList, setSubCateList] = useState([]);
  const { history, match } = props;
  const [errorText, setErrorText] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  // const { _id } = useParams();
  const [formValues, setFormValues] = useState({
    category_id: "",
    subCategory_id: "",
    productName: "",
    brandName: "",
    productPrice: "",
    discountPrice: "",
    stockByStore: [],
  });
  const [productImage, setProductImage] = useState("");
  const [removedImage, setRemovedImage] = useState(false);
  const fileUploader = useRef(null);

  useEffect(() => {
    getStoreList();
    categoriesList();
  }, []);

  const categoriesList = async (parenId = null) => {
    // setShowLoader(true);
    try {
      const cdata = await CategoryService.getCategoryList(parenId);
      if (parenId) {
        setSubCateList(
          cdata.map((obj) => {
            return { value: obj._id, label: obj.name, ...obj };
          })
        );
      } else {
        setCateList(
          cdata.map((ele) => {
            return { value: ele._id, label: ele.name, ...ele };
          })
        );
      }
      console.log("Category _id", cdata);
    } catch (ex) {
      console.log(ex);
    } finally {
      setShowLoader(false);
    }
  };

  const getStoreList = async () => {
    // setShowLoader(true);
    try {
      const data = await StoreService.getstoreLists();
      setDataList(
        data.map((obj) => {
          return { value: obj._id, label: obj.storeAddress, ...obj };
        })
      );
      // console.log(dataList);
    } catch (ex) {
      toast.error(ex)
    } finally {
      setShowLoader(false);
    }
  };

  const onSubmit = async (values) => {
    setErrorText(null);
    setShowLoader(true);
    console.log(values);
    try {
      const value = { ...values, productImage };
      const response = await ProductService.addProduct(value);
      console.log(response);
      setFormValues(response)
      toast.success(`${value.productName} :: Added Successfully`);
      history.push("/Products");
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
        setProductImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onRemoveFile = () => {
    setProductImage(null);
    setRemovedImage(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Product</CardTitle>
      </CardHeader>
      <hr />
      <CardBody>
        <Formik
          initialValues={formValues}
          onSubmit={async (values) => {
            onSubmit(values);
          }}
          validationSchema={Yup.object().shape({
            category_id: Yup.string().required(),
            subCategory_id: Yup.string().required(),
            productName: Yup.string().required(),
            brandName: Yup.string().required(),
            productPrice: Yup.string().required(),
            discountPrice: Yup.number().required(),
            stockByStore: Yup.string().required(),
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
            console.log("values error", values);
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
                      <span>Category Name</span>
                    </Col>
                    <Col md="5">
                      <Select
                        options={cateList}
                        onChange={(obj) => {
                          setFieldValue(`category_id`, obj?.value);
                          categoriesList(obj?.value);
                        }
                      }
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>SubCategory Name</span>
                    </Col>
                    <Col md="5">
                      <Select
                        options={subCateList}
                        onChange={(ele) =>
                          setFieldValue(`subCategory_id`, ele?.value)
                        }
                      />
                    </Col>
                  </FormGroup>
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
                        placeholder="Enter Brand Name"
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
                      <span>Product Image</span>
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
                        {/* {JSON.stringify(values.stockByStore)} */}
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

                                        <Select
                                          options={dataList}
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
                          "Add Product"
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

export default AddProduct;
