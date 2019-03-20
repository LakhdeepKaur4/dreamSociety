import React, { Component } from 'react';
import OtpInput from 'react-otp-input';
import UI from '../newUI/loginDashboard';
 
export default class AccountVarification extends Component {
  render() {
    return (
      <div>
       
          <UI>
             <h2>Submit OTP</h2> 
        <OtpInput
        inputStyle={{width: '20px'}}
          onChange={otp => console.log(otp)}
          numInputs={6}
          separator={<span>-</span>}
        />
        <span><button style={{marginTop:'10px'}}>Submit</button></span>
        <span><button style={{marginTop:'10px', marginLeft:'4px'}}>Resend</button></span>
        </UI>
      </div>
      
    )
}
}   