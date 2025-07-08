// script.js

class User {
  constructor(firstName, lastName, age, location) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.location = location;
  }

  compareAge(otherUser) {
    if (this.age > otherUser.age) {
      return `${this.firstName} è più vecchio di ${otherUser.firstName}`;
    } else if (this.age < otherUser.age) {
      return `${otherUser.firstName} è più vecchio di ${this.firstName}`;
    } else {
      return `${this.firstName} e ${otherUser.firstName} hanno la stessa età`;
    }
  }
}

console.log("--- Test Classe User ---");
const user1 = new User("Mario", "Rossi", 30, "Roma");
const user2 = new User("Luigi", "Bianchi", 25, "Milano");
const user3 = new User("Anna", "Verdi", 30, "Napoli");

console.log(user1.compareAge(user2));
console.log(user2.compareAge(user1));
console.log(user1.compareAge(user3));
console.log("--------------------------------\n");

class Pet {
  constructor(petName, ownerName, species, breed) {
    this.petName = petName;
    this.ownerName = ownerName;
    this.species = species;
    this.breed = breed;
  }

  hasSameOwner(otherPet) {
    return this.ownerName === otherPet.ownerName;
  }
}

const petForm = document.getElementById("petForm");
const petsList = document.getElementById("petsList");
const pets = [];

petForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const petName = document.getElementById("petName").value;
  const ownerName = document.getElementById("ownerName").value;
  const species = document.getElementById("species").value;
  const breed = document.getElementById("breed").value;

  const newPet = new Pet(petName, ownerName, species, breed);
  pets.push(newPet);

  renderPets();
  petForm.reset();
});

function renderPets() {
  petsList.innerHTML = "";

  pets.forEach((pet, index) => {
    const listItem = document.createElement("li");
    listItem.classList.add(
      "list-group-item",
      "bg-secondary",
      "text-light",
      "mb-2"
    );

    let ownerStatusIcon = "";
    let hasSharedOwner = false;

    // Controlla se il pet corrente ha lo stesso padrone di qualsiasi altro pet nella lista
    for (let i = 0; i < pets.length; i++) {
      if (index !== i && pet.hasSameOwner(pets[i])) {
        hasSharedOwner = true;
        break;
      }
    }

    if (hasSharedOwner) {
      ownerStatusIcon =
        '<span class="text-success ms-2">&#10003; Stesso Padrone</span>'; // Segno di spunta verde
    } else {
      ownerStatusIcon =
        '<span class="text-danger ms-2">&#10006; Padrone Diverso</span>'; // Croce rossa
    }

    listItem.innerHTML = `
        <strong>Nome Pet:</strong> ${pet.petName}<br>
        <strong>Padrone:</strong> ${pet.ownerName} ${ownerStatusIcon}<br>
        <strong>Specie:</strong> ${pet.species}<br>
        <strong>Razza:</strong> ${pet.breed}
      `;
    petsList.appendChild(listItem);
  });
}
