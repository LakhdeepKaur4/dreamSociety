import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAssets, updateAssets, removeAssets } from '../../actionCreators/assetsAction';
import { bindActionCreators } from 'redux';
import { Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Input, Label } from 'reactstrap';
import SearchFilter from '../../components/searchFilter/searchFilter'
import UI from '../../components/newUI/superAdminDashboard';
import {Link} from 'react-router-dom'

class AssetList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assetId: '',
            assets: '',
            description: '',
            menuVisible: false,
            search: '',
            modal: false
        };
    }
    onChangeHandler = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    toggle = (assetId, assetName, description) => {

        this.setState({
            assetId,
            assets: assetName,
            description,
            modal: !this.state.modal
        })
    }
    toggles = () => {
        this.setState({ modal: !this.state.modal })
    }
    componentWillMount() {
        this.props.getAssets();
    }
    editAssets = () => {
        const { assetId, assets, description } = this.state
        this.props.updateAssets(assetId, assets, description)
            .then(() => this.props.getAssets());
        this.setState({ modal: !this.state.modal })
    }
    delete = (assetId) => {
        this.props.removeAssets(assetId)
            .then(() => this.props.getAssets())
    }

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }
    searchFilter(search) {
        return function (x) {
            return x.assetName.toLowerCase().includes(search.toLowerCase()) || 
             x.description.toLowerCase().includes(search.toLowerCase()) || !search;
        }
    }

    renderList = ({ AssetsList }) => {
        console.log('======AssetsList=========', AssetsList)
        if (AssetsList) {
            return AssetsList.assets.filter(this.searchFilter(this.state.search)).map((items) => {
                return (

                    <tr key={items.assetId}>
                        <td>{items.assetName}</td>
                        <td>{items.description}</td>
                        <td>
                            <button className="btn btn-success" onClick={this.toggle.bind(this, items.assetId, items.assetName, items.description)} >Edit</button>
                            <button className="btn btn-danger" onClick={this.delete.bind(this, items.assetId)} >Delete</button>
                        </td>
                    </tr>
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
            <SideBar onClick={() => this.setState({ menuVisible: false })}
                     visible={this.state.menuVisible}> */}
                <UI onClick={this.logout}>
                <Link to='/superDashBoard/assetsMaster'>
                 <button className="btn btn-success" id="addAssets" >Assets List</button>
                </Link>
                    <div className="search">
                        <h3>Assets Name</h3>
                        <SearchFilter type="text" value={this.state.search}
                            onChange={this.searchOnChange} />
                    </div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Asset Name</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderList(this.props.List)}
                        </tbody>
                    </table>
                    <Modal isOpen={this.state.modal} toggle={this.toggles}>
                        <ModalHeader toggle={this.toggle}>Edit Assets</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label htmlFor="AssetName">Assets Name</Label>
                                <Input type="text" id="AssetName" name="assets" onChange={this.onChangeHandler} value={this.state.assets} />
                                <Label htmlFor="description">Description</Label>
                                <Input type="text" id="AssetName" name="description" onChange={this.onChangeHandler} value={this.state.description} />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.editAssets}>Save</Button>
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
    console.log('Assets List', state)
    return {
        List: state.AssetsReducer
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getAssets, updateAssets, removeAssets }, dispatch);
}

export default connect(mapStatToProps, mapDispatchToProps)(AssetList);