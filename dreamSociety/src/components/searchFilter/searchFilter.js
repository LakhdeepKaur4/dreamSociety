import React from 'react';
import { FormGroup, Input} from 'reactstrap';

const searchFilter = (props) => {
    return (
        <FormGroup>
            <Input type={props.type}
                value={props.value}
                onChange={props.onChange} />
        </FormGroup>
    );
}

export default searchFilter;