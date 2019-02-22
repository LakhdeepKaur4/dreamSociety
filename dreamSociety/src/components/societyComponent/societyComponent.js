import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getCountry,getState,getCity} from '../../actionCreators/societyMasterAction';
import _ from 'underscore';

import { FormGroup,  Input, Label } from 'reactstrap';

import DefaultSelect from '../../constants/defaultSelect';




class SocietyComponent extends Component {
    constructor(props) {
        super(props);
        
        
        this.state = {
            cityName:'',
            countryName:'',
            stateName:'',
            countryId:'',
            stateId:'',
            cityId:'',
            errors: {},
            loading:true,
         
            menuVisible: false,
            
           
        }
      
        this.cityName=this.cityName.bind(this);

        
    }

  
    componentDidMount=()=>{
           this.props.getCountry().then(()=> this.setState({loading:false}))
           this.props.getState()
           this.props.getCity()
          
                       
    }

 

    onChangeCountry= (event)=>{

        let selected= event.target.value
    
        var country = _.find(this.props.societyReducer.countryResult,function(obj){
            return obj.countryName === selected
            })
        
            this.setState({
                countryName: country.countryName,
                countryId:country.countryId
            })
            
            this.props.getState(country.countryId)
          
    }

    
    onChangeState= (event)=>{
      
        let selected= event.target.value
        
        var data1 = _.find(this.props.societyReducer.stateResult,function(obj){
            return obj.stateName === selected
            })
    
            this.setState({
                stateName: data1.stateName,
                stateId:data1.stateId
            })
        
            this.props.getCity(data1.stateId);
            
         
    }

    onChangeCity= (event)=>{
      
        let selected= event.target.value
    
        var data2 = _.find(this.props.societyReducer.cityResult,function(obj){
            return obj.cityName === selected
            })
    
    
            this.setState({
                cityName:data2.cityName,
                cityId:data2.cityId
            })
            
      

    }

  


    
    countryName({countryResult}){
        if(countryResult){
          
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
       
        if(cityResult){
            
           return( 
            cityResult.map((item) =>{ 
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
        
        if(isValid) {

        this.setState({
          state:{
            countryName:'',
            stateName:'',
            cityName:'',
            countryId:'',
            stateId:'',
            cityId:'',
           
          }
        });
      }
    }


    
    OnKeyPressUserhandler(event) {
        const pattern = /^[a-zA-Z]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
       
  


    render() {
        let form;
        if(!this.state.loading && this.props.societyReducer.countryResult && this.props.societyReducer.stateResult && this.props.societyReducer.cityResult &&  this.state.errors){
            form= <div>
            
            <FormGroup>
            <Label><h4>Country Name</h4></Label>
            <Input type="select" defaultValue='no-value' name="countryName"  onChange={this.onChangeCountry} required>
                <DefaultSelect/>
                {this.countryName(this.props.societyReducer)}
            </Input>
            <span className='error'>{this.state.errors.countryName}</span>
        </FormGroup>

        <FormGroup>
            <Label><h4>State Name</h4></Label>
            <Input type="select" defaultValue='no-value' name="stateName"   onChange={this.onChangeState} required>
           <DefaultSelect/>
                {this.stateName(this.props.societyReducer)}
            </Input>
             <span className='error'>{this.state.errors.stateName}</span>
        </FormGroup>

        <FormGroup>
            <Label><h4>City Name</h4></Label>
            <Input type="select" defaultValue='no-value' name="cityName"  onChange={this.onChangeCity} required>
           <DefaultSelect/>
                {this.cityName(this.props.societyReducer)}  
            </Input>
            <span className='error'>{this.state.errors.cityName}</span>
        </FormGroup>

          </div>
   
        }
        return (
           <div>
               
               <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
        <span aria-hidden="true">&times;</span>
   </div>
                 
                 {form }
               
            </div> 
        );
    }
}

function mapStateToProps(state) {
   

    return {
        societyReducer: state.societyReducer    
    }



}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getCountry,getState,getCity}, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(SocietyComponent));