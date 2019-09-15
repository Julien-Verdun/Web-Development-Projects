/*
TO-DO LIST

Mettre des couleurs sur les cases plutot que des chiffres ou une image aleatoirement pour rendre le jeu plus ludique que simplement organiser les chiffres. 



Faire une fonction qui donne les 2 indexes a inverser et les coordonnees a modifier ou alors la direction du mouvement afin de bouger les cases.


Il faut cliquer sur une case pour choisir la direction du mouvement, si ce n'est pas une des cases suceptibles de bouger, on ne fait rien, sinon on bouge.

Rajouter la possibilité de donner le mouvement avec la souris.


*/

var case1 = document.getElementById("case1");
var case2 = document.getElementById("case2");
var case3 = document.getElementById("case3");
var case4 = document.getElementById("case4");
var case5 = document.getElementById("case5");
var case6 = document.getElementById("case6");
var case7 = document.getElementById("case7");
var case8 = document.getElementById("case8");
var case9 = document.getElementById("case9");
var case10 = document.getElementById("case10");
var case11 = document.getElementById("case11");
var case12 = document.getElementById("case12");
var case13 = document.getElementById("case13");
var case14 = document.getElementById("case14");
var case15 = document.getElementById("case15");

var window_taquin = document.getElementById("body");


var cases = [case1,case2,case3,case4,case5,case6,case7,case8,case9,case10,case11,case12,case13,case14,case15];


var pas = 75;

// au passage sur la case faire une petite translation vers le haut pour faire style de soulever la case

//mettre e en parametre et recupere e.target qui est passé dans la fonction move. 




for (var i = 0; i < cases.length ; i++) {
    
    cases[i].addEventListener('mouseover',function() {
        this.style.background = "#1111AA";
        var tr_x = Number(this.getAttribute("trx"));
        var tr_y = Number(this.getAttribute("try"));
        this.style.transform="translate(" + tr_x + "px,"+ (tr_y-5) + "px)";
    });
    
    cases[i].addEventListener('mouseout',function() {
        this.style.background= "#BBBBBB";
        var tr_x = Number(this.getAttribute("trx"));
        var tr_y = Number(this.getAttribute("try"));
        this.style.transform="translate("+tr_x+"px,"+tr_y+"px)";
    });
    
    cases[i].addEventListener('click', function(e) {
        move(Number(e.target.getAttribute("nb")),Number(e.target.getAttribute("pos")));
    });
}

window_taquin.addEventListener('keypress', function(e) {
    move_keyboard(e.code);
});

/*
case1.addEventListener('mouseover',function() { this.style.background = "#1111AA"; });
case1.addEventListener('mouseout',function() { this.style.background= "#BBBBBB"; });

case1.addEventListener('click', function(e) {
    move(Number(e.target.getAttribute("nb")),e.target.getAttribute("pos"));
});                


case2.addEventListener('mouseover',function() { this.style.background = "#1111AA"; });
case2.addEventListener('mouseout',function() { this.style.background= "#BBBBBB"; });
//case2.addEventListener('click',move(Number(case2.getAttribute("nb"),case2.getAttribute("pos"))),true);





case3.addEventListener('mouseover',function() { this.style.background = "#1111AA"; });
case3.addEventListener('mouseout',function() { this.style.background= "#BBBBBB"; });
//case3.addEventListener('click',move(Number(case3.getAttribute("nb"),case3.getAttribute("pos"))),true);





case4.addEventListener('mouseover',function() { this.style.background = "#1111AA"; });
case4.addEventListener('mouseout',function() { this.style.background= "#BBBBBB"; });
//case4.addEventListener('click',move(Number(case4.getAttribute("nb"),case4.getAttribute("pos"))),true);





case5.addEventListener('mouseover',function() { this.style.background = "#1111AA"; });
case5.addEventListener('mouseout',function() { this.style.background= "#BBBBBB"; });
//case5.addEventListener('click',move(Number(case5.getAttribute("nb"),case5.getAttribute("pos"))));





case6.addEventListener('mouseover',function() { this.style.background = "#1111AA"; });
case6.addEventListener('mouseout',function() { this.style.background= "#BBBBBB"; });
//case6.addEventListener('click',move(Number(case6.getAttribute("nb"),case6.getAttribute("pos"))),true);





case7.addEventListener('mouseover',function() { this.style.background = "#1111AA"; });
case7.addEventListener('mouseout',function() { this.style.background= "#BBBBBB"; });
//case7.addEventListener('click',move(Number(case7.getAttribute("nb"),case7.getAttribute("pos"))),true);





case8.addEventListener('mouseover',function() { this.style.background = "#1111AA"; });
case8.addEventListener('mouseout',function() { this.style.background= "#BBBBBB"; });
//case8.addEventListener('click',move(Number(case8.getAttribute("nb"),case8.getAttribute("pos"))));





case9.addEventListener('mouseover',function() { this.style.background = "#1111AA"; });
case9.addEventListener('mouseout',function() { this.style.background= "#BBBBBB"; });
//case9.addEventListener('click',move(Number(case9.getAttribute("nb"),case9.getAttribute("pos"))),true);





case10.addEventListener('mouseover',function() { this.style.background = "#1111AA"; });
case10.addEventListener('mouseout',function() { this.style.background= "#BBBBBB"; });
//case10.addEventListener('click',move(Number(case10.getAttribute("nb"),case10.getAttribute("pos"))),true);





case11.addEventListener('mouseover',function() { this.style.background = "#1111AA"; });
case11.addEventListener('mouseout',function() { this.style.background= "#BBBBBB"; });
//case11.addEventListener('click',move(Number(case11.getAttribute("nb"),case11.getAttribute("pos"))),true);



case12.addEventListener('mouseover',function() { this.style.background = "#1111AA"; });
case12.addEventListener('mouseout',function() { this.style.background= "#BBBBBB"; });
//case12.addEventListener('click',move(Number(case12.getAttribute("nb"),case12.getAttribute("pos"))));





case13.addEventListener('mouseover',function() { this.style.background = "#1111AA"; });
case13.addEventListener('mouseout',function() { this.style.background= "#BBBBBB"; });
//case13.addEventListener('click',move(Number(case13.getAttribute("nb"),case13.getAttribute("pos"))));




case14.addEventListener('mouseover',function() { this.style.background = "#1111AA"; });
case14.addEventListener('mouseout',function() { this.style.background= "#BBBBBB"; });
//case14.addEventListener('click',move(Number(case14.getAttribute("nb"),case14.getAttribute("pos"))));





case15.addEventListener('mouseover',function() { this.style.background = "#1111AA"; });
case15.addEventListener('mouseout',function() { this.style.background= "#BBBBBB"; })
//case15.addEventListener('click',move(Number(case15.getAttribute("nb"),case15.getAttribute("pos"))));


*/




var pos_empty_square = 16;



function can_move_square(pos_square) {
    if (pos_square === pos_empty_square+1 || pos_square === pos_empty_square-1 || pos_square === pos_empty_square+4 || pos_square === pos_empty_square-4) {
        return true;   
    } else {
        return false;
    }
}


function move(nb_square,pos_square) {
    /*
    e.stopPropagation();
    var pos_square= e.target;
    */
    if (can_move_square(pos_square)){
        move_squares(nb_square,pos_square);
    }
}


function pos_to_x_y(pos) {
    var ligne = Math.trunc((pos-1)/4)+1;
    var col = 1 + (pos-1)%4;
    return [col,ligne];
}



function move_keyboard(keyValue) {
    var pos_square = -10;
    //"ArrowDown"
    if (keyValue === "KeyS") {
        //si case vide pas dans les 4 premières
        if (pos_empty_square>4) {
            pos_square = pos_empty_square-4;
        }
    } //"ArrowUp"
    else if (keyValue === "KeyW") {
        //si case vide pas dans les 4 dernières
        if (pos_empty_square < 13) {
            pos_square = pos_empty_square+4;
        }
    } //"ArrowLeft"
    else if (keyValue === "KeyA") {
        //si case vide pas sur les bords droits
        if (pos_empty_square % 4 != 0) {
            pos_square = pos_empty_square+1;
        }
    } //"ArrowRight"
    else if (keyValue === "KeyD") {
        //si case vide pas sur les bords droits
        if (pos_empty_square %4 != 1) {
            pos_square = pos_empty_square-1;
        }  
    } //Pas la bonne touche
    else {
        pos_square = -10;
    }
    // Si on a appuyé sur une bonne touche et que la case vide est bien positionné
    if (pos_square !== -10) {
        var nb_square = 0;
        for (var i=0 ; i < cases.length ; i++) {
            if (Number(cases[i].getAttribute("pos")) === pos_square) {
                nb_square = Number(cases[i].getAttribute("nb"));
            }
        }
        if (nb_square === 0){
            nb_square += 15;
        }
        move_squares(nb_square,pos_square);
    }
}


function move_squares(nb_case1,pos_case1){
    /*
        This function takes 2 squares, square number nb_case1 and square number nb_case2, and the direction of the switch (in line or in column), switchs both squares and changes the parameters of the squares.
    */
    // We find out direction (depending on direction between clicked square and empty square)

    var [x1,y1] = pos_to_x_y(pos_case1);
    var [x2,y2] = pos_to_x_y(pos_empty_square);

    
    // translate (selon ligne + droite - gauche ; selon colonne + bas - haut)
    var tr_x = Number(cases[nb_case1-1].getAttribute("trx"));
    var tr_y = Number(cases[nb_case1-1].getAttribute("try"));
    tr_x += pas*(x2-x1);
    tr_y += pas*(y2-y1);
    cases[nb_case1-1].setAttribute("trx",tr_x);
    cases[nb_case1-1].setAttribute("try",tr_y);
    cases[nb_case1-1].setAttribute("pos",pos_empty_square);
    cases[nb_case1-1].style.transform = "translate("+ tr_x + "px," + tr_y + "px)";
    
    pos_empty_square = pos_case1;
}








function in_list(pos,distrib) {
    for ( var i = 0 ; i < distrib.length ; i++ ) {
        if (pos === distrib[i]) {
            return true;
        }
    }
    return false;
}


function missing_square(distrib) {
    for (var i = 1 ; i <= 16 ; i++ ) {
        if (in_list(i,distrib) === false) {
            return i;
        }
    }
    
}

function new_distribution(){
    distrib = [];
    while (distrib.length < 15){
        pos = 1+Math.round(15*Math.random())
        if (in_list(pos,distrib) === false) {
            distrib.push(pos);
        }
    }
    return distrib;
}


function randomise_square(){
    new_distrib = new_distribution();
    for (var i = 0 ; i < new_distrib.length ; i++) {
        var [x1,y1] = pos_to_x_y(Number(cases[i].getAttribute("pos")));
        var [x2,y2] = pos_to_x_y(new_distrib[i]);
        
        var tr_x = Number(cases[i].getAttribute("trx"));
        var tr_y = Number(cases[i].getAttribute("try"));
        
        tr_x += pas*(x2-x1);
        tr_y += pas*(y2-y1);
        
        cases[i].setAttribute("trx",tr_x);
        cases[i].setAttribute("try",tr_y);
        cases[i].setAttribute("pos",new_distrib[i]);
        cases[i].style.transform = "translate("+ tr_x + "px," + tr_y + "px)";
    
    pos_empty_square = missing_square(new_distrib);
    
    }
}

















function to_exa(number)
{
  if (number < 0)
  {
    number = 0xFFFFFFFF + number + 1;
  }
  return Number(number).toString(16).toUpperCase();
}



function change_color(color,value){
    if (color === "red") {
        document.getElementById("range_value_red").innerHTML = Math.trunc(10000*value/255)/100;
        document.getElementById("input_range_red").setAttribute("value",value);
        
    } else if (color === "green") {
        document.getElementById("range_value_green").innerHTML = Math.trunc(10000*value/255)/100;
        document.getElementById("input_range_green").setAttribute("value",value);
        
    } else if (color === "blue") {
        document.getElementById("range_value_blue").innerHTML = Math.trunc(10000*value/255)/100;
        document.getElementById("input_range_blue").setAttribute("value",value);
        
    }
    
    for (var i = 0; i< cases.length; i ++) {
        var red = to_exa(document.getElementById("input_range_red").getAttribute("value"));
        if (red.length < 2) {red = "0"+red;}
        var green = to_exa(document.getElementById("input_range_green").getAttribute("value"));
        if (green.length < 2) {green = "0"+green;}
        var blue = to_exa(document.getElementById("input_range_blue").getAttribute("value")) ;
        if (blue.length < 2) {blue = "0"+blue;}
        
        var new_colo = "#" + red + green + blue;
        cases[i].style.background = new_colo;
    }
}