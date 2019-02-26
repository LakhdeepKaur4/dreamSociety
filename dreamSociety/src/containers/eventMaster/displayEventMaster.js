import React, { Component } from 'react';
import { ViewEvent, GetEventOrganiser, deleteEvent, updateEvent,deleteMultipleEvents } from '../../actionCreators/eventMasterAction';
import { bindActionCreators } from 'redux';
import Spinner from '../../components/spinner/spinner'
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import DefaultSelect from '../../constants/defaultSelect'
import { Table, Input, Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Label } from 'reactstrap';
import UI from '../../components/newUI/superAdminDashboard';
import SearchFilter from '../../components/searchFilter/searchFilter';
class DisplayEventMaster extends Component {
        state = {
                editEventData: {
                        eventId: '',
                        userId: '',
                        userName: '',
                        eventType: '',
                        eventName: '',
                        eventOrganiser: [],
                        startDate: Date,
                        endDate: Date,
                        isActive: false,

                },
                editEventModal: false,
                menuVisible: false,
                search: '',
                loading: true,
                ids: [],
                isDisabled: true,
        }
        componentDidMount() {
                this.refreshData()
        }


        refreshData() {

                this.props.ViewEvent().then(() => this.setState({ loading: false }));
                this.props.GetEventOrganiser().then(() => this.setState({ loading: false }));

        }
        toggleEditEventModal() {
                this.setState({
                        editEventModal: !this.state.editEventModal
                })
        }

        editEvent(eventId, eventType, eventName, eventOrganiser, startDate, endDate, userId, userName) {
                console.log('i m in edit ', eventId, userName, eventOrganiser);
                this.setState({
                        editEventData: { eventId, eventType, eventName, eventOrganiser, startDate, endDate, userId, userName },
                        editEventModal: !this.state.editEventModal
                })
        }

        updateEvent = () => {

                let { eventId, eventType, eventName, eventOrganiser, startDate, endDate, userId } = this.state.editEventData;
                this.props.updateEvent(eventId, eventType, eventName, eventOrganiser, startDate, endDate, userId).then(() => { this.refreshData() })




                this.setState({
                        editEventModal: false, loading: true, editEventData: { eventId: '', eventType: '', eventName: '', eventOrganiser: '', startDate: '', endDate: '', userId: '', userName: '' }
                })
        }

        OnKeyPresshandler(event) {
                const pattern = /[a-zA-Z _]/;
                let inputChar = String.fromCharCode(event.charCode);
                if (!pattern.test(inputChar)) {
                        event.preventDefault();
                }
        }
        deleteEvent(eventId) {
                this.setState({ loading: true })

                let { isActive } = this.state.editEventData;


                this.props.deleteEvent(eventId, isActive).then(() => { this.refreshData() })
                this.setState({ editEventData: { isActive: false } })



        }


        searchFilter(search) {
                return function (x) {
                        return x.eventType.toLowerCase().includes(search.toLowerCase()) || !search;
                }
        }
        getEvent({ events }) {
                console.log("events rocks", events);

                if (events) {
                        return (
                                events.event.map((item) => {
                                        return (
                                                <option key={item.userId} value={item.userId}>
                                                        {item.userName}
                                                </option>
                                        )
                                })
                        )
                }
        }
        searchOnChange = (e) => {
                //  this.setState({})
                this.setState({ search: e.target.value })
        }

        displayEvent({ getEvent }) {
                console.log(getEvent);
                if (getEvent) {
                        return (
                                getEvent.event.filter(this.searchFilter(this.state.search)).map((item, index) => {
                                        return (
                                                <tr key={item.eventId}>
                                                 <td><input type="checkbox" name="ids" value={item.eventId} className="SelectAll"
                         onChange={(e, i) => {
                            const {eventId} = item
                            if(!e.target.checked){
                                if(this.state.ids.length>-1){
                                    document.getElementById('allSelect').checked=false;
                                let indexOfId = this.state.ids.indexOf(eventId);
                                if(indexOfId > -1){
                                    this.state.ids.splice(indexOfId, 1)
                                }
                                if(this.state.ids.length === 0){
                                    this.setState({isDisabled: true})
                                }
                            }
                        }
                            else {
                                this.setState({ids: [...this.state.ids, eventId]})
                                if(this.state.ids.length >= 0){
                                    this.setState({isDisabled: false})
                                }
                        } 
                             }}/></td>
                                                        <td> {index + 1}</td>
                                                        <td>{item.eventType}</td>
                                                        <td>{item.eventName}</td>
                                                        <td>{item.organiser.userName}</td>
                                                        <td>{item.startDate}</td>
                                                        <td> {item.endDate}</td>



                                                        <td>

                                                                <button className="btn btn-success mr-2" onClick={this.editEvent.bind(this, item.eventId, item.eventType, item.eventName, item.eventOrganiser, item.startDate, item.endDate, item.organiser.userId, item.organiser.userName)}> Edit</button>

                                                                <button className="btn btn-danger" onClick={this.deleteEvent.bind(this, item.eventId)}>Delete</button>
                                                        </td>
                                                </tr>
                                        )
                                })
                        )
                }
        }


        addEvent = () => {
                this.props.history.push('/superDashboard/event')

        }

        logout = () => {
                localStorage.removeItem('token');
                localStorage.removeItem('user-type');
                return this.props.history.replace('/')
        }

        close = () => {
                return this.props.history.replace('/superDashBoard')
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
            let allIds = []
            let unSelectMultiple = document.getElementsByClassName('SelectAll');
            for(var i = 0; i < unSelectMultiple.length; i++){
                    unSelectMultiple[i].checked = false
            }
   
                this.setState({ids: [ ...allIds]});
                if(allIds.length === 0){
                    this.setState({isDisabled: true});
                }
        }
        deleteSelected(ids){
                this.setState({loading:true,
                    isDisabled:true});
                    if(window.confirm('Are You Sure ?')){
                this.props.deleteMultipleEvents(ids)
                .then(() => {this.props.ViewEvent()
                 .then(()=>this.setState({loading:false}))})
                 .catch(err => err.response.data.message);
                }
                else{
                    this.props.ViewEvent()
                 .then(()=>this.setState({loading:false}))
                }
            }

        render() {
                let tableData;
                tableData = <Table className="table table-bordered">
                        <thead>
                                <tr>
                                <th style={{alignContent:'baseline'}}>Select All<input
                type="checkbox" id="allSelect" className="ml-2" onChange={(e) => {
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
                                        <th>Event Name</th>
                                        <th>Event Organiser</th>
                                        <th>Event Start Date</th>
                                        <th>Event End Date</th>
                                        <th> Actions  </th>
                                </tr>
                        </thead>
                        <tbody>

                                {this.displayEvent(this.props.EventDetails)}

                        </tbody>
                </Table>
                 let deleteSelectedButton = <Button color="danger" className="mb-2"  disabled={this.state.isDisabled} 
                 onClick={this.deleteSelected.bind(this, this.state.ids)}>Delete Selected</Button>;
                return (
                        <div>

                                <UI onClick={this.logout}>

                                        <div className="w3-container w3-margin-top w3-responsive">
                                                <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                                                        <span aria-hidden="true">&times;</span>
                                                </div>
                                                <div className="top-details" >
                                                        <h3 align="center"> Event Details</h3>
                                                        <Button color="primary" onClick={this.addEvent} > Add Event</Button>
                                                </div>
                                                <Modal isOpen={this.state.editEventModal} toggle={this.toggleEditEventModal.bind(this)}>
                                                        <ModalHeader toggle={this.toggleEditEventModal.bind(this)}>Edit  Event Details</ModalHeader>
                                                        <ModalBody>


                                                                <FormGroup>
                                                                        <Label for="eventType"> Event Type</Label>
                                                                        <Input id="eventType" value={this.state.editEventData.eventType}
                                                                                onChange={(e) => {
                                                                                        let { editEventData } = this.state;

                                                                                        editEventData.eventType = e.target.value;

                                                                                        this.setState({ editEventData });
                                                                                }}
                                                                                required
                                                                                maxLength={25}
                                                                                onKeyPress={this.OnKeyPresshandler}

                                                                        />
                                                                </FormGroup>

                                                                <FormGroup>
                                                                        <Label for="eventName"> Event Name</Label>
                                                                        <Input id="eventName" value={this.state.editEventData.eventName} onChange={(e) => {
                                                                                let { editEventData } = this.state;
                                                                                editEventData.eventName = e.target.value;
                                                                                this.setState({ editEventData });
                                                                        }}
                                                                                onKeyPress={this.OnKeyPresshandler}
                                                                                maxLength={25}
                                                                                required />
                                                                </FormGroup>
                                                                <FormGroup>
                                                                        <Label >Event Organiser</Label>
                                                                        <Input type="select" value={this.state.editEventData.eventOrganiser} onChange={(e) => {
                                                                                let { editEventData } = this.state;
                                                                                editEventData.eventOrganiser = e.target.value;
                                                                                console.log('vghvghyghfgh', this.state.editEventData.eventOrganiser);

                                                                                this.setState({ editEventData })

                                                                        }} required >

                                                                                <option value={this.state.editEventData.userName}>{this.state.editEventData.userName}</option>

                                                                                   <DefaultSelect/>

                                                                                {this.getEvent(this.props.EventDetails)}
                                                                        </Input>
                                                                </FormGroup>
                                                                <FormGroup>
                                                                        <Label> Event Start Date</Label>
                                                                        <Input type="date" id="startDate" value={this.state.editEventData.startDate} onChange={(e) => {
                                                                                let { editEventData } = this.state
                                                                                editEventData.startDate = e.target.value;
                                                                                this.setState({ editEventData })
                                                                        }} />
                                                                </FormGroup>
                                                                <FormGroup>
                                                                        <Label>Event End Date</Label>
                                                                        <Input type="date" id="endDate" value={this.state.editEventData.endDate} onChange={(e) => {
                                                                                let { editEventData } = this.state
                                                                                editEventData.endDate = e.target.value;
                                                                                this.setState({
                                                                                        editEventData
                                                                                })
                                                                        }}
                                                                        />
                                                                </FormGroup>



                                                                <Button color="primary" className="mr-2" onClick={this.updateEvent}>Save</Button>
                                                                <Button color="danger" onClick={this.toggleEditEventModal.bind(this)}>Cancel</Button>

                                                        </ModalBody>
                                                </Modal>
                                                <SearchFilter type="text" value={this.state.search} onChange={this.searchOnChange} />
                                                {deleteSelectedButton}
                                                {!this.state.loading ? tableData : <Spinner />}
                                                

                                        </div>
                                </UI>
                        </div>


                )
        }






}


function mapStateToProps(state) {
        return {
                EventDetails: state.EventDetails
        }
}

function mapDispatchToProps(dispatch) {
        return bindActionCreators({ ViewEvent, GetEventOrganiser, deleteEvent, updateEvent ,deleteMultipleEvents}, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayEventMaster)



