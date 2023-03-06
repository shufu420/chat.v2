<?php

$host = "comet-darkchat.com";
$user = "3967";
$password = "tvEVzMlPX1h6D5GinA1LQ27pYoPn8SI9cnXr5DFOZDJcsvzzXd9WkYeeyDRJWrrN";

$comet = mysqli_connect($host, $user, $password, "CometQL_v1");

if(mysqli_errno($comet))
{
    echo "Error:".mysqli_error($link);
}

$msg = Array( "name" => $_POST["name"], "text"  => $_POST["text"] );
$msg = json_encode($msg);
$msg = mysqli_real_escape_string($comet, $msg);

$query = "INSERT INTO pipes_messages (name, event, message)" .
  "VALUES('simplechat', 'newMessage', '".$msg."')";
 
mysqli_query($comet, $query); 

if(mysqli_errno($comet))
{
    echo "Error:".mysqli_error($comet);
} 
else
{
    echo "ok";
}
