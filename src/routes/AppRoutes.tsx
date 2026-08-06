import { Routes, Route } from 'react-router-dom';
import Home from '../modules/home/pages/Home';
import Teacher from '../modules/teacher/pages/Teacher';
import School from '../modules/school/pages/School';
import Groups from '../modules/group/pages/Group';
import Timetable from '../modules/timetable/page/Timetable';
import Teaching from '../modules/teaching/page/Teaching';
import Register from '../modules/register/pages/Register';


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/school" element={<School />} />
      <Route path="/teachers" element={<Teacher />} />
      <Route path="/groups" element={<Groups/>} />
      <Route path="/teachings" element={<Teaching />} />
      <Route path="/timetables" element={<Timetable />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}