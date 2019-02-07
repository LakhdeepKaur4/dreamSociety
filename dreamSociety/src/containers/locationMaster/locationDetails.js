import React,{Component} from 'react';
import {getLocation,getCountryName,getState,getCity} from '../../actionCreators/locationMasterAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Button, Modal,FormGroup, ModalBody, ModalHeader, ModalFooter, Input, Label } from 'reactstrap';
import  axios from 'axios';
import {authHeader} from '../../helper/authHeader';
import {URN} from '../../actions/index';


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
    this.props.getState();
    this.props.getCity();
}


componentWillMount(){
    this.refreshData()
}

refreshData(){
     this.props.getLocation();
}

  
edit=(locationId,countryId,stateId,cityId,locationName,stateName)=>{
   
    this.setState({
        editLocationData:{
            locationId,countryId,stateId,cityId,locationName,stateName},editLocationModal: !this.state.editLocationModal
    })
    
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
                <option key={items.countryId} value={items.countryName}>
                {items.countryName}
                </option>
            )
        })
    
    }
  
}

getDropDown2=({state1})=>{console.log(state1,"priya")

    if(state1){


    return state1.map((items) => {
        console.log(items.stateId,"stateName")
        return(
            <option key={items.stateId} value={items.stateName}> 
                {items.stateName}
            </option>
        )
    })
}}


getDropDown3=({city1})=>{
    if(city1){
        return city1.map((items)=>{
            return(
                <option key={items.cityId} value={items.cityName}>
                    {items.cityName}
                </option>
            )
        })
    }
}


updateDetails(){
    console.log(this.state.editLocationData,"abc")
    let { countryId,stateId,cityId,locationName } = this.state.editLocationData;
    axios.put(`${URN}/location/` + this.state.editLocationData.locationId, {
        countryId, stateId, cityId,locationName
    }, { headers: authHeader() }).then((response) => {
        this.refreshData();

        this.setState({
            editLocationModal: false, editLocationData: { locationId: '', countryId: '', stateId: '', cityId: '' , locationName: '' }
        })
    });
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
        return details.map((item) =>{console.log("itemm222222222",item)
        
            return(
                   
                    <tr  key={item.locationId}>
                                          
                            <td>{item.country_master.countryName}</td>
                            <td>{item.state_master.stateName}</td>
                            <td>{item.city_master.cityName}</td>
                            <td>{item.locationName}</td>
                           
                            
                                <td>
                                   <button className="btn btn-primary" onClick={this.edit.bind(this,item.locationId,item.country_master.countryName,item.stateId,item.city_master.cityName,item.locationName,item.stateName)} >Edit</button>
                                </td>
                                 <td>
                                   <button className="btn btn-danger" onClick ={this.deleteLocation.bind(this,item.locationId)} >Delete</button>
                                 </td>  
                    </tr>
       
            )
        })
    }  
}    

render(){
    return(
        <div>
            <Modal isOpen={this.state.editLocationModal} toggle={this.toggleEditLocationModal.bind(this)}>
                <ModalHeader toggle={this.toggleEditLocationModal.bind(this)}>Edit Details</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label>Country Name</Label>
                        <Input id="countryName" type="select" value={this.state.editLocationData.countryId} onChange={(e)=>{
                            let{editLocationData}=this.state;
                            editLocationData.countryId= e .target.value;
                            this.setState({editLocationData})
                        }}>
                            <option value={this.state.countryId}>{this.state.countryName}</option>
                            <option disabled>---SELECT---</option>
                            {this.getDropDown1(this.props.locationMasterReducer)}                       
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>State Name</Label>
                        <Input type="select"   onChange={(e)=>{
                            let{editLocationData} =this.state;
                            editLocationData.stateId=e.target.value;
                            this.setState({editLocationData})
                        }}>
                            <option value={this.state.editLocationData.stateId}>{this.state.editLocationData.stateName}</option>

                            <option disabled>--SELECT--</option>
                            {this.getDropDown2(this.props.locationMasterReducer)}
                        </Input>
                        </FormGroup>
                    {/* </FormGroup>
                    <FormGroup>
                        <Label>City Name</Label>
                        <Input type="select" id="cityName" value={this.state.editLocationData.cityId} onChange={(e)=>{
                            let{editLocationData} =this.state;
                            editLocationData.cityId=e.target.value;
                            this.setState({editLocationData})
                        }}>
                          
                            <option disabled>--SELECT--</option>
                            {this.getDropDown3(this.props.locationMasterReducer)}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Location Name</Label>
                        <Input value={this.state.editLocationData.locationName} onChange={(e)=>{
                            let {editLocationData}=this.state;
                            editLocationData.locationName=e.target.value;
                            this.setState({editLocationData})
                        }}>
                        </Input>
                    </FormGroup> */}
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
    )
}

}

function mapStateToProps(state){
    return{
        locationMasterReducer:state.locationMasterReducer
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getLocation,getCountryName,getState,getCity},dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(locationDetails);