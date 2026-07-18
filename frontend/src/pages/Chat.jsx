import "./Chat.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
function Chat() {

    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState(() => {

        const savedMessages = localStorage.getItem("chatHistory");

        return savedMessages ? JSON.parse(savedMessages) : [];

    });
    const [loading, setLoading] = useState(false);

    const chatEndRef = useRef(null);

    useEffect(() => {

        chatEndRef.current?.scrollIntoView({
            behavior: "smooth"
        });

    }, [messages, loading]);

    useEffect(() => {

        localStorage.setItem(
            "chatHistory",
            JSON.stringify(messages)
        );

    }, [messages]);

    const sendMessage = async () => {

        if (message.trim() === "") return;

        const userMessage = {
            sender: "You",
            text: message
        };

        setMessages(prev => [...prev, userMessage]);

        const currentMessage = message;

        setMessage("");

        setLoading(true);

        try {

           const response = await axios.post(
    "http://localhost:8080/api/chat",
    {
        message: currentMessage
    }
);
const aiResponse = response.data.response;
// Save chat history in MySQL
await axios.post(
    "http://localhost:8080/api/chat-history",
    {
        userMessage: currentMessage,
        botResponse: aiResponse
    }
);

setTimeout(() => {

    const aiMessage = {
        sender: "AI",
        text: aiResponse
    };

    setMessages(prev => [...prev, aiMessage]);

    setLoading(false);

}, 1200);

        }catch (error) {

    let errorMessage = "Unable to connect to AI Server.";

    if (error.response) {

        if (error.response.data.response) {

            errorMessage = error.response.data.response;

        } else if (error.response.data.message) {

            errorMessage = error.response.data.message;

        }

    }

    setTimeout(() => {

        setMessages(prev => [
            ...prev,
            {
                sender: "AI",
                text: errorMessage
            }
        ]);

        setLoading(false);

    }, 1200);

}

    };

    const clearChat = () => {

        setMessages([]);

        localStorage.removeItem("chatHistory");

    };

    return (

        <>

            <Navbar />

            <div style={{ display: "flex" }}>

                <Sidebar />

                <div
                    className="chat-container"
                    style={{
                        flex: 1,
                        marginLeft: "250px",
                        padding: "20px"
                    }}
                >

                    <h2 className="chat-title">

                        🤖 AI Student Assistant

                    </h2>

                    <div
                        style={{
                            textAlign: "right",
                            marginBottom: "15px"
                        }}
                    >

                        <button
                            className="clear-btn"
                            onClick={clearChat}
                        >
                            🗑 Clear Chat
                        </button>

                    </div>

                    <div className="chat-box">

                        {

                            messages.map((msg, index) => (

                                <div
                                    key={index}
                                    className={
                                        msg.sender === "You"
                                            ? "user-message"
                                            : "ai-message"
                                    }
                                >

                                    <b>{msg.sender}</b>

                                    {
    msg.sender === "AI" ? (

        <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {msg.text}
        </ReactMarkdown>

    ) : (

        <p>{msg.text}</p>

    )
}

                                </div>

                            ))

                        }

                        {

    loading &&

    <div className="ai-message">

        <b>🤖 AI</b>

        <div className="loader">

            <span></span>
            <span></span>
            <span></span>

        </div>

    </div>

}

                        <div ref={chatEndRef}></div>

                    </div>

                    <div className="input-area">

                        <input

                            value={message}

                            onChange={(e) => setMessage(e.target.value)}

                            onKeyDown={(e) => {

                                if (e.key === "Enter") {

                                    sendMessage();

                                }

                            }}

                            placeholder="Ask anything..."

                        />

                        <button onClick={sendMessage}>

                            Send

                        </button>

                    </div>

                </div>

            </div>

        </>

    );

}

export default Chat;