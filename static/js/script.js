document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const homepageWrapper = document.querySelector('.homepage-wrapper');
    const videoSections = document.querySelectorAll('.video-section');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    let activeSectionIndex = -1;

    function setActiveSection(index) {
        if (activeSectionIndex === index) return;

        // Pause current video and remove active class
        if (activeSectionIndex !== -1 && videoSections[activeSectionIndex]) {
            const prevSection = videoSections[activeSectionIndex];
            const prevVideo = prevSection.querySelector('.background-video');
            if (prevVideo) {
                prevVideo.pause();
                prevVideo.currentTime = 0;
                const prevSource = prevVideo.querySelector('source');
                if (prevSource) {
                    prevSource.removeAttribute('src');
                }
                prevVideo.load();
            }
            prevSection.classList.remove('active'); // Remove active class to reset animation
        }

        // Set new active section
        if (videoSections[index]) {
            const currentSection = videoSections[index];
            const currentVideo = currentSection.querySelector('.background-video');

            // Force reflow/reset animation before re-adding active class
            // This is key for re-playing CSS animations
            void currentSection.offsetWidth; // Trigger reflow by accessing offsetWidth

            currentSection.classList.add('active'); // Add active class, which triggers animation

            if (currentVideo) {
                let sourceElement = currentVideo.querySelector('source');
                if (!sourceElement) {
                    sourceElement = document.createElement('source');
                    currentVideo.appendChild(sourceElement);
                }
                if (!sourceElement.src || sourceElement.src !== currentSection.dataset.videoSrc) {
                    sourceElement.src = currentSection.dataset.videoSrc;
                    currentVideo.load();
                }

                currentVideo.play().catch(error => {
                    console.error("Video autoplay failed for section", index, ":", error);
                });
            }

            const bgColor = currentSection.dataset.bgColor;
            if (bgColor) {
                document.body.style.backgroundColor = bgColor;
            }
            activeSectionIndex = index;
        } else {
            activeSectionIndex = -1;
            document.body.style.backgroundColor = '#f8f8f8';
        }
    }

    // Intersection Observer for Video Sections
    const sectionObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.7
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Array.from(videoSections).indexOf(entry.target);
                setActiveSection(index);
            }
        });
    }, sectionObserverOptions);

    if (homepageWrapper) {
        videoSections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // Header transparency and Scroll Indicator logic
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;

        if (scrollPosition > 50) {
            header.style.background = 'rgba(0, 0, 0, 0.8)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.3)';
        }

        if (homepageWrapper && scrollIndicator) {
            const totalHomepageHeight = homepageWrapper.offsetHeight;
            if (scrollPosition > totalHomepageHeight - (window.innerHeight / 2)) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        } else if (scrollIndicator) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        }
    });

    // Initial activation for the first video section on page load
    if (videoSections.length > 0 && homepageWrapper) {
        const firstSectionRect = videoSections[0].getBoundingClientRect();
        if (firstSectionRect.top >= 0 && firstSectionRect.top < window.innerHeight * 0.7) {
            setActiveSection(0);
        } else {
            const firstVisibleSection = Array.from(videoSections).find(section => {
                const rect = section.getBoundingClientRect();
                return rect.top < window.innerHeight && rect.bottom > 0;
            });
            if (firstVisibleSection) {
                const index = Array.from(videoSections).indexOf(firstVisibleSection);
                setActiveSection(index);
            } else {
                setActiveSection(0);
            }
        }
    }
});