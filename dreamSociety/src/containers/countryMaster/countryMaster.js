import React, { Component } from 'react';
import { FormGroup, Form, Input, Button, Label } from 'reactstrap';
import './countryMaster.css';
import { connect } from 'react-redux';
import { AddCountry } from '../../actionCreators/countryAction';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Logo from '../../assets/2.jpg';
import SideBar from '../../components/superAdminDashboardUI/sideBar/sideBar';
import MenuBar from '../../components/superAdminDashboardUI/menuBar/menuBar';
import UI from '../../components/newUI/superAdminDashboard';

class Country extends Component {

    constructor(props) {
        super(props);
        this.state = {
            countryName: '',
            code: '',
            currency: '',
            phoneCode: '',
            errors: {},
            isSubmit: false,
            menuVisible: false
        }
    }

    onChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value })
        //   console.log(this.state);

    }

    submit = (e) => {
        e.preventDefault();
        //   console.log(this.state);
        let errors = {};

        if (this.state.countryName === '') errors.countryName = "cant be empty";

        if (this.state.code === '') errors.code = "cant be empty";
        else if (this.state.code.length < 3) errors.code = "Characters should be less than four"
        if (this.state.currency === '') errors.currency = "cant be empty";

        if (this.state.phoneCode === '') errors.phoneCode = "cant be empty";

        this.setState({ errors });

        const isValid = Object.keys(errors).length === 0;
        if (isValid) {
            // this.setState({ isSubmit: true })
            this.props.AddCountry({ ...this.state });
            this.setState({
                countryName: '',
                code: '',
                currency: '',
                phoneCode: '',
                isSubmit: true
            });
        }
    }

    countryDetails = () => {
        console.log('jioi');
        this.props.history.push('/superDashboard/countrymaster/countrymasterdetails');
    }

    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }

    render() {


        const form = <Form onSubmit={this.submit}>
            <FormGroup>
                <Label>CountryName</Label>
                <Input
                    type="text"
                    name="countryName"
                    onChange={this.onChange} />
                <span>{this.state.errors.countryName}</span>
            </FormGroup>

            <FormGroup>
                <Label>Code</Label>
                <Input
                    type="text"
                    name="code"
                    max='3'
                    onChange={this.onChange} />
                <span>{this.state.errors.code}</span>
            </FormGroup>

            <FormGroup>
                <Label>Currency</Label>
                <Input
                    type="text"
                    name="currency"
                    onChange={this.onChange} />
                <span>{this.state.errors.currency}</span>
            </FormGroup>

            <FormGroup>
                <Label>PhoneCode</Label>
                <Input
                    type="number"
                    name="phoneCode"
                    onChange={this.onChange} />
                <span>{this.state.errors.phoneCode}</span>
            </FormGroup>


            <FormGroup>
                <Button className="mr-2">Submit</Button>
                <Button onClick={this.countryDetails}>CountryDetails</Button>
            </FormGroup>
        </Form>

        return (
            <div>
                {/* <MenuBar onClick={() => this.setState({menuVisible: !this.state.menuVisible})} />
                    <div style={{ margin: '48px auto' }}>
                    <SideBar onClick={() => this.setState({menuVisible: false})}
                        visible={this.state.menuVisible}
                        style={{ backgroundImage: `url(${Logo})`,padding:'55px 0px',
                        backgroundSize: 'cover', backgroundRepeat: 'no-repeat', overFlow:`auto` }}> */}
                <UI onClick={this.logout}>
                    <div className="flatMaster">
                        {this.state.isSubmit ? <Redirect to="/superDashboard/countrymaster/countrymasterdetails" /> : form}
                    </div>
                </UI>
                {/* </SideBar>
                </div> */}

            </div>
        )

    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ AddCountry }, dispatch)
}
export default connect(null, mapDispatchToProps)(Country);