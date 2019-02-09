import React,{Component} from 'react';
import {getLocation,getCountryName,getStateName,getCityName,getLocationName,updateLocation} from '../../actionCreators/locationMasterAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Button, Modal,FormGroup, ModalBody, ModalHeader, ModalFooter, Input, Label } from 'reactstrap';
import  axios from 'axios';
import {authHeader} from '../../helper/authHeader';
import {URN} from '../../actions/index';
import UI from '../../components/newUI/superAdminDashboard';



class locationDetails extends Component{
        
    state={

        editLocationData:{

            locationId:'',
            countryId:'',
            countryName: '',
            stateId: '',
            stateName:'',
            cityId: '',
            cityName:'',       
            locationName:'',
            isActive: false
    },
    editLocationModal: false
}


componentDidMount(){
    this.props.getLocation();
    this.props.getCountryName();
    this.props.getStateName();
    this.props.getCityName();
    this.props.getLocationName();
}


componentWillMount(){
    this.refreshData()
}

refreshData(){
     this.props.getLocation();
}

  
edit=(locationId,countryId,countryName,stateId,stateName,cityId,cityName,locationName)=>{
    this.setState({
        editLocationData:{
            locationId,countryId,countryName,stateId,stateName,cityId,cityName,locationName},editLocationModal: !this.state.editLocationModal
    })
    
}

updateDetails(){
    let {locationId,countryId,countryName,stateId,stateName,cityId,cityName,locationName} = this.state.editLocationData;

    console.log("--------------------------------------------------", locationId,countryId,countryName,stateId,stateName,cityId,cityName,locationName)

    this.props.updateLocation(locationId,countryId,countryName,stateId,stateName,cityId,cityName,locationName)
    .then(()=> this.refreshData())
    
    this.setState({
        editLocationModal: false, editLocationData:{locationId:'',countryId:'',countryName:'',stateId:'',stateName:'',cityId:'',cityName:'',locationName:''} })

}

 
toggleEditLocationModal(){
    this.setState({
        editLocationModal: ! this.state.editLocationModal
    });
    
}



getDropDown1=({country})=>{
    
    if(country){
        return country.map((items)=>{  console.log(items,"abc")

            return(
                <option key={items.countryId} value={items.countryId}>
                {items.countryName}
                </option>
            )
        })
    
    }
  
}

getDropDown2=({stateResult})=>{console.log(stateResult,"priya")

    if(stateResult){


    return stateResult.map((items) => {
        console.log(items.stateId,"stateName")
        return(
            <option key={items.stateId} value={items.stateId}> 
                {items.stateName}
            </option>
        )
    })
}}


getDropDown3=({city})=>{
    if(city){
        return city.map((items)=>{
            return(
                <option key={items.cityId} value={items.cityId}>
                    {items.cityName}
                </option>
            )
        })
    }
}


deleteLocation(locationId){
    let {isActive} = this.state.editLocationData;
    axios.put(`${URN}/location/`+locationId,{isActive},{headers:authHeader()}).then((response)=>{
        this.refreshData()
        this.setState({editLocationData:{isActive:false}})
    })
}



renderList =({details})=>{
      console.log(details,"abcsc")
    if(details){
        return details.map((item) =>{
        
            return(
                   
                    <tr  key={item.locationId}>
                                          
                            <td>{item.country_master.countryName}</td>
                            <td>{item.state_master.stateName}</td>
                            <td>{item.city_master.cityName}</td>
                            <td>{item.locationName}</td>
                                <td>
                                   <button className="btn btn-primary" onClick={this.edit.bind(this,item.locationId,item.countryId,item.country_master.countryName,item.stateId,item.state_master.stateName,item.cityId,item.city_master.cityName,item.locationName)} >Edit</button>
                                </td>
                                 <td>
                                   <button className="btn btn-danger" onClick ={this.deleteLocation.bind(this,item.locationId)} >Delete</button>
                                 </td>  
                    </tr>
       
            )
        })
    }  
}    

logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user-type');
    return this.props.history.replace('/') 
}

render(){
    
    return(
        <UI onClick={this.logout}>
        <div>
            <Modal isOpen={this.state.editLocationModal} toggle={this.toggleEditLocationModal.bind(this)}>
                <ModalHeader toggle={this.toggleEditLocationModal.bind(this)}>Edit Details</ModalHeader>
                <ModalBody>

                    <FormGroup>
                        <Label >Country Name</Label>
                            <Input  id="countryId" name="countryName" type="select" onChange={(e)=>{
                         
                            let{countryId}=this.state;
                            countryId= e.target.value;
                            
                            
                            this.props.getStateName(countryId)
                            this.setState({countryId})
                            console.log("gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",countryId)
                           
                        }}>
                            <option value={this.state.editLocationData.countryId}>{this.state.editLocationData.countryName}</option>
                            <option disabled>---SELECT---</option>
                            {this.getDropDown1(this.props.locationMasterReducer)}                       
                        </Input>
                    </FormGroup>

                    <FormGroup>
                        <Label>State Name</Label>
                         <Input id="stateId" type="select" name="stateName" onChange={(e)=>{
                    
                            let{stateId} =this.state;
                            stateId=e.target.value;
                            
                            this.props.getCityName(stateId)
                            this.setState({stateId})
                            
                            console.log("gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",stateId)
                    }}>
                        <option  value={this.state.editLocationData.stateId} >{this.state.editLocationData.stateName}</option>
                        <option disabled>--SELECT--</option>
                        {this.getDropDown2(this.props.locationMasterReducer)}
                        </Input>
                        </FormGroup> 

                        <FormGroup>
                          <Label>City Name</Label>
                            <Input id="cityId" type="select" name="cityName" onChange={(e)=>{

                            let{cityId} =this.state;
                            cityId=e.target.value;
                            
                            this.props.getLocationName(cityId)
                            this.setState({cityId})
                            console.log("ciiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",cityId)
                            
                        }}>
                            <option  value={this.state.editLocationData.cityId} >{this.state.editLocationData.cityName}</option>
                            <option disabled>--SELECT--</option>
                            {this.getDropDown3(this.props.locationMasterReducer)}
                        </Input>
                        </FormGroup>

                        <FormGroup>
                            <Label>Location Name</Label>
                                <Input id="locationName" value={this.state.editLocationData.locationName} onChange={(e)=>{
                                    let {editLocationData} =this.state;
                                    editLocationData.locationName=e.target.value;
                                    this.setState({editLocationData});
                                }} ></Input>
                        </FormGroup>
                
                         <ModalFooter>
                            <Button color="primary" onClick={this.updateDetails.bind(this)}>Update </Button>
                            <Button color="secondary" onClick={this.toggleEditLocationModal.bind(this)}>Cancel</Button>
                        </ModalFooter>

                </ModalBody>

                
            </Modal>
                  
            <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Country Name</th>
                        <th>State Name</th>
                        <th>City Name</th>
                        <th>Location Name</th>
                    </tr>
                    </thead>
                    
                    <tbody>
                    {this.renderList(this.props.locationMasterReducer)}
                    </tbody>
                </table>    
                
                {/* <button onClick={this.push}> Add Flat</button> */}
        </div>
        </UI>
    )
}

}

function mapStateToProps(state){
    return{
        locationMasterReducer:state.locationMasterReducer
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getLocation,getCountryName,getStateName,getCityName,getLocationName,updateLocation},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(locationDetails);