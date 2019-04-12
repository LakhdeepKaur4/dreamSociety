import React, {Component} from 'react';
import { connect } from 'react-redux';
import {getMaintenanceSubSizeDetails,deleteMaintenanceSubMasterDetail,
    getMaintenanceType,getMaintenanceSubSize,
    updateMaintenanceSubMasterDetail,
    deleteSelectedMaintenanceSubMasterDetail} from '../../actionCreators/maintenanceSubMasterAction'
import SearchFilter from '../../components/searchFilter/searchFilter';
import { Table, Button, Modal, FormGroup, ModalBody, ModalHeader, Input, Label } from 'reactstrap';
import '../../r-css/w3.css';
import UI from '../../components/newUI/superAdminDashboard';
import DefaultSelect from '../../constants/defaultSelect';
import Spinner from '../../components/spinner/spinner';


class MaintenanceSubMasterDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            filterName: 'category',
            maintenanceTypeId:"",
            ids:[],
            category:"",
            sizeType:"",
            rate:"",
            maintenanceId:"",
            sizeId:"",
            search: "",
            isDisabled: true,
            loading:true,
            errors:{},
            editSubMaintenanceModal: false,
            modalLoading: false,
        }
        this.delete = this.delete.bind(this);
        this.edit = this.edit.bind(this)
    }

    componentDidMount(){
        this.refreshData();
    }

    refreshData(){
        this.props.getMaintenanceSubSizeDetails().then(() => this.setState({loading:false})).catch((err) => this.setState({loading:false}));
        this.props.getMaintenanceType().then(() => this.setState({loading:false})).catch((err) => this.setState({loading:false}));;
        this.props.getMaintenanceSubSize().then(() => this.setState({loading:false})).catch((err) => this.setState({loading:false}));;
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
        this.setState({loading:true, isDisabled:true});
        this.props.deleteMaintenanceSubMasterDetail(maintenanceTypeId)
        .then(() => this.refreshData())
    }

    edit = (maintenanceTypeId,category, sizeType, rate,maintenanceId,sizeId) => {
        this.setState({maintenanceTypeId,category, sizeType, rate,maintenanceId,sizeId, editSubMaintenanceModal: !this.state.editSubMaintenanceModal})
    }

    modalRefresh = () => {
        this.props.getMaintenanceSubSizeDetails().then(() => this.setState({modalLoading:false,
            editSubMaintenanceModal: !this.state.editSubMaintenanceModal}))
    }

    update = (e) => {
        e.preventDefault();
        let {maintenanceTypeId, category, sizeType, rate, maintenanceId, sizeId} = this.state;
        let errors = {};
        if(!this.state.rate){
            errors.rate = `Rate can't be empty.`
        }
        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0;
        if(isValid){
            this.setState({modalLoading:true})
            this.props.updateMaintenanceSubMasterDetail(maintenanceTypeId, category, sizeType, rate, maintenanceId, sizeId)
            .then(() => this.modalRefresh())
            .catch(err => { err
                this.setState({modalLoading:false})
            });
        }
    }

    searchFilter = (search) =>{
        return (x) => {
            if(x){
                return x.maintenance_master.category.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
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
            return sizeDetails.maintenanceType.sort((item1,item2)=>{
                var cmprVal = (item1.maintenance_master[this.state.filterName].localeCompare(item2.maintenance_master[this.state.filterName]))
                return this.state.sortVal ? cmprVal : -cmprVal;
            }).filter(this.searchFilter(this.state.search)).map((item, index) => {
                let maintenanceCategory = item.maintenance_master.category;
                let sizeType= item.size_master.sizeType;
                let sizeTypeId = item.size_master.sizeId;
                return (
                    <tr key={item.maintenanceTypeId}>
                        <td><input type="checkbox" name="ids" className="SelectAll"  value={item.maintenanceTypeId}
                         onChange={(e) => {
                            let {maintenanceTypeId} = item
                            if(!e.target.checked){
                                document.getElementById('allSelect').checked=false;
                                let indexOfId = this.state.ids.indexOf(maintenanceTypeId);
                                if(indexOfId > -1){
                                    this.state.ids.splice(indexOfId, 1)
                                }
                                if(this.state.ids.length === 0){
                                    this.setState({isDisabled: true})
                                }
                            }
                            else{
                                this.setState({ids: [...this.state.ids, maintenanceTypeId]});
                                if(this.state.ids.length >= 0){
                                    this.setState({isDisabled: false})
                                }
                            }
                            
                                
                             }}/></td>
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

    rateChange = (e) => {
        if (e.target.value.match(/^\d*(\.\d{0,2})?$/)){
            this.setState({[e.target.name]:e.target.value});
        }
    }

    fetchMaintenanceType({maintenanceType}){
        if(maintenanceType){
           return maintenanceType.maintenance.map((item) => {
               return (
                   <option key={item.maintenanceId} value={item.maintenanceId}>{item.category}</option>
               );
           })
        }
    }

    deleteSelectedSubMaintenance(ids){
        this.setState({loading:true, isDisabled: true});
        this.props.deleteSelectedMaintenanceSubMasterDetail(ids)
        .then(() => this.refreshData())
        .catch(err => err.response);
    }

    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/'); 
    }

    selectAll = () => {
        let selectMultiple = document.getElementsByClassName('SelectAll');
        let ar =[];
            for(var i = 0; i < selectMultiple.length; i++){
                    ar.push(parseInt(selectMultiple[i].value));
                    selectMultiple[i].checked = true;
            }
            this.setState({ids: ar});
            if(ar.length > 0){
                this.setState({isDisabled: false});
            }
    }

    unSelectAll = () =>{
        
        let unSelectMultiple = document.getElementsByClassName('SelectAll');
        let allIds = [];
        for(var i = 0; i < unSelectMultiple.length; i++){
                unSelectMultiple[i].checked = false
        }
        
        this.setState({ids: [ ...allIds]});
        if(allIds.length === 0){
            this.setState({isDisabled: true});
        }
        
    }

    changePassword=()=>{ 
        return this.props.history.replace('/superDashboard/changePassword')
     }

    render(){
        console.log(this.props)
        let tableData = <Table className="table table-bordered">
        <thead>
            <tr>
                <th style={{alignContent:'baseline'}}></th>
                <th>#</th>
                <th style={{cursor:'pointer'}} onClick={()=>{
                             this.setState((state)=>{return {sortVal:!state.sortVal,
                                filterName:'category'}});
                        }}>Maintenance Type<i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                <th>Size</th>
                <th>Price</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {this.fetchMaintenanceDetails(this.props.MaintenanceSubMaster)}
        </tbody>
    </Table>
    let deleteSelectedButton = <Button
     disabled={this.state.isDisabled}
     color="danger"
    className="mb-3"
     onClick={this.deleteSelectedSubMaintenance.bind(this, this.state.ids)}>Delete Selected</Button>

     let modalData = <div>
                        <FormGroup>
                        <Label>Maintenance Category</Label>
                        <Input name="maintenanceId"  type="select" value={this.state.maintenanceId}
                        onChange={this.editInputChange}>
                            <DefaultSelect />
                            {this.fetchMaintenanceType(this.props.MaintenanceSubMaster)}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Size Type</Label>
                        <Input name="sizeId" type="select" value={this.state.sizeId}
                        onChange={this.editInputChange}>
                            <DefaultSelect />
                            {this.fetchSize(this.props.MaintenanceSubMaster)}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Price</Label>
                        <Input name="rate" type="text" value={this.state.rate}
                        onChange={this.rateChange} maxLength="16" />
                        {!this.state.rate ? <span className="error">{this.state.errors.rate}</span>: null}
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit" color="primary" onClick={this.update}>Save</Button>{' '}
                        <Button color="danger" onClick={this.toggleEditSubMaintenanceModal.bind(this)}>Cancel</Button>
                    </FormGroup>
                </div>

        return(
            <UI onClick={this.logout} change={this.changePassword}>
                <div className="w3-container w3-margin-top w3-responsive">
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                    </div>
                    <div className="top-details">
                        <h3>Maintenance Sub Master Details</h3>
                        <Button color="primary" onClick={this.route} color="primary">Add Sub Maintenance</Button>
                    </div>
                    <Modal isOpen={this.state.editSubMaintenanceModal} toggle={this.toggleEditSubMaintenanceModal.bind(this)}>
                        <ModalHeader toggle={this.toggleEditSubMaintenanceModal.bind(this)}>Edit Sub Maintenance</ModalHeader>
                        <ModalBody>
                            {!this.state.modalLoading ? modalData : <Spinner />}
                        </ModalBody>
                    </Modal>
                    <SearchFilter type="text" value={this.state.search}
                                onChange={this.searchOnChange} />
                    {deleteSelectedButton}
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
    deleteSelectedMaintenanceSubMasterDetail,
    updateMaintenanceSubMasterDetail})(MaintenanceSubMasterDetails);