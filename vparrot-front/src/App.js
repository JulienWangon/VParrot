import { BrowserRouter, Route, Routes } from 'react-router-dom';

//Components Import
import Home from "./pages/public/Home";
import MainteanceServices from "./pages/public/MainteanceServices";
import RepairServices from "./pages/public/RepairServices";
import SalesArea from "./pages/public/SalesArea";
import Error from './_utils/Error';

function App() {
  return (
    <div className="App">

        <BrowserRouter>
            <Routes>

                <Route index element={<Home/>}/>

                <Route path="/home" element={<Home/>}/>
                <Route path="/entretiens" element={<MainteanceServices/>}/>
                <Route path="/reparations" element={<RepairServices/>}/>
                <Route path="/ventes" element={<SalesArea/>}/>

                <Route path="*" element={Error}/>
                
            </Routes>       
        </BrowserRouter>

       

        

        

        
      
    </div>
  );
}

export default App;
