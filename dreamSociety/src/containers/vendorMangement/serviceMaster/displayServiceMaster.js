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
        search: ''

    }


    componentDidMount() {
        this.props.getServiceType()
        this.props.getServiceDetail();
    }

    componentWillMount() {
        this.refreshData()
    }

    refreshData() {
        this.props.getServiceType();
    }



    deleteService(serviceId) {
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

    toggleEditServiceModal() {
        this.setState({
            editServiceModal: !this.state.editServiceModal
        });
        console.log(this.state.editServiceData)
    }

    updateServices() {
        let { serviceName, service_detail, serviceDetailId } = this.state.editServiceData;

        axios.put(`${URN}/service/` + this.state.editServiceData.serviceId, {
            serviceName, service_detail, serviceDetailId
        }, { headers: authHeader() }).then((response) => {
            this.refreshData();

            this.setState({
                editServiceModal: false, editServiceData: { serviceId: '', serviceName: '', service_detail: '', serviceDetailId: '' }
            })
        });

    }

    editUser(serviceId, serviceName, service_detail, serviceDetailId) {
        console.log('serviceName', serviceName);
        console.log('serviceId', serviceId);
        console.log('serviceDetailId', serviceDetailId)
        this.setState({

            editServiceData: { serviceId, serviceName, service_detail, serviceDetailId }, editServiceModal: !this.state.editServiceModal
        });

    }


    getDropdown1 = ({ detail }) => {
        if (detail) {
            return detail.service.map((item) => {
                console.log("itemmm",item)
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

        console.log("itemmm2222222222",item);
        if (item) {
            return item.filter(this.searchFilter(this.state.search)).map((item) => {
                return (

                    <tr key={item.serviceId}>


                        <td>{item.serviceName}</td>
                        <td>{item.service_detail_master.service_detail}</td>


                        <td>
                            <Button color="primary" className="mr-2" onClick={this.editUser.bind(this, item.serviceId, item.serviceName, item.service_detail, item.serviceDetailId)}>Edit</Button>
                        
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

    render() {
        return (

            <div>
                <UI onClick={this.logout}>
                  
                    <div className="w3-container w3-margin-top w3-responsive">
                    <Modal isOpen={this.state.editServiceModal} toggle={this.toggleEditServiceModal.bind(this)}>
                        <ModalHeader toggle={this.toggleEditServiceModal.bind(this)}>Edit a Service</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="serviceName">Service Type</Label>
                                <Input id="serviceName" value={this.state.editServiceData.serviceName} onChange={(e) => {
                                    let { editServiceData } = this.state;

                                    editServiceData.serviceName = e.target.value;

                                    this.setState({ editServiceData });
                                }} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="service_detail">Service Details</Label>

                                <select value={this.state.editServiceData.serviceDetailId} onChange={(e) => {
                                    let { editServiceData } = this.state;
                                    editServiceData.serviceDetailId = e.target.value;
                                    this.setState({ editServiceData })
                                }}>
                                    <option disabled>--SELECT--</option>
                           
                                    {this.getDropdown1(this.props.serviceMasterReducer)}

                                </select>
                            </FormGroup>
                        </ModalBody>

                        <ModalFooter>
                            <Button color="primary" onClick={this.updateServices.bind(this)}>Update </Button>
                            <Button color="secondary" onClick={this.toggleEditServiceModal.bind(this)}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                    <div style={{ fontWeight: 'bold'}}><label>Service Details</label></div>
                    <SearchFilter type="text" value={this.state.search}
                        onChange={this.searchOnChange} />
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
                    <Link to="/superDashboard/serviceMaster">
                        <Button color="success" type="button">Add Services</Button>
                    </Link>
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