const axios=require('axios')
const {FACEBOOK}=require("../config/url")
const {TEST_ACCESS}=require("../config/keys")


const requestUrl=(PSID,access_token)=>(`/${PSID}?fields=first_name,last_name,profile_pic&access_token=${access_token}`)

const getUsersImage=async (response)=>{
    return new Promise(async(resolve,reject)=>{
        const conversations=response.data.data

        const senders=conversations.map((conv)=>conv.senders.data[0])
    
        let batch=[]
        batch=senders.map((sender)=>({relative_url:requestUrl(sender.id,TEST_ACCESS),method:"GET"}))

        
    
        const responsee=await axios.post("https://graph.facebook.com?access_token="+TEST_ACCESS,{
            batch:batch
        })
    //    console.log(responsee)
        const profilesData=responsee.data.map((data)=>JSON.parse(data.body))
      resolve(profilesData)    
    })
}
const readConversations=async(req,res,err)=>{
    const response=await axios.get(`${FACEBOOK}103718324649806/conversations?access_token=${TEST_ACCESS}&fields=senders`)
    const profilesData=await getUsersImage(response)
    const conversations_=response.data.data.map((data,index)=>({convid:data.id,...data.senders.data[0],image:profilesData[index].profile_pic}))
    const conversations={conversations:conversations_,paging:response.data.paging}
 

     return res.json({convs:conversations})
   
}
const readMessages=(req,res,err)=>{
    const {convId}=req.params
    axios.get(`${FACEBOOK}${convId}/messages?access_token=${TEST_ACCESS}&fields=message,from`).then((response)=>{
        return res.json({messages:response.data.data.reverse()})
    }).catch((e)=>{
       // console.log(e.response.data)
    })
}

const readMoreMessages=(req,res,err)=>{
    axios.get(`${req.body.url}`).then((response)=>{
        return res.json({convs:response.data})
    })
}
const sendMessage=async (req,res,err)=>{
    const {recId}=req.params
   try{
    await axios.post(`${FACEBOOK}me/messages?access_token=${TEST_ACCESS}`,{
        "messaging_type": "MESSAGE_TAG",
        "tag":"CONFIRMED_EVENT_UPDATE",
        "recipient": {
          "id": recId
        },
        "message": {
          "text": req.body.message
        }
      })
   }catch(e){
     //  console.log(e.response.data)
   }
     res.json({success:true})
 
}

const getWebhook=(req,res,err)=>{
   res.send(req.query["hub.challenge"])
}

const postWebhook=(req,res,err)=>{
 
    const message=req.body.entry[0].messaging[0]

    
   // io.sockets.emit("message",message)
    res.send(200)
}

module.exports={
    readConversations,
    readMessages,
    readMoreMessages,
    sendMessage,
    getWebhook,
    postWebhook
}