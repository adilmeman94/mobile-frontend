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
import {
  NoRecordsFound,
  TableLoadingText,
} from "../../components/TableLoadingText";
import { history } from "../../history";
import { StoreService } from "../../services/api.service";
import { toast } from "react-toastify";

const StoreList = (props) => {
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
    getStoreList();
  }, []);

  const getStoreList = async () => {
    setShowLoader(true);
    try {
      const data = await StoreService.getstoreLists(
        currentPage,
        searchInputRef.current.value,
        orderBy,
        sort
      );
      setDataList(data);
      console.log("DataList", dataList);
    } catch (ex) {
      console.log(ex);
    } finally {
      setShowLoader(false);
    }
  };

  const onDeleteRecord = async (_id) => {
    await StoreService.deleteStore(_id).then(() => {
      getStoreList();
    });

    dataList.splice(deleteID, 1);
    setDataList([...dataList]);
    toast.error("Record Deleted Successfully");
    setShowDeleteAlert(false);
    setDeleteID(null);
  };

  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      getStoreList();
    }
  };

  const changeOrderBy = (value) => {
    let sorting = orderBy === value && sort === -1 ? 1 : -1;
    setSort(sorting);
    setOrderBy(value);
  };

  console.log("data", dataList);

  let storelist;

  if (dataList.length > 0) {
    storelist = dataList.map((element, index) => {
      console.log("id", element._id);
      return (
        <tr key={element._id}>
          <td>{element.storeName}</td>
          <td>{element.storeManagerName}</td>
          <td>
          <div className="container" style={{margin:"10px"}}>
          <img style={{ width: 50, height: 50 }} src={element.storeLogo} />
          </div>
          </td>
          <td>{element.storeAddress}</td>
          <td
            style={
              element.storeStatus === "true"
                ? { color: "green" }
                : { color: "red" }
            }
          >
            {element.storeStatus === "true" ? "Active" : "Not Active"}
          </td>
          <td>
            {element.storeMobile.toString()}
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
              onClick={() => history.push(`/EditStore/${element._id}`)}
              className="cursor-pointer"
            />
            <Eye
              size={18}
              color={"rgb(137,128,242)"}
              onClick={() => history.push(`/ViewStore/${element._id}`)}
              className="cursor-pointer"
            />
          </td>
        </tr>
      );
    });
  } else {
    storelist = <NoRecordsFound colSpan={8} />;
  }

  return (
    <Card>
      {showLoader && <Loader />}
      <CardHeader>
        <CardTitle>Stores</CardTitle>

        <div className="float-right">
          <Button
            className="mr-1"
            outline
            color="primary"
            onClick={() => history.push("/AddStore")}
          >
            Add Store
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
              onClick={getStoreList}
            >
              Search
            </InputGroupAddon>
          </InputGroup>
        </div>
        <Table responsive className="mt-2">
          <thead>
            <tr className="table-active">
              <th
                className="cursor-pointer"
                onClick={() => changeOrderBy("fromUser")}
              >
                Store Name
                {orderBy === "fromUser" &&
                  (sort === 1 ? (
                    <ChevronUp size={14} />
                  ) : (
                    <ChevronDown size={14} />
                  ))}
              </th>
              <th>Store Manager</th>
              <th>Store Logo</th>
              <th>Address</th>
              <th>Status</th>
              <th>Mnos</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {showLoader ? <TableLoadingText colSpan={8} /> : storelist}
          </tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default StoreList;
