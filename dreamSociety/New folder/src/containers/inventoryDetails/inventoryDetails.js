import React, { Component } from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';

class InventoryDetails extends Component {
    dataSelector=({AssetsList})=>{
        console.log('==========AssetsList==========',AssetsList)
    }
    changeHandler=(v)=>{
        console.log('========changeHandler=========',v)
    }
    render() {
        return (
            <div>
             <Select options={this.dataSelector(this.props.AssetData)} 
		     onChange={this.changeHandler}/>
            </div>
        );
    }
}
function mapStateToProps(state){
    console.log('state',state.AssetsReducer)
return{
AssetData:state.AssetsReducer
}
}
export default connect(mapStateToProps,null)(InventoryDetails);