import React, { Component } from 'react';
import { getUsers, getRoles, addUser, updateUser, deleteUser } from '../../actionCreators/superAdminMasterAction';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SearchFilter from '../../components/searchFilter/searchFilter';
import { Table, Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Input, Label } from 'reactstrap';
import '../../r-css/w3.css';
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';

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
            loading:false,
            isActive: false,
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
        if(this.props.userDetail.user){
            let { userId, roleName, firstName, lastName, userName, email, contact } = this.state.editUserData;
        
            this.props.updateUser(userId, roleName, firstName, lastName, userName, email, contact).then(() => this.refreshData())
            this.setState({
                editUserModal: false, editUserData: { userId: '', roleName: '', firstName: '', lastName: '', userName: '', email: '', contact: '' }
            });
        }
        return this.setState({loading:true})
    }

    editUser(userId, roleName, firstName, lastName, userName, email, contact) {
        this.setState({
            editUserData: { userId, roleName, firstName, lastName, userName, email, contact }, editUserModal: !this.state.editUserModal
        });
    }

    deleteUser(userId) {
        let { isActive } = this.state.editUserData
        this.props.deleteUser(userId, isActive)
        .then(() => this.setState({isActive: false}))
    }

    searchFilter(search){
        return function(x){
            if(x){
                let currentRole = x.roles.map((i) => i.roleName);
                return  x.firstName.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                 x.lastName.toLowerCase().indexOf(search.toLowerCase()) !== -1 || 
                 x.userName.toLowerCase().indexOf(search.toLowerCase()) !== -1 || 
                 x.email.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                 currentRole[0].toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                 x.contact.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||  
                 !search;
            }
        }
    }
 

    fetchUsers({ user }) {
        if(user) {
            let currentRole;
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
                            <div className="w3-row">
                            <Button color="success" size="sm" className="w3-btn w3-col l6 mr-1 mb-2" onClick={this.editUser.bind(this, item.userId, currentRole, item.firstName, item.lastName, item.userName, item.email, item.contact)}>Edit</Button>
                            <Button color="danger" size="sm" className="w3-btn w3-col l6" onClick={this.deleteUser.bind(this, item.userId)} >Delete</Button>
                            </div>
                        </td>
                    </tr>
                )
            })
        }
        return <tr><td><span style={{fontSize:'24px',fontWeight:'bold'}}>...Loading. Please Wait!</span></td></tr>
    }

    fetchRoles({ userRole }) {
        if (userRole) {
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

    windowScroll = () => {
        let x = document.getElementById('sidebar');
        x.style.position = 'fixed';
    }

    render() {
        const tableData = <Table>

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
        return (
            <div>
                <UI>
                    <div className="w3-container w3-margin-top">
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
                            {this.props.userDetail.user ? tableData: <Spinner />}
                        </div>
                        </UI>
                    {/* </SideBar> */}
                
</div>
        )
    }
}

function mapStateToProps(state) {
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