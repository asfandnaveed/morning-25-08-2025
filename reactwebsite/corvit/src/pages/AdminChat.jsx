import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import { push, ref, set } from "firebase/database";
import { auth, db } from "../Firebase";

function ChatApp() {

    const [chatMessage, setChatMessage] = useState('');


    const sendMessage = () => {

        const uid = auth.currentUser.uid;

        const node = ref(db, `Message/${uid}`);

        if (chatMessage != "") {
            
            push(node, {
                message: chatMessage,
                timeStamp: Date.now()
            });
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
                <div className="chat-header border-bottom d-flex align-items-center p-3">
                    <img
                        src="https://i.pravatar.cc/40?img=1"
                        alt="avatar"
                        className="rounded-circle me-3"
                    />
                    <div>
                        <h6 className="mb-0">Bill Kuphal</h6>
                        <small className="text-muted">Online for 10 mins</small>
                    </div>
                </div>

                <div className="chat-body flex-grow-1 overflow-auto p-4">
                    <div className="message received mb-3">
                        <p>Who was that philosopher you shared with me recently?</p>
                        <span className="time">2:14 PM</span>
                    </div>
                    <div className="message sent mb-3">
                        <p>Roland Barthes</p>
                        <span className="time">2:16 PM</span>
                    </div>
                    <div className="message received mb-3">
                        <p>That’s him! What was his vision statement?</p>
                        <span className="time">2:18 PM</span>
                    </div>
                    <div className="message sent mb-3">
                        <p>
                            “Ultimately in order to see a photograph well, it is best to look
                            away or close your eyes.”
                        </p>
                        <img
                            src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f91?auto=format&fit=crop&w=600&q=60"
                            alt="photo"
                            className="img-fluid rounded mt-2"
                            width="220"
                        />
                        <small className="d-block text-muted mt-1">
                            Aerial photograph from the Helsinki urban environment division.
                        </small>
                        <span className="time">2:20 PM</span>
                    </div>
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
