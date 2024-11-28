document.addEventListener('DOMContentLoaded', () => {
    const projectsData = {
        'dwarf-studio': {
            title: 'Stage Dwarf Animation Studio',
            content: `
                <p>Lors de ce stage très enrichissant d'un point de vue personnel comme professionnel chez Dwarf Animation Studio,
                j'ai eu l'occasion de travailler sur le pipeline de production du studio afin d'y implémenter une nouvelle fonctionnalité, 
                la résolution des problèmes et l'amélioration de la qualité du code pour une meilleure maintenance à long terme.</p>
                
                <p>La fonctionnalité que j'ai ajouté au pipeline consistait à automatiser la création d'un dossier de LookDev sur le logiciel Unreal Engine.
                Ce dossier est essentiel pour un studio d'animation car il permet de visualiser un asset 3D dans une scène avant d'être validé et d'être mis en production.</p>
            `,
            images: ['../ressources/images/lookdev_exemple.PNG', '../ressources/images/hook_func.PNG']
        },
        'internship': {
            title: 'Site de gestion des stages',
            content: `
                <p>Ce projet consiste en la réalisation d'un site web qui doit correspondre aux besoins spécifiques d'un client.
                Nous avons utilisé PHP, HTML, CSS, JavaScript et SQL pour développer cette application.</p>
                
                <p>Mon rôle principal était celui de développeur mais j'ai également été ScrumMaster pendant une partie du projet,
                veillant à la réalisation du travail et à la résolution des conflits au sein de l'équipe.</p>
            `,
            images: ['../ressources/images/sae.png']
        },
        'rails': {
            title: 'Les Aventuriers du rail',
            content: `
                <p>Ce projet, réalisé en première année de BUT consistait à développer un jeu de société appelé "Les aventuriers du Rail" en Java/JavaFX.
                En binôme, nous avons développé ce jeu en deux parties : la mécanique du jeu en Java et l'IHM en JavaFX.</p>
            `,
            images: ['../ressources/images/rails.png']
        },
        'mastermind': {
            title: 'Mastermind',
            content: `
                <p>Ce projet a été réalisé en première année de BUT en binôme, nous avons développé un jeu de Mastermind en Java.
                Le projet consistait à coder les mécaniques du jeu et les tester grâce à des tests unitaires.</p>
            `,
            images: ['../ressources/images/mastermind.png']
        }
    };

    // // Créer la modal de détail du projet
    // const createProjectDetail = () => {
    //     const detailElement = document.createElement('div');
    //     detailElement.className = 'project-detail';
    //     detailElement.innerHTML = `
    //         <div class="project-detail-content">
    //             <button class="close-button">&times;</button>
    //             <h2></h2>
    //             <div class="project-detail-body"></div>
    //         </div>
    //     `;
    //     document.body.appendChild(detailElement);
    //     return detailElement;
    // };

    const projectDetail = createProjectDetail();
    const closeButton = projectDetail.querySelector('.close-button');

    // Ajouter les événements pour chaque carte de projet
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.dataset.project;
            const project = projectsData[projectId];

            if (project) {
                const detailTitle = projectDetail.querySelector('h2');
                const detailBody = projectDetail.querySelector('.project-detail-body');

                detailTitle.textContent = project.title;
                detailBody.innerHTML = `
                    ${project.content}
                    <div class="project-images">
                        ${project.images.map(img => `
                            <img src="${img}" alt="${project.title}" style="max-width: 100%; margin: 1rem 0;">
                        `).join('')}
                    </div>
                `;

                projectDetail.classList.add('active');
            }
        });
    });

    // Fermer la modal
    closeButton.addEventListener('click', () => {
        projectDetail.classList.remove('active');
    });

    // Fermer la modal en cliquant en dehors
    projectDetail.addEventListener('click', (e) => {
        if (e.target === projectDetail) {
            projectDetail.classList.remove('active');
        }
    });

    // Fermer la modal avec la touche Echap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectDetail.classList.contains('active')) {
            projectDetail.classList.remove('active');
        }
    });
});


// Add to script.js
function setupKeyboardNavigation() {
    const cards = document.querySelectorAll('.project-card');
    let currentFocus = -1;

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            if (e.shiftKey) {
                // Move backwards
                currentFocus = currentFocus <= 0 ? cards.length - 1 : currentFocus - 1;
            } else {
                // Move forwards
                currentFocus = currentFocus >= cards.length - 1 ? 0 : currentFocus + 1;
            }
            cards[currentFocus].focus();
        }

        if (e.key === 'Enter' && document.activeElement.classList.contains('project-card')) {
            document.activeElement.click();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setupKeyboardNavigation();
    // ... rest of your existing code
});

