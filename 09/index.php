<?php
define('DATAFILE','data.json');
function save_to_file($file,$data){
    file_put_contents($file,json_encode($data));
}

function load_from_file($file){
    return json_decode(file_get_contents($file),true);
}

$input = [];
$errors = [];

$expenses = load_from_file(DATAFILE);

function not_empty(&$array,$key){
    return isset($array[$key]) && !empty($array[$key]);
}

if($_POST){
    if(not_empty($_POST,'desc')){
        $input['desc'] = $_POST['desc'];
    }else{
        $errors[] = 'Nem adtál meg leírást!';
    }

    if(not_empty($_POST,'amount')){
        if(!is_numeric($_POST['amount'])){
            $input['amount'] = $_POST['amount'];
        }else{
            $errors[] = 'A lovetta nem szám!';
        }
    }else{
        $errors[] = 'Nem adtál meg lovettát!';
    }
    //Ha nincs hiba
    if(!$errors){
        $expenses[] = ["desc"=>$input['desc'],"amount"=>$input['amount']];
        save_to_file(DATAFILE,$expenses);
    }
}

?>
<!doctype html>

<meta charset="utf-8">
<title>Soros György Szimulátor</title>
<link rel="stylesheet" href="style.css">


<div class="container">
    <form method="post" class="form-horizontal">
        <div class="form-group">
            <label class="control-label col-sm-2" for="inputDefault">Igyál vizet, Gyuribá fizet!</label>
            <div class="col-sm-6">
                <input type="text" name="amount" class="form-control" id="inputDefault">
            </div>
            <div class="col-sm-2">Péz</div>
        </div>
        <div class="form-group">
            <label class="control-label col-sm-2" for="inputDefault">Mirekéne</label>
            <div class="col-sm-6">
                <input type="text" class="form-control" id="inputDefault">
            </div>
            <div class="col-sm-2">
                <input class="btn btn-primary" name="desc" type="submit" value="Rögzít">
            </div>
        </div>
    </form>

    <table class="table table-striped table-hover ">
        <thead>
            <tr>
            <th>#</th>
            <th>Leírás</th>
            <th>Összeg</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach((array)$expenses as $k => $row):?>
                <tr><td><?=$k?></td><td><?=$row['desc']?></td><td><?=$row['amount']?></td></tr>
            <?php endforeach;?>
        </tbody>
    </table> 
</div>