import React, { useEffect, useState, useRef } from "react";
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
import { Formik } from "formik";
import * as Yup from "yup";
import Loader from "../../../../components/Loader";
import { useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";
import { API_URL, TOKEN_KEY } from "../../../../configs/constant";
import { toast } from 'react-toastify';

const EditPhone = (props) => {
  const [image, setImage] = useState("");
  const [removedImage, setRemovedImage] = useState(false);
  const [showSubmitLoader, setShowSubmitLoader] = useState(false);
  const { history, match } = props;
  const [errorText, setErrorText] = useState(null);
  const fileUploader = useRef(null);
  const [showLoader, setShowLoader] = useState(false);
  const currentUser = useSelector((state) => state.auth.currentUser);
  currentUser.dob = moment(new Date(currentUser.dob)).format("YYYY-MM-DD");
  const [formValues, setFormValues] = useState({
    modelName: "",
    brandName: [{name:"Apple"},{name:"mi"},{name:"oppo"}],
    description: "",
    price: "",
    discountPrice: "",
    stock: "",
  });

  const { id: editId } = match.params;
  console.log("match", editId);
  // console.log(formValues.image)

  useEffect(() => {
    setImage(currentUser?.image);
  }, []);

  const onSubmit = async (values) => {
    const token = `Bearer ${localStorage.getItem(TOKEN_KEY)}`;
    // console.log("Submit Calling");
    console.log("values", values);
    
    try {
      const value = { ...values, image };
      console.log("values:", value);
      // console.log("values after change:", value);
      await axios.put(`${API_URL}/api/user/update-self-profile`, value, {
        headers: {
          Authorization: token,
        },
      });
      history.push("/");
      toast.success("Profile Updated")
    } catch (ex) {
      console.log(ex);
      toast.error(ex)
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
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onRemoveFile = () => {
    setImage(null);
    setRemovedImage(true);
  };

  if (showLoader) return <Loader />;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Phones</CardTitle>
      </CardHeader>
      <hr />
      <CardBody>
        <Formik
          enableReinitialize={true}
          initialValues={formValues}
          onSubmit={async (values) => {
            onSubmit(values);
          }}
          validationSchema={Yup.object().shape({
            modelName: Yup.string().required(),
            brandName: Yup.string().required(),
            Description: Yup.string().required(),
            price: Yup.string().required(),
            discountPrice: Yup.string().required(),
            stock: Yup.string().required(),
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
            // console.log(errors);
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
                      <span>Model Name</span>
                    </Col>
                    <Col md="5">
                      <Input
                        type="text"
                        name="modelName"
                        value={values.modelName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${
                          touched.modelName && errors.modelName
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {touched.modelName && errors.modelName && (
                        <div className="invalid-feedback">
                          {errors.modelName}
                        </div>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Brand Name</span>
                    </Col>
                    <Col md="2">
                      <Input
                        type="select"
                        name="brandName"
                        placeholder="brandName"
                        value={values.brandName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${
                          touched.brandName && errors.brandName ? "is-invalid" : ""
                        }`}
                      >
                        <option>Apple</option>
                        <option>Mi</option>
                        <option>Vivo</option>
                        <option>Oppo</option>
                        {touched.brandName && errors.brandName && (
                          <div className="invalid-feedback">
                            {errors.brandName}
                          </div>
                        )}
                      </Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>description</span>
                    </Col>
                    <Col md="5">
                      <Input
                        type="textarea"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${
                          touched.description && errors.description
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {touched.description && errors.description && (
                        <div className="invalid-feedback">
                          {errors.description}
                        </div>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Price</span>
                    </Col>
                    <Col md="5">
                      <Input
                        type="number"
                        name="price"
                        placeholder="price"
                        value={values.price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${
                          touched.price && errors.price ? "is-invalid" : ""
                        }`}
                      />
                      {touched.price && errors.price && (
                        <div className="invalid-feedback">{errors.price}</div>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>discountPrice.</span>
                    </Col>
                    <Col md="5">
                      <Input
                        type="number"
                        name="discountPrice"
                        placeholder="Description"
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
                      <span>Stock</span>
                    </Col>
                    <Col md="5">
                      <Input
                        type="number"
                        name="stock"
                        value={values.stock}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${
                          touched.stock && errors.stock ? "is-invalid" : ""
                        }`}
                      />
                      {touched.stock && errors.stock && (
                        <div className="invalid-feedback">{errors.stock}</div>
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

export default EditPhone;
