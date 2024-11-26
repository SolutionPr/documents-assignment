import React, { useEffect, useState } from 'react';
import './App.css';
import CommonModal from './common/Modal/modal';
import CommonTable from './common/table/table';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Get_Files, Upload_File } from './redux/authslice';


function App() {
  const [file, setFile] = useState(null);
  const [inputKey, setInputKey] = useState(Date.now());
  const dispatch = useDispatch();

  const listingdata = useSelector((state) => state.data.listingdata)

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  let btn_name = "Upload File";

  const resetInput = () => {
    setInputKey(Date.now());
  };

  const handleSubmit = () => {
    if (!file) {
      toast.warning("Upload file")
    } else {
      dispatch(Upload_File(file, setFile, dispatch));
      resetInput();
    }
  }


  useEffect(() => {
    dispatch(Get_Files(dispatch))
  }, [])


  return (
    <div className="App">
      <div className="container-sm mt-5">
        <div className='mb-3 d-flex justify-content-end'>
          <CommonModal btn={btn_name} handleChange={handleFileChange} keydata={inputKey} file={file} filedata={setFile} reset={resetInput} handleSubmit={handleSubmit} />
        </div>
        <CommonTable Alldata={listingdata} />
      </div>
    </div>
  );
}

export default App;
