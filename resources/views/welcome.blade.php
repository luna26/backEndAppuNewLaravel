<!doctype html>
<html>
<head>
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Laravel + React</title>

    <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <div id="root-react">

    </div>
    <script src="{{ mix('js/app.js') }}"></script>
    <script> 
        var csrf_token = '<?php //echo csrf_token(); ?>'; 
    </script>
</body>
</html>