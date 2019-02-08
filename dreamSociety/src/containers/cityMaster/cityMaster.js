import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import{Link} from 'react-router-dom';
import {getCountry,getState,getCity, addCity,detailCity} from './../../actionCreators/cityMasterAction';
import UI from '../../components/newUI/superAdminDashboard';
import _ from 'underscore';


class CityMaster extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)


        this.state = {
            cityName:'',
            countryName:'',
            stateName:'',
            countryId:'',
            stateId:'',


            menuVisible: false,
         }

        this.cityName=this.cityName.bind(this);


    }


    componentDidMount(){
           this.props.getCountry()
           this.props.getState()
           this.props.getCity();

    }

    refreshData(){
        this.props.addCity();
    }

    onChangeCountry= (event)=>{

        let selected= event.target.value
        console.log(selected)

        var country = _.find(this.props.cityMasterReducer.countryResult,function(obj){
            return obj.countryName === selected
            })


            console.log(country)



            this.props.getState(country.countryId)


            this.setState({
                countryId: country.countryId,
                countryName: country.countryName
            })


    }


    onChangeState= (event)=>{

        let selected= event.target.value
        console.log(selected)


        var data1 = _.find(this.props.cityMasterReducer.stateResult,function(obj){
            return obj.stateName === selected
            })

            console.log(data1)


            this.props.getCity(data1.stateId);

            this.setState({
                stateId: data1.stateId,
                stateName:data1.stateName
            })


    }

    onCityChange=(e)=>{
      this.setState({
          [e.target.name]:e.target.value

      })

      console.log(this.state.cityName)

    }

    countryName=({countryResult})=>{
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

    stateName=({stateResult})=>{
        if(stateResult){
            console.log(stateResult);
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

    onChange=(e)=> {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit=(e)=>{



        e.preventDefault();

        this.props.addCity(this.state)
        .then(()=>this.props.history.push('/superDashboard/cityMasterDetail'))

        this.setState({
          state:{
            cityName:'',
            countryId:'',
            stateId:'',


            menuVisible: false,


          }


        });
        console.log("cityid", this.state.stateId)
    }

    logout=()=>{
                localStorage.removeItem('token');
                localStorage.removeItem('user-type');
                return this.props.history.replace('/') 
            }



    render() {
         console.log(this.props.cityMasterReducer)


        return (
            <div>
                <UI onClick={this.logout}>
                <form className="ui form" onSubmit={this.handleSubmit}>
                    <div className="field">
                        <label><h4>Country Name</h4></label>
                        <select className="ui fluid dropdown"  onChange={this.onChangeCountry}>
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

                  <div className="form-group">
                        <label htmlFor='cityName'><h4>City Name</h4></label>
                        <input type="text" name="cityName" value={this.state.cityName} onChange={this.onChange}  onKeyPress={this.OnKeyPressUserhandler}
                    maxLength='30'
                    minLength='3'/>


                    </div>
                    <div>
                    <button className="ui submit button" type="submit" style={{backgroundColor:'lightblue'}}>Submit</button>

                    <Link to='/superDashboard/cityMasterDetail'>
                    <button className="ui submit button" type="submit" style={{backgroundColor:'lightgreen'}}>Show Details</button>
                    </Link>
                    </div>
                </form>
                <div>
                </div>
                </UI>

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
    return bindActionCreators({ getCountry,getState,getCity,addCity,detailCity }, dispatch);
}

export default (connect(mapStateToProps, mapDispatchToProps)(CityMaster));
