document.addEventListener('DOMContentLoaded', (event) => {
    const contactLink = document.getElementById('contact-link');
    contactLink.addEventListener('click', function(e) {
        e.preventDefault();
        const username = 'jacquelinekgrimm';
        const domain = 'gmail.com';
        window.location.href = `mailto:${username}@${domain}`;
    });
});
