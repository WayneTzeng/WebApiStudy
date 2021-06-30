const uri = 'api/StaffItems';
let todos = [];

function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        //console.log(data)
        //.then(data => _displayItems(data))
        .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
    //var timeInMs = Date.now();
    const addIDTextbox = document.getElementById('add-ID');
    const addDepartmentTextbox = document.getElementById('add-Department');
    const addNameTextbox = document.getElementById('add-Name');
    const addPositionTextbox = document.getElementById('add-Position');
    const addSeniorityTextbox = document.getElementById('add-Seniority');


    const item = {
        //isComplete: Date.now(),
        ID: addIDTextbox.value.trim(),
        Department: addDepartmentTextbox.value.trim(),
        Name: addNameTextbox.value.trim(),
        Position: addPositionTextbox.value.trim(),
        Seniority: addSeniorityTextbox.value.trim(),
    };
    console.log(item)
    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => response.json())
        .then(() => {
            getItems();
            addIDTextbox.value = '';
            addDepartmentTextbox.value = '';
            addNameTextbox.value = '';
            addPositionTextbox.value = '';
            addSeniorityTextbox.value = '';
        })
        .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(id) {
    const item = todos.find(item => item.id === id);

    document.getElementById('edit-name').value = item.name;
    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-isComplete').checked = item.isComplete;
    document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
    const itemId = document.getElementById('edit-id').value;
    const item = {
        id: parseInt(itemId, 10),
        isComplete: document.getElementById('edit-isComplete').checked,
        name: document.getElementById('edit-name').value.trim()
    };

    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(() => getItems())
        .catch(error => console.error('Unable to update item.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
    const name = (itemCount === 1) ? 'to-do' : 'to-dos';

    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
    const tBody = document.getElementById('todos');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {
        let isCompleteCheckbox = document.createElement('input');
        isCompleteCheckbox.type = 'checkbox';
        isCompleteCheckbox.disabled = true;
        isCompleteCheckbox.checked = item.isComplete;

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        //td1.appendChild(isCompleteCheckbox);
        let textNodeisComplete = document.createTextNode(item.isComplete);
        td1.appendChild(textNodeisComplete);

        let td2 = tr.insertCell(1);
        let textNodeid = document.createTextNode(item.id);
        td2.appendChild(textNodeid);

        let td3 = tr.insertCell(2);
        let textNodedepartment = document.createTextNode(item.department);
        td3.appendChild(textNodedepartment);

        let td4 = tr.insertCell(3);
        let textNodename = document.createTextNode(item.name);
        td4.appendChild(textNodename);

        let td5 = tr.insertCell(4);
        let textNodeposition = document.createTextNode(item.position);
        td5.appendChild(textNodeposition);

        let td6 = tr.insertCell(5);
        let textNodeseniority = document.createTextNode(item.seniority);
        td6.appendChild(textNodeseniority);

        let td7 = tr.insertCell(6);
        td7.appendChild(editButton);

        let td8 = tr.insertCell(7);
        td8.appendChild(deleteButton);


    });

    todos = data;
}