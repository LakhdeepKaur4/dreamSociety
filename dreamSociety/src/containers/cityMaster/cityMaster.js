import React, { Component } from 'react';
// import {authHeader} from '../../helper/auth-header';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import SideBar from '../../components/superAdminDashboardUI/sideBar/sideBar';
import MenuBar from '../../components/superAdminDashboardUI/menuBar/menuBar';
import { getCountry, getState, getCity, addCity, detailCity } from './../../actionCreators/cityMasterAction';
import UI from '../../components/newUI/superAdminDashboard';
import _ from 'underscore';




// import axios from 'axios';
// import { authHeader } from '../../helper/auth-header';

class CityMaster extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)


        this.state = {
            cityName: '',
            countryName: '',
            stateName: '',
            countryId: '',
            stateId: '',

            menuVisible: false,
        }
        // this.onChangeCountry=this.onChangeCountry.bind(this);
        this.cityName = this.cityName.bind(this);


    }


    componentDidMount() {
        this.props.getCountry()
        this.props.getState()
        this.props.getCity();

    }

    refreshData() {
        this.props.addCity();
    }

    onChangeCountry = (event) => {

        let selected = event.target.value
        console.log(selected)




        var country = _.find(this.props.cityMasterReducer.countryResult, function (obj) {
            return obj.countryName === selected
        })

        // var country= this.props.cityMasterReducer.countryResult.filter((item)=> { return item.countryName===selected})

        console.log(country)



        this.props.getState(country.countryId)


        this.setState({
            countryId: country.countryId,
            countryName: country.countryName
        })


    }


    onChangeState = (event) => {

        let selected = event.target.value
        console.log(selected)


        var data1 = _.find(this.props.cityMasterReducer.stateResult, function (obj) {
            return obj.stateName === selected
        })

        console.log(data1)


        this.props.getCity(data1.stateId);

        this.setState({
            stateId: data1.stateId,
            stateName: data1.stateName
        })


    }

    onCityChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value

        })

        console.log(this.state.cityName)

    }







    countryName = ({ countryResult }) => {
        if (countryResult) {
            console.log(countryResult);
            return (
                countryResult.map((item) => {
                    return (
                        <option key={item.countryId} value={item.countryName}>
                            {item.countryName}
                        </option>
                    )
                })
            )

        }
    }

    stateName = ({ stateResult }) => {
        if (stateResult) {
            console.log(stateResult);
            return (
                stateResult.map((item) => {
                    return (
                        <option key={item.stateId} value={item.stateName}>
                            {item.stateName}
                        </option>
                    )
                })
            )

        }
    }

    cityName = ({ cityResult }) => {
        console.log(cityResult);
        if (cityResult) {

            return (
                cityResult.map((item) => {
                    console.log(item.cityName)
                    return (
                        <option key={item.cityId} value={item.cityName}>
                            {item.cityName}
                        </option>
                    )
                }
                )
            )

        }
    }

    onChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.addCity(this.state);
        console.log("submitted", this.state)

        this.setState({
            state: {
                cityName: '',
                countryId: '',
                stateId: '',

                menuVisible: false,


            }


        });
        console.log("cityid", this.state.stateId)
    }



    render() {
        console.log(this.props.cityMasterReducer)


        return (
            <div>
                {/* <MenuBar onClick={() => this.setState({ menuVisible: !this.state.menuVisible })}/>
              <div style={{ marginTop: '52px' }}>
              <SideBar onClick={() => this.setState({ menuVisible: false })} visible={this.state.menuVisible}> */}
                <UI>
                    {/* <Link to='/superDashboard/cityMasterDetail'>City Details</Link> */}
                    <form className="ui form" onSubmit={this.handleSubmit}>
                        <div className="field">
                            <label><h4>Country Name</h4></label>
                            <select className="ui fluid dropdown" onChange={this.onChangeCountry}>
                                <option>Select</option>
                                {this.countryName(this.props.cityMasterReducer)}

                            </select>
                        </div>
                        <div className="field">
                            <label><h4>State Name</h4></label>
                            <select className="ui fluid dropdown" onChange={this.onChangeState}>
                                <option>Select</option>
                                {this.stateName(this.props.cityMasterReducer)}




                            </select>
                        </div>
                        {/* <div className="field">
                        <label><h4>City Name</h4></label>
                        <select className="ui fluid dropdown" onChange={this.onChangeCity}>
                            <option>Select</option>
                            {this.cityName(this.props.cityMasterReducer)}
                            
                          
                        </select>
                    </div> */}

                        <div className="form-group">
                            <label htmlFor='cityName'><h4>City Name</h4></label>
                            <input type="text" name="cityName" value={this.state.cityName} onChange={this.onChange} />
                        </div>
                        <div>
                            <button className="ui submit button" type="submit" style={{ backgroundColor: 'lightblue' }}>Submit</button>

                            <Link to='/superDashboard/cityMasterDetail'>
                                <button className="ui submit button" type="submit" style={{ backgroundColor: 'lightgreen' }}>Show Details</button>
                            </Link>
                        </div>
                    </form>
                    <div>
                    </div>
                </UI>
                {/* </SideBar>
                </div> */}
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log('===========stateCountry=========', state)

    return {
        cityMasterReducer: state.cityMasterReducer
    }



}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getCountry, getState, getCity, addCity, detailCity }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(CityMaster));



