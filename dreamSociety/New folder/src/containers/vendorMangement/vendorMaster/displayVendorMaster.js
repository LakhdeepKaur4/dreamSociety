import React, { Component } from 'react';
import { getVendorMaster } from '../../../actionCreators/vendorMasterAction';
import { getServiceType } from '../../../actionCreators/serviceMasterAction';
import { authHeader } from '../../../helper/authHeader';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Modal, FormGroup, ModalBody, ModalHeader,Table, Input, Label } from 'reactstrap';
import axios from 'axios';
import { URN } from '../../../actions/index';


import SearchFilter from '../../../components/searchFilter/searchFilter';
import UI from '../../../components/newUI/vendorDashboardInside';
import Spinner from '../../../components/spinner/spinner';

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
        loading:true,
        search: ''

    }

    componentDidMount() {
       this.refreshData();
    }


    componentWillMount() {
        this.refreshData()
    }

    refreshData() {
        this.props.getVendorMaster().then(()=> this.setState({loading:false}));
        this.props.getServiceType().then(()=> this.setState({loading:false}));
    }


    editUser(vendorId, vendorName, serviceName, serviceId, description) {
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
        this.setState({loading:true})
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
            this.setState({
                editVendorModal: false,loading:true, editVendorData: { vendorId: '', vendorName: '', serviceName: '', serviceId: '', description: '' }
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
                            <Button color="success" className="mr-2" onClick={this.editUser.bind(this, vendors.vendorId, vendors.vendorName, vendors.serviceName, vendors.serviceId, vendors.description)}>Edit</Button>
                       
                            <Button color="danger" onClick={this.deleteService.bind(this, vendors.vendorId)}>Delete</Button>
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
    

    push=()=>{
        this.props.history.push('/superDashboard/vendorMaster')
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
                <th>Vendor Name</th>
                <th>Service Type</th>
                <th>Description</th>
                <th>Actions</th>
            </tr>
        </thead>

        <tbody>
            {this.renderList(this.props.vendorMasterReducer)}
        </tbody>
    </Table>
        return (
            <div>
                <UI onClick={this.logout}>
                <div className="w3-container w3-margin-top w3-responsive">
                <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
        <span aria-hidden="true">&times;</span>
   </div>

                    <Modal isOpen={this.state.editVendorModal} toggle={this.toggleEditVendorModal.bind(this)}>
                        <ModalHeader toggle={this.toggleEditVendorModal.bind(this)}>Edit a Vendor</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="vendorName">Vendor Name</Label>
                                <Input id="vendorName" value={this.state.editVendorData.vendorName} onKeyPress={this.OnKeyPressUserhandler} maxLength={20} onChange={(e) => {
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
                                <Input id="description" value={this.state.editVendorData.description} maxLength={50} onChange={(e) => {
                                    let { editVendorData } = this.state;

                                    editVendorData.description = e.target.value;

                                    this.setState({ editVendorData });
                                }} />
                            </FormGroup>
                    
                     
                            <Button color="primary" className="mr-2" onClick={this.updateServices.bind(this)}>Save </Button>
                            <Button color="danger" onClick={this.toggleEditVendorModal.bind(this)}>Cancel</Button>
                   
                        </ModalBody>



                    </Modal>
                    <div className="top-details" style={{ fontWeight: 'bold' }}><h3>Vendor Details</h3>
                    <Button color="primary" onClick={this.push} type="button">Add Vendor</Button>
                    </div>
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
        vendorMasterReducer: state.vendorMasterReducer,
        displayServiceMasterReducer: state.displayServiceMasterReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getVendorMaster, getServiceType}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(displayVendorMaster);
