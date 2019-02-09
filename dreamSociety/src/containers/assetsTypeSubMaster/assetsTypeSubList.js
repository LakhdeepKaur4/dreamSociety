import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAssets, updateAssetsSub, removeAssetsSub, getAssets } from '../../actionCreators/assetsSubAction';
import { bindActionCreators } from 'redux';
import { Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Input, Label } from 'reactstrap';
import SearchFilter from '../../components/searchFilter/searchFilter'
import UI from '../../components/newUI/superAdminDashboard';
import {Link} from 'react-router-dom';

class AssetsTypeSubList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageData: [],
            activePage: 0,
            assetTypeId: '',
            assetType: '',
            description: '',
            modal: false,
            menuVisible: false,
            search:'',
            pageCount: 1,
            activePage: 1
        };
    }
    onChangeHandler = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    toggle = (assetTypeId, assetType, description) => {

        this.setState({
            assetTypeId,
            assetType,
            description,
            menuVisible: false,
            search: '',
            modal: !this.state.modal
        })
    }
    toggles = () => {
        this.setState({ modal: !this.state.modal })
    }
    componentWillMount() {
        this.props.fetchAssets()
    }


    editAssetsSubType = () => {
        const { assetTypeId, assetType, description } = this.state
        this.props.updateAssetsSub(assetTypeId, assetType, description)
            .then(() => this.props.fetchAssets())

        this.setState({ modal: !this.state.modal })


    }
    delete = (assetTypeId) => {
        this.props.removeAssetsSub(assetTypeId)
            .then(() => this.props.fetchAssets())
    }

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }

    searchFilter(search) {
        return function (x) {
            return (
            x.asset_master.assetName.toLowerCase().includes(search.toLowerCase()) ||
            x.assetType.toLowerCase().includes(search.toUpperCase()) || 
            x.description.toLowerCase().includes(search.toLowerCase()) ||!search);
        }
    }

    renderListAssets = ({ getAssetsType }) => {    
  
        if (getAssetsType) {
            return getAssetsType.assetsType.filter(this.searchFilter(this.state.search)).map((item) => {
                {
                    return (
                        <tr key={item.assetTypeId}>
                            <td>{item.asset_master.assetName}</td>
                            <td>{item.assetType}</td>
                            <td>{item.description}</td>
                            <td>
                                <button className="btn btn-success" onClick={this.toggle.bind(this, item.assetTypeId, item.assetType, item.description)} >Edit</button>
                                <button className="btn btn-danger" onClick={this.delete.bind(this, item.assetTypeId)} >Delete</button>
                            </td>
                        </tr>
                    )
                }
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
            <SideBar onClick={() => this.setState({ menuVisible: false })}
                     visible={this.state.menuVisible}>   */}
                <UI onClick={this.logout}>
                <Link to='/superDashBoard/assetsTypeSubMaster'>
                  <button className="btn btn-success" id="addAssets" >Add Assets Sub Type</button>
                    </Link>
                    <div className="search">
                        <h3>Assets Sub Type Name</h3>
                        <SearchFilter type="text" value={this.state.search}
                            onChange={this.searchOnChange} />
                    </div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>AssetName</th>
                                <th>Assets Sub Type Name</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderListAssets(this.props.ListOfAssets)}
                        </tbody>

                    </table>
                    <Modal isOpen={this.state.modal} toggle={this.toggles}>
                        <ModalHeader toggle={this.toggle}>Edit Assets</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label htmlFor="assetType">Assets Sub Type Name</Label>
                                <Input type="text" id="AssetName" name="assetType" onChange={this.onChangeHandler} value={this.state.assetType} />
                                <Label htmlFor="description">Description</Label>
                                <Input type="text" id="AssetName" name="description" onChange={this.onChangeHandler} value={this.state.description} />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.editAssetsSubType}>Save</Button>
                            <Button color="secondary" onClick={this.toggles}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </UI>
                {/* </SideBar> */}
            </div>
        );
    }
}


function mapStatToProps(state) {
    return {
        ListOfAssets: state.AssetsTypeReducer,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchAssets, updateAssetsSub, removeAssetsSub }, dispatch)
}

export default connect(mapStatToProps, mapDispatchToProps)(AssetsTypeSubList);
