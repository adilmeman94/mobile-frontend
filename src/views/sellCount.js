import React, { useState, useEffect } from "react";
import { DashBoard } from "../services/api.service";
import { Card, CardBody, Col, Row, Button } from "reactstrap";

const SellCounts = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    SaleCount();
  }, []);

  const SaleCount = async () => {
    //   setShowLoader(true);
    try {
      const data = await DashBoard.getSaleCount();
      console.log(data);
      setDataList(data);
      console.log(dataList);
    } catch (ex) {
      console.log(ex);
    } finally {
      setShowLoader(false);
    }
  };

  return (
    <>
      <div id="dashboard-analytics">
        <Row className="match-height">
          <Col lg="2">
            <Card>
              <CardBody className="pb-0">
              <p className="card-text">*Total Sale Count*</p>
                  <h5
                    className="font-weight-bolder"
                    style={{ color: "rgb(137,128,242)" }}
                  >No. of Count:&nbsp;
                    {showLoader ? <CardBody size={8} /> : dataList.count}
                  </h5>
                  <h5
                    className="font-weight-bolder"
                    style={{ color: "rgb(137,128,242)" }}
                  > Total Amount:&nbsp;
                    {showLoader ? <CardBody size={8} /> : dataList.totalSellAmount}
                  </h5>
                {/* <Edit
                  size={18}
                  className="cursor-pointer"
                  color={"rgb(137,128,242)"}
                  onClick={() => {
                    history.push(`/EditCategory/${element._id}`);
                  }}
                />
                &nbsp;
                <Trash
                  size={18}
                  color={"red"}
                  className="cursor-pointer"
                  onClick={() => {
                    onDeleteRecord(element._id);
                    setDeleteID(index);
                  }}
                />{" "}
                &nbsp;
                <Eye
                  size={18}
                  className="cursor-pointer"
                  color={"rgb(137,128,242)"}
                  onClick={() => {
                    history.push(`/ViewCategory/${element._id}`);
                  }}
                /> */}
              </CardBody>
              
            </Card>
          </Col>
        </Row>
        
        {/* <Row>
          <Col md="2"></Col>
          <Col md="5">
            <Button
              className="mr-3"
              color="primary"
              onClick={() => history.push("/AddCategory")}
            >
              Add Category
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

export default SellCounts;
