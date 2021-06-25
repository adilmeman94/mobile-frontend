import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Input,
  Form,
  FormGroup,
  Button,
  Col,
  Row,
} from "reactstrap";
import Loader from "../../components/Loader";
import { AuthService } from "../../services/api.service";
import { history } from "../../history";
import { useSelector } from "react-redux";

const AdminProfile = (props) => {

  const { history, match } = props;
  const [showLoader, setShowLoader] = useState(false);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    loadAdminProfile();
  }, []);

  const loadAdminProfile = async () => {
    setShowLoader(true);
    try {
      const data = await AuthService.getProfile();
      console.log("Data", data);
      setUserData(data);
      console.log("userdata", userData);
    } catch (ex) {
      console.log(ex);
    } finally {
      setShowLoader(false);
    }
  };

  if (showLoader) return <Loader />;
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>User Details </CardTitle>
        </CardHeader>
        <hr />
        <CardBody>
          <Form>
          <FormGroup row>
              <Col md="3" className="text-center">
                <span>_id *</span>
              </Col>
              <Col md="5">
                <Input value={userData._id} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3" className="text-center">
                <span>First Name *</span>
              </Col>
              <Col md="5">
                <Input value={userData.firstName} />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3" className="text-center">
                <span>Last Name *</span>
              </Col>
              <Col md="5">
                <Input
                //   placeholder="Last Name"
                    value={userData.lastName}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3" className="text-center">
                <span>E-Mail *</span>
              </Col>
              <Col md="5">
                <Input
                //   placeholder="email"
                    value={userData.email}
                />
              </Col>
            </FormGroup>
            <Row>
              <Col md="3"></Col>
              <Col md="5">
                <Button
                  color="primary"
                  outline
                  onClick={() => history.goBack()}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};
export default AdminProfile;
