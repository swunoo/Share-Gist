<?php

require_once 'DBConnector.php';

$pdo = DBConnect::connect('share_gist');

$request = json_decode(file_get_contents('php://input'), true);

function deleteCourse ($courseId, $pdo) {
    $query = "DELETE FROM courses WHERE id = :courseId";
    $stmt = $pdo->prepare($query);
    $stmt->bindValue(':courseId', $courseId);
    $stmt->execute();
    deleteLesson ('course_id', $courseId, $pdo) ;
    //the first arg is course_id or id.
}

function deleteLesson($indicator, $id, $pdo) {
    $query = "DELETE FROM lessons WHERE $indicator = :id";
    $stmt = $pdo->prepare($query);
    $stmt -> bindValue(':id', $id);
    $stmt->execute();
}


if(isset($request)){

    if(isset($request['deleteCourse'])){

        deleteCourse($request['deleteCourse'], $pdo);
        // $request['deleteCourse'] is the ID of the course.

        echo json_encode('Course deleted.');
        
    } else {
        echo json_encode('invalid');
    }
}

?>