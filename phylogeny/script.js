document.addEventListener('DOMContentLoaded', function() {
  const imageMap = document.querySelector('map[name="image-map"]');
  imageMap.addEventListener('click', function(event) {
    event.preventDefault();
    const target = event.target;
    if (target.tagName === 'AREA') {
      const href = target.getAttribute('href');
      window.open(href, '_blank');
    }
  });
});
