// ----------------- PERFIL LOG IN --------------------//
let btn_teacher = document.getElementById("btn_teacher");
let btn_student = document.getElementById("btn_student");
let inputPassword = document.getElementById("password");
let inputUser = document.getElementById("usuario");

// ----------------- VARIABLES ---------------------//

let usuarioID;
let Name;

// -------------- CONSULTA API -------------------//

async function Login(boton_value, listenUser, ListenPassword) {
 
  
  let infoLogin;


  let infoLogin_teacher = "http://localhost:3000/teachers/login";
  let infoLogin_student = "http://localhost:3000/students/login";
  // identificar si es profesor o estudiante------//
  if (boton_value == "user_teacher") {
    infoLogin = infoLogin_teacher;
  } else {
    infoLogin = infoLogin_student;
  }

  try {
    let index = 0;
    let info = await fetch(infoLogin);
    let infojs = await info.json(); // convertir a json la informacion de API
    
    if (boton_value == "user_teacher") {
      for (index = 0; index < infojs.length; index++) {
        

        let usuario = infojs[index].user_teacher;

        let password = infojs[index].password_teacher;
        if (usuario == listenUser && password == ListenPassword) {
          //if (boton_value == "user_teacher") {
          usuarioID = infojs[index].user_teacherid;
          Name = infojs[index].name_teacher + " " + infojs[index].last_name;
          // Crear un objeto para agrupar las variables
          let userData = {
            usuarioID: usuarioID,
            Name: Name,
          };

          // Convertir el objeto en una cadena JSON
          let userDataJSON = JSON.stringify(userData);

          // Almacenar la cadena JSON en el localStorage
          localStorage.setItem("userData", userDataJSON);
          window.location.href = "./subjects_teacher/subjects_teacher.html";
          break;
        }
      }
    } 
    if(boton_value == "user_student") {
      
      for (index = 0; index < infojs.length; index++) {
        let usuario = infojs[index].user_student;

        let password = infojs[index].password_student;
        if (usuario == listenUser && password == ListenPassword) {
          //if (boton_value == "user_teacher") {
          usuarioID = infojs[index].user_studentid;

          Name = infojs[index].name_student + " " + infojs[index].last_name;
          // Crear un objeto para agrupar las variables
          let userData = {
            usuarioID: usuarioID,
            Name: Name,
          };
          
          // Convertir el objeto en una cadena JSON
          let userDataJSON = JSON.stringify(userData);

          // Almacenar la cadena JSON en el localStorage
          localStorage.setItem("userData", userDataJSON);
           window.location.href = "./Student/student.html";
          break;
        }
      }
    }

    if (index == infojs.length) {
      alert("Perfil o información erronea");
    }
  } catch (error) {
    console.error("Error al realizar la consulta:", error);
  }
}

btn_teacher.addEventListener("click", async function () {
  // Obtener y mostrar el valor del botón
  try {
    const boton_value = await btn_teacher.value;
    const value_password = await inputPassword.value;
    const value_user = await inputUser.value;
    //let mostrar = await Login(boton_value, value_user, value_password);

    await Login(boton_value, value_user, value_password);
  } catch (error) {
    // Manejar el error aquí si es necesario
    console.error("Error al obtener la información:", error);
    alert("Hubo un error al obtener la información.");
  }
});

btn_student.addEventListener("click", async function () {
  // Obtener y mostrar el valor del botón
  try {
    const boton_value = await btn_student.value;

    const value_password = await inputPassword.value;
    const value_user = await inputUser.value;
    await Login(boton_value, value_user, value_password)
  } catch (error) {
    // Manejar el error
    console.error("Error al obtener la información:", error);
    alert("Hubo un error al obtener la información.");
  }
});
