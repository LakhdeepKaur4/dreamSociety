import React, { Component } from 'react';
import OtpInput from 'react-otp-input';
import UI from '../../components/newUI/loginDashboard';
import axios from 'axios';
import { URN } from '../../actions/index';
 
export default class submitOT extends Component {

    state={
        otp:''
    }

    

    submit=(e)=>{
        e.preventDefault();
        console.log(this.state.otp);
        console.log(window.location.href.split('?')[1])
        const url=window.location.href.split('?')[1]
        console.log(url);
         let {otp} = this.state
        axios.post(`${URN}/otpVerify`,{url,otp})
        .then((response)=>{
          console.log(response.data)
          // localStorage.setItem('url', url1)
          this.props.history.push('/resetpassword?'+ url)
        })
        .catch(err=>console.log(err.response.data.messageErr));
  

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
        <span><button onClick={this.submit} style={{marginTop:'10px'}}>Submit</button></span>
        <span><button style={{marginTop:'10px', marginLeft:'4px'}}>Resend</button></span>
        </UI>
      </div>
      
    )
}
}   