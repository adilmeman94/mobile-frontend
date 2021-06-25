import React from "react";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
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
  Col,
  Row,
} from "reactstrap";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Icon from "@material-ui/core/Icon";

const EditStore = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [errorText, setErrorText] = useState(null);
  const [initialTasks, setInitialTask] = useState({
    name: "",
    description: "",
    issueDetail: "",
    icon: "",
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
      const { data } = await axios.get(`${API_URL}/categories/${_id}`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(data);
      setInitialTask(data);
      console.log("data", data);
      toast.success("data Fetched")
    } catch (e) {
      toast.error(e)

    }
  };

  if (showLoader) return <Loader />;
  return (
    <Card>
      <CardHeader>
        <CardTitle>View Category</CardTitle>
      </CardHeader>
      <hr />
      <CardBody>
        <Row>
          <Col md="3"></Col>
          <Col md="5">
            {errorText && (
              <UncontrolledAlert color="danger">{errorText}</UncontrolledAlert>
            )}
          </Col>
        </Row>
        <Form>
          <FormGroup row>
            <Col md="3" className="text-center">
              <span>Category Name</span>
            </Col>
            <Col md="5">
              <Input value={initialTasks.name} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="3" className="text-center">
              <span>Category Description</span>
            </Col>
            <Col md="5">
              <Input value={initialTasks.description} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="3" className="text-center">
              <span>Category Icon</span>
            </Col>
            <Col md="5">
              <Row>
                <Icon>{initialTasks.icon}</Icon>&nbsp;
                <h3>
                  <b>{initialTasks.name}</b>
                </h3>
              </Row>
            </Col>
          </FormGroup>
          <Row>
            <Col md="3"></Col>
            <Col md="5">
              <Button color="primary" onClick={() => history.goBack()}>
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </CardBody>
    </Card>
  );
};

export default EditStore;
