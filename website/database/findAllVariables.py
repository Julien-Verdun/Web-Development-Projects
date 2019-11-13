readFile = "./listVariable.txt"
writeFile = "./listVariableProcessed.txt"
with open(readFile, "r") as file:
    entetes = file.read()

list_entetes = entetes.strip().split('\n')

liste_entete_filtre = []

for elt in list_entetes:
    if elt not in liste_entete_filtre:
        liste_entete_filtre.append(elt)

texte = ""
for elt in liste_entete_filtre:
    texte += str(elt) + "\n"

with open(writeFile, "w") as wrtfile:
    wrtfile.write(texte)
