// import "./Notes.css";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import { useState } from "react";
// import API from "../services/api";

// function Notes() {

//     const [file, setFile] = useState(null);

//     const uploadFile = async () => {

//         if (!file) {

//             alert("Please select a PDF");

//             return;

//         }

//         const formData = new FormData();

//         formData.append("file", file);

//         try {

//             await API.post(
//                 "/api/notes/upload",
//                 formData,
//                 {
//                     headers: {
//                         "Content-Type": "multipart/form-data"
//                     }
//                 }
//             );

//             alert("PDF Uploaded Successfully");

//             setFile(null);

//             document.getElementById("pdfFile").value = "";

//         } catch (error) {

//             console.error(error.response?.data || error.message);

//             if (error.response) {

//                 alert(error.response.data);

//             } else {

//                 alert(error.message);

//             }

//         }

//     };

//     return (

//         <>

//             <Navbar />

//             <div style={{ display: "flex" }}>

//                 <Sidebar />

//                 <div className="notes-container">

//                     <div className="upload-card">

//                         <h2>📚 Upload Notes</h2>

//                         <input
//                             id="pdfFile"
//                             type="file"
//                             accept=".pdf"
//                             onChange={(e) => setFile(e.target.files[0])}
//                         />

//                         <button onClick={uploadFile}>
//                             Upload PDF
//                         </button>

//                     </div>

//                 </div>

//             </div>

//         </>

//     );

// }

// export default Notes;
import "./Notes.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState, useRef } from "react";
import API from "../services/api";

function Notes() {
    const [file, setFile] = useState(null);
    // 1. Create a ref for the file input DOM element
    const fileInputRef = useRef(null);

    const uploadFile = async () => {
        if (!file) {
            alert("Please select a PDF");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            await API.post(
                "/api/notes/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            alert("PDF Uploaded Successfully");

            // 2. Reset state
            setFile(null);

            // 3. Reset input using the ref instead of document.getElementById
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

        } catch (error) {
            console.error(error.response?.data || error.message);

            if (error.response) {
                alert(error.response.data);
            } else {
                alert(error.message);
            }
        }
    };

    return (
        <>
            <Navbar />

            <div style={{ display: "flex" }}>
                <Sidebar />

                <div className="notes-container">
                    <div className="upload-card">
                        <h2>📚 Upload Notes</h2>

                        <input
                            ref={fileInputRef} // Attach ref here
                            type="file"
                            accept=".pdf"
                            onChange={(e) => setFile(e.target.files[0])}
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