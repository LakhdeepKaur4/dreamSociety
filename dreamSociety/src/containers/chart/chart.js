import React, { Component } from 'react';

import FlatPieChart from './flatpiechart';
import UserPieChart from './userPieChart';
import  InventoryPieChart from './inventoryPieChart';

class Chart extends Component {
  

render(){
return(
<div class="container">
  <div class="row">
    <div class="col-sm">
 <FlatPieChart/>
    </div>
    <div class="col-sm">
	<UserPieChart/>
     
    </div>
    <div class="col-sm">
	<InventoryPieChart/>
     
    </div>
  </div>
</div> 
)
}
}
export default Chart;
