import React, { useState } from 'react';
import './App.css';
import CommonModal from './common/Modal/modal';
import CommonTable from './common/table/table';




const initialData = [
  {
    id: 1,
    name: "cover_letter.txt",
    content: "cover_letter.txt",
    created_at: "2024-11-26T07:33:01.536898Z",
    size: 1211.0,
  },
  {
    id: 2,
    name: "cover_letter.txt",
    content: "Job Specific Cover Letter...",
    created_at: "2024-11-26T07:36:18.649132Z",
    size: 1211.0,
  },
  // ... add the rest of your data here ...
];

function App() {
  const [file, setFile] = useState(null);
  const [inputKey, setInputKey] = useState(Date.now());
  const [documents, setDocuments] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState('name');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  let btn_name = "Upload File";

  const resetInput = () => {
    setInputKey(Date.now());
  };
  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle sorting functionality
  const sortedDocuments = filteredDocuments.sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'date') {
      return new Date(b.created_at) - new Date(a.created_at);
    }
    return 0;
  });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };




  return (
    <div className="App">
      <div className="container-sm mt-5">
        <div className='mb-3 d-flex justify-content-end'>
          <CommonModal btn={btn_name} handleChange={handleFileChange} keydata={inputKey} filedata={setFile} reset={resetInput} />
        </div>
        <CommonTable />
      </div>
    </div>
  );
}

export default App;
