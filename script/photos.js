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
  document.querySelectorAll('.memory-photos img').forEach(photo => {
    photo.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const photoId = photo.src.split('/').pop().split('.')[0];
      console.log('Clicked photo:', photoId);
      
      modalImage.src = photo.src;
      modalText.textContent = photoMessages[photoId];
      modal.style.display = 'flex';

      // 使用 TweenMax 而不是 gsap
      TweenMax.fromTo(modal, 0.3,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, ease: Power2.easeOut }
      );
    });
  });
}); 