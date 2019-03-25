import React from 'react';
import UI from '../newUI/loginDashboard';
import axios from 'axios';
import {URN} from '../../actions/index';

class  TokenVerification extends React.Component {
    state={
        tokenVerified:'' ,
        message:''
    }
    componentDidMount(){
        axios.post(`${URN}/checkToken?${window.location.href.split('?')[1]}`)
        .then((response)=>{
            this.setState({
                message:response.data.message
            })
            console.log(response.data.message)
            if(response.data.tokenVerified){
              
                return this.props.history.push(`/login/accountVerification?${window.location.href.split('?')[1]}`)
            }
            else {
                
                return this.props.history.push('/login/tokenVerification')
            }
        })
    }
    sendLogin=()=>{
        return this.props.history.push('/')
       }
render(){
    return (
        <div>
             <UI>
             <h2 style={{color:'red'}}>{this.state.message}</h2> 
             <span><button style={{marginTop:'10px', marginLeft:'4px',display:!this.state.tokenVerified?'block':'none'}} onClick={this.sendLogin}>login</button></span>
        </UI>
        </div>
    );
}
};

export default TokenVerification;