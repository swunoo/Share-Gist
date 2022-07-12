# Share-Gist

### About

* A prototype app to try out video APIs and serve as a reference in the development of **Level-Up LMS**.
* Written with React as frontend and PHP for data-fetching from MySQL. Tailwindcss and DaisyUI are used for styling.

### Features

* The user can act as either Teacher or Student.
* "Teacher" can add courses and add lessons to courses. Content may include text, photos and videos.
* Teachers can upload videos directly to Vimeo via an in-app form or provide the link to an existing video.
* Teachers can also delete the courses.
* "Student" can view available courses and lessons.

### Process

* Started on July 6, 2022 and completed on July 12.
* Took around 15 hours in total.
* Most challenging things in this project were:
    * Using results from async functions - Sometimes, "await" and "then" did not work as intended across different files and I used callback functions instead.
    * Sending image files via fetch API - *FormData* class is the way. Figuring it out took me a ridiculous amount of time.
    * Customizing UI Components - DaisyUI provides a set of ready-made classes, modifying which is a bit tricky.

