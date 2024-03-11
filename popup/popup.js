const showQRImg = (name) => {
    const fontEl = document.getElementById('font');
    fontEl.style.display = 'none';

    const imgEls = document.getElementsByClassName('img');
    for (let i = 0; i < imgEls.length; i++) {
        const element = imgEls[i];
        if (element.id === `${name}-img`) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    }

    const QREl = document.getElementById('QR');
    QREl.style.display = 'block';

    const backBtn = document.getElementById('back-btn');
    backBtn.style.display = 'flex';
}

const onBack = () => {
    const backBtn = document.getElementById('back-btn');
    backBtn.style.display = 'none';

    const QREl = document.getElementById('QR');
    QREl.style.display = 'none';

    const fontEl = document.getElementById('font');
    fontEl.style.display = 'block';
}

const handleClickEatBtn = () => {
    showQRImg('eat');
}

const handleClickDrinkBtn = () => {
    showQRImg('drink');
}

const handleClickChatBtn = () => {
    showQRImg('chat');
}

const handleClickMeetBtn = () => {
    showQRImg('meet');
}

// Get element: buttons
document.addEventListener('DOMContentLoaded', function() {
    const eatBtn = document.getElementById('eat-btn')
    const drinkBtn = document.getElementById('drink-btn')
    const chatBtn = document.getElementById('chat-btn')
    const meetBtn = document.getElementById('meet-btn')
    const backBtn = document.getElementById('back-btn')

    // Add Events for btn
    if (eatBtn) eatBtn.addEventListener('click', handleClickEatBtn)
    if (drinkBtn) drinkBtn.addEventListener('click', handleClickDrinkBtn)
    if (chatBtn) chatBtn.addEventListener('click', handleClickChatBtn)
    if (meetBtn) meetBtn.addEventListener('click', handleClickMeetBtn)
    if (backBtn) backBtn.addEventListener('click', onBack)
})
