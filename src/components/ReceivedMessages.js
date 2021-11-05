import React from 'react';
import { connect } from 'react-redux';
import { getMessages } from '../reducers';
import { markMessageAsRead } from '../actions';
import { useHistory } from 'react-router-dom';


//create function history
const ReceivedMessages = ({dispatch, messages}) => {

  const history = useHistory()
    
  const handleMessageAsRead = message => {
    markMessageAsRead(message)
  }

  //Create a function goToCollaboration  for recevie message and put mMA on message and make the history.push where we want to go => on message table row cta
  const goToCollaboration = message => {
    markMessageAsRead(message)
    history.push(message.cta)
  }



  const renderMessages = messages => {

    //Iterate over messages as m and see if read or not
    const filteredMessages = messages.filter(m => !m.isRead).map(message => (
        <div key={message.id}>
          <div className="from-user">
            <span>From: </span>{message.fromUser.name}
          </div>
          <hr />
          <div className="navbar-item navbar-item-message">
            <div>
              { message.text }
            </div>
            {/*when click go to gTC and pass message*/}
            <div onClick={() => goToCollaboration(message)}>
              <div className="button is-success">Join</div>
            </div>
            <button
              onClick={() => handleMessageAsRead(message)}
              className="button is-warning">Later</button>
          </div>
        </div>
       )
       )
   
       if (filteredMessages.length === 0) {
         return <div className="navbar-item">No Messages :(</div>
       }
   
       return filteredMessages
     }
    

    return renderMessages(messages) 
}

//going to make a selector in reducers index
const mapStateToProps = (state) => ({messages: getMessages(state)})

export default connect(mapStateToProps)(ReceivedMessages);