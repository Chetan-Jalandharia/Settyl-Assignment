import "./App.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Root from "./Pages/Root";
import AddTask from "./Components/AddTask";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import PrivateRoutes from "./Pages/PrivateRoutes";
import ListTasks from "./Components/ListTasks";
import AdminRoot from "./Pages/AdminRoot";
import Dashboard from "./Pages/Dashboard";
import AdminLogin from "./Pages/AdminLogin";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<PrivateRoutes Component={AddTask} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/allTask"
          element={<PrivateRoutes Component={ListTasks} />}
        />
        <Route path="/admin" element={<AdminRoot />}>
          <Route index element={<Dashboard />} />
          <Route path="login" element={<AdminLogin />} />
        </Route>
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
