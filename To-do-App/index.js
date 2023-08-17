const adduserbtn = document.getElementById("addUser");
var btnTxt = adduserbtn.innerText;
const UserText = document.getElementById("userName");
let userArray = [];
const recordsDisplay = document.getElementById('records');
let objstr = localStorage.getItem('User');
let edit_id = null;

if (objstr != null) {
    userArray = JSON.parse(objstr); // converting string to js object and on refresh updating the userArray as well
}
console.log(userArray);
DisplayInfo();
adduserbtn.onclick = () => {
    const name = UserText.value;
    if (edit_id != null) {
        //edit
        userArray.splice(edit_id, 1, { "name": name });
        edit_id = null;
    } else {
        //insert
        //   we are storing value as objects in array mean arrays object
        userArray.push({ "name": name });
    }



    SaveInfo(userArray); //passing function to store in local storage
    UserText.value = '';
    adduserbtn.innerText = btnTxt;
}

function SaveInfo(userArray) {
    let str = JSON.stringify(userArray); // To change Array object to String because local storage accepts string only 
    localStorage.setItem('User', str);
    DisplayInfo();
}

function DisplayInfo() {
    let statement = '';
    userArray.forEach((user, index) => {    // here we can fetch 3 things value ,index and array 
        statement += `
    <tr>
    <th scope="row">${index + 1}</th>
    <td>${user.name}</td>
    <td><i class=" btn text-white fa fa-edit btn-info" style="font-size:24px" onclick='EditInfo(${index})'></i> <i
            class="btn btn-danger text-white fa fa-trash-o" style="font-size:24px"onclick='DeleteInfo(${index})'></i></td>
</tr>`;
    });
    recordsDisplay.innerHTML = statement;
}

function EditInfo(id) {
    edit_id = id;
    UserText.value = userArray[id].name
    adduserbtn.innerText = 'save Changes';


}

function DeleteInfo(id) {
    confirm("are you sure you want to delete ? ");
    userArray.splice(id, 1);
    SaveInfo(userArray);
}
