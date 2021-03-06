import React from 'react';
import { IFormState, IFormControl } from '../index';
import { format } from 'url';

export interface IFormProps {
  form: IFormState;
}
export enum FORM_NAMES {
  userName = 'Username',
  password =  'Password',
  confirmPassword = 'Confirm Password',
} ;

export class Form extends React.Component<IFormProps, IFormState> {

  userNameRegExp = new RegExp("^[a-zA-Z0-9_]{6,15}$");
  passwordRegExp = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
  public state: IFormState = this.props.form;
  displayErrorInfo: boolean = false;
  displayPasswords: boolean = false;

  inputChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!!event && event.currentTarget.id in FORM_NAMES) {
      const formState = this.state.forms;
      const id = event.currentTarget.id;
      let inputValue = event.currentTarget.value;
      if(inputValue.length > 15 && id === 'userName'){
        inputValue = inputValue.slice(0,15);
      } else if(inputValue.length > 25) {
        inputValue = inputValue.slice(0,25);
      }
      formState[id].value = inputValue;
      formState[id].isDirty = true;
      formState[id].isFocused = true;
      
      this.setState({ forms: formState, isDirty: true, });
    }
  }
  
  validate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formState = this.state.forms;
    const text = event.currentTarget.value;
    const id = event.currentTarget.id;
    formState[id].isFocused = false;
    if(id === 'userName') {
      this.userNameRegExp.test(text) ? formState.userName.isValid = true : formState.userName.isValid = false;
    } else if(id === 'password') {
      this.passwordRegExp.test(text) ? formState.password.isValid = true : formState.password.isValid = false;
      this.displayErrorInfo = !formState.password.isValid;
    } else if (id === 'confirmPassword'){
      let confirmValid = formState.password.isValid && (text === formState.password.value);
      confirmValid = confirmValid && !(text === '' && formState.password.isDirty);
      confirmValid ? formState.confirmPassword.isValid = true : formState.confirmPassword.isValid = false;
      
    }
    const isFormvalid = formState.userName.isValid && formState.password.isValid && formState.confirmPassword.isValid ? true : false; 
    this.setState({ forms: formState, isValid: isFormvalid });
  }

  showPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const form = this.state.forms;
    form.password.hidden = !form.password.hidden;
    form.confirmPassword.hidden = !form.confirmPassword.hidden;
    this.setState({forms: form});
  }

  renderErrorText(invalid: boolean) {
    if (invalid) {
      return (
        <div className="invalid-text"> 
        <p>There is an error with your submission.<br/>
        Please check if your password has the following:</p>
          <ul>
          <li>Minimum eight characters</li> 
          <li>At least one uppercase letter and one lowercase letter</li>
          <li>One number and one special character</li>
          </ul>
        </div>
      );
    }
  }

  renderConfirmErrorText(invalid: boolean): React.ReactNode {
    if (invalid) {
      return (
        <span className="invalid-confirm">Your passwords do not match, please try again</span>
      )
    }
  }

  renderInput(control: IFormControl, name: string) {
    return (
      <input
        className={control.isDirty && !control.isValid && !control.isFocused ? "invalid-dirty" : ""}
        value={control.value}
        onChange={this.inputChanged}
        onBlur={this.validate}
        placeholder={FORM_NAMES[name as keyof typeof FORM_NAMES]}
        type={name !== "userName" && control.hidden ? "password" : "text"}
        id={name}
      />
    );
  }

  render() {
    const form = this.state.forms;
    //const isError = (form.password.isDirty && !form.password.isValid && !form.password.isFocused);
    return (
      <div className="form-container">
        <h1>Sign Up</h1>
        {this.renderErrorText(this.displayErrorInfo)}
        <form className="app-form">
          {this.renderInput(form.userName, "userName")}
          <span className="username-info"> 6-15 characters with at least one number and one letter</span>
          {this.renderInput(form.password, "password")}
          {this.renderInput(form.confirmPassword, 'confirmPassword')}
          {this.renderConfirmErrorText(form.password.value !== form.confirmPassword.value && form.confirmPassword.isDirty)}
          <div className="show-password">
            <input 
              type="checkbox" 
              onChange={this.showPassword} />
            <p>Show Password</p>
          </div>
          <button disabled={!form.isValid} type="submit" >Sign Up</button>
        </form>
      </div>
    );
  }
}