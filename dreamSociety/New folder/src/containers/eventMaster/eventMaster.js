import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AddEvent, GetEventOrganiser } from '../../actionCreators/eventMasterAction';
import { bindActionCreators } from 'redux';
import { Input } from 'reactstrap';
import UI from '../../components/newUI/superAdminDashboard';

import Spinner from '../../components/spinner/spinner';
import './event.css';



class EventMaster extends Component {
  constructor(props) {
    super(props)

  }

  state = {
    eventType: '',
    eventName: '',
    eventOrganiser: [],
    startDate: Date,
    endDate: Date,
    menuVisible: false,
    loading:true

  }

  OnKeyPresshandler(event) {
    const pattern = /[a-zA-Z _]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
}
  componentDidMount() {
    this.props.GetEventOrganiser().then(()=> this.setState({loading:false}))
    
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
this.setState({loading:true})
    console.log(this.state.eventOrganiser);
    this.props.AddEvent({ ...this.state }).then(()=>
    this.props.history.push('/superDashboard/display-event'))
    this.setState({
      state: {
        eventType: [],
        eventName: [],
        eventOrganiser: [],
        startDate: [],
        endDate: [],

      }
    })
   
  }

  getEvent({ events }) {
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
  logout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('user-type');
    return this.props.history.replace('/') 
}

  event=()=>{
    this.props.history.push('/superDashboard/display-event')
  }
  
  close=()=>{
    return this.props.history.replace('/superDashBoard')
}

  
  render() {

    let form1 ;
    if(!this.state.loading && this.props.EventDetails.events){
    form1=
    <div >
     
      <form onSubmit={this.submit}>
      <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
        <span aria-hidden="true">&times;</span>
   </div>
      <h3 align="center">Add Event</h3>
        <div className="form-group">
          <label >Event Type</label>
          <input
            type="text"
            className="form-control"
            placeholder="eventType"
            onKeyPress={this.OnKeyPresshandler}
            name="eventType"
            onChange={this.onChange}
             maxLength ={25}
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
            maxLength ={25}
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
            <option > --Select--</option>
            {this.getEvent(this.props.EventDetails)}
          </Input>
        </div>

        <button
          className="btn btn-success"
        > Submit</button>
    <button  onClick={this.event}  className="btn btn-danger">  Cancel</button>
      </form>
    </div>
    }
    else if(this.submit){
      form1 =<Spinner/>
  }
    return (
      <div>
    <UI onClick={this.logout}>
             {form1}   
        
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
  return bindActionCreators({ AddEvent, GetEventOrganiser}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EventMaster)





