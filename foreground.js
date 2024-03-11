// script.js

var token = ""
// Khai báo cấu hình Firebase của bạn ở đây
var firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
  
  // Khởi tạo Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Lấy đối tượng messaging
  const messaging = firebase.messaging();
  
  // Đăng ký token thiết bị để nhận thông báo
  messaging.getToken().then((currentToken) => {
    if (currentToken) {
        token = currentToken
    } else {
        token = null
    }
  }).catch((err) => {
    console.log('Lỗi lấy token:', err);
  });
  
export default token