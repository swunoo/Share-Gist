import './App.css';
import { useState } from 'react';
import { StudentContent } from './components/StudentContent.js';
import { Navbar } from './components/Navbar.js';
import { TeacherContent } from './components/TeacherContent.js';

function App() {

  const [user, setUser] = useState(false);
  const [tMode, setTMode] = useState('tDash');
  const [lessonList, setLessonList] = useState(null);
  const [courseTitle, setCourseTitle] = useState(null);
  const [newLesson, setNewLesson] = useState(false);
  const [lessonId, setLessonId] = useState(null);

  const toggleUser = () => setUser((state)=>!state);

  const toggleMode = (currentMode) => {
    setTMode(currentMode);
  }

  const updateLessonList = (arr) => setLessonList(arr);

  const updateLesson = (lessonId) => {
    setNewLesson((state) => !state);
    setLessonId(lessonId);
  }

  const updateCourseTitle = (title) => setCourseTitle(title);

  return (
    <div className='App'>
      
      <Navbar 
        lessonList = {lessonList}
        courseTitle = {courseTitle}
        user = {user} 
        updateLesson = { updateLesson }
        toggleUser = {toggleUser}
        toggleMode = {toggleMode} 
      />

      {user
        && 
      <StudentContent 
        lessonList = { updateLessonList }
        courseTitle = { updateCourseTitle }
        newLesson = {newLesson}
        lessonId = {lessonId}
      />
      }

      {!user 
        &&
      <TeacherContent tMode = {tMode}/>
      }
      
      
    </div>
  );

}

export default App;
