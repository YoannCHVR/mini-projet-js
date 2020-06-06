function removeItemArray(array, value) {
    let index = array.indexOf(value);

    if (index > -1) {
        array.splice(index, 1);
    }

    return array;
}

function disableById(id) {
  document.getElementById(id).classList.remove("d-none");
}

var tabEtudiant = [];

class Etudiant {
  constructor(identifiant, nom, prenom, age, situation) {
    this.identifiant = identifiant;
    this.nom = nom;
    this.prenom = prenom;
    this.age = age;
    this.situation = situation;

    if(isNaN(age)) {
      this.age = 0;
    }
  }

  getIdentifiant() {
    return this.identifiant;
  }

  setIdentifiant(value) {
    this.identifiant = value;
  }

  getNom() {
    return this.nom;
  }

  setNom(value) {
    this.nom = value;
  }

  getPrenom() {
    return this.prenom;
  }

  setPrenom(value) {
    this.prenom = value;
  }

  getAge() {
    return this.age;
  }

  setAge(value) {
    this.age = value;
  }

  getSituation() {
    return this.situation;
  }

  setSituation(value) {
    this.situation = value;
  }
}

function getStudent(idStudent) {
  for (var i = 0; i < tabEtudiant.length; i++) {
    let etudiant = tabEtudiant[i];

    for (var property in etudiant) {
      if (idStudent == etudiant.getIdentifiant()) {
        return etudiant;
      }
    }
  }
}

function addStudent() {
  let lastId = tabEtudiant[tabEtudiant.length - 1].getIdentifiant();

  document.getElementById("form-student").classList.toggle("d-none");
  document.getElementById("id").readOnly = false;
  cancelStudent();

  document.getElementById("id").value = lastId + 1;
}

function editStudent(idStudent) {
  let etudiant = getStudent(idStudent);
  let donnees = document.getElementById("student" + etudiant.getIdentifiant()).getElementsByTagName("td");

  document.getElementById("id").readOnly = true; //disable id input
  document.getElementById("id").value = etudiant.getIdentifiant();
  document.getElementById("name").value = etudiant.getNom();
  document.getElementById("fname").value = etudiant.getPrenom();
  document.getElementById("age").value = etudiant.getAge();

  var options = document.getElementById("situation").getElementsByTagName("option");

  for (var i = 0; i < options.length - 1; i++) {
      options[i].removeAttribute('selected');
  }

  for (i = 0; i < options.length - 1; i++) {
      if (options[i].value == etudiant.getSituation())
          options[i].setAttribute('selected', '');
  }

  disableById("form-student");
}

function cancelStudent() {
  var options = document.getElementById("situation").getElementsByTagName("option");

  document.getElementById("name").value = '';
  document.getElementById("fname").value = '';
  document.getElementById("age").value = '';

  for (var i = 0; i < 5; i++) {
      options[i].removeAttribute('selected');
  }
  options[0].setAttribute('selected', '');
}

function saveStudent() {
  let etudiant;
  let inputs = document.getElementById("form-student").getElementsByTagName("input");
  let situation = document.getElementById("situation");

  let identifiantInput = parseInt(inputs[0].value);
  let nameInput = inputs[1].value;
  let fnameInput = inputs[2].value;
  let ageInput = parseInt(inputs[3].value);
  let situationInput = situation.options[situation.selectedIndex].value;

  if (getStudent(identifiantInput)) {
    etudiant = getStudent(identifiantInput);

    etudiant.setNom(nameInput);
    etudiant.setPrenom(fnameInput);
    etudiant.setAge(ageInput);
    etudiant.setSituation(situationInput);

    console.log(tabEtudiant);
  } else {
    etudiant = new Etudiant(
      identifiantInput,
      nameInput,
      fnameInput,
      ageInput,
      situationInput
    );

    tabEtudiant.push(etudiant);
  }

  updateEtudiant(etudiant);

  document.getElementById("form-student").classList.add("d-none");
}

function deleteStudent(idStudent) {
  let etudiant = getStudent(idStudent);

  document.getElementById("student" + etudiant.getIdentifiant()).remove();

  removeItemArray(tabEtudiant, etudiant);

  document.getElementById("form-student").classList.add("d-none");
}

function updateEtudiant(etudiant) {
  let studentTR = document.getElementById("student" + etudiant.getIdentifiant());
  let tab = document.getElementById("table-students");
  let idStudent = etudiant.getIdentifiant();

  if (!studentTR) {
    studentTR = tab.lastElementChild.appendChild(document.createElement("tr"));
    studentTR.id = "student" + idStudent;
  }

  studentTR.innerHTML =
    '<td>' + idStudent + '</td>' +
    '<td>' + etudiant.getNom() + '</td>' +
    '<td>' + etudiant.getPrenom() + '</td>' +
    '<td>' + etudiant.getAge() + '</td>' +
    '<td>' + etudiant.getSituation() + '</td>' +
    '<td>' +
      '<div class="btn-group border-0">' +
        '<button id="edit" type="button" class="btn btn-lg text-light" onclick="editStudent(\'' + idStudent + '\')">' +
          '<i class="fas fa-pen"></i>' +
        '</button>' +

        '<button id="delete" type="button" class="btn btn-lg text-light" onclick="deleteStudent(\'' + idStudent + '\')">' +
          '<i class="fas fa-trash-alt"></i>' +
        '</button>' +
      '</div>' +
    '</td>';
}

function init() {
  tabEtudiant.push(new Etudiant(1, "MOKHTARI", "Nadir", 26, "Célibataire"));
  tabEtudiant.push(new Etudiant(2, "GENSE", "Aurélie", 24, "Célibataire"));
  tabEtudiant.push(new Etudiant(3, "D'ORCHYMONT", "Margaux", 24, "Pacsé"));

  for (var i = 0; i < tabEtudiant.length; i++) {
    updateEtudiant(tabEtudiant[i]);
  }
}

init();
