var total = 0;
var current_number = 0;
var liste_x = [];
var operations_texte = "";

var total_display = document.getElementById('total_display');


/*
TO-DO LIST

Probleme avec la division par un nombre a plusieurs chiffre : devient NaN après 2 chiffres.

Verifier les parentheses


*/



var button1 = document.getElementById('button1');
var button2 = document.getElementById('button2');
var button3 = document.getElementById('button3');
var button4 = document.getElementById('button4');
var button5 = document.getElementById('button5');
var button6 = document.getElementById('button6');
var button7 = document.getElementById('button7');
var button8 = document.getElementById('button8');
var button9 = document.getElementById('button9');
var buttonp = document.getElementById('buttonp');
var button = document.getElementById('buttonm');
var buttonx = document.getElementById('buttonx');
var buttond = document.getElementById('buttond');
var buttonpg = document.getElementById('buttonpg');
var buttonpd = document.getElementById('buttonpd');
var buttonf = document.getElementById('button');
var buttonpo = document.getElementById('buttonpo');
var case_egale = document.getElementById('cage_egale');











function is_sign(x){
    var list_sign = ["+","-","x","/"];
    if (list_sign.indexOf(x) !== -1) {
        return true;
    } else {
        return false;
    }
}

function change_current_number(x){
    // Si on clique sur un signe operatoire
    if (is_sign(x)) {
        // si la liste contient un seul element et que ce n'est pas un signe operatoire, on ajoute le signe normalement
        if (liste_x.length === 1 && is_sign(liste_x[liste_x.length-1]) === false) {
            
            liste_x.push(x);
            operations_texte += x;
            
        } 
        // si l'élément précédent de la liste est un signe, on le remplace par le signe actuel
        else if (liste_x.length >= 1 && is_sign(liste_x[liste_x.length-1]) === true) {
            
            liste_x[liste_x.length-1] = x;
            operations_texte = operations_texte.substr(0,operations_texte.length - 1) + x;
            
        }
    }
    // si on ne clique pas sur un signe opératoire
    else if (is_sign(x) === false) {
        //si on clique sur un nombre
        if (isNaN(Number(x)) === false) {
            // si on a deja clique sur un nombre precedemment
            if (liste_x.length >= 1 && isNaN(Number(liste_x[liste_x.length-1])) === false) {
                operations_texte +=x;
                x = Number(x);
                var i = 0;
                while (liste_x.length >= 1 && isNaN(Number(liste_x[liste_x.length-1])) === false) {
                    i++;
                    x += (Number(liste_x[liste_x.length-1])*10**i);
                    liste_x.pop();
                }
                liste_x.push(x);           
            }
            // si on avait pas cliqué sur un nombre a l'étape d'avant, on l'ajoute simplement à la suite
            else {
                liste_x.push(Number(x));
                operations_texte += x;
            }
        }
        // si on ne clique pas sur un nombre (et pas un signe opératoire)
        else if (isNaN(Number(x))) {
            // si on clique sur un point
            if (x === ".") {
                /*
                
                
                
                
                
                */
            }
            // si on ne clique pas sur un point
            else if (x === "(" | x === ")") {
                liste_x.push(x);
                operations_texte += x;
            }
            
            else {
                console.log("Sorry, I didn't understand your request !!")  
            }
            
        }
    }
    
    current_number = x;
    total_display.innerHTML = x.toString();
    console.log("Current_number : ",current_number);
    console.log("Liste_x : ",liste_x);
    console.log("Operations_texte : ",operations_texte);
}




function delete_last() {
    liste_x.pop();
    if (liste_x.length >= 1) {
        current_number = liste_x[liste_x.length-2];
        operations_texte = operations_texte.substr(0,operations_texte.length-1);
    } else {
        current_number = 0;
        operations_texte = "";
    }
    total_display.innerHTML = current_number; //.toString()
}



function new_operation(full_operation,ind_b,ind_e) {
    
}



function decode_operations() {
    console.log("Operations : ",liste_x);
    
    // Recherche d'une erreur dans la ligne
    for (var i = 0; i< liste_x.length ; i++) {
        if (is_sign(liste_x[i]) && is_sign(liste_x[i+1])) {
            alert("Operations non valide !");
        //completer la recherche d'erreur
        /*
        
        
        */
        }
    }
    
    // si la liste ne contient qu'un nombre, c'est le résultat, on le renvoie
    if (liste_x.length === 1 && isNaN(Number(liste_x[0])) === false) {
        return Number(liste_x[0]);
    }
    
    //recherche de parenthese dans la chaine d'operations
    for (var i = 0; i< liste_x.length ; i++) {
        //accolade ouvrante
        if (liste_x[i]==="(") {
            for (var j = i+1; i<liste_x.length; j++) {
                if (liste_x[j] === ")") {
                    //var sub_operation = decode_operations(operations.substr[i+1,j-1]);
                    //operations[i,j] = sub_operation;
                    console.log("Parentheses found");
                    var sub_number = decode_operations(liste_x.slice[i+1,j-1]);
                    liste_x = liste_x.slice(0,i).push(sub_number).concat(liste_x.slice(j+1,liste_x.length));
                    //liste_x[i,j] = +sub_number;
                    return decode_operations();
                }
            }
        }
    }
    //ensuite les mutiplications et divisions
    for (var i = 0; i< liste_x.length ; i++) {
        if (liste_x[i]==="/" || liste_x[i]==="x"){
            // si il s'agit d'une division, on divise les deux facteuts
            if (liste_x[i] === "/") {
                // resultat de la division
                var sub_number = Number(liste_x[i-1])/Number(liste_x[i+1]);
                
                // modification de la liste_x avec le nouveau resultat
                new_liste = [];
                if (i-1 > 0) { 
                    new_liste = liste_x.slice(0,i-1); 
                }
                new_liste.push(sub_number);
                if (i+2 < liste_x.length) {
                    new_liste.concat(liste_x.slice(i+2,liste_x.length))
                };
                liste_x = new_liste;
                
                console.log("Sub-list : ",liste_x);
                
                return decode_operations();
                
            } 
            // si il s'agit d'une multiplication, on multiplie les deux facteurs
            else {
                // resultat de la multiplication
                var sub_number = Number(liste_x[i-1])*Number(liste_x[i+1]);
                
                // modification de la liste_x avec le nouveau resultat
                new_liste = [];
                if (i-1 > 0) { 
                    new_liste = liste_x.slice(0,i-1); 
                }
                new_liste.push(sub_number);
                if (i+2 < liste_x.length) {
                    new_liste.concat(liste_x.slice(i+2,liste_x.length))
                };
                liste_x = new_liste;
                
                console.log("Sub-list : ",liste_x);
                
                return decode_operations();
            }
        }
    }
    // ensuite les additions et soustractions
    for (var i = 0; i< liste_x.length ; i++) {
        if (liste_x[i]==="+" || liste_x[i]==="-"){
            // si il s'agit d'une addition, on somme les deux termes
            if (liste_x[i] === "+") {
                // resultat de l'addition
                var sub_number = Number(liste_x[i-1]) + Number(liste_x[i+1]);
                
                // modification de la liste_x avec le nouveau resultat
                new_liste = [];
                if (i-1 > 0) { 
                    new_liste = liste_x.slice(0,i-1); 
                }
                new_liste.push(sub_number);
                if (i+2 < liste_x.length) {
                    new_liste.concat(liste_x.slice(i+2,liste_x.length))
                };
                liste_x = new_liste;
                
                console.log("Sub-list : ",liste_x);
                
                return decode_operations();
                
            } 
            // si il s'agit d'une soustraction, on soustrait les deux termes
            else {
                // resultat de la soustraction
                var sub_number = Number(liste_x[i-1]) - Number(liste_x[i+1]);
                
                // modification de la liste_x avec le nouveau resultat
                new_liste = [];
                if (i-1 > 0) { 
                    new_liste = liste_x.slice(0,i-1); 
                }
                new_liste.push(sub_number);
                if (i+2 < liste_x.length) {
                    new_liste.concat(liste_x.slice(i+2,liste_x.length))
                };
                liste_x = new_liste;
                
                console.log("Sub-list : ",liste_x);
                
                return decode_operations();
            }
        }
    }     
}




                
                
                
                
                
function comput_total() {
    total = decode_operations();
    total_display.innerHTML = total;
    liste_x = [total];
    operations_texte = +total;
}