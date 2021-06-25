import classnames from "classnames";
import Avatar from "../../../../components/widgets/avatar/index";
import { TrendingUp, User, Box, DollarSign } from "react-feather";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardText,
  Row,
  Col,
  Media,
} from "reactstrap";
import { DashBoard } from "../../../../services/api.service";
import React, { useState, useEffect } from "react";

const StatsCard = ({ cols }) => {
  const [dataList, setDataList] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [initialTask, setInitialTask] = useState([])
  const [complaintData, setComplaintData] = useState([])
  const [purchaseCount,setPurchaseCount] = useState([])

  const SaleCount = async () => {
    try {
      const datas = await DashBoard.getSaleCount();
      console.log(datas);
      setDataList(datas);
    } catch (ex) {
      console.log(ex);
    } finally {
      setShowLoader(false);
    }
  };

  const ProductCount = async () => {
    
    try {
      const datap = await DashBoard.getProductCount();
      console.log(datap);
      setInitialTask(datap);
      // console.log(initialTask);
    } catch (ex) {
      console.log(ex);
    } finally {
      setShowLoader(false);
    }
  };

  const ComplaintCount = async () => {
    
    try {
      const datac = await DashBoard.getComplaintCount();
      console.log(datac);
      setComplaintData(datac);
      console.log(complaintData);
    } catch (ex) {
      console.log(ex);
    } finally {
      setShowLoader(false);
    }
  };

  const PurchaseCount = async () => {
    
    try {
      const datapc = await DashBoard.getPurchaseCount();
      console.log(datapc);
      setPurchaseCount(datapc);
      console.log(purchaseCount);
    } catch (ex) {
      console.log(ex);
    } finally {
      setShowLoader(false);
    }
  };

  useEffect(() => {
    SaleCount();
    ProductCount();
    ComplaintCount();
    PurchaseCount();
  }, []);

  const data = [
    {
      title: dataList.count,
      subtitle: 'Total Count',
      title1: dataList.totalSellAmount,
      subtitle1:'Total Amount',
      color: 'light-primary',
      icon: <TrendingUp size={24}/>
    },
    {
      title: initialTask.count,
      subtitle: 'Total Product Count',
      color: 'light-info',
      icon: <User size={24} />
    },
    {
      title: complaintData.Pending,
      subtitle: 'Pending Complaints',
      title1: complaintData.Resolved,
      subtitle1: 'Resolved Complaints',
      color: 'light-danger',
      icon: <Box size={24} />
      
    },
    {
      title: purchaseCount.count,
      subtitle: 'Total Purchase Count',
      title1: purchaseCount.totalPaidAmount,
      subtitle1: 'Total Paid Amount',
      title2: purchaseCount.totalPurchaseAmount,
      subtitle2: 'Total Purchase Amount',
      color: 'light-success',
      icon: <DollarSign size={24} />
    }
  ]
  

  const renderData = () => {
    <SaleCount />
   
    return data.map((item, index) => {
      const margin = Object.keys({ cols });
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin[0]}-0`]: index !== data.length - 1,
          })}
        >
          <Media>
            <Avatar color={item.color} icon={item.icon} className="mr-2" />
            <Media className="my-auto" body>
              <h4 className="font-weight-bolder mb-0">{item.title}</h4>
              <CardText className="font-small-3 mb-0">{item.subtitle}</CardText>
              <h4 className="font-weight-bolder mb-0">{item.title1}</h4>
              <CardText className="font-small-3 mb-0">{item.subtitle1}</CardText>
              <h4 className="font-weight-bolder mb-0">{item.title2}</h4>
              <CardText className="font-small-3 mb-0">{item.subtitle2}</CardText>
              
            </Media>
          </Media>
        </Col>
      );
    });
  };

  return (
    <Card className="card-statistics">
      <CardHeader>
        <CardTitle tag="h4">Statistics</CardTitle>
        <CardText className="card-text font-small-2 mr-25 mb-0">
          
        </CardText>
      </CardHeader>
      <CardBody className="statistics-body">
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
  );
};

export default StatsCard;
