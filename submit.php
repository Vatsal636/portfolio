<?php
    session_start();
    $conn = new mysqli("localhost", "root", "", "portfolio");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $name = $conn->real_escape_string($_POST['name']);
    $email = $conn->real_escape_string($_POST['email']);
    $message = $conn->real_escape_string($_POST['message']);

    $sql = "INSERT INTO contacts (name, email, message) VALUES ('$name', '$email', '$message')";
    if ($conn->query($sql) === TRUE) {
        $_SESSION['contact_success'] = "Thank you! Your message has been sent.";
    } else {
        $_SESSION['contact_success'] = "Oops! Something went wrong.";
    }

    $conn->close();
    header("Location: index.php#contact"); // Redirect back to contact section
    exit();
?>
