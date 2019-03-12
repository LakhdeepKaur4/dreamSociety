import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getOwnerList} from '../../actionCreators/flatOwnerAction';
import UI from '../../components/newUI/superAdminDashboard';
import SearchFilter from '../../components/searchFilter/searchFilter';
import { Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Input, Table, Label } from 'reactstrap';

class FlatMemberList extends Component {
    render() {
        return (
            <div>
                 <UI onClick={this.logout}>
                <div className="w3-container w3-margin-top w3-responsive">
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                                <span aria-hidden="true">&times;</span>
                            </div>
                        <div className="top-details">
                            <h3>Flat Member List</h3>
                            <Button color="primary" onClick={() => this.props.history.push('/superDashBoard/flatOwnerDetail')} id="addOwner" >Add Member</Button>
                            {/* {tableData} */}
                        </div>
                        <div>
                            {/* <SearchFilter type="text" value={this.state.search}
                                onChange={this.searchOnChange} /> */}
                            {/* {deleteSelectedButton} */}
                                 <Label htmlFor="allSelect" style={{alignContent:'baseline',marginLeft:"10px",fontWeight:"700"}}>Select All<input
                type="checkbox" id="allSelect" className="ml-2" onChange={(e) => {
                            if (e.target.checked) {
                                this.selectAll();
                            }
                            else if (!e.target.checked) {
                                this.unSelectAll();
                            }
                        }
                        } /></Label>
                        {/* {tableData} */}
                        </div>
                    </div>
                        </UI>
            </div>
        );
    }
}
function mapStateToProps (state){
    return{
        Owner:state.FlatOwnerReducer,
    }
}
function mapDispatchToProps(dispatch){
return bindActionCreators({ getOwnerList },dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(FlatMemberList);