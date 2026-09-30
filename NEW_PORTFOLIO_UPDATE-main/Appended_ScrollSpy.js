
// Scroll Spy Implementation
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    // Function to remove active class from all links
    const removeActiveClasses = () => {
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
    };

    // Function to add active class to specific link
    const addActiveClass = (id) => {
        const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    };

    // Intersection Observer options
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px', // Adjusted to trigger when section is near the top
        threshold: 0
    };

    // Create observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If section is visible, update active link
                // checking if we are already active for this id to avoid redundant operations
                // removeActiveClasses(); // We might want to be careful with this if multiple intersect

                // Better approach: Determine which section is MOST visible or closest to top?
                // But IntersectionObserver logic with rootMargin usually works well for "current section".

                // Let's rely on the entry logic.
                // We need to ensure we only highlight one.
                removeActiveClasses();
                addActiveClass(entry.target.id);
            }
        });
    }, observerOptions);

    // Track all sections
    sections.forEach(section => {
        observer.observe(section);
    });

    // Fallback/Enhancement: Handle click events to instantly set active
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            removeActiveClasses();
            link.classList.add('active');
            // Allow default anchor click behavior
        });
    });

    // Also observe the "home" section specifically if it's not a <section> tag (sometimes header/hero is div)
    // Check if 'home' is a section or something else.
    // In index.html line 223: <section id="home" ...> So it is covered.
});
