import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '@xyflow/react/dist/style.css';
import CreateWorkflow from './Components/CreateWorkflow';
import HomePage from './Components/HomePage';

export default function App() {

  return <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/create-workflow" element={<CreateWorkflow />} />
      </Routes>
    </BrowserRouter>
  </div>
}
