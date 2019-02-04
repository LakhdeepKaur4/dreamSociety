import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AddEvent, GetEventOrganiser } from '../../actionCreators/eventMasterAction';
import { bindActionCreators } from 'redux';
import { Input } from 'reactstrap';
import { Segment, Menu, Icon, Sidebar } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/2.jpg';
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
              <Segment basic style={{ backgroundImage: `url(${Logo})`, padding: '55px 0px', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '600px' }}>
                {/* <Header as="h3">Application Content</Header> */}
                {/* <Image src='//unsplash.it/800/480' /> */}
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
                  </form>
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
  console.log(state);
  return {
    EventDetails: state.EventDetails
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ AddEvent, GetEventOrganiser }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EventMaster)





