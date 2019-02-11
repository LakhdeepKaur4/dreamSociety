import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import{Link} from 'react-router-dom';
import {getCountry,getState,getCity,getLocation,postSociety,getSociety} from '../../actionCreators/societyMasterAction';
import _ from 'underscore';
import UI from '../../components/newUI/superAdminDashboard';



class SocietyMangement extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        

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
            
         
            menuVisible: false,
            
           
        }
      
        this.cityName=this.cityName.bind(this);

        
    }

  
    componentDidMount(){
           this.props.getCountry()
           this.props.getState()
           this.props.getCity()
           this.props.getLocation()
           this.props.getSociety()
           
                   
    }

    refreshData(){
        this.props.postSociety()
    }

    onChangeCountry= (event)=>{
        let selected= event.target.value
        console.log(selected)
        var country = _.find(this.props.societyReducer.countryResult,function(obj){
            return obj.countryName === selected
            })
            console.log(country)

            this.setState({
                countryName: country.countryName,
                countryId:country.countryId
            })
            
            this.props.getState(country.countryId)
          
    }

    
    onChangeState= (event)=>{
      
        let selected= event.target.value
        console.log(selected)
        var data1 = _.find(this.props.societyReducer.stateResult,function(obj){
            return obj.stateName === selected
            })
    
            console.log(data1)

            this.setState({
                stateName: data1.stateName,
                stateId:data1.stateId
            })
        
            this.props.getCity(data1.stateId);
            
         
    }

    onChangeCity= (event)=>{
      
        let selected= event.target.value
        console.log(selected)
       
        
        var data2 = _.find(this.props.societyReducer.cityResult,function(obj){
            return obj.cityName === selected
            })
    
            console.log(data2)

            this.setState({
                cityName:data2.cityName,
                cityId:data2.cityId
            })
            
        this.props.getLocation(data2.cityId)

    }

    onChangeLocation= (event)=>{
       
         let selected= event.target.value
         console.log(selected)
         
         
         
        var data3 = _.find(this.props.societyReducer.locationResult,function(obj){
            return obj.locationName === selected
            })

            
    
            console.log(data3)

            this.setState({
                locationName:data3.locationName,
                locationId:data3.locationId
            })

            this.props.getSociety(data3.locationId)

           
          
    }



    
    countryName({countryResult}){
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
            stateResult.map((item) =>{ console.log(item.stateName)
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

    locationName({locationResult}){
        if(locationResult){
            console.log(locationResult);
           return( 
            locationResult.map((item) =>{ console.log(item.locationName)
                   return(
                       <option key={item.locationId} value={item.locationName}>
                        {item.locationName}
                       </option>
                   )
               })
           )
            
        }
    }

    onChange=(e)=> {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    handleSubmit=(e)=>{
        e.preventDefault();

        
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

            
           
          }
        });
    }


    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }



    render() {
         console.log(this.props.societyReducer)
  
        return (
           <div>
               <UI onClick={this.logout}>
            <div>
                <form className="ui form" onSubmit={this.handleSubmit}>
                    <div className="field">
                        <label><h4>Country Name</h4></label>
                        <select name="countryName" className="ui fluid dropdown"  onChange={this.onChangeCountry}>
                            <option>Select</option>
                            {this.countryName(this.props.societyReducer)}
                            
                        
                        </select>
                    </div>
                    <div className="field">
                        <label><h4>State Name</h4></label>
                        <select name="stateName" className="ui fluid dropdown"  onChange={this.onChangeState}>
                            <option>Select</option>
                            {this.stateName(this.props.societyReducer)}
                           
                            
                            
                        </select>
                    </div>
                    <div className="field">
                        <label><h4>City Name</h4></label>
                        <select name="cityName" className="ui fluid dropdown"  onChange={this.onChangeCity}>
                            <option>Select</option>
                            {this.cityName(this.props.societyReducer)}
                            
                        </select>
                    </div>
                    <div className="field">
                        <label><h4>Location Name</h4></label>
                        <select name="locationName" className="ui fluid dropdown" onChange={this.onChangeLocation} >
                            <option>Select</option>
                            {this.locationName(this.props.societyReducer)}
                            
                        </select>
                    </div>
                    <div className="field">
                        <label htmlFor="societyName"><h4>Society Name</h4></label>
                        <input type="text" name="societyName" value={this.state.societyName} onChange={this.onChange}
                    maxLength='30'
                    minLength='3'/>
                    </div>

                    <button className="ui submit button" type="submit" style={{backgroundColor:'lightblue'}}>Submit</button>

                    <Link to='/superDashboard/societyManagementDetail'>
                    <button className="ui submit button" type="submit" style={{backgroundColor:'lightblue'}}>Show Details</button>
                    </Link>
                </form>
                <div>
                </div>
            </div>
            </UI>
            </div> 
        );
    }
}

function mapStateToProps(state) {
    console.log('===========stateCountry=========', state)
   
    return {
        societyReducer: state.societyReducer    
    }



}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getCountry,getState,getCity,getLocation,postSociety, getSociety}, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(SocietyMangement));



