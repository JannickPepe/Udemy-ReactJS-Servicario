import React from 'react';
import { connect } from 'react-redux';
import withAuthorization from '../../components/hoc/withAuthorization';
import { withRouter } from 'react-router-dom';
import { Timestamp } from '../../db';
import moment from 'moment';
import { subToCollaboration, joinCollaboration, leaveCollaboration, subToProfile, sendChatMessage, subToMessages,
startCollaboration } from '../../actions';
import JoinedPeople from '../../components/collaboration/JoinedPeople';
import ChatMessages from '../../components/collaboration/ChatMessages';
import Timer from '../../components/collaboration/Timer';
import Spinner from '../../components/Spinner';


class CollaborationDetail extends React.Component {
  
  //State for inputvalue is set to be empty by default
  state = {
    inputValue: '',
    reload: false
  }

  //getting id from URL
  componentDidMount() {
    const { id } = this.props.match.params
    const { user } = this.props.auth

    //when our collaboration is updated we will get joinedPeople
    joinCollaboration(id, user.uid)
    this.watchCollabChanges(id)
    this.watchMessagesChanges(id)
  }

  //change collab sub stats by using function joinedPeople on id and pass the subs joinedPeople into its array and map jp into jp.id
  watchCollabChanges = id => {
    this.unsubscribeFromCollab = this.props.subToCollaboration(id, 
      ({joinedPeople}) => {
        this.watchJoinedPeopleChanges(joinedPeople.map(jp => jp.id))
      })
  }

  //create the function
  watchJoinedPeopleChanges = ids => {
    this.peopleWatchers = {}
    //iteration 
    ids.forEach(id => {
      //now we got unsub stored function to subToProfile
      this.peopleWatchers[id] = this.props.subToProfile(id)
    })
  }

//create the function with collabId data and this the function subTomassages with data collabId and pass it to unsub
watchMessagesChanges = collabId => {
    this.unsubscribeFromMessages = this.props.subToMessages(collabId)
  }

  //create the function - take the event into into an if state and compared value and send the written value with 
  onKeyboardPress = (e) => {
    if (e.key === 'Enter') { this.onSendMessage(this.state.inputValue) }
  }

  //trim is used so the value can work with numbers 
  onSendMessage = inputValue => {
    if (inputValue.trim() === '') { return }

    //make a timestamp for when the message was send with moment with valueof and get the string for the user and collab
    const timestamp = moment().valueOf().toString()
    const { user } = this.props.auth
    const { collaboration } = this.props

    //what the message will contain as user info and the timestamp with the data from inputvalue when a message is send
    const message = {
      user: {
        uid: user.uid,
        avatar: user.avatar,
        name: user.fullName
      },
      timestamp: parseInt(timestamp, 10),
      content: inputValue.trim()
    }

    //the sendChatMessage function contains the objects below and take it into props by .then we make the screen state to have empty string (text) if collab is expired
    sendChatMessage({message, collabId: collaboration.id, timestamp})
    this.props.sendChatMessage({message, collabId: collaboration.id, timestamp})
      .then(_ => this.setState({inputValue: ''}))
      .catch(error => {
        // this.setState({inputValue: ''})
        alert(error)
      })
  }



  //function will receive collaboration - alert (toast notification) and new collab session with text and title
  onStartCollaboration = collaboration => {
    //set id and time into collaboration with react countdown (nowseconds)
   const {id, time} = collaboration  
   const nowSeconds = Timestamp.now().seconds

   //make expiresAt (can be seeing as a row) and have 0 to avoid nano seconds
   const expiresAt = new Timestamp(nowSeconds + time, 0)
   startCollaboration(id, expiresAt) 
  }



  componentWillUnmount() {
    const { id } = this.props.match.params
    const { user } = this.props.auth
    //make the method data for id and user and have the users data who left removed from collab
    this.unsubscribeFromCollab()
    this.unsubscribeFromMessages()
    //iterate over this object by keys on the generated id and for each uid will go on peopleWatchers array into uid
    Object.keys(this.peopleWatchers)
    .forEach(uid => this.peopleWatchers[uid]())

    leaveCollaboration(id, user.uid)
  }

  getCollaborationStatus = collaboration => {
    if (Object.keys(collaboration).length === 0) { return 'loading' }

    //if there is no start countdown time, collab not started
    if (!collaboration.expiresAt) { return 'notStarted' }
    //if the current time is still smaller than the expire time, its still active, else finished
    if (Timestamp.now().seconds < collaboration.expiresAt.seconds) {
     return 'active' 
    } else {
      return 'finished'
    }
  }


  render() {
    const { collaboration, joinedPeople, messages } = this.props
    const { inputValue } = this.state
    const { user } = this.props.auth

    const status = this.getCollaborationStatus(collaboration)

    if (status === 'loading') { return <Spinner /> }

    return (
       <div className="content-wrapper">
        <div className="root">
          <div className="body">
            <div className="viewListUser">
            <JoinedPeople users={joinedPeople} />
            </div>
            <div className="viewBoard">
              <div className="viewChatBoard">
                <div className="headerChatBoard">
                <div className="headerChatUser">
                    <img className="viewAvatarItem" src="https://i.imgur.com/cVDadwb.png" alt="icon avatar" />
                    <span className="textHeaderChatBoard">{user.fullName}</span>
                  </div>
                  {/*We have 3 different kind of status with each functionality to show*/}
                  { status === 'notStarted' &&
                    <div className="headerChatButton">
                      <button 
                        onClick={() => this.onStartCollaboration(collaboration)}
                        className="button is-success">Start Collaboration</button>
                    </div>
                  }
                  {  status === 'active' &&
                    <Timer 
                    //how to setup the correct time of expession 
                      seconds={collaboration.expiresAt.seconds - Timestamp.now().seconds}
                      timeOutCallback={() => this.setState({reload: true})}/>
                  }
                  { status === 'finished' &&
                    <span className="tag is-warning is-large"> 
                      Collaboration has been finished
                    </span>
                  }
                </div>
                <div className="viewListContentChat">
                <ChatMessages 
                    authUser={user}
                    messages={messages} />
                   
                  <div style={{float: "left", clear: "both"}}></div>
                </div>
                <div className="viewBottom">
                  <input 
                    //make a callback function with e - event, inputValue will made
                     onChange={(e) => this.setState({inputValue: e.target.value})}
                     //make so u can send the input by keyboard 'enter' and view the default input text by start
                    onKeyPress={this.onKeyboardPress}
                    //You cannot write if you meet these conditions
                    //disabled={status === 'finished' || status === 'notStarted'}
                    value={inputValue}
                    className="viewInput" 
                    placeholder="Type your message..." />
                     <button 
                     //make the inputvalue data to be send then you click the botton <<Send>>
                    onClick={() => this.onSendMessage(inputValue)}
                    //disabled={status === 'finished' || status === 'notStarted'}
                    className="button is-primary is-large">Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = () => ({
  subToCollaboration,
  subToProfile,
  subToMessages,   
  sendChatMessage
})

const mapStateToProps = ({collaboration})  => {
  return {
    collaboration: collaboration.joined,
    joinedPeople: collaboration.joinedPeople,
    messages: collaboration.messages
  }
}

const Collaboration = withAuthorization(withRouter(CollaborationDetail))
export default connect(mapStateToProps, mapDispatchToProps())(Collaboration)

