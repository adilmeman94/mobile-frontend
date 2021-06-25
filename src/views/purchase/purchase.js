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
  NoRecordsFound,
  TableLoadingText,
} from "../../components/TableLoadingText";
import { history } from "../../history";
import { PurchaseService } from "../../services/api.service";
import { toast } from "react-toastify";

const PurchaseList = (props) => {
  const [showLoader, setShowLoader] = useState(false);
  const searchInputRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [dataList, setDataList] = useState([]);
  const [deleteID, setDeleteID] = useState(null);
  const [orderBy, setOrderBy] = useState(null);
  const [sort, setSort] = useState(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  useEffect(() => {
    purchaseList();
  }, []);

  const purchaseList = async () => {
    setShowLoader(true);
    try {
      const data = await PurchaseService.getPurchaseList(
        searchInputRef.current.value,
        orderBy,
        sort
      );
      setDataList(data);
      console.log("DataList", data);
    } catch (ex) {
      toast.error(ex);
    } finally {
      setShowLoader(false);
    }
  };

  const onDeleteRecord = async (_id) => {
    await PurchaseService.deletePurchase(_id).then(() => {
      purchaseList();
    });
    dataList.splice(deleteID, 1);
    setDataList([...dataList]);
    toast.error("Deleted Successfully");
    setShowDeleteAlert(false);
    setDeleteID(null);
  };

  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      purchaseList();
    }
  };

  const changeOrderBy = (value) => {
    let sorting = orderBy === value && sort === -1 ? 1 : -1;
    setSort(sorting);
    setOrderBy(value);
  };

  let salelist;

  if (dataList.length > 0) {
    salelist = dataList.map((element, index) => {
      console.log("id", element.stockByStore);
      return (
        <tr key={element._id}>
          <td>{element.sellerName}</td>
          <td>{element.sellerContact.map((item) => {
            return item
          }).toString()}</td>
          <td>{element.purchaseDescription}</td>
          <td>{element.billAmount}</td>
          <td>{element.paidAmount}</td>
          <td>
          <div className="container" style={{margin:"10px"}}>
          <img style={{ width: 50, height: 50 }} src={element.billImage} />
          </div>
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
              onClick={() => history.push(`/EditPurchase/${element._id}`)}
              className="cursor-pointer"
            />
            <Eye
              size={18}
              color={"rgb(137,128,242)"}
              onClick={() => history.push(`/ViewPurchase/${element._id}`)}
              className="cursor-pointer"
            />
          </td>
        </tr>
      );
    });
  } else {
    salelist = <NoRecordsFound colSpan={8} />;
  }

  return (
    <Card>
      {showLoader && <Loader />}
      <CardHeader>
        <CardTitle>Purchase</CardTitle>

        <div className="float-right">
          <Button
            className="mr-1"
            outline
            color="primary"
            onClick={() => history.push("/AddPurchase")}
          >
            Add Purchase
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
              onClick={purchaseList}
            >
              Search
            </InputGroupAddon>
          </InputGroup>
        </div>
        <Table responsive className="mt-2">
          <thead>
            <tr className="table-active">
              <th>Seller Name</th>
              <th>Selling Mobile No</th>
              <th>Purchase Detail</th>
              <th>Bill Amount</th>
              <th
                className="cursor-pointer"
                onClick={() => changeOrderBy("billAmount")}
              >
                Paid Amount
                {orderBy === "billAmount" &&
                  (sort === 1 ? (
                    <ChevronUp size={14} />
                  ) : (
                    <ChevronDown size={14} />
                  ))}
              </th>
              <th>Bill Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {showLoader ? <TableLoadingText colSpan={8} /> : salelist}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default PurchaseList;
