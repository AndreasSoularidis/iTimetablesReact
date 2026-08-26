import { Routes, Route } from 'react-router-dom';
import Profile from '../modules/profile/pages/Profile';
import Teacher from '../modules/teacher/pages/Teacher';
import School from '../modules/school/pages/School';
import Groups from '../modules/group/pages/Group';
import Timetable from '../modules/timetable/page/Timetable';
import Teaching from '../modules/teaching/page/Teaching';
import LoginForm from '../modules/register/pages/LoginForm';
import MainLayout from '../shared/layouts/MainLayout';
import LandingPage from '../modules/landing/pages/LandingPage';


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginForm />} />
      {/* <Route path="/register" element={<Register />} /> */}
      <Route element={<MainLayout />}>
        <Route path="/school" element={<School />} />
        <Route path="/teachers" element={<Teacher />} />
        <Route path="/groups" element={<Groups/>} />
        <Route path="/teachings" element={<Teaching />} />
        <Route path="/timetables" element={<Timetable />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<div>404 Not Found</div>} /> 
    </Routes>
  );  
}