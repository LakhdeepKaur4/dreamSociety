import 'rc-progress/assets/index.css';
import React, { Component } from 'react';
import UI from '../../components/newUI/superAdminDashboard';
import { Line } from 'rc-progress';

class ProgressStatus  extends Component {
  constructor() {
    super();
    this.state = {
      percent: 0,
      color: '#3FC7FA',
    };
    this.changeState = this.changeState.bind(this);
  }

  changeState() {
    const colorMap = ['#3FC7FA', '#85D262', '#FE8C6A'];
    const value = parseInt(Math.random() * 100, 10);
    this.setState({
      percent: value,
      color: colorMap[parseInt(Math.random() * 3, 10)],
    });
  }

  render() {
 
    const { percent, color } = this.state;
    let form;
    form=<div style={ {width: '250px'}}>
           <h2>Line Progress {percent}%</h2>
        <div >
          <Line percent={percent} strokeWidth="4" strokeColor={color} />
          <Line
            percent={[percent / 2, percent / 2]}
            strokeWidth="4"
            strokeColor={[color, '#CCC']}
          />
          </div>
       
          <p>
            <button onClick={this.changeState}>Change State</button>
          </p>
        </div>


    return (
      <div>
             <UI onClick={this.logout} change={this.changePassword}>
            
       
                    <h3 style={{textAlign:'center', marginBottom: '10px'}}> Status</h3>
                    {form}
             </UI>
      </div>

     
    );
  }
}

export default ProgressStatus;