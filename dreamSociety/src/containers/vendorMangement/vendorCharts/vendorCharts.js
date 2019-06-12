import React, { Component } from 'react';

import '../../chart/chart.css';
import VendorComplaintData from './vendorComplaintData';
import VendorPaymentChart from './vendorPaymentChart';
import VendorSchedule from './vendorSchedule';

class VendorCharts extends Component {


  render() {
    return (
      <div>
      
       <div className='row'>    
      <div className="col-4 mt-5">
              <VendorComplaintData />
            </div>
            <div className="col-4 mt-5">
              <VendorPaymentChart />
            </div>
            <div className="col-4 mt-5">
              <VendorSchedule/>
            </div>
</div>    
   
      </div>
    )
  }
}
export default VendorCharts;
