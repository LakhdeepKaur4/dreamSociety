import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AddEvent, GetEventOrganiser } from '../../actionCreators/eventMasterAction';
import { bindActionCreators } from 'redux';
import { Input } from 'reactstrap';
import UI from '../../components/newUI/superAdminDashboard';
import { Link } from 'react-router-dom';

import './event.css';


class EventMaster extends Component {
  constructor(props) {
    super(props)


    //  this.onChange = this.onChange.bind(this);
  }

  state = {
    eventType: '',
    eventName: '',
    eventOrganiser: [],
    startDate: Date,
    endDate: Date,
    menuVisible: false,
    // userId:''

  }

  OnKeyPresshandler(event) {
    const pattern = /[a-zA-Z]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
}
  componentDidMount() {
    this.props.GetEventOrganiser()
    console.log("hieee", this.props.GetEventOrganiser)
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value.trim('') });
    console.log(this.state)
  }

  onEventChange = (e) => {
    console.log(this.state);
    this.setState({ userId: e.target.value })
    console.log("userId", this.state.userId)
  }
  submit = (e) => {
    e.preventDefault();
    console.log(this.state.eventOrganiser);
    this.props.AddEvent({ ...this.state })
    this.setState({
      state: {
        eventType: [],
        eventName: [],
        eventOrganiser: [],
        startDate: [],
        endDate: [],

      }
    })
    this.props.history.push('/superDashboard/display-event')
  }

  getEvent({ events }) {
    // console.log("dsgggggggg",events);
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

  render() {
    return (
      <div>
    <UI>
                
        
                <div className="form">

                  <form onSubmit={this.submit}>
                    <div className="form-group">
                      <label >Event Type</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="eventType"
                        onKeyPress={this.OnKeyPresshandler}
                        name="eventType"
                        onChange={this.onChange}
                         maxLength ={20}
                        required
                      />

                    </div>

                    <div className="form-group">
                      <label>Event Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="eventName"
                        onKeyPress={this.OnKeyPresshandler}
                        name="eventName"
                        onChange={this.onChange}
                        maxLength ={20}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Event Start Date</label>
                      <input
                        type="date"
                        className="form-control"
                        name="startDate"
                        placeholder=" event start date"
                        onChange={this.onChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label> Event End Date</label>
                      <input
                        type="date"
                        className=" form-control"
                        name="endDate"
                        placeholder="event end date"
                        onChange={this.onChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label >Event Organiser</label>
                      <Input
                        type="select"
                        className="form-control"
                        name="eventOrganiser"
                        value={this.state.userId}
                        onChange={this.onChange}
                        required
                      >
                        <option > Please Select</option>
                        {this.getEvent(this.props.EventDetails)}
                      </Input>
                    </div>

                    <button
                      className="btn btn-primary"
                    > Submit</button>
                      <Link color="primary" to="/superDashboard/display-event">event details</Link>
                  </form>
                </div>
       </UI>
             
              </div>
    )
  }


}




function mapStateToProps(state) {
  console.log(state);
  return {
    EventDetails: state.EventDetails
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ AddEvent, GetEventOrganiser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EventMaster)





