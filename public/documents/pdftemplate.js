module.exports = (assets=[],services=[],issuedBy,expDateOfDelievery) => {
   console.log("Atin Tanwar ===============>")
    const today = new Date();
    let total = 0;
    assets.forEach((asset) => {
       total = total + asset.amount;
    });
    services.forEach((service) => {
       total = total + service.amount;
    })

return `
    <!doctype html>
    <html>
       <head>
          <meta charset="utf-8">
          <title>PDF Result Template</title>
          <style>
             .invoice-box {
             max-width: 800px;
             margin: auto;
             padding: 30px;
             border: 1px solid #eee;
             box-shadow: 0 0 10px rgba(0, 0, 0, .15);
             font-size: 16px;
             line-height: 24px;
             font-family: 'Helvetica Neue', 'Helvetica',
             color: #555;
             }
             .margin-top {
             margin-top: 50px;
             }
             .justify-center {
             text-align: center;
             }
             .invoice-box table {
             width: 100%;
             line-height: inherit;
             text-align: left;
             }
             .invoice-box table td {
             padding: 5px;
             vertical-align: top;
             }
             .invoice-box table tr.top table td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.top table td.title {
             font-size: 45px;
             line-height: 45px;
             color: #333;
             }
             .invoice-box table tr.information table td {
             padding-bottom: 40px;
             }
             .invoice-box table tr.heading td {
             background: #eee;
             border-bottom: 1px solid #ddd;
             font-weight: bold;
             }
             .invoice-box table tr.details td {
             padding-bottom: 20px;
             }
             .invoice-box table tr.item td {
             border-bottom: 1px solid #eee;
             }
             .invoice-box table tr.item.last td {
             border-bottom: none;
             }
             .invoice-box table tr.total td:nth-child(2) {
             border-top: 2px solid #eee;
             font-weight: bold;
             }
             @media only screen and (max-width: 600px) {
             .invoice-box table tr.top table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             .invoice-box table tr.information table td {
             width: 100%;
             display: block;
             text-align: center;
             }
             }
          </style>
       </head>
       <body>
       
          <div class="invoice-box">
          <h1>Purchase Order</h1>
             <table cellpadding="0" cellspacing="0" style="width:100%">
                <tr class="top">
                   <td colspan="2">
                      <table>
                         <tr>
                            <td>
                               Date: ${`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}`}
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr class="information" style="width:100%">
                   <td colspan="4">
                      <table style="width:100%">
                         <tr style="width:100%">
                            <td style="width:250px">
                               Issued By: ${issuedBy}
                            </td>
                            <td  style="width:550px">
                               Expected Date Of Delievery: ${expDateOfDelievery}
                            </td>
                         </tr>
                      </table>
                   </td>
                </tr>
                <tr class="heading">
                   <td>Assets Ordered</td>
                   <td>Asset</td>
                   <td>Rate</td>
                   <td>Quantity</td>
                   <td>Amount</td>
                </tr>
                ${assets.map((item,i) => {
                  return `<tr class="item">
                  <td>${i+1}</td>
                  <td>${item.purchaseOrderName}</td>
                  <td>$${item.rate}</td>
                  <td>${item.quantity}</td>
                  <td>$${item.amount}</td>
               </tr>` 
                })}
                </table>
                <table style="width:100%;margin-top:100px">
                <tr class="heading">
                   <td>Services Ordered</td>
                   <td>Service</td>
                   <td>Rate</td>
                   <td>Quantity</td>
                   <td>Amount</td>
                   <td>Service Start Date</td>
                   <td>Service End Date</td>
                </tr>
                ${services.map((item,i) => {
                  return `<tr class="item">
                  <td>${i+1}</td>
                  <td>${item.purchaseOrderName}</td>
                  <td>$${item.rate}</td>
                  <td>${item.quantity}</td>
                  <td>$${item.amount}</td>
                  <td>${item.serviceStartDate}</td>
                  <td>${item.serviceEndDate}</td>
               </tr>` 
                })}
             </table>
             <br />
             <h1 class="justify-center">Total price:$${total}</h1>
          </div>
       </body>
    </html>
    `;
};