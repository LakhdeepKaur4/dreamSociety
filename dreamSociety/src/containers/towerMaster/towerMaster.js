import React, { Component } from 'react';
import AddTower from '../../actionCreators/towerMasterAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormGroup, Form, Label, Input, Button } from 'reactstrap';
import  {Link} from 'react-router-dom';
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner'



class TowerMaster extends Component {

    constructor(props) {
        super(props);


        this.state = {

            towerName: "",
            menuVisible: false,
            loading:true
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentWillMount(){
        this.refreshData()
    }

    refreshData(){
        this.setState({loading:false})
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    OnKeyPresshandler(event) {
        const pattern = /[a-zA-Z]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    onSubmit(event) {
        this.setState({loading:true})
        event.preventDefault();
        console.log(this.state)

        this.props.AddTower(this.state)
        .then(()=> this.props.history.push('/superDashboard/display-tower'));
        return this.setState({
            state: {

                towerName: ""
            }
        })
           
    }
    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }

    render() {
      let form;
      if(!this.state.loading){
      form= <div>
        <Form onSubmit={this.onSubmit}>
            <FormGroup>
                <Label>Tower Name</Label>
                <Input type="text" className="form-control" placeholder="tower Name" name="towerName" value={this.state.name} onKeyPress={this.OnKeyPresshandler} onChange={this.onChange} required />
            </FormGroup>
            <FormGroup>
                <Button color="success" className="mr-2">Submit</Button>
                <Link color="primary" to="/superDashboard/display-tower">Tower details</Link>
            </FormGroup>
        </Form>
        
    </div>
      }
      else if(this.onSubmit){
          form=<Spinner/>
      }
     
        return (
            <div>
                <UI onClick={this.logout}>
                   {form}
                </UI>
            </div>



        );

    }

}

function mapStateToProps(state) {
    console.log(state);
    return {
        Tower: state.TowerDetails
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ AddTower }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(TowerMaster)