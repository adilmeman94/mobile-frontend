// import React, { useEffect, useState } from "react";
// import generatePDF from "./generatePdf";
// import { API_URL } from "../../configs/constant";
// import { TOKEN_KEY } from "../../configs/constant";
// import axios from "axios";
// import { useParams, useHistory } from "react-router-dom";
// import InvoiceComponent from "./invoiceTable";

// const Invoice = () => {
//   const [invoices, setInvoices] = useState([]);

//   useEffect(() => {
//     const getInvoice = async () => {
//       try {
//         const token = `Bearer ${localStorage.getItem(TOKEN_KEY)}`;
//         const response = await axios.get(`${API_URL}/sells/invoice/${_id}`, {
//           headers: {
//             Authorization: token,
//           },
//         });
//         console.log("Invoice response:", response)
//         setInvoices(response.data);
//       } catch (err) {
//         console.log("error", err);
//       }
//     };
//     getInvoice();
//   }, []);

//   const { _id } = useParams();
//   let history = useHistory();
//   console.log("id", _id);

//   // const reportTickets = tickets.filter(ticket => ticket.status === "completed");
// console.log("Invoice at viewPDF:",invoices);
//   return (

//     <div>
//       <div className="container mb-4 mt-4 p-3">
//         <div className="row">
//           <button className="btn btn-primary" onClick={() => generatePDF()}>
//             Generate
//           </button>
//         </div>
//       </div>
//       <InvoiceComponent invoices={invoices} />
//     </div>
//   );
// };

// export default Invoice;
//-------------------------------------------------------------------------------------------
import React, { useState, useEffect } from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { SalesService } from "../../services/api.service";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { PDFViewer } from "@react-pdf/renderer";
import ReactPDF from "@react-pdf/renderer";
import ReactDOM from "@react-pdf/renderer";
const ViewPdf = () => {
  const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
      },
      title: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Oswald'
      },
      author: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 40,
      },
      subtitle: {
        fontSize: 18,
        margin: 12,
        fontFamily: 'Oswald'
      },
      text: {
        margin: 12,
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'Times-Roman'
      },
      image: {
        marginVertical: 15,
        marginHorizontal: 100,
      },
      header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'center',
        color: 'grey',
      },
      pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
      },
    });

  useEffect(() => {
    invoiceList();
  }, []);

  const { _id } = useParams();
  let history = useHistory();
  console.log("id", _id);

  const [dataList, setDataList] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  const invoiceList = async (d) => {
    setShowLoader(true);
    try {
      const data = await SalesService.getInvoiceList(_id);
      setDataList(data);
      console.log("DataList", data);
    } catch (ex) {
      toast.error(ex);
    } finally {
      setShowLoader(false);
    }
  };

  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* <View style={styles.section}> */}
          <Text style={styles.section}>{dataList._id}</Text>
        {/* </View> */}
        {/* <View style={styles.section}> */}
          <Text style={styles.section}>{dataList.customerName}</Text>
        {/* </View> */}
      </Page>
    </Document>

  );

  return (
    <PDFViewer>
     <MyDocument />
     </PDFViewer>

  )

};

export default ViewPdf;
//--------------------------------------------------------------------------------------------------
// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";

// // ** Third Party Components
// import axios from "axios";
// import { Row, Col, Alert } from "reactstrap";
// import { API_URL } from "../../configs/constant";
// import { TOKEN_KEY } from "../../configs/constant";

// // ** Invoice Preview Components
// import PreviewCard from "./invoiceCard";
// // import PreviewActions from './PreviewActions'
// // import SendInvoiceSidebar from '../shared-sidebar/SidebarSendInvoice'
// // import AddPaymentSidebar from '../shared-sidebar/SidebarAddPayment'

// // ** Styles
// // import '../../scss/base/pages/app-invoice.scss'

// const InvoicePreview = () => {
//   // ** Vars
//   const { _id } = useParams();

//   // ** States
//   const [data, setData] = useState(null);
//   const [sendSidebarOpen, setSendSidebarOpen] = useState(false);
//   const [addPaymentOpen, setAddPaymentOpen] = useState(false);

//   // ** Functions to toggle add & send sidebar
//   const toggleSendSidebar = () => setSendSidebarOpen(!sendSidebarOpen);
//   const toggleAddSidebar = () => setAddPaymentOpen(!addPaymentOpen);

//   // ** Get invoice on mount based on id
//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = async () => {
//     try {
//       const token = `Bearer ${localStorage.getItem(TOKEN_KEY)}`;
//       const { data } = await axios.get(`${API_URL}/sells/invoice/${_id}`, {
//         headers: {
//           Authorization: token,
//         },
//       });
//       console.log(data);
//       setData(data);
//       console.log("datas", data);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   return data !== null && data.invoice !== undefined ? (
//     <div className="invoice-preview-wrapper">
//       <Row className="invoice-preview">
//         <Col xl={9} md={8} sm={12}>
//           <PreviewCard data={data} />
//         </Col>
//         {/* <Col xl={3} md={4} sm={12}>
//           <PreviewActions id={id} setSendSidebarOpen={setSendSidebarOpen} setAddPaymentOpen={setAddPaymentOpen} />
//         </Col> */}
//       </Row>
//       {/* <SendInvoiceSidebar toggleSidebar={toggleSendSidebar} open={sendSidebarOpen} />
//       <AddPaymentSidebar toggleSidebar={toggleAddSidebar} open={addPaymentOpen} /> */}
//     </div>
//   ) : (
//     <Alert color="danger">
//       <h4 className="alert-heading">Invoice not found</h4>
//       <div className="alert-body">
//         Invoice with id: {_id} doesn't exist. Check list of
//         all invoices: <Link to="/invoice/list">Invoice List</Link>
//       </div>
//     </Alert>
//   );
// };

// export default InvoicePreview;
