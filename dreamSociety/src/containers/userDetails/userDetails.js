import React, { Component } from 'react';
import { getUsers, getRoles, addUser, updateUser, deleteUser, deleteSelectedUsers } from '../../actionCreators/superAdminMasterAction';
import { bindActionCreators } from 'redux';
import { viewTower } from '../../actionCreators/towerMasterAction';
import { connect } from 'react-redux';
import SearchFilter from '../../components/searchFilter/searchFilter';
import { Table, Button } from 'reactstrap';
import '../../r-css/w3.css';
import EditUserModal from './editUserModal';
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';

class userDetails extends Component {
    constructor(props){
            super(props);
            this.state = {
                userId: "",
                ids: [],
                roleName: "",
                firstName: "",
                lastName: "",
                userName: "",
                email: "",
                familyMember: "",
                towerName:"",
                towerId:"",
                floor:"",
                parking:"",
                contact: "",
                errors:{},
                isDisabled: true,
                isActive: false,
                editUserModal: false,
                loading:true,
                dropdownOpen: false,
                search:''
        }
        this.OnKeyPresshandlerPhone = this.OnKeyPresshandlerPhone.bind(this);
        this.OnKeyPressUserhandler = this.OnKeyPressUserhandler.bind(this);
        this.emailValid = this.emailValid.bind(this);

    }


    componentDidMount() {
        this.refreshData();
    }
    componentWillMount(){
        window.scrollTo(0, 0);
    }

    toggle() {
        this.setState({ dropdownOpen: !this.state.dropdownOpen })
    }

    OnKeyPresshandlerPhone(event) {
        const pattern = /^[0-9]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    OnKeyPressUserhandler(event) {
        const pattern = /^[a-zA-Z]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    emailValid(event) {
        const pattern = /^(?!@*?\@\@)[a-zA-Z0-9@._]+$/
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    refreshData() {
        this.props.getUsers().then(() => this.setState({loading:false}))
        this.props.getRoles().then(() => this.setState({loading:false}));
        this.props.viewTower().then(() => this.setState({loading:false}));
    }

    toggleEditUserModal() {
        this.setState({
            editUserModal: !this.state.editUserModal
        });
    }

    parkingAndFloorKeyPress(event){
        const pattern = /^[a-zA-Z0-9 ]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    updateUser = (e) => {
            e.preventDefault();
            let { userId, roleName, firstName, lastName, userName, email,familyMember,towerName, floor,parking, contact,towerId } = this.state;
            let errors = {};
            if(!this.state.towerName){
                errors.towerName = "Tower can't be empty. Please select."
            }
            if(this.state.floor === '') errors.floor = "Can't be empty."
            if(this.state.parking === '') errors.parking = "Can't be empty."
            if(this.state.familyMember === '') errors.familyMember="Can't be empty."

            if (firstName === '') errors.firstName = "Can't be empty.";

            if (lastName === '') errors.lastName = "Can't be empty.";

            if (userName === '') errors.userName = "Can't be empty.";
            if (email === '') errors.email = "Can't be empty.";
            if (contact === '') errors.contact = "Can't be empty.";
            this.setState({ errors });
            const isValid = Object.keys(errors).length === 0;
            if (isValid) {
                this.props.updateUser(userId, roleName, firstName, lastName, userName, email,familyMember,towerName,floor,parking, contact,towerId)
                .then(() => {
                    this.refreshData()
                })
                this.setState({
                    editUserModal: false,loading:true,errors:{},  userId: '', roleName: '', firstName: '', lastName: '', userName: '', email: '', contact: '',
                    towerId:''
                });
            }
    }

    editUser(userId, roleName, firstName, lastName, userName, email,familyMember,towerName, floor,parking, contact, towerId) {
        this.setState({
             userId, roleName, firstName, lastName, userName, email,familyMember,towerName, floor,parking, contact , towerId, editUserModal: !this.state.editUserModal
        });
    }

    deleteUser(userId) {
        this.setState({loading:true})
        let { isActive } = this.state;
        this.props.deleteUser(userId, isActive)
        .then(() => this.refreshData())
        .then(() => this.setState({isActive: false}))
    }

    deleteSelected(ids){
        this.setState({loading:true, isDisabled: true});
        this.props.deleteSelectedUsers(ids)
        .then(() => this.refreshData())
        .catch(err => err.response.data.message);
    }

    searchFilter(search){
        return function(x, y){
            if(x, y){
                let currentRole = x.roles.map((i) => i.roleName);
                return  y.toString().indexOf(search) !== -1 ||
                 x.tower_master.towerName.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                 x.familyMember.toString().indexOf(search)  !== -1 ||
                 x.floor.toLowerCase().indexOf(search.toLowerCase())  !== -1 ||
                 x.parking.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                 x.firstName.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                 x.lastName.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                 x.userName.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                 x.email.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                 currentRole[0].toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                 x.contact.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                 !search;
            }
        }
    }

    fetchTowers({tower}) {
        if(tower){
            return (
                tower.map((item) => {
                    return (
                        <option value={item.towerId} key={item.towerId}>
                            {item.towerName}
                        </option>
                    )
                })
            )
        }
    }


    fetchUsers({ user }) {
        if(user) {
            let currentRole;
            return user.filter(this.searchFilter(this.state.search)).map((item, index) => {
                let currentTower = item.tower_master.towerName;
                let currentTowerId = item.towerId
                return (
                    <tr key={item.userId}>
                        <td><input type="checkbox" name="ids" className="SelectAll" value={item.userId}
                         onChange={(e) => {
                            const {userId} = item
                            if(!e.target.checked){
                                document.getElementById('allSelect').checked=false;
                                let indexOfId = this.state.ids.indexOf(userId);
                                if(indexOfId > -1){
                                    this.state.ids.splice(indexOfId, 1);
                                }
                                if(this.state.ids.length === 0){
                                    this.setState({isDisabled: true});
                                }
                            }
                            else {
                                this.setState({ids: [...this.state.ids, userId]});
                                if(this.state.ids.length >= 0){
                                    this.setState({isDisabled: false})
                                }
                            }
                                
                             }}/></td>
                        <td>{index + 1}</td>
                        <td>{item.roles.map((i) => {
                            currentRole = i.roleName
                            return currentRole
                        })}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.userName}</td>
                        <td>{item.email}</td>
                        <td>{item.familyMember}</td>
                        <td>{currentTower}</td>
                        <td>{item.floor}</td>
                        <td>{item.parking}</td>
                        <td>{item.contact}</td>
                        <td>
                            <div className="w3-row">
                            <Button color="success" className="mr-2" onClick={this.editUser.bind(this, item.userId, currentRole, item.firstName, item.lastName, item.userName, item.email,item.familyMember,
                                currentTowerId,item.floor,item.parking, item.contact, currentTower)}>Edit</Button>
                            <Button color="danger" onClick={this.deleteUser.bind(this, item.userId)} >Delete</Button>
                            </div>
                        </td>
                    </tr>
                )
            })
        }
    }

    onChange = (e) => {
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value, errors });
        }
        else {
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    fetchRoles({ userRole }) {
        if (userRole) {
            return (
                userRole.map((item) => {
                    return (
                        <option value={item.roleId} key={item.id}>
                            {item.roleName}
                        </option>
                    )
                })
            )
        }
    }

    routeToAddNewUser =() => {
        this.props.history.push('/superDashboard/registration')
    }

    searchOnChange = (e) => {
        this.setState({search:e.target.value})
    }

    windowScroll = () => {
        let x = document.getElementById('sidebar');
        x.style.position = 'fixed';
    }
    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }
    close=()=>{
        return this.props.history.replace('/superDashBoard')
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

    render() {

        let tableData;
        tableData = <Table className="table table-bordered">

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
                    <th>Roles</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Total Family Members</th>
                    <th>Tower Name</th>
                    <th>Floor</th>
                    <th>Parking Slot Name</th>
                    <th>Contact No.</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {this.fetchUsers(this.props.userDetail)}
            </tbody>
        </Table>

        let deleteSelectedButton = <Button color="danger" disabled={this.state.isDisabled} className="mb-3"
        onClick={this.deleteSelected.bind(this, this.state.ids)}>Delete Selected</Button>

        return (

            <div>
                <UI onClick={this.logout}>
                    <div className="w3-container w3-margin-top w3-responsive">
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                    </div>

                            <div className="top-details">
                                <h3>User Master Details</h3>
                                <Button color="primary" onClick={this.routeToAddNewUser} color="primary">Add Users</Button>
                            </div>

                            <EditUserModal isOpen={this.state.editUserModal}
                                toggle={this.toggleEditUserModal.bind(this)}
                                roleNameValue = {this.state.roleName}
                                roleInputName = "roleName"
                                roleNameChange = {this.onChange}
                                selectedRoleNameValue = {this.state.roleName}
                                selectedRoleName = {this.state.roleName}
                                fetchRoles = {this.fetchRoles(this.props.userDetail)}
                                firstNameInputName="firstName"
                                firstNameValue = {this.state.firstName}
                                firstNameValueChange = {this.onChange}
                                lastNameInputName = "lastName"
                                lastNameValue = {this.state.lastName}
                                firstNameError = {this.state.errors.firstName}
                                NameKeyPress = {this.OnKeyPressUserhandler}
                                lastNameValueChange = {this.onChange}
                                lastNameError = {this.state.errors.lastName}
                                userNameInputName = "userName"
                                userNameValue = {this.state.userName}
                                userNameValueChange = {this.onChange}
                                userNameError = {this.state.errors.userName}
                                emailInputName= "email"
                                emailValue = {this.state.email}
                                emailError = {this.state.errors.email}
                                emailKeyPress={this.emailValid}
                                emailValueChange = {this.onChange}
                                familyInputName="familyMember"
                                familyValue={this.state.familyMember}
                                familyChange={this.onChange}
                                familyError={this.state.errors.familyMember}
                                parkingInputName="parking"
                                parkingAndFloorKeyPress = {this.parkingAndFloorKeyPress}
                                parkingValue={this.state.parking}
                                parkingChange={this.onChange}
                                parkingError={this.state.errors.parking}
                                floorInputName="floor"
                                floorValue={this.state.floor}
                                floorChange={this.onChange}
                                floorError={this.state.errors.floor}
                                towerInputName = "towerId"
                                fetchingTower={this.fetchTowers(this.props.TowerDetails)}
                                towerValue={this.state.towerId}
                                towerChange={this.onChange}
                                contactInputName = "contact"
                                contactValue = {this.state.contact}
                                contactError = {this.state.errors.contact}
                                contactValidation = {this.OnKeyPresshandlerPhone}
                                contactValueChange = {this.onChange}
                                updateUserClick={this.updateUser}
                                 />

                            <SearchFilter type="text" value={this.state.search}
                                onChange={this.searchOnChange} />
                                {deleteSelectedButton}
                            {!this.state.loading ? tableData : <Spinner />}
                        </div>
                        </UI>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userDetail: state.userDetail,
        TowerDetails: state.TowerDetails
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getUsers,
        getRoles,
        addUser,
        updateUser,
        viewTower,
        deleteUser,
        deleteSelectedUsers
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(userDetails)