// Recuperar información del localStorage
let storedDataJSON = localStorage.getItem("userData");
let storedData = JSON.parse(storedDataJSON); // Convertir la cadena JSON de nuevo a un objeto JavaScript
console.log(storedData);

let Name = storedData.Name;

// Variables html
let user_up = document.getElementById("user_up")
let studentsBody = document.getElementById("studentsBody");

user_up.innerHTML = Name

// -------------- CONSULTA API -------------------//
async function StudentsAPI() {
  let infoStudent = "http://localhost:3000/students/info";
  let info = await fetch(infoStudent);
  let infojs = await info.json();
  console.log(infojs);
  return infojs;
}


let studentID = storedData.usuarioID
console.log(storedData.usuarioID)

//-------------- CREAR TABLA ------------------//
StudentsAPI().then((infojs) => {
  console.log("infojs",infojs)
  infojs.forEach((student) => {
    if ((student.user_studentid == studentID)) {
      console.log(student.courseid)
      // Crea una nueva fila
      let row = document.createElement("tr");

      // Crea y agrega las celdas a la fila
      let nameCell = document.createElement("td");
      nameCell.innerHTML = `<span type="text" class="studentName" value="${student.subject.name_subject}" >${student.subject.name_subject}</>`
      //nameCell.innerHTML = `<span type="text" class="studentName" value="${student.user_studentid}" >${student.user_studentid}</>`
      row.appendChild(nameCell);

      let grade1Cell = document.createElement("td");
      grade1Cell.innerHTML = `<p type="text" class="gradeInput" value="${student.first_period}"> ${student.first_period} </>`;
      row.appendChild(grade1Cell);

      let grade2Cell = document.createElement("td");
      grade2Cell.innerHTML = `<p type="text" class="gradeInput" value="${student.second_period}">${student.second_period} </>`;
      row.appendChild(grade2Cell);

      let grade3Cell = document.createElement("td");
      grade3Cell.innerHTML = `<p type="text" class="gradeInput" value="${student.third_period}"> ${student.third_period} </>`;
      row.appendChild(grade3Cell);

      let studentsBody = document.getElementById("studentsBody");

      if (studentsBody !== null) {
        // Agrega la fila al cuerpo de la tabla
        studentsBody.appendChild(row);
      } else {
        console.error("Elemento studentsBody no encontrado.");
      }
    }
  });
});