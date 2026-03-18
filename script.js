// Core Script for Movie Ticket System - Massive Upgrade

document.addEventListener("DOMContentLoaded", () => {
    initApp();
    setupScrollEffects();
    setupPageTransitions();
});

// Remove loader when everything is fully loaded
window.addEventListener("load", () => {
    document.body.classList.remove('page-transitioning');

    const loader = document.getElementById("global-loader");
    if (loader) {
        loader.style.opacity = "0";
        setTimeout(() => loader.remove(), 600);
    }
});

function initApp() {
    renderNavbar();
    setupGlobalSearch();
    renderFooter();
    renderTrailerModal();

    if (!localStorage.getItem('selectedCity')) {
        localStorage.setItem('selectedCity', 'Delhi');
    }
}

// ------------------------------------
// GLOBAL UI COMPONENTS
// ------------------------------------

function renderTrailerModal() {
    if (document.getElementById('trailer-modal-root')) return;

    const modalHTML = `
        <div id="trailer-modal-root" class="trailer-modal">
            <div class="trailer-content">
                <button class="close-modal" onclick="closeTrailer()">×</button>
                <iframe id="trailer-frame" src="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function openTrailer(e, url) {
    e.stopPropagation(); // Prevent card click
    const modal = document.getElementById('trailer-modal-root');
    const iframe = document.getElementById('trailer-frame');

    // Add autoplay param
    const videoUrl = new URL(url);
    videoUrl.searchParams.set('autoplay', '1');
    iframe.src = videoUrl.toString();

    modal.classList.add('active');
}

function closeTrailer() {
    const modal = document.getElementById('trailer-modal-root');
    const iframe = document.getElementById('trailer-frame');
    modal.classList.remove('active');
    setTimeout(() => iframe.src = "", 300); // clear src to stop video
}

function renderNavbar() {
    const navContainer = document.getElementById("navbar-container");
    if (!navContainer) return;

    const userStr = localStorage.getItem("currentUser");
    let userHtml = '';

    if (userStr) {
        const user = JSON.parse(userStr);
        userHtml = `
            <div class="user-menu" style="display:flex; align-items:center; gap:20px;">
                <span class="user-name">Hi, ${user.name.split(' ')[0]}</span>
                <a href="profile.html" class="transition-link" style="color: var(--primary-color); font-weight: 600; text-decoration: none;">My Profile</a>
                <span class="logout-target" onclick="logout()">Logout</span>
            </div>
        `;
    } else {
        userHtml = `
            <div class="nav-links">
                <a href="login.html" class="btn btn-outline" style="padding: 8px 18px;">Login</a>
                <a href="signup.html" class="btn btn-primary" style="padding: 8px 18px;">Signup</a>
            </div>
        `;
    }

    const currentCity = localStorage.getItem('selectedCity') || 'Delhi';
    let cityOptions = cities.map(c => `<option value="${c}" ${c === currentCity ? 'selected' : ''}>${c}</option>`).join('');

    const navbarHtml = `
        <nav class="navbar" id="main-nav">
            <div class="container nav-container">
                <div class="nav-left">
                    <a href="HOME PAGE.html" class="logo transition-link">Movie Ticket System</a>
                    <div class="nav-links" style="margin-left:20px;">
                        <a href="movies.html" class="transition-link">Movies</a>
                    </div>
                </div>
                <div class="nav-center">
                    <input type="text" id="global-search" placeholder="Search movies...">
                </div>
                <div class="nav-right">
                    <select class="city-selector" onchange="changeCity(this.value)">
                        ${cityOptions}
                    </select>
                    ${userHtml}
                </div>
            </div>
        </nav>
    `;
    navContainer.innerHTML = navbarHtml;

    // Active Link styling
    const currentPage = window.location.pathname.split("/").pop().replace(/%20/g, ' ');
    const links = navContainer.querySelectorAll('.nav-left .nav-links a');
    links.forEach(link => {
        if (link.getAttribute('href') === currentPage ||
            (currentPage === 'HOME PAGE.html' && link.getAttribute('href') === 'movies.html')) {
            link.classList.add('active');
        }
    });
}

function setupGlobalSearch() {
    const searchInput = document.getElementById('global-search');
    if (!searchInput) return;

    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('search');
    const isMoviesPage = window.location.pathname.includes('movies.html');

    if (isMoviesPage && query) {
        searchInput.value = query;
    }

    let globalSearchTimeout = null;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(globalSearchTimeout);
        const term = e.target.value.trim();

        globalSearchTimeout = setTimeout(() => {
            if (isMoviesPage) {
                document.dispatchEvent(new CustomEvent('navSearch', { detail: { query: term } }));
            } else {
                if (term) {
                    window.location.href = `movies.html?search=${encodeURIComponent(term)}`;
                }
            }
        }, 400);
    });
}

function renderFooter() {
    const footerContainer = document.getElementById("footer-container");
    if (!footerContainer) return;

    footerContainer.innerHTML = `
        <footer class="fade-in-section">
            <div class="container">
                <div class="flex-between" style="align-items:flex-start; flex-wrap:wrap; gap:30px;">
                    <div class="footer-col" style="max-width:300px;">
                        <div class="logo" style="font-size: 2rem; margin-bottom: 15px;">Movie Ticket System</div>
                        <p class="text-muted" style="font-family: var(--font-body); font-size:0.9rem;">Your premium destination for cinematic experiences.</p>
                    </div>
                    <div class="footer-col">
                        <h3>Categories</h3>
                        <ul class="footer-links">
                            <li><a href="movies.html" class="transition-link">Movies</a></li>
                        </ul>
                    </div>
                    <div class="footer-col">
                        <h3>Trending Cities</h3>
                        <ul class="footer-links">
                            <li><a href="javascript:changeCity('Mumbai')">Mumbai</a></li>
                            <li><a href="javascript:changeCity('Delhi')">Delhi NCR</a></li>
                            <li><a href="javascript:changeCity('Bangalore')">Bangalore</a></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom mt-4">
                    &copy; ${new Date().getFullYear()} Movie Ticket System Cinematic. All rights reserved.
                </div>
            </div>
        </footer>
    `;
}

// ------------------------------------
// CORE LOGIC & TRICKS
// ------------------------------------

function setupScrollEffects() {
    const nav = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (nav) {
            if (window.scrollY > 50) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
        }
    });

    document.querySelectorAll('.main-content > div:not(.fade-in-section)').forEach(el => el.classList.add('fade-in-section'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-section').forEach(el => observer.observe(el));
}

function setupPageTransitions() {
    document.addEventListener('click', e => {
        const link = e.target.closest('.transition-link');
        if (link && link.href && link.target !== '_blank') {
            e.preventDefault();
            document.body.classList.add('page-transitioning');
            setTimeout(() => window.location.href = link.href, 400);
        }
    });
}

function changeCity(city) {
    localStorage.setItem("selectedCity", city);
    const currentPage = window.location.pathname.split("/").pop().replace(/%20/g, ' ');
    const noRefreshPages = ['login.html', 'signup.html', 'payment.html', 'index.html'];
    if (!noRefreshPages.includes(currentPage)) {
        document.body.classList.add('page-transitioning');
        setTimeout(() => window.location.href = "HOME PAGE.html", 400);
    }
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.reload();
}

function getUrlParameter(name) {
    name = name.replace(/[\\[]/, '\\[').replace(/[\\]]/, '\\]');
    var regex = new RegExp('[\\\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\\+/g, ' '));
}

// ------------------------------------
// ADVANCED CARD GENERATOR
// ------------------------------------

function generateCardHTML(item, type = 'movie') {
    let detailLink = type === 'movie' ? `movie-detail.html?id=${item.id}` : `booking.html?id=${item.id}&type=${type}`;
    let bookLink = `booking.html?id=${item.id}&type=${type}`;

    let subtitle = type === 'movie' ? item.genre : item.date;
    let extra = type === 'movie' ? `<span class="rating">★ ${item.rating}</span>` : `<span style="color:var(--text-main); font-weight:700;">${item.location}</span>`;

    // Build Overlay specific to type
    let overlayContent = '';

    if (type === 'movie') {
        let castHtml = '';
        if (item.cast && item.cast.length > 0) {
            castHtml = `<div class="card-hover-cast">
                ${item.cast.slice(0, 3).map(c => `<img src="${c.image}" title="${c.name}">`).join('')}
            </div>`;
        }

        overlayContent = `
            ${castHtml}
            <div class="card-hover-synopsis">${item.synopsis || "An epic cinematic journey awaits..."}</div>
            <div class="card-hover-actions">
                ${item.trailer ? `<button class="btn btn-outline" style="width:100%; padding:10px;" onclick="openTrailer(event, '${item.trailer}')">Watch Trailer</button>` : ''}
                <button class="btn btn-primary" style="width:100%; padding:10px;" onclick="event.stopPropagation(); window.location.href='${bookLink}'">Book Tickets</button>
            </div>
        `;
    } else {
        // Event Type
        overlayContent = `
            <div class="card-hover-synopsis" style="text-align:center;">
                <h4 style="color:white; margin-bottom:10px;">${item.venueName}</h4>
                <p style="color:var(--primary-color); font-weight:bold;">${item.time}</p>
                <p style="margin-top:10px; font-size:0.8rem;">Live Experience from ₹${item.tiers ? Object.values(item.tiers)[0] : '800'}</p>
            </div>
            <div class="card-hover-actions">
                <button class="btn btn-primary" style="width:100%; padding:10px; margin-top:10px;" onclick="event.stopPropagation(); window.location.href='${bookLink}'">Get Tickets</button>
            </div>
        `;
    }

    // Outer click goes to detail (if movie) or direct to booking (if event)
    return `
        <div class="card" onclick="window.location.href='${detailLink}'">
            <div class="card-img-wrap">
                <img src="${item.poster}" alt="${item.title}" class="card-img">
            </div>
            
            <div class="card-body">
                <div class="card-title">${item.title}</div>
                <div class="card-meta">
                    <span style="border: 1px solid var(--border-color); padding: 4px 10px; border-radius: 50px; color: var(--text-muted); font-weight:500; font-size:0.75rem;">${subtitle}</span>
                    ${extra}
                </div>
            </div>

            <div class="card-hover-overlay">
                ${overlayContent}
            </div>
        </div>
    `;
}
