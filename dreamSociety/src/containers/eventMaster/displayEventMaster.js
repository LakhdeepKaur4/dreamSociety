import React, { Component } from 'react';
import { ViewEvent, GetEventOrganiser,deleteEvent,updateEvent} from '../../actionCreators/eventMasterAction';
import { bindActionCreators } from 'redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';

import {  Table, Input, Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Label } from 'reactstrap';
import UI from '../../components/newUI/superAdminDashboard';
import  SearchFilter from '../../components/searchFilter/searchFilter';
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
                        isActive: false
                },
                editEventModal: false,
                menuVisible: false,
                search:''
        }
        componentDidMount() {
                this.props.ViewEvent();
                this.props.GetEventOrganiser()
        }


        refreshData() {
                this.props.ViewEvent();
                this.props.GetEventOrganiser()

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

        updateEvent = (  ) => {
      
 let {eventId, eventType, eventName, eventOrganiser, startDate, endDate, userId}=this.state.editEventData;
                     this.props.updateEvent( eventId, eventType, eventName, eventOrganiser, startDate, endDate, userId ).then(()=>{this.refreshData()})
                       
            
                                
                     
                this.setState({
                        editEventModal: false, editEventData: { eventId: '', eventType: '', eventName: '', eventOrganiser: '', startDate: '', endDate: '', userId: '', userName: '' }
                })
        }

        OnKeyPresshandler(event) {
                const pattern = /[a-zA-Z]/;
                let inputChar = String.fromCharCode(event.charCode);
                if (!pattern.test(inputChar)) {
                    event.preventDefault();
                }
            }
        deleteEvent(eventId) {
                let { isActive } = this.state.editEventData;
             

                this.props.deleteEvent(eventId,isActive).then(()=>{this.refreshData()})
                this.setState({ editEventData: { isActive: false } })
             
             
             
        }


        searchFilter(search){
                return function(x){
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
        searchOnChange =(e)=>{
                //  this.setState({})
                this.setState({search:e.target.value})
                }
              
        displayEvent({ getEvent }) {
                console.log(getEvent);
                if (getEvent) {
                        return (
                                getEvent.event.filter(this.searchFilter(this.state.search)).map((item) => {
                                        return (
                                                <tr key={item.eventId}>
                                                        <td>{item.eventType}</td>
                                                        <td>{item.eventName}</td>
                                                        <td>{item.organiser.userName}</td>
                                                        <td>{item.startDate}</td>
                                                        <td> {item.endDate}</td>



                                                        <td>

                                                                <button className="btn btn-primary" onClick={this.editEvent.bind(this, item.eventId, item.eventType, item.eventName, item.eventOrganiser, item.startDate, item.endDate, item.organiser.userId, item.organiser.userName)}> Edit</button>

                                                                <button className="btn btn-danger" onClick={this.deleteEvent.bind(this, item.eventId)}>Delete</button>
                                                        </td>
                                                </tr>
                                        )
                                })
                        )
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
                                
                                <UI onClick={this.logout}>
                                        <div>
                                                <h3>Display Event Details</h3>

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

                                                                                onKeyPress={this.OnKeyPresshandler}
                                                                                required
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
                                                                                required />
                                                                </FormGroup>
                                                                <FormGroup>
                                                                        <Label >Event Organiser</Label>
                                                                        <select value={this.state.editEventData.eventOrganiser} onChange={(e) => {
                                                                                let { editEventData } = this.state;
                                                                                editEventData.eventOrganiser = e.target.value;
                                                                                console.log('vghvghyghfgh', this.state.editEventData.eventOrganiser);

                                                                                this.setState({ editEventData })

                                                                        }} required >
                                                                                <option value={this.state.editEventData.userName}>{this.state.editEventData.userName}</option>

                                                                                <option disabled> Select an Event Organiser</option>

                                                                                {this.getEvent(this.props.EventDetails)}
                                                                        </select>
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


                                                        </ModalBody>
                                                        <ModalFooter>
                                                                <Button color="primary" onClick={this.updateEvent}>Update Details</Button>
                                                                <Button color="secondary" onClick={this.toggleEditEventModal.bind(this)}>Cancel</Button>
                                                        </ModalFooter>
                                                </Modal>
                                                <SearchFilter type="text" value={this.state.search} onChange={this.searchOnChange} />
                                                <Table>
                                                        <thead>
                                                                <tr>
                                                                        <th>Event Type</th>
                                                                        <th>Event Name</th>
                                                                        <th>Event Organiser</th>
                                                                        <th>Event Start Date</th>
                                                                        <th>Event End Date</th>

                                                                </tr>
                                                        </thead>
                                                        <tbody>

                                                                {this.displayEvent(this.props.EventDetails)}

                                                        </tbody>
                                                </Table>
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
        return bindActionCreators({ ViewEvent, GetEventOrganiser ,deleteEvent,updateEvent}, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayEventMaster)



