// Constants
const PUSHBULLET_URI = 'https://api.pushbullet.com/v2/pushes';
const PUSHBULLET_TOKEN = 'o.UZoJwGKoVcMjqLKNVm6RH7DfDVrIBMQ6';
const me = { name: 'Ngoan ❤️️ xinh 🎀 iu 😘' }
const BTN_STORAGE_KEY = 'btns';
const initBtns = [
    { id: 'eat-btn', msg: 'Em đói rùi 🍕', color: '#ffffb8' },
    { id: 'drink-btn', msg: 'Mún tà tưa 🧋', color: '#fff1b8' },
    { id: 'chat-btn', msg: 'Em nhớ anh 💭', color: '#ffd6e7' },
    { id: 'meet-btn', msg: 'Iu nhắm 🥺', color: '#ffa39e' },
    { id: 'sleep-btn', msg: 'Em ngủ rùi 😴', color: '#b8ffff' },
    { id: 'study-btn', msg: 'Em học rùi 📚', color: '#ffb8ff' },
    { id: 'play-btn', msg: 'Em chơi rùi 🎮', color: '#b8b8ff' },
    { id: 'love-btn', msg: 'Em yêu anh 😍', color: '#ff0000' },
];

// Functions: handle fetching
const handleFetchingBtn = (btn) => {
    const btnEl = document.getElementById(btn.id);
    btnEl.disabled = true;
    const spinnerEl = document.createElement('i');
    spinnerEl.className = 'fa fa-spinner fa-spin';
    spinnerEl.style = 'position: absolute; right: 5px';
    btnEl.appendChild(spinnerEl);
}
const handleFetchBtnSuccess = (btn) => {
    const btnEl = document.getElementById(btn.id);
    const checkedEl = document.createElement('i');
    checkedEl.className = 'fa fa-check';
    checkedEl.style = 'position: absolute; right: 5px';
    btnEl.removeChild(btnEl.lastChild);
    btnEl.appendChild(checkedEl);
}
const handleFetchBtnError = (btn) => {
    const element = document.getElementById(btn.id);
    element.disabled = false;
    element.removeChild(element.lastChild);
}
const fetchNotify = (btn) => {
    const data = { type: 'note', title: me.name, body: btn.msg };
    const options = {
        method: 'POST',
        headers: {
            'Access-Token': PUSHBULLET_TOKEN,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    handleFetchingBtn(btn);
    fetch(PUSHBULLET_URI, options)
        .then(response => {
            if (response.ok) handleFetchBtnSuccess(btn)
            else handleFetchBtnError(btn);
        })
        .catch(error => handleFetchingBtnError(btn));
}

// Functions: control storage
const initialStorage = () => {
    if (!localStorage.getItem(BTN_STORAGE_KEY)) {
        localStorage.setItem(BTN_STORAGE_KEY, JSON.stringify(initBtns));
    }
}
const addBtnToStorage = (btn) => {
    const curBtnsStorage = JSON.parse(localStorage.getItem(BTN_STORAGE_KEY)) || [];
    curBtnsStorage.push(btn);
    localStorage.setItem(BTN_STORAGE_KEY, JSON.stringify(curBtnsStorage));
}
const reloadListBtns = () => {
    const listBtns = document.getElementById('list-btns');
    while (listBtns.firstChild) listBtns.removeChild(listBtns.firstChild);
    createBtnEls().forEach(listBtns.appendChild);
}

// Event listener: DOMContentLoaded
const createHeaderEl = () => {
    const headerEl = document.createElement('h1');
    headerEl.className = 'text heading';
    headerEl.innerText = 'Nhớ anh rồi à ❤️?';
    return headerEl;
}
const createListBtnEl = () => {
    const listBtnEl = document.createElement('div');
    listBtnEl.id = 'list-btns';
    return listBtnEl;
}
const createBtnEls = () => {
    const btnStorages = JSON.parse(localStorage.getItem(BTN_STORAGE_KEY)) || [];
    return btnStorages.map(btn => {
        const btnEl = document.createElement('button');
        btnEl.id = btn.id;
        btnEl.className = 'btn';
        btnEl.innerText = btn.msg;
        btnEl.style.backgroundColor = btn.color;
        btnEl.style.marginBottom = '10px';
        btnEl.addEventListener('click', () => fetchNotify(btn));
        return btnEl;
    });
}
const createAddBtnEl = () => {
    const addBtnEl = document.createElement('button');
    addBtnEl.id = 'add-btn';
    addBtnEl.className = 'btn';
    addBtnEl.innerText = 'Thêm nút';
    addBtnEl.style.backgroundColor = '#ffffff';
    addBtnEl.addEventListener('click', () => {
        const form = document.getElementById('form');
        form.style.display = 'flex';
        addBtnEl.style.display = 'none';
    });
    return addBtnEl;
}
const createFormEl = () => {
    const formEl = document.createElement('form');
    formEl.id = 'form';
    formEl.style.display = 'none';
    const inputEl = document.createElement('input');
    inputEl.id = 'input-btn';
    inputEl.type = 'text';
    inputEl.placeholder = 'Nhắn gửi yêu thương...';
    inputEl.autofocus = true;
    formEl.appendChild(inputEl);
    const submitBtnEl = document.createElement('button');
    submitBtnEl.id = 'submit-btn';
    submitBtnEl.className = 'btn';
    submitBtnEl.innerText = 'Thêm';
    submitBtnEl.style = 'background-color: lightblue; width: 80px; margin-left: 5px;';
    submitBtnEl.addEventListener('click', () => {
        if (inputEl.value) {
            const randomColor = Math.floor(Math.random()*16777215).toString(16);
            const newBtn = { id: inputEl.value, msg: inputEl.value, color: `#${randomColor}` };
            addBtnToStorage(newBtn);
            reloadListBtns();
        }
        formEl.style.display = 'none';
    });
    formEl.appendChild(submitBtnEl);
    return formEl;
}
document.addEventListener('DOMContentLoaded', function() {
    initialStorage();
    const container = document.getElementById('container');
    // Add header
    const headerEl = createHeaderEl();
    container.appendChild(headerEl);
    // Add list buttons
    const listBtnEl = createListBtnEl();
    const btnEls = createBtnEls();
    btnEls.forEach((btnEl) => listBtnEl.appendChild(btnEl));
    container.appendChild(listBtnEl);
    // Add add button
    const addBtnEl = createAddBtnEl();
    container.appendChild(addBtnEl);
    // Add form
    const formEl = createFormEl();
    container.appendChild(formEl);
})
