import './App.css';
import CommonModal from './common/Modal/modal';
import CommonTable from './common/table/table';

function App() {
  return (
    <div className="App">
      <CommonModal />
      <div className="container-sm">
        <CommonTable />
      </div>
    </div>
  );
}

export default App;
