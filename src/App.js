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
import { OrderProvider } from "./Admin/context/OrderContext";
import { OrderList } from "./Admin/pages/list/OrderList";
import { OrderDetail } from "./Admin/pages/single/OrderDetail";
import { UserDetail } from "./Admin/pages/single/UserDetail";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <div className="App">
      {/* <ChakraProvider> */}
      <AuthContextProvider>
        <UserContextProvider>
          <ProductProvider>
            <CategoryProvider>
              <OrderProvider>
                <BrowserRouter>
                  <Routes>
                    <Route path="/">
                      <Route index element={<Login />} />
                      <Route path="home" element={<Home />} />
                      <Route path="login" element={<Login />} />
                      <Route path="users">
                        <Route index element={<UserList />} />
                        <Route path=":userId" element={<UserDetail />} />
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
                      <Route path="orders">
                        <Route index element={<OrderList />} />
                        <Route path=":orderId" element={<OrderDetail />} />
                      </Route>
                    </Route>
                  </Routes>
                </BrowserRouter>
              </OrderProvider>
            </CategoryProvider>
          </ProductProvider>
        </UserContextProvider>
      </AuthContextProvider>
      {/* </ChakraProvider> */}
    </div>
  );
}

export default App;
