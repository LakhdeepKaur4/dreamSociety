import React, { Component } from 'react';
import './assetsTypeSubMaster.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom'
import { getAssets, addAssetsSubType } from '../../actionCreators/assetsSubAction';
import SideBar from '../../components/superAdminDashboardUI/sideBar/sideBar';
import MenuBar from '../../components/superAdminDashboardUI/menuBar/menuBar';
import UI from '../../components/newUI/superAdminDashboard';


class AssetsTypeSubMaster extends Component {
    constructor(props) {
        super(props)
        this.state = {
            assetId: '',
            assetsSubType: '',
            description: ''
        }
    }
    componentDidMount() {
        this.props.getAssets();
    }

    onChangeHandler = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }
    onSubmit = (e) => {
        e.preventDefault();
        const { assetsSubType, description,assetId } = this.state
        this.props.addAssetsSubType(assetsSubType, description,assetId)
        .then(()=>this.props.history.push('/superDashBoard/assetsTypeSubMaster/assetsTypeSubList'));
    }

    getAssetsName = ({ AssetsList }) => {
        if (AssetsList) {
            return AssetsList.assets.map((item) => {
                return (
                    <option key={item.assetId} value={item.assetId} required>{item.assetName}</option>
                )
            })
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
            <div style={{ margin: '48px auto' }}>
            <SideBar onClick={() => this.setState({ menuVisible: false })}
                     visible={this.state.menuVisible}> */}
                <UI onClick={this.logout}>
                    <div className="SubType">
                       
                        <h3>Assets Sub Type Master</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="SubType">

                                <label htmlFor="assetsSubType">Assets Sub Type</label>
                                <input placeholder="Enter Assets Sub Type" maxLength={30}  name='assetsSubType' onChange={this.onChangeHandler} required />


                                <div>
                                    <label htmlFor="assetsType">Assets Type</label>
                                    <select onChange={this.onChangeHandler} name="assetId">
                                        <option value="">select</option>
                                        {this.getAssetsName(this.props.assetsName)}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="Description">Description</label>
                                    <textarea type="text" maxLength={100}  id="Description" placeholder="Enter Description..." onChange={this.onChangeHandler} className="form-control" onChange={this.onChangeHandler} name='description' required />
                                </div>
                                <div>
                                    <button className="btn btn-success" id="addAssets" >Add Assets</button>
                                    <Link to='/superDashBoard/assetsTypeSubMaster/assetsTypeSubList'>
                                    <button className="btn btn-success" id="addAssets" >Assets Sub List</button>
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </UI>
                {/* </SideBar>
                </div> */}
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        assetsName: state.AssetsReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getAssets, addAssetsSubType }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(AssetsTypeSubMaster);