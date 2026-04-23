let modalOverlay = document.createElement('div');
let modalContainer = document.createElement('div');
let modalContent = document.createElement('div');

let retrieveViewportWidth = function(){
    return window.innerWidth;
}

let retrieveBreakpoint = function(){
    return 736;
}

let menuPanel = document.createElement('div');
menuPanel.className = 'menu-panel';

modalOverlay.className = 'modal-overlay';
modalContainer.className = 'modal-container';
modalContent.className = 'modal-content';

let isModalOpen = false;

modalContainer.appendChild(modalContent);
modalOverlay.appendChild(modalContainer);

document.body.appendChild(modalOverlay);

let openModal = () => {
    modalOverlay.classList.add(`active`);
    isModalOpen = true;
    document.body.style.overflow = `hidden`;
}

let closeModal = () => {
    modalOverlay.classList.remove(`active`);
    isModalOpen = false;
    document.body.style.overflow = ``;
}

modalOverlay.addEventListener('click', function(e){
    if (e.target === modalOverlay){
        closeModal();
    }
});

document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')){
        closeModal();
    }
});







