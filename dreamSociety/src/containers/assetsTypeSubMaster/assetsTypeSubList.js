import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAssets, updateAssetsSub, removeAssetsSub,deleteMultiple } from '../../actionCreators/assetsSubAction';
import { bindActionCreators } from 'redux';
import { Button, Modal, FormGroup, Table, ModalBody, ModalHeader, ModalFooter, Input, Label } from 'reactstrap';
import SearchFilter from '../../components/searchFilter/searchFilter'
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';
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
            search: '',
            pageCount: 1,
            activePage: 1,
            loading: true,
            errors: {},
            ids: [],
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
        this.props.fetchAssets().then(() => this.setState({ loading: false }))
    }


    editAssetsSubType = () => {
        const { assetTypeId, assetType, description } = this.state
        console.log(assetTypeId, assetType, description )
        let errors = {};
        if(this.state.assetType===''){
            errors.assetType="Assets type can't be empty"
        }
        else if(this.state.description===''){
            errors.description="Description can't be empty"
        }
        this.setState({errors});
        const isValid = Object.keys(errors).length === 0
        if (isValid) {
            this.setState({loading: true})
            this.props.updateAssetsSub(assetTypeId, assetType, description)
            .then(() => this.props.fetchAssets().then(()=>this.setState({loading:false})))
            this.setState({ modal: !this.state.modal })
        }
        // this.setState({loading:true})
        // this.props.updateAssetsSub(assetTypeId, assetType, description)
        //     .then(() => this.props.fetchAssets().then(()=>this.setState({loading:false})))

        // this.setState({ modal: !this.state.modal })


    }
    delete = (assetTypeId) => {
        this.setState({loading:true})
        this.props.removeAssetsSub(assetTypeId)
            .then(() => this.props.fetchAssets().then(()=>this.setState({loading:false})))
    }

    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }

    searchFilter(search) {
        return function (x) {
            return (
                x.asset_master.assetName.toLowerCase().includes(search.toLowerCase()) ||
                x.assetType.toLowerCase().includes(search.toUpperCase()) ||
                x.description.toLowerCase().includes(search.toLowerCase()) || !search);
        }
    }

    renderListAssets = ({ getAssetsType }) => {

        if (getAssetsType) {
            return getAssetsType.assetsType.filter(this.searchFilter(this.state.search)).map((item,index) => {
                {
                    return (
                        <tr key={item.assetTypeId}>
                         <td><input type="checkbox" name="ids" value={item.assetTypeId}
                         onChange={(e, i) => {
                            const {assetTypeId} = item
                            if(!e.target.checked){
                                let indexOfId = this.state.ids.indexOf(assetTypeId);
                                if(indexOfId > -1){
                                    this.state.ids.splice(indexOfId, 1)
                                }
                            }
                            else this.setState({ids: [...this.state.ids, assetTypeId]})
                                
                             }}/></td>
                            <td>{index+1}</td>
                            <td>{item.asset_master.assetName}</td>
                            <td>{item.assetType}</td>
                            <td>{item.description}</td>
                            <td>
                             <button className="btn btn-success mr-2" onClick={this.toggle.bind(this, item.assetTypeId, item.assetType, item.description)} >Edit</button>
                             <button className="btn btn-danger" onClick={this.delete.bind(this, item.assetTypeId)} >Delete</button>
                            </td>
                        </tr>
                    )
                }
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

    deleteSelected(ids){
        this.setState({loading:true});
        this.props.deleteMultiple(ids)
        .then(() => this.props.fetchAssets().then(()=>this.setState({loading:false})))
        .catch(err => err.response.data.message);
    }

    render() {
        let tableData;
        tableData = <Table className="table table-bordered">
            <thead>
                <tr> 
                    <th>Select</th>
                    <th>#</th>
                    <th>Asset Name</th>
                    <th>Assets Sub Type Name</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {this.renderListAssets(this.props.ListOfAssets)}
            </tbody>
        </Table>
          let deleteSelectedButton = <Button color="danger" className="mb-2"
          onClick={this.deleteSelected.bind(this, this.state.ids)}>Delete Selected</Button>;
        return (
            <div>
                <UI onClick={this.logout}>
                    <div className="w3-container w3-margin-top w3-responsive">
                            <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                                <span aria-hidden="true">&times;</span>
                            </div>
                        <div className="top-details">
                            <h3>Assets Sub Type List</h3>
                            <Button color="primary" onClick={() => this.props.history.push('/superDashBoard/assetsTypeSubMaster/assetsTypeSubList')} id="addAssets" >Add Assets Sub Type</Button>

                        </div>

                        <div>
                            <SearchFilter type="text" value={this.state.search}
                                onChange={this.searchOnChange} />
                                 {deleteSelectedButton}
                            {!this.state.loading ? tableData : <Spinner />}
                        </div>
                        <Modal isOpen={this.state.modal} toggle={this.toggles}>
                            <ModalHeader toggle={this.toggle}>Edit Assets Sub Type</ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                    <Label htmlFor="assetType">Assets Sub Type Name</Label>
                                    <Input maxLength={30} type="text" id="AssetName" name="assetType" onChange={this.onChangeHandler} value={this.state.assetType} />
                                    <div className="error">{this.state.errors.assetType}</div>
                                    <Label htmlFor="description">Description</Label>
                                    <Input maxLength={30} type="text" id="AssetName" name="description" onChange={this.onChangeHandler} value={this.state.description} />
                                    <span className="error">{this.state.errors.description}</span>
                                </FormGroup>
                           
                            <FormGroup>  
                                <Button color="primary mr-2" onClick={this.editAssetsSubType}>Save</Button>
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
        ListOfAssets: state.AssetsTypeReducer,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchAssets, updateAssetsSub, removeAssetsSub,deleteMultiple }, dispatch)
}

export default connect(mapStatToProps, mapDispatchToProps)(AssetsTypeSubList);
