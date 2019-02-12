import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getCountry,getState,getCity, addCity,detailCity} from './../../actionCreators/cityMasterAction';
import UI from '../../components/newUI/superAdminDashboard';
import _ from 'underscore';
import Spinner from '../../components/spinner/spinner'
import {Form, Button,  FormGroup,  Input, Label } from 'reactstrap';



class CityMaster extends Component {
    constructor(props) {
        super(props);
       


        this.state = {
            cityName:'',
            countryName:'',
            stateName:'',
            countryId:'',
            stateId:'',
            loading: true,
            errors: {},

            menuVisible: false,
         }

        this.cityName=this.cityName.bind(this);


    }


    componentDidMount=()=>{
           this.refreshData()
    }



    refreshData=()=>{
        this.props.getCountry().then(() => this.setState({loading: false}));
        this.props.getState().then(() => this.setState({loading: false}));
        this.props.getCity().then(() => this.setState({loading: false}));
    }

    onChangeCountry= (event)=>{
        let selected= event.target.value
        console.log(selected)

        var country = _.find(this.props.cityMasterReducer.countryResult,function(obj){
            return obj.countryName === selected
            })


            console.log(country)



            this.props.getState(country.countryId).then(() => this.setState({countryId: country.countryId,
                countryName: country.countryName}))


    }


    onChangeState= (event)=>{
        this.setState({loading: false})
        let selected= event.target.value
        console.log(selected)


        var data1 = _.find(this.props.cityMasterReducer.stateResult,function(obj){
            return obj.stateName === selected
            })

            console.log(data1)


            this.props.getCity(data1.stateId);

            this.setState({
                stateId: data1.stateId,
                stateName:data1.stateName
            })


    }

    onCityChange=(e)=>{
      this.setState({
          [e.target.name]:e.target.value

      })

      console.log(this.state.cityName)

    }

    countryName=({countryResult})=>{
        if(countryResult){
            console.log(countryResult);
           return(
            countryResult.map((item) =>{
                   return(
                       <option key={item.countryId} value={item.countryName}>
                        {item.countryName}
                       </option>
                   )
               })
           )

        }
    }

    stateName({stateResult}){
        if(stateResult){
            console.log(stateResult);
           return(
            stateResult.map((item) =>{
                   return(
                       <option key={item.stateId} value={item.stateName}>
                        {item.stateName}
                       </option>
                   )
               })
           )

        }
    }

    cityName=({cityResult})=>{
        console.log(cityResult);
        if(cityResult){

           return(
            cityResult.map((item) =>{ console.log(item.cityName)
                   return(
                       <option key={item.cityId} value={item.cityName}>
                        {item.cityName}
                       </option>
                   )
               }
               )
           )

        }
    }


    onChange=(e) =>{
        if (!!this.state.errors[e.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({ [e.target.name]: e.target.value.trim(''), errors });
        }
        else {
            this.setState({ [e.target.name]: e.target.value.trim('') });
        }
    }
    OnKeyPressUserhandler(event) {
        const pattern = /^[a-zA-Z]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    handleSubmit=(e)=>{
        e.preventDefault();

        let errors = {};
        if (!this.state.countryName) {
            errors.countryName = "cant be empty"
        }
        if (this.state.stateName === '') errors.stateName = "cant be empty";
        this.setState({ errors });

        if (this.state.cityName === '') errors.cityName = "cant be empty";
        this.setState({ errors });


        const isValid = Object.keys(errors).length === 0;

        if(isValid){
        this.setState({loading:true})
        this.props.addCity(this.state)
        .then(()=>this.props.history.push('/superDashboard/cityMasterDetail'))

        this.setState({
          state:{
            cityName:'',
            countryId:'',
            stateId:'',


            menuVisible: false,


          }


        });
    }
    }

    logout=()=>{
                localStorage.removeItem('token');
                localStorage.removeItem('user-type');
                return this.props.history.replace('/') 
            }

    cityDetails=()=>{
        this.props.history.push('/superDashboard/cityMasterDetail');
    }

    render() {

        let formData;
        if(!this.state.loading && this.props.cityMasterReducer.countryResult && this.props.cityMasterReducer.stateResult  &&  this.state.errors){
        formData =<div>
         <FormGroup>
            <Label><h4>Country Name</h4></Label>
            <Input type="select" onChange={this.onChangeCountry} required>
            <option value='' disabled selected>--Select--</option>
                {this.countryName(this.props.cityMasterReducer)}
            </Input >
            <span className='error'>{this.state.errors.countryName}</span>
        </FormGroup>
        
        <FormGroup>
            <Label><h4>State Name</h4></Label>
            <Input type="select"  onChange={this.onChangeState} required>
            <option value='' disabled selected>--Select--</option>
                {this.stateName(this.props.cityMasterReducer)}
            </Input>
            <span className='error'>{this.state.errors.stateName}</span>
        </FormGroup>

      <FormGroup>
            <Label htmlFor='cityName'><h4>City Name</h4></Label>
            <Input  type="text" name="cityName" value={this.state.cityName} onChange={this.onChange}  onKeyPress={this.OnKeyPressUserhandler} placeholder="City Name" maxLength={30}
        minLength={3}/>
            <span className='error'>{this.state.errors.cityName}</span>
        </FormGroup>
         
        <Button color="success" className="mr-2">Submit</Button>
        <Button color="danger" onClick={this.cityDetails}>Cancel</Button>
        </div>

        }
        return (
            <div>
                <UI onClick={this.logout}>
                <Form onSubmit={this.handleSubmit}>
                    <h3 style={{textAlign:'center', marginBottom: '10px'}}>City Master</h3>
                    {!this.state.loading ? formData : <Spinner />}
                </Form>
                </UI>

            </div>
        );
    }
}

function mapStateToProps(state) {

    return {
        cityMasterReducer: state.cityMasterReducer
    }



}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getCountry,getState,getCity,addCity,detailCity }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(CityMaster));
