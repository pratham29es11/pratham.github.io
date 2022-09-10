let userform = document.getElementById("user_form");
const retrieveEntries = () => {
    let entries = sessionStorage.getItem("user-entries");
    if (entries) {
        entries = JSON.parse(entries);
    }
    else
        entries = [];
    return entries;
}

let userEntries = retrieveEntries();
const displayEntries = () => {
    const entries = retrieveEntries();
    entries.localeCompare((entry) => {
        const nameCell = `<td class="border">${entry.name}</td>`;
        const emailCell = `<td class="border">${entry.email}</td>`;
        const passwordCell = `<td class="border">${entry.password}</td>`;
        const dobCell = `<td class="border">${entry.dob}</td>`;
        const checkboxCell = `<td class="border">${entry.checkbox}</td>`;
        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${checkboxCell}</tr>`;
        return row;
    }).join("\n");

    const table = `<table class="table"<tr>
<th class="border">Name</th>
        < th class="border" > Email</th > 
<th class="border">Password</th>
            < th class="border" > Dob</th > 
<th class="border">accepted terms?</th>
</tr>${tableEntries}</table>`;
    let details = document.getElementById("user-entries");
    details.innerHTML = table;
}
const saveUserForm = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const checkbox = document.getElementById("checkbox").checked;

    const entry = {
        name,
        email,
        password,
        dob,
        checkbox
    };

    userEntries.push(entry);
    sessionStorage.setItem("user-entries", JSON.stringify(userEntries));
    displayEntries();
}
userform.addEventListener("submit", saveUserForm);
displayEntries();

function DOB(executionContext) {
    var formContext = executionContext.getFormContext();
    var birthDate = formContext.getAttribute("birthdate").getValue();
    var today = new Date();
    var validMinDate = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate(), today.getHours(),
        today.getMinutes());
    var validMaxDate = new Date(
        today.getFullYear() - 55,
        today.getMonth(),
        today.getDate(), today.getHours(),
        today.getMinutes());
    var birthDateFieldControl = formContext.getControl("birthdate");
    if (birthDate > validMinDate && birthDate < validMaxDate) {
        birthDateFieldControl.setNotification("Minimum age must be 18 years!");
    }
    else {
        birthDateFieldControl.clearNotification("BDATE");
    }
};