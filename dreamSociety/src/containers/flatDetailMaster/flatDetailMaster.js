import React,{ Component } from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {getTowerName,getFlatType,addFlatDetails} from '../../actionCreators/flatDetailMasterAction';

class flatDetailMaster extends Component{
    constructor(props){
        super(props);
        this.state={
            flatDetailId:'',
            flatNo:'',
            flatId:'',
            flatType:'',
            floor:'',
            towerId:'',
            towerName:''
        }
    }

    handleChange=(event)=>  {
                   
        this.setState({[event.target.name]:event.target.value});
        console.log(event.target.value)
        
        
    }

    componentDidMount(){
        this.props.getTowerName();
        this.props.getFlatType();
    }
    
    refreshData(){
        this.props.addFlatDetails();
    }


    OnKeyPresshandlerPhone(event) {
        const pattern = /^[0-9]$/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }

    OnKeyPressUserhandler(event) {
        const pattern = /[a-zA-Z_ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        if (!pattern.test(inputChar)) {
            event.preventDefault();
        }
    }


    onSubmit=(event)=> {
        console.log("jkj",this.state)
        event.preventDefault();
   
        this.props.addFlatDetails(this.state)
        
        this.setState(
        {
            state: {
                flatDetailId:'',
                flatNo:'',
                flatId:'',
                flatType:'',
                floor:'',
                towerId:'',
                towerName:''
             
                }
                 
        })  
                this.props.history.push('./flatDetails')
    }
           
    
    getDropdown=({name})=>{
        if(name){
            return name.map((item)=>{
                    return(
                        <option key={item.towerId} value={item.towerId} >
                        {item.towerName}</option>
                    )
                    
                })

                
            
        }
    }

    getDropdown1=({flattype})=>{
        console.log(flattype,"abc")
        if(flattype){
            return flattype.map((items)=>{
                return(
                    <option key={items.flatId} value={items.flatId}>
                    {items.flatType}
                    </option>
                )
            })
        }
    }
    
    push=()=>{
        this.props.history.push('/superDashboard/flatDetails')
    }

    render (){
        return(
            <div className="form">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group col-md-6">
                        <label>Flat No</label>
                        <input className ="form-control" type="text" name="flatNo" maxLength={3} onKeyPress={this.OnKeyPresshandlerPhone} onChange={this.handleChange} value={this.state.flatNo} required></input>
                    </div>
                    <div className="form-group  col-md-6">
                        <label>Flat Type</label>
                        <select required className ="form-control" value={this.state.flatId} name="flatType" onChange={(e)=> this.setState({flatId:e.target.value})} >
                        <option value="">--SELECT--</option>
                            {this.getDropdown1(this.props.flatDetailMasterReducer)}
                        </select>
                    </div>
                    <div className="form-group  col-md-6">    
                        <label>Floor</label>
                        <input className ="form-control" type="text" name="floor" maxLength={10} onKeyPress={this.OnKeyPressUserhandler} onChange={this.handleChange}  value={this.state.floor} required></input>
                    </div>
                    <div className="form-group  col-md-6">    
                        <label>Tower Name</label>
                        <select  required  className ="form-control" value={this.state.towerId} name="towerName" onChange={(e)=> this.setState({towerId:e.target.value})}>
                        <option  value="">--SELECT--</option>
                            {this.getDropdown(this.props.flatDetailMasterReducer)}
                        </select>
                    </div>
                    <button type="submit" className ="btn btn-primary" value="submit">Submit</button>
                    <button className="button" onClick={this.push}>Show Details</button>
                </form> 
            </div>
        )
    }

}

function mapStateToProps(state){
    return{
    flatDetailMasterReducer : state.flatDetailMasterReducer
            }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({getTowerName,getFlatType,addFlatDetails},dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(flatDetailMaster);