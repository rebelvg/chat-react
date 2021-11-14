import React, { Component } from 'react';

import { ChatContainer } from './ChatContainer';

export class AppContainer extends Component<any, any> {
  private _tempName: string = '';

  constructor(props) {
    super(props);

    this.state = {
      lastError: '',
      name: '',
    };
  }

  handleChange = (event) => {
    this._tempName = event.target.value;
  };

  handleBadName = () => {
    this.setState({
      lastError: 'name already exists',
      name: '',
    });
  };

  render() {
    const { lastError, name } = this.state;

    if (!name) {
      return (
        <div>
          <div>{lastError}</div>
          <label>
            Enter name:
            <input
              autoComplete={'off'}
              onChange={this.handleChange}
              onKeyDown={(event) => {
                if (['Enter', 'NumpadEnter'].includes(event.code)) {
                  this.setState({
                    name: this._tempName,
                  });
                }
              }}
              type="text"
              name="name"
            />
          </label>
        </div>
      );
    }

    return <ChatContainer name={name} handleBadName={this.handleBadName} />;
  }
}
