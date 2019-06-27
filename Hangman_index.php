<?php
// information pour la connection à le DB
$host = 'localhost';
$user = 'anne';
$pass = 'nanou';
$db = 'loginpendu';
$url = 'Hangman.html';
    
// connection à la DB
$link = mysql_connect ($host,$user,$pass) or die ('Erreur : '.mysql_error() );
mysql_select_db($db) or die ('Erreur :'.mysql_error());

if(isset($_POST) && !empty($_POST['login']) && !empty($_POST['password'])) {
    extract($_POST);
    // on recupère le password de la table qui correspond au login du visiteur
    $sql = "select Password from log_member where login='".$Pseudo."'";
    $req = mysql_query($sql) or die('Erreur SQL !<br>'.$sql.'<br>'.mysql_error());
  
    $data = mysql_fetch_assoc($req);
  
    if($data['password'] != $Password) {
      echo '<p>Mauvais login / password. Merci de recommencer</p>';
      include('Hangman_index.htm'); // On inclut le formulaire d'identification
      exit;
    }
    else {
      session_start();
      $_SESSION['login'] = $Pseudo;
      
      echo 'Vous etes bien logué';
      include($url) // ici vous pouvez afficher un lien pour renvoyer
      // vers la page d'accueil de votre espace membres 
    }    
  }
  else {
    echo '<p>Vous avez oublié de remplir un champ.</p>';
     include('Hangman_index.htm'); // On inclut le formulaire d'identification
     exit;
  }
?>