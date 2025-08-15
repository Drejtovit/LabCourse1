import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';

// import './index.css';
import App from './App.jsx'
// import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Jobs from './pages/Jobs.jsx';
import JobDetails from './pages/JobDetails.jsx';
import Resume from './pages/Resume.jsx';
import Contact from './pages/Contact.jsx';
import Categories from './pages/Categories.jsx';
import ResumeCreate from './pages/Categories.jsx';
import ManageResumes from './pages/ManageResumes.jsx';
import BookMarkedJobs from './/pages/BookMarkedJobs.jsx';
import BrowseResumes from './pages/BrowseResumes.jsx';
import Register from './pages/Register.jsx';
import ManageApplications from './pages/ManageApplications.jsx';
import PostJob from './pages/PostJob.jsx';

const router = createBrowserRouter([
  {path:'/', element: <App/>},
  {path:'/about', element: <About/>},
  {path:'/jobs', element: <Jobs/>},
  {path:'/jobs/details', element: <JobDetails/>},
  {path:'/resume', element: <Resume/>},
  {path:'/contact', element: <Contact/>},
  {path:'/categories', element: <Categories/>},
  {path:'/resume/create', element: <ResumeCreate/>},
  {path:'/resume/manage', element: <ManageResumes/>},
  {path:'/bookmarkedJobs', element: <BookMarkedJobs/>},
  {path:'/browseresumes', element: <BrowseResumes/>},
  {path:'/register', element: <Register/>},
  {path:'/manageapplications', element: <ManageApplications/>},
  {path:'/postjob', element: <PostJob/>},

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
