import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { withFirebase } from '../Firebase';

import './AdminEventList.css';

class AdminEventList extends Component {
  state = {
    loading: false,
    events: []
  };

  componentDidMount() {
    console.log('Event List Mounted');
    this.setState({ loading: true });
    this.props.firebase.events().once('value', snapshot => {
      const eventsObject = snapshot.val();
      const eventsList = Object.keys(eventsObject).map(key => ({
        ...eventsObject[key],
        uid: key
      }));
      this.setState({
        events: eventsList,
        loading: false
      });
    });
  }

  render() {
    const { events, loading } = this.state;

    return (
      <div className='AdminEventList'>
        <h1 className='heading'>events</h1>
        {loading && <div>Loading ...</div>}
        <ul>
          {events.map(event => (
            <li key={event.uid}>
              <span>
                <strong>ID:</strong> {event.uid}
              </span>
              <span>
                <strong>Title:</strong> {event.title}
              </span>
              <span>
                <strong>Owner:</strong> {event.userId}
              </span>
              <span>
                <Link
                  className='event-details-btn'
                  to={{
                    pathname: `${ROUTES.ADMIN}/events/${event.uid}`,
                    state: { event } // Pass event data to details component
                  }}
                >
                  Details
                </Link>
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withFirebase(AdminEventList);
