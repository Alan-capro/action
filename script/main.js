// Import the data to customize and insert them into page
const fetchData = () => {
  fetch("customize.json")
    .then(data => data.json())
    .then(data => {
      dataArr = Object.keys(data)
      dataArr.map(customData => {
        if (data[customData] !== "") {
          if (customData === "imagePath") {
            document
              .querySelector(`[data-node-name*="${customData}"]`)
              .setAttribute("src", data[customData])
          } else {
            document.querySelector(`[data-node-name*="${customData}"]`).innerText = data[customData]
          }
        }

        // Check if the iteration is over
        // Run amimation if so
        if (dataArr.length === dataArr.indexOf(customData) + 1) {
          document.querySelector("#startButton").addEventListener("click", () => {
            document.querySelector(".startSign").style.display = "none"
            animationTimeline()
          }
          )
          // animationTimeline()
        }
      })
    })
}

let audio = null

// 在文档加载时预加载音频
document.addEventListener("DOMContentLoaded", () => {
  audio = new Audio("music/bgMusic.mp3")
  audio.preload = "auto"
})

const playPauseButton = document.getElementById('playPauseButton')
let isPlaying = false // 初始状态为未播放

playPauseButton.addEventListener('click', () => {
  isPlaying = !isPlaying // 切换播放状态

  if (isPlaying) {
    // 如果当前是播放状态，则开始播放音频并更新按钮样式
    audio.play()
    playPauseButton.classList.add('playing')
  } else {
    // 如果当前是暂停状态，则暂停音频并更新按钮样式
    audio.pause()
    playPauseButton.classList.remove('playing')
  }
})





// Animation Timeline
const animationTimeline = () => {
  // Spit chars that needs to be animated individually
  const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0]
  const hbd = document.getElementsByClassName("wish-hbd")[0]

  textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
    .split("")
    .join("</span><span>")}</span`

  hbd.innerHTML = `<span>${hbd.innerHTML
    .split("")
    .join("</span><span>")}</span`

  const ideaTextTrans = {
    opacity: 0,
    y: -20,
    rotationX: 5,
    skewX: "15deg"
  }

  const ideaTextTransLeave = {
    opacity: 0,
    y: 20,
    rotationY: 5,
    skewX: "-15deg"
  }

  const tl = new TimelineMax()

  tl
    .to(".container", 0.1, {
      visibility: "visible"
    })
    .from(".one", 0.7, {
      opacity: 0,
      y: 10
    })
    .from(".two", 0.4, {
      opacity: 0,
      y: 10
    })
    .to(
      ".one",
      0.7,
      {
        opacity: 0,
        y: 10
      },
      "+=2.5"
    )
    .to(
      ".two",
      0.7,
      {
        opacity: 0,
        y: 10
      },
      "-=1"
    )
    .from(".three", 0.7, {
      opacity: 0,
      y: 10
    })
    .to(
      ".three",
      0.7,
      {
        opacity: 0,
        y: 10
      },
      "+=2"
    )
    .from(".four", 0.7, {
      scale: 0.2,
      opacity: 0
    })
    .from(".fake-btn", 0.3, {
      scale: 0.2,
      opacity: 0
    })
    .staggerTo(
      ".hbd-chatbox span",
      0.5,
      {
        visibility: "visible"
      },
      0.05
    )
    .to(".fake-btn", 0.1, {
      backgroundColor: "#8FE3B6"
    })
    .to(
      ".four",
      0.5,
      {
        scale: 0.2,
        opacity: 0,
        y: -150
      },
      "+=0.7"
    )
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, {
      scale: 1.2,
      x: 10,
      backgroundColor: "rgb(21, 161, 237)",
      color: "#fff"
    })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-5", 0.7, ideaTextTrans)
    .to(".idea-5", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-6", 0.7, ideaTextTrans)
    .to(".idea-6", 0.7, ideaTextTransLeave, "+=1.5")
    .staggerFrom(
      ".wish-hbd span",
      0.7,
      {
        opacity: 0,
        y: -50,
        rotation: 150,
        skewX: "30deg",
        ease: Elastic.easeOut.config(1, 0.5)
      },
      0.1
    )
    .staggerTo(
      ".wish-hbd span",
      0.7,
      {
        scale: 1,
        rotationY: 0,
        color: "#ff69b4",
        ease: Expo.easeOut
      },
      0.1,
      "party"
    )
    .from(
      ".wish h5",
      0.5,
      {
        opacity: 0,
        y: 10,
        skewX: "-15deg"
      },
      "party"
    )
    .to("#showPhotoWallBtn", 1, {
      opacity: 1,
      y: 20,
      ease: "bounce.out"
    })
    .staggerTo(
      ".eight svg",
      1.5,
      {
        visibility: "visible",
        opacity: 0,
        scale: 80,
        repeat: 3,
        repeatDelay: 1.4
      },
      0.3
    )
    .to(".six", 0.5, {
      opacity: 0,
      y: 30,
      zIndex: "-1"
    })
    .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
    .to(
      ".last-smile",
      0.5,
      {
        rotation: 90
      },
      "+=1"
    )
    .from(
      ".lydia-dp",
      0.5,
      {
        scale: 3.5,
        opacity: 0,
        x: 25,
        y: -25,
        rotationZ: -45
      },
      "-=2"
    )
    .from(".rose", 0.5, {
      x: -100,
      y: 350,
      rotation: -180,
      opacity: 0
    })
}

// Run fetch and animation in sequence
fetchData()

// 修改照片墙函数
function showPhotoWall() {
  const modal = document.createElement('div');
  modal.className = 'photo-wall-modal';
  modal.style.display = 'flex';
  
  const photoWall = document.createElement('div');
  photoWall.className = 'photo-wall';
  
  // 添加标题
  const title = document.createElement('h2');
  title.textContent = '我们的美好回忆';
  photoWall.appendChild(title);
  
  // 创建照片容器
  const photosContainer = document.createElement('div');
  photosContainer.className = 'photo-wall-content';
  
  // 使用正确的图片路径
  for(let i = 1; i <= 17; i++) {
    const photoItem = document.createElement('div');
    photoItem.className = 'photo-item';
    
    const img = document.createElement('img');
    img.src = `frontend/static/img/memories/photo${i}.jpg`;
    img.dataset.message = photoMessages[`photo${i}`];
    
    // 修改照片点击事件
    photoItem.onclick = () => {
      const message = img.dataset.message;
      
      // 创建信件弹窗
      const letterModal = document.createElement('div');
      letterModal.className = 'letter-modal';
      
      // 创建信件内容
      const letterContent = document.createElement('div');
      letterContent.className = 'letter-content';
      letterContent.textContent = message;
      
      // 创建关闭按钮
      const closeBtn = document.createElement('div');
      closeBtn.className = 'letter-close';
      closeBtn.innerHTML = '×';
      closeBtn.onclick = (e) => {
        e.stopPropagation();
        letterModal.remove();
      };
      
      // 添加到页面
      letterModal.appendChild(letterContent);
      letterModal.appendChild(closeBtn);
      document.body.appendChild(letterModal);
      
      // 点击图片时的动画效果
      img.style.transform = 'scale(1.15) rotate(2deg)';
      setTimeout(() => {
        img.style.transform = 'scale(1.08) rotate(1deg)';
      }, 300);
      
      // 点击弹窗外部关闭
      letterModal.onclick = (e) => {
        if (e.target === letterModal) {
          letterModal.remove();
        }
      };
    };
    
    photoItem.appendChild(img);
    photosContainer.appendChild(photoItem);
  }
  
  photoWall.appendChild(photosContainer);
  
  const continueBtn = document.createElement('button');
  continueBtn.className = 'continue-btn';
  continueBtn.textContent = '继续我们的故事';
  continueBtn.onclick = () => {
    modal.style.opacity = '0';
    setTimeout(() => {
      modal.remove();
      showGiftCard();
    }, 300);
  };
  
  photoWall.appendChild(continueBtn);
  modal.appendChild(photoWall);
  
  // 添加渐入动画
  modal.style.opacity = '0';
  document.body.appendChild(modal);
  requestAnimationFrame(() => {
    modal.style.opacity = '1';
    modal.style.transition = 'opacity 0.3s ease';
  });
}

// 修改礼物卡函数
function showGiftCard() {
  const modal = document.createElement('div');
  modal.className = 'gift-card-modal';
  modal.style.display = 'flex';  // 确保弹窗显示
  
  const giftCard = document.createElement('div');
  giftCard.className = 'gift-card';
  giftCard.innerHTML = `
    <h2>爱的礼物卡</h2>
    <p>亲爱的，</p>
    <p>这是一张特别的礼物卡，代表我对你的爱</p>
    <p>永远爱你 ❤️</p>
  `;
  
  modal.appendChild(giftCard);
  document.body.appendChild(modal);
  
  // 点击任意位置关闭礼物卡
  modal.onclick = () => {
    modal.remove();
    // 继续播放剩余动画
    continueAnimation();
  };
}

// 继续播放剩余动画
function continueAnimation() {
  const tl = new TimelineMax();
  
  tl.staggerFrom(
    ".wish-hbd span",
    0.7,
    {
      opacity: 0,
      y: -50,
      rotation: 150,
      skewX: "30deg",
      ease: Elastic.easeOut.config(1, 0.5)
    },
    0.1
  )
  .staggerTo(
    ".wish-hbd span",
    0.7,
    {
      scale: 1,
      rotationY: 0,
      color: "#ff69b4",
      ease: Expo.easeOut
    },
    0.1,
    "party"
  )
  // ... 其他结束动画
}

// 添加按钮点击事件监听
document.getElementById('showPhotoWallBtn').addEventListener('click', () => {
  showPhotoWall();
});