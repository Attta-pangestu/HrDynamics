// ---------------react modules----------------------------
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"


// --------------css & Images,Solid,icons,svgs-----------------
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'


// --------------pages-----------------
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import Register from "./pages/Register"
// import EmployeeDashboard from './pages/EmployeeDashboard'
import NotFound404 from './pages/NotFound404'

// ------------------utils-----------------
import PrivateRoutes from './utils/PrivateRoutes'
import RoleBasedRoutes from './utils/RoleBasedRoutes'

// ----------------components-----------------
import AdminSummary from './components/dashboard/AdminSummary'
import DepartmentList from './components/departments/DepartmentList'
import EditDepartment from './components/departments/EditDepartment'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to="/admin-dashboard"/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/admin-dashboard' element={
          <PrivateRoutes>
            <RoleBasedRoutes requiredRole={["admin"]}>
              <AdminDashboard/>
            </RoleBasedRoutes>
          </PrivateRoutes>
        }>
          <Route index element={<AdminSummary/>}></Route>
          <Route path='/admin-dashboard/departments' element={<DepartmentList/>}></Route>
          <Route path='/admin-dashboard/departments/:id' element={<EditDepartment/>}></Route>
        </Route>

        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
