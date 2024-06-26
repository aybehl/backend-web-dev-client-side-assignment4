let addTeacherDiv = document.getElementById("add-teacher");
let updateTeacherDiv = document.getElementById("update-teacher");
let addButton = document.getElementById("add-btn");
let updateButton = document.getElementById("update-btn");

addButton.addEventListener("click", function () {
    addButton.classList.add("active");
    updateButton.classList.remove("active");
    addTeacherDiv.style.display = "block";
    updateTeacherDiv.style.display = "none";
});

updateButton.addEventListener("click", function () {
    addButton.classList.remove("active");
    updateButton.classList.add("active");
    addTeacherDiv.style.display = "none";
    updateTeacherDiv.style.display = "block";
});


let addFormHandle = document.forms.add_teacher_form;
let updateFormHandle = document.forms.update_teacher_form;

//Call method on form submit event
addFormHandle.onsubmit = sendRequestToServerToAddTeacher;
updateFormHandle.onsubmit = sendRequestToServerToUpdateTeacher;

function sendRequestToServerToAddTeacher(event){
    event.preventDefault();

    //Collect form data
    let teacherData = {
        teacherfname: addFormHandle.addFirstName.value,
        teacherlname: addFormHandle.addLastName.value,
        salary: addFormHandle.addSalary.value,
        employeenumber: addFormHandle.addEmployeeNumber.value,
        hiredate: addFormHandle.addHireDate.value
    }

    console.log(teacherData);

    //Async call to POST API to add new teacher
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:50040/api/teachersData/addNewTeacher", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4) {
            
            //On success, show success Response
            if(xhr.status === 200) {
                console.log("success", xhr.responseText);
                let successResponse = document.getElementById("addSuccessResponse");
                successResponse.style.display = 'block';
            } else { 
                //On error, show error Response
                console.log("Error from server", xhr.responseText);
                let errorResponse = document.getElementById("addErrorResponse");
                errorResponse.style.display = 'block';
            }
        }
    }

    xhr.send(JSON.stringify(teacherData));

}

function sendRequestToServerToUpdateTeacher(event) {
    event.preventDefault();

    //Collect form data
    let teacherData = {
        teacherid: updateFormHandle.teacherId.value,
        teacherfname: updateFormHandle.updateFirstName.value,
        teacherlname: updateFormHandle.updateLastName.value,
        salary: updateFormHandle.updateSalary.value,
        employeenumber: updateFormHandle.updateEmployeeNumber.value,
        hiredate: updateFormHandle.updateHireDate.value
    }

    console.log(teacherData);

    //Async call to POST API to update teacher
    let xhr = new XMLHttpRequest();
    xhr.open("POST", `http://localhost:50040/api/teachersData/updateTeacher/${teacherData.teacherid}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {

            //On success, show success Response
            if (xhr.status === 200) {
                console.log("success", xhr.responseText);
                let successResponse = document.getElementById("updateSuccessResponse");
                successResponse.style.display = 'block';
            } else {
                //On error, show error Response
                console.log("Error from server", xhr.responseText);
                let errorResponse = document.getElementById("updateErrorResponse");
                errorResponse.style.display = 'block';
            }
        }
    }

    xhr.send(JSON.stringify(teacherData));

}