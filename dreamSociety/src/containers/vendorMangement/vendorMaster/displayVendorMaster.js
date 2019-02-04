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
import './vendorMaster.css';
import { Segment, Menu, Icon, Sidebar } from 'semantic-ui-react';

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
        editVendorModal: false

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
            return vendors.vendor.map((vendors) => {
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

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark" id="headernav" >
                    <Menu.Item onClick={() => this.setState({ menuVisible: !this.state.menuVisible })} >
                        <Icon name="sidebar" style={{ color: 'white', cursor: 'pointer' }} />

                    </Menu.Item>
                    <i style={{ fontSize: '24px', color: 'skyblue', cursor: 'pointer' }} className="fa">&#xf1ad;</i> <Link className="navbar-brand" to="#">DRE@M SOCIETY</Link>
                    <div className="navbar-collapse collapse" id="navbarCollapse" style={{ marginLeft: '20%' }}>
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/vendorDashboard">Home<span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#">Gallery</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#">About Us</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#">Contact Us</Link>
                            </li>
                        </ul>
                        <form className="form-inline mt-2 mt-md-0">
                            <button className="btn btn-outline-success my-2 my-sm-0" data-toggle="modal" data-target="#myModal" id="login" type="button"
                                onClick={this.editUser}>Logout</button>
                        </form>
                    </div>
                </nav>
                <div style={{ margin: '48px auto' }}>
                    <Sidebar.Pushable as={Segment} attached="bottom">
                        <Sidebar width='thin' as={Menu} animation="uncover" visible={this.state.menuVisible} icon="labeled" vertical inverted>
                            <Menu.Item><Icon name="user" /><Link to="/superDashboard/serviceMaster">Service Master</Link></Menu.Item>
                            <Menu.Item><Icon name="user" /><Link to="/superDashboard/vendorMaster">Vendor Master</Link></Menu.Item>
                        </Sidebar>
                        <Sidebar.Pusher dimmed={this.state.menuVisible}>
                            <Segment basic>
                                {/* <Header as="h3">Application Content</Header> */}
                                {/* <Image src='//unsplash.it/800/480' /> */}
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
                                                {/* <option  value={this.state.editVendorData.serviceName}>
                                     {this.state.editVendorData.serviceName}
                                    </option>
                                     */}
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
                            </Segment>
                        </Sidebar.Pusher>
                    </Sidebar.Pushable>
                </div>

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
