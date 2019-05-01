import React, { Component } from 'react';

import FlatPieChart from './flatpiechart';
import UserPieChart from './userPieChart';
import  InventoryPieChart from './inventoryPieChart';

class Chart extends Component {
  

render(){
return(
<div className="container">
  <div className="row">
    <div className="col-sm">
 <FlatPieChart/>
    </div>
    <div className="col-sm">
	<UserPieChart/>
     
    </div>
    <div className="col-sm">
	<InventoryPieChart/>
     
    </div>
  </div>
</div> 
)
}
}
export default Chart;
