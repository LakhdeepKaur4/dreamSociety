import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addAssets } from '../../actionCreators/assetsAction';
import './assetsTypeMaster.css';
import { Link } from 'react-router-dom'
import SideBar from '../../components/superAdminDashboardUI/sideBar/sideBar';
import MenuBar from '../../components/superAdminDashboardUI/menuBar/menuBar';
import UI from '../../components/newUI/superAdminDashboard';

class AssetsTypeMaster extends Component {
    constructor(props) {
        super(props);

        this.state = {
            assets: '',
            description: '',
            menuVisible: false,
            search: ''
        }
    }

    onChangeHandler = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { assets, description } = this.state
        this.props.addAssets(assets, description)
       .then(()=>this.props.history.push('/superDashBoard/assetsMaster/assetsList'))
    }

    render() {
        return (
            <div>
                {/* <MenuBar onClick={() => this.setState({ menuVisible: !this.state.menuVisible })}/>
             <div style={{ margin: '48px auto' }}>
            <SideBar onClick={() => this.setState({ menuVisible: false })}
                     visible={this.state.menuVisible}>   */}
                <UI>
                    <div className="Assets">
                        <Link to='/superDashBoard/assetsMaster/assetsList'>Assets List</Link>
                        <form onSubmit={this.onSubmit}>

                            <div className="Assets">
                                <div className="assetsName">
                                    <label htmlFor="AssetsName">Assets Name</label>
                                    <input type="text" className="form-control" placeholder="Enter Assets Name" name="assets" onChange={this.onChangeHandler} required />
                                </div>
                                <div>
                                    <label htmlFor="Description">Description</label>
                                    <textarea type="text" id="Description" placeholder="Enter Description..." className="form-control" onChange={this.onChangeHandler} name='description' required />
                                </div>
                                <div>
                                    <button className="btn btn-success" id="addAssets">Add Assets</button>
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
    console.log('assetstype', state.AssetsReducer)
    return {
        getAssets: state.AssetsReducer
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addAssets }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(AssetsTypeMaster);