import React, { useState, useEffect } from "react";
import { Card, CardBody, Col, Row, Button } from "reactstrap";
import { Trash, Edit, Eye } from "react-feather";
import { CategoryService } from "../../services/api.service";
import { Link } from "react-router-dom";
import { history } from "../../history";
import Icon from "@material-ui/core/Icon";
import { toast } from "react-toastify";

const CategoryList = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [deleteID, setDeleteID] = useState(null);

  useEffect(() => {
    categoriesList();
  }, []);

  const categoriesList = async () => {
    setShowLoader(true);
    try {
      const data = await CategoryService.getCategoryList();
      setDataList(data);
    } catch (ex) {
      console.log(ex);
    } finally {
      setShowLoader(false);
    }
  };

  const onDeleteRecord = async (_id) => {
    await CategoryService.deleteCategory(_id).then(() => {
      categoriesList();
    });
    dataList.splice(deleteID, 1);
    setDataList([...dataList]);
    toast.error("Category Deleted Successfully");
    setDeleteID(null);
  };

  console.log("dl", dataList);
  return (
    <>
      <div id="dashboard-analytics">
        <h4>Categories!</h4>
        <hr />
        {dataList.map((element, index) => {
          return (
            <>
              <Row className="match-height">
                <Col lg="2">
                  <Card>
                    <CardBody className="pb-0">
                      <Link to={`SubCategoryList/${element._id}`}>
                        <h4
                          className="font-weight-bolder"
                          style={{ color: "rgb(137,128,242)" }}
                        >
                          <Icon>{element.icon}</Icon>
                          {showLoader ? <CardBody size={8} /> : element.name}
                        </h4>
                      </Link>
                      <p className="card-text">* {element.description}</p>
                      <Edit
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
                      />
                    </CardBody>
                    &nbsp;
                  </Card>
                </Col>
              </Row>
            </>
          );
        })}
        <Row>
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
        </Row>
      </div>
    </>
  );
};

export default CategoryList;
