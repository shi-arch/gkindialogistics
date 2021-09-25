import React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RadioButtonsGroup(props) {
    const [value, setValue] = React.useState('mobileNumber');

    const handleChange = (event) => {
        setValue(event.target.value);
        props.getType(value)
    };

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend"></FormLabel>
            <RadioGroup row aria-label="gender" value={value} name="row-radio-buttons-group" onChange={handleChange}>
                <FormControlLabel value="mobileNumber" control={<Radio />} label="Mobile Number" />
                <FormControlLabel value="trackingId" control={<Radio />} label="Tracking-Id" />
            </RadioGroup>
        </FormControl>
    );
}