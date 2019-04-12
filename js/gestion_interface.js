class Interface {

    constructor(joueur1, joueur2) {
        $("#interface").css("display", "inline");

        $("#nom_j1").html(joueur1.nom);

        $("#nom_j2").html(joueur2.nom);

    }

    genInterfaceCombat(joueur_actuel) { // Affiche les boutons attaque et défense

        var $div_combat = $("<div class='col-12 d-flex justify-content-around'></div>"),

            $btn_attaque = $("<button class='float-left' id='btn_attaque'>Attaquer</button>"),

            $btn_defense = $("<button class='float-right' id='btn_defense'>Défendre</button>"),

            id_joueur = joueur_actuel.id;

        $div_combat.attr("id", "boutons_combat");
        $div_combat.css("display", "none");

        $div_combat.append($btn_attaque);

        $div_combat.append($btn_defense);

        $("#interface_" + String(id_joueur)).append($div_combat);

        $div_combat.slideDown(200);

    }

    updateInterfaceCombat(ennemi, _callback) { // Met à jour la barre de vie et le texte des PV, on envoie l'id de l'ennemi pour facilement retrouver les données

        $("#barre_j" + String(ennemi.id)).animate({
            "value": ennemi.pv
        }, 800, "swing", function() {

            _callback();

        });

        $("#vie_j" + String(ennemi.id)).html(String(ennemi.pv) + " / 100 PV");

    }

    updateArme(joueur, arme) { // Fonction mettant à jour le nom, l'image et les degâts de l'arme dans l'interface

        $(`#nom_arme_j${joueur.id}`).html(joueur.arme.nom);

        $(`#degats_arme_j${joueur.id}`).html(joueur.arme.degats);

        $(`.joueur${joueur.id}`).attr("src", joueur.design);

        $(`.interface-joueur${joueur.id}`).attr("src", joueur.design);

    }

}
