/*jshint esversion:6*/

class Joueur {
    constructor(id, nom) {
        this.nom = nom;
        this.id = id;
        this.arme = new Arme(1);
        this.design = this.arme.getDesignArmeJoueur();
        this.posture = false; // Attaque : true, défense : false
        this.pv = 100;
        this.position = [-1, -1],
        this.ancienne_arme = -1; // Sera utilisé en cas de ramassage d'une arme, pour la remettre à l'emplacement d'origine
    }
    
    updateArme(id_arme) {
        
        this.ancienne_arme = this.arme.id; // On met ici le niveau de l'ancienne arm

        this.arme = new Arme(id_arme); // On update l'objet arme

        this.design = this.arme.getDesignArmeJoueur(); // On update le design de l'arme
    }
    
    
    updatePosture(bool_posture) {
        this.posture = bool_posture;
    }
    
    recevoirDegats(arme_ennemi) {
        var degats = arme_ennemi.degats;
        
        if(!this.posture) {
            degats = Math.round(degats/2);
        }
        
        if(this.pv < degats) 
            this.pv = 0;
         else 
            this.pv -= degats;
    }
}