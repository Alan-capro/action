document.addEventListener('DOMContentLoaded', () => {
  // 添加弹窗HTML
  const modalHTML = `
    <div class="modal-overlay">
      <div class="modal-content">
        <button class="modal-close">×</button>
        <img class="modal-image" src="" alt="Memory">
        <div class="modal-text"></div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  const modal = document.querySelector('.modal-overlay');
  const modalImage = modal.querySelector('.modal-image');
  const modalText = modal.querySelector('.modal-text');
  const closeBtn = modal.querySelector('.modal-close');

  // 关闭弹窗
  function closeModal() {
    modal.style.display = 'none';
  }

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // 照片点击事件
  const photos = document.querySelectorAll('.memory-photos img');
  
  photos.forEach(photo => {
    let isDragging = false;
    let currentX = 0;
    let currentY = 0;
    let initialX = 0;
    let initialY = 0;

    photo.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    function dragStart(e) {
      e.preventDefault();
      const rect = photo.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      if (clickX >= 0 && clickX <= rect.width && clickY >= 0 && clickY <= rect.height) {
        isDragging = true;
        const transform = getComputedStyle(photo).transform;
        const matrix = new DOMMatrix(transform);
        currentX = matrix.m41;
        currentY = matrix.m42;
        
        initialX = e.clientX - currentX;
        initialY = e.clientY - currentY;

        photo.style.zIndex = 1000;
        photo.style.transition = 'none';
      }
    }

    function drag(e) {
      if (!isDragging) return;
      e.preventDefault();
      
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;

      // 限制拖动范围
      currentX = Math.max(-photo.width/2, Math.min(window.innerWidth - photo.width/2, currentX));
      currentY = Math.max(0, Math.min(window.innerHeight - photo.height, currentY));

      setTranslate(currentX, currentY, photo);
    }

    function dragEnd(e) {
      if (!isDragging) return;

      const moveDistance = Math.sqrt(
        Math.pow(e.clientX - initialX - currentX, 2) + 
        Math.pow(e.clientY - initialY - currentY, 2)
      );

      isDragging = false;
      photo.style.zIndex = '';
      photo.style.transition = 'transform 0.3s ease';

      // 如果移动距离很小，认为是点击
      if (moveDistance < 5) {
        const photoId = photo.src.split('/').pop().split('.')[0];
        modalImage.src = photo.src;
        modalText.textContent = photoMessages[photoId];
        modal.style.display = 'flex';
      }
    }

    function setTranslate(xPos, yPos, el) {
      el.style.transform = `translate(${xPos}px, ${yPos}px)`;
    }
  });
}); 