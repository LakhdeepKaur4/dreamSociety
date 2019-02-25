import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCountry, getState, getCity, detailCity, deleteCity, updateCity, deleteSelectCity } from './../../actionCreators/cityMasterAction';
import { bindActionCreators } from 'redux';
import SearchFilter from '../../components/searchFilter/searchFilter';
import UI from '../../components/newUI/superAdminDashboard';
import {Table, Button, Modal, FormGroup, ModalBody, ModalHeader, Input, Label } from 'reactstrap';
import Spinner from '../../components/spinner/spinner';


class CityMasterDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editCityData: {
                countryId: '',
                countryName: '',
                stateName: '',
                stateId: '',
                cityName: '',
                cityId: '',
                isActive:false,

            },
            menuVisible: false,
            search: '',
            modal: false,
            loading: true,
            errors:{},
            ids:[],
           
            isDisabled: true,
           

        };
    }
    onChangeHandler = (event) => {
        if (!!this.state.errors[event.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.name];
            this.setState({ [event.target.name]: event.target.value, errors });
        }
        else {
            this.setState({ [event.target.name]: event.target.value});
        }
    }


    onKeyPressHandler=(event)=> {
        const pattern = /^[a-zA-Z ]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    



    toggle = (cityId, countryName, stateName, cityName) => {
        
        this.setState({
            cityId,
            countryName,
            stateName,
            cityName,
            modal: !this.state.modal
        })
    }




    toggleModal = () => {
        this.setState({ modal: !this.state.modal })
    }


    componentWillMount() {
        this.refreshData()
        
    }

    refreshData() {
        this.props.detailCity().then(() => this.setState({loading: false}))
        this.props.getCountry().then(() => this.setState({loading: false}))
        this.props.getState().then(() => this.setState({loading: false}))
        this.props.getCity().then(() => this.setState({loading: false}))
    }




    editCityType = () => {
      
        const { cityId, countryId, stateId, cityName } = this.state
         
        let errors={};

        if(this.state.cityName === ''){ errors.cityName=" City Name can't be empty"}
        this.setState({errors})

        const isValid = Object.keys(errors).length === 0

        if (isValid) {
            this.setState({
                loading: true
            })

        this.props.updateCity(cityId, countryId, stateId, cityName)
            .then(() => this.refreshData())
        this.setState({
            editCityData: { cityId, countryId, stateId, cityName },
            modal: !this.state.modal
        })

    }
    }

    deleteCityName = (cityId) => {
        let {isActive}=this.state.editCityData
        this.setState({loading:true})
        this.props.deleteCity(cityId,isActive)
            .then(() => this.refreshData())
            this.setState({editCityData:{isActive:false}})

    }

    deleteSelected=(ids)=>{
        this.setState({loading:true, isDisabled:true});
        this.props.deleteSelectCity(ids)
        .then(() => this.refreshData())
        .catch(err => err.response.data.message);
    }


   



    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }

    searchFilter=(search)=> {
        return function (x) {
            return x.cityName.toLowerCase().includes(search.toLowerCase()) ||
                x.country_master.countryName.toLowerCase().includes(search.toLowerCase())||
                x.state_master.stateName.toLowerCase().includes(search.toLowerCase())
                || !search;
        }
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

        
    

    renderCity = ({ city }) => {

        if (city) {
            return city.filter(this.searchFilter(this.state.search)).map((item,index) => {

                return (
                    <tr key={item.cityId}>
                        <td><input type="checkbox" className="SelectAll" name="ids" value={item.cityId}
                         onChange={(e, i) => {
                            const {cityId} = item
                            if(!e.target.checked){
                                document.getElementById('allSelect').checked=false;
                                this.setState({isChecked: false});
                                let indexOfId = this.state.ids.indexOf(cityId);
                                if(indexOfId > -1){
                                    this.state.ids.splice(indexOfId, 1)
                                }
                                if(this.state.ids.length === 0){
                                    this.setState({isDisabled: true});
                                }
                            }
                            else {
                                this.setState({ids: [...this.state.ids, cityId]});
                                if(this.state.ids.length >= 0){
                                    this.setState({isDisabled: false})
                                }
                            }
                                
                             }}/></td>
                        <td>{index+1}</td>
                        <td>{item.country_master.countryName}</td>
                        <td>{item.state_master.stateName}</td>
                        <td>{item.cityName}</td>
                        <td>
                            <Button color="success mr-2" onClick={this.toggle.bind(this, item.cityId, item.country_master.countryName, item.state_master.stateName, item.cityName)} >Edit</Button>
                        
                            <Button color="danger" onClick={this.deleteCityName.bind(this, item.cityId)} >Delete</Button>

                        </td>
                    </tr>

                )
            })
        }
    }

    fetchCountry({ countryResult }) {
        if (countryResult) {

            return (
                countryResult.map((item) => {

                    return (
                        <option value={item.countryId} key={item.countryId}>
                            {item.countryName}
                        </option>
                    )
                })
            )
        }
    }

    fetchState({ stateResult }) {
        if (stateResult) {

            return (
                stateResult.map((item) => {

                    return (
                        <option value={item.stateId} key={item.stateId}>
                            {item.stateName}
                        </option>
                    )
                })
            )
        }
    }

    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }

    routeToAddNewCity =() => {
        this.props.history.push('/superDashboard/cityMaster')
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
     
        let tableData;
        tableData= <div style={{backgroundColor:'lightgray'}}>
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
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {this.renderCity(this.props.cityMasterReducer)}
            </tbody>
        </Table></div>
        return (
            <div>
               
                <UI onClick={this.logout}>
                  <div className="w3-container w3-margin-top w3-responsive">
                  <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                                <span aria-hidden="true">&times;</span>
                            </div>
                             <div className="top-details">
                                <h3>City Details</h3>
                                <Button onClick={this.routeToAddNewCity} color="primary">Add City</Button>
                            </div>
                            <SearchFilter type="text" value={this.state.search}
                                onChange={this.searchOnChange} />
                            
                            <Button color="danger" className="mb-3" onClick={this.deleteSelected.bind(this, this.state.ids)} disabled={this.state.isDisabled} >Delete Selected</Button>
                            
                            {!this.state.loading ? tableData : <Spinner />}
                            <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                                <ModalHeader toggle={this.toggle}>Edit</ModalHeader>
                                <ModalBody>
                                    <FormGroup>
                                        <Label>Country Name</Label>

                                        <Input type="select" id="countryId" name="countryName"  onChange={(e) => {

                                            let { countryId } = this.state;
                                            countryId = e.target.value;
                                            this.setState({ countryId });
                                            this.props.getState(countryId)
                                        }} >
                                            <option value={this.state.countryId}>{this.state.countryName}</option>
                                            <option disabled>Select</option>
                                            {this.fetchCountry(this.props.cityMasterReducer)}
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>State Name</Label>

                                        <Input type="select" id="stateId" name="stateName" onChange={(e) => {

                                            let { stateId } = this.state;

                                            stateId = e.target.value;

                                            this.setState({ stateId });
                                            this.props.getCity(stateId);
                                        }} >
                                            <option value={this.state.stateId}>{this.state.stateName}</option>
                                            <option>Select</option>
                                            {this.fetchState(this.props.cityMasterReducer)}
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>City Name</Label>
                                        <Input type="text" id="cityId" name="cityName" onChange={this.onChangeHandler} onKeyPress={this.onKeyPressHandler} value={this.state.cityName} maxLength={50} />
                                        <span className="error">{this.state.errors.cityName}</span>
                                    </FormGroup>

                                
                                 <FormGroup>
                                    <Button color="primary mr-2" onClick={this.editCityType}>Save</Button>

                                    <Button color="danger" onClick={this.toggleModal.bind(this)}>Cancel</Button>
                                </FormGroup>
                                    </ModalBody>
                            </Modal>


                        </div>
                        </UI>
                   
            </div>
        );
    }
}


function mapStatToProps(state) {

    return {
        cityMasterReducer: state.cityMasterReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getCountry, getState, getCity, detailCity, deleteCity, updateCity,deleteSelectCity }, dispatch)
}

export default connect(mapStatToProps, mapDispatchToProps)(CityMasterDetail);