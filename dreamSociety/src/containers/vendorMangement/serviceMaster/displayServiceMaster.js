import React, { Component } from 'react';
import { getServiceType, getServiceDetail,deleteSelectedService,deleteService } from '../../../actionCreators/serviceMasterAction';
import { connect } from 'react-redux';
import axios from 'axios';
import { authHeader } from '../../../helper/authHeader';
import { bindActionCreators } from 'redux';
import { Button, Modal, FormGroup, ModalBody, ModalHeader, Input, Label, Table } from 'reactstrap';
import { URN } from '../../../actions/index';
import SearchFilter from '../../../components/searchFilter/searchFilter';
import UI from '../../../components/newUI/vendorDashboardInside';
import Spinner from '../../../components/spinner/spinner';



class displayServices extends Component {



    state = {
        editServiceData: {

            serviceId: '',
            serviceName: '',
            service_detail: '',
            serviceDetailId: '',           
            isActive: false
        },
        ids:[], 
        menuVisible: false,
        editServiceModal: false,
        isDisabled:true,
        search: '',
        loading:true,

    }


    componentDidMount() {
        this.refreshData();
   
    }

    componentWillMount() {
        this.refreshData()
    }

    refreshData() {
        this.props.getServiceType().then(()=> this.setState({loading:false}));
        this.props.getServiceDetail().then(()=> this.setState({loading:false}));
    }



   

    deleteService(serviceId){
        this.setState({loading:true})
        let {isActive } =this.state.editServiceData;  
        this.props.deleteService(serviceId,isActive)
            .then(() => this.refreshData())
            this.setState({editServiceData:{isActive:false}})
    }
    


    deleteSelected(ids){
        this.setState({loading:true,
        isDisabled:true});
        this.props.deleteSelectedService(ids)
        .then(() => this.refreshData())
        .catch(err => err.response.data.message);
    }

  
    searchFilter(search) {
        return function (x) {
            return x.serviceName.toLowerCase().includes(search.toLowerCase()) || !search;
        }
    }

    push=()=>{
        this.props.history.push('/superDashboard/serviceMaster')
    }

    toggleEditServiceModal() {
        this.setState({
            editServiceModal: !this.state.editServiceModal
        });
    }

    updateServices() {
        let { serviceName, service_detail, serviceDetailId } = this.state.editServiceData;

        axios.put(`${URN}/service/` + this.state.editServiceData.serviceId, {
            serviceName, service_detail, serviceDetailId
        }, { headers: authHeader() }).then((response) => {
            this.refreshData();

            this.setState({
                editServiceModal: false,loading:true, editServiceData: { serviceId: '', serviceName: '', service_detail: '', serviceDetailId: '' }
            })
        });

    }

    editUser(serviceId, serviceName, service_detail, serviceDetailId) {
        this.setState({

            editServiceData: { serviceId, serviceName, service_detail, serviceDetailId }, editServiceModal: !this.state.editServiceModal
        });

    }


    getDropdown1 = ({ detail }) => {
        if (detail) {
            return detail.service.map((item) => {
                return (
                    <option key={item.serviceDetailId} value={item.serviceDetailId}>
                        {item.service_detail}</option>
                )

            })



        }
    }

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }

    renderList = ({ item }) => {
        if (item) {
            return item.filter(this.searchFilter(this.state.search)).map((item,index) => {
                return (
                    
                    <tr key={item.serviceId}>
                          <td><input type="checkbox" name="ids" className="SelectAll" value={item.serviceId}
                         onChange={(e) => {
                            const {serviceId} = item
                            if(!e.target.checked){
                                document.getElementById('allSelect').checked=false;
                                let indexOfId = this.state.ids.indexOf(serviceId);
                                if(indexOfId > -1){
                                    this.state.ids.splice(indexOfId, 1);
                                }
                                if(this.state.ids.length === 0){
                                    this.setState({isDisabled: true});
                                }
                            }
                            else {
                                this.setState({ids: [...this.state.ids, serviceId]});
                                if(this.state.ids.length >= 0){
                                    this.setState({isDisabled: false})
                                }
                            }
                                
                             }}/></td>
                        <td>{index+1}</td>
                        <td>{item.serviceName}</td>
                        <td>{item.service_detail_master.service_detail}</td>
                        
                        


                        <td>
                            <Button color="success" className="mr-2" onClick={this.editUser.bind(this, item.serviceId, item.serviceName, item.service_detail, item.serviceDetailId)}>Edit</Button>
                        
                            <Button color="danger" onClick={this.deleteService.bind(this, item.serviceId)}>Delete</Button>
                        </td>
                        
                    </tr>
                    

                )
            })
        }
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


    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }

    OnKeyPressUserhandler(event) {
        const pattern = /[a-zA-Z_ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

       
       close=()=>{
        return this.props.history.replace('/superDashBoard')
    }

    render() {
        let tableData;
        tableData=
        <Table className="table table-bordered">
        <thead>
            <tr>
            <th>Select All<input className="ml-2"
                    id="allSelect"
                    type="checkbox" onChange={(e) => {
                            if(e.target.checked) {
                                this.selectAll();
                            }
                            else if(!e.target.checked){
                                this.unSelectAll();
                            } 
                        }  
                    }/></th>
                <th>#</th>
                <th>Service Type</th>
                <th>Service Details</th>
                <th>Actions</th>
                
             
            </tr>
        </thead>

        <tbody>
            {this.renderList(this.props.displayServiceMasterReducer)}
        </tbody>
    </Table>
           let deleteSelectedButton = <Button color="danger" className="mb-2"
           onClick={this.deleteSelected.bind(this, this.state.ids)} disabled={this.state.isDisabled}>Delete Selected</Button>;
        return (

            <div>
                <UI onClick={this.logout}>
                  
                    <div className="w3-container w3-margin-top w3-responsive">
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
        <span aria-hidden="true">&times;</span>
   </div>

                    <Modal isOpen={this.state.editServiceModal} toggle={this.toggleEditServiceModal.bind(this)} >
                        <ModalHeader toggle={this.toggleEditServiceModal.bind(this)}>Edit a Service</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="serviceName">Service Type</Label>
                                <Input id="serviceName" value={this.state.editServiceData.serviceName} onKeyPress={this.OnKeyPressUserhandler} maxLength={20} onChange={(e) => {
                                    let { editServiceData } = this.state;

                                    editServiceData.serviceName = e.target.value;

                                    this.setState({ editServiceData });
                                }}  />
                            </FormGroup>

                            <FormGroup>
                                <Label for="service_detail">Service Details</Label>

                                <Input type="select" value={this.state.editServiceData.serviceDetailId} onChange={(e) => {
                                    let { editServiceData } = this.state;
                                    editServiceData.serviceDetailId = e.target.value;
                                    this.setState({ editServiceData })
                                }}>
                                    <option disabled>--SELECT--</option>
                           
                                    {this.getDropdown1(this.props.serviceMasterReducer)}

                                </Input>
                            </FormGroup>
                      

                        <FormGroup>
                            <Button color="primary" className="mr-2" onClick={this.updateServices.bind(this)}>Save </Button>
                            <Button color="danger" onClick={this.toggleEditServiceModal.bind(this)}>Cancel</Button>
                        </FormGroup>
                        </ModalBody>
                    </Modal>
                    <div className="top-details" style={{ fontWeight: 'bold'}}><h3>Service Details</h3>
                    <Button color="primary" type="button" onClick={this.push}>Add Services</Button></div>
                
             
                    <SearchFilter type="text" value={this.state.search}
                        onChange={this.searchOnChange} />
                             {deleteSelectedButton}
                           {!this.state.loading ? tableData : <Spinner />}
                 
                     
                    
                    </div>
                </UI>
               

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        displayServiceMasterReducer: state.displayServiceMasterReducer,
        serviceMasterReducer: state.serviceMasterReducer

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getServiceType, getServiceDetail,deleteSelectedService,deleteService}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(displayServices);      