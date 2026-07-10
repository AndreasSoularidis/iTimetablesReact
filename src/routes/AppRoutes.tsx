import { Routes, Route } from 'react-router-dom';
import Home from '../modules/home/pages/Home';
import Teacher from '../modules/teacher/pages/Teacher';
import School from '../modules/school/pages/School';


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/school" element={<School />} />
      <Route path="/teachers" element={<Teacher />} />
      <Route path="/groups" element={<div>Groups</div>} />
      <Route path="/teachings" element={<div>Teachings</div>} />
      <Route path="/timetables" element={<div>Timetables</div>} />
    </Routes>
  );
}