import React from "react";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
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
import {toast} from "react-toastify"
import Icon from "@material-ui/core/Icon";
import * as jsondata from "../../views/output.json";

const EditStore = () => {
  const [showSubmitLoader, setShowSubmitLoader] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [errorText, setErrorText] = useState(null);
  const [initialTasks, setInitialTask] = useState({
    name: "",
    description: "",
    icon: "",
    parentId: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const jsonicons = jsondata.default.map((obj) => {
    return { value: obj, label: <Icon>{obj}</Icon> };
  });

  const { _id } = useParams();
  let history = useHistory();
  console.log("id", _id);

  const loadData = async () => {
    try {
      const token = `Bearer ${localStorage.getItem(TOKEN_KEY)}`;
      const {data} = await axios.get(`${API_URL}/categories/${_id}`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(data);
       data.value=data.icon;
     
      setInitialTask(data);
      console.log("data", data);
    } catch (e) {
      console.log(e);
    }
  };
console.log("InitialValue:",initialTasks);
  
const onSubmit = async (value) => {
    try {
      const token = `Bearer ${localStorage.getItem(TOKEN_KEY)}`;
      await axios.put(`${API_URL}/categories/${_id}`, value,{
        headers: {
          Authorization: token,
        },
      });
      history.push("/CategoryList");
      toast("Update Successfully")
    } catch (e) {
      console.log(e);
    }
  };

  if (showLoader) return <Loader />;
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
            name: Yup.string().required(),
            description: Yup.string().required(),
            icon: Yup.string().required(),
            // parentId: Yup.string().required(),
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
                      <span>Category Name</span>
                    </Col>
                    <Col md="5">
                      <Input
                        type="text"
                        name="name"
                        placeholder="Enter Category Name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${
                          touched.name && errors.name
                            ? "is-invalid"
                            : ""
                        }`}
                      />
                      {touched.name && errors.name && (
                        <div className="invalid-feedback">
                          {errors.name}
                        </div>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Category Description</span>
                    </Col>
                    <Col md="5">
                      <Input
                        type="textarea"
                        name="description"
                        placeholder="Enter Category Description"
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
                      <span> Category Icons</span>
                    </Col>
                    <Col md="5">
                      <Select
                        options={jsonicons}
                        value={jsonicons.find((ele)=> values.icon === ele.value)}
                        onChange={(e) => setFieldValue(`icon`, e?.value)}
                      />
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
