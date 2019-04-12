/*jshint esversion:6*/

/*globals $:false */

class Grille {



    constructor(joueur1, joueur2) {

        this.grille = [];

        this.joueurs = [joueur1, joueur2];

        this.genGrille();

        this.genGrilleEcran();

    }

    /*
            FONCTIONS GRILLE BACKEND
    */
    genGrille() {

        var x = 0,

            y = 0,

            ligne = [],

            cases_grisees,

            case_actuelle;

        for (y = 0; y < 11; y += 1) {

            ligne = [];

            for (x = 0; x < 11; x += 1) {

                ligne.push("O");

            }

            this.grille.push(ligne);

        }



        cases_grisees = this.genCasesGrisees();

        for (case_actuelle of cases_grisees) { // On boucle ici pour éviter d'avoir à potentiellement reparcourir tout le tableau à chaque coup

            this.grille[case_actuelle[0]][case_actuelle[1]] = "X";

        }





        // Placement des joueurs sur le plateau



        var pos_joueurs = this.genPosJoueurs(),

            nb_joueur = 0;



        for(nb_joueur; nb_joueur < 2; nb_joueur += 1) {

            var x_joueur = pos_joueurs[nb_joueur][0],

                y_joueur = pos_joueurs[nb_joueur][1];

            this.grille[x_joueur][y_joueur] = String(nb_joueur+1);

        }



        // Placement des armes sur le plateau



        var armes = this.genPosArmes(),

            nb_arme = 0;



        for(nb_arme; nb_arme < 3; nb_arme += 1) {

            var x_arme = armes[nb_arme][0],

                y_arme = armes[nb_arme][1];



            this.grille[x_arme][y_arme] = String.fromCharCode(66+nb_arme); // Renvoie B, C, D

        }



    }



    genCasesGrisees() { // Fonction qui génèrera les emplacements des cases grisées

        var nb_case = 0,

            cases_grisees = [],

            verif_elem_array = false;



        for (nb_case; nb_case < 13; nb_case += 1) {

            var coords_gris = this.genXY();

            verif_elem_array = false;



            while(!verif_elem_array) {

                if(!this.elemDansArray(cases_grisees, coords_gris)) {

                        cases_grisees.push(coords_gris);

                        verif_elem_array = true;

                }

                else {

                    coords_gris = this.genXY();

                }

            }





        }





        return cases_grisees;



    }



    genPosJoueurs(){ // Fonction renvoyant la position des joueurs

        var pos_joueurs = [],

            nb_joueur = 0,

            verif_pos_joueur2 = false;



        pos_joueurs.push(this.genXY());

        this.joueurs[0].position = pos_joueurs[0];





        while(!verif_pos_joueur2) { // Si le joueur 2 est sur la même ligne / colonne que le joueur 1, on relancera la génération de position

             var pos_j2 = this.genXY(),

                 pos_j1 = pos_joueurs[0];



             if(Math.abs(pos_j2[0] - pos_j1[0]) >= 1 && Math.abs(pos_j2[1] - pos_j1[1]) >= 1) { // pos_j2[0] = x de j2, pos_j2[1] = y de j2

                    pos_joueurs.push(pos_j2);

                    verif_pos_joueur2 = true;

             } else {

                 pos_j2 = this.genXY();



             }

        }



        this.joueurs[1].position = pos_joueurs[1];

        return pos_joueurs;



    }





    genPosArmes() { // Fonction positionnant les armes

        var pos_armes = [],

            nb_arme = 0;



        for(nb_arme; nb_arme < 3; nb_arme += 1) {

            pos_armes.push(this.genXY());

        }



        return pos_armes;

    }



    genXY() { // Fonction générant une position [x;y] et vérifiant si elle n'est pas déjà occupée.

        var random_x = Math.floor((Math.random() * 10)),

            random_y = Math.floor((Math.random() * 10)),

            valid_casevide = false;





        while(!valid_casevide) {



            if(this.grille[random_x][random_y] === "O") { // Si l'emplacement n'est pas occupé

                    valid_casevide = true;

                }

                else {

                    random_x = Math.floor(Math.random() * 10);

                    random_y = Math.floor(Math.random() * 10);

                }

        }



        return [random_x, random_y];

    }



    calculDepDispos(position) { // Renvoie un tableau contenant les déplacements possibles du joueur



        var cases_dispo = [],

            cases_courantes, // Récupèrera les cases dispo de verifDeplacementDirection, sera itéré avec case_courante

            case_courante,

            direction = 1; // Utilisé dans le foreach pour ajouter à cases_dispo





        for(direction; direction < 5; direction += 1) {

            cases_courantes = this.verifDeplacementDirection(position, direction);



            for(case_courante of cases_courantes) {

                cases_dispo.push(case_courante);

            }

        }





        return cases_dispo;

    }



    verifDeplacementDirection(pos_depart, direction) { // Fonction renvoyant un tableau contenant les déplacements possibles dans une direction donnée (1: haut, 2: gauche, 3: bas, 4: droite)

        var continuer_dep = true,

            cases_dispo = [],

            case_actuelle,

            depart = (direction % 2 === 0) ? pos_depart[0] : pos_depart[1], // Si l'on cherche à voir les déplacements sur [gauche, droite], on met x comme index de référence, sinon y

            axe_inverse = (direction % 2 === 0) ? pos_depart[1] : pos_depart[0],

            actuel = (direction <= 2) ? depart - 1 : depart + 1; // Si l'on veut décrémenter l'index de référence (haut et gauche) ou incrémenter (bas et droite), on cherche la case immédiatement suivante







        while(continuer_dep) {

            if(Math.abs(actuel - depart) === 4 || actuel < 0 || actuel > 10) {

                continuer_dep = false;

            } else {

                case_actuelle = (direction % 2 === 0) ? this.grille[actuel][axe_inverse] : this.grille[axe_inverse][actuel];

                if(["X", "1", "2"].indexOf(case_actuelle) >= 0) { // Si la case sur laquelle on se trouve est noircie ou un joueur

                    continuer_dep = false;

                } else {

                    cases_dispo.push((direction % 2 === 0) ? [actuel, axe_inverse] : [axe_inverse, actuel]); // Même principe que pour l'initialisation de case_actuelle (TODO : améliorer ça)

                }



            }



            actuel = (direction <= 2) ? actuel - 1 : actuel + 1; // Pour explications, voir initialisation de actuel



        }

        return cases_dispo;

    }









    updatePosition(joueur, position) { // Mise à jour de la position du joueur sur la grille back, retour : arme (int, -1 si on n'est pas sur une arme, le niveau de l'arme sinon)



        var pos_actuelle = joueur.position,

            arme = -1;

        joueur.position = [parseInt(position[0]), parseInt(position[1])];





        if(this.grille[position[0]][position[1]] !== "O") { // Si on est sur une arme, on modifie la variable arme pour permettre au programme de savoir sur laquelle on a cliqué



            arme = this.transformerValeur(this.grille[position[0]][position[1]]);

        }



        if(joueur.ancienne_arme !== -1) { // Si le joueur avait ramassé une arme au tour précédent



            this.grille[pos_actuelle[0]][pos_actuelle[1]] = this.transformerValeur(joueur.ancienne_arme); // Donne [A, B, C, D]

            joueur.ancienne_arme = -1;



        } else {

            this.grille[pos_actuelle[0]][pos_actuelle[1]] = "O"; // On efface la trace du joueur sur son ancienne position

        }



        this.grille[position[0]][position[1]] = String(joueur.id); // On affiche la trace du joueur sur sa nouvelle



        return arme;



    }







    genGrilleEcran() {

        var grilleEcran = $("tbody"),

            x = 0,

            y = 0,

            grille_back = this.grille,

            armes = ["B", "C", "D"];



        for (y; y < 11; y += 1){

            var ligne = $("<tr></tr>");



            x = 0;



            for(x; x < 11; x++){



                var case_jeu = $("<td></td>"),

                    case_actuelle = grille_back[x][y];



                case_jeu.attr("id", String(x)+ "-"+ String(y));



                if(case_actuelle == "X") { // On applique la classe grisee qui inversera les couleurs

                    case_jeu.addClass("grisee");



                }

                if(case_actuelle === "1" || case_actuelle === "2") { // Ajout des images des joueurs

                    var image_joueur = $("<img></img>"),

                        nb_joueur = grille_back[x][y];





                    image_joueur.attr("src", "/p/JeuPlateau/img/j_arme1.png");

                    image_joueur.addClass("joueur"+ nb_joueur);

                    case_jeu.append(image_joueur);



                } else if(armes.indexOf(case_actuelle) >= 0) { // Si on tombe sur une arme



                    var nb_arme = case_actuelle.charCodeAt(0) - 63, // Donnera [65, 66, 67, 68] - 63 = 1, 2,3,4, permet de trouver facilement l'arme4

                       img_arme = $("<img></img>");



                    img_arme.attr("src", "/p/JeuPlateau/img/arme"+String(nb_arme-1)+".png");

                    img_arme.addClass("img_arme");



                    case_jeu.append(img_arme);



                }
                ligne.append(case_jeu);

            }

            grilleEcran.append(ligne);

        }



    }



    /*







            FONCTIONS GRILLE FRONTEND







    */



    updateGrilleEcran(joueur_actuel, anc_position, position) {



        var image_joueur = $("<img></img>"),

            anc_case = $("#"+anc_position.join("-")),

            nv_case = $("#"+ position.join("-"));







        image_joueur.attr("src", joueur_actuel.design);



        image_joueur.addClass("joueur"+ String(joueur_actuel.id)); // On applique la classe au joueur (permettant le changement de couleur)





        anc_case.html(""); // On efface la case actuelle

        var anc_case_back = this.grille[anc_position[0]][anc_position[1]];

        if(anc_case_back !== "O") {

            var img_arme = $("<img></img>");

            img_arme.attr("src", "/p/JeuPlateau/img/arme"+ String(this.transformerValeur(anc_case_back))+ ".png");

            img_arme.addClass("img_arme");

            anc_case.html(img_arme);

       }





       nv_case.html(image_joueur); // On applique l'image à la nouvelle case



        $(".dep_possible").removeClass("dep_possible"); // On efface les déplacements possibles







    }



    afficherDepDispos(position, _callback) { // Fonction ajoutant les déplacements possibles sur la grille à l'écran

        var dep_dispos = this.calculDepDispos(position),

            dep_dispo = [];



        for(dep_dispo of dep_dispos) {

            var case_deplacement = $("#"+ dep_dispo.join("-")),

                enfants = []; // Enfants potentiels de la case (joueur ou arme)

            case_deplacement.addClass("dep_possible");



            if(case_deplacement.children().length > 0) { // Si l'utilisateur clique sur une case contenant une arme



                if(case_deplacement.find("img.img_arme").length !== 0) { // Si un des déplacements disponibles contient une arme ...

                    case_deplacement.children("img.img_arme").addClass("dep_possible"); // On permet à l'utilisateur de cliquer dessus

                }

            }

        }



        $(".dep_possible").on("click", _callback);





    }







    /*





        FONCTIONS UTILITAIRES







    */

    elemDansArray(array, element) { // Workaround de indexOf dans un tableau 2d

        var index_element = 0;



        for(index_element; index_element < array.length; index_element += 1) {



            var array_element = array[index_element];



            if(array_element[0] == element[0] && array_element[1] == element[1]) {

                return true;

            }

        }



        return false;

    }



    transformerValeur(val) { // Fonction transformant un caractère en nombre ou inversement



        if(typeof(val) === "string") {

            return val.charCodeAt(0) - 64;

        } else {

            return String.fromCharCode(val + 64);

        }

    }





    estEnCombat() {



        var pos_j1 = this.joueurs[0].position,

            pos_j2 = this.joueurs[1].position;





        return Math.abs(pos_j1[0] - pos_j2[0]) === 0 &&  Math.abs(pos_j1[1] - pos_j2[1]) === 1 || Math.abs(pos_j1[0] - pos_j2[0]) === 1 &&  Math.abs(pos_j1[1] - pos_j2[1]) === 0;



    }



}
