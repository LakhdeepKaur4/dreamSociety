import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import {userflatDetails,postRegister,serviceDetails} from '../../actionCreators/registerComplainAction';
import UI from '../../components/newUI/ownerDashboard';
import {Form, Button,  FormGroup,  Input, Label,Row, Col } from 'reactstrap';
import Spinner from '../../components/spinner/spinner';
import DefaultSelect from '../../constants/defaultSelect';


class ViewStatusOwner extends Component{

    // constructor(){
    //     this.state={

    //     }
    // }


    render(){
        return(
            <div>
                <UI>
                    <div>
                    ViewStatusOwner
                    </div>
                </UI>
                
            </div>
        )
    }
}

function mapStateToProps(state) {
 
return {

  
}



}
function mapDispatchToProps(dispatch) {
return bindActionCreators({  }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(ViewStatusOwner));
