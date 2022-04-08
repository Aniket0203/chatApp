import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Moment from "react-moment"
import { io } from 'socket.io-client'

const ChatRoom = () => {
    const location = useLocation()
    const [socket, setsocket] = useState()


    const [Data, setData] = useState({})
    const [msg, setmsg] = useState("")
    // const location =uselocation()
    const [allMessage, setallMessage] = useState([])

    useEffect(() => {
        const socket = io("http://localhost:5000")
        setsocket(socket)
        socket.on("connect", () => {
            // console.log(socket.id);// x8WIv7-mJelg7on_ALbx
            socket.emit("join_room", location.state.room)

            socket.on("getLatestMessage", newMessage => {
                setallMessage([...allMessage, newMessage])

            })
        });

    }, [socket, allMessage])

    useEffect(() => {
        setData(location.state)

    }, [location])

    const handlechange = (e) => {
        setmsg(e.target.value)


    }

    const onSubmit = () => {
        console.log("submitted", msg)

        if (msg) {
            const newMessage = { time: new Date(), msg, name: Data.name }
            socket.emit("newMessage", { newMessage, room: Data.room })


        }
        // const newMessage = { time: new Date(), msg, name: Data.name }
        // setallMessage([...allMessage, newMessage])
    }

    return (
        <div className="py-4 m-5 w-50 shadow bg-white text-dark border container">
            <div className=" text-center px-3 mb-4 text-capitalize">

                <h1 className="text-warning mb-4 ">{Data.room}chat room </h1>


            </div>
            <div className="bg-light border rounded p-3 mb-4 " style={{ height: "450px", overflowY: "scroll" }}>

                {
                    allMessage.map(msg => {
                        // console.log(msg)
                        return Data.name === msg.name
                            ?
                            <div className="row justify-content-end pl-5">
                                <div className="d-flex flex-coloumn align-items-end  m-2 shadow p-2 bg-info border rounded w-auto">
                                    <div>
                                        <strong className="m-1">{msg.name}</strong>
                                        <small className="text-muted"><Moment fromNow>{msg.time}</Moment></small>

                                    </div>
                                    <h4 className="m-1">{msg.msg}</h4>
                                </div>
                            </div>

                            :

                            <div className="d-flex flex-coloumn   m-2 p-2 shadow bg-white border rounded w-auto">
                                <div>
                                    <strong className="m-1">{msg.name}</strong>
                                    <small className="text-muted"><Moment fromNow>{msg.time}</Moment></small>

                                </div>
                                <h4 className="m-1">{msg.msg}</h4>
                            </div>


                    })
                }

                {/* <div className="row justify-content-end pl-5">

                    <div className="d-flex flex-coloumn align-items-end  m-2 shadow p-2 bg-info border rounded w-auto">
                        <div>
                            <strong className="m-1">{msg.name}</strong>
                            <small className="text-muted"> <Moment fromNow>{msg.time}</Moment></small>

                        </div>
                        <h4 className="m-1">{msg.msg}</h4>
                    </div>
                </div>
                <div className="row justify-content-start">

                    <div className="d-flex flex-coloumn   m-2 p-2 shadow bg-white border rounded w-auto">
                        <div>
                            <strong className="m-1">{msg.name}</strong>
                            <small className="text-muted m-1"> <Moment fromNow>{msg.time}</Moment></small>

                        </div>
                        <h4 className="m-1">{msg.msg}</h4>
                    </div>
                </div>  */}
            </div>

            <div className="form-group d-flex">
                
                <input type="text" className="form-control bg-light " name="message" value={msg} onChange={handlechange} placeholder="type your message" />
                <button type="submit" className="btn btn-warning mx-2" onClick={onSubmit}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
                    <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                </svg>
                
                
                </button>
            </div>

        </div>
    )
}

export default ChatRoom