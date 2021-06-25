import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  FormGroup,
  Form,
  Input,
  Button,
  Label,
} from "reactstrap";
import fgImg from "./../../assets/img/forgot-password.png";
import { history } from "./../../history";
import "./../../assets/scss/pages/authentication.scss";
import { AuthService } from "../../services/api.service";
import { toast } from 'react-toastify';


class ForgotPassword extends React.Component {
  state = { email: "" };

  handleInput = (e) => {
    this.setState({ email: e.target.value });
  };

  forgot = async (e) => {
    e.preventDefault();
    const { email } = this.state;
    try {
      await AuthService.forgotPassword({ email });
      history.push("/login")
      toast.success("Your Request Sent Successfully and will receive password through email soon")
    } catch (ex) {
      // console.log(ex);
      toast.error(ex)
    }
    history.push("/");
  };
  render() {
    return (
      <Row className="m-0 justify-content-center">
        <Col
          sm="8"
          xl="7"
          lg="10"
          md="8"
          className="d-flex justify-content-center"
        >
          <Card className="bg-authentication rounded-0 mb-0 w-100">
            <Row className="m-0">
              <Col
                lg="6"
                className="d-lg-block d-none text-center align-self-center"
              >
                <img src={fgImg} alt="fgImg" />
              </Col>
              <Col lg="6" md="12" className="p-0">
                <Card className="rounded-0 mb-0 px-2 py-1">
                  <CardHeader className="pb-1">
                    <CardTitle>
                      <h4 className="mb-0">Enter your E-mail</h4>
                    </CardTitle>
                  </CardHeader>
                  <p className="px-2 auth-title">
                    <h6>*New Password will be sent on Your email address*</h6>
                  </p>
                  <CardBody className="pt-1 pb-0">
                    <Form>
                      <FormGroup className="form-label-group">
                        <Input
                          type="email"
                          name="email"
                          placeholder="Email"
                          value={this.state.email}
                          onChange={(e) => this.handleInput(e)}
                          required
                        />
                        <Label>Email</Label>
                      </FormGroup>
                      <div className="float-md-right d-block mb-1">
                        <Button
                          color="primary"
                          outline
                          className="px-75 btn-block"
                          onClick={() => history.push("/login")}
                        >
                          Cancel
                        </Button>
                      </div>
                      <div className="float-md-left d-block mb-1">
                        <Button
                          color="primary"
                          type="submit"
                          className="px-75 btn-block"
                          onClick={(e) => {
                            this.forgot(e);
                          }}
                        >
                          Sent Request
                        </Button>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    );
  }
}
export default ForgotPassword;
