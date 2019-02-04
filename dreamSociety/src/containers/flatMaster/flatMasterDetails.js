import React, { Component } from 'react';
import { getDetails, AddDetails, getDrop, getSizeDrop } from '../../actionCreators/flatMasterAction';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { authHeader } from '../../helper/authHeader';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { Table, Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Label } from 'reactstrap';
import { Segment, Menu, Icon, Sidebar } from 'semantic-ui-react';
import {URN} from '../../actions/index'

class flatMasterDetails extends Component {
    state = {
        editUserData: {
            flatId: '',
            societyId: '',
            societyName: '',
            flatType: '',
            flatSuperArea: '',
            sizeId: '',
            sizeType: '',
            sizeType1: '',
            coverArea: '',
            isActive: false
        },
        editUserModal: false,
        menuVisible: false
    }


    componentDidMount() {

        this.refreshData()

    }

    // componentDidUpdate(){
    //     if(this.props.AddDetails){

    //     }
    // }



    refreshData() {
        this.props.getDetails();
        this.props.getDrop();
        this.props.getSizeDrop();

    }

    toggleEditUserModal() {
        this.setState({
            editUserModal: !this.state.editUserModal
        });
    }

    updateBook = () => {
        let { flatId, societyId, flatType, flatSuperArea, sizeId, coverArea } = this.state.editUserData;

        axios.put(`${URN}/flat/` + flatId, {
            societyId, flatType, flatSuperArea,
            sizeId, coverArea
        }, { headers: authHeader() }).then((response) => {
            this.refreshData();
        })
        this.setState({
            editUserModal: false, editUserData: { flatId: '', societyName: '', flatType: '', flatSuperArea: '', sizeType: '', CoverArea: '' }
        })


    }

    selectflatType = (e) => {

        let { editUserData } = this.state;

        editUserData.flatType = e.target.value;

        this.setState({ editUserData })

    }
    setFlatSuperArea = (e) => {

        let { editUserData } = this.state;

        editUserData.flatSuperArea = e.target.value;

        this.setState({ editUserData })

    }
    setCoverArea = (e) => {

        let { editUserData } = this.state;

        editUserData.coverArea = e.target.value;

        this.setState({ editUserData })

    }

    societyNameType = (e) => {
        let { editUserData } = this.state
        editUserData.societyId = e.target.value
        this.setState({ editUserData })

    }
    sizeNameType = (e) => {
        let { editUserData } = this.state
        editUserData.sizeId = e.target.value
        this.setState({ editUserData })


    }

    editBook(flatId, societyName, flatType, flatSuperArea, sizeType, coverArea) {
        this.setState({
            editUserData: { flatId, societyName, flatType, flatSuperArea, sizeType, coverArea }, editUserModal: !this.state.editUserModal
        })
    }

    deleteUser(flatId) {
        let { isActive } = this.state.editUserData
        axios.put(`${URN}/flat/delete/` + flatId, { isActive }, { headers: authHeader() }).then((response) => {
            this.refreshData()
            this.setState({ editUserData: { isActive: false } })

        })
    }

    fetchUsers({ list1 }) {
        if (list1) {

            return list1.map((item) => {

                return (
                    <tr key={item.flatId}>
                        <td>{item.society_master.societyName}</td>
                        <td>{item.flatType}</td>
                        <td>{item.flatSuperArea}</td>
                        <td>{item.size_master.sizeType}</td>
                        <td>{item.coverArea}</td>
                        <td>
                            <Button color="success" size="sm" className="mr-2"
                                onClick={this.editBook.bind(this, item.flatId, item.society_master.societyName,
                                    item.flatType, item.flatSuperArea, item.size_master.sizeType, item.coverArea)}>Edit</Button>
                            <Button color="danger" size="sm" onClick={this.deleteUser.bind(this, item.flatId)} >Delete</Button>
                        </td>
                    </tr>
                )
            })
        }
    }
    fetchDrop({ list2 }) {
        if (list2) {

            return (
                list2.map((item) => {
                    return (
                        <option key={item.societyId} value={item.societyId}>
                            {item.societyName}
                        </option>
                    )
                })
            )

        }
    }

    fetchSizeDrop({ list3 }) {
        if (list3) {

            return (
                list3.map((item) => {
                    return (
                        <option key={item.sizeId} value={item.sizeId}>
                            {item.sizeType}
                        </option>
                    )
                })
            )

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
                                <Link className="nav-link" to="/superDashboard">Home<span className="sr-only">(current)</span></Link>
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
                            <Menu.Item><Icon name="user" /><Link to="/superDashboard/registration">Super Admin Register</Link></Menu.Item>
                            <Menu.Item><Icon name="user" />Admin Register</Menu.Item>
                            <Menu.Item><Icon name="user" />Society Member Owner Register</Menu.Item>
                            <Menu.Item><Icon name="user" />Society Member Tenant Register</Menu.Item>
                            <Menu.Item><Icon name="user" /><Link to="/vendorDashboard">Vendor</Link></Menu.Item>
                            <Menu.Item><Icon name="user" /><Link to="/superDashboard/add_parking/new">Parking Master</Link></Menu.Item>
                            <Menu.Item><Icon name="user" /><Link to="/superDashboard/towermaster">Tower Master</Link></Menu.Item>
                            <Menu.Item><Icon name="user" /><Link to="/superDashboard/event">Event Master</Link></Menu.Item>
                            <Menu.Item><Icon name="user" /><Link to="/superDashboard/flatmaster">Flat Master</Link></Menu.Item>
                            <Menu.Item><Icon name="user" /><Link to="/superDashboard/sizemaster">Size Master</Link></Menu.Item>
                        </Sidebar>
                        <Sidebar.Pusher dimmed={this.state.menuVisible}>
                            <Segment basic style={{ padding: '55px 0px 0px 0px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '600px' }}>
                                <div>
                                    <Link to="/superDashboard/flatmaster">Add flats</Link>
                                    <Modal isOpen={this.state.editUserModal} toggle={this.toggleEditUserModal.bind(this)}>
                                        <ModalHeader toggle={this.toggleEditUserModal.bind(this)}>Edit a flat</ModalHeader>
                                        <ModalBody>
                                            <FormGroup>
                                                <Label for="roles">SocietyName</Label>
                                                <select value={this.state.editUserData.societyId} onChange={this.societyNameType}>
                                                    <option>{this.state.editUserData.societyName}</option>
                                                    <option disabled>Select</option>
                                                    {this.fetchDrop(this.props.flats)}
                                                </select>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="roles">flatType</Label>
                                                <input
                                                    type="textbox"
                                                    placeholder="enter  flat type"
                                                    value={this.state.editUserData.flatType}
                                                    onChange={this.selectflatType} />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="firstName">Flat Super Area</Label>
                                                <input
                                                    type="textbox"
                                                    placeholder="enter flat super area"
                                                    value={this.state.editUserData.flatSuperArea}
                                                    onChange={this.setFlatSuperArea} />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="roles">sizeType</Label>
                                                <select value={this.state.editUserData.sizeId} onChange={this.sizeNameType}>
                                                    <option>{this.state.editUserData.sizeType}</option>
                                                    <option disabled>Select</option>
                                                    {this.fetchSizeDrop(this.props.flats)}
                                                </select>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="lastName">Cover Area</Label>
                                                <input
                                                    type="textbox"
                                                    placeholder="enter cover area"
                                                    value={this.state.editUserData.coverArea}
                                                    onChange={this.setCoverArea} />

                                            </FormGroup>

                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" onClick={this.updateBook}>Update Flat</Button>
                                            <Button color="secondary" onClick={this.toggleEditUserModal.bind(this)}>Cancel</Button>
                                        </ModalFooter>
                                    </Modal>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>societyName</th>
                                                <th>flat Type</th>
                                                <th>flat SuperArea</th>
                                                <th>sizeType</th>
                                                <th>coverArea</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.fetchUsers(this.props.flats)}
                                        </tbody>
                                    </Table>
                                </div>
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
        flats: state.flats

    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getDetails,
        AddDetails,
        getDrop,
        getSizeDrop
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(flatMasterDetails)
