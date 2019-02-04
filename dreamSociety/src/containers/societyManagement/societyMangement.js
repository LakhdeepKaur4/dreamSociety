import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {getCountry} from '../../actionCreators/societyMasterAction'

class SocietyMangement extends Component {

    componentDidMount(){
        console.log('=============countryName function===================')
        this.props.getCountry();
    }

    fetchCountry({country}){
        console.log('_________________________------------',country)
    }

   
    render() {
        return (
            <div>
                <form>
                    <div className="form-group">
                    <label><h4>Country Name</h4></label>
                    <select></select>
                    </div>
                    <div className="form-group">
                    <label><h4>State Name</h4></label>
                    <select></select>
                    </div>
                    <div className="form-group">
                    <label><h4>City Name</h4></label>
                    <select></select>
                    </div>
                    <div className="form-group">
                    <label><h4>Location Name</h4></label>
                    <select></select>
                    </div>
                    <div className="form-group">
                    <label htmlFor='society'><h4>Society Name</h4></label>
                    <input name="society"/>
                    </div>
                    <button type="submit">Submit</button>
                </form>
                <div>
                    {this.fetchCountry(this.props.societyReducer)}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    console.log('===========stateCountry=========',state)
    return{
        societyReducer:state.societyReducer
    }

}
function mapDispatchToProps(dispatch){
    return bindActionCreators({getCountry},dispatch);
    }

export default (connect(mapStateToProps,mapDispatchToProps)(SocietyMangement));