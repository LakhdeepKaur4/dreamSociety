import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getEventBooking, deleteEventBooking, updateEventBooking, deleteSelectEventBooking, getSpaceName } from '../../actionCreators/memberEventsBookingAction';
import { getMemberEvent } from './../../actionCreators/societyMemberEventAction';
import { bindActionCreators } from 'redux';
import SearchFilter from '../../components/searchFilter/searchFilter';
import UI from '../../components/newUI/superAdminDashboard';
import { Table, Button, Modal, FormGroup, ModalBody, ModalHeader, Input, Label } from 'reactstrap';
import Spinner from '../../components/spinner/spinner';


class MemberEventsBookingDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMemberEventData: {
                societyMemberBookingId:'',
                societyMemberEventName:'',
                societyMemberEventId: '',
                startDate:'',
                endDate:'',
                numberOfGuestExpected:'',
                eventSpaceId:'',
                spaceName:'',
                isActive: false,

            },
            menuVisible: false,
            search: '',
            modal: false,
            loading: true,
            errors: {},
            isDisabled: true,
            ids: [],

        };
    }

    onChangeHandler = (event) => {
        if (!!this.state.errors[event.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.name];
            this.setState({ [event.target.name]: event.target.value, errors });
        }
        else {
            this.setState({ [event.target.name]: event.target.value });
        }
    }


    toggle = (societyMemberEventId,societyMemberEventName, startDate,endDate,numberOfGuestExpected, eventSpaceId, spaceName) => {

        this.setState({
            societyMemberEventId,
            societyMemberEventName,
            startDate,
            endDate,
            numberOfGuestExpected,
            eventSpaceId,
            spaceName,
           
            modal: !this.state.modal
        })
    }




    toggleModal = () => {
        this.setState({ modal: !this.state.modal })
    }


    componentWillMount() {
        this.refreshData()

    }

    refreshData() {
        this.props.getEventBooking().then(() => this.setState({ loading: false }))
        this.props.getMemberEvent().then(() => this.setState({loading: false}))
        this.props.getSpaceName().then(() => this.setState({loading: false}))
       
    }


    editsocietyMemberEventName = () => {
       
        const {societyMemberEventBookingId, societyMemberEventId,startDate,endDate,numberOfGuestExpected, eventSpaceId } = this.state
        
        let errors = {};
       
        if(this.state.startDate===''){
            errors.startDate="Start Date can't be empty"
        }
        this.setState({errors});

        if(this.state.endDate===''){
            errors.startDate="End Date can't be empty"
        }
        this.setState({errors});

        if(this.state.numberOfGuestExpected===''){
            errors.numberOfGuestExpected="Number of Guest can't be empty"
        }
        this.setState({errors});
        
       

        const isValid = Object.keys(errors).length === 0
        
        if (isValid) {
            this.setState({
                loading: true
            })
        this.props.updateEventBooking(societyMemberEventBookingId,societyMemberEventId, startDate, endDate,numberOfGuestExpected, eventSpaceId)
            .then(() => this.refreshData())
        this.setState({
            editMemberEventData: {societyMemberEventBookingId, societyMemberEventId,startDate,endDate,numberOfGuestExpected, eventSpaceId },
            modal: !this.state.modal
        })
    }
    }

      deleteMemberEventName = (societyMemberBookingId) => {
        let { isActive } = this.state.editMemberEventData

        if(window.confirm('Are You Sure ?')){
        this.setState({ loading: true })
        this.props.deleteEventBooking(societyMemberBookingId, isActive)
            .then(() => this.refreshData())
        this.setState({editMemberEventData: { isActive: false } })
        }
        else{
            this.refreshData()
            this.setState({editMemberEventData: { isActive: false } })
        }
      }



    searchOnChange = (e) => {
        this.setState({ search: e.target.value })
    }

    searchFilter = (search) => {
        return function (x) {
            console.log(x)
            return x.society_member_event_master.societyMemberEventName.toLowerCase().includes(search.toLowerCase()) ||
                   x.startDate.toLowerCase().includes(search.toLowerCase())  ||
                   x.endDate.toLowerCase().includes(search.toLowerCase())  ||
                   x.numberOfGuestExpected.toLowerCase().includes(search.toLowerCase())  ||
                   x.event_space_master.spaceName.toLowerCase().includes(search.toLowerCase())  ||
                 !search;
        }
    }

    deleteSelected(ids){
        this.setState({loading:true,  isDisabled:true});

        
        if(window.confirm('Are You Sure ?')){
        this.props.deleteSelectMemberEvent(ids)
        .then(() => this.refreshData())
        .catch(err => err.response.data.message);
        }
        else{
            this.refreshData()
        }
    }

    selectAll = () => {
        let selectMultiple = document.getElementsByClassName('SelectAll');
        let ar =[];
            for(var i = 0; i < selectMultiple.length; i++){
                    ar.push(parseInt(selectMultiple[i].value));
                    selectMultiple[i].checked = true;
            }
            this.setState({ids: ar});
            if(ar.length > 0){
                this.setState({isDisabled: false});
            }
    }

    unSelectAll = () =>{
        
        let unSelectMultiple = document.getElementsByClassName('SelectAll');
        let allIds = [];
        for(var i = 0; i < unSelectMultiple.length; i++){
                unSelectMultiple[i].checked = false
        }
        
        this.setState({ids: [ ...allIds]});
        if(allIds.length === 0){
            this.setState({isDisabled: true});
        }
        
    }

    fetchEventName=({ memberEventsResult })=> {
        if (memberEventsResult) {
            return (
                memberEventsResult.event.map((item) => {
                    return (
                        <option value={item.societyMemberEventId} key={item.societyMemberEventId}>
                            {item.societyMemberEventName}
                        </option>
                    )
                })
            )
        }
    }

    fetchSpaceName=({ memberEventsResult })=> {
        console.log(memberEventsResult)
        if ( memberEventsResult) {
            return (
                memberEventsResult.events.map((item) => {
                    return (
                        <option value={item.eventSpaceId} key={item.eventSpaceId}>
                            {item.spaceName}
                        </option>
                    )
                })
            )
        }
    }



   


    renderBookingEvent = ({ memberEventsResult }) => {
       console.log("sdhshsh", memberEventsResult);
        if (memberEventsResult) {
            return memberEventsResult.events.filter(this.searchFilter(this.state.search)).map((item, index) => {

                return (
                    <tr key={item.societyMemberEventBookingId}>
                     <td><input type="checkbox" name="ids" className="SelectAll" value={item.societyMemberEventBookingId}
                         onChange={(e) => {
                            const {societyMemberEventBookingId} = item
                            if(!e.target.checked){
                                document.getElementById('allSelect').checked=false;
                                let indexOfId = this.state.ids.indexOf(societyMemberEventBookingId);
                                if(indexOfId > -1){
                                    this.state.ids.splice(indexOfId, 1);
                                }
                                if(this.state.ids.length === 0){
                                    this.setState({isDisabled: true});
                                }
                            }
                            else {
                      
                                this.setState({ids: [...this.state.ids, societyMemberEventBookingId]});
                                
                                if(this.state.ids.length >= 0){
                                    this.setState({isDisabled: false})
                                }
                            }
                                
                             }}/></td>
                      
                        <td>{index+1}</td>
                        <td>{item.society_member_event_master.societyMemberEventName}</td>
                        <td>{item.startDate}</td>
                        <td>{item.endDate}</td>
                        <td>{item.numberOfGuestExpected}</td>
                        <td>{item.event_space_master.spaceName}</td>
                        <td> 
                            <Button color="success mr-2" onClick={this.toggle.bind(this, item.societyMemberEventBookingId, item.society_member_event_master.societyMemberEventName,item.startDate,item.endDate,item.numberOfGuestExpected, item.event_space_master.spaceName)}>Edit</Button>
                            <Button color="danger"  >Delete</Button>

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

    routeToAddNewBookingEvent = () => {
        this.props.history.push('/superDashboard/memberEventsBooking')
    }


    OnKeyPressUserhandler(event) {
        const pattern = /^[a-zA-Z ]+$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    close=()=>{
        return this.props.history.replace('/superDashBoard')
    }

    render() {
        let tableData;
        tableData = <div style={{ backgroundColor: 'lightgray' }}>
            <Table className="table table-bordered">
                <thead>
                    <tr>
                    <th>Select All<input className="ml-2"
                    id="allSelect"
                    type="checkbox" onChange={(e) => {
                            if(e.target.checked) {
                                this.selectAll();
                            }
                            else if(!e.target.checked){
                                this.unSelectAll();
                            } 
                        }  
                    }/></th>
                        <th>#</th>
                        <th>Event Type</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>number Of Guest Expected</th>
                        <th>Space Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderBookingEvent(this.props.memberEventsBookingReducer)}
                </tbody>
            </Table></div>
        return (
            <div>

                <UI onClick={this.logout}>
                    <div className="w3-container w3-margin-top w3-responsive">
                    <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
                            <span aria-hidden="true">&times;</span>
                    </div>
                        <div className="top-details">
                            <h3>Events Booking Detail</h3>
                            <Button onClick={this.routeToAddNewBookingEvent} color="primary">Add Booking</Button>
                        </div>
                        <SearchFilter type="text" value={this.state.search}
                            onChange={this.searchOnChange} />
                             <Button color="danger" disabled={this.state.isDisabled} className="mb-3"
        onClick={this.deleteSelected.bind(this, this.state.ids)}>Delete Selected</Button>

                        {!this.state.loading ? tableData : <Spinner />}
                        <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggle}>Edit</ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                    <Label>Event Type</Label>
                                    <Input type="select"  name="societyMemberEventName"  onChange={this.onChangeHandler} value={this.state.societyMemberEventName} maxLength={50} onKeyPress={this.OnKeyPressUserhandler}>
                                     {this.fetchEventName(this.props.societyMemberEventReducer)}
                                    </Input>
                                    <span className="error">{this.state.errors.societyMemberEventId}</span>
                                </FormGroup>

                                <FormGroup>
                                    <Label>Start Date</Label>
                                    <Input type="date"  name="startDate"  onChange={this.onChangeHandler} value={this.state.startDate} >
                                    </Input>
                                    <span className="error">{this.state.errors.startDate}</span>
                                </FormGroup>

                                <FormGroup>
                                    <Label>End Date</Label>
                                    <Input type="date"  name="endDate"  onChange={this.onChangeHandler} value={this.state.endDate} >
                                    </Input>
                                    <span className="error">{this.state.errors.endDate}</span>
                                </FormGroup>

                                <FormGroup>
                                    <Label>Number Of Guest Expected</Label>
                                    <Input type="text"  name="numberOfGuestExpected"  onChange={this.onChangeHandler} value={this.state.numberOfGuestExpected} >
                                    </Input>
                                    <span className="error">{this.state.errors.endDate}</span>
                                </FormGroup>


                                <FormGroup>
                                    <Label>Space Name</Label>
                                    <Input type="text"  name="spaceName"  onChange={this.onChangeHandler} value={this.state.spaceName} maxLength={50} onKeyPress={this.OnKeyPressUserhandler}>
                                     {this.fetchSpaceName(this.props.memberEventsBookingReducer)}
                                    </Input>
                                    <span className="error">{this.state.errors.eventSpaceId}</span>
                                </FormGroup>





                                <FormGroup>
                                    <Button color="primary mr-2" onClick={this.editsocietyMemberEventName}>Save</Button>

                                    <Button color="danger" onClick={this.toggleModal.bind(this)}>Cancel</Button>
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
    console.log("state", state)
    return {
        memberEventsBookingReducer: state.memberEventsBookingReducer,
        societyMemberEventReducer: state.societyMemberEventReducer
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getEventBooking, deleteEventBooking, updateEventBooking, deleteSelectEventBooking,getMemberEvent, getSpaceName }, dispatch)
}

export default connect(mapStatToProps, mapDispatchToProps)(MemberEventsBookingDetail);