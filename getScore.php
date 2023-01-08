<?php
    include('../db_connect.php');
    // if (!$conn) {
    //     die("Connection failed: " . mysqli_connect_error());
    // } elseif ($conn) {
    //     echo "connection!";
    // }

    // Process the "higherDist" data and update the scores
    if (isset($_POST['higherDist'])) {
        // Escape user input to avoid SQL injection attacks
        $higherDist = mysqli_real_escape_string($conn, $_POST['higherDist']);

        $sqlMin = "SELECT distance FROM dino_scores ORDER BY distance ASC LIMIT 0, 1";
        $resultMin = mysqli_query($conn, $sqlMin);

        if (mysqli_num_rows($resultMin) > 0) {
            // The table is not empty
            $rowMin = mysqli_fetch_assoc($resultMin);
            $minDist = $rowMin['distance'];

        if ($higherDist > $minDist) {
            $sql = "INSERT INTO dino_scores (initials, distance) VALUES ('DIN', '$higherDist')"; 
            mysqli_query($conn, $sql);
        }
        } else {
            // The table is empty
            // Insert the new score directly into the table
            $sql = "INSERT INTO dino_scores (initials, distance) VALUES ('DIN', '$higherDist')"; 
            mysqli_query($conn, $sql);
        }
        // Retrieve and update the scores
        $sql = "SELECT distance FROM dino_scores";
        $result = mysqli_query($conn, $sql);
        $rowCount = mysqli_fetch_assoc($result);
        $rowCount2 = $rowCount['distance'];
        // echo $rowCount . " ";
        if ($rowCount2 > 5) {
            $sql = "DELETE dino_scores FROM dino_scores INNER JOIN (SELECT distance FROM dino_scores ORDER BY distance DESC LIMIT 5, 1) AS t ON dino_scores.distance = t.distance";
            if (mysqli_query($conn, $sql)) {
                // echo "Record deleted successfully";
                $sql = "SELECT * FROM dino_scores ORDER BY distance DESC";
                $scores = mysqli_fetch_all(mysqli_query($conn, $sql), MYSQLI_ASSOC);
                echo json_encode($scores);
            } else {
                // echo "Error deleting record: " . mysqli_error($conn);
            }
        } else {
            $sql = "SELECT * FROM dino_scores ORDER BY distance DESC";
            $result = mysqli_query($conn, $sql);
            $scores = mysqli_fetch_all($result, MYSQLI_ASSOC);
            echo json_encode($scores);
        }


        // // Echo the updated scores as an HTML string
        // $html = '';
        // foreach ($scores as $score) {
        //     $html .= '<li>';
        //     $html .= htmlspecialchars($score['initials']) . ' ' . htmlspecialchars($score['distance']);
        //     $html .= '</li>';
        // }
        // echo $html;
    }
    // // free result from memory
    // mysqli_free_result($result);

    // //close connection
    // mysqli_close($conn);
?>