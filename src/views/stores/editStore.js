import React from "react";
import { useHistory } from "react-router-dom";
import { useState, useEffect, useRef, Fragment } from "react";
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
import { useParams } from "react-router-dom";
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
    storeStatus: [{name:"true"}, {name:"false"}],
  });
  const [storeLogo, setStoreLogo] = useState("");
  const [removedImage, setRemovedImage] = useState(false);
  const fileUploader = useRef(null);

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
      setStoreLogo(data.storeLogo);
      console.log("data.data", data);
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = async (value) => {
    try {
      const token = `Bearer ${localStorage.getItem(TOKEN_KEY)}`;
      await axios.put(`${API_URL}/stores/${_id}`, value, {
        headers: {
          Authorization: token,
        },
      });
      history.push("/Store");
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
        setStoreLogo(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onRemoveFile = () => {
    setStoreLogo(null);
    setRemovedImage(true);
  };

  if (showLoader) return <Loader />;
  console.log("storeMobile", initialTasks.storeMobile);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Store</CardTitle>
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
            storeMobile: Yup.string().required(),
            storeStatus: Yup.string().required(),
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
                      <Input
                        type="text"
                        name="storeName"
                        placeholder="Enter Store Name"
                        value={values.storeName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${
                          touched.storeName && errors.storeName
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {touched.storeName && errors.storeName && (
                        <div className="invalid-feedback">
                          {errors.storeName}
                        </div>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Store Manager</span>
                    </Col>
                    <Col md="5">
                      <Input
                        type="text"
                        name="storeManagerName"
                        placeholder="Enter Store Manager Name"
                        value={values.storeManagerName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${
                          touched.storeManagerName && errors.storeManagerName
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {touched.storeManagerName && errors.storeManagerName && (
                        <div className="invalid-feedback">
                          {errors.storeManagerName}
                        </div>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Address</span>
                    </Col>
                    <Col md="5">
                      <Input
                        type="textarea"
                        name="storeAddress"
                        placeholder="Enter Address"
                        value={values.storeAddress}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${
                          touched.storeAddress && errors.storeAddress
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {touched.storeAddress && errors.storeAddress && (
                        <div className="invalid-feedback">
                          {errors.storeAddress}
                        </div>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Store Logo</span>
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
                      {storeLogo && (
                        <aside className="thumb-container">
                          <div className="dz-thumb">
                            <div className="dz-thumb-inner">
                              <img
                                height="100"
                                width="100"
                                src={storeLogo}
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
                      <span>Store Status</span>
                    </Col>
                    <Col md="2">
                      <Input
                        style={
                          values.storeStatus === "true"
                            ? { color: "green" }
                            : { color: "red" }
                        }
                        type="select"
                        name="storeStatus"
                        value={values.storeStatus}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${
                          touched.storeStatus && errors.storeStatus
                            ? "is-invalid"
                            : ""
                        }`}
                      >
                        <option value={true}>Active</option>
                        <option value={false}>Not Active</option>
                        {touched.storeStatus && errors.storeStatus && (
                          <div className="invalid-feedback">
                            {errors.storeStatus}
                          </div>
                        )}
                      </Input>
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
                          "Edit Store"
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

export default EditStore;
