import "./Notice.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
function Notice() {
  const [noticeList, setNoticeList] = useState([]);

const [editingId, setEditingId] = useState(null);

const [search, setSearch] = useState("");
const [expandedNotice, setExpandedNotice] = useState(null);

const [form, setForm] = useState({
    title: "",
    description: "",
    noticeDate: "",
    important: false
});
useEffect(() => {
    loadNotice();
}, []);
const loadNotice = async () => {

    try {

        const response = await axios.get(
            "http://localhost:8080/api/notice"
        );

        setNoticeList(response.data);

    }

    catch {

        alert("Unable to load notices.");

    }

};
const addNotice = async () => {

    if (
        !form.title ||
        !form.description ||
        !form.noticeDate
    ) {

        alert("Fill all fields");

        return;

    }

    try {

        await axios.post(
            "http://localhost:8080/api/notice",
            form
        );

        alert("Notice Added");

        setForm({
            title: "",
            description: "",
            noticeDate: "",
            important: false
        });

        loadNotice();

    }

    catch {

        alert("Unable to Add Notice");

    }

};
const deleteNotice = async (id) => {

    if (!window.confirm("Delete this notice?"))
        return;

    try {

        await axios.delete(
            "http://localhost:8080/api/notice/" + id
        );

        loadNotice();

    }

    catch {

        alert("Delete Failed");

    }

};
const editNotice = (notice) => {

    setEditingId(notice.id);

    setForm({

        title: notice.title,

        description: notice.description,

        noticeDate: notice.noticeDate,

        important: notice.important

    });

};
const updateNotice = async () => {

    try {

        await axios.put(

            "http://localhost:8080/api/notice/" + editingId,

            form

        );

        alert("Notice Updated");
        setForm({

            title: "",

            description: "",

            noticeDate: "",

            important: false

        });
        setEditingId(null);
        setExpandedNotice(null);
        loadNotice();

    }

    catch {

        alert("Update Failed");

    }

};
return (

    <>

        <Navbar />

        <div style={{ display: "flex" }}>

            <Sidebar />

            <div className="notice-container">

                <h2 className="notice-title">
                    📢 Notice Board
                </h2>

              <div className="notice-form">

    <input
        type="text"
        placeholder="Notice Title"
        value={form.title}
        onChange={(e)=>setForm({...form,title:e.target.value})}
    />

    <input
        type="date"
        value={form.noticeDate}
        onChange={(e)=>setForm({...form,noticeDate:e.target.value})}
    />

    <label>

        <input
            type="checkbox"
            checked={form.important}
            onChange={(e)=>setForm({...form,important:e.target.checked})}
        />

        Important Notice

    </label>

    <textarea

        placeholder="Notice Description"

        value={form.description}

        onChange={(e)=>setForm({...form,description:e.target.value})}

    ></textarea>

    {

        editingId ?

        <button onClick={updateNotice}>

            Update Notice

        </button>

        :

        <button onClick={addNotice}>

            Add Notice

        </button>

    }

</div>

<div className="search-box">

    <input

        type="text"

        placeholder="Search Notice..."

        value={search}

        onChange={(e)=>setSearch(e.target.value)}

    />

</div>

<div className="notice-grid">

{

[...noticeList]

.sort((a, b) => new Date(b.noticeDate) - new Date(a.noticeDate))

.filter(item => {

    if (search === "") return true;

    return item.title.toLowerCase().includes(search.toLowerCase());

})

.map((item) => (

<div
    key={item.id}
    className="notice-card"
>

    <div className="notice-header">

        <h3>{item.title}</h3>

        {

            item.important ?

            <span className="badge badge-important">

                📌 Important

            </span>

            :

            <span className="badge badge-normal">

                Notice

            </span>

        }

    </div>

    <p className="notice-date">

        📅 {item.noticeDate}

    </p>

    <p className="notice-description">

        {

            expandedNotice === item.id

            ?

            item.description

            :

            (item.description?.length || 0) > 120

            ?

            item.description.substring(0,120) + "..."

            :

            item.description

        }

    </p>

    {

        (item.description?.length || 0) > 120 &&

        <button

            className="read-btn"

            onClick={()=>

                setExpandedNotice(

                    expandedNotice===item.id

                    ?

                    null

                    :

                    item.id

                )

            }

        >

            {

                expandedNotice===item.id

                ?

                "Show Less"

                :

                "Read More"

            }

        </button>

    }

    <div className="notice-actions">

        <button

            className="edit-btn"

            onClick={()=>editNotice(item)}

        >

            Edit

        </button>

        <button

            className="delete-btn"

            onClick={()=>deleteNotice(item.id)}

        >

            Delete

        </button>

    </div>

</div>

))

}

{

[...noticeList]

.sort((a,b)=>new Date(b.noticeDate)-new Date(a.noticeDate))

.filter(item=>{

    if(search==="") return true;

    return item.title.toLowerCase().includes(search.toLowerCase());

})

.length===0 &&

<div className="no-data">

    📢 No Notices Available

</div>

}

</div>

            </div>

        </div>

    </>

);

}

export default Notice;