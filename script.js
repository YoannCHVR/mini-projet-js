var tabEtudiant = [];

class Etudiant {
  constructor(identifiant, nom, prenom, age, situation) {
    this.identifiant = identifiant;
    this.nom = nom;
    this.prenom = prenom;
    this.age = age;
    this.situation = situation;
  }
}

tabEtudiant.push(new Etudiant(1, "MOKHTARI", "Nadir", 26, "Célibataire"));
tabEtudiant.push(new Etudiant(2, "GENSE", "Aurélie", 24, "Célibataire"));
tabEtudiant.push(new Etudiant(3, "D'ORCHYMONT", "Margaux", 24, "Pacsé"));

function editStudent(idStudent) {
    document.getElementById("form-student").classList.remove("d-none");
    var donnees = document.getElementById(idStudent).getElementsByTagName("td");
    document.getElementById("id").value = donnees[0].textContent;
    document.getElementById("name").value = donnees[1].textContent;
    document.getElementById("fname").value = donnees[2].textContent;
    document.getElementById("age").value = donnees[3].textContent;
    var options = document.getElementById("situation").getElementsByTagName("option");
    for (var i = 0; i < 5; i++) {
        options[i].removeAttribute('selected');
    }
    for (i = 0; i < 5; i++) {
        if (options[i].value == donnees[4].textContent)
            options[i].setAttribute('selected', '');
    }
}

function deleteStudent(idStudent) {
    document.getElementById(idStudent).remove();
}

function addStudent() {
    document.getElementById("form-student").classList.toggle("d-none");
    var lignesTab = document.getElementById("table-students").getElementsByTagName("tr");
    var maxId = parseInt(lignesTab[lignesTab.length - 1].getElementsByTagName("td")[0].textContent);
    document.getElementById("id").value = maxId + 1;
    document.getElementById("name").value = '';
    document.getElementById("fname").value = '';
    document.getElementById("age").value = '';
    var options = document.getElementById("situation").getElementsByTagName("option");
    for (var i = 0; i < 5; i++) {
        options[i].removeAttribute('selected');
    }
    options[0].setAttribute('selected', '');
}

function saveStudent() {

}

function cancelStudent() {
    document.getElementById("form-student").classList.add("d-none");
}