<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio</title>
    <link rel="stylesheet" href="../ressources/style.css">

    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
</head>
<body>
<header>
    <nav class="containerH">
        <div class="parent-link">
            <a href="./accueil.php" class="social-links">Présentation</a>
            <a href="./projets.php" class="social-links">Projets</a>
            <a href="./cv.php" class="social-links">CV</a>
            <a href="./competences.php" class="social-links">Compétences</a>
            <a href="./contact.php" class="social-links">Contact</a>
        </div>
    </nav>
</header>
<main>
    <div class="background">
    <div class="container">
        <div class="screen">
            <div class="screen-header">

                <div class="screen-header-right">
                    <div class="screen-header-ellipsis"></div>
                    <div class="screen-header-ellipsis"></div>
                    <div class="screen-header-ellipsis"></div>
                </div>
            </div>
            <div class="screen-body">
                <div class="screen-body-item left">
                    <div class="app-title">
                        <span>CONTACTEZ </span>
                        <span>MOI</span>
                    </div>
                </div>
                <div class="screen-body-item">
                    <div class="app-form">
                        <div class="app-form-group">
                            <input class="app-form-control" placeholder="NOM">
                        </div>
                        <div class="app-form-group">
                            <input class="app-form-control" placeholder="EMAIL">
                        </div>
                        <div class="app-form-group message">
                            <input class="app-form-control" placeholder="MESSAGE">
                        </div>
                        <div class="app-form-group buttons">
                            <button class="app-form-button" onclick="sendEmail()">ENVOYER</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</main>

</body>
</html>

<script>
    function sendEmail() {
        var name = document.querySelector('.app-form-control[placeholder="NAME"]').value;
        var email = document.querySelector('.app-form-control[placeholder="EMAIL"]').value;
        var message = document.querySelector('.app-form-control[placeholder="MESSAGE"]').value;

        var subject = "Portfolio Contact Form Submission";
        var mailtoLink = "mailto:lixmp7@gmail.com" +
            "?subject=" + encodeURIComponent(subject) +
            "&body=" + encodeURIComponent("Name: " + name + "\nEmail: " + email + "\nMessage: " + message);

        window.location.href = mailtoLink;
    }
</script>
