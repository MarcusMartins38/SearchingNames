let ulList = document.querySelector("#ul_list_user");
let liList = document.querySelector("#li_user");
let userInfo = document.querySelector("#user_info");
let userPhoto = document.querySelector("#user_perfil_photo");

let searchInput = document.querySelector("#search_input");
let searchButton = document.querySelector("#search_button");

let h1Info = document.querySelector("#h1_average_info");

const createPMan = document.createElement("p");
const createPWoman = document.createElement("p");
const createPAges = document.createElement("p");
const createPAverageAge = document.createElement("p");

const strongElementMan = document.createElement("strong");
const strongElementWoman = document.createElement("strong");
const strongElementAges = document.createElement("strong");
const strongElementAverage = document.createElement("strong");

const divOfInfos = document.querySelector("#div_calculatedInfos");

window.addEventListener("load", () => {
  loadingApi();
  eventWithInputText();
});

const loadingApi = async () => {
  const response = await fetch(
    "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo"
  );

  const data = await response.json();
  return data;
};

const eventWithInputText = () => {
  async function gettingTextOfInput() {
    let textOfInput = searchInput.value;
    let countMan = 0;
    let countWoman = 0;
    let arrayOfUsers = [];

    if (textOfInput !== "") {
      const dataFromApi = await loadingApi();
      arrayOfUsers = dataFromApi.results.filter(
        (person) =>
          person.name.first.toLowerCase().includes(textOfInput.toLowerCase()) ||
          person.name.last.toLowerCase().includes(textOfInput.toLowerCase())
      );
      ulList.innerHTML = "";
      h1Info.textContent = "Estatísticas";

      if (arrayOfUsers.length > 0) {
        h1ListChange(arrayOfUsers.length);
        let countingAges = 0;

        for (let i = 0; i < arrayOfUsers.length; i++) {
          let creatingP = document.createElement("p");
          let creatingImg = document.createElement("img");
          let creatingLi = document.createElement("li");

          creatingP.textContent = `${arrayOfUsers[i].name.first} ${arrayOfUsers[i].name.last}, ${arrayOfUsers[i].dob.age} anos`;
          creatingImg.src = `${arrayOfUsers[i].picture.large}`;

          creatingLi.appendChild(creatingImg);
          creatingLi.appendChild(creatingP);
          ulList.appendChild(creatingLi);

          if (arrayOfUsers[i].gender === "female") {
            countWoman++;
          } else {
            countMan++;
          }

          countingAges += arrayOfUsers[i].dob.age;
        }

        divInfoChange(countMan, countWoman, countingAges, arrayOfUsers.length);
      } else {
        h1ListChange(arrayOfUsers.length);
        h1Info.textContent = "Nada a ser calculado";
        divOfInfos.innerHTML = "";
      }
    }
  }

  searchInput.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
      gettingTextOfInput();
    }
  });

  searchButton.addEventListener("click", () => {
    gettingTextOfInput();
  });
};

const h1ListChange = (length = 0) => {
  const h1References = document.querySelector("#h1_list_users");

  if (length === 0) {
    h1References.textContent = "Nenhum usuário encontrado";
  } else {
    h1References.textContent = `${length} usuário(s) encontrado(s)`;
  }
};

const divInfoChange = (countMan, countWoman, countingAges, length) => {
  createPMan.textContent = `Sexo masculino: `;
  strongElementMan.textContent = `${countMan}`;
  createPMan.appendChild(strongElementMan);

  createPWoman.textContent = `Sexo feminino: `;
  strongElementWoman.textContent = `${countWoman}`;
  createPWoman.appendChild(strongElementWoman);

  createPAges.textContent = `Soma das idades: `;
  strongElementAges.textContent = `${countingAges}`;
  createPAges.appendChild(strongElementAges);

  const averageCalculated = (countingAges / length).toFixed(2);
  createPAverageAge.textContent = `Media das idades: `;
  strongElementAverage.textContent = `${averageCalculated}`;
  createPAverageAge.appendChild(strongElementAverage);

  divOfInfos.appendChild(createPMan);
  divOfInfos.appendChild(createPWoman);
  divOfInfos.appendChild(createPAges);
  divOfInfos.appendChild(createPAverageAge);
};
