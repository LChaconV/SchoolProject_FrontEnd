// Recuperar información del localStorage
let storedDataJSON = localStorage.getItem("userData");
let storedData = JSON.parse(storedDataJSON); // Convertir la cadena JSON de nuevo a un objeto JavaScript
console.log(storedData);

// AVariables del documento
let teacherID = storedData.usuarioID;
let teacherName = storedData.Name;
let profesor = []; // array de course y subject

// Variables html
let user_up = document.getElementById("user_up");
let contenedor = document.getElementById("contenedorbtns");
let courses_btn = document.getElementById("courses-btn");
let subjectName = document.getElementById("subjectName");
// importar desde main.js el valor ID de teacher, ver informacion de la función identifica

user_up.innerHTML = teacherName;

async function subjects_teacher(teacherID, contenedor) {
  let info_teacher = "http://localhost:3000/teachers/info";

  try {
    let info = await fetch(info_teacher);
    let infojs = await info.json(); // convertir a json la informacion de API
    // Recorre informacion de cada profesor
    infojs.forEach((data) => {
      console.log(
        "data.user_teacherid: ",
        data.user_teacherid + "== teacherID: ",
        teacherID
      );
      if (data.user_teacherid == teacherID) {
        profesor.push({
          subject: data.subject.name_subject,
          course: data.course.name_course,
          courseID :data.courseid
        });
      }
    });
    if (profesor.length > 0) {
      // Recorrer cada subject en profesor
      profesor.forEach((data) => {
        // Crea un nuevo selector
        const newBtn = document.createElement("button");
        // Configurar el texto del botón con la materia
        newBtn.innerHTML = data.subject;
        newBtn.id = "newBtn";
        newBtn.value = data.subject;

        // Agregar el botón al cuerpo del documento
        document.body.appendChild(newBtn);
        // Agrega el boton al contenedor
        contenedor.appendChild(newBtn);

        // Agregar el event listener al botón recién creado
        newBtn.addEventListener("click", function () {
          courses_btn.innerHTML = "";
          console.log(courses_btn);
          const textSubject = document.createElement("p");
          subjectName.innerHTML = "";
          textSubject.innerHTML = newBtn.value;
          console.log("newBtn.value", newBtn.value);
          document.body.appendChild(textSubject);
          subjectName.appendChild(textSubject);

          profesor.forEach((data) => {
            console.log(profesor)
            if (newBtn.value == data.subject) {
              const newBtnCourse = document.createElement("button");

              // Configurar el texto del botón con la materia
              newBtnCourse.innerHTML = data.course;
              newBtnCourse.id = "newBtnCourse"
              newBtnCourse.value = data.courseID;
              document.body.appendChild(newBtnCourse);
              courses_btn.appendChild(newBtnCourse);
            }
          });
          newBtnCourse.addEventListener("click", function () {
            
            let courseData = {
              courseID: newBtnCourse.value,
              teacherName: teacherName,
            };
  
            // Convertir el objeto en una cadena JSON
            let courseDataJSON = JSON.stringify(courseData);
  
            // Almacenar la cadena JSON en el localStorage
            localStorage.setItem("courseData", courseDataJSON);
            
            console.log(courseDataJSON)

            window.location.href = "../StudentGrade/StudentGrade.html";
          });
        });
      });
    }
    else{
      alert ("Aún no tiene grupos asignados. Por favor comunicarse con el administrador.")
    }

    console.log("soy profesor", profesor);
  } catch (error) {
    console.error("Error al realizar la consulta:", error);
  }
}

subjects_teacher(teacherID, contenedor);
