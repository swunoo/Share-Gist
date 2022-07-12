<?php

require_once 'DBConnector.php';

$pdo = DBConnect::connect('share_gist');

$request = json_decode(file_get_contents('php://input'), true);

$fileId = time();

if(isset($request)){
    
    file_put_contents("./texts/$fileId.txt", $request['text']);

    if($request['mode'] === 0){
        
        addLesson($request, $fileId, $pdo);

    } else if ($request['mode'] === 1) {

        addCourse($request, $fileId, $pdo);
    
    }

    echo json_encode($request);

} else if (isset($_FILES)){ 
    
    // echo json_encode($_FILES);

    if(isset($_FILES['media'])) {

        $imageId = storeImage($_FILES['media'], $fileId);
        echo json_encode($imageId);

    } else if (isset($_FILES['video'])) {
        echo json_encode($_FILES['video']);
    }


} else {
    echo json_encode("Not a valid request");
}

function addLesson($request, $fileId, $pdo) {
    $query = "INSERT INTO lessons (course_id, title, text_link, video_link, duration, added_at) VALUES (:course, :title, $fileId, :video_link, :duration, CURDATE())";
    $stmt = $pdo->prepare($query);

    // TODO: COURSE NAME TO ID

    $stmt->bindValue(':course', $request['course']);
    $stmt->bindValue(':title', $request['title']);
    $stmt->bindValue(':video_link', $request['media']);
    $stmt->bindValue(':duration', $request['duration']);
    $stmt->execute();
}

function addCourse ($request, $fileId, $pdo) {
    $query = "INSERT INTO courses (owner_id, title, category, text_link, img_link, duration) VALUES (:owner_id, :title, :category, $fileId, :media, :duration)";
    
    $stmt = $pdo->prepare($query);

    // TODO: OWNER ACCOUNT TO ID

    $stmt->bindValue(':owner_id', 1);
    $stmt->bindValue(':title', $request['title']);
    $stmt->bindValue(':category', $request['category']);
    $stmt->bindValue(':media', $request['media']);
    $stmt->bindValue(':duration', $request['duration']);

    $stmt->execute();
}

function storeImage ($file, $fileId) {

  $fileName = $file['name'];
  $fileTmpName = $file['tmp_name'];
  $fileNameArr = explode('.', $fileName);

  $fileExt = strtolower(end($fileNameArr));
  $allowedExt = array('jpg', 'jpeg', 'png');

  if(in_array($fileExt, $allowedExt)){
    $newName = $fileId . "." . $fileExt;
    move_uploaded_file($fileTmpName, "./images/$newName");
    return $newName;
  } else {
    return 'not compatable';
  }

}



?>