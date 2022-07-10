import './App.css';
import { useState } from 'react';
import { Content } from './components/Content';
import { Navbar } from './components/Navbar.js';
import { TeacherContent } from './components/TeacherContent';

function App() {

  const [user, setUser] = useState(false);
  const [tMode, setTMode] = useState('tDash');
  const [lesson, setLesson] = useState();
  const [text, setText] = useState('');
  const [lessonList, setLessonList] = useState([]);
  const [courseTitle, setCourseTitle] = useState('How to Film');
  const [loadingState, setLoadingState] = useState(true);

  const toggleUser = () => setUser((state)=>!state);

  const toggleMode = (currentMode) => {
    setTMode(currentMode);
  }

  const placeData = (data) => {
        setLesson(data['details'][0]);
        setText(data['details'][1]);

        let lessonArr = [];
        data['lessons'].forEach(obj => {
          lessonArr.push(obj.title);
        });
        setLessonList(lessonArr);

        setCourseTitle('How to Film');

  }

  // const loadData = async () => {
  //   fetch('http://localhost/sGist/ReadController.php', {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       course: 1,
  //       lesson: 0
  //     }) //Course 1, First Lesson.
  //   }).then(res => res.json())
  //     .then(data => {
  //       setLoadingState(false);
  //       console.log(data);
  //       placeData(data);
  //     })
  // }

  // if(loadingState) {
  //   loadData();
  // }


  return (
    <div className='App'>
      
      <Navbar 
        lessonList = {lessonList}
        courseTitle = {courseTitle}
        loadingState = {loadingState} 
        user = {user} 
        toggleUser = {toggleUser}
        toggleMode = {toggleMode} 
      />

      {user
        && 
      <Content 
        lesson = {lesson}
        text = {text}
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
