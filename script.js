document.addEventListener("DOMContentLoaded", () => {
  // --- Các màn hình và nút ---
  const screens = document.querySelectorAll(".screen");
  const openBtn = document.getElementById("open-btn");
  const nextBtn = document.getElementById("next-btn");
  const finishLetterBtn = document.getElementById("finish-letter-btn");
  const audio = document.getElementById("background-music");

  const galleryImage = document.getElementById("gallery-image");
  const galleryCaption = document.getElementById("gallery-caption");
  const letterTextEl = document.getElementById("letter-text");

  // --- DỮ LIỆU CÁ NHÂN HÓA ĐÃ ĐƯỢC CẬP NHẬT ---

  // 1. Danh sách ảnh và chú thích mới
  const memories = [
    {
      image: "me_luc_tre.jpg",
      caption: "Đây là mẹ của 1 năm trước vẫn luôn xinh đẹp và rạng rỡ.",
    },
    {
      image: "me_va_chi.jpg",
      caption:
        "Tình yêu thương của mẹ dành cho chúng con, dù là chị hay em, vẫn luôn đong đầy như vậy.",
    },
    {
      image: "gia_dinh.jpg",
      caption: "Và gia đình mình, là điều quý giá nhất mà con có.",
    },
  ];
  let currentMemoryIndex = 0;

  // 2. Nội dung bức thư (vẫn giữ nguyên sự chân thành)
  const letterContent = `Nhiều lúc con bận rộn với việc học, với những dự định riêng mà quên mất rằng tóc mẹ ngày càng thêm sợi bạc, vai mẹ ngày càng thêm gánh nặng.\n\nCảm ơn mẹ vì đã luôn là hậu phương vững chắc, là nơi bình yên nhất để con quay về. Cảm ơn mẹ vì tất cả những hy sinh thầm lặng mà có thể con chưa bao giờ hiểu hết được.\n\nCon xin lỗi vì những lúc còn vô tâm, làm mẹ phải phiền lòng. Con sẽ trưởng thành hơn, sẽ cố gắng hơn nữa để mẹ có thể an lòng và tự hào.`;

  // --- Hàm điều khiển ---
  function showScreen(screenId) {
    screens.forEach((screen) => {
      if (screen.id === screenId) {
        screen.classList.add("active");
      } else {
        screen.classList.remove("active");
      }
    });
  }

  function showMemory(index) {
    galleryImage.src = memories[index].image;
    galleryCaption.textContent = memories[index].caption;
  }

  function typeWriterEffect(text, onComplete) {
    let i = 0;
    letterTextEl.textContent = "";
    const interval = setInterval(() => {
      if (i < text.length) {
        letterTextEl.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, 50); // Tốc độ gõ chữ
  }

  // --- Luồng sự kiện ---

  // 1. Mở nhật ký
  openBtn.addEventListener("click", () => {
    showScreen("gallery-screen");
    audio.play().catch((e) => console.error(e));
    showMemory(currentMemoryIndex);
  });

  // 2. Xem ảnh tiếp theo
  nextBtn.addEventListener("click", () => {
    currentMemoryIndex++;
    if (currentMemoryIndex < memories.length) {
      showMemory(currentMemoryIndex);
    } else {
      // Hết ảnh, chuyển sang màn hình thư
      showScreen("letter-screen");
      typeWriterEffect(letterContent, () => {
        finishLetterBtn.classList.remove("hidden"); // Hiện nút sau khi gõ xong
      });
    }
  });

  // 3. Đọc xong thư
  finishLetterBtn.addEventListener("click", () => {
    showScreen("promise-screen");
  });
});
