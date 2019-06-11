import React, { Component } from 'react';
import CanvasJSReact from '../../../components/canvasjs.react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class VendorComplaintData extends Component {
	state={
		complaints:50,
		rejected:15,
		toDO:5,
		inProgress:20,
		completed:20
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
					{ y: this.state.complaints, label: " Registered	" },
					{ y: this.state.rejected, label: "Rejected" },
					{ y: this.state.toDO, label: "ToDO" },
					{ y: this.state.inProgress, label: "inProgress" },
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