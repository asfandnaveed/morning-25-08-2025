import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { onValue, push, ref, serverTimestamp, set } from "firebase/database";
import { auth, db } from "../Firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function ChatApp() {

    const [chatMessage, setChatMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login"); // redirect to login
        } catch (error) {
            console.error("Logout error:", error);
        }
    };


    useEffect(() => {

        const node = ref(db, 'Message');

        onValue(node, (snapshot) => {

            const data = snapshot.val();

            const allMessages = Object.keys(data).map((key) => (
                {
                    id: key,
                    ...data[key],
                }
            ));

            setMessages(allMessages);

        });



    }, []);


    const sendMessage = () => {

        const uid = auth.currentUser.uid;
        const email = auth.currentUser.email;

        const node = ref(db, `Message`);

        if (chatMessage != "") {

            push(node, {
                id: uid,
                message: chatMessage,
                emai: email,
                timeStamp: serverTimestamp()
            })
                .then(() => { setChatMessage("") });


        }

    }


    return (
        <div className="chat-app d-flex">
            {/* Sidebar */}
            <aside className="chat-sidebar d-flex flex-column">
                <div className="sidebar-header p-3">
                    <input
                        type="text"
                        className="form-control search-bar"
                        placeholder="Search"
                    />
                </div>

                <div className="chat-list flex-grow-1 overflow-auto">
                    {[
                        {
                            name: "Bill Kuphal",
                            msg: "The weather will be perfect for th...",
                            time: "9:41 AM",
                            img: "https://i.pravatar.cc/40?img=1",
                            active: true,
                        },
                        {
                            name: "Photographers",
                            msg: "Here’re my latest drone shots",
                            time: "9:16 AM",
                            badge: 80,
                            img: "https://i.pravatar.cc/40?img=5",
                        },
                        {
                            name: "SpaceX Crew-16 Launch",
                            msg: "I've been there!",
                            time: "Thu",
                            img: "https://i.pravatar.cc/40?img=8",
                        },
                        {
                            name: "Helen Flatley",
                            msg: "You: Ok",
                            time: "12/13/21",
                            img: "https://i.pravatar.cc/40?img=10",
                        },
                    ].map((chat, index) => (
                        <div
                            key={index}
                            className={`chat-item d-flex align-items-center p-3 ${chat.active ? "active" : ""
                                }`}
                        >
                            <img
                                src={chat.img}
                                alt="avatar"
                                className="rounded-circle me-3"
                                width="40"
                                height="40"
                            />
                            <div className="flex-grow-1">
                                <div className="fw-semibold">{chat.name}</div>
                                <small className="text-muted d-block text-truncate">
                                    {chat.msg}
                                </small>
                            </div>
                            {chat.badge ? (
                                <span className="badge bg-danger ms-2">{chat.badge}</span>
                            ) : (
                                <small className="text-muted ms-2">{chat.time}</small>
                            )}
                        </div>
                    ))}
                </div>
            </aside>

            {/* Chat Window */}
            <main className="chat-window d-flex flex-column flex-grow-1">
                <div className="chat-header border-bottom d-flex align-items-center justify-content-between p-3">
                    <div className="d-flex align-items-center">
                        <img
                            src="https://i.pravatar.cc/40?img=1"
                            alt="avatar"
                            className="rounded-circle me-3"
                        />
                        <div>
                            <h6 className="mb-0">{auth.currentUser?.email}</h6>
                            <small className="text-muted">Online</small>
                        </div>
                    </div>

                    <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={handleLogout}
                        
                    >
                        Logout
                    </button>
                </div>


                <div className="chat-body flex-grow-1 overflow-auto p-4">

                    {messages.map((chat) => {
                        const senderName = chat.emai
                            ? chat.emai.split("@")[0]
                            : "Unknown";

                        const isCurrentUser = chat.id === auth.currentUser.uid;

                        return (
                            <div
                                key={chat.id + chat.timeStamp}
                                className={`message mb-3 ${isCurrentUser ? "sent" : "received"}`}
                            >
                                {!isCurrentUser && (
                                    <small className="fw-semibold text-primary">
                                        {senderName}
                                    </small>
                                )}
                                <p className="mb-1">{chat.message}</p>
                                <span className="time">
                                    {chat.timeStamp
                                        ? new Date(chat.timeStamp).toLocaleTimeString()
                                        : ""}
                                </span>
                            </div>
                        );
                    })}




                </div>

                <div className="chat-footer border-top p-3 d-flex align-items-center">
                    <button className="btn btn-light me-2">
                        <i className="bi bi-emoji-smile"></i>
                    </button>
                    <input
                        type="text"
                        className="form-control message-input"
                        placeholder="Type your message"
                        value={chatMessage}
                        onChange={(e) => { setChatMessage(e.target.value) }}
                    />
                    <button className="btn btn-primary ms-2 rounded-circle send-btn"
                        onClick={sendMessage}
                    >
                        <i className="bi bi-send-fill"></i>
                    </button>
                </div>
            </main>
        </div>
    );
}

export default ChatApp;
