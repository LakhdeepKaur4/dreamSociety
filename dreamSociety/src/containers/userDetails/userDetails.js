import React, { Component } from 'react';
import { getUsers, getRoles, addUser, updateUser, deleteUser } from '../../actionCreators/superAdminMasterAction';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Segment, Menu, Icon, Sidebar } from 'semantic-ui-react';
import SearchFilter from '../../components/searchFilter/searchFilter';
import { Table, Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Input, Label } from 'reactstrap';
class userDetails extends Component {

    state = {
        editUserData: {
            userId: "",
            roleName: "",
            firstName: "",
            lastName: "",
            userName: "",
            email: "",
            contact: "",
            isActive: false,
            menuVisible: false
        },
        editUserModal: false,
        dropdownOpen: false,
        search:''
    }

    componentDidMount() {
        this.refreshData();
    }

    toggle() {
        this.setState({ dropdownOpen: !this.state.dropdownOpen })
    }

    refreshData() {
        this.props.getUsers();
        this.props.getRoles();
        this.fetchUsers(this.props.userDetail)
    }

    toggleEditUserModal() {
        this.setState({
            editUserModal: !this.state.editUserModal
        });
    }

    updateUser = () => {
        let { userId, roleName, firstName, lastName, userName, email, contact } = this.state.editUserData;
        
        this.props.updateUser(userId, roleName, firstName, lastName, userName, email, contact)
        this.setState({
            editUserModal: false, editUserData: { userId: '', roleName: '', firstName: '', lastName: '', userName: '', email: '', contact: '' }
        })
        

    }

    editUser(userId, roleName, firstName, lastName, userName, email, contact) {
        this.setState({
            editUserData: { userId, roleName, firstName, lastName, userName, email, contact }, editUserModal: !this.state.editUserModal
        });
    }

    deleteUser(userId) {
        let { isActive } = this.state.editUserData
        console.log(userId)
        this.props.deleteUser(userId, isActive)
        .then(() => this.setState({isActive: false}))
    }

    searchFilter(search){
        return function(x){
            if(x){
                return x.firstName.toLowerCase().includes(search.toLowerCase()) || x.lastName.toLowerCase().includes(search.toLowerCase()) || x.email.toLowerCase().includes(search.toLowerCase()) || !search;
            }
        }
    }
 

    fetchUsers({ user }) {
        if(user) {
            let currentRole;
            console.log(user)
            return user.filter(this.searchFilter(this.state.search)).map((item) => {
                return (
                    <tr key={item.userId}>
                        <td>{item.roles.map((i) => {
                            currentRole = i.roleName
                            return currentRole
                        })}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.userName}</td>
                        <td>{item.email}</td>
                        <td>{item.contact}</td>
                        <td>
                            <Button color="success" size="sm" className="mr-2" onClick={this.editUser.bind(this, item.userId, currentRole, item.firstName, item.lastName, item.userName, item.email, item.contact)}>Edit</Button>
                            <Button color="danger" size="sm" onClick={this.deleteUser.bind(this, item.userId)} >Delete</Button>
                        </td>
                    </tr>
                )
            })
        }
        return <tr><td><span style={{fontSize:'24px',fontWeight:'bold'}}>...Loading. Please Wait!</span></td></tr>
    }

    fetchRoles({ userRole }) {
        if (userRole) {
            console.log(userRole)
            return (
                userRole.map((item) => {
                    console.log(this.state)
                    return (
                        <option value={item.roleName} key={item.id}>
                            {item.roleName}
                        </option>
                    )
                })
            )
        }
    }

    searchOnChange = (e) => {
        this.setState({search:e.target.value})
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
                                >Logout</button>
                        </form>
                    </div>
                </nav>
                <div style={{ marginTop: '48px' }}>
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
                            <Segment basic style={{overFlow:'scroll'}}>
                                <div className="container">
                                    <Link to="/superDashboard/registration">Add Users</Link>
                                    <Modal isOpen={this.state.editUserModal} toggle={this.toggleEditUserModal.bind(this)}>
                                        <ModalHeader toggle={this.toggleEditUserModal.bind(this)}>Edit User</ModalHeader>
                                        <ModalBody>
                                            <FormGroup>
                                                <Label>Role</Label>
                                                <Input type="select" id="roleName" value={this.state.editUserData.roleName} onChange={(e) => {
                                                    console.log(this.state)
                                                    let { editUserData } = this.state;

                                                    editUserData.roleName = e.target.value;

                                                    this.setState({ editUserData });
                                                }} >
                                                    <option value={this.state.editUserData.roleName}>{this.state.editUserData.roleName}</option>
                                                    <option disabled>Select</option>
                                                    {this.fetchRoles(this.props.userDetail)}
                                                </Input>

                                            </FormGroup>

                                            <FormGroup>
                                                <Label for="firstName">firstName</Label>
                                                <Input id="firstName" value={this.state.editUserData.firstName} onChange={(e) => {
                                                    let { editUserData } = this.state;

                                                    editUserData.firstName = e.target.value;

                                                    this.setState({ editUserData });
                                                }} />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="lastName">lastName</Label>
                                                <Input id="lastName" value={this.state.editUserData.lastName} onChange={(e) => {
                                                    let { editUserData } = this.state;

                                                    editUserData.lastName = e.target.value;

                                                    this.setState({ editUserData });
                                                }} />

                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="Username">Username</Label>
                                                <Input id="Username" value={this.state.editUserData.userName} onChange={(e) => {
                                                    let { editUserData } = this.state;

                                                    editUserData.userName = e.target.value;

                                                    this.setState({ editUserData });
                                                }} />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="email">email</Label>
                                                <Input id="email" value={this.state.editUserData.email} onChange={(e) => {
                                                    let { editUserData } = this.state;

                                                    editUserData.email = e.target.value;

                                                    this.setState({ editUserData });
                                                }} />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="contact">contact</Label>
                                                <Input id="contact" value={this.state.editUserData.contact} onChange={(e) => {
                                                    let { editUserData } = this.state;

                                                    editUserData.contact = e.target.value;

                                                    this.setState({ editUserData });
                                                }} />
                                            </FormGroup>


                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" onClick={this.updateUser}>Update Book</Button>{' '}
                                            <Button color="secondary" onClick={this.toggleEditUserModal.bind(this)}>Cancel</Button>
                                        </ModalFooter>
                                    </Modal>
                                    <SearchFilter type="text" value={this.state.search}
                                        onChange={this.searchOnChange} />
                                    <Table>

                                        <thead>
                                            <tr>
                                                <th>Roles</th>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Username</th>
                                                <th>Email</th>
                                                <th>Contact No.</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.fetchUsers(this.props.userDetail)}
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
    console.log(state);
    return {
        userDetail: state.userDetail
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getUsers,
        getRoles,
        addUser,
        updateUser,
        deleteUser
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(userDetails)