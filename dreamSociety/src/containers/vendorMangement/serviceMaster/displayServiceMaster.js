import React, { Component } from 'react';
import { getServiceType, getServiceDetail } from '../../../actionCreators/serviceMasterAction';
import { connect } from 'react-redux';
import axios from 'axios';
import { authHeader } from '../../../helper/authHeader';
import { bindActionCreators } from 'redux';
import { Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Input, Label, Table } from 'reactstrap';
import { URN } from '../../../actions/index';

import { Link } from 'react-router-dom';

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
        menuVisible: false,
        editServiceModal: false,
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



    deleteService(serviceId) {
        this.setState({loading:true})
        let { isActive } = this.state.editServiceData;
        axios.put(`${URN}/service/` + serviceId, { isActive }, { headers: authHeader() }).then((response) => {
            this.refreshData()
            this.setState({ editServiceData: { isActive: false } })

        })
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
            return item.filter(this.searchFilter(this.state.search)).map((item) => {
                return (

                    <tr key={item.serviceId}>


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
                <th>Service Type</th>
                <th>Service Details</th>
                <th>Actions</th>
            </tr>
        </thead>

        <tbody>
            {this.renderList(this.props.displayServiceMasterReducer)}
        </tbody>
    </Table>
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
    return bindActionCreators({ getServiceType, getServiceDetail }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(displayServices);      