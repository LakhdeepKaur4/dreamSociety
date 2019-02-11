import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCountry, getState, getCity, detailCity, deleteCity, updateCity } from './../../actionCreators/cityMasterAction';
import { bindActionCreators } from 'redux';
import SearchFilter from '../../components/searchFilter/searchFilter';
import UI from '../../components/newUI/superAdminDashboard';
import { Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Input, Label } from 'reactstrap';
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
                cityId: ''

            },
            menuVisible: false,
            search: '',
            modal: false

        };
    }
    onChangeHandler = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    toggle = (cityId, countryName, stateName, cityName) => {
        console.log('toggle')
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


    componentDidMount() {
        this.refreshData();
        this.props.getCountry()
        this.props.getState()
        this.props.getCity()
    }

    refreshData() {
        this.props.detailCity()
    }




    editCityType = () => {
        const { cityId, countryId, stateId, cityName } = this.state


        this.props.updateCity(cityId, countryId, stateId, cityName)
            .then(() => this.props.detailCity())
        this.setState({
            editCityData: { cityId, countryId, stateId, cityName },
            modal: !this.state.modal
        })


    }

    deleteCityName = (cityId) => {

        this.props.deleteCity(cityId)
            .then(() => this.props.detailCity())

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

    
    renderCity = ({ city }) => {

        if (city) {
            return city.filter(this.searchFilter(this.state.search)).map((item) => {

                return (
                    <tr key={item.cityId}>
                        <td>{item.country_master.countryName}</td>
                        <td>{item.state_master.stateName}</td>
                        <td>{item.cityName}</td>
                        <td>
                            <Button color="success" onClick={this.toggle.bind(this, item.cityId, item.country_master.countryName, item.state_master.stateName, item.cityName)} >Edit</Button>
                        </td>
                        <td>
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

    render() {
        return (
            <div>
                {/* <MenuBar onClick={() => this.setState({ menuVisible: !this.state.menuVisible })}/>
              <div style={{ marginTop: '52px' }}>
              <SideBar onClick={() => this.setState({ menuVisible: false })} visible={this.state.menuVisible}> */}
                <UI onClick={this.logout}>
                    <div className="container" >
                        <div>
                            <h3>City details</h3>
                            <SearchFilter type="text" value={this.state.search}
                                onChange={this.searchOnChange} />
                        </div>
                        <div style={{backgroundColor:'lightgray'}}>
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Country Name</th>
                                        <th>State Name</th>
                                        <th>City Name</th>
                                        <th>Edit/Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderCity(this.props.cityMasterReducer)}
                                </tbody>
                            </table>
                            </div>
                            <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                                <ModalHeader toggle={this.toggle}>Edit</ModalHeader>
                                <ModalBody>
                                    <FormGroup>
                                        <Label htmlFor="countryName">Country Name</Label>

                                        <Input type="select" id="countryId" name="countryName" onChange={(e) => {

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
                                        <Label htmlFor="stateName">State Name</Label>

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
                                        <Label htmlFor="cityName">City Name</Label>
                                        <Input type="text" id="cityId" name="cityName" onChange={this.onChangeHandler} value={this.state.cityName} />
                                    </FormGroup>

                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.editCityType}>Update City</Button>

                                    <Button color="secondary" onClick={this.toggleModal.bind(this)}>Cancel</Button>
                                </ModalFooter>
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
    return bindActionCreators({ getCountry, getState, getCity, detailCity, deleteCity, updateCity }, dispatch)
}

export default connect(mapStatToProps, mapDispatchToProps)(CityMasterDetail);