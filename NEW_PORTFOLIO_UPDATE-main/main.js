
// Wait for the DOM to be fully loaded before executing code
document.addEventListener('DOMContentLoaded', function () {
    // Get the element where typing animation will be displayed
    const textElement = document.getElementById('typing-text');

    // Array of skills to be displayed in the typing animation
    const skills = [
        "IT Explorer",
        "Web Development",
        "Data Analyst",
        "UI/UX Design",
        "Python Development",
        ,
    ];

    // Variables to control the typing animation
    let skillIndex = 0;      // Current skill being displayed
    let charIndex = 0;       // Current character position
    let isDeleting = false;  // Whether we're currently deleting text
    let typingDelay = 100;   // Delay between typing each character (ms)
    let deletingDelay = 50;  // Delay between deleting each character (ms)
    let newTextDelay = 1500; // Pause before starting to delete text (ms)

    /**
     * Function that handles the typing and deleting animation
     * Controls the text display, timing, and cycling through skills
     */
    function typeText() {
        // Get the current skill from the array
        const currentSkill = skills[skillIndex];

        if (isDeleting) {
            // If deleting, remove a character
            textElement.textContent = currentSkill.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // If typing, add a character
            textElement.textContent = currentSkill.substring(0, charIndex + 1);
            charIndex++;
        }

        // Set the speed based on whether we're typing or deleting
        let typingSpeed = isDeleting ? deletingDelay : typingDelay;

        // Check if we need to change direction (typing to deleting or vice versa)
        if (!isDeleting && charIndex === currentSkill.length) {
            // Finished typing the full text, switch to deleting
            isDeleting = true;
            typingSpeed = newTextDelay; // Pause before deleting
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting, move to next skill
            isDeleting = false;
            skillIndex = (skillIndex + 1) % skills.length; // Loop through skills array
        }

        // Schedule the next update
        setTimeout(typeText, typingSpeed);
    }

    // Start the typing animation after a delay of 1 second
    setTimeout(typeText, 1000);

    // Add CSS for slow spinning animation
    document.documentElement.style.setProperty('--spin-slow', 'spin 15s linear infinite');
    document.styleSheets[0].insertRule('@keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }', 0);

    // Apply the spinning animation to elements with class 'animate-spin-slow'
    document.querySelectorAll('.animate-spin-slow').forEach(el => {
        el.style.animation = 'spin-slow 15s linear infinite';
    });
});


// Store all about section data in one place
const aboutData = {
    profile: {
        image: "Shehnaz_photo_new.jpeg",
        badges: {
            primary: "IT Engineer",
            secondary: "AI Explorer"
        },
        experienceBadge: {
            title: "IT",
            subtitle: "Student"
        }
    },
    content: {
        tagline: "Passionate about technology, creativity, and innovation",
        headline: "Engineering <span class='gradient-text'>Tomorrow's Solutions</span> Today",
        paragraphs: [
            {
                highlight: "primary",
                content: "I am an <strong>Information Technology Student </strong>with a strong passion for Web development, Data Analytics, UI/UX, and MERN Stack. Driven by curiosity and a commitment to innovation, I continuously explore emerging technologies with the goal of developing impactful solutions to real-world challenges."
            }
        ]
    },
    stats: [
        { value: "5+", label: "Projects" },
        { value: "7+", label: "Certifications" },
        { value: "2+", label: "Internships" }
    ],
    education: [
        {
            degree: "Bachlors of Science in Information Technology",
            institution: "Bk Birla college, Kalyan",
            period: "July 2023 - May 2026",
            score: "sGPA: 9.59"
        },
        {
            degree: "12th Science",
            institution: "Priti Academy, Kalyan",
            period: "July 2020 - May 2023",
            score: "Percentage: 76%"
        }

    ],
    resumeLink: "ShehnazRangrezResume.pdf" // Replace with actual resume link
};

// Function to load about section data
function loadAboutData() {
    // Profile image and badges
    document.getElementById("profile-image").src = aboutData.profile.image;
    document.getElementById("badge-1").textContent = aboutData.profile.badges.primary;
    document.getElementById("badge-2").textContent = aboutData.profile.badges.secondary;

    // Experience badge
    const expBadge = document.getElementById("experience-badge");
    expBadge.innerHTML = `
        <span class="text-lg font-bold">${aboutData.profile.experienceBadge.title}</span>
        <span class="text-xs">${aboutData.profile.experienceBadge.subtitle}</span>
    `;

    // Tagline and headline
    document.getElementById("about-tagline").textContent = aboutData.content.tagline;
    document.getElementById("about-headline").innerHTML = aboutData.content.headline;

    // Paragraphs
    const paragraphsContainer = document.getElementById("about-paragraphs");
    aboutData.content.paragraphs.forEach(para => {
        let highlightClass = '';
        if (para.highlight === 'primary') highlightClass = 'border-primary/30';
        else if (para.highlight === 'accent') highlightClass = 'border-accent/30';
        else if (para.highlight === 'gradient') highlightClass = 'border-gradient-to-r from-primary/30 to-accent/30';

        const dotClass = para.highlight === 'gradient'
            ? 'bg-gradient-to-r from-primary to-accent'
            : `bg-${para.highlight}`;

        const paragraph = document.createElement('p');
        paragraph.className = `relative pl-6 border-l-2 ${highlightClass}`;
        paragraph.innerHTML = `
            <span class="absolute -left-2 top-0 w-4 h-4 ${dotClass} rounded-full"></span>
            ${para.content}
        `;
        paragraphsContainer.appendChild(paragraph);
    });

    // Stats
    document.getElementById("stat-1-value").textContent = aboutData.stats[0].value;
    document.getElementById("stat-1-label").textContent = aboutData.stats[0].label;
    document.getElementById("stat-2-value").textContent = aboutData.stats[1].value;
    document.getElementById("stat-2-label").textContent = aboutData.stats[1].label;
    document.getElementById("stat-3-value").textContent = aboutData.stats[2].value;
    document.getElementById("stat-3-label").textContent = aboutData.stats[2].label;

    // Education
    const educationContainer = document.getElementById("education-timeline");
    aboutData.education.forEach(edu => {
        const eduItem = document.createElement('div');
        eduItem.className = 'relative';
        eduItem.innerHTML = `
            <h5 class="text-lg font-semibold">${edu.degree}</h5>
            <p class="text-gray-600 dark:text-gray-400">${edu.institution}</p>
            <p class="text-sm text-primary dark:text-accent">${edu.period}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">${edu.score}</p>
        `;
        educationContainer.appendChild(eduItem);
    });

    // Resume link
    document.getElementById("resume-link").href = aboutData.resumeLink;
}

// Load about data when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    loadAboutData();
});
document.addEventListener('DOMContentLoaded', function () {
    // ===== SKILLS DATA DEFINITION =====
    // Main data structure containing all skill information organized by categories
    const skillsData = {
        // Define the categories that will appear as tabs
        categories: [
            {
                id: 'languages',
                name: 'Languages',
                icon: '<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>'
            },
            {
                id: 'frameworks',
                name: 'Frameworks',
                icon: '<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>'
            },
            {
                id: 'cloud',
                name: 'Data Analytics',
                icon: '<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>'
            },
            {
                id: 'soft',
                name: 'Soft Skills',
                icon: '<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>'
            }
        ],

        // Detailed skill information for each category
        skills: {
            // Programming languages with proficiency levels and descriptions
            languages: [
                {
                    name: 'Java',
                    level: '60%',
                    label: 'Intermediate',
                    icon: 'J',
                    color: 'blue',
                    gradient: 'from-blue-400 to-primary',
                    description: 'Strong OOP focus with experience in enterprise applications and design patterns.'
                },
                {
                    name: 'Python',
                    level: '75%',
                    label: 'proficient',
                    icon: 'Py',
                    color: 'cyan',
                    gradient: 'from-cyan-400 to-blue-500',
                    description: 'Proficient in data analysis, automation scripts, and web development.'
                },
                {
                    name: 'JavaScript',
                    level: '75%',
                    label: 'Proficient',
                    icon: 'JS',
                    color: 'yellow',
                    gradient: 'from-yellow-400 to-amber-500',
                    description: 'Strong understanding of ES6+, DOM manipulation, and async programming.'
                },
                {
                    name: 'C/C++',
                    level: '70%',
                    label: 'Competent',
                    icon: 'C++',
                    color: 'blue',
                    gradient: 'from-blue-300 to-blue-400',
                    description: 'Experience with algorithms, data structures, and system-level programming.'
                }
            ],
            // Web and development frameworks
            frameworks: [
                {
                    name: 'MongoDB',
                    level: '70%',
                    label: 'Intermediate',
                    icon: 'Dj',
                    color: 'green',
                    gradient: 'from-green-400 to-green-600',
                    description: 'Full-stack web development with focus on rapid development and clean design.'
                },
                {
                    name: 'TensorFlow',
                    level: '75%',
                    label: 'Proficient',
                    icon: 'TF',
                    color: 'orange',
                    gradient: 'from-orange-400 to-orange-600',
                    description: 'Building and training neural networks for computer vision applications.'
                },
                {
                    name: 'React',
                    level: '70%',
                    label: 'Competent',
                    icon: 'Sk',
                    color: 'blue',
                    gradient: 'from-blue-400 to-blue-600',
                    description: 'Skilled in building dynamic and responsive web applications using React.js.'
                }
            ],
            // Cloud and DevOps tools
            cloud: [
                {
                    name: 'Power BI',
                    level: '85%',
                    label: 'Advanced',
                    icon: 'IBM',
                    color: 'blue',
                    gradient: 'from-blue-500 to-blue-700',
                    description: ''
                },
                {
                    name: 'MongoDB',
                    level: '80%',
                    label: 'Proficient',
                    icon: 'Git',
                    color: 'purple',
                    gradient: 'from-purple-500 to-purple-700',
                    description: 'MongoDB for handling unstructured data and developing modern web applications.'
                },
                {
                    name: 'Tableau',
                    level: '75%',
                    label: 'Competent',
                    icon: 'N',
                    color: 'teal',
                    gradient: 'from-teal-500 to-teal-700',
                    description: 'Data visualization and analytics using Tableau to create interactive dashboards and uncover actionable business insights.'
                },
                {
                    name: 'SQL & MYSQL',
                    level: '60%',
                    label: 'Proficient',
                    icon: 'D',
                    color: 'sky',
                    gradient: 'from-sky-400 to-sky-600',
                    description: 'SQL and MySQL for database design, querying, and optimization to manage and analyze structured data effectively.'
                }
            ],
            // Soft skills with descriptions and icons
            soft: [
                {
                    name: 'Problem Solving',
                    icon: '<svg class="w-8 h-8 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"></path></svg>',
                    color: 'blue',
                    description: 'Analytical approach to resolving complex technical challenges.'
                },
                {
                    name: 'Data Analysis',
                    icon: '<svg class="w-8 h-8 text-purple-500 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>',
                    color: 'purple',
                    description: 'Extracting insights and creating actionable strategies from data.'
                },
                {
                    name: 'Web Design',
                    icon: '<svg class="w-8 h-8 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>',
                    color: 'green',
                    description: 'Creating intuitive interfaces with focus on user experience.'
                },
                {
                    name: 'Project Management',
                    icon: '<svg class="w-8 h-8 text-amber-500 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>',
                    color: 'amber',
                    description: 'Planning and execution of projects to ensure timely delivery.'
                },
                {
                    name: 'Team Leadership',
                    icon: '<svg class="w-8 h-8 text-rose-500 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd"></path></svg>',
                    color: 'rose',
                    description: 'Guiding teams through effective communication and delegation.'
                },
                {
                    name: 'Communication',
                    icon: '<svg class="w-8 h-8 text-indigo-500 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path><path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path></svg>',
                    color: 'indigo',
                    description: 'Clearly conveying complex technical concepts to diverse audiences.'
                }
            ]
        },

        // Skills currently being learned (displayed separately)
        currentlyLearning: [
            'Data Analytics & Data Visualization',
            'Web & software Development',
            'UI/Ux Design',
            'Machine Learning Fundamentals'
        ]
    };

    // ===== TAB NAVIGATION GENERATION =====
    // Create tab buttons for each skill category
    const tabsNav = document.querySelector('.tabs-nav');
    skillsData.categories.forEach((category, index) => {
        const button = document.createElement('button');
        // Apply styling classes - first tab starts as active
        button.className = `tab-btn px-4 py-2.5 text-sm md:text-base font-medium rounded-lg transition-all duration-200 ${index === 0 ? 'active-tab bg-white dark:bg-gray-700 text-primary dark:text-accent shadow-md' : ''}`;
        button.setAttribute('data-tab', category.id);
        button.innerHTML = `<span class="flex items-center">${category.icon}${category.name}</span>`;
        tabsNav.appendChild(button);
    });

    // ===== TAB CONTENT GENERATION =====
    // Create content sections for each tab
    const tabContentContainer = document.querySelector('.tab-content-container');
    skillsData.categories.forEach((category, index) => {
        const tabContent = document.createElement('div');
        tabContent.id = `${category.id}-tab`;
        // Only the first tab is visible initially
        tabContent.className = `tab-content ${index === 0 ? 'active' : 'hidden'}`;

        let contentHTML = `
            <div class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                <h3 class="text-2xl font-bold mb-6 text-center">${category.name}</h3>
        `;

        // Use different layout for soft skills (card-based) vs technical skills (progress bars)
        if (category.id === 'soft') {
            // Soft skills layout with cards in a grid
            contentHTML += `<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">`;

            skillsData.skills[category.id].forEach(skill => {
                contentHTML += `
                    <div class="p-6 bg-gradient-to-br from-${skill.color}-50 to-${skill.color}-100 dark:from-${skill.color}-900/20 dark:to-${skill.color}-800/30 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                        <div class="flex items-center mb-4">
                            ${skill.icon}
                            <h4 class="text-lg font-semibold">${skill.name}</h4>
                        </div>
                        <p class="text-gray-600 dark:text-gray-300">${skill.description}</p>
                    </div>
                `;
            });

            contentHTML += `</div>`;
        } else {
            // Technical skills layout with progress bars in two columns
            contentHTML += `
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="space-y-8">
            `;

            // Calculate middle point to split skills into two columns
            const halfLength = Math.ceil(skillsData.skills[category.id].length / 2);

            skillsData.skills[category.id].forEach((skill, skillIndex) => {
                // Create second column when we reach the halfway point
                if (skillIndex === halfLength) {
                    contentHTML += `
                        </div>
                        <div class="space-y-8">
                    `;
                }

                // Generate skill item with progress bar
                contentHTML += `
                    <div>
                        <div class="flex justify-between mb-2">
                            <div class="flex items-center">
                                <span class="w-8 h-8 rounded-full bg-${skill.color}-100 dark:bg-${skill.color}-900/30 flex items-center justify-center mr-3">
                                    <span class="text-xs font-bold text-${skill.color}-600 dark:text-${skill.color}-400">${skill.icon}</span>
                                </span>
                                <span class="font-semibold text-lg">${skill.name}</span>
                            </div>
                            <span class="text-primary dark:text-accent font-medium">${skill.level}</span>
                        </div>
                        <div class="h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div class="skill-bar h-full bg-gradient-to-r ${skill.gradient} rounded-full relative flex items-center" style="width: 0%">
                                <span class="absolute right-1 text-[10px] text-white">${skill.label}</span>
                            </div>
                        </div>
                        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">${skill.description}</p>
                    </div>
                `;
            });

            contentHTML += `
                    </div>
                </div>
            `;
        }

        contentHTML += `</div>`;
        tabContent.innerHTML = contentHTML;
        tabContentContainer.appendChild(tabContent);
    });

    // ===== CURRENTLY LEARNING SECTION =====
    // Generate badges for skills currently being learned
    const learningContainer = document.getElementById('learning-container');
    skillsData.currentlyLearning.forEach(item => {
        const span = document.createElement('span');
        span.className = 'px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 dark:border-accent/20 rounded-full text-primary dark:text-accent text-sm font-medium';
        span.textContent = item;
        learningContainer.appendChild(span);
    });

    // ===== TAB SWITCHING FUNCTIONALITY =====
    // Set up event listeners for tab navigation
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active styling from all tab buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('active-tab', 'bg-white', 'dark:bg-gray-700', 'text-primary', 'dark:text-accent', 'shadow-md');
            });

            // Add active styling to clicked button
            button.classList.add('active-tab', 'bg-white', 'dark:bg-gray-700', 'text-primary', 'dark:text-accent', 'shadow-md');

            // Hide all content tabs
            tabContents.forEach(content => {
                content.classList.add('hidden');
                content.classList.remove('active');
            });

            // Show the selected tab content
            const tabId = button.dataset.tab + '-tab';
            const activeContent = document.getElementById(tabId);
            activeContent.classList.remove('hidden');
            activeContent.classList.add('active');

            // Animate skill bars in the newly visible tab
            animateSkillBars(activeContent);
        });
    });

    // ===== SKILL BAR ANIMATION =====
    /**
     * Animates the skill bars to grow to their target width
     * @param {HTMLElement} container - The container element that holds the skill bars
     */
    function animateSkillBars(container) {
        const skillBars = container.querySelectorAll('.skill-bar');

        // Small delay before starting animation
        setTimeout(() => {
            skillBars.forEach(bar => {
                // Get the target width from the percentage text
                const targetWidth = bar.parentElement.previousElementSibling.lastElementChild.textContent;
                // Reset width to zero initially
                bar.style.width = "0%";

                // Animate to the target width
                setTimeout(() => {
                    bar.style.width = targetWidth;
                    bar.style.transition = "width 1.5s ease-in-out";
                }, 100);
            });
        }, 100);
    }

    // Initialize by animating skill bars in the default active tab
    animateSkillBars(document.querySelector('.tab-content.active'));
});

document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('timeline-slider');
    const prevBtn = document.getElementById('prev-timeline');
    const nextBtn = document.getElementById('next-timeline');
    const progress = document.getElementById('timeline-progress');
    const items = document.querySelectorAll('.timeline-item');
    let currentIndex = 0;

    const updateProgress = () => {
        if (slider && progress) {
            const percentage = (slider.scrollLeft / (slider.scrollWidth - slider.clientWidth)) * 100;
            progress.style.width = `${percentage}%`;
        }
    };

    /**
     * Custom smooth scroll function for faster animation
     * @param {HTMLElement} element - The scrollable container
     * @param {number} target - The target scrollLeft position
     * @param {number} duration - Animation duration in ms
     */
    function smoothScrollTo(element, target, duration) {
        const start = element.scrollLeft;
        const change = target - start;
        const startTime = performance.now();

        function animateScroll(currentTime) {
            const elapsed = currentTime - startTime;
            let progress = elapsed / duration;

            if (progress > 1) progress = 1;

            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);

            element.scrollLeft = start + change * ease;

            if (progress < 1) {
                requestAnimationFrame(animateScroll);
            } else {
                // Ensure we land exactly on target
                element.scrollLeft = target;
                updateProgress();
            }
        }

        requestAnimationFrame(animateScroll);
    }

    const scrollToItem = (index) => {
        if (index >= 0 && index < items.length && slider) {
            currentIndex = index;

            // Calculate center position
            const item = items[index];
            const containerWidth = slider.clientWidth;
            const itemWidth = item.offsetWidth;
            const targetScrollLeft = item.offsetLeft - (containerWidth / 2) + (itemWidth / 2);

            // Use custom fast scroll (300ms)
            smoothScrollTo(slider, targetScrollLeft, 200);
        }
    };

    prevBtn?.addEventListener('click', () => scrollToItem(Math.max(0, currentIndex - 1)));
    nextBtn?.addEventListener('click', () => scrollToItem(Math.min(items.length - 1, currentIndex + 1)));
    slider?.addEventListener('scroll', updateProgress);

    updateProgress();
});

/**
 * Projects Section
 * This module handles loading, displaying and filtering portfolio projects.
 * It dynamically creates project cards and handles category filtering functionality.
 */
document.addEventListener('DOMContentLoaded', function () {
    // URL of the JSON file containing project data
    // This could be replaced with an API endpoint in production
    const projectsDataUrl = 'projects-data.json';

    /**
     * Fetch project data from external JSON file or use fallback data
     * Uses a graceful degradation approach if data file isn't available
     */
    fetch(projectsDataUrl)
        .then(response => {
            // If the file doesn't exist yet, use fallback data
            if (!response.ok) {
                console.warn('Projects data file not found. Using fallback data.');
                return getFallbackProjectsData();
            }
            return response.json();
        })
        .catch(error => {
            // Handle network errors or parsing issues
            console.error('Error fetching projects:', error);
            return getFallbackProjectsData();
        })
        .then(projects => {
            const container = document.getElementById('project-container');
            // Clear loading indicator or placeholder content
            container.innerHTML = '';

            // Render all projects to the DOM
            renderProjects(projects);

            // Set up category filtering functionality
            initializeFilterButtons();
        });

    /**
     * Renders project cards to the DOM using a template
     * @param {Array} projects - Array of project objects containing all project details
     */
    function renderProjects(projects) {
        const container = document.getElementById('project-container');
        const template = document.getElementById('project-card-template');

        projects.forEach((project, index) => {
            // Clone the template for each project
            const projectCard = template.content.cloneNode(true);
            const projectItem = projectCard.querySelector('.project-item');

            // Add category classes for filtering functionality
            project.categories.forEach(category => {
                projectItem.classList.add(category);
            });

            // Set gradient header background colors from project data
            projectCard.querySelector('.project-header').classList.add(
                `from-${project.headerColor.from}`,
                `to-${project.headerColor.to}`
            );

            // Set project icon (SVG)
            const iconSvg = projectCard.querySelector('.project-icon');
            iconSvg.innerHTML = project.icon;

            // Populate text content
            projectCard.querySelector('.project-date').textContent = project.date;
            projectCard.querySelector('.project-title').textContent = project.title;
            projectCard.querySelector('.project-desc').textContent = project.description;
            projectCard.querySelector('.project-category').textContent = project.type;

            // Configure project link
            const linkElement = projectCard.querySelector('.project-link');
            linkElement.href = project.link;
            projectCard.querySelector('.project-link-text').textContent = project.linkText;

            // Create and add skill badges
            const skillsContainer = projectCard.querySelector('.project-skills');
            project.skills.forEach(skill => {
                const skillBadge = document.createElement('span');
                skillBadge.className = `px-1.5 py-0.5 bg-${skill.color}-100 dark:bg-${skill.color}-900/30 text-${skill.color}-700 dark:text-${skill.color}-300 rounded-md text-[10px]`;
                skillBadge.textContent = skill.name;
                skillsContainer.appendChild(skillBadge);
            });

            // Add staggered animation delay based on item position
            // This creates a cascading reveal effect for the projects
            projectItem.setAttribute('data-aos-delay', (index % 4) * 100 + 100);



            // Append the completed project card to the container
            container.appendChild(projectCard);
        });

        // Refresh AOS (Animate On Scroll) animations if library is loaded
        // This ensures new content gets properly animated
        if (typeof AOS !== 'undefined') {
            setTimeout(() => {
                AOS.refresh();
            }, 500);
        }
    }

    /**
     * Sets up filter buttons to show/hide projects by category
     * Handles button state and smooth transitions between filtered views
     */
    function initializeFilterButtons() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const projectItems = document.querySelectorAll('.project-item');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Reset all buttons to inactive state
                filterBtns.forEach(filterBtn => {
                    filterBtn.classList.remove('active-filter', 'bg-white', 'dark:bg-gray-700', 'text-primary', 'dark:text-accent', 'shadow-md');
                });

                // Set clicked button to active state
                btn.classList.add('active-filter', 'bg-white', 'dark:bg-gray-700', 'text-primary', 'dark:text-accent', 'shadow-md');

                // Get selected filter category
                const filterValue = btn.getAttribute('data-filter');

                // Apply filtering with animation
                projectItems.forEach(item => {
                    // First fade out all items with subtle scale reduction
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';

                    // After fade-out completes, show or hide based on filter
                    setTimeout(() => {
                        if (filterValue === 'all' || item.classList.contains(filterValue)) {
                            // Show matching items
                            item.style.display = '';
                            // Fade in with slight delay for smoother transitions
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'scale(1)';
                            }, 50);
                        } else {
                            // Hide non-matching items
                            item.style.display = 'none';
                        }
                    }, 300); // Matches the duration of the fade-out transition
                });
            });
        });

        // Set "All" filter as active by default on page load
        document.querySelector('.filter-btn[data-filter="web-dev"]').classList.add('active-filter', 'bg-white', 'dark:bg-gray-700', 'text-primary', 'dark:text-accent', 'shadow-md');
        document.querySelectorAll('.project-item').forEach(item => {
            if (item.classList.contains('web-dev')) {
                item.style.display = '';
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            } else {
                item.style.display = 'none';
            }
        });
        // Set transition properties for smooth animations
        projectItems.forEach(item => {
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease';
        });
    }


    // project Section ________________________________________________________________________________________________________

    /**
     * Provides fallback project data if the JSON file cannot be loaded
     * @returns {Promise<Array>} A promise resolving to an array of project objects
     */
    function getFallbackProjectsData() {
        // Sample project data structured as an array of project objects
        // cloud as data analytics project
        return Promise.resolve([
            {
                title: "Doctor Visit Insights",
                description: "Comprehensive analysis of doctor visit data to gain actionable insights for improving healthcare operations and patient care.",
                date: "Oct 2024",
                type: "Healthcare Data",
                categories: ["data-analytics"],
                skills: [
                    { name: "Pandas", color: "blue" },
                    { name: "Matplotlib", color: "green" },
                    { name: "Data Viz", color: "purple" }
                ],
                link: "https://github.com/karamveer2648/Doctor_Visit_Analysis",
                linkText: "GitHub Repo",
                headerColor: { from: "blue-500", to: "indigo-600" },
                icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>'
            },
            {
                title: "Superstore Sales Analysis",
                description: "In-depth analysis of superstore sales data revealing critical insights for business strategy and growth.",
                date: "Oct 2024",
                type: "Retail Analytics",
                categories: ["data-analytics"],
                skills: [
                    { name: "Pandas", color: "blue" },
                    { name: "Seaborn", color: "teal" },
                    { name: "BI", color: "amber" }
                ],
                link: "https://github.com/karamveer2648/SuperstoreDataAnalysis",
                linkText: "GitHub Repo",
                Image: "Dashboard_powerBI.png",
                headerColor: { from: "green-500", to: "teal-600" },
                icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>'
            },
            {
                title: "AWS S3 Portfolio",
                description: "Static portfolio website deployment using Amazon S3 with complete cloud configuration.",
                date: "Oct 2024",
                type: "Cloud Implementation",
                categories: ["cloud", "web-dev"],
                skills: [
                    { name: "AWS S3", color: "orange" },
                    { name: "Static Site", color: "blue" },
                    { name: "Cloud", color: "indigo" }
                ],
                link: "#",
                linkText: "Project Details",
                headerColor: { from: "orange-500", to: "yellow-400" },
                icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path>'
            },
            {
                title: "बाईकमहिती.काॅम",
                description: "E-commerce platform for motorcycle enthusiasts with detailed specs, reviews and community forums.",
                date: "Jan 2023",
                type: "E-Commerce Platform",
                categories: ["web-dev"],
                skills: [
                    { name: "PHP", color: "indigo" },
                    { name: "MySQL", color: "cyan" },
                    { name: "JavaScript", color: "yellow" }
                ],
                link: "BikeMahiti.html",
                linkText: "View Project",
                headerColor: { from: "red-500", to: "pink-600" },
                icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>'
            },
            {
                title: "Chennai Point (Bootstrap)",
                description: "City guide website showcasing local businesses, attractions and services using Bootstrap framework.",
                date: "Jul 2022",
                type: "City Guide Website",
                categories: ["web-dev"],
                skills: [
                    { name: "HTML", color: "orange" },
                    { name: "Bootstrap", color: "indigo" },
                    { name: "JavaScript", color: "yellow" }
                ],
                link: "https://primachennai.netlify.app/",
                linkText: "Visit Website",
                headerColor: { from: "purple-500", to: "indigo-600" },
                icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>'
            },
            {
                title: "Chennai Point (Custom CSS)",
                description: "Advanced version of city guide with custom CSS implementation demonstrating deep styling capabilities.",
                date: "Aug 2022",
                type: "Custom CSS Implementation",
                categories: ["web-dev"],
                skills: [
                    { name: "HTML", color: "orange" },
                    { name: "Pure CSS", color: "blue" },
                    { name: "JavaScript", color: "yellow" }
                ],
                link: "https://primachennaipoint.netlify.app/",
                linkText: "Visit Website",
                headerColor: { from: "cyan-500", to: "indigo-600" },
                icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>'
            },
            {
                title: "Smart Education Portal",
                description: "Annual report management solution for educational institutes with dynamic reporting features.",
                date: "May 2024",
                type: "Educational Technology",
                categories: ["web-dev"],
                skills: [
                    { name: "Django", color: "green" },
                    { name: "Python", color: "blue" },
                    { name: "Charts.js", color: "red" }
                ],
                link: "#",
                linkText: "Project Details",
                headerColor: { from: "emerald-500", to: "green-600" },
                icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>'
            },
            {
                title: "Mediac Health Platform",
                description: "Web application connecting patients with healthcare providers for streamlined medical appointments.",
                date: "May 2024",
                type: "Healthcare Solution",
                categories: ["web-dev", "cloud"],
                skills: [
                    { name: "Django", color: "green" },
                    { name: "AWS", color: "yellow" },
                    { name: "Database", color: "blue" }
                ],
                link: "#",
                linkText: "View Project",
                headerColor: { from: "blue-400", to: "sky-600" },
                icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>'
            }
        ]);
    }
});

// End of Projects Section

//Achievements Section And participation

// Achievement data - would typically come from a backend API
const achievementData = [
    {
        title: "Aavishkar -2025 ",
        organization: "National level",
        date: "December 2025",
        description: "Participated in a case study competition with the project ‘Smart Decision: Annual sales Decision’, providing an innovative solution for a company'.",
        image: "vsem.jpg",
        badgeType: "ribbon",
        badgeText: "Participation",
        badgeColor: "blue",
        tags: [
            { text: "___", color: "primary" },
            { text: "90+ Teams", color: "green" },
            { text: "Educational Tech", color: "blue" }
        ]
    },
    {
        title: "Pan India Case study Competition ",
        organization: "Vivekanand Education Society's Institute of Technology",
        date: "May 2024",
        description: "Participated in a case study competition with the project ‘Smart Decision: Annual sales Decision’, providing an innovative solution for a company'.",
        image: "vsem.jpg",
        badgeType: "ribbon",
        badgeText: "Participation",
        badgeColor: "blue",
        tags: [
            { text: "___", color: "primary" },
            { text: "90+ Teams", color: "green" },
            { text: "Educational Tech", color: "blue" }
        ]
    },
    {
        title: "Vit - case Study Competition",
        organization: "Vidyalankar Institute of Technology",
        date: "July 2025",
        description: "Selected in top 50 out of 100+ teams! Developed Acedmic Performance Predictor , an innovative ML Model application using React , Ml ,AI ,database.",
        image: "Vit.jpg",
        badgeType: "circle",
        badgeText: "TOP 50",
        badgeColor: "indigo",
        tags: [
            { text: "ML model", color: "indigo" },
            { text: "AI & ML", color: "blue" },
            { text: "Model Challenge", color: "purple" }
        ]
    },
    {
        title: "Emoji",
        organization: "Internal Selection",
        date: "2025",
        description: "Both problem statements selected! Our team tackled AI-ML models for predicting agricultural prices and an alumni-student connection platform.",
        image: "emoji_flyer.jpg",
        badgeType: "pill",
        badgeText: "",
        badgeColor: "green",
        tags: [
            { text: "AI-ML", color: "green" },
            { text: "Prediction Models", color: "teal" },
            { text: "Team CodeHack", color: "amber" }
        ]
    },
    {
        title: "SIH:Smart India Hackethon - Internal Round",
        organization: "Bk Birla College ",
        date: "September 2025",
        description: "Participated in a SIH competition with the project ‘Tourist Saftey Protection App’, providing an innovative solution to Government. ",
        image: "US_SIH.jpg",
        badgeType: "circle",
        badgeText: "1st",
        badgeColor: "indigo",
        tags: [
            { text: "Full Stack", color: "indigo" },
            { text: "AI & ML", color: "blue" },
            { text: "Model Challenge", color: "purple" }
        ]
    },


];

// Initialize achievements when document is ready
document.addEventListener('DOMContentLoaded', function () {
    initAchievements();
    setupAchievementCarousel();
});

// Initialize achievements from data
function initAchievements() {
    const container = document.getElementById('achievements-container');
    const template = document.getElementById('achievement-template');

    // Clear loading indicator
    container.innerHTML = '';

    // Create achievement cards from data
    achievementData.forEach(achievement => {
        const card = template.content.cloneNode(true);

        // Set achievement content
        card.querySelector('.achievement-title').textContent = achievement.title;
        card.querySelector('.achievement-org').textContent = achievement.organization;
        card.querySelector('.achievement-date').textContent = achievement.date;
        card.querySelector('.achievement-desc').textContent = achievement.description;

        // Set image
        const imageDiv = card.querySelector('.achievement-image');
        imageDiv.style.backgroundImage = `url(${achievement.image})`;

        // Set date badge color based on achievement type
        const dateBadge = card.querySelector('.achievement-date');
        dateBadge.classList.add(`bg-${achievement.badgeColor}-100`);
        dateBadge.classList.add(`text-${achievement.badgeColor}-800`);
        dateBadge.classList.add(`dark:bg-${achievement.badgeColor}-900/60`);
        dateBadge.classList.add(`dark:text-${achievement.badgeColor}-200`);

        // Create badge based on type
        const badgeContainer = card.querySelector('.achievement-badge');
        if (achievement.badgeType === 'ribbon') {
            badgeContainer.innerHTML = `
                        <div class="relative w-24 h-24 overflow-hidden">
                            <div class="absolute top-0 right-0 w-full h-full bg-${achievement.badgeColor} transform origin-bottom-left rotate-45 translate-y-[70%] translate-x-[30%]">
                                <div class="absolute bottom-0 left-0 right-0 text-center text-xs font-bold text-white transform -rotate-45 translate-y-3">${achievement.badgeText}</div>
                            </div>
                        </div>
                    `;
        } else if (achievement.badgeType === 'circle') {
            badgeContainer.innerHTML = `
                        <div class="bg-white dark:bg-gray-700 rounded-full shadow-lg p-1 border-2 border-${achievement.badgeColor}-500">
                            <div class="bg-${achievement.badgeColor}-500 rounded-full w-12 h-12 flex flex-col items-center justify-center text-white">
                                <span class="text-[10px] font-bold">TOP</span>
                                <span class="text-lg font-bold leading-none">20</span>
                                <span class="text-[8px]">of 100+</span>
                            </div>
                        </div>
                    `;
        } else if (achievement.badgeType === 'pill') {
            badgeContainer.innerHTML = `
                        <span class="inline-flex items-center px-2 py-1 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-sm backdrop-blur-sm transform translate-x-[-8px] translate-y-[8px]">
                            <svg class="w-3 h-3 text-${achievement.badgeColor}-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span class="text-xs font-semibold text-gray-800 dark:text-gray-200">${achievement.badgeText}</span>
                        </span>
                    `;
        }

        // Add tags
        const tagsContainer = card.querySelector('.achievement-tags');
        achievement.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.className = `px-1.5 py-0.5 bg-${tag.color}-100 dark:bg-${tag.color}-900/30 text-${tag.color}-700 dark:text-${tag.color}-300 rounded-md text-xs`;
            tagElement.textContent = tag.text;
            tagsContainer.appendChild(tagElement);
        });

        // Add to container
        container.appendChild(card);
    });
}

// Set up carousel navigation
function setupAchievementCarousel() {
    const container = document.getElementById('achievements-container');
    const prevBtn = document.getElementById('prev-achievement');
    const nextBtn = document.getElementById('next-achievement');

    let currentIndex = 0;
    const cards = container.querySelectorAll('.achievement-card');

    // Handle navigation
    nextBtn.addEventListener('click', () => {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
            scrollToCard(currentIndex);
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            scrollToCard(currentIndex);
        }
    });

    function scrollToCard(index) {
        const card = cards[index];
        card.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    }
}


// End of Achievements Section
//start of certifications section
/**
 * Certifications Section
 * 
 * This script manages the rendering and filtering of certification data.
 * It creates certification cards from data and provides filtering by category.
 */
document.addEventListener('DOMContentLoaded', function () {
    // Certificate data - structured array of certification objects
    // In a production environment, this would be fetched from an API endpoint
    const certifications = [
        {
            // data-course
            id: "Course",
            title: "Android App Development",
            issuer: "NPTEL",
            date: "April 2024",
            category: "technical",
            color: "#0052cc",
            icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>',
            tags: [{ name: "Python", color: "blue" }, { name: "Data Analysis", color: "indigo" }, { name: "Machine Learning", color: "purple" }],
            link: "https://drive.google.com/file/d/1z9kobU1SbWs6S1xPranSRes10GvZP1L5/view?usp=sharing"
            // link: "https://drive.google.com/file/d/14WSZi8zlwcODq2pSkVWOMitaWMXmampR/view?usp=sharing"
        },
        // Business/competition category __________________________________________________________
        {
            id: "Participant",
            title: "Certificate of Participation in VSE Case Study Competition",
            issuer: "Vivekanand Education Society's Institute of Technology",
            date: "December 2024",
            category: "business",
            color: "#f97316",
            icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>',
            tags: [{ name: "Competition", color: "amber" }, { name: "Leadership", color: "orange" }],
            link: "https://drive.google.com/file/d/1y9HSww7PSEKo0-bSm8hruWOHzpgacu7r/view?usp=sharing"
        },
        {
            id: "Participant",
            title: "Vidyalankar Institute of Technology - NextEdge conclave Participation",
            issuer: "VIT",
            date: "2nd August",
            category: "business",
            color: "#7c3aed",
            icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>',
            tags: [{ name: "Competition", color: "amber" }, { name: "Problem Solving", color: "violet" }, { name: "Teamwork", color: "fuchsia" }],
            link: "https://drive.google.com/file/d/16Zt9DOaw99FHJIVO8oCOPJ8tEPhDipTU/view?usp=sharing"
        },
        {
            id: "Participant",
            title: "Emoji Making Challenge ",
            issuer: "BK.Birla College of Arts, Science & Commerce",
            date: "JUly 2025",
            category: "business",
            color: "#3b82f6",
            icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>',
            tags: [{ name: "Competition", color: "amber" }, { name: "Innovation", color: "purple" }],
            link: "https://drive.google.com/file/d/1WX5izAlD2NDEc_9fffPUmUXhGNB-W5O3/view?usp=sharing"
        },
        // __________________________________________________________
        {
            // data-course
            id: "Course",
            title: "Cloud Counselage Data Analytics",
            issuer: "Cloud Counselage",
            date: "October 2024",
            category: "data",
            color: "#06b6d4",
            icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>',
            tags: [{ name: "Course", color: "cyan" }, { name: "Learning", color: "teal" }, { name: "Technical Skills", color: "sky" }],
            link: "https://drive.google.com/file/d/17609PhZLAiDsi-OHHSEuJ_TMlkIYhBUY/view?usp=sharing"
        },
        {
            // data-course
            id: "Course",
            title: "Future Skill Prime(Digital- 101)",
            issuer: "Aicte",
            date: "Febrary 2025",
            category: "data",
            color: "#f59e0b",
            icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>',
            tags: [{ name: "Business Knowledge", color: "yellow" }, { name: "Learning", color: "teal" }],
            link: "https://drive.google.com/file/d/1Kpkdv0E6gZXsJgM6Ci5qfeFmrXfxCd7Q/view?usp=sharing"
        },
        {
            // data-course
            id: "Seminar",
            title: "Power BI DAX for Data Analysis and Visualization",
            issuer: "Wscube",
            date: "August 2024",
            category: "data",
            color: "#ef4444",
            icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>',
            tags: [{ name: "E-Commerce", color: "rose" }, { name: "Learning", color: "teal" }],
            link: "https://drive.google.com/file/d/1XTyDmYumoizRwLSi1dKFRHqjxjjTSsI0/view?usp=sharing"
        },
        {
            id: "Seminar",
            title: "Power BI Data Visualization",
            issuer: "Wscube",
            date: "July 2024",
            category: "data",
            color: "#0043ce",
            color: "#0043ce",
            icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>',
            tags: [{ name: "Data Science", color: "blue" }, { name: "Data Visualization", color: "indigo" }, { name: "Watson Studio", color: "cyan" }],
            link: "https://drive.google.com/file/d/18v4V5AxxxypW6yStNfaBpq5WX8jeFsbn/view?usp=sharing"
        },
        // data-certifications
        {
            id: "workshop",
            title: "MongoDB Workshop",
            issuer: "LetsUpgrade",
            date: "May 2025",
            category: "technical",
            color: "#8b5cf6",
            icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path>',
            tags: [{ name: "Learning", color: "purple" }, { name: "Database", color: "violet" }, { name: "Competitive Analysis", color: "fuchsia" }],
            link: "https://drive.google.com/file/d/12mGoDiA2l-s9R-KLEuVGGbTek6x3Ic56/view?usp=sharing"
        },
        {
            id: "Workshop",
            title: "Blockchain Workshop",
            issuer: "Bk Birla College of Arts, Science & Commerce",
            date: "June 2024",
            category: "technical",
            color: "#10b981",
            icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>',
            tags: [{ name: "Blockchain", color: "green" }, { name: "Solidity", color: "emerald" }, { name: "DNS", color: "teal" }],
            link: "https://drive.google.com/file/d/1OcKMJ_i6kBnQqq0fntOCTNMvnt9iFdIF/view?usp=sharing"
        },
        {
            id: "Course",
            title: "Excelr - Git/Github",
            issuer: "Jobaaj Learnings",
            date: "February 2024",
            category: "technical",
            color: "#0ea5e9",
            icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>',
            tags: [{ name: "Collaboration", color: "sky" }, { name: "open source", color: "blue" }],
            link: "https://drive.google.com/file/d/1j9I46QZ8HqcJ-nRdRNa3pVUlNLPVjeVa/view?usp=sharing"
        },
        {
            id: "workshop",
            title: " Wireless Network Hacking ",
            issuer: "Cybrary",
            date: "Jan 2024",
            category: "technical",
            color: "#8b5cf6",
            icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"></path>',
            tags: [{ name: "Learning", color: "purple" }, { name: "Database", color: "violet" }, { name: "Competitive Analysis", color: "fuchsia" }],
            link: "https://drive.google.com/file/d/17scdsu62Bv0ryHZvCmn_5Ev70jidhsi9/view?usp=sharing"
        },
        {
            id: "Workshop",
            title: "React JS Workshop",
            issuer: "LetsUpgrade",
            date: "June 2025",
            category: "technical",
            color: "#ec4899",
            icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>',
            tags: [{ name: "Framework", color: "pink" }, { name: "Technical Writing", color: "rose" }, { name: "Learning", color: "fuchsia" }],
            link: "https://drive.google.com/file/d/1UNKjseRz7sWRwqc_IW8JwzX605lbeKZk/view?usp=sharing"
        },
        {
            id: "Course",
            title: "Design Using AI Tools",
            issuer: "BK Birla college , Quantum learning",
            date: "Jan 2024",
            category: "ui/ux",
            color: "#ec4899",
            icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>',
            tags: [{ name: "Canva", color: "pink" }, { name: "Designing", color: "rose" }, { name: "Learning", color: "fuchsia" }],
            link: "https://drive.google.com/file/d/1J8Akfd8v13NhJ_si8BZrfny3rdEVESFj/view?usp=sharing"
        },
        {
            id: "Course",
            title: "User Experience Design Fundamentals",
            issuer: "Accenture",
            date: "Jan 2024",
            category: "ui/ux",
            color: "#ec4899",
            icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>',
            tags: [{ name: "Figma", color: "purple" }, { name: "Designing", color: "violet" }, { name: "UX", color: "fuchsia" }],
            link: "https://drive.google.com/file/d/17YZH6NJjBCjDTCijaj0Nr1EdISu9l44S/view?usp=sharing"
        },
        {
            id: "Course",
            title: "UI/UX Design",
            issuer: "TechBrains",
            date: "feb 2025",
            category: "ui/ux",
            color: "#0ea5e9",
            icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>',
            tags: [{ name: "Figma", color: "sky" }, { name: "UI", color: "blue" }],
            link: "https://drive.google.com/file/d/12EsZNOP03XB4HuGwkjCqOsSZ9TQ6xo-l/view?usp=sharing"
        },
        {
            id: "Course",
            title: "UI/UX Design full course with Figma",
            issuer: "Mind Luster",
            date: "April 2024",
            category: "ui/ux",
            color: "#0ea5e9",
            icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path>',
            tags: [{ name: "Figma", color: "rose" }, { name: "Adobe XD", color: "blue" }, { name: "UI/UX", color: "voilet" }],
            link: "https://drive.google.com/file/d/1gYCi6XiE1chEaTwpWs6jm77Go6yLSmej/view?usp=sharing"
        }
    ];

    /**
     * Renders certification cards based on the selected filter
     * 
     * @param {string} filter - Category to filter by ('all' or specific category name)
     */
    function renderCertifications(filter = 'all') {
        // Get container where cards will be appended
        const container = document.getElementById('certification-container');
        // Get template for certification cards
        const template = document.getElementById('cert-card-template');

        // Clear existing content
        container.innerHTML = '';

        // Apply filtering logic
        const filtered = filter === 'all' ?
            certifications :
            certifications.filter(cert => cert.category === filter);

        // Render each filtered certification
        filtered.forEach(cert => {
            // Clone the card template
            const certCard = template.content.cloneNode(true);
            const certItem = certCard.querySelector('.cert-item');

            // Set data attribute for potential future filtering
            certItem.dataset.category = cert.category;

            // Apply visual styling elements
            const colorBar = certItem.querySelector('.cert-color-bar');
            colorBar.style.backgroundColor = cert.color;

            // Set icon background with transparency
            const iconBg = certItem.querySelector('.cert-icon-bg');
            iconBg.style.backgroundColor = cert.color + '20'; // Add 20% opacity

            // Set icon color and SVG path
            const icon = certItem.querySelector('.cert-icon');
            icon.style.color = cert.color;
            icon.innerHTML = cert.icon;

            // Populate text content
            certItem.querySelector('.cert-title').textContent = cert.title;
            certItem.querySelector('.cert-issuer').textContent = cert.issuer;
            certItem.querySelector('.cert-date').textContent = cert.date;
            certItem.querySelector('.cert-id').textContent = cert.id;

            // Set verification/details link
            const link = certItem.querySelector('.cert-link');
            link.href = cert.link;

            // Create tag badges for skills/topics
            const tagsContainer = certItem.querySelector('.cert-tags');
            cert.tags.forEach(tag => {
                const tagEl = document.createElement('span');
                tagEl.className = `px-1.5 py-0.5 bg-${tag.color}-100 dark:bg-${tag.color}-900/30 text-${tag.color}-700 dark:text-${tag.color}-300 rounded text-[10px]`;
                tagEl.textContent = tag.name;
                tagsContainer.appendChild(tagEl);
            });

            // Add completed card to container
            container.appendChild(certCard);
        });
    }

    // Initial render of all certifications when page loads
    renderCertifications();

    // Set up event listeners for filter buttons
    const certButtons = document.querySelectorAll('.cert-btn');
    certButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update visual state of filter buttons
            certButtons.forEach(b => b.classList.remove('active-cert', 'bg-white', 'dark:bg-gray-700', 'text-primary'));
            btn.classList.add('active-cert', 'bg-white', 'dark:bg-gray-700', 'text-primary');

            // Apply selected filter and re-render certificates
            renderCertifications(btn.dataset.filter);
        });
    });

    // NOTE: In a production environment, you would fetch certification data from an API
    // Example implementation of API data fetching:
    // 
    // async function fetchCertifications() {
    //     try {
    //         const response = await fetch('/api/certifications');
    //         const data = await response.json();
    //         return data;
    //     } catch (error) {
    //         console.error('Error fetching certifications:', error);
    //         return [];
    //     }
    // }
});
