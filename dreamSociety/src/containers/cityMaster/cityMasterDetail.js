import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCountry, getState, detailCity, deleteCity, updateCity } from './../../actionCreators/cityMasterAction';
import { bindActionCreators } from 'redux';
import SearchFilter from '../../components/searchFilter/searchFilter';
import SideBar from '../../components/superAdminDashboardUI/sideBar/sideBar';
import MenuBar from '../../components/superAdminDashboardUI/menuBar/menuBar';
import { Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Input, Label } from 'reactstrap';
import UI from '../../components/newUI/superAdminDashboard';
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
    // componentWillMount() {
    //     this.props.detailCity();

    // }

    componentDidMount() {
        this.refreshData();
        this.props.getCountry()
    }

    refreshData() {
        this.props.detailCity()
    }

    // updateCityDetail = () => {
    //     const { cityId, countryId, stateId, cityName } = this.state.editCityData;
    //     console.log("========================cityid===========",cityId);
    //     this.props.updateCity(cityId, countryId, stateId, cityName)
    //     this.setState({
    //         modal: false, editCityData: { cityId: '', countryId: '', stateId: '', cityName: ''}
    //     })
    // }


    editCityType = () => {
        const { cityId, countryId, stateId, cityName } = this.state
        console.log('=======editCityType=====', cityId, countryId, stateId, cityName)
        // this.props.fetchAssets();
        this.props.updateCity(cityId, countryId, stateId, cityName)
            .then(() => this.props.detailCity())
        this.setState({
            editCityData: { cityId, countryId, stateId, cityName },
            modal: !this.state.modal
        })
        // .then(()=>this.props.fetchAssets())
        // this.props.fetchAssets();

    }

    deleteCityName = (cityId) => {
        console.log(cityId);
        this.props.deleteCity(cityId)
            .then(() => this.props.detailCity())

    }

    //    deleteUser(userId) {
    //     let { isActive } = this.state.editUserData
    //     console.log(userId)
    //     // axios.put(`${url}` + userId, { isActive }, { headers: authHeader() }).then((response) => {
    //     //     this.refreshData()
    //     //     this.setState({
    //     //         editUserData: { isActive: false }
    //     //     })
    //     //     console.log(response)
    //     // })
    //     this.props.deleteUser(userId, isActive)
    //     .then(() => this.setState({isActive: false}))
    // }

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }
    searchFilter(search) {
        return function (x) {
            return x.cityName.toLowerCase().includes(search.toLowerCase()) ||
                x.country_master.countryName.toLowerCase().includes(search.toLowerCase()) ||
                x.state_master.stateName.toLowerCase().includes(search.toLowerCase())
                || !search;
        }
    }
    renderCity = ({ city }) => {
        console.log('=========getCity=========', city)
        if (city) {
            return city.filter(this.searchFilter(this.state.search)).map((item) => {
                // console.log(item)
                return (
                    <tr key={item.cityId}>
                        <td>{item.country_master.countryName}</td>
                        <td>{item.state_master.stateName}</td>
                        <td>{item.cityName}</td>
                        <td>
                            <button className="btn btn-success" onClick={this.toggle.bind(this, item.cityId, item.country_master.countryName, item.state_master.stateName, item.cityName)} >Edit</button>
                        </td>
                        <td>
                            <button className="btn btn-danger" onClick={this.deleteCityName.bind(this, item.cityId)} >Delete</button>
                            {/* <button className="btn btn-success">Edit</button>
                             <button className="btn btn-danger"  >Delete</button> */}
                        </td>
                    </tr>

                )
            })
        }
    }

    fetchCountry({ countryResult }) {
        if (countryResult) {
            console.log(countryResult)
            return (
                countryResult.map((item) => {
                    // console.log(this.state)
                    return (
                        <option value={item.countryId} key={item.countryId}>
                            {item.countryName}
                        </option>
                    )
                })
            )
        }
    }

    fetchState({ city }) {
        if (city) {
            console.log(city)
            return (
                city.map((item) => {
                    // console.log(this.state)
                    return (
                        <option value={item.state_master.stateId} key={item.cityId}>
                            {item.state_master.stateName}
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

                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Country Name</th>
                                    <th>State Name</th>
                                    <th>City Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderCity(this.props.cityMasterReducer)}
                            </tbody>
                        </table>
                        <Modal isOpen={this.state.modal} toggle={this.toggleModal.bind(this)}>
                            <ModalHeader toggle={this.toggleModal.bind(this)}>Edit</ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                    <Label htmlFor="countryName">Country Name</Label>
                                    {/* <Input type="text" id="countryId" name="countryName" onChange={this.onChangeHandler} value={this.state.countryName} /> */}
                                    <Input type="select" id="countryId" name="countryName" onChange={(e) => {
                                        console.log(this.state)
                                        let { countryId } = this.state;

                                        countryId = e.target.value;

                                        this.setState({ countryId });
                                    }} >
                                        <option value={this.state.countryId}>{this.state.countryName}</option>
                                        <option disabled>Select</option>
                                        {this.fetchCountry(this.props.cityMasterReducer)}
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="stateName">State Name</Label>
                                    {/* <Input type="text" id="stateId" name="stateName" onChange={this.onChangeHandler} value={this.state.stateName} /> */}
                                    <Input type="select" id="stateId" name="stateName" onChange={(e) => {
                                        console.log(this.state)
                                        let { stateId } = this.state;

                                        stateId = e.target.value;

                                        this.setState({ stateId });
                                    }} >
                                        <option value={this.state.stateId}>{this.state.stateName}</option>
                                        <option disabled>Select</option>
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
                                {/* <Button color="primary">Update City</Button> */}
                                <Button color="secondary" onClick={this.toggleModal.bind(this)}>Cancel</Button>
                            </ModalFooter>
                        </Modal>


                    </div>
                </UI>
                {/* </SideBar>
            </div> */}
            </div>
        );
    }
}


function mapStatToProps(state) {
    // console.log('citymaster list', state.cityMasterReducer)
    return {
        cityMasterReducer: state.cityMasterReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getCountry, getState, detailCity, deleteCity, updateCity }, dispatch)
}

export default connect(mapStatToProps, mapDispatchToProps)(CityMasterDetail);