// មុខងារបើក និងបិទផ្ទាំង Login Popup
function openLoginModal() {
  document.getElementById('loginModal').classList.add('active');
}

function closeLoginModal() {
  document.getElementById('loginModal').classList.remove('active');
}

// មុខងារ Handle Login ពេលចុច Submit Form
function handleLogin(event) {
  event.preventDefault(); // ការពារកុំឱ្យ Page Refresh

  const email = document.getElementById('loginEmail').value.trim();
  const phone = document.getElementById('loginPhone').value.trim();

  if (!email && !phone) {
    alert("សូមបញ្ចូល Gmail ឬ លេខទូរស័ព្ទរបស់អ្នក!");
    return;
  }

  const accountInfo = email ? email : phone;
  
  // ប្តូរ UI បង្ហាញឈ្មោះអ្នកប្រើប្រាស់
  const userStatus = document.getElementById('userStatus');
  userStatus.innerHTML = `
    <div style="display: flex; align-items: center; gap: 10px;">
      <span style="color: #00ff87; font-weight: bold;"><i class="fa-solid fa-user-check"></i> ${accountInfo}</span>
      <button onclick="logout()" class="btn-login" style="background: #333; color: #fff;">ចាកចេញ</button>
    </div>
  `;

  // បិទ Pop-up
  closeLoginModal();
  alert("ចូលប្រព័ន្ធជោគជ័យ! ស្វាគមន៍មកកាន់ប្រព័ន្ធ។");
}

// មុខងារ Logout
function logout() {
  location.reload();
    }
