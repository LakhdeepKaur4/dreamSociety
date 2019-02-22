import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAssets, updateAssets, removeAssets } from '../../actionCreators/assetsAction';
import { bindActionCreators } from 'redux';
import { Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Input, Table, Label } from 'reactstrap';
import SearchFilter from '../../components/searchFilter/searchFilter'
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';

class AssetList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assetId: '',
            assets: '',
            description: '',
            menuVisible: false,
            search: '',
            modal: false,
            loading: true,
            errors: {},
        };
    }
    onChangeHandler = (event) => {
        if (!!this.state.errors[event.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.name];
            this.setState({ [event.target.name]: event.target.value.trim(''), errors });
        }
        else {
            this.setState({ [event.target.name]: event.target.value.trim('') });
        }
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
        this.props.getAssets()
            .then(() => this.setState({ loading: false }))
    }
    editAssets = () => {
        const { assetId, assets, description } = this.state
        let errors = {};
        if(this.state.assets===''){
            errors.assets="Assets can't be empty"
        }
        else if(this.state.description===''){
            errors.description="Description can't be empty"
        }
        this.setState({errors});
        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            this.setState({loading: true})
            this.props.updateAssets(assetId, assets, description)
            .then(() => this.props.getAssets().then(()=>this.setState({loading:false})));
            this.setState({ modal: !this.state.modal })
        }
    }
    delete = (assetId) => {
        this.setState({loading:true})
        this.props.removeAssets(assetId)
        .then(() => {this.props.getAssets()
        .then(()=>this.setState({loading:false}))})
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
        if (AssetsList) {
            return AssetsList.assets.filter(this.searchFilter(this.state.search)).map((items) => {
                return (

                    <tr key={items.assetId}>
                        <td>{items.assetName}</td>
                        <td>{items.description}</td>
                        <td>
                        <button className="btn btn-success mr-2" onClick={this.toggle.bind(this, items.assetId, items.assetName, items.description)} >Edit</button>
                        <button className="btn btn-danger" onClick={this.delete.bind(this, items.assetId)} >Delete</button>
                        </td>
                    </tr>
                )
            })
        }
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }
    close=()=>{
        return this.props.history.replace('/superDashBoard')
    }
    render() {
        let tableData;
        tableData = <Table className="table table-bordered">
            <thead>
                <tr>
                    <th>Asset Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {this.renderList(this.props.List)}
            </tbody>
        </Table>
        return (
            <div>
                <UI onClick={this.logout}>
                    <div className="w3-container w3-margin-top w3-responsive">
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                                <span aria-hidden="true">&times;</span>
                            </div>
                        <div className="top-details">
                            <h3>Assets List</h3>
                            <Button color="primary" onClick={() => this.props.history.push('/superDashBoard/assetsMaster/assetsList')} id="addAssets" >Add Assets</Button>
                        </div>
                        <div>
                            <SearchFilter type="text" value={this.state.search}
                                onChange={this.searchOnChange} />
                            {!this.state.loading ? tableData : <Spinner />}
                        </div>
                        <Modal isOpen={this.state.modal} toggle={this.toggles}>
                            <ModalHeader toggle={this.toggle}>Edit Assets</ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                    <Label htmlFor="AssetName">Assets Name</Label>
                                    <Input maxLength={30} type="text" id="AssetName" name="assets" onChange={this.onChangeHandler} value={this.state.assets}/>
                                    <div className="error">{this.state.errors.assets}</div>
                                    <Label htmlFor="description">Description</Label>
                                    <Input maxLength={30} type="text" id="AssetName" name="description" onChange={this.onChangeHandler} value={this.state.description}/>
                                    <span className="error">{this.state.errors.description}</span>
                                </FormGroup>
                          
                            <FormGroup>
                                <Button color="primary mr-2" onClick={this.editAssets}>Save</Button>
                                <Button color="danger" onClick={this.toggles}>Cancel</Button>
                            </FormGroup>
                            </ModalBody>
                        </Modal>
                    </div>

                </UI>
            </div>
        );
    }
}
function mapStatToProps(state) {
    return {
        List: state.AssetsReducer
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getAssets, updateAssets, removeAssets }, dispatch);
}

export default connect(mapStatToProps, mapDispatchToProps)(AssetList);