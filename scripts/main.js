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
}

let closeModal = () => {
    modalOverlay.classList.remove('active');
    isModalOpen = false;
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

let menuPanel = document.createElement('div');
menuPanel.className = 'menu-panel';

menuPanel.innerHTML = '<div class="menu-content"><h4>Menu</h4><ul><li><a href="#">Home</a></li><li><a href="#">About</a></li><li><a href="#">Services</a></li><li><a href="#">Contact</a></li></ul></div>';

document.body.appendChild(menuPanel);

let isMenuOpen = false;

let getWidth = () => window.innerWidth;

let closeMenu = () => {
    isMenuOpen = false;
    menuPanel.classList.remove('active');
}

let openMenu = () => {
    isMenuOpen = true;

    if (getWidth() > 736) {
        menuPanel.classList.remove('side-tray-mode');
        let header = document.querySelector('header');
        let headerBottom = header.getBoundingClientRect().bottom;
        menuPanel.style.top = headerBottom + 'px';
        menuPanel.style.left = '50%';
        menuPanel.style.transform = 'translateX(-50%)';
    } else {
        menuPanel.classList.add('side-tray-mode');
        menuPanel.style.top = '0';
        menuPanel.style.left = '0';
        menuPanel.style.transform = 'none';
    }

    menuPanel.classList.add('active');
}

let toggleMenu = () => {
    if (isMenuOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}

window.addEventListener('resize', () => {
    if (isMenuOpen) {
        closeMenu();
        openMenu();
    }
});

let init = () => {
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
        menuPanel.classList.add('side-tray-mode');
    }
}

init();
