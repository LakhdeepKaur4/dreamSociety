import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';
import SearchFilter from '../../components/searchFilter/searchFilter';
import { Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Input, Table, Label } from 'reactstrap';
import {getOwnerList} from '../../actionCreators/flatOwnerAction'
class FlatOwnerList extends Component {
    constructor(props){
        super(props);
        this.state={
            profilePic:'',
            ownerName:'',
            contact:'',
            permanentAddress:'',
            towerName:'',
            flatNo:'',
            menuVisible: false,
            search: '',
            modal: false,
            loading: true,
            errors: {},
            ids: [],
            isDisabled: true,
        }
    }
    componentDidMount(){
        this.props.getOwnerList();
    }
    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }
    toggle = (ownerId, ownerName, contact) => {

        this.setState({
            ownerId,
            ownerName,
            contact,
            modal: !this.state.modal
        })
    }
    delete = (assetId) => {
        this.setState({loading:true})
        if(window.confirm('Are You Sure ?')){
        this.props.removeAssets(assetId)
        .then(() => {this.props.getAssets()
        .then(()=>this.setState({loading:false}))})
        }
        else{
            this.props.getAssets()
            .then(()=>this.setState({loading:false}))
        }
    }
    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }
    searchFilter(search) {
        return function (x) {
            return x.ownerName.toLowerCase().includes(search.toLowerCase()) || !search;
        }
    }
    selectAll = () => {
        let selectMultiple = document.getElementsByClassName('SelectAll');
        console.log('selectMultiple', selectMultiple)
        let ar = [];
        for (var i = 0; i < selectMultiple.length; i++) {
            ar.push(parseInt(selectMultiple[i].value));
            selectMultiple[i].checked = true;
        }
        this.setState({ ids: ar });
        if(ar.length > 0){
            this.setState({isDisabled: false});
        }
    }
    unSelectAll = () => {
        let allIds = []
        let unSelectMultiple = document.getElementsByClassName('SelectAll');
        for (var i = 0; i < unSelectMultiple.length; i++) {
            unSelectMultiple[i].checked = false
        }
      
        this.setState({ ids: [...allIds] });
        if(allIds.length === 0){
            this.setState({isDisabled: true});
        }
    }
    deleteSelected(ids) {
        this.setState({ loading: true,
         isDisabled:true });
         if(window.confirm('Are You Sure ?')){
        this.props.multipleDelete(ids)
            .then(() => this.props.getInventory().then(() => this.setState({ loading: false })))
            .catch(err => err.response.data.message);
         }
         else{
            this.props.getInventory()
            .then(() => this.setState({ loading: false }))
         }
    }
    renderList=({owners})=>{
        console.log(owners)
        if(owners){
            return owners.getOwners.filter(this.searchFilter(this.state.search)).map((items,index) => {
                return (

                    <tr key={items.ownerId}>
                      <td><input type="checkbox" name="ids" value={items.ownerId} className="SelectAll"
                         onChange={(e, i) => {
                            const {ownerId} = items
                            if(!e.target.checked){
                                if(this.state.ids.length>-1){
                                    document.getElementById('allSelect').checked=false;
                                let indexOfId = this.state.ids.indexOf(ownerId);
                                if(indexOfId > -1){
                                    this.state.ids.splice(indexOfId, 1)
                                }
                                if(this.state.ids.length === 0){
                                    this.setState({isDisabled: true})
                                }
                            }
                        }
                            else {
                                this.setState({ids: [...this.state.ids, ownerId]})
                                if(this.state.ids.length >= 0){
                                    this.setState({isDisabled: false})
                                }
                        } 
                             }}/></td>
                    <td>{index+1}</td>
                    <td > <img style={{ width: "70%", height: "35%" }} src={items.picture} alt="Profile Pic">
                            </img></td>
                        <td style={{textAlign:"center",width:'10px'}}>{items.ownerName}</td>
                        <td>{items.contact}</td>
                        <td>{items.permanentAddress}</td>
                        <td>{items.tower_master.towerName}</td>
                        <td>{items.flat_detail_master.flatNo}</td>
                        <td>
                        <button className="btn btn-success mr-2" onClick={this.toggle.bind(this, items.ownerId, items.ownerName, items.contact)} >Edit</button>
                        <button className="btn btn-danger" onClick={this.delete.bind(this, items.ownerId)} >Delete</button>
                        </td>
                    </tr>
                )
            })
        }

        
    }
    render() {
        let tableData;
        tableData = <Table className="table table-bordered">
            <thead>
                <tr>
                {/* <th style={{alignContent:'baseline'}}>Select All<input
                type="checkbox" id="allSelect" className="ml-2" onChange={(e) => {
                            if(e.target.checked) {
                                this.selectAll();
                            }
                            else if(!e.target.checked){
                                this.unSelectAll();
                            } 
                        }  
                    }/></th> */}
                    <th style={{width:"4%"}}></th>
                    <th style={{textAlign:"center",width:"8%"}}>#</th>
                    <th style={{textAlign:"center"}}>Profile Pic</th>
                    <th style={{textAlign:"center",width:"8%"}}>Name</th>
                    <th style={{textAlign:"center"}}>Contact No.</th>
                    <th style={{textAlign:"center"}}>Permanent Address</th>
                    <th style={{textAlign:"center"}}>Tower Name</th>
                    <th style={{textAlign:"center"}}>Flat No.</th>
                    <th style={{textAlign:"center"}}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {this.renderList(this.props.Owner)}
            </tbody>
        </Table>
          let deleteSelectedButton = <Button color="danger" className="mb-2" disabled={this.state.isDisabled}
          onClick={this.deleteSelected.bind(this, this.state.ids)}>Delete Selected</Button>;

        return (
            <div>
                <UI onClick={this.logout}>
                <div className="w3-container w3-margin-top w3-responsive">
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                                <span aria-hidden="true">&times;</span>
                            </div>
                        <div className="top-details">
                            <h3>Flat Owner List</h3>
                            <Button color="primary" onClick={() => this.props.history.push('/superDashBoard/flatOwnerDetail')} id="addOwner" >Add Owner</Button>
                            {/* {tableData} */}
                        </div>
                        <div>
                            <SearchFilter type="text" value={this.state.search}
                                onChange={this.searchOnChange} />
                            {deleteSelectedButton}
                                 <Label htmlFor="allSelect" style={{alignContent:'baseline',marginLeft:"10px",fontWeight:"700"}}>Select All<input
                type="checkbox" id="allSelect" className="ml-2" onChange={(e) => {
                            if (e.target.checked) {
                                this.selectAll();
                            }
                            else if (!e.target.checked) {
                                this.unSelectAll();
                            }
                        }
                        } /></Label>
                        {tableData}
                            {/* {!this.state.loading ? tableData : <Spinner />} */}
                        </div>
                        </div>
                </UI>
            </div>
        );
    }
}
function mapStateToProps(state){
    console.log(state.FlatOwnerReducer)
    return{
    Owner:state.FlatOwnerReducer
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({ getOwnerList },dispatch)
}

export default  connect(mapStateToProps,mapDispatchToProps)(FlatOwnerList);