import React, {Component} from 'react';
import { connect } from 'react-redux';
import {getMaintenanceSubSizeDetails,deleteMaintenanceSubMasterDetail,
    getMaintenanceType,getMaintenanceSubSize,
    updateMaintenanceSubMasterDetail} from '../../actionCreators/maintenanceSubMasterAction'
import SearchFilter from '../../components/searchFilter/searchFilter';
import { Table, Button, Modal, FormGroup, ModalBody, ModalHeader, Input, Label } from 'reactstrap';
import '../../r-css/w3.css';
import UI from '../../components/newUI/superAdminDashboard';

import Spinner from '../../components/spinner/spinner';

class MaintenanceSubMasterDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            maintenanceTypeId:"",
            category:"",
            sizeType:"",
            rate:"",
            maintenanceId:"",
            sizeId:"",
            search: "",
            loading:true,
            errors:{},
            editSubMaintenanceModal: false
        }
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this)
    }

    componentDidMount(){
        this.refreshData();
    }

    refreshData(){
        this.props.getMaintenanceSubSizeDetails().then(() => this.setState({loading:false}));
        this.props.getMaintenanceType().then(() => this.setState({loading:false}));
        this.props.getMaintenanceSubSize().then(() => this.setState({loading:false}));
    }
    

    toggleEditSubMaintenanceModal(){
        this.setState({editSubMaintenanceModal: !this.state.editSubMaintenanceModal})
    }


    close=()=>{
        return this.props.history.replace('/superDashBoard');
    }
    route = () => {
        return this.props.history.replace('/superDashboard/MaintenanceSubMasterForm')
    }

    delete(maintenanceTypeId){
        this.setState({loading:true});
        this.props.deleteMaintenanceSubMasterDetail(maintenanceTypeId)
        .then(() => this.refreshData())
    }

    edit = (maintenanceTypeId,category, sizeType, rate,maintenanceId,sizeId) => {
        this.setState({maintenanceTypeId,category, sizeType, rate,maintenanceId,sizeId, editSubMaintenanceModal: !this.state.editSubMaintenanceModal})
    }

    update = (e) => {
        e.preventDefault();
        let {maintenanceTypeId, category, sizeType, rate, maintenanceId, sizeId} = this.state;
        let errors = {};
        if(!this.state.rate){
            errors.rate = `Can't be empty.`
        }
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0;
        if(isValid){
            this.props.updateMaintenanceSubMasterDetail(maintenanceTypeId, category, sizeType, rate, maintenanceId, sizeId)
            .then(() => this.refreshData())
            this.setState({loading:true,editSubMaintenanceModal: !this.state.editSubMaintenanceModal});
        }
       
    
    }

    searchFilter = (search) =>{
        return (x,y) => {
            if(x,y){
                return y.toString().indexOf(search) !== -1 ||
                x.maintenance_master.category.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                x.size_master.sizeType.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                x.rate.toString().indexOf(search) !== -1
            }
        }
    }

    searchOnChange = (e) => {
        this.setState({search:e.target.value})
    }

    fetchMaintenanceDetails({sizeDetails}) {
        if(sizeDetails){
            return sizeDetails.maintenanceType.filter(this.searchFilter(this.state.search)).map((item, index) => {
                let maintenanceCategory = item.maintenance_master.category;
                let sizeType = item.size_master.sizeType;
                let sizeTypeId = item.size_master.sizeId;
                return (
                    <tr key={item.maintenanceTypeId}>
                        <td>{index + 1}</td>
                        <td>{maintenanceCategory}</td>
                        <td>{sizeType}</td>
                        <td>{item.rate}</td>
                        <td>
                            <Button className="mr-2" color="success" onClick={this.edit.bind(this,item.maintenanceTypeId,maintenanceCategory,sizeType,item.rate,item.maintenanceId,sizeTypeId)}>Edit</Button>
                            <Button color="danger" onClick={this.delete.bind(this,item.maintenanceTypeId)}>Delete</Button>
                        </td>
                    </tr>
                );
            })
        }
    }

    editInputChange = (e) => {
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value, errors });
        }
        else {
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    fetchSize({size}){
        if(size){
            return size.map((sizeItem) => {
                return (
                    <option key={sizeItem.sizeId} value={sizeItem.sizeId}>{sizeItem.sizeType}</option>
                );
            });
        }
    }

    fetchMaintenanceType({maintenanceType}){
        if(maintenanceType){
           return maintenanceType.maintenance.map((item) => {
               return (
                   <option key={item.maintenanceId} value={item.maintenanceId}>{item.category}</option>
               )
           })
        }
    }

    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }

    render(){
        let tableData = <Table className="table table-bordered">
        <thead>
            <tr>
                <th>#</th>
                <th>Maintenance Type</th>
                <th>Size</th>
                <th>Price</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {this.fetchMaintenanceDetails(this.props.MaintenanceSubMaster)}
        </tbody>
    </Table>
        return(
            <UI onClick={this.logout}>
                <div className="w3-container w3-margin-top w3-responsive">
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                    </div>
                    <div className="top-details">
                        <h3>Maintenance Sub Master Details</h3>
                        <Button color="primary" onClick={this.route} color="primary">Add Maintenance Size</Button>
                    </div>
                    <Modal isOpen={this.state.editSubMaintenanceModal} toggle={this.toggleEditSubMaintenanceModal.bind(this)}>
                        <ModalHeader toggle={this.toggleEditSubMaintenanceModal.bind(this)}>Edit Sub Maintenance</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label>Maintenance Category</Label>
                                <Input name="maintenanceId"  type="select" value={this.state.maintenanceId}
                                onChange={this.editInputChange}>
                                    <option disabled>-- Select --</option>
                                    {this.fetchMaintenanceType(this.props.MaintenanceSubMaster)}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Size Type</Label>
                                <Input name="sizeId" type="select" value={this.state.sizeId}
                                onChange={this.editInputChange}>
                                    <option disabled>-- Select --</option>
                                    {this.fetchSize(this.props.MaintenanceSubMaster)}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Price</Label>
                                <Input name="rate" type="text" value={this.state.rate}
                                onChange={this.editInputChange} />
                                {!this.state.rate ? <span className="error">{this.state.errors.rate}</span>: null}
                            </FormGroup>
                            <FormGroup>
                                <Button type="submit" color="primary" onClick={this.update}>Save</Button>{' '}
                                <Button color="danger" onClick={this.toggleEditSubMaintenanceModal.bind(this)}>Cancel</Button>
                            </FormGroup>
                        </ModalBody>
                        
                    </Modal>
                    <SearchFilter type="text" value={this.state.search}
                                onChange={this.searchOnChange} />
                    {!this.state.loading ? tableData : <Spinner />}
                </div>
            </UI>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        MaintenanceSubMaster: state.MaintenanceSubMaster
    }
}

export default connect(mapStateToProps, 
    {getMaintenanceSubSizeDetails,
    deleteMaintenanceSubMasterDetail,
    getMaintenanceType,
    getMaintenanceSubSize,
    updateMaintenanceSubMasterDetail})(MaintenanceSubMasterDetails);