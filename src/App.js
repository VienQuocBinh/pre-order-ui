import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Admin/pages/home/Home";
import { Login } from "./Admin/pages/login/Login";
import { ProductDetail } from "./Admin/pages/single/ProductDetail";
import { NewProduct } from "./Admin/pages/new/NewProduct";
import { ProductList } from "./Admin/pages/list/ProductList";
import { ProductProvider } from "./Admin/context/ProductContext";
import { UserList } from "./Admin/pages/list/UserList";
import { NewUser } from "./Admin/pages/new/NewUser";
import { productInputs } from "./formSource";
import { CategoryProvider } from "./Admin/context/CategoryContext";
import { AuthContextProvider } from "./Admin/context/AuthContext";
import { UserContextProvider } from "./Admin/context/UserContext";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <UserContextProvider>
      <ProductProvider>
        <CategoryProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/">
                <Route index element={<Login />} />
                <Route path="home" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="users">
                  <Route index element={<UserList />} />
                  <Route path=":userId" element={<ProductDetail />} />
                  <Route path="new" element={<NewUser />} />
                </Route>
                <Route path="products">
                  <Route index element={<ProductList />} />
                  <Route path=":productId" element={<ProductDetail />} />
                  <Route
                    path="new"
                    element={<NewProduct inputs={productInputs} />}
                  />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </CategoryProvider>
      </ProductProvider>
      </UserContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
