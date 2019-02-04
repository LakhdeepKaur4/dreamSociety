import React, { Component } from 'react';
import { getServiceType, getServiceDetail } from '../../../actionCreators/serviceMasterAction';
import { connect } from 'react-redux';
import axios from 'axios';
import { authHeader } from '../../../helper/authHeader';
import { bindActionCreators } from 'redux';
import { Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Input, Label } from 'reactstrap';
import { URN } from '../../../actions/index';
import './serviceMaster.css';
import { Link } from 'react-router-dom';
import { Segment, Menu, Icon, Sidebar } from 'semantic-ui-react';


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
        editServiceModal: false

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
                console.log(item)
                return (
                    <option key={item.serviceDetailId} value={item.serviceDetailId}>
                        {item.service_detail}</option>
                )

            })



        }
    }

    renderList = ({ item }) => {

        console.log(item);
        if (item) {
            return item.map((item) => {
                return (

                    <tr key={item.serviceId}>


                        <td>{item.serviceName}</td>
                        <td>{item.service_detail_master.service_detail}</td>


                        <td>
                            <button className="btn btn-primary" onClick={this.editUser.bind(this, item.serviceId, item.serviceName, item.service_detail, item.serviceDetailId)}>Edit</button>
                        </td>
                        <td>
                            <button className="btn btn-danger" onClick={this.deleteService.bind(this, item.serviceId)}>Delete</button>
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
                <div style={{ marginTop: '48px' }}>
                    <Sidebar.Pushable as={Segment} attached="bottom">
                        <Sidebar width='thin' as={Menu} animation="uncover" visible={this.state.menuVisible} icon="labeled" vertical inverted>
                            <Menu.Item><Icon name="user" /><Link to="/superDashboard/serviceMaster">Service Master</Link></Menu.Item>
                            <Menu.Item><Icon name="user" /><Link to="/superDashboard/vendorMaster">Vendor Master</Link></Menu.Item>
                        </Sidebar>
                        <Sidebar.Pusher dimmed={this.state.menuVisible}>
                            <Segment basic >
                                {/* <Header as="h3">Application Content</Header> */}
                                {/* <Image src='//unsplash.it/800/480' /> */}
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
                                                {/* <option value={this.state.editServiceData.service_detail}>
                      {this.state.editServiceData.service_detail}
                        </option> */}
                                                {this.getDropdown1(this.props.serviceMasterReducer)}

                                            </select>
                                        </FormGroup>
                                    </ModalBody>

                                    <ModalFooter>
                                        <Button color="primary" onClick={this.updateServices.bind(this)}>Update </Button>
                                        <Button color="secondary" onClick={this.toggleEditServiceModal.bind(this)}>Cancel</Button>
                                    </ModalFooter>
                                </Modal>

                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Service Type</th>
                                            <th>Service Details</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.renderList(this.props.displayServiceMasterReducer)}
                                    </tbody>
                                </table>
                                <Link to="/superDashboard/serviceMaster">
                                    <button className="button" type="button">Add Services</button>
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
        displayServiceMasterReducer: state.displayServiceMasterReducer,
        serviceMasterReducer: state.serviceMasterReducer

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getServiceType, getServiceDetail }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(displayServices);