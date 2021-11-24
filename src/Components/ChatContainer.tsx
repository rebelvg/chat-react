import React, { Component } from 'react';
import { io, Socket } from 'socket.io-client';

import { config } from '../config';

export class ChatContainer extends Component<any, any> {
  private io: Socket;

  constructor(props) {
    super(props);

    this.state = {
      message: '',
      messages: [],
    };

    this.io = io(config.API_HOST);
  }

  componentWillMount() {
    const { name } = this.props;

    this.io.on('connect', () => {
      this.io.emit('room_event', {
        name: name,
        room: 'main',
      });
    });

    this.io.on('bad_name', () => {
      this.props.handleBadName();
    });

    this.io.on('message_event', (data) => {
      const { messages } = this.state;

      messages.push(data);

      this.setState({
        messages,
      });
    });
  }

  componentWillUnmount() {
    this.io.close();
  }

  handleChange = (event) => {
    this.setState({
      message: event.target.value,
    });
  };

  sendMessage() {
    const { message } = this.state;

    this.io.emit('message_event', {
      text: message,
    });

    this.setState({
      message: '',
    });
  }

  render() {
    const { message, messages } = this.state;

    return (
      <div>
        <h2>Chat Page</h2>
        {messages.map((message, i) => {
          return (
            <div key={i}>
              {message.name}: {message.text}
            </div>
          );
        })}

        <br />

        <label>
          Enter message:
          <input
            autoComplete={'off'}
            onChange={this.handleChange}
            type="text"
            onKeyDown={(event) => {
              if (['Enter', 'NumpadEnter'].includes(event.code)) {
                this.sendMessage();
              }
            }}
            name="name"
            value={message}
          />
        </label>
      </div>
    );
  }
}
