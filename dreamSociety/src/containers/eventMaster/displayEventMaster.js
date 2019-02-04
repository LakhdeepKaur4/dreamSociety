import React, { Component } from 'react';
import { ViewEvent, GetEventOrganiser } from '../../actionCreators/eventMasterAction';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { authHeader } from '../../helper/authHeader'
import { Input, Button, Modal, FormGroup, ModalBody, ModalHeader, ModalFooter, Label } from 'reactstrap';
import { URN } from '../../actions';
import { Segment, Menu, Icon, Sidebar } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

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
                menuVisible: false
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

        displayEvent({ getEvent }) {
                console.log(getEvent);
                if (getEvent) {
                        return (
                                getEvent.event.map((item) => {
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
                                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark" id="headernav" >
                                        <Menu.Item onClick={() => this.setState({ menuVisible: !this.state.menuVisible })} >
                                                <Icon name="sidebar" style={{ color: 'white', cursor: 'pointer' }} />

                                        </Menu.Item>
                                        <i style={{ fontSize: '24px', color: 'skyblue', cursor: 'pointer' }} className="fa">&#xf1ad;</i> <Link className="navbar-brand" to="#">DRE@M SOCIETY</Link>
                                        <div className="navbar-collapse collapse" id="navbarCollapse" style={{ marginLeft: '20%' }}>
                                                <ul className="navbar-nav mr-auto">
                                                        <li className="nav-item active">
                                                                <Link className="nav-link" to="/superDashboard">Home<span className="sr-only">(current)</span></Link>
                                                        </li>
                                                        <li className="nav-item">
                                                                <Link className="nav-link" to="#">Gallery</Link>
                                                        </li>
                                                        <li className="nav-item">
                                                                <Link className="nav-link" to="#">About Us</Link>
                                                        </li>
                                                        <li className="nav-item">
                                                                <Link className="nav-link" to="#">Contact Us</Link>
                                                        </li>
                                                </ul>
                                                <form className="form-inline mt-2 mt-md-0">
                                                        <button className="btn btn-outline-success my-2 my-sm-0" data-toggle="modal" data-target="#myModal" id="login" type="button"
                                                                onClick={this.editUser}>Logout</button>
                                                </form>
                                        </div>
                                </nav>
                                <div style={{ marginTop: '48px' }}>
                                        <Sidebar.Pushable as={Segment} attached="bottom">
                                                <Sidebar width='thin' as={Menu} animation="uncover" visible={this.state.menuVisible} icon="labeled" vertical inverted>
                                                        <Menu.Item><Icon name="user" /><Link to="/superDashboard/registration">Super Admin Register</Link></Menu.Item>
                                                        <Menu.Item><Icon name="user" />Admin Register</Menu.Item>
                                                        <Menu.Item><Icon name="user" />Society Member Owner Register</Menu.Item>
                                                        <Menu.Item><Icon name="user" />Society Member Tenant Register</Menu.Item>
                                                        <Menu.Item><Icon name="user" /><Link to="/vendorDashboard">Vendor</Link></Menu.Item>
                                                        <Menu.Item><Icon name="user" /><Link to="/superDashboard/add_parking/new">Parking Master</Link></Menu.Item>
                                                        <Menu.Item><Icon name="user" /><Link to="/superDashboard/towermaster">Tower Master</Link></Menu.Item>
                                                        <Menu.Item><Icon name="user" /><Link to="/superDashboard/event">Event Master</Link></Menu.Item>
                                                        <Menu.Item><Icon name="user" /><Link to="/superDashboard/flatmaster">Flat Master</Link></Menu.Item>
                                                        <Menu.Item><Icon name="user" /><Link to="/superDashboard/sizemaster">Size Master</Link></Menu.Item>
                                                </Sidebar>
                                                <Sidebar.Pusher dimmed={this.state.menuVisible}>
                                                        <Segment basic>
                                                                {/* <Header as="h3">Application Content</Header> */}
                                                                {/* <Image src='//unsplash.it/800/480' /> */}
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

                                                                                                        onKeyPress ={this.OnKeyPresshandler}
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

                                                                                                }}  required >
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
                                                                </div>
                                                        </Segment>
                                                </Sidebar.Pusher>
                                        </Sidebar.Pushable>
                                </div>

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



