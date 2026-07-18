import "./Notes.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import axios from "axios";

function Notes() {

    const [file, setFile] = useState(null);

    const uploadFile = async () => {

        if (!file) {

            alert("Please select a PDF");

            return;

        }

        const formData = new FormData();

        formData.append("file", file);

        try {

            await axios.post(
                "http://localhost:8080/api/notes/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            alert("PDF Uploaded Successfully");

            setFile(null);

            document.getElementById("pdfFile").value = "";

        }

catch(error){

    console.log(error);

    if(error.response){

        alert(error.response.data);

    }else{

        alert(error.message);

    }

}

    };

    return(

        <>

            <Navbar/>

            <div style={{display:"flex"}}>

                <Sidebar/>

                <div className="notes-container">

                    <div className="upload-card">

                        <h2>📚 Upload Notes</h2>

                        <input

                            id="pdfFile"

                            type="file"

                            accept=".pdf"

                            onChange={(e)=>setFile(e.target.files[0])}

                        />

                        <button onClick={uploadFile}>

                            Upload PDF

                        </button>

                    </div>

                </div>

            </div>

        </>

    );

}

export default Notes;