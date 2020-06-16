// Tableau de stockage des étudiant en mémoire
var tabStudent = [];

// Objet représentant un étudiant
class Student {
    constructor(id, name, firstName, age, situation) {
        this.id = id;
        this.name = name;
        this.firstName = firstName;
        this.age = age;
        this.situation = situation;

        if (isNaN(age)) {
            this.age = 0;
        }
    }

    getId() {
        return this.id;
    }

    setId(value) {
        this.id = value;
    }

    getName() {
        return this.name;
    }

    setName(value) {
        this.name = value;
    }

    getFirstName() {
        return this.firstName;
    }

    setFirstName(value) {
        this.firstName = value;
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

// Récupération d'un étudiant dans le tableau en mémoire avec l'id de l'étudiant
function getStudent(idStudent) {
    for (var i = 0; i < tabStudent.length; i++) {
        let student = tabStudent[i];

        for (var property in student) {
            if (idStudent == student.getId()) {
                return student;
            }
        }
    }
}

function removeItemArray(array, value) {
    let index = array.indexOf(value);

    if (index > -1) {
        array.splice(index, 1);
    }

    return array;
}

// Ajout d'un étudiant
function addStudent() {
    let lastId = tabStudent[tabStudent.length - 1].getId();

    document.getElementById("form-student").classList.toggle("d-none");
    document.getElementById("id").readOnly = false;
    resetInputs();

    document.getElementById("id").value = lastId + 1;
    document.getElementById("id").min = lastId + 1;
}

// Édition d'un étudiant
function editStudent(idStudent) {
    resetInputs();

    let student = getStudent(idStudent);

    document.getElementById("id").readOnly = true; //disable id input
    document.getElementById("id").value = student.getId();
    document.getElementById("name").value = student.getName();
    document.getElementById("firstName").value = student.getFirstName();
    document.getElementById("age").value = student.getAge();
    document.getElementById("situation").value = student.getSituation();

    document.getElementById("form-student").classList.remove("d-none");
}

// Annulation d'ajout d'un éétudiant
function cancelStudent() {
    document.getElementById("name").value = '';
    document.getElementById("firstName").value = '';
    document.getElementById("age").value = '';
    document.getElementById("situation").value = '';
}

// Sauvegarde d'un étudiant
function saveStudent() {
    let student;
    let inputs = document.getElementById("form-student").getElementsByTagName("input");
    let situation = document.getElementById("situation");

    let idInput = parseInt(inputs[0].value);
    let nameInput = inputs[1].value;
    let firstNameInput = inputs[2].value;
    let ageInput = parseInt(inputs[3].value);
    let situationInput = situation.options[situation.selectedIndex].value;

    if (checkInputs()) {
        if (getStudent(idInput)) {
            student = getStudent(idInput);

            student.setName(nameInput);
            student.setFirstName(firstNameInput);
            student.setAge(ageInput);
            student.setSituation(situationInput);
        } else {
            student = new Student(
                idInput,
                nameInput,
                firstNameInput,
                ageInput,
                situationInput
            );

            tabStudent.push(student);
        }

        updateStudent(student);

        document.getElementById("form-student").classList.add("d-none");
    } else {
        alert("Veuillez renseigner les champs vides !")
    }
}

tabInputs = ["id", "name", "firstName", "age", "situation"];

// Vérification des champs vides du formulaire
function checkInputs() {
    checking = true;
    for (var i = 0; i < tabInputs.length; i++) {
        document.getElementById(tabInputs[i]).classList.remove("border-danger","border-success");
        if (document.getElementById(tabInputs[i]).value == "") {
            document.getElementById(tabInputs[i]).classList.add("border-danger");
            checking = false;
        } else {
            document.getElementById(tabInputs[i]).classList.add("border-success");
        }
    }
    return checking;
}

// Réinitialisation des champs du formulaire
function resetInputs() {
    cancelStudent();
    for (var i = 0; i < tabInputs.length; i++) {
        document.getElementById(tabInputs[i]).classList.remove("border-danger","border-success");
    }
}

// Suppression d'un étudiant
function deleteStudent(idStudent) {
    let student = getStudent(idStudent);

    document.getElementById("student" + student.getId()).remove();

    removeItemArray(tabStudent, student);

    document.getElementById("form-student").classList.add("d-none");
}

// Modification d'un étudiant
function updateStudent(student) {
    let studentTR = document.getElementById("student" + student.getId());
    let tab = document.getElementById("table-students");
    let idStudent = student.getId();

    if (!studentTR) {
        studentTR = tab.lastElementChild.appendChild(document.createElement("tr"));
        studentTR.id = "student" + idStudent;
    }

    studentTR.innerHTML =
        '<td>' + idStudent + '</td>' +
        '<td>' + student.getName() + '</td>' +
        '<td>' + student.getFirstName() + '</td>' +
        '<td>' + student.getAge() + '</td>' +
        '<td>' + student.getSituation() + '</td>' +
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

// Initialisation du tableau avec les 3 étudiants de base
function init() {
    tabStudent.push(new Student(1, "MOKHTARI", "Nadir", 26, "Célibataire"));
    tabStudent.push(new Student(2, "GENSE", "Aurélie", 24, "Célibataire"));
    tabStudent.push(new Student(3, "D'ORCHYMONT", "Margaux", 24, "Pacsé"));

    for (var i = 0; i < tabStudent.length; i++) {
        updateStudent(tabStudent[i]);
    }
}

init();
