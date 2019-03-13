import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Spinner from '../../components/spinner/spinner';
import {getOwnerMember,deleteMember} from '../../actionCreators/flatOwnerAction';
import UI from '../../components/newUI/superAdminDashboard';
import SearchFilter from '../../components/searchFilter/searchFilter';
import { Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Input, Table, Label } from 'reactstrap';
var id;
class FlatMemberList extends Component {
    constructor(props){
super(props)
this.state={
    loading:true
}
 
    }
    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }
 componentWillMount(){    
     id=localStorage.getItem('ownerId')
 }
componentDidMount(){
    this.props.getOwnerMember(id)
    .then(()=>this.setState({loading:false}))
}
deleteMember(id){
    this.props.deleteMember(id)
    .then(()=> this.props.getOwnerMember(id))
}

renderList=({ownerMember})=>{
     if(ownerMember){
         return ownerMember.memberArr.map((item,index)=>{
           return (
            <tr key={item.memberId}>
            <td></td>
            <td>{index+1}</td>
            <td style={{textAlign:"center",width:'10px'}}>{item.memberName}</td>
            <td style={{textAlign:"center",width:'10px'}}>{item.memberDob}</td>
            <td style={{textAlign:"center",width:'10px'}}>{item.gender}</td>
            <td style={{textAlign:"center"}}>
                        <button className="btn btn-success mr-2" >Edit</button>
                        <button className="btn btn-danger" onClick={this.deleteMember.bind(this,item.memberId)} >Delete</button>
                        </td>

            </tr>
           )
         })
     }
}

    render() {
        let tableData;
        tableData = <Table className="table table-bordered">
            <thead>
                <tr>
                    <th style={{width:"4%"}}></th>
                    <th style={{textAlign:"center",width:"4%"}}>#</th>
                    <th style={{textAlign:"center",width:"8%"}}>Name</th>
                    <th style={{textAlign:"center",width:"16%"}}>Date of Birth</th>
                    <th style={{textAlign:"center"}}>Gender</th>
                    <th style={{textAlign:"center"}}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {this.renderList(this.props.OwnerMemberList)}
            </tbody>
        </Table>
        //   let deleteSelectedButton = <Button color="danger" className="mb-2" disabled={this.state.isDisabled}
        //   onClick={this.deleteSelected.bind(this, this.state.ids)}>Delete Selected</Button>;

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
                        {!this.state.loading ? tableData : <Spinner/>}
                        </div>
                    </div>
                        </UI>
            </div>
        );
    }
}
function mapStateToProps (state){
    console.log(state)
    return{
        OwnerMemberList:state.FlatOwnerReducer,
    }
}
function mapDispatchToProps(dispatch){
return bindActionCreators({ getOwnerMember,deleteMember },dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(FlatMemberList);