import React, { useState } from "react";
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
import { Formik } from "formik";
import * as Yup from "yup";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { CategoryService } from "../../services/api.service";
import Select from "react-select";
import * as jsondata from "../../views/output.json";
import Icon from "@material-ui/core/Icon";

const AddCategory = (props) => {
  const [showSubmitLoader, setShowSubmitLoader] = useState(false);
  const { history, match } = props;
  const [errorText, setErrorText] = useState(null);
  const [showLoader, setShowLoader] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    icon: "",
    parent_id: "",
  });

  const jsonicons = jsondata.default.map((obj) => {
    return { value: obj, label: <Icon>{obj}</Icon>, ...obj };
  });

  const onSubmit = async (values) => {
    setErrorText(null);
    setShowLoader(true);
    console.log(values);
    try {
      const value = { ...values };
      const response = await CategoryService.addCategory(null,value);
      console.log(response);
      history.push("/CategoryList");
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
        <CardTitle>Add Category</CardTitle>
      </CardHeader>
      <hr />
      <CardBody>
        <Formik
          initialValues={formValues}
          onSubmit={async (values) => {
            onSubmit(values);
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required(),
            // parent_id: Yup.string().required(),
            description: Yup.string().required(),
            icon: Yup.string().required(),
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
                      <span>Category Name</span>
                    </Col>
                    <Col md="5">
                      <Input
                        type="text"
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${
                          touched.name && errors.name ? "is-invalid" : ""
                        }`}
                      />
                      {touched.name && errors.name && (
                        <div className="invalid-feedback">{errors.name}</div>
                      )}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3" className="text-center">
                      <span>Description</span>
                    </Col>
                    <Col md="5">
                      <Input
                        type="textarea"
                        name="description"
                        placeholder="description"
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
                        onChange={(e) => setFieldValue(`icon`, e?.value)}
                      />
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

export default AddCategory;
