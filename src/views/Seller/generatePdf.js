import jsPDF from "jspdf";
import "jspdf-autotable";
// Date Fns is used to format the dates we receive
// from our API call

// define a generatePDF function that accepts a invoice argument
const generatePDF = invoice => {
  // initialize jsPDF
  const doc = new jsPDF();

  // define the columns we want and their titles
  const tableColumn = ["Id", "Title", "Issue", "Status", "Closed on"];
  // define an empty array of rows
  const tableRows = [];

  // for each ticket pass all its data into an array
  invoice.foreach(invoice => {
    const invoiceData = [
      invoice._id,
      invoice.customerName,
      invoice.customerMobile,
      invoice.billAmount,
      invoice.storeId,
      
      // called date-fns to format the date on the ticket
    ];
    // push each tickcet's info into a row
    tableRows.push(invoiceData);
  });


  // startY is basically margin-top
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = "MyInvoice";
  // ticket title. and margin-top + margin-left
  doc.text("Invoice");
  // we define the name of our PDF file.
  doc.save(`report_${dateStr}.pdf`);
};

export default generatePDF;