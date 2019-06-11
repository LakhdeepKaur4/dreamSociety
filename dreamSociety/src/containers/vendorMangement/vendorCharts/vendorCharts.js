import React, { Component } from 'react';

import '../../chart/chart.css';
import VendorComplaintData from './vendorComplaintData';

class VendorCharts extends Component {


  render() {
    return (
      <div>
      
           
      <div className="col-4 mt-5">
              <VendorComplaintData />
            </div>
          

   
      </div>
    )
  }
}
export default VendorCharts;
