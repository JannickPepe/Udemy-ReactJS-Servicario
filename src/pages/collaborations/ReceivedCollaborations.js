import React from 'react';
import { Link } from 'react-router-dom';
import withAuthorization from '../../components/hoc/withAuthorization';
import { fetchCollaborations } from '../../actions';
import moment from 'moment';
import { Timestamp } from '../../db';

class ReceivedCollaborations extends React.Component {

  state = {
    collaborations: []
  }

  //the function will take the values into the object expiresAt and show the current status of the collab with box colors - on the giving status
  getCollaborationStatus = expiresAt => {
    if (!expiresAt) { return {className: 'is-danger', status: 'Not Started'}}
    if (Timestamp.now().seconds < expiresAt.seconds) {
     return {className: 'is-warning', status: 'In Progress'} 
    } else {
      return {className: 'is-success', status: 'Finished'}
    }
  }

  //take user from auth object on this.props
  //and if we have collaborations we will make the new "page data collaborations" by this.setState so a new collab will be shown on screen
  componentDidMount() {
    const { auth: { user }} = this.props
    fetchCollaborations(user.uid)
      .then(collaborations => this.setState({collaborations}))
  }

  //make tunction and get collaborations and return by map over c which will contain the function values 
  //className and status and get those values on trhe function getvollaborationStatus by take date onto c.expiresAt
  renderCollaborations = (collaborations) => {
    return collaborations.map(c => {
      const {className, status} = this.getCollaborationStatus(c.expiresAt)
      return (
        <article 
          key={c.id} 
          className="post">
          <h4>{c.title}</h4>
          <div className="media">
            <div className="media-left">
              <p className="image is-32x32">
                <img src={c.image} alt={c.title}/>
              </p>
            </div>
            <div className="media-content">
              <div className="content">
                <p>
                  <span>{c.fromUser.name}</span> replied {moment(c.createdAt.toDate()).fromNow()} &nbsp;
                  <span 
                    className={`tag ${className}`}>{status}</span>
                </p>
              </div>
            </div>
            <div className="media-right">
              <span className="has-text-grey-light">
                <Link to={`/collaborations/${c.id}`}>
                  <button className="button">Enter</button>
                </Link>
              </span>
            </div>
          </div>
        </article>
      )
    })
  }

  //show the new state on screen by collaboration and return the renderCollaborations on collaborations - so the different statuses is shown
  render() {
    const { collaborations } = this.state
    return (
      <div className="content-wrapper">
        <div className="container">
          <h1 className="title">Collaborations</h1>
          <div className="box content">
            { this.renderCollaborations(collaborations) }
          </div>
        </div>
      </div>
    )
  }
}

export default withAuthorization(ReceivedCollaborations);

