import React, { Component } from 'react';
import ConvBar from './ConvBar';
import {API_BASE_URL} from "../../../constants/defaultValues"
import PerfectScrollbar from "react-perfect-scrollbar";

import axios from "axios"
import ChatHeading from '../../../components/applications/ChatHeading';
import MessageCard from '../../../components/applications/MessageCard';
import SaySomething from "../../../components/applications/SaySomething";
import io from 'socket.io-client';

class index extends Component {
    state={
        conversations:[],
        messages:[],
        messageUser:[],
        pageId:"103718324649806",
        messageInput:"",
        convId:"",
        newMsg:{}
    }
    componentDidMount(){
        const socket = io('http://localhost:5000/');
        socket.on("message",(msg)=>{
            console.log(msg)
            console.log(this.state.messageUser)
            if(msg.sender.id==this.state.messageUser.id){
                console.log("COMPAGE ")
                this.setState({messages:[...this.state.messages,{message:msg.message.text,from:{id:msg.sender.id}}],newMsg:{message:msg.message.text,from:{id:msg.sender.id}}})
            }
        })
        console.log("API BASE ",API_BASE_URL)
        axios.get(`${API_BASE_URL}/conv/conversations`)
        .then((response)=>{
            const userOne=response.data.convs.conversations[0]
            console.log(response)
            if(response.data.convs.conversations.length!=0){
                this.setState({convId:userOne.convid})
                this.openConv(userOne.convid,{name:userOne.name,thumb:userOne.image})
            }
            this.setState({conversations:response.data.convs.conversations})
        })
        
    }
    componentDidUpdate(prevProps,prevState){
        if (this._scrollBarRef) {
            this._scrollBarRef._ps.element.scrollTop = this._scrollBarRef._ps.contentHeight;
          }

    
        if(prevState.newMsg!=this.state.newMsg){
            console.log("NEW MESG")

        }
    }
    handleChatInputPress = e => {
        if (e.key === "Enter") {
          if (this.state.messageInput.length > 0) {
     
              let messages=this.state.messages
              this.setState({messageInput:"",messages:[...messages,{message:this.state.messageInput,from:{id:this.state.pageId}}],newMsg:{}})
              axios.post(`${API_BASE_URL}/conv/message/${this.state.messageUser.id}`,{
                 
                  message:this.state.messageInput
              })
           
        }
      }
    }
    
      handleChatInputChange = e => {
        this.setState({
            
          messageInput: e.target.value
        });
      };
    
      handleSendButtonClick = () => {
        if (this.state.messageInput.length > 0) {
            let messages=this.state.messages
            this.setState({messageInput:"",messages:[...messages,{message:this.state.messageInput,from:{id:this.state.pageId}}],newMsg:{}})
            axios.post(`${API_BASE_URL}/conv/message/${this.state.messageUser.id}`,{
               
                message:this.state.messageInput
            })
        }
      };
    openConv=(id,userInfo)=>{
        console.log("IDDDDDDD ",id)

        axios.get(`${API_BASE_URL}/conv/messages/${id}`)
        .then((response)=>{
            console.log(response)
            this.setState({messages:response.data.messages,messageUser:{...userInfo,id:response.data.messages[0].from.id},convId:id})
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
                            msg.from.id==this.state.pageId?<MessageCard  sender={{name:msg.message,thumb:"https://scontent-mxp1-1.xx.fbcdn.net/v/t1.0-9/p960x960/93245412_103718371316468_4553994935375757312_o.png?_nc_cat=107&_nc_sid=85a577&_nc_ohc=apfxHdnatqAAX-KvCym&_nc_ht=scontent-mxp1-1.xx&oh=fe4340f6a05032707b1c07d3f59b91cb&oe=5F094A40"}} item={{time:null,sender:"1"}} currentUserid={"2"}>
                   
                            </MessageCard>:
                               <MessageCard  sender={{name:msg.message,thumb:this.state.messageUser.thumb}} item={{time:null,sender:"1"}} currentUserid={"1"}>
                   
                               </MessageCard>


                    ))}
                   
                 
                  
                    
                   </PerfectScrollbar>
                   <SaySomething
          placeholder={"write..."}
          messageInput={this.state.messageInput}
          handleChatInputPress={this.handleChatInputPress}
          handleChatInputChange={this.handleChatInputChange}
          handleSendButtonClick={this.handleSendButtonClick}

        />
                       </div>

                   </div>
                   <div className="col-lg-2 col-sm-12">
                      
                   <ConvBar newMsg={this.state.newMsg} openConv={this.openConv} conversations={this.state.conversations}></ConvBar>
                   </div>
               </div>
            </div>
        );
    }
}

export default index;