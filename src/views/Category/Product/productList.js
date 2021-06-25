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

import Loader from "../../../components/Loader";
// import Paginations from "../../components/Pagination";
import {
  NoRecordsFound,
  TableLoadingText,
} from "../../../components/TableLoadingText";
import { history } from "../../../history";
import { ProductService } from "../../../services/api.service";
import { toast } from "react-toastify";
import { AmpStories } from "@material-ui/icons";

const ProductLists = (props) => {
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
    productList();
  }, []);

  const productList = async () => {
    setShowLoader(true);
    try {
      const data = await ProductService.getProductList(
        currentPage,
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

  // function currencyFormat(num) {
  //   return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g);
  // }
  // console.log(currencyFormat({data.productPrice}));

  const onDeleteRecord = async (_id) => {
    await ProductService.deleteProducts(_id).then(() => {
      productList();
    });
    dataList.splice(deleteID, 1);
    setDataList([...dataList]);
    toast.error("Record Deleted Successfully");
    setShowDeleteAlert(false);
    setDeleteID(null);
  };

  const _handleKeyDown = (e) => {
    if (e.key === "Enter") {
      productList();
    }
  };

  const changeOrderBy = (value) => {
    let sorting = orderBy === value && sort === -1 ? 1 : -1;
    setSort(sorting);
    setOrderBy(value);
  };

  let storelist;

  if (dataList.length > 0) {
    storelist = dataList.map((element, index) => {
      console.log("id", element.stockByStore);
      return (
        <tr key={element._id}>
          {/* <td>{element._id}</td> */}
          <td>{element.productName}</td>
          <td>{element.brandName}</td>
          <td>
          <div className="container" style={{margin:"5px"}}>
          <img style={{ width: 50, height: 50 }} src={element.productImage} />
          </div>
          </td>
          <td>{element.productPrice}</td>
          <td>{element.discountPrice}</td>
          <td>
            {element.stockByStore.map((item) => {
              return (
                <p className="m-0">
                  store: {item.storeId}, stock: {item.stock}{" "}
                </p>
              );
            })}
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
              onClick={() => history.push(`/EditProduct/${element._id}`)}
              className="cursor-pointer"
            />
            <Eye
              size={18}
              color={"rgb(137,128,242)"}
              onClick={() => history.push(`/ViewProduct/${element._id}`)}
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
        <CardTitle>Products</CardTitle>

        <div className="float-right">
          <Button
            className="mr-1"
            outline
            color="primary"
            onClick={() => history.push("/AddProduct")}
          >
            Add Product
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
              onClick={productList}
            >
              Search
            </InputGroupAddon>
          </InputGroup>
        </div>
        <Table responsive className="mt-2">
          <thead>
            <tr className="table-active">
              {/* <th> Product Id </th> */}
              <th
                className="cursor-pointer"
                onClick={() => changeOrderBy("fromUser")}
              >
                Product Name
                {orderBy === "fromUser" &&
                  (sort === 1 ? (
                    <ChevronUp size={14} />
                  ) : (
                    <ChevronDown size={14} />
                  ))}
              </th>
              <th>Brand Name</th>
              <th>Product Image</th>
              <th>Product Price</th>
              <th>Discount Price</th>
              <th>Stock By Store</th>
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

export default ProductLists;
