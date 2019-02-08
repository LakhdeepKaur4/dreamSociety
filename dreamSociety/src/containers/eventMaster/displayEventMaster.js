import React, { Component } from 'react';
import { ViewEvent, GetEventOrganiser } from '../../actionCreators/eventMasterAction';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { authHeader } from '../../helper/authHeader'
import { Table, Input, Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Label } from 'reactstrap';
import { URN } from '../../actions';
import MenuBar from '../../components/superAdminDashboardUI/menuBar/menuBar';
import SideBar from '../../components/superAdminDashboardUI/sideBar/sideBar';
import SearchFilter from '../../components/searchFilter/searchFilter';
import UI from '../../components/newUI/superAdminDashboard';
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
                search: ''
        }
        componentDidMount() {
                this.props.ViewEvent();
                // console.log("viewEvent",this.props.ViewEvent)
                this.props.GetEventOrganiser()
                // console.log("eventDetails",this.props.GetEventOrganiser())
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

        updateEvent = () => {
                let { eventId, eventType, eventName, eventOrganiser, startDate, endDate, userId } = this.state.editEventData;
                console.log('dfdsf', eventId, eventType, eventName, eventOrganiser, startDate, endDate, userId);

                axios.put(`${URN}/event/` + eventId, { userId, eventType, eventName, eventOrganiser, startDate, endDate },
                        { headers: authHeader() }).then((response) => {

                                this.refreshData();
                        })
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
                axios.put(`${URN}/event/delete/` + eventId, { isActive }, { headers: authHeader() }).then((response) => {
                        this.refreshData()
                        this.setState({ editEventData: { isActive: false } })

                })
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
                                        // console.log('abc,events',item.userName);
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






        render() {

                return (
                        <div>
                                {/* <MenuBar onClick={() => this.setState({ menuVisible: !this.state.menuVisible })}/>
                <div style={{ margin: '48px auto' }}>
                    <SideBar onClick={() => this.setState({ menuVisible: false })}
                     visible={this.state.menuVisible}> */}
                                <UI>
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
                                {/* </SideBar>
                             </div>                                         */}
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
        return bindActionCreators({ ViewEvent, GetEventOrganiser }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayEventMaster)


