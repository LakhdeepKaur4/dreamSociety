import React, { Component } from 'react';
import AddTower from '../../actionCreators/towerMasterAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormGroup, Form, Label, Input, Button } from 'reactstrap';

import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner'



class TowerMaster extends Component {

    constructor(props) {
        super(props);


        this.state = {

            towerName: "",
            menuVisible: false,
            loading:true,
            errors: {}

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

  
    onChange(event) {
        if (!!this.state.errors[event.target.name]) {
            let errors = Object.assign({}, this.state.errors);
            delete errors[event.target.name];
            this.setState({ [event.target.name]: event.target.value, errors });
        }
        else {
            this.setState({ [event.target.name]: event.target.value});
        }
    }
    OnKeyPresshandler(event) {
        const pattern = /[a-zA-Z _]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }
    onSubmit(event) {
        // this.setState({loading:true})
        event.preventDefault();
        let errors = {};
        const { towerName} = this.state
        
        if(!this.state.towerName){
            errors.towerName = "Tower Name can't be empty. Please select."
        }
        

        this.setState({ errors });
        const isValid = Object.keys(errors).length === 0

        // const isValid = this.validate();
        if (isValid) {
            this.setState({loading: true})
          
                this.props.AddTower(towerName).then(()=> this.props.history.push('/superDashboard/display-tower')
            
                )
            
       
    }
           
    }
    logout=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/') 
    }
  tower=()=>{
  this.props.history.push('/superDashboard/display-tower')
  }
  close=()=>{
    return this.props.history.replace('/superDashBoard')
}

    render() {
      let form;
      if(!this.state.loading){
      form= <div>
        <Form onSubmit={this.onSubmit}>
        <div style={{cursor:'pointer'}} className="close" aria-label="Close" onClick={this.close}>
        <span aria-hidden="true">&times;</span>
   </div>

        <h3 align="center">  Add Tower</h3>
            <FormGroup>
                <Label>Tower Name</Label>
                <Input type="text" className="form-control" placeholder="Tower Name" name="towerName"  maxLength ={20} onKeyPress={this.OnKeyPresshandler} onChange={this.onChange}  />
                <span className="error">{this.state.errors.towerName}</span>
            </FormGroup>
            <FormGroup>
                <Button color="success" className="mr-2">Submit</Button>

                <button  onClick ={this.tower}   className="btn  btn-danger">Cancel</button>
       
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