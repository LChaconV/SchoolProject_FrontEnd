// Recuperar información del localStorage
let storedDataJSON = localStorage.getItem("courseData");
let storedData = JSON.parse(storedDataJSON); // Convertir la cadena JSON de nuevo a un objeto JavaScript
console.log(storedData);

let teacherID = storedData.usuarioID;
let teacherName = storedData.teacherName;

// Variables html
let user_up = document.getElementById("user_up");
let saveChangesButton = document.getElementById('saveChangesButton');
let studentsBody = document.getElementById("studentsBody");
user_up.innerHTML = teacherName

// -------------- CONSULTA API -------------------//
async function infoStudentsForNote() {
  let infoForNotes = "http://localhost:3000/teachers/grades";
  let info = await fetch(infoForNotes);
  let infojs = await info.json();
  console.log(infojs);
  return infojs;
}

//let course = 3; // se debe registrar de acuerdo al click 3-2
let course = storedData.courseID

//-------------- CREAR TABLA ------------------//
infoStudentsForNote().then((infojs) => {
  infojs.forEach((student) => {
    if ((student.courseid == course)) {
      console.log(student.courseid)
      // Crea una nueva fila
      let row = document.createElement("tr");

      // Crea y agrega las celdas a la fila
      let nameCell = document.createElement("td");
      nameCell.innerHTML = `<span type="text" class="studentName" value="${student.user_studentid}" >${student.user_student.name_student + " "+ student.user_student.last_name}</>`
      //nameCell.innerHTML = `<span type="text" class="studentName" value="${student.user_studentid}" >${student.user_studentid}</>`
      row.appendChild(nameCell);

      let grade1Cell = document.createElement("td");
      grade1Cell.innerHTML = `<input type="text" class="gradeInput" value="${student.first_period}" />`;
      row.appendChild(grade1Cell);

      let grade2Cell = document.createElement("td");
      grade2Cell.innerHTML = `<input type="text" class="gradeInput" value="${student.second_period}" />`;
      row.appendChild(grade2Cell);

      let grade3Cell = document.createElement("td");
      grade3Cell.innerHTML = `<input type="text" class="gradeInput" value="${student.third_period}" />`;
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
