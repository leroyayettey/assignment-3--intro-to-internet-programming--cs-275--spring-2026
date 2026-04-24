let modalOverlay = document.createElement('div');
let modalContainer = document.createElement('div');
let modalContent = document.createElement('div');

modalOverlay.className = 'modal-overlay';
modalContainer.className = 'modal-container';
modalContent.className = 'modal-content';

modalContent.innerHTML = '<h3>Modal Window</h3><p>Click background or press ESC to close</p>';

modalContainer.appendChild(modalContent);
modalOverlay.appendChild(modalContainer);
document.body.appendChild(modalOverlay);

let isModalOpen = false;

let openModal = () => {
    modalOverlay.classList.add('active');
    isModalOpen = true;
    document.body.style.overflow = 'hidden';
}

let closeModal = () => {
    modalOverlay.classList.remove('active');
    isModalOpen = false;
    document.body.style.overflow = '';
}

modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isModalOpen) {
        closeModal();
    }
});

let nav = document.querySelector('nav');
let header = document.querySelector('header');
let isMenuOpen = false;
let getWidth = () => window.innerWidth;

let updateMenuPosition = () => {
    if (isMenuOpen && getWidth() > 736) {
        let headerBottom = header.getBoundingClientRect().bottom;
        nav.style.top = headerBottom + 'px';
        nav.style.left = '50%';
        nav.style.transform = 'translateX(-50%)';
    }
}

let closeMenu = () => {
    isMenuOpen = false;
    nav.classList.remove('menu-visible');
    nav.style.position = '';
    nav.style.top = '';
    nav.style.left = '';
    nav.style.transform = '';
    nav.style.width = '';
    nav.style.background = '';
    nav.style.borderRadius = '';
    nav.style.boxShadow = '';
    nav.style.height = '';
}

let openMenu = () => {
    isMenuOpen = true;

    if (getWidth() > 736) {
        nav.classList.remove('side-tray-mode');
        let headerBottom = header.getBoundingClientRect().bottom;
        nav.style.position = 'absolute';
        nav.style.top = headerBottom + 'px';
        nav.style.left = '50%';
        nav.style.transform = 'translateX(-50%)';
        nav.style.width = 'auto';
        nav.style.background = '#2a2a4e';
        nav.style.borderRadius = '8px';
        nav.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        nav.style.height = 'auto';
    } else {
        nav.classList.add('side-tray-mode');
        nav.style.position = 'fixed';
        nav.style.top = '0';
        nav.style.left = '0';
        nav.style.transform = 'translateX(0)';
        nav.style.width = '260px';
        nav.style.height = '100%';
        nav.style.background = '#2a2a4e';
        nav.style.borderRadius = '0';
        nav.style.boxShadow = 'none';
    }

    nav.classList.add('menu-visible');
}

let toggleMenu = () => {
    if (isMenuOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}

window.addEventListener('scroll', () => {
    if (isMenuOpen && getWidth() > 736) {
        updateMenuPosition();
    }
});

window.addEventListener('resize', () => {
    if (isMenuOpen) {
        if (getWidth() <= 736) {
            nav.classList.add('side-tray-mode');
            nav.style.position = 'fixed';
            nav.style.top = '0';
            nav.style.left = '0';
            nav.style.transform = 'translateX(0)';
            nav.style.width = '260px';
            nav.style.height = '100%';
            nav.style.background = '#2a2a4e';
            nav.style.borderRadius = '0';
        } else {
            nav.classList.remove('side-tray-mode');
            let headerBottom = header.getBoundingClientRect().bottom;
            nav.style.position = 'absolute';
            nav.style.top = headerBottom + 'px';
            nav.style.left = '50%';
            nav.style.transform = 'translateX(-50%)';
            nav.style.width = 'auto';
            nav.style.background = '#2a2a4e';
            nav.style.borderRadius = '8px';
            nav.style.height = 'auto';
        }
    }
});

let triggers = document.getElementById('js-triggers');
let menuBtn = triggers.querySelector('li:first-child a');
let modalBtn = triggers.querySelector('li:last-child a');

menuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleMenu();
});

modalBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
});

if (getWidth() <= 736) {
    nav.classList.add('side-tray-mode');
}
