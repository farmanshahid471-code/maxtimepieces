/**
 * Max Timepieces - Main Interactive Theme Script
 * Version 1.2.0 — Full parity with reference site interactions
 */

document.addEventListener('DOMContentLoaded', function () {

    // ─── 1. Mobile Menu Drawer ──────────────────────────────────────────────
    const mobileMenuBtn       = document.querySelector('[data-mobile-menu-trigger]');
    const mobileDrawer        = document.querySelector('[data-mobile-drawer]');
    const mobileDrawerClose   = document.querySelector('[data-mobile-drawer-close]');
    const mobileDrawerBackdrop = document.querySelector('[data-mobile-drawer-backdrop]');

    function openMobileMenu() {
        if (mobileDrawer)        mobileDrawer.classList.add('is-open');
        if (mobileDrawerBackdrop) mobileDrawerBackdrop.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
    function closeMobileMenu() {
        if (mobileDrawer)        mobileDrawer.classList.remove('is-open');
        if (mobileDrawerBackdrop) mobileDrawerBackdrop.classList.add('hidden');
        document.body.style.overflow = '';
    }

    if (mobileMenuBtn)      mobileMenuBtn.addEventListener('click', openMobileMenu);
    if (mobileDrawerClose)  mobileDrawerClose.addEventListener('click', closeMobileMenu);
    if (mobileDrawerBackdrop) mobileDrawerBackdrop.addEventListener('click', closeMobileMenu);

    // ─── 2. Collections 4-Column Mega Menu (Desktop) ────────────────────────
    const collectionsContainer = document.querySelector('[data-collections-container]');
    const collectionsTrigger   = document.querySelector('[data-collections-trigger]');
    const collectionsDropdown  = document.querySelector('[data-collections-dropdown]');

    if (collectionsTrigger && collectionsDropdown) {
        let hideTimeout = null;

        function showMegaMenu() {
            if (hideTimeout) clearTimeout(hideTimeout);
            collectionsDropdown.classList.remove('hidden');
            const chevron = collectionsTrigger.querySelector('svg');
            if (chevron) chevron.style.transform = 'rotate(180deg)';
        }
        function hideMegaMenu() {
            hideTimeout = setTimeout(() => {
                collectionsDropdown.classList.add('hidden');
                const chevron = collectionsTrigger.querySelector('svg');
                if (chevron) chevron.style.transform = '';
            }, 180);
        }

        collectionsTrigger.addEventListener('click', e => {
            e.stopPropagation();
            collectionsDropdown.classList.contains('hidden') ? showMegaMenu() : hideMegaMenu();
        });

        if (collectionsContainer) {
            collectionsContainer.addEventListener('mouseenter', showMegaMenu);
            collectionsContainer.addEventListener('mouseleave', hideMegaMenu);
        }
        collectionsDropdown.addEventListener('mouseenter', showMegaMenu);
        collectionsDropdown.addEventListener('mouseleave', hideMegaMenu);

        document.addEventListener('click', e => {
            if (!collectionsDropdown.contains(e.target) && !collectionsTrigger.contains(e.target)) {
                collectionsDropdown.classList.add('hidden');
                const chevron = collectionsTrigger.querySelector('svg');
                if (chevron) chevron.style.transform = '';
            }
        });
    }

    // ─── 3. Full-Screen Live Multi-Category Search (AJAX + Tokenized Fallback) ──────
    const searchTriggers    = document.querySelectorAll('[data-search-trigger]');
    const searchModal       = document.querySelector('[data-search-modal]');
    const searchInner       = document.querySelector('[data-search-inner]');
    const searchClose       = document.querySelector('[data-search-close]');
    const searchInput       = document.querySelector('[data-search-input]');

    const emptyState        = document.querySelector('[data-search-empty-state]');
    const noResultsState    = document.querySelector('[data-search-no-results]');
    const colSection        = document.querySelector('[data-search-collections-section]');
    const colGrid           = document.querySelector('[data-search-collections-grid]');
    const prodSection       = document.querySelector('[data-search-products-section]');
    const prodGrid          = document.querySelector('[data-search-products-grid]');
    const prodCount         = document.querySelector('[data-search-products-count]');
    const refineLink        = document.querySelector('[data-search-refine-link]');
    const moreText          = document.querySelector('[data-search-more-text]');
    const postsSection      = document.querySelector('[data-search-posts-section]');
    const postsGrid         = document.querySelector('[data-search-posts-grid]');

    const themeUrl = (window.MaxWatchesData && window.MaxWatchesData.theme_url) ? window.MaxWatchesData.theme_url : '/wp-content/themes/jack-watches';
    const ajaxUrl  = (window.MaxWatchesData && window.MaxWatchesData.ajax_url)  ? window.MaxWatchesData.ajax_url  : '/wp-admin/admin-ajax.php';
    const placeholderImg = themeUrl + '/assets/images/placeholder.webp';

    // Static collections catalog mapping
    const brandCollections = [
        { name: 'Rolex', slug: 'rolex', count: '532 models', image: themeUrl + '/assets/images/watch-rolex-submariner-super-clone.webp' },
        { name: 'Audemars Piguet', slug: 'audemars-piguet', count: '453 models', image: themeUrl + '/assets/images/watch-ap-royal-oak-super-clone.webp' },
        { name: 'Patek Philippe', slug: 'patek-philippe', count: '129 models', image: themeUrl + '/assets/images/watch-patek-philippe-nautilus-super-clone.webp' },
        { name: 'Cartier', slug: 'cartier', count: '115 models', image: themeUrl + '/assets/images/cartier-santos.jpg' },
        { name: 'Richard Mille', slug: 'richard-mille', count: '99 models', image: themeUrl + '/assets/images/watch-richard-mille-rm11-super-clone.webp' },
        { name: 'Hublot', slug: 'hublot', count: '97 models', image: themeUrl + '/assets/images/hublot.jpg' },
        { name: 'Omega', slug: 'omega', count: '87 models', image: themeUrl + '/assets/images/watch-omega-seamaster-super-clone.webp' },
        { name: 'Vacheron Constantin', slug: 'vacheron-constantin', count: '38 models', image: placeholderImg },
        { name: 'Tudor', slug: 'tudor', count: '32 models', image: placeholderImg },
        { name: 'Panerai', slug: 'panerai', count: '23 models', image: themeUrl + '/assets/images/watch-panerai-luminor-super-clone.webp' },
        { name: 'Breitling', slug: 'breitling', count: '12 models', image: placeholderImg }
    ];

    // Static Buyer Guides mapping
    const staticGuides = [
        { title: 'Best Super Clone Watch Websites USA 2026: Where to Buy', date: 'November 2026', url: '/blog/best-super-clone-watch-websites-usa-2026/' },
        { title: 'Best Site to Buy Super Clone Rolex USA: Complete Buyer Guide (2026)', date: 'November 2026', url: '/blog/best-site-to-buy-super-clone-rolex-2026/' },
        { title: '10 Things to Know Before Buying a Richard Mille Super Clone USA (2026)', date: 'November 2026', url: '/blog/best-richard-mille-super-clone-sites-usa-2026/' },
        { title: 'Cartier Santos Super Clone: Complete Buyer Guide (2026)', date: 'November 2026', url: '/blog/cartier-santos-super-clone-guide-2026/' },
        { title: 'Tudor Black Bay Super Clone: Complete Buyer Guide (2026)', date: 'November 2026', url: '/blog/tudor-black-bay-super-clone-guide-2026/' },
        { title: 'IWC Portugieser & Pilot\'s Watch Super Clone: Buyer Guide (2026)', date: 'November 2026', url: '/blog/iwc-portugieser-pilot-super-clone-guide-2026/' },
        { title: 'Breitling Navitimer Super Clone: Complete Buyer Guide (2026)', date: 'November 2026', url: '/blog/breitling-navitimer-super-clone-guide-2026/' },
        { title: 'Rolex Sea-Dweller Super Clone: Deepsea vs Standard Guide (2026)', date: 'November 2026', url: '/blog/rolex-sea-dweller-super-clone-guide-2026/' },
        { title: 'Audemars Piguet Royal Oak Offshore Super Clone: Buyer Guide (2026)', date: 'November 2026', url: '/blog/ap-royal-oak-offshore-super-clone-guide-2026/' },
        { title: 'Vacheron Constantin Overseas Super Clone: Buyer Guide (2026)', date: 'November 2026', url: '/blog/vacheron-constantin-overseas-super-clone-guide-2026/' },
        { title: 'Jaeger-LeCoultre Reverso Super Clone: Complete Guide (2026)', date: 'November 2026', url: '/blog/jaeger-lecoultre-reverso-super-clone-guide-2026/' },
        { title: 'Super Clone Watch Grades Explained: Rep 1:1 vs VSF vs ARF (2026)', date: 'November 2026', url: '/blog/super-clone-watch-grades-explained-2026/' },
        { title: 'Best Super Clone Watches 2026: Updated Editor\'s Picks (November)', date: 'November 2026', url: '/blog/best-super-clone-watches-2026-updated-list/' }
    ];

    let cachedProducts = null;
    let searchDebounceTimer = null;
    let searchAbortController = null;

    function getSearchProducts() {
        if (cachedProducts && cachedProducts.length > 0) return Promise.resolve(cachedProducts);
        return fetch(themeUrl + '/assets/data/products_detail.json')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    cachedProducts = data;
                } else if (data && typeof data === 'object') {
                    cachedProducts = Object.values(data);
                } else {
                    cachedProducts = [];
                }
                return cachedProducts;
            })
            .catch(() => {
                cachedProducts = [];
                return cachedProducts;
            });
    }

    function openSearch() {
        if (!searchModal) return;
        searchModal.classList.remove('hidden');
        searchModal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        if (searchInput) {
            setTimeout(() => searchInput.focus(), 80);
            if (searchInput.value.trim().length >= 2) {
                runLiveSearch(searchInput.value.trim());
            } else {
                resetSearchUI();
            }
        }
    }

    function closeSearch() {
        if (!searchModal) return;
        searchModal.classList.remove('is-open');
        searchModal.classList.add('hidden');
        document.body.style.overflow = '';
        if (searchAbortController) {
            searchAbortController.abort();
            searchAbortController = null;
        }
    }

    function resetSearchUI() {
        if (emptyState) emptyState.classList.remove('hidden');
        if (noResultsState) noResultsState.classList.add('hidden');
        if (colSection) colSection.classList.add('hidden');
        if (prodSection) prodSection.classList.add('hidden');
        if (postsSection) postsSection.classList.add('hidden');
        if (colGrid) colGrid.innerHTML = '';
        if (prodGrid) prodGrid.innerHTML = '';
        if (postsGrid) postsGrid.innerHTML = '';
    }

    function renderSearchResults(data, query) {
        const collections = data.collections || [];
        const products    = data.products || [];
        const posts       = data.posts || [];
        const totalCount  = data.total_count || products.length;

        if (collections.length === 0 && products.length === 0 && posts.length === 0) {
            if (emptyState) emptyState.classList.add('hidden');
            if (colSection) colSection.classList.add('hidden');
            if (prodSection) prodSection.classList.add('hidden');
            if (postsSection) postsSection.classList.add('hidden');
            if (noResultsState) noResultsState.classList.remove('hidden');
            return;
        }

        if (emptyState) emptyState.classList.add('hidden');
        if (noResultsState) noResultsState.classList.add('hidden');

        // Collections
        if (collections.length > 0 && colSection && colGrid) {
            colGrid.innerHTML = collections.map(col => `
                <a href="${col.url || '/collections/' + col.slug + '/'}" class="group border border-[#E4DFD1] hover:border-[#A88030] bg-white p-3 flex items-center justify-between gap-4 transition-colors">
                    <div class="flex items-center gap-3 min-w-0">
                        <img src="${col.image || placeholderImg}" alt="${col.name}" class="w-12 h-12 object-contain bg-[#FBF9F3] border border-[#E4DFD1] p-1 flex-shrink-0" onerror="this.src='${placeholderImg}'">
                        <div class="min-w-0">
                            <p class="font-sans text-sm font-bold text-[#14181A] group-hover:text-[#A88030] transition-colors truncate">${col.name}</p>
                            <p class="font-sans text-xs text-[#6B7268] mt-0.5">${col.count || ''}</p>
                        </div>
                    </div>
                    <span class="text-zinc-400 group-hover:text-[#A88030] text-sm pr-1 transition-colors flex-shrink-0">→</span>
                </a>
            `).join('');
            colSection.classList.remove('hidden');
        } else if (colSection) {
            colSection.classList.add('hidden');
        }

        // Products
        if (products.length > 0 && prodSection && prodGrid) {
            if (prodCount) prodCount.textContent = totalCount;
            const displayProducts = products.slice(0, 8);
            prodGrid.innerHTML = displayProducts.map(p => `
                <a href="${p.url || '/products/' + p.slug + '/'}" class="group border border-[#E4DFD1] hover:border-[#A88030] bg-white p-3 flex items-center justify-between gap-3 transition-colors">
                    <div class="flex items-center gap-3.5 min-w-0 flex-1">
                        <img src="${p.image || placeholderImg}" alt="${p.title || p.name}" class="w-14 h-14 object-cover bg-zinc-900 border border-[#E4DFD1] flex-shrink-0" onerror="this.src='${placeholderImg}'">
                        <div class="min-w-0 flex-1">
                            <p class="font-sans text-[10px] font-bold text-[#8F8E80] uppercase tracking-wider">${p.brand || 'ROLEX'}</p>
                            <p class="font-sans text-xs font-semibold text-[#14181A] group-hover:text-[#A88030] truncate transition-colors">${p.title || p.name}</p>
                            <p class="font-sans text-xs font-bold text-[#A88030] mt-0.5">${p.price || '$900'}</p>
                        </div>
                    </div>
                    <span class="text-zinc-400 group-hover:text-[#A88030] text-sm pr-2 flex-shrink-0 transition-colors">→</span>
                </a>
            `).join('');

            const moreCount = Math.max(0, totalCount - 8);
            if (refineLink && moreText) {
                refineLink.href = '/search?q=' + encodeURIComponent(query);
                moreText.textContent = `+${moreCount} more — refine to see all`;
            }
            prodSection.classList.remove('hidden');
        } else if (prodSection) {
            prodSection.classList.add('hidden');
        }

        // Blog Posts
        if (posts.length > 0 && postsSection && postsGrid) {
            postsGrid.innerHTML = posts.map(post => `
                <a href="${post.url}" class="group border border-[#E4DFD1] hover:border-[#A88030] bg-white p-3.5 flex items-center justify-between gap-4 transition-colors">
                    <div class="min-w-0">
                        <p class="font-sans text-xs font-semibold text-[#14181A] group-hover:text-[#A88030] line-clamp-2 transition-colors">${post.title}</p>
                        <p class="font-sans text-[11px] text-[#8F8E80] mt-1">${post.date}</p>
                    </div>
                    <span class="text-zinc-400 group-hover:text-[#A88030] text-sm pr-2 flex-shrink-0 transition-colors">→</span>
                </a>
            `).join('');
            postsSection.classList.remove('hidden');
        } else if (postsSection) {
            postsSection.classList.add('hidden');
        }
    }

    function executeLocalFallback(query) {
        getSearchProducts().then(products => {
            const q = query.toLowerCase().trim();
            const tokens = q.split(/\s+/).filter(Boolean);

            const matchedCols = brandCollections.filter(c => {
                const target = (c.name + ' ' + c.slug).toLowerCase();
                return tokens.some(token => target.includes(token));
            });

            const allMatched = [];
            for (let i = 0; i < products.length; i++) {
                const p = products[i];
                const target = ((p.name || '') + ' ' + (p.brand || '') + ' ' + (p.slug || '')).toLowerCase();
                if (tokens.every(token => target.includes(token))) {
                    allMatched.push({
                        title: p.name,
                        brand: p.brand || 'ROLEX',
                        slug:  p.slug,
                        price: p.price || '$900',
                        image: (p.images && p.images[0]) ? p.images[0] : placeholderImg,
                        url:   '/products/' + p.slug + '/'
                    });
                }
            }

            const matchedPosts = staticGuides.filter(g => {
                return tokens.some(token => g.title.toLowerCase().includes(token));
            });

            renderSearchResults({
                collections: matchedCols,
                products:    allMatched,
                posts:       matchedPosts,
                total_count: allMatched.length
            }, query);
        });
    }

    function runLiveSearch(query) {
        if (!query || query.length < 2) {
            resetSearchUI();
            return;
        }

        if (searchAbortController) {
            searchAbortController.abort();
        }
        searchAbortController = new AbortController();

        fetch(ajaxUrl + '?action=jack_search_watches&term=' + encodeURIComponent(query), {
            signal: searchAbortController.signal
        })
        .then(res => res.json())
        .then(res => {
            if (res && res.success && res.data) {
                renderSearchResults(res.data, query);
            } else {
                executeLocalFallback(query);
            }
        })
        .catch(err => {
            if (err.name === 'AbortError') return;
            executeLocalFallback(query);
        });
    }

    searchTriggers.forEach(btn => btn.addEventListener('click', openSearch));
    if (searchClose) searchClose.addEventListener('click', closeSearch);
    if (searchModal) {
        searchModal.addEventListener('click', e => {
            if (e.target === searchModal || !e.target.closest('[data-search-inner]')) {
                closeSearch();
            }
        });
    }

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && searchModal && !searchModal.classList.contains('hidden')) {
            closeSearch();
        }
    });

    // Quick tag clicks in empty state (Popular Searches Pills) via delegation
    document.addEventListener('click', function (e) {
        const quickBtn = e.target.closest('[data-search-quick]');
        if (quickBtn && searchInput) {
            e.preventDefault();
            const val = quickBtn.getAttribute('data-search-quick');
            searchInput.value = val;
            runLiveSearch(val);
        }
    });

    if (searchInput) {
        searchInput.addEventListener('input', function () {
            const query = this.value.trim();
            if (searchDebounceTimer) clearTimeout(searchDebounceTimer);
            if (query.length < 2) {
                resetSearchUI();
                return;
            }
            searchDebounceTimer = setTimeout(() => {
                runLiveSearch(query);
            }, 200);
        });
    }

    // ─── 4. Real-Time QC / Order Social Proof Popup (FOMO) ───
    const fomoWrap  = document.getElementById('fomo-notification-wrap');
    const fomoImg   = document.getElementById('fomo-img');
    const fomoName  = document.getElementById('fomo-name');
    const fomoLoc   = document.getElementById('fomo-loc');
    const fomoModel = document.getElementById('fomo-model');
    const fomoTime  = document.getElementById('fomo-time');
    const fomoClose = document.getElementById('fomo-close');

    if (fomoWrap && fomoName && fomoModel) {
        if (sessionStorage.getItem('fomo_dismissed') === '1') {
            fomoWrap.classList.add('hidden');
        } else {
            let fomoPool = [];
            let shuffledQueue = [];
            let queueIndex = 0;
            let fomoTimer = null;
            let isFomoPaused = false;

            function shuffleArray(arr) {
                const copy = [...arr];
                for (let i = copy.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [copy[i], copy[j]] = [copy[j], copy[i]];
                }
                return copy;
            }

            fetch(themeUrl + '/assets/data/fomo_notifications.json')
                .then(res => res.json())
                .then(data => {
                    fomoPool = Array.isArray(data) ? data : [];
                    if (fomoPool.length > 0) {
                        shuffledQueue = shuffleArray(fomoPool);
                        queueIndex = 0;
                        scheduleNextFomo(5000); // Initial 5s delay
                    }
                })
                .catch(() => {});

            function showNextFomo() {
                if (isFomoPaused || fomoPool.length === 0 || sessionStorage.getItem('fomo_dismissed') === '1') return;

                if (queueIndex >= shuffledQueue.length) {
                    shuffledQueue = shuffleArray(fomoPool);
                    queueIndex = 0;
                }

                const item = shuffledQueue[queueIndex++];

                if (fomoImg) {
                    fomoImg.src = item.image || placeholderImg;
                    fomoImg.onerror = function() {
                        this.src = placeholderImg;
                        this.onerror = null;
                    };
                }
                if (fomoName)  fomoName.textContent = item.name;
                if (fomoLoc)   fomoLoc.textContent = item.location;
                if (fomoModel) fomoModel.textContent = item.model;
                if (fomoTime)  fomoTime.textContent = item.time;

                // Slide up & fade in
                fomoWrap.classList.remove('translate-y-8', 'opacity-0');
                fomoWrap.classList.add('translate-y-0', 'opacity-100');

                // Hide after 5.5 seconds
                setTimeout(() => {
                    hideFomo();
                    if (sessionStorage.getItem('fomo_dismissed') !== '1') {
                        const nextDelay = 8000 + Math.floor(Math.random() * 6000);
                        scheduleNextFomo(nextDelay);
                    }
                }, 5500);
            }

            function hideFomo() {
                if (!fomoWrap) return;
                fomoWrap.classList.remove('translate-y-0', 'opacity-100');
                fomoWrap.classList.add('translate-y-8', 'opacity-0');
            }

            function scheduleNextFomo(delayMs) {
                clearTimeout(fomoTimer);
                fomoTimer = setTimeout(showNextFomo, delayMs);
            }

            if (fomoClose) {
                fomoClose.addEventListener('click', function (e) {
                    e.stopPropagation();
                    hideFomo();
                    sessionStorage.setItem('fomo_dismissed', '1');
                    clearTimeout(fomoTimer);
                    fomoWrap.classList.add('hidden');
                });
            }
        }
    }

    // ─── 4. Escape key ───────────────────────────────────────────────────────
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            closeMobileMenu();
            closeSearch();
            if (collectionsDropdown) collectionsDropdown.classList.add('hidden');
        }
    });

    // ─── 5. FAQ Accordion ────────────────────────────────────────────────────
    const faqItems = document.querySelectorAll('[data-faq-item]');
    faqItems.forEach(item => {
        const btn    = item.querySelector('[data-faq-question]');
        const answer = item.querySelector('[data-faq-answer]');
        const icon   = item.querySelector('[data-faq-icon]');

        if (btn && answer) {
            btn.addEventListener('click', () => {
                const isOpen = answer.classList.contains('is-open');
                // close all
                faqItems.forEach(other => {
                    const a = other.querySelector('[data-faq-answer]');
                    const ic = other.querySelector('[data-faq-icon]');
                    if (a) a.classList.remove('is-open');
                    if (ic) ic.style.transform = '';
                });
                if (!isOpen) {
                    answer.classList.add('is-open');
                    if (icon) icon.style.transform = 'rotate(180deg)';
                }
            });
        }
    });

    // ─── 6. Product Image Hover Zoom (cursor crosshair) ──────────────────────
    const mainImgContainer = document.querySelector('.cursor-crosshair');
    const mainImg = document.getElementById('main-product-image');
    if (mainImgContainer && mainImg) {
        mainImg.style.transition = 'transform 0.1s ease';
        mainImgContainer.addEventListener('mousemove', e => {
            const rect = mainImgContainer.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            mainImg.style.transformOrigin = `${x}% ${y}%`;
            mainImg.style.transform = 'scale(1.4)';
        });
        mainImgContainer.addEventListener('mouseleave', () => {
            mainImg.style.transformOrigin = 'center center';
            mainImg.style.transform = 'scale(1)';
        });
    }

    // ─── 7. Thumbnail Gallery Switcher ───────────────────────────────────────
    const thumbs = document.querySelectorAll('[data-thumb-img]');
    const mainProductImg = document.getElementById('main-product-image');
    if (thumbs.length && mainProductImg) {
        thumbs.forEach(thumb => {
            thumb.addEventListener('click', () => {
                mainProductImg.src = thumb.getAttribute('data-thumb-img');
                thumbs.forEach(t => t.classList.remove('ring-2', 'ring-[#A88030]'));
                thumb.classList.add('ring-2', 'ring-[#A88030]');
            });
        });
    }

    // ─── 8. Live Activity Counters (simulated) ───────────────────────────────
    const viewingEl  = document.querySelector('[data-viewing-count]');
    const inquiryEl  = document.querySelector('[data-inquiry-count]');

    if (viewingEl || inquiryEl) {
        const baseViewing  = parseInt(viewingEl?.dataset?.base || 14, 10);
        const baseInquiry  = parseInt(inquiryEl?.dataset?.base || 5, 10);
        const jitter = (n, range) => n + Math.floor(Math.random() * range * 2) - range;

        setInterval(() => {
            if (viewingEl) viewingEl.textContent = jitter(baseViewing, 3);
            if (inquiryEl) inquiryEl.textContent = jitter(baseInquiry, 2);
        }, 7000);
    }

    // ─── 9. Scroll Reveal ────────────────────────────────────────────────────
    const revealEls = document.querySelectorAll('.reveal-up');
    if (revealEls.length && 'IntersectionObserver' in window) {
        const obs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        revealEls.forEach(el => obs.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('in-view'));
    }

    // ─── 10. Stagger children reveal ─────────────────────────────────────────
    const staggerWrappers = document.querySelectorAll('.reveal-stagger');
    if (staggerWrappers.length && 'IntersectionObserver' in window) {
        const obs2 = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const children = entry.target.querySelectorAll('.stagger-child');
                    children.forEach((child, i) => {
                        setTimeout(() => child.classList.add('in-view'), i * 90);
                    });
                    obs2.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08 });
        staggerWrappers.forEach(el => obs2.observe(el));
    } else {
        document.querySelectorAll('.stagger-child').forEach(el => el.classList.add('in-view'));
    }

    // ─── 11. Custom Watches Filter Tabs ──────────────────────────────────────
    const filterTabs  = document.querySelectorAll('[data-filter-tab]');
    const filterCards = document.querySelectorAll('[data-filter-card]');

    if (filterTabs.length && filterCards.length) {
        filterTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                filterTabs.forEach(t => t.classList.remove('active-tab'));
                tab.classList.add('active-tab');
                const filter = tab.dataset.filterTab;
                filterCards.forEach(card => {
                    const type = card.dataset.filterCard;
                    if (filter === 'all' || type === filter) {
                        card.style.display = '';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // ─── 12. Header scroll behaviour (shadow enhancement on scroll) ───────────
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, { passive: true });
    }

});