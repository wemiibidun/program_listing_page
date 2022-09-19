import data from "./programs.json" assert { type: "json" };

const tbody = document.querySelector("#tbody");
let flatenedPrograms = [];

// converted list of programs/record to a flattened list of program records
data.programs.forEach((content) => {
  let { title, deliveryMethod } = content;

  deliveryMethod.forEach((dm) => {
    let program = {
      programtitle: title,
      delivery: dm.delivery,
      status: dm.status,
    };
    flatenedPrograms.push(program);
  });
});

//sorting data title in alphabetical order
flatenedPrograms.sort((a, b) =>
  a.programtitle !== b.programtitle
    ? a.programtitle < b.programtitle
      ? -1
      : 1
    : 0
);

function displayProgramList(programs) {
  tbody.innerHTML = ""; // clear the table
  programs.forEach((record) => {
    tbody.innerHTML += `<tr>
              <td>${record.programtitle}</td>
              <td>${record.delivery}</td>
              <td>${record.status}</td>
          </tr>`;
  });
}
displayProgramList(flatenedPrograms);

document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    //get selected value in dropdown list for specific id
    let dm = document.getElementById("deliveryMethod");
    let deliveryMethod = dm.options[dm.selectedIndex].text;

    let s = document.getElementById("status");
    let status = s.options[s.selectedIndex].text;

    if (deliveryMethod === "All" && status === "All") {
      displayProgramList(flatenedPrograms);
    } else {
      if (deliveryMethod === "All" || status !== "All") {
        const filteredPrograms = flatenedPrograms.filter(
          (record) => record.status === status
        );
        displayProgramList(filteredPrograms);
      }

      if (deliveryMethod !== "All" || status === "All") {
        const filteredPrograms = flatenedPrograms.filter(
          (record) => record.delivery === deliveryMethod
        );
        displayProgramList(filteredPrograms);
      }

      if (deliveryMethod !== "All" && status !== "All") {
        const filteredPrograms = flatenedPrograms.filter(
          (record) =>
            record.delivery === deliveryMethod && record.status === status
        );
        displayProgramList(filteredPrograms);
      }
    }
  });
});

//clear all filters and reset
const refreshButton = document.querySelector(".clear-all-filters");
const refreshPage = () => {
  location.reload();
};
refreshButton.addEventListener("click", refreshPage);
