const passwordIcon = document.getElementById('toggle-password-visibility'); 

const change = () => {
  const passwordInput = document.getElementById('id-admin-password');
  const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);

  passwordIcon.name = passwordIcon.name === 'eye' ? 'eye-off' : 'eye';
}

passwordIcon.addEventListener('click' , change)
