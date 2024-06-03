import { useState } from 'react';

import UseValidate from '../../../utils/validateInputs';

import { Props } from './Input.types';
import classes from './Input.module.sass';

export default function InputField(props: Props) {
  const [value, setValue] = useState(props.value || '');
  const [error, setError] = useState({ status: true, message: '' });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const eventType = event.target.type;
    let eventValue = event.target.value;

    if (eventType === 'email') {
      const data = UseValidate(eventType, eventValue);
      setError(data);
    }

    setValue(eventValue);
  };

  const isSucces = () => {
    if (props.type !== 'email') return '';
    if (!error.status) return classes.error;
    if (error.message) return classes.succes;
    return '';
  };

  return (
    <div className={`${classes.inputBox} ${isSucces()}`}>
      <input
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        value={value}
        onChange={handleChange}
        className={classes.input}
        required={props.required}
        autoComplete="off"
      />
      <label className={classes.label}>{error.message ? error.message : props.label}</label>
    </div>
  );
}
