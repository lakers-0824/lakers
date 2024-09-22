document.addEventListener('DOMContentLoaded', function() {
    const workExperience = document.querySelector('.work-experience');
    const workExperienceBackground = document.querySelector('.work-experience-background');
    const heroBackground = document.querySelector('.hero-background');
    const currentSection = document.getElementById('current-section');
    const sections = document.querySelectorAll('section');

    function checkSlide() {
        const animatedElements = document.querySelectorAll('.info-section, .job, .portfolio-category, .portfolio-image');

        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const isVisible = (elementTop < window.innerHeight - 100) && (elementBottom >= 0);
            
            if (isVisible) {
                element.style.transform = 'translateY(0)';
                element.style.opacity = '1';
            } else {
                element.style.transform = 'translateY(50px)';
                element.style.opacity = '0';
            }
        });

        const sliderItems = document.querySelectorAll('.job, .info-section');
        sliderItems.forEach(sliderItem => {
            const slideInAt = (window.scrollY + window.innerHeight) - sliderItem.clientHeight / 2;
            const itemBottom = sliderItem.offsetTop + sliderItem.clientHeight;
            const isHalfShown = slideInAt > sliderItem.offsetTop;
            const isNotScrolledPast = window.scrollY < itemBottom;
            if (isHalfShown && isNotScrolledPast) {
                sliderItem.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;

        // 更新当前区域名称
        let currentSectionName = '首页';
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop - windowHeight / 2 && 
                scrollPosition < sectionTop + sectionHeight - windowHeight / 2) {
                currentSectionName = section.querySelector('h2') ? 
                    section.querySelector('h2').textContent : 
                    section.id.charAt(0).toUpperCase() + section.id.slice(1);
            }
        });
        currentSection.textContent = currentSectionName;

        // 工作经历背景效果
        if (scrollPosition > workExperience.offsetTop - windowHeight / 2) {
            const opacity = Math.min((scrollPosition - (workExperience.offsetTop - windowHeight / 2)) / (windowHeight / 2), 1);
            workExperienceBackground.style.opacity = opacity;
            heroBackground.style.opacity = 1 - opacity;
        } else {
            workExperienceBackground.style.opacity = '0';
            heroBackground.style.opacity = '1';
        }

        checkSlide();
    });

    // 初始检查，确保页面加载时也会触发效果
    checkSlide();

    // Portfolio grid functionality
    const designCategory = document.getElementById('design-category');
    const photoCategory = document.getElementById('photo-category');
    const videoCategory = document.getElementById('video-category');
    const designGrid = document.getElementById('design-grid');
    const photoGrid = document.getElementById('photo-grid');
    const videoGrid = document.getElementById('video-grid');

    function showGrid(grid) {
        designGrid.style.display = 'none';
        photoGrid.style.display = 'none';
        videoGrid.style.display = 'none';
        grid.style.display = 'grid';
        checkSlide(); // 重新检查滑动效果，以确保新显示的网格也有动画
    }

    designCategory.addEventListener('click', () => showGrid(designGrid));
    photoCategory.addEventListener('click', () => showGrid(photoGrid));
    videoCategory.addEventListener('click', () => showGrid(videoGrid));

    // Image modal functionality
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.getElementsByClassName('close')[0];
    const portfolioImages = document.querySelectorAll('.portfolio-image');

    portfolioImages.forEach(img => {
        img.onclick = function() {
            modal.style.display = "block";
            modalImg.src = this.src;
        }
    });

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Ripple effect
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add("ripple-effect");

        const ripple = button.getElementsByClassName("ripple-effect")[0];
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }

    const rippleButtons = document.getElementsByClassName("ripple");
    for (const button of rippleButtons) {
        button.addEventListener("click", createRipple);
    }

    window.addEventListener('scroll', checkSlide);
    window.addEventListener('load', checkSlide);

    // Portfolio category grid functionality
    const categories = document.querySelectorAll('.portfolio-category');
    const grids = document.querySelectorAll('.portfolio-grid');

    categories.forEach(category => {
        category.addEventListener('click', function() {
            const targetGrid = document.getElementById(this.id.replace('category', 'grid'));
            
            categories.forEach(c => c.classList.remove('active'));
            grids.forEach(g => g.style.display = 'none');
            
            this.classList.add('active');
            targetGrid.style.display = 'grid';
        });
    });
});