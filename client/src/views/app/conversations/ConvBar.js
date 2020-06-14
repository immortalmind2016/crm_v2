import React from 'react';
import PropTypes from 'prop-types';
import MessageCard from "../../../components/applications/MessageCard"
const ConvBar = props => {
    
    return (
        <div className='conv-bar'>
           <div className="conv-bar__header text-center">
           <p>Conversations</p>
           </div>
          <div className="conv-bar__msg">
              {props.conversations.map(conv=>(
                  <div key={conv.convid} className="cov-bar__msg__container" onClick={()=>props.openConv(conv.convid,{name:conv.name,thumb:conv.image})}>

          <MessageCard  sender={{name:conv.name,thumb:conv.image}}  item={{id:"2",time:"12AM"}} currentUserid={"22"} >
             </MessageCard>
             </div>
              ))}


          </div>
        </div>
    );
};

ConvBar.propTypes = {
    
};

export default ConvBar;