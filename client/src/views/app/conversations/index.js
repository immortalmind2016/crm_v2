import React, { Component } from 'react';
import ConvBar from './ConvBar';
import {API_BASE_URL} from "../../../constants/defaultValues"
import PerfectScrollbar from "react-perfect-scrollbar";

import axios from "axios"
import ChatHeading from '../../../components/applications/ChatHeading';
import MessageCard from '../../../components/applications/MessageCard';
class index extends Component {
    state={
        conversations:[],
        messages:[],
        messageUser:[],
        pageId:"2835902666538685"
    }
    componentDidMount(){
        console.log("API BASE ",API_BASE_URL)
        axios.get(`${API_BASE_URL}/conv/conversations`)
        .then((response)=>{
            const userOne=response.data.convs.conversations[0]
            console.log(response)
            if(response.data.convs.conversations.length!=0){
                this.openConv(userOne.convid,{name:userOne.name,thumb:userOne.image})
            }
            this.setState({conversations:response.data.convs.conversations})
        })
    }
    openConv=(id,userInfo)=>{
        console.log("IDDDDDDD ",id)
        axios.get(`${API_BASE_URL}/conv/messages/${id}`)
        .then((response)=>{
            console.log(response)
            this.setState({messages:response.data.messages,messageUser:userInfo})
        })
    }
    render() {
        return (
            <div className="conversations">
               <div className="row">
                   <div className="col-lg-10 col-sm-12">
                       <div className="messages-div chat-app">
                           <ChatHeading name={this.state.messageUser.name} thumb={this.state.messageUser.thumb} lastSeenDate="24"></ChatHeading>
                           <PerfectScrollbar
                ref={ref => {
                  this._scrollBarRef = ref;
                }}
                containerRef={ref => { }}
                options={{ suppressScrollX: true, wheelPropagation: false }}>
                    {this.state.messages.map((msg)=>(
                            msg.from.id!=this.state.pageId?<MessageCard  sender={{name:msg.message,thumb:"https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/p960x960/93245412_103718371316468_4553994935375757312_o.png?_nc_cat=107&_nc_sid=85a577&_nc_ohc=apfxHdnatqAAX-KvCym&_nc_ht=scontent-mxp1-1.xx&oh=fe4340f6a05032707b1c07d3f59b91cb&oe=5F094A40"}} item={{time:null,sender:"1"}} currentUserid={"2"}>
                   
                            </MessageCard>:
                               <MessageCard  sender={{name:msg.message,thumb:this.state.messageUser.thumb}} item={{time:null,sender:"1"}} currentUserid={"1"}>
                   
                               </MessageCard>


                    ))}
                   
                 
                  
                    
                   </PerfectScrollbar>
                       </div>

                   </div>
                   <div className="col-lg-2 col-sm-12">
                      
                   <ConvBar openConv={this.openConv} conversations={this.state.conversations}></ConvBar>
                   </div>
               </div>
            </div>
        );
    }
}

export default index;