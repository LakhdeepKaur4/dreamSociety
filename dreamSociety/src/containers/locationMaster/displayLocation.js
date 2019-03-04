import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getLocation,getStateName,getCountryName,getCityName,getLocationName,updateLocation,deleteLocation,deleteSelectedLocation} from '../../actionCreators/locationMasterAction';
import { bindActionCreators } from 'redux';
import { Button, Modal, FormGroup, ModalBody,Table, ModalHeader, Input, Label } from 'reactstrap';
import UI from '../../components/newUI/superAdminDashboard';
import SearchFilter from '../../components/searchFilter/searchFilter';
import Spinner from '../../components/spinner/spinner';

class DisplayLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editLocation: {
                countryId: '',
                countryName: '',
                stateName: '',
                stateId: '',
                cityName: '',
                cityId: '',
                locationName: '',
                locationId: '',
                isActive:false
            },
            ids:[],
            menuVisible: false,
            isDisabled:true,
            search: '',
            modal: false,
            loading:true,
        };
    }


componentDidMount(){
    this.refreshData();

}    

refreshData() {
    this.props.getLocation().then(()=> this.setState({loading:false}));
    this.props.getStateName().then(()=> this.setState({loading:false}));
    this.props.getCountryName().then(()=> this.setState({loading:false}));
    this.props.getCityName().then(()=> this.setState({loading:false}));
    this.props.getLocationName().then(()=> this.setState({loading:false}));
}


onChangeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
}

toggle = (locationId, countryName, stateName, cityName, locationName) => {

    this.setState({
        locationId,
        countryName,
        stateName,
        cityName,
        locationName,
        modal: !this.state.modal
    })
}

searchFilter(search) {
    return function (x) {
        return x.country_master.countryName.toLowerCase().includes(search.toLowerCase()) || !search;
    }
}

    
searchOnChange = (e) => {
    this.setState({ search: e.target.value })
}

deleteLocation = (locationId) => {
        this.setState({loading:true})
        let {isActive } =this.state.editLocation;  
        this.props.deleteLocation(locationId,isActive)
        .then(() => this.refreshData())
        this.setState({editLocation:{isActive:false}})
}

deleteSelected (ids){
    this.setState({loading:true,
    isDisabled:true});
    this.props.deleteSelectedLocation(ids)
    .then(() => this.refreshData())  
    .catch(err => err);
}


toggleModal = () => {
    this.setState({ modal: !this.state.modal })
}

renderList=({details})=>{
    if(details){
        return details.filter(this.searchFilter(this.state.search)).map((item,index)=>{
            return(

                <tr key={item.locationId}>
                <td><input type="checkbox" name="ids" className="SelectAll" value={item.locationId}
                         onChange={(e) => {
                            const {locationId} = item
                            if(!e.target.checked){
                                document.getElementById('allSelect').checked=false;
                                let indexOfId = this.state.ids.indexOf(locationId);
                                if(indexOfId > -1){
                                    this.state.ids.splice(indexOfId, 1);
                                }
                                if(this.state.ids.length === 0){
                                    this.setState({isDisabled: true});
                                }
                            }
                            else {
                                this.setState({ids: [...this.state.ids, locationId]});
                                if(this.state.ids.length >= 0){
                                    this.setState({isDisabled: false})
                                }
                            }
                                
                             }}/></td>
                <td>{index+1}</td>
                <td>{item.country_master.countryName}</td>
                <td>{item.state_master.stateName}</td>
                <td>{item.city_master.cityName}</td>
                <td>{item.locationName}</td>
                <td>
                    <Button color="success"  className="mr-2" onClick={this.toggle.bind(this, item.locationId, item.country_master.countryName,item.state_master.stateName,item.city_master.cityName,item.locationName)}> Edit</Button>
               
                    <Button color="danger" onClick={this.delete.bind(this,item.locationId)}> Delete</Button>
                </td>
                </tr>
                
            )
        })
    }

}

fetchCountry({ country }) {
    if (country) {
        return (
            country.map((item) => {
                return (
                    <option value={item.countryId} key={item.countryId}>
                        {item.countryName}
                    </option>
                )
            })
        )
    }
}

fetchState({ state }) {
    if (state) {

        return (
            state.map((item) => {

                return (
                    <option value={item.stateId} key={item.stateId}>
                        {item.stateName}
                    </option>
                )
            })
        )
    }
}



fetchCity({city}) {
    if (city) {

        return (
            city.map((item) => {

                return (
                    <option value={item.cityId} key={item.cityId}>
                        {item.cityName}
                    </option>
                )
            })
        )
    }
}

OnKeyPressUserhandler(event) {
    const pattern = /[a-zA-Z_ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
}

updateLocation = () => {
    const { locationId, countryId, stateId, cityId,locationName } = this.state
    this.props.updateLocation(locationId, countryId, stateId, cityId,locationName)
        .then(() => this.refreshData())
    this.setState({loading:true,
        editLocation: { locationId, countryId, stateId, cityId,locationName},
        modal: !this.state.modal
    })

}

push=()=>{
    this.props.history.push('/superDashboard/locationMaster')
}
close=()=>{
    return this.props.history.replace('/superDashBoard')
}

selectAll = () => {
    let selectMultiple = document.getElementsByClassName('SelectAll');
    let ar =[];
        for(var i = 0; i < selectMultiple.length; i++){
                ar.push(parseInt(selectMultiple[i].value));
                selectMultiple[i].checked = true;
        }
        this.setState({ids: ar});
        if(ar.length > 0){
            this.setState({isDisabled: false});
        }
}

unSelectAll = () =>{
    
    let unSelectMultiple = document.getElementsByClassName('SelectAll');
    let allIds = [];
    for(var i = 0; i < unSelectMultiple.length; i++){
            unSelectMultiple[i].checked = false
    }
    
    this.setState({ids: [ ...allIds]});
    if(allIds.length === 0){
        this.setState({isDisabled: true});
    }
    
}

render(){
    let tableData;
    tableData=
    <Table className="table table-bordered">
        <thead>
        <tr>
        <th>Select All<input className="ml-2"
                    id="allSelect"
                    type="checkbox" onChange={(e) => {
                            if(e.target.checked) {
                                this.selectAll();
                            }
                            else if(!e.target.checked){
                                this.unSelectAll();
                            } 
                        }  
                    }/></th>
            <th>#</th>
            <th>Country Name</th>
            <th>State Name</th>
            <th>City Name</th>
            <th>Location Name</th>
            <th>Actions</th>
        </tr>
        </thead>
        
        <tbody>
        {this.renderList(this.props.locationMasterReducer)}
        </tbody>
    </Table> 
        let deleteSelectedButton = <Button color="danger" className="mb-2"
        onClick={this.deleteSelected.bind(this, this.state.ids)} disabled={this.state.isDisabled}>Delete Selected</Button>;

    return(
        <div>
        <UI onClick={this.logout}>
        
              
              
        <div className="w3-container w3-margin-top w3-responsive">
        <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
        <span aria-hidden="true">&times;</span>
   </div>
             <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                 <ModalHeader toggle={this.toggle}> Edit Details</ModalHeader>
                 <ModalBody>
                     <FormGroup>
                         <Label> Country Name</Label>
                         <Input type="select" id="countryId" name="countryName" onChange={(e) => {

                            let { countryId } = this.state;
                            countryId = e.target.value;
                            this.setState({ countryId });
                            this.props.getStateName(countryId)
                            }} >
                            <option value={this.state.countryId}>{this.state.countryName}</option>
                            <option disabled>Select</option>
                            {this.fetchCountry(this.props.locationMasterReducer)}

                        </Input>
                     </FormGroup>
                     <FormGroup>
                         <Label>State Name</Label>
                         <Input type="select" id="stateId" name="stateName" onChange={(e)=>{
                            
                            let { stateId } = this.state;
                            stateId = e.target.value;
                            this.setState({ stateId });
                            this.props.getCityName(stateId)
                            }} >
                            <option value={this.state.stateId}>{this.state.stateName}</option>
                            <option disabled>Select</option>
                            {this.fetchState(this.props.locationMasterReducer)}
                            
                         </Input>
                     </FormGroup>
                     <FormGroup>
                         <Label>City Name</Label>
                         <Input type="select" id="cityId" name="cityName" onChange={(e)=>{
                            let { cityId } = this.state;
                            cityId = e.target.value;
                            this.setState({ cityId });
                            this.props.getLocationName(cityId)
                             }} >
                            <option value={this.state.cityId}>{this.state.cityName}</option>
                            <option disabled>Select</option>
                            {this.fetchCity(this.props.locationMasterReducer)}
                         </Input>
                     </FormGroup>
                     <FormGroup>
                         <Label>Location Name</Label>
                         <Input type="text" id="locationId" name="locationName" onKeyPress={this.OnKeyPressUserhandler} maxLength={20} onChange={this.onChangeHandler} value={this.state.locationName} />
                     </FormGroup> 
                 
            
                        <Button color="primary" className="mr-2" onClick={this.updateLocation}>Save</Button> 
                        <Button color="danger" onClick={this.toggleModal.bind(this)}>Cancel</Button>
                 
                 </ModalBody>
             </Modal> 
             <div className="top-details" style={{ fontWeight: 'bold'}}><h3>Location Details</h3>
             <Button color="primary" type="button" onClick={this.push}> Add Location</Button>
             </div>
             <SearchFilter type="text" value={this.state.search}
                        onChange={this.searchOnChange} />
                        {deleteSelectedButton}
                           {!this.state.loading ? tableData : <Spinner />}
                       
                                
            
                </div>
        </UI>
        </div>
    )
}

}


    function mapStatToProps(state) {
        return {
        locationMasterReducer:state.locationMasterReducer
        }
    }
    
    function mapDispatchToProps(dispatch) {
        return bindActionCreators({getLocation,getStateName,getCountryName,getCityName,getLocationName,deleteSelectedLocation,updateLocation,deleteLocation}, dispatch)
    }
    
    export default connect(mapStatToProps, mapDispatchToProps)(DisplayLocation);


