document.addEventListener('DOMContentLoaded', (event) => {
    const contactLink = document.getElementById('contact-link');
    contactLink.addEventListener('click', function(e) {
        e.preventDefault();
        const username = 'contact';
        const domain = 'jacqueline.dev';
        window.location.href = `mailto:${username}@${domain}`;
    });
});
