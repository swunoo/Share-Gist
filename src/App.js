import './App.css';
import { useState } from 'react';
import { Content } from './components/Content';
import { Navbar } from './components/Navbar.js';
import { TeacherContent } from './components/TeacherContent';

let lesson;

// let lesson = {
//   id: 1,
//   course: 1,
//   title: 'Starting to Film',
//   text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum voluptatum explicabo, sed facere iure sit illum cumque? Quaerat aspernatur distinctio enim rerum eius vitae beatae eum alias quasi praesentium eveniet, nobis facilis minima perspiciatis laborum, corporis error voluptatum quas cum, recusandae quia ipsa culpa. Rem voluptatum recusandae doloribus asperiores incidunt?',
//   video_link: 'https://www.youtube.com/watch?v=fNFzfwLM72c&list=RDGMEMQ1dJ7wXfLlqCjwV0xfSNbAVM4-43lLKaqBQ&index=28',
//   duration: 0.5
// }

// const course = {
//   title: 'How to Film',
//   lessonList: ['Starting to Film', 'Getting Better', 'Being a Pro']
// }

function App() {

  const [user, setUser] = useState(false);
  const [tMode, setTMode] = useState('tDash');
  const [lesson, setLesson] = useState();
  const [course, setCourse] = useState({
    title: '. . .', lessonList: [], status: true
  })

  const toggleUser = () => setUser((state)=>!state);

  const toggleMode = (currentMode) => {
    setTMode(currentMode);
  }

  const loadData = async () => {
    fetch('http://localhost/sGist/ReadController.php', {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        course: 1,
        lesson: 0
      }) //Course 1, First Lesson.
    }).then(res => res.json())
      .then(data => {
        console.log(data);
        // setLesson(data.lesson);
      })
  }

  loadData();

  return (
    <div className='App'>
      
      <Navbar 
        course = {course} 
        user = {user} 
        toggleUser = {toggleUser}
        toggleMode = {toggleMode} 
      />

      {user
        && 
      <Content lesson = {lesson} />
      }

      {!user 
        &&
      <TeacherContent tMode = {tMode}/>
      }
      
      
    </div>
  );

}

export default App;
