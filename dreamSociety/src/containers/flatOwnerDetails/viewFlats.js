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

// import Spinner from '../../components/spinner/spinner';
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
        flatDetailIds:'',

    }

    componentWillMount() {
        ownerId=localStorage.getItem('ownerId')
        this.props.getOwnerFlats(ownerId)
    }

    componentDidMount(){
        this.props.viewTower();
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
        console.log('flatDetailId',flatDetailId)
let ownerId=localStorage.getItem('ownerId')
this.props.deleteOwnerFlats(flatDetailId,ownerId)
.then(()=>this.props.getOwnerFlats(ownerId))
    }
    toggle = (flatDetailId,flatNo,flatType,floor) => {
        console.log(flatDetailId,flatNo,flatType,floor)
        this.setState({
     
            modal: !this.state.modal
            
        })
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
                        <td style={{ textAlign: "center" }}>
                            <button className="btn btn-success mr-2" onClick={this.toggle.bind(this,item.flatDetailId,item.flatNo,item.flat_master.flatType,item.floor_master.floorName,item.tower_master.towerName)}>Edit</button>
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
        if(floor){
            return  floor.flatDetail.filter((flatRecord)=>{
                return flatRecord.floorId===this.state.floorId
            }).map((item)=>{
                return (
                    <option key={item.flatDetailId} value={item.flatDetailId}>{item.flatNo}</option>
                )
            });
        }
    }

    towerChangeHandler=(e)=>{
      this.setState({
          towerId:e.target.value
      },function(){this.props.getAllFloor(this.state.towerId)} )
      
    }
    floorChangeHandler=(e)=>{
        this.setState({
            floorId:e.target.value
        })
    }

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
                        {/* <th>Parking</th> */}
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
                        {/* {(this.state.loading) ? <Spinner /> : tableData} */}
                        {tableData}
                        <Modal isOpen={this.state.modal} toggle={this.toggles} style={{width:"100% !important"}}>
                                <ModalHeader toggle={this.toggle}>Edit Owner's Flat</ModalHeader>
                                <ModalBody>
                                    <FormGroup>
                                        <Label>Tower Name</Label>
                                        <Input type="select" defaultValue='no-value'  value={this.state.towerId} onChange={this.towerChangeHandler} name="towerId">
                                        <DefaultSelect/>
                                        {this.getTower(this.props.towerList)}
                                         </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Floor Name</Label>
                                        <Input type="select" defaultValue='no-value'  value={this.state.floorId} onChange={this.floorChangeHandler} name="floorId">
                                        <DefaultSelect/>
                                        {this.getFloor(this.props.towerFloor)}
                                         </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Flat Number</Label>
                                        <Input type="select" defaultValue='no-value'  value={this.state.flatDetailIds} onChange={this.onChangeHandler} name="flatDetailIds">
                                        <DefaultSelect/>
                                        {this.getFlats(this.props.towerFloor)}
                                         </Input>
                                    </FormGroup>
                                </ModalBody>
                        </Modal>
                    </div>
                </UI>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        Owner: state.FlatOwnerReducer,
        towerFloor:state.FlatOwnerReducer,
        towerList: state.TowerDetails,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({getOwnerFlats,deleteOwnerFlats,viewTower,getAllFloor}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewFlats);