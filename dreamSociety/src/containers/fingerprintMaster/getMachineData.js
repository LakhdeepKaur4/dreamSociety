import React, { Component } from 'react';
import {getMachineData,getMachineDetails,disableMachine} from '../../actions/fingerprint';
import UI from '../../components/newUI/superAdminDashboard';
import { connect } from 'react-redux';
import { Table, Col, Row, Form, Button, FormGroup } from 'reactstrap';
import Spinner from '../../components/spinner/spinner';

let flatDetailId;
let userId;
class Machine extends Component {
          constructor(props){
              super(props);

              this.state={
                  userId:'',
                

              }
          }

    

    refreshData=()=>{
        flatDetailId=localStorage.getItem("flatDetailId")
        userId=localStorage.getItem("userId")
        this.setState({userId})
        console.log(userId)
        console.log(flatDetailId)
        this.props.getMachineData(flatDetailId);
    }

    componentDidMount=()=>{
        this.refreshData(flatDetailId);
    }

    machineResult=()=>{
        var tokendata=localStorage.getItem('token')
        console.log(tokendata);
        console.log(this.state.userId)
        this.props.getMachineDetails(this.state.userId)
    }

    disableResult=()=>{
        this.props.disableMachine(this.state.userId)
    }

    fingerPrintData=()=>{
         this.props.history.push('/superDashboard/getFingerPrintData');
    }
    
    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/');
    }

    close = () => {
        return this.props.history.replace('/superDashBoard');
    }

    getFingerprintData=({machineDetails})=>{
          if(machineDetails && machineDetails.machinesDetail){
              console.log(machineDetails);
           return (
                <tr >
                   <td>{machineDetails.machinesDetail[0].machine_detail_master.machineActualId}</td>  
                   <td>{machineDetails.machinesDetail[0].flat_detail_master.flatNo}</td> 
                    <td><Button color="success mr-2" onClick={this.machineResult}>Enable</Button> 
                       <Button color="danger" onClick={this.disableResult}>Disable</Button>
                    </td>
                </tr>
           
           )
          }
    }

    render() {
        console.log(this.state.userId)

        let tableData = <Table bordered>
            <thead>
                <tr>
                    {/* <th style={{ width: '4%' }}></th> */}
                    {/* <th style={{ width: '4%' }}>#</th> */}
                    <th>Machine Id</th>
                    <th>Flat No</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {this.getFingerprintData(this.props.fingerprintReducer)}
            </tbody>
        </Table>
        return (
            <UI onClick={this.logout} change={this.changePassword}>
                <div className="w3-container w3-margin-top w3-responsive">
                    <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                        <span aria-hidden="true">&times;</span>
                    </div>
                    <div className="top-details">
                        <h3 align="center">Finger Print Data Master</h3>
                        <Button color="primary" onClick={this.fingerPrintData}>Finger Print Data Master</Button>
                    </div>
                    {/* {(this.state.loading) ? <Spinner /> : tableData} */}
                    {tableData}
                </div>
            </UI>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state,"state=============")
    return {
        fingerprintReducer: state.fingerprintReducer,
    }
}
export default connect(mapStateToProps, {getMachineData,getMachineDetails,disableMachine})(Machine);