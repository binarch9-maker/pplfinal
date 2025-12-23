// Header Common Functions for Smart Health Center

// Toggle notification dropdown
function toggleNotification() {
  const dropdown = document.getElementById('notificationDropdown');
  const userDropdown = document.getElementById('userDropdown');
  dropdown.classList.toggle('show');
  userDropdown.classList.remove('show');
  document.getElementById('userProfile').classList.remove('active');
}

// Toggle user dropdown
function toggleUserDropdown() {
  const dropdown = document.getElementById('userDropdown');
  const notifDropdown = document.getElementById('notificationDropdown');
  const userProfile = document.getElementById('userProfile');
  dropdown.classList.toggle('show');
  userProfile.classList.toggle('active');
  notifDropdown.classList.remove('show');
}

// Close all nav dropdowns except the provided one
function closeNavDropdowns(exceptDropdown) {
  document.querySelectorAll('.nav-dropdown.open').forEach(dropdown => {
    if (dropdown === exceptDropdown) return;
    dropdown.classList.remove('open');
    const toggleBtn = dropdown.querySelector('.dropdown-toggle');
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
  });
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(event) {
  const notifBell = document.querySelector('.notification-bell');
  const userProfile = document.getElementById('userProfile');
  const navDropdown = event.target.closest('.nav-dropdown');
  
  if (notifBell && !notifBell.contains(event.target)) {
    const notifDropdown = document.getElementById('notificationDropdown');
    if (notifDropdown) notifDropdown.classList.remove('show');
  }
  
  if (userProfile && !userProfile.contains(event.target)) {
    const userDropdown = document.getElementById('userDropdown');
    if (userDropdown) userDropdown.classList.remove('show');
    userProfile.classList.remove('active');
  }

  // Close nav dropdowns when clicking outside any nav dropdown
  if (!navDropdown) {
    closeNavDropdowns();
  }
});

// Initialize header on page load
window.addEventListener('load', function() {
  // Set username from session
  const username = sessionStorage.getItem('username') || 'Demo Pasien';
  const userNameEl = document.getElementById('userName');
  const headerUserNameEl = document.getElementById('headerUserName');
  
  if (userNameEl) userNameEl.textContent = username;
  if (headerUserNameEl) headerUserNameEl.textContent = username;
  
  // Update avatar initials
  const initials = username.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  const avatarEl = document.querySelector('.user-avatar');
  if (avatarEl) avatarEl.textContent = initials;

  // Enable nav dropdown toggle via click
  const navDropdownToggles = document.querySelectorAll('.nav-dropdown .dropdown-toggle');
  navDropdownToggles.forEach(toggleBtn => {
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.addEventListener('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
      const parentDropdown = toggleBtn.closest('.nav-dropdown');
      if (!parentDropdown) return;
      const isOpen = parentDropdown.classList.contains('open');
      if (isOpen) {
        parentDropdown.classList.remove('open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        return;
      }
      closeNavDropdowns(parentDropdown);
      parentDropdown.classList.add('open');
      toggleBtn.setAttribute('aria-expanded', 'true');
    });
  });
});
