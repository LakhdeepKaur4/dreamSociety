import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Table,Modal,ModalBody,ModalHeader,FormGroup,Input} from 'reactstrap';
import SearchFilter from '../../components/searchFilter/searchFilter';
import UI from '../../components/newUI/superAdminDashboard';
import {getOwnerFlats,deleteOwnerFlats,getAllFloor} from '../../actionCreators/flatOwnerAction';
import { Label } from 'semantic-ui-react';
import DefaultSelect from './../../constants/defaultSelect';
import { viewTower } from '../../actionCreators/towerMasterAction';
import Spinner from '../../components/spinner/spinner';
<<<<<<< HEAD
=======
import {getFlatDetails} from '../../actionCreators/flatDetailMasterAction';
>>>>>>> c7afbf143958eb26b553a7e7b7f05ef84472864e
let ownerId;
class ViewFlats extends Component {

    state = {
        filterName: 'flatNo',
        flatDetailId: '',
        flatNo: '',
        flatId: '',
        flatType: '',
        floorId: '',
        floorName: '',
        towerId: '',
        towerName: '',
        isActive: false,
        ids: [],
        menuVisible: false,
        editFlatModal: false,
        isDisabled: true,
        search: '',
        errors: {},
        loading: true,
        message: '',
        modalLoading: false,
        parkingId:'',
        slotId:'',
        modal: false,
<<<<<<< HEAD
        flatDetailIds:'',
=======
        newFlatId:''
>>>>>>> c7afbf143958eb26b553a7e7b7f05ef84472864e

    }

    componentWillMount() {
        ownerId=localStorage.getItem('ownerId')
        this.props.getOwnerFlats(ownerId)
        .then(()=>{this.setState({loading:false})})
    }

    componentDidMount(){
        this.props.viewTower();
<<<<<<< HEAD
=======
        this.props.getFlatDetails();
>>>>>>> c7afbf143958eb26b553a7e7b7f05ef84472864e
    }

    onHandleChange = (event) => {
        this.setState({ message: '' })
        if (!!this.state.errors[event.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.name];
            this.setState({ [event.target.name]: event.target.value, errors });
        }
        else {
            this.setState({ [event.target.name]: event.target.value });
        }
    }

    push = () => {
        this.props.history.push('/superDashboard/addOwnerFlat')
    }
    delete=(flatDetailId)=>{
<<<<<<< HEAD
        console.log('flatDetailId',flatDetailId)
        let ownerId=localStorage.getItem('ownerId')
        this.props.deleteOwnerFlats(flatDetailId,ownerId)
        .then(()=>this.props.getOwnerFlats(ownerId))
    }
    toggle = (flatDetailId,flatNo,flatType,floor) => {
        console.log(flatDetailId,flatNo,flatType,floor)
        this.setState({
     
=======
        this.setState({loading:true})
        let ownerId=localStorage.getItem('ownerId')
        this.props.deleteOwnerFlats(flatDetailId,ownerId)
        .then(()=>this.props.getOwnerFlats(ownerId).then(()=>this.setState({loading:false})))
    }
    // toggle = (flatDetailId,towerName,towerId,floorName,floorId,flatType,flatId,flatNo) => {
        toggle = () => {
        // console.log(towerName, floorName, flatNo, towerId, floorId,flatDetailId)
        // this.props.getAllFloor(towerId)
        this.setState({
            // towerName, floorName, flatNo, towerId, floorId,flatDetailId,
>>>>>>> c7afbf143958eb26b553a7e7b7f05ef84472864e
            modal: !this.state.modal
            
        })
    }
    viewSlots(id) {
        console.log(id)
        localStorage.setItem('flatDetailId', id)
        this.props.history.push('/superDashboard/parkingSlotList')

    }

    flatList = ({ flats }) => {
        
        if (flats) {
            console.log(flats)
            

          return  flats.flats.flat_detail_masters.map((item,index)=>{
                console.log(item.flat_master.flatType)
                return (

                    <tr key={item.flatDetailId}>
                        <td>{index + 1}</td>
                        <td>{item.flatNo}</td>
                        <td>{item.flat_master.flatType}</td>
                        <td>{item.floor_master.floorName}</td>
                        <td>{item.tower_master.towerName}</td>
                        <td><button className="btn btn-success mr-2" onClick={this.viewSlots.bind(this,item.flatDetailId)} >View Parking</button></td>
                        <td style={{ textAlign: "center" }}>
<<<<<<< HEAD
                            <button className="btn btn-success mr-2" onClick={this.toggle.bind(this,item.flatDetailId,item.flatNo,item.flat_master.flatType,item.floor_master.floorName,item.tower_master.towerName)}>Edit</button>
=======
                            <button className="btn btn-success mr-2" onClick={this.toggle.bind(this,item.tower_master.towerName,item.floor_master.floorName, item.flatNo,item.tower_master.towerId,
                             item.floor_master.floorId,
                                item.flatDetailId)}>Edit</button>
>>>>>>> c7afbf143958eb26b553a7e7b7f05ef84472864e
                            <button className="btn btn-danger" onClick={this.delete.bind(this,item.flatDetailId)} >Delete</button>
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

    changePassword = () => {
        return this.props.history.replace('/superDashboard/changePassword')
    }


    close = () => {
        return this.props.history.replace('/superDashBoard/flatOwnerList')
    }
    searchFilter(search) {
        // return function (x) {
        //     return x.firstName.toLowerCase().includes(search.toLowerCase()) || !search;
        // }
    }
    getTower = ({ tower }) => {
        if (tower) {
            console.log(tower)
            return tower.tower.map((item) => {
                return (
                    <option key={item.towerId} value={item.towerId}>{item.towerName}</option>
                )
            })
        }

    }
    getFloor = ({ floor }) => {
        if (floor) {
            console.log(floor)
            return floor.tower.Floors.map((item) => {
                return (
                    <option key={item.floorId} value={item.floorId}>{item.floorName}</option>
                )
            })
        }

    }
    getFlats=({floor})=>{
<<<<<<< HEAD
        if(floor){
            return  floor.flatDetail.filter((flatRecord)=>{
                return flatRecord.floorId===this.state.floorId
            }).map((item)=>{
                return (
                    <option key={item.flatDetailId} value={item.flatDetailId}>{item.flatNo}</option>
                )
            });
        }
=======
        console.log(floor)
        if(floor){
            return  floor.flatDetail.filter((flatRecord)=>{
                console.log(flatRecord.floorId,'majhisjkldjkjkjkjk00000000000000')
                return flatRecord.floorId===this.state.floorId
            }).map((selectFlat)=>{
                console.log('selectFlat',selectFlat)
                return <option key={selectFlat.flatDetailId} value={selectFlat.flatDetailId} >{selectFlat.flatNo}</option>           
             });
        }
        else {
            return []
          } 
>>>>>>> c7afbf143958eb26b553a7e7b7f05ef84472864e
    }

    towerChangeHandler=(e)=>{
      this.setState({
          towerId:e.target.value
      },function(){this.props.getAllFloor(this.state.towerId)} )
      
    }
    floorChangeHandler=(e)=>{
<<<<<<< HEAD
        this.setState({
            floorId:e.target.value
        })
    }

=======
        console.log('floorChangeHandler',e.target.value)
        this.setState({
            floorId:e.target.value
        },function(){console.log('+++++++++++++++',this.state.floorId)})
    }
    getDropdown1=({flattype})=>{
        if(flattype){
            return flattype.flat.map((items)=>{
                return(
                    <option key={items.flatId} value={items.flatId}>
                    {items.flatType}
                    </option>
                )
            })
        }
    }
    onflatChangeHandler=(e)=>{
        this.setState({
            newFlatId:e.target.value
        },function(){
            console.log('ksdfjkldsjfklsdjflsdkfjksldkjk',this.state.newFlatId)
        })
    }
    editOwnerFlat=()=>{
        console.log('editOwnerFlat',this.state.newFlatId,this.state.flatDetailId)
    }
    toggles = () => {
        this.setState({ modal: !this.state.modal })
    }
>>>>>>> c7afbf143958eb26b553a7e7b7f05ef84472864e
    render() {
        let tableData;
        tableData =
            <Table className="table table-bordered">
                <thead>
                    <tr>
                        <th style={{ width: '4%' }}>#</th>
                        <th onClick={() => {
                            this.setState((state) => {
                                return {
                                    sortVal: !state.sortVal,
                                    filterName: 'flatNo'
                                }
                            });
                        }}>Flat No <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                        <th>Flat Type</th>
                        <th>Floor</th>
                        <th>Tower Name</th>
                    <th style={{ textAlign: "center", width: "8%" }}>View Parking</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {this.flatList(this.props.Owner)}
                </tbody>
            </Table>
        // let deleteSelectedButton = <Button color="danger" className="mb-2"
        //     onClick={this.deleteSelected.bind(this, this.state.ids)} disabled={this.state.isDisabled}>Delete Selected</Button>



        return (
            <div>
                <UI onClick={this.logout} change={this.changePassword}>

                    <div className="w3-container w3-margin-top w3-responsive">
                        <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                        </div>
                        <div className="top-details" style={{ fontWeight: 'bold' }}><h3>Owner Flat Details</h3>
                            <Button color="primary" type="button" onClick={this.push}> Add More Flat</Button>
                        </div>
                        <SearchFilter type="text" value={this.state.search} onChange={this.searchOnChange} />
                        {(this.state.loading) ? <Spinner /> : tableData}
                        {/* {tableData} */}
                        <Modal isOpen={this.state.modal} toggle={this.toggles} style={{width:"100% !important"}}>
                                <ModalHeader toggle={this.toggle}>Edit Owner's Flat</ModalHeader>
                                <ModalBody>
<<<<<<< HEAD
                                    <FormGroup>
                                        <Label>Tower Name</Label>
                                        <Input type="select" defaultValue='no-value'  value={this.state.towerId} onChange={this.towerChangeHandler} name="towerId">
=======
                                        <FormGroup>
                                        <Label>Tower Name</Label>
                                        <Input type="select" id="tower" value={this.state.towerId ? this.state.towerId : 'no-value'} onChange={this.towerChangeHandler} name="towerId">
>>>>>>> c7afbf143958eb26b553a7e7b7f05ef84472864e
                                        <DefaultSelect/>
                                        {this.getTower(this.props.towerList)}
                                         </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Floor Name</Label>
<<<<<<< HEAD
                                        <Input type="select" defaultValue='no-value'  value={this.state.floorId} onChange={this.floorChangeHandler} name="floorId">
=======
                                        <Input type="select" id="floor"  value={this.state.floorId ?this.state.floorId : 'no-value'} onChange={this.floorChangeHandler} name="floorId">
>>>>>>> c7afbf143958eb26b553a7e7b7f05ef84472864e
                                        <DefaultSelect/>
                                        {this.getFloor(this.props.towerFloor)}
                                         </Input>
                                    </FormGroup>
<<<<<<< HEAD
                                    <FormGroup>
                                        <Label>Flat Number</Label>
                                        <Input type="select" defaultValue='no-value'  value={this.state.flatDetailIds} onChange={this.onChangeHandler} name="flatDetailIds">
=======
                                     {/* <FormGroup>
                                        <Label>Flat Type</Label>
                                        <Input type="select" defaultValue='no-value'  value={this.state.flatId} onChange={this.floorChangeHandler} name="flatId">
                                        <option>{this.state.flatType}</option> 
                                        <DefaultSelect/>
                                        {this.getDropdown1(this.props.flatDetailMasterReducer)}
                                         </Input>
                                    </FormGroup>  */}
                                    <FormGroup>
                                        <Label>Flat Number</Label>
                                        <Input type="select"  value={this.state.floorId ?this.state.floorId : 'no-value'} onChange={this.onflatChangeHandler} name="flatDetailId">
>>>>>>> c7afbf143958eb26b553a7e7b7f05ef84472864e
                                        <DefaultSelect/>
                                        {this.getFlats(this.props.towerFloor)}
                                         </Input>
                                    </FormGroup>
<<<<<<< HEAD
=======
                                    <FormGroup>
                                        <Button color="primary mr-2" onClick={this.editOwnerFlat}>Save</Button>
                                        <Button color="danger" onClick={this.toggles}>Cancel</Button>
                                    </FormGroup>
>>>>>>> c7afbf143958eb26b553a7e7b7f05ef84472864e
                                </ModalBody>
                        </Modal>
                    </div>
                </UI>
            </div>
        )
    }

}

function mapStateToProps(state) {
<<<<<<< HEAD
=======
    console.log('kjhfkldsjflkdjfkldsfjdklsjkl',state.FlatOwnerReducer)
>>>>>>> c7afbf143958eb26b553a7e7b7f05ef84472864e
    return {
        Owner: state.FlatOwnerReducer,
        towerFloor:state.FlatOwnerReducer,
        towerList: state.TowerDetails,
<<<<<<< HEAD
=======
        flatDetailMasterReducer : state.flatDetailMasterReducer
>>>>>>> c7afbf143958eb26b553a7e7b7f05ef84472864e
    }
}

function mapDispatchToProps(dispatch) {
<<<<<<< HEAD
    return bindActionCreators({getOwnerFlats,deleteOwnerFlats,viewTower,getAllFloor}, dispatch)
=======
    return bindActionCreators({getOwnerFlats,deleteOwnerFlats,viewTower,getAllFloor,getFlatDetails}, dispatch)
>>>>>>> c7afbf143958eb26b553a7e7b7f05ef84472864e
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewFlats);