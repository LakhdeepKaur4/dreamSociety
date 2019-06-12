import React, { Component } from 'react';

import EmployeeComplaintPieChart from './employeeComplaintChart';
import EmployeeLeaveBalanceChart from './employeeLeaveBalanceChart';
import EmployeeTaxDetailChart from './employeeTaxDetailChart';
import './../chart/chart.css';


class EmployeeChart extends Component {


  render() {
    return (

      <div>
      
      <div className='row'>    
     <div className="col-4 mt-5">
     <EmployeeComplaintPieChart />
           </div>
           <div className="col-4 mt-5">
           <EmployeeLeaveBalanceChart/>
           </div>
           <div className="col-4 mt-5">
           <EmployeeTaxDetailChart/>
           </div>
</div>    
  
     </div>
    )
  }
}
export default EmployeeChart;