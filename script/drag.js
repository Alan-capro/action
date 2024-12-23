document.addEventListener('DOMContentLoaded', () => {
  const photos = document.querySelectorAll('.memory-photos img');
  
  photos.forEach(photo => {
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    photo.addEventListener('mousedown', dragStart);
    photo.addEventListener('mousemove', drag);
    photo.addEventListener('mouseup', dragEnd);
    photo.addEventListener('mouseleave', dragEnd);

    function dragStart(e) {
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;

      if (e.target === photo) {
        isDragging = true;
        photo.classList.add('dragging');
      }
    }

    function drag(e) {
      if (isDragging) {
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, photo);
      }
    }

    function dragEnd(e) {
      initialX = currentX;
      initialY = currentY;

      isDragging = false;
      photo.classList.remove('dragging');
    }

    function setTranslate(xPos, yPos, el) {
      el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }
  });
}); 