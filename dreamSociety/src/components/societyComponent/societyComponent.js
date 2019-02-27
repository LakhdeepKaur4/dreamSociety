import React, { Component } from 'react';

import { FormGroup,  Input, Label } from 'reactstrap';

import DefaultSelect from '../../constants/defaultSelect';




const SocietyComponent = (props) =>{
        let form;
            form= <div>
            
        <FormGroup>
            <Label>Country Name</Label>
            <Input type="select" defaultValue='no-value' name="countryId"  onChange={props.onChangeCountry} required>
                <DefaultSelect/>
                {props.countryReducer}
            </Input>
        </FormGroup>

        <FormGroup>
            <Label>State Name</Label>
            <Input type="select" defaultValue='no-value' name="stateId"   onChange={props.onChangeState} required>
           <DefaultSelect/>
                {props.stateReducer}
            </Input>
        </FormGroup>

        <FormGroup>
            <Label>City Name</Label>
            <Input type="select" defaultValue='no-value' name="cityId"  onChange={props.onChangeCity} required>
           <DefaultSelect/>
                {props.cityReducer}  
            </Input>
        </FormGroup>

        <FormGroup>
            <Label>Location Name</Label>
            <Input type="select" defaultValue='no-value' name="locationId"  onChange={props.onChangeLocation} required>
           <DefaultSelect/>
                {props.locationReducer}  
            </Input>
        </FormGroup>

          </div>
        return (
           <div>
                 {form }
                 {props.children}
            </div> 
        );
    }




export default SocietyComponent;