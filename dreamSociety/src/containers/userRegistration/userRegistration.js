import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addUser, getRoles } from '../../actionCreators/superAdminMasterAction';
import { viewTower } from '../../actionCreators/towerMasterAction';
import { withRouter } from 'react-router-dom';
import { Form } from 'reactstrap';
import Spinner from '../../components/spinner/spinner';
import '../../r-css/w3.css';
import UserRegistrationForm from './userRegistrationForm';
import UI from '../../components/newUI/superAdminDashboard';


class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            roles: "",
            firstName: "",
            lastName: "",
            userName: "",
            email: "",
            familyMember:"",
            parking:"",
            floor:"",
            towerId: "",
            contact: "",
            password: "",
            passwordConfirmation: "",
            isSubmit: false,
            menuVisible: false,
            emailServerError:'',
            userNameServerError:'',
            loading: true,
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.submit = this.submit.bind(this);
        this.OnKeyPresshandlerPhone = this.OnKeyPresshandlerPhone.bind(this);
        this.OnKeyPressUserhandler = this.OnKeyPressUserhandler.bind(this);
    }
    toggleEditUserModal() {
        this.setState({
            editUserModal: !this.state.editUserModal
        });
    }

    componentDidMount() {
        this.renderRoles()
        this.renderTower()
    }

    renderRoles(){
        this.props.getRoles().then(() => this.setState({loading:false}));
    }

    renderTower(){
        this.props.viewTower().then(() => this.setState({loading:false}))
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

    parkingAndFloorKeyPress(event){
        const pattern = /^[a-zA-Z0-9 ]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    

    emailValid(event){
        const pattern = /^[a-zA-Z0-9@._]+$/
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }


    submit(e) {
        
        e.preventDefault();
        let errors = {};
        if (!this.state.roles) {
            errors.roles = "User type can't be empty. Please select"
        }
        
        if(!this.state.towerId){
            errors.towerId = "Tower can't be empty. Please select."
        }
        if(this.state.floor === '') errors.floor = "Can't be empty."
        if(this.state.parking === '') errors.parking = "Can't be empty."

        if (this.state.firstName === '') errors.firstName = "Can't be empty.";
        else if (this.state.firstName.length < 2) errors.firstName = "First name can't be less than four."

        if (this.state.lastName === '') errors.lastName = "Can't be empty";
        else if (this.state.lastName.length < 2) errors.lastName = "Last name can't be les than two.";
        if(this.state.familyMember === '') errors.familyMember="Can't be empty."
        if (this.state.userName === '') errors.userName = "Can't be empty.";
        if (this.state.email === '') errors.email = "Can't be empty.";
        if (this.state.contact === '') errors.contact = "Can't be empty.";
        if (this.state.password === '') errors.password = "Can't be empty.";
        else if (this.state.password !== this.state.passwordConfirmation) errors.passwordConfirmation = `Password doesn't match.`

        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0

        // const isValid = this.validate();
        if (isValid) {
            this.setState({loading: true})
            this.props.addUser(this.state).then(() =>{
                    this.props.history.push('/superDashboard/user_details')
                }
                    
            )
            .catch(err => {
                console.log(err.response.data.message);
                this.setState({emailServerError: err.response.data.message, userNameServerError:err.response.data.message, loading: false})
            });
        }
    }

    onChange(e) {
        console.log(this.state)
        
            this.setState({
                emailServerError:'',
                userNameServerError:'',
            })
        
        
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value.trim(''), errors });
        }
        else {
            this.setState({ [e.target.name]: e.target.value.trim('') });
        }
    }

    fetchRoles({ userRole }) {
        if (userRole) {
            return (
                userRole.map((item) => {
                    return (
                        <option value={item.roleName} key={item.id}>
                            {item.roleName}
                        </option>
                    )
                })
            )
        }
    }

    fetchTowers({tower}){
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

    routeToUserDetails = () => {
        this.props.history.push('/superDashboard/user_details');
    }
    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }
    close=()=>{
        return this.props.history.replace('/superDashBoard');
    }



    render() {
        let formData;

            formData = <UserRegistrationForm 
                roleInputName="roles"
                roleChange={this.onChange}
                fetchingRole={this.fetchRoles(this.props.userDetail)}
                roleError = {this.state.errors.roles}
                firstNameInputName="firstName"
                firstNameValue={this.state.firstName}
                firstNameChange = {this.onChange}
                NameKeyPress={this.OnKeyPressUserhandler}
                firstNameError={this.state.errors.firstName}
                lastNameInputName="lastName"
                lastNameValue={this.state.lastName}
                lastNameChange = {this.onChange}
                lastNameError={this.state.errors.lastName}
                userNameInputName ="userName"
                userNameValue={this.state.userName}
                userNameChange={this.onChange}
                userNameError = {this.state.errors.userName}
                emailInputName="email"
                emailValue={this.state.email}
                emailChange={this.onChange}
                emailError={this.state.errors.email}
                emailKeyPress={this.emailValid}
                contactInputName="contact"
                contactValue={this.state.contact}
                contactChange={this.onChange}
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
                floorError={this.state.errors.floor}
                floorChange={this.onChange}
                towerInputName = "towerId"
                fetchingTower={this.fetchTowers(this.props.TowerDetails)}
                towerValue={this.state.towerId}
                towerChange={this.onChange}
                towerError={this.state.errors.towerId}
                contactError={this.state.errors.contact}
                contactKeyPress={this.OnKeyPresshandlerPhone}
                passwordInputName="password"
                passwordValue={this.state.password}
                passwordChange={this.onChange}
                passwordError={this.state.errors.password}
                passwordConfirmationInputName="passwordConfirmation"
                passwordConfirmationValue={this.state.passwordConfirmation}
                passwordConfirmationChange={this.onChange}
                passwordConfirmationError={this.state.errors.passwordConfirmation}
                routeToUserDetails={this.routeToUserDetails}
                emailServerValidationError={this.state.emailServerError}
                userNameServerValidationError={this.state.userNameServerError}
                />
        
        return (
        <div>
            <UI onClick={this.logout}>
                <div>
                    <Form onSubmit={this.submit}>
                    <div>
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                    </div>

                        <div><h3 style={{textAlign:'center', marginBottom: '10px'}}>Add User</h3></div>
                        {!this.state.loading ? formData: <Spinner />}
                    </div>
                    </Form>
                </div>
            </UI>
        </div>
        );
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        userDetail: state.userDetail,
        TowerDetails: state.TowerDetails
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addUser, getRoles, viewTower }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Registration));

