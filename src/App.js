import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Admin/pages/home/Home";
import { Login } from "./Admin/pages/login/Login";
import { Single } from "./Admin/pages/single/Single";
import { New } from "./Admin/pages/new/New";
import { List } from "./Admin/pages/list/List";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />}></Route>
            <Route path="login" element={<Login />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route path="new" element={<New />} />
            </Route>
            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route path="new" element={<New />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
