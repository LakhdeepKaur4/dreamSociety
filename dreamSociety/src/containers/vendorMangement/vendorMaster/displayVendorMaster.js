import React, { Component } from 'react';
import { getVendorMaster } from '../../../actionCreators/vendorMasterAction';
import { getServiceType } from '../../../actionCreators/serviceMasterAction';
import { authHeader } from '../../../helper/authHeader';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Input, Label } from 'reactstrap';
import axios from 'axios';
import { URN } from '../../../actions/index';
import { Link } from 'react-router-dom';


import SearchFilter from '../../../components/searchFilter/searchFilter';
import UI from '../../../components/newUI/vendorDashboardInside';

class displayVendorMaster extends Component {



    state = {
        editVendorData: {
            vendorId: '',
            vendorName: '',
            serviceName: '',
            serviceId: '',
            description: '',
            isActive: false,
            menuVisible: false
        },
        editVendorModal: false,
        search: ''

    }

    componentDidMount() {
        this.props.getVendorMaster();
        this.props.getServiceType();
    }


    componentWillMount() {
        this.refreshData()
    }

    refreshData() {
        this.props.getVendorMaster();
    }


    editUser(vendorId, vendorName, serviceName, serviceId, description) {
        console.log(serviceName)
        console.log(serviceId)
        this.setState({

            editVendorData: { vendorId, vendorName, serviceName, serviceId, description }, editVendorModal: !this.state.editVendorModal
        });

    }

    searchFilter(search) {
        return function (x) {
            return x.vendorName.toLowerCase().includes(search.toLowerCase()) || !search;
        }
    }

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }

    getDropdown = ({ item }) => {
        console.log("hiii", item)
        if (item) {
            return item.map((item) => {
                return (
                    <option key={item.serviceId} value={item.serviceId}>
                        {item.serviceName}
                    </option>
                )
            })
        }
    }


    deleteService(vendorId) {
        let { isActive } = this.state.editVendorData;
        axios.put(`${URN}/vendor/delete/` + vendorId, { isActive }, { headers: authHeader() }).then((response) => {
            this.refreshData()
            this.setState({ editVendorData: { isActive: false } })

        })
    }


    updateServices() {
        let { vendorName, serviceName, serviceId, description } = this.state.editVendorData;

        axios.put(`${URN}/vendor/` + this.state.editVendorData.vendorId, {
            vendorName, serviceName, serviceId, description
        }, { headers: authHeader() }).then((response) => {
            this.refreshData();
            console.log('dddddddd', response.data);
            this.setState({
                editVendorModal: false, editVendorData: { vendorId: '', vendorName: '', serviceName: '', serviceId: '', description: '' }
            })
        });
    }

    toggleEditVendorModal() {
        this.setState({
            editVendorModal: !this.state.editVendorModal
        });

    }

    renderList = ({ vendors }) => {


        if (vendors) {
            return vendors.vendor.filter(this.searchFilter(this.state.search)).map((vendors) => {
                return (

                    <tr key={vendors.vendorId}>


                        <td>{vendors.vendorName}</td>
                        <td>{vendors.service_master.serviceName}</td>
                        <td>{vendors.description}</td>


                        <td>
                            <button className="btn btn-primary" onClick={this.editUser.bind(this, vendors.vendorId, vendors.vendorName, vendors.serviceName, vendors.serviceId, vendors.description)}>Edit</button>
                        </td>
                        <td>
                            <button className="btn btn-danger" onClick={this.deleteService.bind(this, vendors.vendorId)}>Delete</button>
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
                   
                    <Modal isOpen={this.state.editVendorModal} toggle={this.toggleEditVendorModal.bind(this)}>
                        <ModalHeader toggle={this.toggleEditVendorModal.bind(this)}>Edit a Vendor</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="vendorName">Vendor Name</Label>
                                <Input id="vendorName" value={this.state.editVendorData.vendorName} onChange={(e) => {
                                    let { editVendorData } = this.state;

                                    editVendorData.vendorName = e.target.value;

                                    this.setState({ editVendorData });
                                }} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="serviceName">Service Name</Label>

                                <Input type="select" id="serviceName" value={this.state.editVendorData.serviceId} onChange={(e) => {
                                    let { editVendorData } = this.state;

                                    editVendorData.serviceId = e.target.value;

                                    this.setState({ editVendorData })
                                }}>
                                    
                                    <option disabled>--Select--</option>
                                    {this.getDropdown(this.props.displayServiceMasterReducer)}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="description">Description</Label>
                                <Input id="description" value={this.state.editVendorData.description} onChange={(e) => {
                                    let { editVendorData } = this.state;

                                    editVendorData.description = e.target.value;

                                    this.setState({ editVendorData });
                                }} />
                            </FormGroup>
                        </ModalBody>

                        <ModalFooter>
                            <Button color="primary" onClick={this.updateServices.bind(this)}>Update </Button>
                            <Button color="secondary" onClick={this.toggleEditVendorModal.bind(this)}>Cancel</Button>
                        </ModalFooter>


                    </Modal>
                    <div style={{ fontWeight: 'bold' }}><label>Vendor Details</label></div>
                    <SearchFilter type="text" value={this.state.search}
                        onChange={this.searchOnChange} />
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Vendor Name</th>
                                <th>Service Type</th>
                                <th>Description</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.renderList(this.props.vendorMasterReducer)}
                        </tbody>
                    </table>
                    <Link to="/superDashboard/vendorMaster">
                        <button className="button" type="button">Add Vendor</button>
                    </Link>
                </UI>
              

            </div>
        )
    }




}


function mapStateToProps(state) {
    return {
        vendorMasterReducer: state.vendorMasterReducer,
        displayServiceMasterReducer: state.displayServiceMasterReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getVendorMaster, getServiceType }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(displayVendorMaster);
