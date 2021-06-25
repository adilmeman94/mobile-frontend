import React, { useEffect, useState, useRef } from "react";
import { ChevronDown, ChevronUp, Trash, Edit, Eye } from "react-feather";
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
import { ComplaintService } from "../../services/api.service";
import moment from "moment";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ComplaintList = (props) => {
  const [showLoader, setShowLoader] = useState(false);
  const searchInputRef = useRef(null);
  const [deleteID, setDeleteID] = useState(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [dataList, setDataList] = useState([]);
  const [orderBy, setOrderBy] = useState(null);
  const [sort, setSort] = useState(null);

  useEffect(() => {
    getComplaintLists();
  }, []);

  const getComplaintLists = async () => {
    setShowLoader(true);
    try {
      const data = await ComplaintService.getComplaintList(
        currentPage,
        searchInputRef.current.value,
        orderBy,
        sort
      );
      console.log("conplaint data", data);
      setDataList(data);
      console.log("DataList", dataList);
    } catch (ex) {
      console.log(ex);
    } finally {
      setShowLoader(false);
    }
  };

  const onDeleteRecord = async (_id) => {
    await ComplaintService.deleteComplaint(_id).then(() => {
      getComplaintLists();
    });

    dataList.splice(deleteID, 1);
    setDataList([...dataList]);
    toast.error("Record Deleted Successfully");
    setShowDeleteAlert(false);
    setDeleteID(null);
  };

  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      getComplaintLists();
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
        <tr key={element._id}>
          <td>{element._id}</td>
          <td>{element.customerName}</td>
          <td>{element.complaintDate}</td>
          <td>{element.customerMobile}</td>
          <td>{element.issueDetail}</td>
          <td
            style={
              element.complaintStatus === "true"
                ? { color: "green" }
                : { color: "red" }
            }
            >
            {element.complaintStatus === "true" ? "Solved" : "Pending"}
          </td>
          <td>
            <Trash
              size={18}
              color={"red"}
              className="cursor-pointer"
              onClick={() => {
                onDeleteRecord(element._id);
                setDeleteID(index);
                setShowDeleteAlert(true);
              }}
            />
            <Edit
              size={18}
              color={"rgb(137,128,242)"}
              onClick={() => history.push(`/EditComplaint/${element._id}`)}
              className="cursor-pointer"
            />
            <Eye
              size={18}
              color={"rgb(137,128,242)"}
              onClick={() => history.push(`/ViewComplaint/${element._id}`)}
              className="cursor-pointer"
            />
          </td>
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
        <CardTitle>
          Customer Complaints <h6>*Total Complaints*</h6>
        </CardTitle>

        <div className="float-right">
          <Button
            className="mr-1"
            outline
            color="primary"
            onClick={() => history.push("/AddCompliant")}
          >
            Add Complaint
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
              onClick={getComplaintLists}
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
              <th>Date</th>
              <th>MNo</th>
              <th>Issue</th>
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
