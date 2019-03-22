import React, { Component } from 'react';
import OtpInput from 'react-otp-input';
import UI from '../newUI/loginDashboard';
import axios from 'axios';
import {URN} from '../../actions/index';
 
export default class AccountVarification extends Component {
  state={
    otp:''
  }

  submit=()=>{
    console.log(this.state.otp)
   axios.post(`${URN}/ownerActivation`,this.state.otp)
   .then((response)=>response.data)
  }
  render() {
    return (
      <div>
          <UI>
             <h2>Submit OTP</h2> 
        <OtpInput
        inputStyle={{width: '20px'}}
          onChange={otp => this.setState({otp})}
          numInputs={6}
          separator={<span>-</span>}
        />
        <span><button style={{marginTop:'10px'}} onClick={this.submit}>Submit</button></span>
        <span><button style={{marginTop:'10px', marginLeft:'4px'}}>Resend</button></span>
        </UI>
      </div>
      
    )
}
}   