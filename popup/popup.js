const PUSHBULLET_TOKEN = 'o.UZoJwGKoVcMjqLKNVm6RH7DfDVrIBMQ6';

const sendNotify = (msg) => {
    const title = 'Ngoan ❤️️ xinh 🎀 iu 😘';
    const url = 'https://api.pushbullet.com/v2/pushes';

    const data = {
        type: 'note',
        title: title,
        body: msg
    };
    const options = {
        method: 'POST',
        headers: {
            'Access-Token': PUSHBULLET_TOKEN,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(url, options);
}

const handleClickEatBtn = () => sendNotify('Em đói rùi 🍕');
const handleClickDrinkBtn = () => sendNotify('Mún tà tưa 🧋');
const handleClickChatBtn = () => sendNotify('Nhớ anh 💭');
const handleClickMeetBtn = () => sendNotify('Iu nhắm 🥺');

// Get element: buttons
document.addEventListener('DOMContentLoaded', function() {
    const eatBtn = document.getElementById('eat-btn')
    const drinkBtn = document.getElementById('drink-btn')
    const chatBtn = document.getElementById('chat-btn')
    const meetBtn = document.getElementById('meet-btn')

    // Add Events for btn
    if (eatBtn) eatBtn.addEventListener('click', handleClickEatBtn)
    if (drinkBtn) drinkBtn.addEventListener('click', handleClickDrinkBtn)
    if (chatBtn) chatBtn.addEventListener('click', handleClickChatBtn)
    if (meetBtn) meetBtn.addEventListener('click', handleClickMeetBtn)
})
