import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {getCountry,getState,getCity,getLocation,postSociety,getSociety} from '../../actionCreators/societyMasterAction';
import _ from 'underscore';
import UI from '../../components/newUI/superAdminDashboard';
import {Form, Button,  FormGroup,  Input, Label } from 'reactstrap';
import Spinner from '../../components/spinner/spinner'
import DefaultSelect from '../../constants/defaultSelect';




class SocietyMangement extends Component {
    constructor(props) {
        super(props);
        
        

        this.state = {
            cityName:'',
            countryName:'',
            stateName:'',
            locationName:'',
            countryId:'',
            stateId:'',
            cityId:'',
            locationId:'',
            societyName:'',
            societyAddress:'',
            contactNumber:'',
            registrationNumber:'',
            totalBoardMembers:'',
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
           this.props.getLocation()
           this.props.getSociety()
                       
    }

    refreshData=()=>{
        this.props.postSociety()
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
            
        this.props.getLocation(data2.cityId)

    }

    onChangeLocation= (event)=>{
       
         let selected= event.target.value
        var data3 = _.find(this.props.societyReducer.locationResult,function(obj){
            return obj.locationName === selected
            })

            this.setState({
                locationName:data3.locationName,
                locationId:data3.locationId
            })

            this.props.getSociety(data3.locationId)

           
          
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

    locationName({locationResult}){
        if(locationResult){
          
           return( 
            locationResult.map((item) =>{ 
                   return(
                       <option key={item.locationId} value={item.locationName}>
                        {item.locationName}
                       </option>
                   )
               })
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

        if (this.state.locationName === '') errors.locationName = "cant be empty";
        this.setState({ errors });

        if (this.state.societyName === '') errors.societyName = "cant be empty";
        this.setState({ errors });



        const isValid = Object.keys(errors).length === 0;
        
        if(isValid) {
        
         this.setState({loading:true})
        this.props.postSociety(this.state)
        .then(() => this.props.history.push('/superDashboard/societyManagementDetail'))

        this.setState({
          state:{
            countryName:'',
            stateName:'',
            cityName:'',
            locationName:'',
            countryId:'',
            stateId:'',
            cityId:'',
            locationId:'',
            societyName:'',
            societyAddress:'',
            contactNumber:'',
            registrationNumber:'',
            totalBoardMembers:'',

            
           
          }
        });
      }
    }


    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }

    societyDetails=()=>{
        this.props.history.push('/superDashboard/societyManagementDetail');
    }

    OnKeyPressUserhandler(event) {
        const pattern = /^[a-zA-Z]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
       
    close=()=>{
        return this.props.history.replace('/superDashBoard')
    }



    render() {
        let form;
        if(!this.state.loading && this.props.societyReducer.countryResult && this.props.societyReducer.stateResult && this.props.societyReducer.cityResult && this.props.societyReducer.locationResult && this.state.errors){
            form= <div>
            
            <FormGroup>
            <Label><h4>Society Name</h4></Label>
            <Input placeholder="Society Name" type="text" name="societyName" value={this.state.societyName} onChange={this.onChange} maxLength={30}/>
             <span className='error'>{this.state.errors.societyName}</span>
           </FormGroup>

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

        <FormGroup>
            <Label><h4>Location Name</h4></Label>
            <Input type="select" defaultValue='no-value' name="locationName"  onChange={this.onChangeLocation} required>
               <DefaultSelect/>
                {this.locationName(this.props.societyReducer)}
            </Input>
            <span className='error'>{this.state.errors.locationName}</span>
        </FormGroup>

        <FormGroup>
            <Label><h4>Society Address</h4></Label>
            <Input placeholder="Society Address" type="text" name="societyAddress" value={this.state.societyAddress} onChange={this.onChange} maxLength={30}/>
             <span className='error'>{this.state.errors.societyAddress}</span>
        </FormGroup>

           
        <FormGroup>
            <Label><h4>Society Contact No.</h4></Label>
            <Input placeholder="Society Contact No." type="text" name="contactNumber" value={this.state.contactNumber} onChange={this.onChange} maxLength={10}/>
             <span className='error'>{this.state.errors.contactNumber}</span>
        </FormGroup>
        

            
        <FormGroup>
            <Label><h4>Society Registration No.</h4></Label>
            <Input placeholder="Society Registration No." type="text" name="registrationNumber" value={this.state.registrationNumber} onChange={this.onChange} maxLength={30}/>
             <span className='error'>{this.state.errors.registrationNumber}</span>
        </FormGroup>


        <FormGroup>
            <Label><h4>Total Board Member</h4></Label>
            <Input placeholder="Total Board Member" type="text" name="totalBoardMembers" value={this.state.totalBoardMembers} onChange={this.onChange} maxLength={30}/>
             <span className='error'>{this.state.errors.totalBoardMembers}</span>
        </FormGroup>

    
      
          <Button color="success" className="mr-2">Submit</Button>
          <Button color="danger" onClick={this.societyDetails}>Cancel</Button>
          </div>
   
        }
        return (
           <div>
               <UI onClick={this.logout}>
               <Form  onSubmit={this.handleSubmit}>
               <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
        <span aria-hidden="true">&times;</span>
   </div>
                 <h3 style={{textAlign:'center', marginBottom: '10px'}}>Society Master</h3>
                 {!this.state.loading ? form : <Spinner />}
                </Form>
               </UI>
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
    return bindActionCreators({ getCountry,getState,getCity,getLocation,postSociety, getSociety}, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(SocietyMangement));