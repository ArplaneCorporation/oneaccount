// config.json สำหรับ API URL
const config = {
  api: {
    registerUrl: 'https://script.google.com/macros/s/AKfycbykm7ddZ2005ZZ9giIER3T4uIJ25t2B1IB--A1uaE8Hr7VOkjHc7IzF1Dhu9ldlTd3C3g/exec?action=register', // เปลี่ยนเป็น URL ของ Apps Script สำหรับการสมัครสมาชิก
    loginUrl: 'https://script.google.com/macros/s/AKfycbykm7ddZ2005ZZ9giIER3T4uIJ25t2B1IB--A1uaE8Hr7VOkjHc7IzF1Dhu9ldlTd3C3g/exec?action=login'      // เปลี่ยนเป็น URL ของ Apps Script สำหรับการเข้าสู่ระบบ
  }
};

// ฟังก์ชันสำหรับการเปลี่ยนฟอร์มระหว่างล็อกอินและลงทะเบียน
document.getElementById('toggleToRegister').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('loginContainer').style.display = 'none';
  document.getElementById('registerContainer').style.display = 'block';
});

document.getElementById('toggleToLogin').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('registerContainer').style.display = 'none';
  document.getElementById('loginContainer').style.display = 'block';
});

// ฟังก์ชันสำหรับการสมัครสมาชิก
document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const name = document.getElementById('nameRegister').value;
  const username = document.getElementById('usernameRegister').value;
  const password = document.getElementById('passwordRegister').value;

  fetch(`${config.api.registerUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      action: 'register',
      name: name,
      username: username,
      password: password
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('สมัครสมาชิกสำเร็จ!');
        document.getElementById('registerContainer').style.display = 'none';
        document.getElementById('loginContainer').style.display = 'block';
      } else {
        alert(data.message);
      }
    })
    .catch(error => console.error('Error:', error));
});

// ฟังก์ชันสำหรับการเข้าสู่ระบบ
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const username = document.getElementById('usernameLogin').value;
  const password = document.getElementById('passwordLogin').value;

  fetch(`${config.api.loginUrl}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      action: 'login',
      username: username,
      password: password
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // นำไปที่หน้า dashboard
        window.location.href = 'dashboard/';
      } else {
        alert(data.message);
      }
    })
    .catch(error => console.error('Error:', error));
});
