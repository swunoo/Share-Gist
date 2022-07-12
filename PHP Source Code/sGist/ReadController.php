<?php

require_once 'DBConnector.php';

$pdo = DBConnect::connect('share_gist');

$request = json_decode(file_get_contents('php://input'), true);

function loadAllCourses ($owner, $pdo) {
    $query = "SELECT * FROM courses WHERE owner_id = :owner_id";
    $stmt = $pdo->prepare($query);
    $stmt->bindValue(':owner_id', $owner);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function loadSelectedCourse($courseId, $pdo) {
    $query = "SELECT * FROM courses WHERE course_id = :courseId";
    $stmt = $pdo->prepare($query);
    $stmt->bindValue(':courseId', $courseId);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function searchData ($search_key, $table, $pdo) {
    $query = "SELECT * FROM $table WHERE title = :search_key";
    $stmt = $pdo->prepare($query);
    $stmt->bindValue(':search_key', $search_key);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function lessonList ($courseID, $pdo) {
    $query = "SELECT title, id FROM lessons WHERE course_id = $courseID";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function lessonDetails ($lessonId, $pdo) {
    $query = "SELECT * FROM lessons WHERE id = :lessonId";
    $stmt = $pdo->prepare($query);
    $stmt->bindValue(':lessonId', $lessonId);
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function prepareLessonContent ($lessonId, $pdo) {

    $lessonContent = lessonDetails($lessonId, $pdo);

    if(isset($lessonContent['0']['text_link'])){
        $textFile = $lessonContent['0']['text_link'];
        $file = fopen("./texts/$textFile.txt",'r');
        $text = fgets($file);
        fclose($file);
    } else {
        $text = '';
    }

    array_push($lessonContent, $text);
            
    return $lessonContent;
}


if(isset($request)){

    if(isset($request['teacher'])){

        $courses = loadAllCourses(1, $pdo);
        
        foreach($courses as $course) {

            if(isset($course['text_link'])){
                $filePath = "./texts/" . $course['text_link'] . ".txt";
                $file = fopen($filePath, "r");
                $text = fgets($file);
                fclose($file);
                $course['text'] = $text;
            } else {
                $course['text'] = '';
            }
        }


        echo json_encode($courses);
        
    } else if (isset($request['course'])){

        $lessonArr = lessonList($request['course'], $pdo);

        if(isset($lessonArr)){

            $lessonId = $lessonArr[0]['id'];
            $lessonContent = prepareLessonContent($lessonId, $pdo);
            echo json_encode(['lessons' => $lessonArr, 'details' => $lessonContent]);
            
        } else {
            echo json_encode(['exception' => 'No Lesson']);
        }

    } else if (isset($request['lesson'])) {
        
        $lessonContent = prepareLessonContent($request['lesson'], $pdo);
    
        echo json_encode(['details' => $lessonContent]);
    } 


}


?>