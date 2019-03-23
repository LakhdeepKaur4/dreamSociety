import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postFloor } from '../../actionCreators/floorAction';
import { Form, FormGroup, Button, Input, Label } from 'reactstrap';
import UI from '../../components/newUI/superAdminDashboard';
import Spinner from '../../components/spinner/spinner';
class AddFloor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            floorName: '',
            errorMessage:'',
            loading: false
        }
    }

    route = () => {
        this.props.history.push('/superDashboard/getFloor');
    }

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user-type');
        return this.props.history.replace('/')
    }

    close = () => {
        return this.props.history.replace('/superDashBoard');
    }

    floorChangeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value,errorMessage:'' })
        console.log(this.state);
    }

    addFloor = (event) => {
        this.setState({loading:true});
        event.preventDefault();
        console.log(this.state)
        let { floorName } = this.state
         this.props.postFloor({ floorName })
        .then(() => {
            this.props.history.push('/superDashboard/getFloor')
        })
        .catch(error=>{
            console.log(error.response.data);
            this.setState({errorMessage:error.response.data.message,loading:false});
        })
    }

    render() {

        let formData = <div>
            <FormGroup>
                <Label>Add Floor</Label>
                <Input type="text" name="floorName" onChange={this.floorChangeHandler} placeholder="Add Floor" />
                {this.state.errorMessage ? <span className='error'>{this.state.errorMessage}</span>:''}
            </FormGroup>
            <FormGroup>
                <Button color="success" className="mr-2">Add</Button>
                <Button color="danger" onClick={this.route}>Cancel</Button>
            </FormGroup></div>
        return (
            <UI onClick={this.logout}>
                <Form onSubmit={this.addFloor}>
                    <div style={{ cursor: 'pointer' }} className="close" aria-label="Close" onClick={this.close}>
                        <span aria-hidden="true">&times;</span>
                    </div>
                    <div><h3 style={{textAlign:'center', marginBottom: '10px'}}>Add Floor</h3></div>
                    {!this.state.loading?formData:<Spinner/>}
                    
                </Form>
            </UI>
        )
    }
}

export default connect(null, { postFloor })(AddFloor);