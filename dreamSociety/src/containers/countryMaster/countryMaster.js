import React, { Component } from 'react';
import { FormGroup, Form, Input, Button, Label } from 'reactstrap';
import './countryMaster.css';
import { connect } from 'react-redux';
import { AddCountry } from '../../actionCreators/countryAction';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Spinner from '../../components/spinner/spinner';
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
            loading:false,
            menuVisible: false
        }
    }

    componentWillMount(){
        this.refreshData()
    }

    refreshData(){
        this.setState({loading: false})
    }

    onChange = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value })
        //   console.log(this.state);

    }

    OnKeyPresshandlerPhone = (event) => {
        const pattern = /^[0-9+]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
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
            this.setState({ loading: true })
            this.props.AddCountry({ ...this.state })
            .then(() => this.props.history.push('/superDashboard/countrymaster/countrymasterdetails'));
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
          
          let form;
          if(!this.state.loading && this.state.errors){
         form = <Form onSubmit={this.submit}>
            <FormGroup>
                <Label>CountryName</Label>
                <Input
                    type="text"
                    name="countryName"
                    maxLength='20'
                    onChange={this.onChange} />
                <span>{this.state.errors.countryName}</span>
            </FormGroup>

            <FormGroup>
                <Label>Code</Label>
                <Input
                    type="text"
                    name="code"
                    maxLength='3'
                    onChange={this.onChange} />
                <span>{this.state.errors.code}</span>
            </FormGroup>

            <FormGroup>
                <Label>Currency</Label>
                <Input
                    type="text"
                    name="currency"
                    maxLength='10'
                    onChange={this.onChange} />
                <span>{this.state.errors.currency}</span>
            </FormGroup>

            <FormGroup>
                <Label>PhoneCode</Label>
                <Input
                    type="text"
                    name="phoneCode"
                    maxLength='3'
                    onKeyPress = {this.OnKeyPresshandlerPhone}
                    onChange={this.onChange} />
                <span>{this.state.errors.phoneCode}</span>
            </FormGroup>


            <FormGroup>
                <Button className="mr-2">Submit</Button>
                <Button onClick={this.countryDetails}>CountryDetails</Button>
            </FormGroup>
        </Form>
          }

          else if(this.submit){
            form = <Spinner />
        }

        return (
            <div>
                <UI onClick={this.logout}>
                    <div>
                       {form}
                    </div>
                </UI>

            </div>
        )

    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ AddCountry }, dispatch)
}
export default connect(null, mapDispatchToProps)(Country);