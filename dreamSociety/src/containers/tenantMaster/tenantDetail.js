import React, { Component } from 'react';
import UI from '../../components/newUI/superAdminDashboard';
import { FormGroup, Input, Table, Label, Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import DefaultSelect from '../../constants/defaultSelect';
import SearchFilter from '../../components/searchFilter/searchFilter';
import { getTenantDetail, deleteTenant, deleteSelectedTenant } from '../../actionCreators/tenantMasterAction';
import {URN1,PicURN} from '../../actions/index'
import { connect } from 'react-redux';
import GoogleDocsViewer from 'react-google-docs-viewer';

class TenantDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            search:'',
            ids:[],
            isActive: false,
            isDisabled: true
        }
    }

    componentDidMount(){
        this.props.getTenantDetail()
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/');
    }

    route = () => {
        this.props.history.push('/superDashBoard/addTenant');
    }

    searchOnChange = (e) => {
        this.setState({search:e.target.value})
    }

    selectAll = () => {
        let selectMultiple = document.getElementsByClassName('SelectAll');
        let ar = [];
        for (var i = 0; i < selectMultiple.length; i++) {
            ar.push(parseInt(selectMultiple[i].value));
            selectMultiple[i].checked = true;
        }
        this.setState({ ids: ar });
        if(ar.length > 0){
            this.setState({isDisabled: false});
        }
    }
    unSelectAll = () => {
        let allIds = []
        let unSelectMultiple = document.getElementsByClassName('SelectAll');
        for (var i = 0; i < unSelectMultiple.length; i++) {
            unSelectMultiple[i].checked = false
        }
      
        this.setState({ ids: [...allIds] });
        if(allIds.length === 0){
            this.setState({isDisabled: true});
        }
    }

    delete(id){
        console.log(id)
        this.props.deleteTenant(id).then(() => this.props.getTenantDetail())
    }

    renderList = ({getTenantDetail}) => {
        console.log(getTenantDetail)
        if(getTenantDetail){
            return getTenantDetail.tenants.map((item, index) => {
                if(item){
                    return (
                        <tr key={item.tenantId}>
                            <td><input type="checkbox" name="ids" value={item.tenantId} className="SelectAll"
                             onChange={(e, i) => {
                                const {tenantId} = item
                                if(!e.target.checked){
                                    if(this.state.ids.length>-1){
                                        document.getElementById('allSelect').checked=false;
                                    let indexOfId = this.state.ids.indexOf(tenantId);
                                    if(indexOfId > -1){
                                        this.state.ids.splice(indexOfId, 1)
                                    }
                                    if(this.state.ids.length === 0){
                                        this.setState({isDisabled: true})
                                    }
                                }
                            }
                                else {
                                    this.setState({ids: [...this.state.ids, tenantId]})
                                    if(this.state.ids.length >= 0){
                                        this.setState({isDisabled: false})
                                    }
                            } 
                                 }}/></td>
                            <td>{index + 1}</td>
                            <td style={{width:'4%'}}><img style={{ width: "100%", height: "20%" }} src={PicURN+item.picture} alt="Profile Pic" /></td>
                            <td>{item.tenantName}</td>
                            <td>{item.contact}</td>
                            <td>{item.permanentAddress}</td>
                            <td>{item.towerName}</td>
                            <td>{item.flat_detail_master ? item.flat_detail_master.flatNo : false}</td>
                            <td>
                                <Button color="success" className="mr-2">Edit</Button>
                                <Button color="danger" onClick={this.delete.bind(this, item.tenantId)}>Delete</Button>
                            </td>
                        </tr>
                    )
                }
                else return false
            })
        }
    }

    deleteSelected(ids){
        this.setState({loading:true, isDisabled: true});
        this.props.deleteSelectedTenant(ids)
        
        .then(() => this.props.getTenantDetail())
        .catch(err => err);
    }

    render(){

        let TableData = <Table>
                           <thead>
                                <tr>
                                    <th></th>
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
                                {this.renderList(this.props.tenantReducer)}
                            </tbody>
                        </Table>

        return(
            <UI onClick={this.logout}>
                <div className="w3-container w3-margin-top w3-responsive">
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                    </div>
                    <div className="top-details">
                        <h3>Tenant Details</h3>
                        <Button color="primary" onClick={this.route} color="primary">Add Tenant</Button>
                    </div>
                    <SearchFilter type="text" value={this.state.search}
                                onChange={this.searchOnChange} />
                     <Button color="danger" disabled={this.state.isDisabled} className="mb-3"
                        onClick={this.deleteSelected.bind(this, this.state.ids)}>Delete Selected</Button>
                    <Label htmlFor="allSelect" style={{alignContent:'baseline',marginLeft:"10px",fontWeight:"700"}}>Select All<input className="ml-2"
                    id="allSelect"
                    type="checkbox" onChange={(e) => {
                            if(e.target.checked) {
                                this.selectAll();
                            }
                            else if(!e.target.checked){
                                this.unSelectAll();
                            } 
                        }  
                    }/></Label>
                    {TableData}
                </div>
            </UI>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        tenantReducer:state.tenantReducer
    }
}

export default connect(mapStateToProps, {getTenantDetail, deleteTenant, deleteSelectedTenant})(TenantDetail);




