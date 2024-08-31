// script.js

// Smooth scrolling for navigation links
document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetID = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetID);

        // Smooth scroll to the section
        targetSection.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dynamic content loading (optional enhancement)
document.addEventListener('DOMContentLoaded', function() {
    const projectsSection = document.querySelector('.projects ul');
    const projects = [

    ];

    projects.forEach(project => {
        const listItem = document.createElement('li');
        listItem.textContent = `${project.title}: ${project.description}`;
        projectsSection.appendChild(listItem);
    });
});

// Add more JavaScript interactivity as needed
