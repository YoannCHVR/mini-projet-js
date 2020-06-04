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

// for (var i = 0; i < family.__proto__.constructor.length; i++) {
//   let property = Object.keys(family)[i];
//
//   alert(property + ' : ' + family[property]);
// }

console.log(tabEtudiant);

for (var i = 0; i < tabEtudiant.length; i++) {
  let etudiant = tabEtudiant[i];

  for (var property in etudiant) {
    if (etudiant.hasOwnProperty(property)) {
      alert(property + ' : ' + etudiant[property]);
    }
  }
}
