import React, { useState, useEffect } from "react";
import { Card, CardBody, Col, Row, Button } from "reactstrap";
import { history } from "../../../history";
import { Link } from 'react-router-dom';

const CategoryCovers = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [userData, setUserData] = useState([]);

  //   useEffect(() => {
  //     loadWalletBalance();
  //   }, []);

  //   const loadWalletBalance = async () => {
  //     setShowLoader(true);
  //     try {
  //       const { data } = await BrandService.getBalance();
  //       console.log("Card Data", data);
  //       setUserData(data.totalBalance);
  //       console.log("data", userData);
  //     } catch (ex) {
  //       console.log(ex);
  //     } finally {
  //       setShowLoader(false);
  //     }
  //   };

  return (
    <>
      <div id="dashboard-analytics">
        <Row className="match-height">
          <Col lg="2" sm="6">
            <Card>
              <Link>
                <CardBody className="pb-0">
                  <b>Soft Covers</b>
                  <h2 className="font-weight-bolder mt-1">{userData} </h2>
                  <p className="card-text"></p>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col lg="2" sm="6">
            <Card>
              <Link>
                <CardBody className="pb-0">
                  <b>Hard Covers</b>
                  <h2 className="font-weight-bolder mt-1">{userData} </h2>
                  <p className="card-text"></p>
                </CardBody>
              </Link>
            </Card>
          </Col>
          <Col lg="2" sm="6">
            <Card>
              <Link>
                <CardBody className="pb-4">
                  <b>Latest Covers</b>
                  <h2 className="font-weight-bolder mt-1">{userData} </h2>
                  <p className="card-text"></p>
                </CardBody>
              </Link>
            </Card>
          </Col>
        </Row>
        <hr />
        {/* <Row>
          <Col md="1"></Col>
          <Col md="5">
            <Button
              className="mr-3"
              color="primary"
             >
               Add Cover
            </Button>
            <Button color="secondary" outline onClick={() => history.goBack()}>
              Cancel
            </Button>
          </Col>
        </Row> */}
      </div>
    </>
  );
};

export default CategoryCovers;
