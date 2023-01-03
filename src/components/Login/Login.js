import React, { useEffect, useState, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
  if(action.type === 'USER_INPUT')
  {
    return {value: action.val, isValid: action.val.includes('@')}
  }
  if(action.type === 'INPUT_BLUR')
  {
    return {value: state.value, isValid: state.value.includes('@')}
  }
  return {value: '', isValid: 'false'};
};

const collegeReducer = (state, action) => {
  if(action.type === 'USER_COLLEGE')
  {
    return {value: action.val, isValid: action.val.trim().length > 3 }
  }
  if(action.type === 'INPUT_COLLEGE')
  {
    return {value: state.value, isValid: state.value.trim().length > 3}
  }
  return {value: '', isValid: 'false'};
}

const passwordReducer =  (state,action) => {
  if(action.type=== 'USER_PASSWORD')
  {
    return {value: action.val, isValid: action.val.trim().length > 6}
  }
  if(action.type === 'PASSWORD_INPUT')
  {
    return {value: state.value, isValid: state.value.trim().length > 6}
  }
  return {value:'', isValid: 'false'}
}
const Login = (props) => {

   const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: 'false'});
   const [collegeState, dispatchCollege] = useReducer(collegeReducer, {value: '', isValid: 'false'});
   const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: 'false'});

   
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredCollege, setEnteredCollege] = useState('');
  // const [collegeIsValid, setCollegeIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

  // useEffect(()=>{
  //   const identifier = setTimeout(()=>{
  //     console.log('Updating form!');
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6 && enteredCollege.trim().length > 3
  //     );
  //   },1000)

  //   return () => {
  //     console.log('CLEAN_UP');
  //     clearTimeout(identifier);
  //   }
    
  // },[enteredEmail, enteredCollege, enteredPassword])
  

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value})

    setFormIsValid(
      event.target.value.includes('@') && passwordState.isValid && collegeState.isValid
    );
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type:'USER_PASSWORD', val: event.target.value})

    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6 && collegeState.isValid
    );
  };
  const collegeChangeHandler = (event) => {
    // setEnteredCollege(event.target.value);
    dispatchCollege({type:'USER_COLLEGE', val: event.target.value})

    setFormIsValid(
      emailState.value.includes('@') && passwordState.isValid && event.target.value.trim().length > 3
    );
  }
  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({type: 'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({type:'PASSWORD_INPUT'})
  };

  const validateCollegeHandler = () => {
    // setCollegeIsValid(enteredCollege.trim().length > 3);
    dispatchCollege({type:'INPUT_COLLEGE'})
  }

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value, collegeState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div className={`${classes.control} ${
            collegeState.isValid === false ? classes.invalid : ''
          }`}>
        <label htmlFor="college">College</label>
          <input
            type="text"
            id="college"
            value={collegeState.value}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
