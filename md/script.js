// Código JS para validar y dar feedback usando Materialize (M.toast)
document.addEventListener('DOMContentLoaded', function() {
  // Referencias a elementos del DOM
  const loginForm = document.getElementById('loginForm');
  const loginCard = document.getElementById('loginCard');
  const profileCard = document.getElementById('profileCard');
  const profileName = document.getElementById('profileName');
  const profileEmail = document.getElementById('profileEmail');
  const profileInitial = document.getElementById('profileInitial');
  const logoutBtn = document.getElementById('logoutBtn');
  const guestBtn = document.getElementById('guestBtn');

  // Función para redirigir al carrito
  function redirectToCarrito(userType, userEmail) {
    // Guardar datos de usuario en localStorage para el carrito
    localStorage.setItem('currentUser', JSON.stringify({
      username: userEmail ? userEmail.split('@')[0] : 'invitado',
      email: userEmail || 'invitado@temporal.com',
      userType: userType,
      loginTime: new Date().toISOString()
    }));

    // Mostrar mensaje de redirección
    M.toast({
      html: '🚀 Redirigiendo al carrito de compras...', 
      classes: 'blue darken-2 rounded'
    });

    // Redirigir al carrito después de 2 segundos
    setTimeout(() => {
      window.location.href = './carrito.html';
    }, 1000);}

  // Manejo del envío del formulario de login
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const pass = document.getElementById('password').value;

    // Validaciones simples
    if (!email || !email.includes('@')) {
      M.toast({
        html: '❌ Introduce un correo válido', 
        classes: 'red darken-4 rounded'
      });
      return;
    }
    
    if (!pass || pass.length < 6) {
      M.toast({
        html: '❌ La contraseña debe tener al menos 6 caracteres', 
        classes: 'red darken-4 rounded'
      });
      return;
    }

    // Si pasa validación: mostrar perfil (simulación de login)
    M.toast({
      html: '✅ Inicio de sesión correcto', 
      classes: 'green darken-2 rounded'
    });
    
    setTimeout(() => {
      loginCard.style.display = 'none';
      profileName.textContent = email.split('@')[0];
      profileEmail.textContent = email;
      profileInitial.textContent = (email.split('@')[0] || '?')[0].toUpperCase();
      profileCard.style.display = 'block';

      // Redirigir al carrito después de mostrar el perfil
      setTimeout(() => {
        redirectToCarrito('user', email);
      }, 1500);
    }, 350);
  });

  // Manejo del botón de invitado
  guestBtn.addEventListener('click', function(ev) {
    ev.preventDefault();
    M.toast({
      html: '👤 Entrando como invitado', 
      classes: 'blue rounded'
    });
    
    setTimeout(() => {
      loginCard.style.display = 'none';
      profileName.textContent = 'Invitado';
      profileEmail.textContent = 'invitado@ejemplo.com';
      profileInitial.textContent = 'I';
      profileCard.style.display = 'block';

      // Redirigir al carrito como invitado
      setTimeout(() => {
        redirectToCarrito('guest', null);
      }, 1500);
    }, 300);
  });

  // Manejo del botón de cerrar sesión
  logoutBtn.addEventListener('click', function() {
    // Limpiar datos del usuario
    localStorage.removeItem('currentUser');
    
    profileCard.style.display = 'none';
    loginCard.style.display = 'block';
    
    // Limpiar inputs
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    
    M.toast({
      html: '👋 Sesión cerrada', 
      classes: 'grey rounded'
    });
  });

});