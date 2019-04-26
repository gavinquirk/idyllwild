import React, { Component } from 'react';
import { compose } from 'recompose';

import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification
} from '../../components/Session';

import { withFirebase } from '../../components/Firebase';

import './DashboardPage.css';

class DashboardPage extends Component {
  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            <h1>Account: {authUser.email}</h1>
            {/* <PasswordForgetForm />
            <PasswordChangeForm /> */}
            <Messages />
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

class MessagesBase extends Component {
  state = {
    loading: false,
    messages: [],
    text: ''
  };

  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.messages().on('value', snapshot => {
      const messageObject = snapshot.val();

      if (messageObject) {
        // Convert messageObject into array
        const messageList = Object.keys(messageObject).map(key => ({
          ...messageObject[key],
          uid: key
        }));

        this.setState({
          messages: messageList,
          loading: false
        });
      } else {
        this.setState({ messages: null, loading: false });
      }
    });
  }
  componentWillUnmount() {
    this.props.firebase.messages().off();
  }

  onChangeText = event => {
    this.setState({ text: event.target.value });
  };

  onCreateMessage = (event, authUser) => {
    this.props.firebase.messages().push({
      text: this.state.text,
      userId: authUser.uid,
      createdAt: this.props.firebase.serverValue.TIMESTAMP
    });
    this.setState({ text: '' });
    event.preventDefault();
  };

  onRemoveMessage = uid => {
    this.props.firebase.message(uid).remove();
  };

  onEditMessage = (message, text) => {
    const { uid, ...messageSnapshot } = message;
    this.props.firebase.message(message.uid).set({
      ...messageSnapshot,
      text,
      editedAt: this.props.firebase.serverValue.TIMESTAMP
    });
  };

  render() {
    const { text, messages, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {loading && <div>Loading ...</div>}
            {messages ? (
              <MessageList
                authUser={authUser}
                messages={messages}
                onRemoveMessage={this.onRemoveMessage}
                onEditMessage={this.onEditMessage}
              />
            ) : (
              <div>There are no messages ...</div>
            )}
            <form onSubmit={event => this.onCreateMessage(event, authUser)}>
              <input type='text' value={text} onChange={this.onChangeText} />
              <button type='submit'>Send</button>
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const MessageList = ({
  authUser,
  messages,
  onRemoveMessage,
  onEditMessage
}) => (
  <ul>
    {messages.map(message => (
      <MessageItem
        authUser={authUser}
        key={message.uid}
        message={message}
        onRemoveMessage={onRemoveMessage}
        onEditMessage={onEditMessage}
      />
    ))}
  </ul>
);

class MessageItem extends Component {
  state = {
    editMode: false,
    editText: this.props.message.text
  };

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.props.message.text
    }));
  };

  onChangeEditText = event => {
    this.setState({ editText: event.target.value });
  };

  onSaveEditText = () => {
    this.props.onEditMessage(this.props.message, this.state.editText);
    this.setState({ editMode: false });
  };

  render() {
    const { authUser, message, onRemoveMessage } = this.props;
    const { editMode, editText } = this.state;

    return (
      <li>
        {editMode ? (
          <input
            type='text'
            value={editText}
            onChange={this.onChangeEditText}
          />
        ) : (
          <span>
            <strong>{message.userId}</strong> {message.text}
            {message.editedAt && <span>(Edited)</span>}
          </span>
        )}
        <strong>{message.userId}</strong> {message.text}
        {authUser.uid === message.userId && (
          <span>
            {editMode ? (
              <span>
                <button onClick={this.onSaveEditText}>Save</button>
                <button onClick={this.onToggleEditMode}>Reset</button>
              </span>
            ) : (
              <button onClick={this.onToggleEditMode}>Edit</button>
            )}
            {!editMode && (
              <button
                type='button'
                onClick={() => onRemoveMessage(message.uid)}
              >
                Delete
              </button>
            )}
          </span>
        )}
      </li>
    );
  }
}

const Messages = withFirebase(MessagesBase);

// Condition for granting access -- if authUser is not null
const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(DashboardPage);
