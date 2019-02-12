import React from 'react';
import { FormGroup, Input, Button, Label } from 'reactstrap';

const userRegistrationForm = (props) => (
    <div>
        <FormGroup>
                <Label>User Type</Label>
                <Input type="select" name={props.roleInputName} onChange={props.roleChange}>
                    <option value=''>--Select--</option>
                    {props.fetchingRole}
                </Input>
                <span className='error'>{props.roleError}</span>
            </FormGroup>
            <FormGroup>
                <Label>First Name</Label>
                <Input name={props.firstNameInputName}
                    type="text"
                    value={props.firstNameValue}
                    onChange={props.firstNameChange}
                    onKeyPress={props.NameKeyPress}
                    maxLength='25'
                    minLength='3' />
                <span className='error'>{props.firstNameError}</span>
            </FormGroup>
            <FormGroup>
                <Label>Last Name</Label>
                <Input name={props.lastNameInputName}
                    type="text"
                    value={props.lastNameValue}
                    onChange={props.lastNameChange}
                    onKeyPress={props.NameKeyPress}
                    maxLength='25'
                    minLength='3'  />
                <span className='error'>{props.lastNameError}</span>
            </FormGroup>
            <FormGroup>
                <Label>User Name</Label>
                <Input name={props.userNameInputName}
                    type="text"
                    value={props.userNameValue}
                    onChange={props.userNameChange}
                    maxLength='25'
                    minLength='3'  />
                <span className='error'>{props.userNameError}</span>
            </FormGroup>
            <FormGroup>
                <Label>Email</Label>
                <Input name={props.emailInputName}
                    type="email"
                    value={props.emailValue}
                    onChange={props.emailChange}
                    maxLength='40'
                    minLength='10'
                    onKeyPress={props.emailKeyPress}  />
                <span className='error'>{props.emailError}</span>
            </FormGroup>
            <FormGroup>
                <Label>Contact No.</Label>
                <Input name={props.contactInputName}
                    type="text"
                    value={props.contactValue}
                    onChange={props.contactChange}
                    onKeyPress={props.contactKeyPress}
                    maxLength='10'
                    minLength='10' />
                <span className='error'>{props.contactError}</span>
            </FormGroup>
            <FormGroup>
                <Label>Password</Label>
                <Input name={props.passwordInputName}
                    type="password"
                    value={props.passwordValue}
                    onChange={props.passwordChange} />
                <span className='error'>{props.passwordError}</span>
            </FormGroup>
            <FormGroup>
                <Label>Confirm Password</Label>
                <Input name={props.passwordConfirmationInputName}
                    type="password"
                    value={props.passwordConfirmationValue}
                    onChange={props.passwordConfirmationChange} />
                <span className='error'>{props.passwordConfirmationError}</span>
            </FormGroup>

            <Button color="success" className="mr-2">Add User</Button>
            <Button onClick={props.routeToUserDetails} color="danger">Cancel</Button>
    </div>
);

export default userRegistrationForm;