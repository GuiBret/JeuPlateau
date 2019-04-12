/*jshint esversion:6*/



class Arme {

    constructor(id, position) {

        this.id = id;

        this.position = position;

        switch(this.id) {

            case 1: // Arme standard

                this.degats = 10;

                this.nom = "Revolver";

            break;

            case 2:
                this.degats = 15;
                this.nom = "Fusil";
            break;
            case 3:
                this.degats = 20;
                this.nom = "Fusil à pompe";
            break;
            case 4:
                this.degats = 25;
                this.nom = "Lance-roquette";
            break;

        }
    }
/**
 * [getDesignArmeJoueur Récupère le chemin vers l'image du joueur portant l'arme qu'il vient de récupérer]
 * @return {string} Chemin vers l'image du joueur
 */
    getDesignArmeJoueur() {

            return "/p/JeuPlateau/img/j_arme"+ String(this.id)+ ".png";

    }

}
