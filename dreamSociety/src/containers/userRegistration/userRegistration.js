import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { addUser, getRoles } from '../../actionCreators/superAdminMasterAction'
import './userRegistration.css';
import { withRouter } from 'react-router-dom';
import Logo from '../../assets/2.jpg';
import { Form, FormGroup, Input, Button, Label } from 'reactstrap';
import SideBar from '../../components/superAdminDashboardUI/sideBar/sideBar';
import MenuBar from '../../components/superAdminDashboardUI/menuBar/menuBar';
import '../../r-css/w3.css';
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
            message: '',
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

    OnKeyPressPasswordhandler(event) {
        const pattern = /^[a-zA-Z0-9]+$/;
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

    render() {
        return (<div>
            {/* <MenuBar onClick={() => this.setState({ menuVisible: !this.state.menuVisible })}/>
            <div style={{ marginTop: '48px' }}>
               <SideBar
                    onClick={() => this.setState({ menuVisible: false })}
                    style={{ backgroundImage: `url(${Logo})`,padding:'55px 0px',
                    backgroundSize: 'cover', backgroundRepeat: 'no-repeat', overFlow:`auto` }}
                    visible={this.state.menuVisible}> */}
            <UI>
                <div>
                    {this.state.message}
                </div>
                <div style={{ width: '600px', padding: '20px 20px', borderRadius: '20px', margin: '0 auto', background: '#f3f3f3', position: 'relative' }}>
                    <Form onSubmit={this.submit}>
                        <FormGroup>
                            <Label>User Type</Label>
                            <Input type="select" name="roles" onChange={this.onChange}>
                                <option value=''>--Select--</option>
                                {this.fetchRoles(this.props.userDetail)}
                            </Input>


                            <span className='error'>{this.state.errors.roles}</span>
                        </FormGroup>
                        <FormGroup>
                            <Label>FirstName</Label>
                            <Input name="firstName"
                                type="text"
                                value={this.state.firstName}
                                onChange={this.onChange}
                                onKeyPress={this.OnKeyPressUserhandler} />
                            <span className='error'>{this.state.errors.firstName}</span>
                        </FormGroup>
                        <FormGroup>
                            <Label>LastName</Label>
                            <Input name="lastName"
                                type="text"
                                value={this.state.lastName}
                                onChange={this.onChange}
                                onKeyPress={this.OnKeyPressUserhandler} />
                            <span className='error'>{this.state.errors.lastName}</span>
                        </FormGroup>
                        <FormGroup>
                            <Label>Username</Label>
                            <Input name="userName"
                                type="text"
                                value={this.state.userName}
                                onChange={this.onChange} />
                            <span className='error'>{this.state.errors.userName}</span>
                        </FormGroup>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input name="email"
                                type="email"
                                value={this.state.email}
                                onChange={this.onChange} />
                            <span className='error'>{this.state.errors.email}</span>
                        </FormGroup>
                        <FormGroup>
                            <Label>Contact No.</Label>
                            <Input name="contact"
                                type="text"
                                value={this.state.contact}
                                onChange={this.onChange}
                                onKeyPress={this.OnKeyPresshandlerPhone}
                                maxLength='10'
                                minLength='10' />
                            <span className='error'>{this.state.errors.contact}</span>
                        </FormGroup>
                        <FormGroup>
                            <Label>Password</Label>
                            <Input name="password"
                                type="password"
                                value={this.state.password}
                                onChange={this.onChange}
                                onKeyPress={this.OnKeyPressPasswordhandler} />
                            <span className='error'>{this.state.errors.password}</span>
                        </FormGroup>
                        <FormGroup>
                            <Label>Confirm Password</Label>
                            <Input name="passwordConfirmation"
                                type="password"
                                value={this.state.passwordConfirmation}
                                onChange={this.onChange}
                                onKeyPress={this.OnKeyPressPasswordhandler} />
                            <span className='error'>{this.state.errors.passwordConfirmation}</span>
                        </FormGroup>

                        <Button color="primary" className="mr-2">Add User</Button>
                        <Button onClick={this.routeToUserDetails} color="primary">User Details</Button>
                    </Form>
                </div>
            </UI>
            {/* </SideBar> */}


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

