<?php
require_once "../php/Common.php";
$db = new Common();

header('Content-type: text/plain; charset= UTF-8');

if(isset($_POST['sql'])){
    $sql = $_POST['sql'];
    $str = "\n\n\nAJAX REQUEST SUCCESS\nSQL:".$sql."\n";
    
    $data = $db->db_sql($sql);
    
    if($data == null){
        //$dump = "\n"."該当データなし";
        $dump = "該当データなし";
    }else {
        //$dump = "\n".var_dump($data);
        $dump = var_dump($data);
    }
    //$result = nl2br($str);
    //echo $result;
    echo $dump;
}else{
    echo 'FAIL TO AJAX REQUEST';
}


?>
