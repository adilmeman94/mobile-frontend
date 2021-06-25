import React, { useEffect, useState, useRef } from "react";
import {
  ChevronDown,
  ChevronUp,
  Trash,
  Edit,
  Eye,
  FilePlus,
} from "react-feather";
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
import Icon from "@material-ui/core/Icon";
import { history } from "../../history";
import { SalesService } from "../../services/api.service";
import { toast } from "react-toastify";


const SalesLists = (props) => {
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
    salesLists();
  }, []);

  const salesLists = async () => {
    setShowLoader(true);
    try {
      const data = await SalesService.getsalesList(
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
    await SalesService.deletSales(_id).then(() => {
      salesLists();
    });
    dataList.splice(deleteID, 1);
    setDataList([...dataList]);
    toast.error("Record Deleted Successfully");
    setShowDeleteAlert(false);
    setDeleteID(null);
  };

  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      salesLists();
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
          <td>{element.customerName}</td>
          <td>{element.sellDate}</td>
          <td>{element.customerMobile}</td>
          <td>
            {element.productDetail.map((item, subindex) => {
              return (
                <p key={subindex} className="m-0">
                  qty: {item.productQty}, total: {item.productTotalPrice}
                </p>
              );
            })}
          </td>
          <td>{element.billAmount}</td>
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
              onClick={() => history.push(`/EditSales/${element._id}`)}
              className="cursor-pointer"
            />
            <Eye
              size={18}
              color={"rgb(137,128,242)"}
              onClick={() => history.push(`/ViewSales/${element._id}`)}
              className="cursor-pointer"
            />
          </td>
          <td>
            <FilePlus
              size={18}
              color={"rgb(137,128,242)"}
              className="cursor-pointer"
              onClick={() => history.push(`/ViewInvoiceDetails/${element._id}`)}
            />
            Invoice
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
        <CardTitle>Sales</CardTitle>

        <div className="float-right">
          <Button
            className="mr-1"
            outline
            color="primary"
            onClick={() => history.push("/AddSales")}
          >
            Add Sales
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
              onClick={salesLists}
            >
              Search
            </InputGroupAddon>
          </InputGroup>
        </div>
        <Table responsive className="mt-2">
          <thead>
            <tr className="table-active">
              <th>Customer Name</th>
              <th>Selling Date</th>
              <th>Customer Mobile</th>
              <th>Product Details</th>
              <th
                className="cursor-pointer"
                onClick={() => changeOrderBy("billAmount")}
              >
                Bill Amount
                {orderBy === "billAmount" &&
                  (sort === 1 ? (
                    <ChevronUp size={14} />
                  ) : (
                    <ChevronDown size={14} />
                  ))}
              </th>
              <th>Action</th>
              <th>Generate Invoice</th>
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

export default SalesLists;
