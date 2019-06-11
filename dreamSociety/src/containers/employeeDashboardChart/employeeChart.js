import React, { Component } from 'react';

import EmployeeComplaintPieChart from './employeeComplaintChart';
import './../chart/chart.css';


class EmployeeChart extends Component {


  render() {
    return (
      <div>
        <div className="largeShow smallHide">
          <div className="row">
            <div className="col-4 mt-5">
              <EmployeeComplaintPieChart />
            </div>
           
          </div>
        </div>
        <div className="smallShow largeHide">
          
            <div className="col mt-5">
              <EmployeeComplaintPieChart />
            </div>
           
          
        </div>
      </div>
    )
  }
}
export default EmployeeChart;