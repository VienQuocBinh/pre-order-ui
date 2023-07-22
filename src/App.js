import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Admin/pages/home/Home";
import { Login } from "./Admin/pages/login/Login";
import { ProductDetail } from "./Admin/pages/single/ProductDetail";
import { New } from "./Admin/pages/new/New";
import { ProductList } from "./Admin/pages/list/ProductList";
import { ProductProvider } from "./Admin/context/ProductContext";
import { UserList } from "./Admin/pages/list/UserList";

function App() {
  return (
    <div className="App">
      <ProductProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route index element={<Home />}/>
              <Route path="login" element={<Login />} />
              <Route path="users">
                <Route index element={<UserList />} />
                <Route path=":userId" element={<ProductDetail />} />
                <Route path="new" element={<New />} />
              </Route>
              <Route path="products">
                <Route index element={<ProductList />} />
                <Route path=":productId" element={<ProductDetail />} />
                <Route path="new" element={<New />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ProductProvider>
    </div>
  );
}

export default App;
