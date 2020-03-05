import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Form } from './form/form';

export interface IFormControl {
  value: string;
  isValid: boolean;
  isDirty: boolean;
}

export interface IFormState {
  forms:{ 
    [key: string]: IFormControl,
  }
  isValid: boolean;
  isDirty: boolean;
}

class App extends React.Component {
  emptyForm: IFormState ={ 
    forms: {
      userName: {
        value: '',
        isValid: false,
        isDirty: false,
      },
      password: {
        value: '',
        isValid: false,
        isDirty: false,
      },
      confirmPassword: {
        value: '',
        isValid: false,
        isDirty: false,
      },
    },
      isValid: false,
      isDirty: false,
};
  render() {
    return (
      <div className="app">
        <div className="app-content">
          <Form form={this.emptyForm}> </Form>
        </div>
      </div>
    );
  }
}

export default App;
ReactDOM.render(<App />, document.getElementById("root"));
