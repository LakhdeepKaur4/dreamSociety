import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Table,Modal,ModalBody,ModalHeader,FormGroup,Input} from 'reactstrap';
import SearchFilter from '../../components/searchFilter/searchFilter';
import UI from '../../components/newUI/superAdminDashboard';
import {getAllFloor} from '../../actionCreators/flatOwnerAction';
import { Label } from 'semantic-ui-react';
import DefaultSelect from './../../constants/defaultSelect';
import { viewTower } from '../../actionCreators/towerMasterAction';
import {viewMachine,deleteMachine} from '../../actionCreators/machineMasterAction';
// import Spinner from '../../components/spinner/spinner';
let ownerId;
class ViewMachineMaster extends Component {

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
        newFlatId:''

    }

   

    componentDidMount(){
        this.props.viewTower();
            this.props.viewMachine();

            console.log(   this.props.viewMachine());
    }

    refreshData=()=>{
        this.props.viewTower();
            this.props.viewMachine();

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
        this.props.history.push('/superDashboard/machineMaster')
    }
    delete=(machineId)=>{
        this.setState({loading:true})
        let { isActive } = this.state;
        this.props.deleteMachine(machineId,isActive).then(() => this.refreshData())
        this.setState({ isActive: false  })
    
        
    }
   
        toggle = (machineActualId,towerName,floorName,flatNo) => {
        console.log(machineActualId,towerName,floorName,flatNo)
        this.setState({
            machineActualId,towerName,floorName,flatNo,
            modal: !this.state.modal
            
        },function(){
            console.log(this.state.floorName)
        })
    }
 



    flatList =({machine})=>{
        console.log(machine);
        if(machine)
        {

                     return machine.Machines.map((item,index)=>{
                                
                                return (
                
                                    <tr key={item.machineId}>
                                        <td>{index + 1}</td>
                                        <td> {item.machineActualId}</td>
                                        <td>{item.flat_detail_master.tower_master.towerName}</td>
                                        <td>{item.flat_detail_master.floor_master.floorName}</td>
                                        <td>{item.flat_detail_master.flatNo}</td>
                                      <td style={{ textAlign: "center" }}>
                             <button className="btn btn-success mr-2" onClick={this.toggle.bind(this,item.machineActualId,item.flat_detail_master.tower_master.towerName,item.flat_detail_master.floor_master.floorName,item.flat_detail_master.flatNo)}>Edit</button>
                         <button className="btn btn-danger" onClick={this.delete.bind(this,item.machineId)} >Delete</button>
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
            console.log(this.state.newFlatId)
        })
    }
    editOwnerFlat=()=>{
        console.log('editOwnerFlat')
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
                        }}>Machine ID  <i className="fa fa-arrows-v" id="sortArrow" aria-hidden="true"></i></th>
                     
                   
                        <th>Tower Name</th>
                        <th>Floor</th>
                        <th>Flat Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {this.flatList(this.props.MachineDetails)}
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
                        <div className="top-details" style={{ fontWeight: 'bold' }}><h3>Machine  Details</h3>
                            <Button color="primary" type="button" onClick={this.push}> Add Machine</Button>
                        </div>
                        <SearchFilter type="text" value={this.state.search} onChange={this.searchOnChange} />
                        {tableData}
                        {/* {tableData} */}
                        <Modal isOpen={this.state.modal} toggle={this.toggles} style={{width:"100% !important"}}>
                                <ModalHeader toggle={this.toggle}>Edit Owner's Flat</ModalHeader>
                                <ModalBody>
                                    <FormGroup>
                                        <Label>Tower Name</Label>
                                        <Input type="select" defaultValue='no-value'  value={this.state.towerId} onChange={this.towerChangeHandler} name="towerId">
                                        {/* <option>{this.state.towerName}</option> */}
                                        <DefaultSelect/>
                                        {this.getTower(this.props.towerList)}
                                         </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Floor Name</Label>
                                        <Input type="select" defaultValue='no-value'  value={this.state.floorId} onChange={this.floorChangeHandler} name="floorId">
                                        {/* <option>{this.state.floorName}</option> */}
                                        <DefaultSelect/>
                                        {this.getFloor(this.props.towerFloor)}
                                         </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Flat Type</Label>
                                        <Input type="select" defaultValue='no-value'  value={this.state.flatId} onChange={this.floorChangeHandler} name="flatId">
                                        {/* <option>{this.state.flatType}</option> */}
                                        <DefaultSelect/>
                                        {this.getDropdown1(this.props.flatDetailMasterReducer)}
                                         </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Flat Number</Label>
                                        <Input type="select" defaultValue='no-value' value={this.state.flatDetailId} onChange={this.onflatChangeHandler} name="flatDetailId">
                                        {/* <option>{this.state.flatNo}</option> */}
                                        <DefaultSelect/>
                                        {this.getFlats(this.props.towerFloor)}
                                         </Input>
                                         {/* <FormGroup>
                                        <Button color="primary mr-2" onClick={this.editOwnerFlat}>Save</Button>
                                        <Button color="danger" onClick={this.toggles}>Cancel</Button>
                                    </FormGroup> */}
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
        MachineDetails: state.MachineDetails,
        towerFloor:state.FlatOwnerReducer,
        towerList: state.TowerDetails,
        flatDetailMasterReducer : state.flatDetailMasterReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({viewTower,getAllFloor,viewMachine,deleteMachine}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewMachineMaster);