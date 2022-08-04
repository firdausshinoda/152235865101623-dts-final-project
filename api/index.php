<?php
if (isset($_GET['url'])) {
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    $url = $_GET['url'];
    $param = '';
    if (!empty($_GET['query'])) {
        $param .= '?query='.$_GET['query'];
    }
    if (isset($_GET['premium']) && $_GET['premium'] != 2) {
        $param .= '&premium='.$_GET['premium'];
    }
    if (!empty($_GET['style']) && $_GET['style'] != 'all') {
        $param .= '&style='.$_GET['style'];
    }
    if (isset($_GET['count']) && !empty($_GET['count'])) {
        if (empty($param)) {
            $param .= '?count='.$_GET['count'];
        } else {
            $param .= '&count='.$_GET['count'];
        }
    }

    if (!empty($param)) {
        $url .= $param;
    }

    $baseURL = "https://api.iconfinder.com/v4".$url;
    $curl = curl_init();
    $headers = array(
        "Accept: application/json",
        "Authorization: Bearer X0vjEUN6KRlxbp2DoUkyHeM0VOmxY91rA6BbU5j3Xu6wDodwS0McmilLPBWDUcJ1",
        'Content-Type: application/json',
        'Access-Control-Allow-Origin: *'
    );
    curl_setopt($curl, CURLOPT_URL, $baseURL);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
    $response = curl_exec($curl);
    curl_close($curl); // Close the connection
    echo  $response;
//    echo $baseURL;
} else if (isset($_GET['download'])) {
    $baseURL = $_GET['download'];
    $filename = str_replace(":","",str_replace(" ","-",$_GET['name']));
    $ext = $_GET['ext'];

    $file_url = $baseURL;
    $destination_path = $filename.".".$ext;
    $headers = array(
        "Authorization: Bearer X0vjEUN6KRlxbp2DoUkyHeM0VOmxY91rA6BbU5j3Xu6wDodwS0McmilLPBWDUcJ1"
    );

    $fp = fopen($destination_path, "w+");

    $ch = curl_init($file_url);
    curl_setopt($ch, CURLOPT_FILE, $fp);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    $stmt = curl_exec($ch);
    $st_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    fclose($fp);

    if(file_exists($destination_path)) {
        header('Content-Description: File Transfer');
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="'.basename($destination_path).'"');
        header('Expires: 0');
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        header('Content-Length: ' . filesize($destination_path));
        flush(); // Flush system output buffer
        readfile($destination_path);
        die();
    }
}