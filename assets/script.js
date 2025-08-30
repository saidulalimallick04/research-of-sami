document.addEventListener('DOMContentLoaded', () => {
    const politicalContainer = document.querySelector('#political-research .research-grid');
    const educationalContainer = document.querySelector('#educational-research .research-grid');
    
    // --- CARD RENDERING ---
    function createCard(item) {
        return `
            <div class="card rounded-lg overflow-hidden flex flex-col opacity-0 research-card" data-title="${item.title.toLowerCase()} ${item.date}">
                <img src="${item.image}" alt="Thumbnail for ${item.title}" class="w-full h-48 object-cover">
                <div class="p-6 flex-grow flex flex-col">
                    <a href="${item.link}"><h3 class="text-xl font-bold mb-2 flex-grow">${item.title}</h3></a>
                    <p class="text-sm mb-4" style="color: var(--subtext-color);">${item.date}</p>
                    <div class="flex items-center justify-end space-x-6 mt-auto" style="color: var(--subtext-color);">
                        <div class="flex items-center space-x-2">
                            <i class="fas fa-heart"></i>
                            <span>${item.likes}</span>
                        </div>
                        <div class="flex items-center space-x-2">
                            <i class="fas fa-comment"></i>
                            <span>${item.comments}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function renderCards() {
        let politicalHTML = '';
        let educationalHTML = '';
        researchData.forEach(item => {
            if (item.category === 'political') {
                politicalHTML += createCard(item);
            } else if (item.category === 'educational') {
                educationalHTML += createCard(item);
            }
        });
        politicalContainer.innerHTML = politicalHTML;
        educationalContainer.innerHTML = educationalHTML;
    }

    // --- THEME SWITCHER ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Function to apply the saved theme
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark');
        } else {
            body.classList.remove('dark');
        }
    };
    
    // On load, check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        const isDark = body.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // --- SEARCH FILTER ---
    const searchBar = document.getElementById('search-bar');
    const noResults = document.getElementById('no-results');

    searchBar.addEventListener('keyup', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.research-card');
        let resultsFound = false;

        cards.forEach(card => {
            if (card.dataset.title.includes(searchTerm)) {
                card.style.display = 'flex';
                resultsFound = true;
            } else {
                card.style.display = 'none';
            }
        });
        
        const sections = document.querySelectorAll('#research-container section');
        sections.forEach(section => {
            const visibleCards = section.querySelectorAll('.research-card[style*="display: flex"]');
            if (visibleCards.length === 0) {
                section.style.display = 'none';
            } else {
                section.style.display = 'block';
            }
        });
        
        noResults.style.display = resultsFound ? 'none' : 'block';
    });

    // Initial render - MUST be called before animations that target cards
    renderCards();

    // --- ANIMATIONS with GSAP ---
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.to('#nav-title', { opacity: 1, y: 0, duration: 0.8, delay: 0.2 })
        .to('#nav-links', { opacity: 1, y: 0, duration: 0.8 }, "-=0.6")
        .fromTo('#search-section', { y: 30 }, { opacity: 1, y: 0, duration: 1 }, "-=0.5")
        .to('.card', {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out'
        }, "-=0.5")
        .to(['#footer-text', '#footer-disclaimer'], { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 }, "-=0.3");

    // Header shadow on scroll
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (window.scrollY > 20) {
            header.style.backgroundColor = 'var(--bg-color)';
            header.style.boxShadow = '0 4px 6px -1px var(--shadow-color)';
        } else {
            header.style.backgroundColor = 'transparent';
            header.style.boxShadow = 'none';
        }
    });

    // Initial render
    // renderCards(); // MOVED UP
});