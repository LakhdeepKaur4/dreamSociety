import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addUser, getRoles } from '../../actionCreators/superAdminMasterAction'
import './userRegistration.css';
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
            roleName: [],
            roles: "",
            firstName: "",
            lastName: "",
            userName: "",
            email: "",
            contact: "",
            password: "",
            passwordConfirmation: "",
            isSubmit: false,
            menuVisible: false,
            message:'',
            loading: false,
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
        this.props.getRoles();
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

    emailValid(event){
        const pattern = /^[a-zA-Z0-9@._]+$/
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    onChange(e) {
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value.trim(''), errors });
        }
        else {
            this.setState({ [e.target.name]: e.target.value.trim('') });
        }
    }

    submit(e) {
        
        e.preventDefault();
        let errors = {};
        if (!this.state.roles) {
            errors.roles = "User type can't be empty. Please select"
        }

        if (this.state.firstName === '') errors.firstName = "Can't be empty";
        else if (this.state.firstName.length < 2) errors.firstName = "First name can't be less than four"

        if (this.state.lastName === '') errors.lastName = "Can't be empty";
        else if (this.state.lastName.length < 2) errors.lastName = "Last name can't be les than two";

        if (this.state.userName === '') errors.userName = "Can't be empty";
        if (this.state.email === '') errors.email = "Can't be empty";
        if (this.state.contact === '') errors.contact = "Can't be empty";
        if (this.state.password === '') errors.password = "Can't be empty";
        else if (this.state.password !== this.state.passwordConfirmation) errors.passwordConfirmation = `Password doesn't match`

        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0

        // const isValid = this.validate();
        if (isValid) {
            this.setState({loading: true})
            this.props.addUser({ ...this.state })
            .then(() => this.props.history.push('/superDashboard/user_details'));
            this.setState({
                roleName: [],
                roles: "",
                firstName: "",
                lastName: "",
                userName: "",
                email: "",
                contact: "",
                password: "",
                passwordConfirmation: "",
                isSubmit: true
            });
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

    routeToUserDetails = () => {
        this.props.history.push('/superDashboard/user_details');
    }
    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }


    render() {
        let formData;
        if(!this.state.loading && this.props.userDetail.userRole && this.state.errors){
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
                />
        }
        else if(!this.props.userDetail.userRole){
            formData = <div style={{textAlign:'center', fontSize:'20px'}}><Spinner />Fetching Role Names. Please! Wait...</div>
        }
        else if(this.submit){
            formData = <div style={{textAlign:'center', fontSize:'20px'}}><Spinner />User is getting registered. Please! Wait...</div>
        }
        
        return (
        <div>
            <UI onClick={this.logout}>
                <div>
                    {this.state.message}
                </div>
                <div style={{ width: '600px', padding: '20px 20px', borderRadius: '20px', margin: '0 auto', background: '#f3f3f3', position: 'relative' }}>
                    <Form onSubmit={this.submit}>
                    <div>
                        <div><h3 style={{textAlign:'center', marginBottom: '10px'}}>Add User</h3></div>
                        {formData}
                    </div>
                    </Form>
                </div>
            </UI>
        </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        userDetail: state.userDetail
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addUser, getRoles }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Registration));

