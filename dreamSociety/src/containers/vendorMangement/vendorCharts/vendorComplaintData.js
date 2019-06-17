import React, { Component } from 'react';
import CanvasJSReact from '../../../components/canvasjs.react';
import {URN} from '../../../actionCreators/index';
import axios from 'axios';
import { authHeader } from "../../../helper/authHeader";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class VendorComplaintData extends Component {
	state={
		accepted:'',
		assigned:'',
		todo:'',
		inprogress:'',
		completed:''
		}

	componentDidMount() {
        axios.get(`${URN}/vendorChart`,{headers:authHeader()})
          .then(res => {
			console.log(res.data);
			this.getData(res.data)
		  })
		}
		getData=(data)=>{
this.setState({
	accepted:data.accepted,
	assigned:data.assigned,
	todo:data.todo,
	inprogress:data.inprogress,
	completed:data.completed
	

})
}



	render() {
		const options = {
			animationEnabled: false,
			title: {
				text: "Complaints"
			},
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}%",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 12,     
				indexLabel: "{label} - {y}%",
				dataPoints: [
					{ y: this.state.accepted, label: " Registered" },
					{y: this.state.assigned, label: "assigned"},
					{ y: this.state.todo, label: "ToDO" },
					{ y: this.state.inprogress, label: "InProgress" },
					{ y: this.state.completed, label: "Completed" },
					
				]
			}],
		
	
		}
		
		return (
		<div>
			
			<CanvasJSChart options = {options}
 
				onRef={ref => this.chart = ref} />
			
		</div>
		);
	}
}

export default VendorComplaintData;