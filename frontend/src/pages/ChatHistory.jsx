import "./ChatHistory.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";

function ChatHistory() {

    const [chatList, setChatList] = useState([]);

    const [search, setSearch] = useState("");

    const totalChats = chatList.length;

    useEffect(() => {

        loadChats();

    }, []);

    const loadChats = async () => {

        try {

            const response = await axios.get(
                "http://localhost:8080/api/chat-history"
            );

            setChatList(response.data);

        }

        catch {

            alert("Unable to load chat history.");

        }

    };

    const deleteChat = async (id) => {

        if (!window.confirm("Delete this chat?"))
            return;

        try {

            await axios.delete(
                "http://localhost:8080/api/chat-history/" + id
            );

            loadChats();

        }

        catch {

            alert("Delete Failed");

        }

    };

    return (

        <>

            <Navbar />

            <div style={{ display: "flex" }}>

                <Sidebar />

                <div className="history-container">

                    <h2 className="history-title">

                        💬 Chat History

                    </h2>

                    <div className="dashboard-cards">

                        <div className="dashboard-card">

                            <h3>Total Chats</h3>

                            <h1>{totalChats}</h1>

                        </div>

                    </div>

                    <div className="search-box">

                        <input

                            type="text"

                            placeholder="Search Chat..."

                            value={search}

                            onChange={(e)=>setSearch(e.target.value)}

                        />

                    </div>

                    <div className="history-grid">
                    {

[...chatList]

.filter(chat=>{

    if(search==="") return true;

    return chat.userMessage
        .toLowerCase()
        .includes(search.toLowerCase());

})

.map((chat)=>(

<div
key={chat.id}
className="history-card"
>

<div className="history-date">

📅 {

chat.createdAt

?

new Date(chat.createdAt).toLocaleString()

:

""

}

</div>

<div className="history-user">

<h4>

👤 User

</h4>

<p>

{chat.userMessage}

</p>

</div>

<div className="history-ai">

<h4>

🤖 AI

</h4>

<p>

{chat.botResponse}

</p>

</div>

<div className="history-actions">

<button

className="delete-btn"

onClick={()=>deleteChat(chat.id)}

>

🗑 Delete

</button>

</div>

</div>

))

}

{

[...chatList]

.filter(chat=>{

    if(search==="") return true;

    return chat.userMessage
        .toLowerCase()
        .includes(search.toLowerCase());

})

.length===0 &&

<div className="no-data">

💬 No Chat History Found

</div>

}

                    </div>

                </div>

            </div>

        </>

    );

}

export default ChatHistory;