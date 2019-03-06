import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';
import { Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Input, Table, Label } from 'reactstrap';
import {getOwnerList} from '../../actionCreators/flatOwnerAction'
class FlatOwnerList extends Component {
    constructor(props){
        super(props);
        this.state={
            profilePic:'',
            ownerName:'',
            contactNo:'',
            permanentAddress:'',
            towerName:'',
            flatNo:''
        }
    }
    componentDidMount(){
        this.props.getOwnerList();
    }
    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }
    renderList({ownerList}){
        console.log('jkljfkldjfkdjfkldjjjjjjjjjjjjjjjjjjjjjjjjjj',ownerList)
        if(ownerList){
            console.log('ownerList',ownerList)
        }
    }
    render() {
        let tableData;
        tableData = <Table className="table table-bordered">
            <thead>
                <tr>
                <th style={{alignContent:'baseline'}}>Select All<input
                type="checkbox" id="allSelect" className="ml-2" onChange={(e) => {
                            if(e.target.checked) {
                                this.selectAll();
                            }
                            else if(!e.target.checked){
                                this.unSelectAll();
                            } 
                        }  
                    }/></th>
                    <th>#</th>
                    <th>Profile Pic</th>
                    <th>Name</th>
                    <th>Contact No.</th>
                    <th>Permanent Address</th>
                    <th>Tower Name</th>
                    <th>Flat No.</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {this.renderList(this.props.Owner)}
            </tbody>
        </Table>

        return (
            <div>
                <UI onClick={this.logout}>
                <div className="w3-container w3-margin-top w3-responsive">
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                                <span aria-hidden="true">&times;</span>
                            </div>
                        <div className="top-details">
                            <h3>Flat Owner List</h3>
                            <Button color="primary" onClick={() => this.props.history.push('/superDashBoard')} id="addOwner" >Add Owner</Button>
                            {tableData}
                        </div>
                        </div>
                </UI>
            </div>
        );
    }
}
function mapStateToProps(state){
    console.log(state.FlatOwnerReducer)
    return{
    Owner:state.FlatOwnerReducer
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({ getOwnerList },dispatch)
}

export default  connect(mapStateToProps,mapDispatchToProps)(FlatOwnerList);