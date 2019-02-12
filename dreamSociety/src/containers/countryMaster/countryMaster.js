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
        if (!this.state.errors[e.target.value]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            console.log('no errors');
            this.setState({ [e.target.name]: e.target.value.trim(''), errors });
        } else {
            this.setState({ [e.target.name]: e.target.value.trim('') });
        }


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
    onKeyPressHandler=(event)=> {
        const pattern = /^[a-zA-Z]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    onKeyPressHandle=(event)=> {
        const pattern = /^[0-9+]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    onKeyPressHandle1=(event)=>{
        const pattern = /^[a-zA-Z$]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    onKeyPressCode=(event)=>{
        const pattern = /^[A-Z]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    render() {
          
          let form;
          if(!this.state.loading && this.state.errors){
         form = <Form onSubmit={this.submit}>
          <h3 style={{textAlign:'center', marginBottom: '10px'}}>Country Master</h3>
            <FormGroup>
                <Label>Country Name</Label>
                <Input
                    type="text"
                    placeholder="Country Name"
                    name="countryName"
                    onKeyPress={this.onKeyPressHandler}
                    maxLength='30'
                    onChange={this.onChange} />
                <span className='error'>{this.state.errors.countryName}</span>
            </FormGroup>

            <FormGroup>
                <Label>Country Code</Label>
                <Input
                    type="text"
                    name="code"
                    placeholder="Country Code"
                    onKeyPress={this.onKeyPressCode}
                    maxLength='3'
                    onChange={this.onChange} />
                <span className='error'>{this.state.errors.code}</span>
            </FormGroup>

            <FormGroup>
                <Label>Currency</Label>
                <Input
                    type="text"
                    name="currency"
                    placeholder="Currency"
                    onKeyPress={this.onKeyPressHandle1}
                    maxLength='10'
                    onChange={this.onChange} />
                <span className='error'>{this.state.errors.currency}</span>
            </FormGroup>

            <FormGroup>
                <Label>Phone Code</Label>
                <Input
                    type="text"
                    name="phoneCode"
                    placeholder="Phone Code"
                    maxLength='3'
                    onKeyPress = {this.onKeyPressHandle}
                    onChange={this.onChange} />
                <span className='error'>{this.state.errors.phoneCode}</span>
            </FormGroup>


            <FormGroup>
                <Button color="success" className="mr-2">Submit</Button>
                <Button color="danger" onClick={this.countryDetails}>Cancel</Button>
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