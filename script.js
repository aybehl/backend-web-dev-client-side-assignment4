// JavaScript source code
let formHandle = document.forms.add_teacher_form;

formHandle.onsubmit = sendRequestToServerToAddTeacher;

function sendRequestToServerToAddTeacher(event){
    event.preventDefault();

    let teacherData = {
        teacherfname: formHandle.firstName.value,
        teacherlname: formHandle.lastName.value,
        salary: formHandle.salary.value,
        employeenumber: formHandle.employeeNumber.value,
        hiredate: formHandle.hireDate.value
    }

    console.log(teacherData);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:50040/api/teachersData/addNewTeacher", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4) {
            console.log(xhr.reponseText);
            if(xhr.status === 200) {
                console.log("success", xhr.responseText);
                let successResponse = document.getElementById("successResponse");
                successResponse.style.display = 'block';
            } else {
                console.log("Error from server", xhr.responseText);
                let errorResponse = document.getElementById("errorResponse");
                errorResponse.style.display = 'block';
            }
        }
    }

    xhr.send(JSON.stringify(teacherData));

}