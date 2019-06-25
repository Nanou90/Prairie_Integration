var selectableWords =           // Liste de mots
    [
        "reggae",
        "scroll",
        "nomade",
        "bottes",
        "ecrans",
        "clones",
        "python",
        "wasabi",
        "vortex",
        "poulet",
    ];

const maxTries = 6;            // Nombre maximum d'essais qu'a le joueur
const maxParties = 5;           // Nombre maximum de parties
const maxPoints = 20;           // Nombre maximum de points

var guessedLetters = [];        // Stock les lettres que le joueur a utilisé
var currentWordIndex;           // Mot actuel à trouver
var guessingWord = [];          // Mot à trouver en cours de construction
var remainingGuesses = 0;       // Combien d'essais reste-t-il au joueur
var gameStarted = false;        // Flag to tell if the game has started - "Drapeau" pour dire si le jeu a commencé
var hasFinished = false;        // Flag for 'press any key to try again' - "Drapeau" pour 'Appuie sur une touche pour continuer'
var wins = 0;                   // Combien de victoires le joueur a-t-il accumulé
var points = 0;                 // Combien de points le joueur a-t-il accumulé
var parties = 1;                // Numéro de la partie en cours

// Reset our game-level variables - Réinitialiser les variables de niveau de jeu
function resetGame() {
    remainingGuesses = maxTries;
    gameStarted = false;

    // Utilisez Math.floor pour arrondir le nombre aléatoire à l'entier le plus proche
    currentWordIndex = Math.floor(Math.random() * (selectableWords.length));

    // Vider les tableaux
    guessedLetters = [];
    guessingWord = [];

    // S'assurer que l'image du pendu est effacé
    document.getElementById("hangmanImage").src = "";

    // Construire le mot à deviner et l'éliminer
    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        guessingWord.push("_");
    }
    // Cacher les images/textes de victoire ou de game-over
    document.getElementById("pressKeyTryAgain").style.cssText= "display: none";
    document.getElementById("gameover-image").style.cssText = "display: none";
    document.getElementById("youwin-image").style.cssText = "display: none";

    // Montrer l'affichage
    updateDisplay();
};

//  Mise à jour de l'affichage dans la page HTML
function updateDisplay() {

    document.getElementById("totalWins").innerText = wins;
    document.getElementById("totalPoints").innerText = points;
    document.getElementById("partyNumber").innerText = parties;
    document.getElementById("currentWord").innerText = "";
    for (var i = 0; i < guessingWord.length; i++) {
        document.getElementById("currentWord").innerText += guessingWord[i];
    }
    document.getElementById("remainingGuesses").innerText = remainingGuesses;
    document.getElementById("guessedLetters").innerText = guessedLetters;
    if(remainingGuesses <= 0) {
        document.getElementById("gameover-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText = "display:block";
        document.getElementById("hangmanImage").src = "";
        hasFinished = true;
    }
};

// Mise à jour de l'image du pendu en fonction du nombre d'essais
function updateHangmanImage() {
    document.getElementById("hangmanImage").src = "/home/anne/Documents/Jeu_pendu/pendu" + (maxTries - remainingGuesses) + ".png";
};

document.onkeydown = function(event) {
    // Si nous terminons une partie, effacer une frappe et réinitiliser
    if((hasFinished) && (parties<5)) {
        resetGame();
        hasFinished = false;
        parties++;  //Rajout +1 au numéro de la partie
    } else {
        // Vérifiez que vous avez appuyé sur a-z
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            makeGuess(event.key.toLowerCase());
        }
    }
    endGame();
};

function makeGuess(letter) {
    if (remainingGuesses > 0) {
        if (!gameStarted) {
            gameStarted = true;
        }

        // S'assurer que nous n'avons pas encore utilisé cette lettre
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            evaluateGuess(letter);
        }
    }

    updateDisplay();
    checkWin();
};

// Cette fonction prend une lettre et trouve toutes les occurrences d'apparence dans la chaîne et les remplace dans le mot à trouver
function evaluateGuess(letter) {
    // Tableau pour stocker les positions des lettres dans une chaîne
    var positions = [];

    // Parcoure en boucle les mots en recherchant toutes les occurrences des lettres devinées, stockez les index dans un tableau
    for (var i = 0; i < selectableWords[currentWordIndex].length; i++) {
        if(selectableWords[currentWordIndex][i] === letter) {
            positions.push(i);
        }
    }

    // Si il n'y a pas d'indices, supprime une supposition et met à jour l'image du pendu
    if (positions.length <= 0) {
        remainingGuesses--;
        updateHangmanImage();
    } else {
        // Parcours en boucle tous les indices et remplacer le '_' par une lettre
        for(var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};

function checkWin() {
    if(guessingWord.indexOf("_") === -1) {
        document.getElementById("youwin-image").style.cssText = "display: block";
        document.getElementById("pressKeyTryAgain").style.cssText= "display: block";
        document.getElementById("hangmanImage").src = "";
        wins++;
        points = points+4;  // Rajout de 4 points au score
        hasFinished = true;
    }
};

// Fonction pour les phrases en fonction du score
function endGame(){
    if (parties == maxParties){
    hasFinished = true;
    document.getElementById("score").innerText = "score :" + points + "/20";
      if (points<=8) {
        document.getElementById("phrasescore").innerText = "T'es un noob !";
      }
      if ((points>=9) && (points<=16)) {
        document.getElementById("phrasescore").innerText = "c'était si dur que ça ?";
      }
      if(points>=17) {        document.getElementById("phrasescore").innerText = "Bien joué !";
      }
    }
};
