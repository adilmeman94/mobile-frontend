import React, { useEffect, useState, useRef } from "react";
import { ArrowUpRight, ChevronDown, ChevronUp, Plus } from "react-feather";
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Table,
  Input,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import Loader from "../../components/Loader";
// import Paginations from "../../components/Pagination";
import {
  IsActiveLabel,
  NoRecordsFound,
  TableLoadingText,
} from "../../components/TableLoadingText";
import { history } from "../../history";
import { BrandService } from "../../services/api.service";
import moment from "moment";

const ComplaintList = (props) => {
  const [showLoader, setShowLoader] = useState(false);
  const searchInputRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [dataList, setDataList] = useState([]);
  const [orderBy, setOrderBy] = useState(null);
  const [sort, setSort] = useState(null);

  useEffect(() => {
    getUserTranxList();
  }, []);

  const getUserTranxList = async () => {
    setShowLoader(true);
    try {
      const { data } = await BrandService.getTranxList(
        currentPage,
        searchInputRef.current.value,
        orderBy,
        sort
      );
      setDataList(
        data.map((element) => {
          element.transactionDate = moment(data.transactionDate).format(
            "DD/MM/YYYY"
          );
          return element;
        }) || []
      );
      console.log("DataList", dataList);
    } catch (ex) {
      console.log(ex);
    } finally {
      setShowLoader(false);
    }
  };

  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      getUserTranxList();
    }
  };

  const changeOrderBy = (value) => {
    let sorting = orderBy === value && sort === -1 ? 1 : -1;
    setSort(sorting);
    setOrderBy(value);
  };

  console.log("data", dataList);

  let complntList;
  if (dataList.length > 0) {
    complntList = dataList.map((element, index) => {
      console.log("id", element._id);
      return (
        <tr
          key={element._id}
          onClick={() => {
            history.push(`/wallet/tranxView/${element._id}`);
          }}
        >
          <td>{element._id}</td>
          <td style={{ cursor: "pointer" }}>{element.fromUser}</td>
          <td>{element.toUser}</td>
          <td>{element.message}</td>
          <td>{element.transferdAmount}</td>
          <td style={
              element.status === "succeeded"
                ? { color: "green" }
                : { color: "red" }
            }>{element.status}</td>
          <td>{element.transactionDate}</td>
          <td
            style={
              element.transactionType === "credit"
                ? { color: "green" }
                : { color: "red" }
            }
          >
            {element.transactionType}
          </td>
          <td>{element.transactionId}</td>
          
        </tr>
      );
    });
  } else {
    complntList = <NoRecordsFound colSpan={8} />;
  }

  return (
    <Card>
      {showLoader && <Loader />}
      <CardHeader>
        <CardTitle>Phone List</CardTitle>
        <div className="float-right">
          <Button
            className="mr-1"
            outline
            color="primary"
            onClick={() => history.push("/AddPhone")}
          >
            Add Phone
          </Button>
        </div>
      </CardHeader>
      <hr />
      <CardBody>
      <div className="container">
          <InputGroup>
            <Input
              type="text"
              placeholder="Search..."
              innerRef={searchInputRef}
              onKeyDown={_handleKeyDown}
            />
            <InputGroupAddon
              addonType="append"
              className="cursor-pointer"
              onClick={getUserTranxList}
            >
              Search
            </InputGroupAddon>
          </InputGroup>
        </div>
        <Table responsive className="mt-2">
          <thead>
            <tr className="table-active">
              <th> CustomerId </th>
              <th
                className="cursor-pointer"
                onClick={() => changeOrderBy("fromUser")}
              >
                Customer Name
                {orderBy === "fromUser" &&
                  (sort === 1 ? (
                    <ChevronUp size={14} />
                  ) : (
                    <ChevronDown size={14} />
                  ))}
              </th>
              <th>Issue</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {showLoader ? <TableLoadingText colSpan={8} /> : complntList}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default ComplaintList;
