import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import {changePassword} from '../../actionCreators/changePasswordAction';
import UI from '../../components/newUI/superAdminDashboard';
import {Form, Button,  FormGroup,  Input, Label } from 'reactstrap';
import Spinner from '../../components/spinner/spinner';


class Dashboard extends Component{

    constructor(props){
        super(props);

        this.state={
           
        }

    }
    
    render(){
        return(
          <div>
              <UI>
                  <div>
                      Dashboard
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

export default (connect(mapStateToProps, mapDispatchToProps)(Dashboard));