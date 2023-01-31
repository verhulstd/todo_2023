<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
  <style>
    pre {
      background-color: lightgrey;
    }
  </style>
</head>

<body>
  <pre>
      <?php
      print_r($_GET);
      ?>
    </pre>
  <h1>ONTVANGEN DATA</h1>

  <form method="GET" action="">

    <input type="text" name="voornaam" value="">
    <?php
    if (isset($_GET["voornaam"])) {
      echo "<h1>Gekozen naam: " . $_GET['voornaam'] . "</h1>";
    }
    ?>
    <button>GO</button>
  </form>
</body>

</html>