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
const letterContent = `Nhiều lúc con bận rộn với việc học, với những dự định riêng mà quên mất rằng tóc mẹ ngày càng thêm sợi bạc, vai mẹ ngày càng thêm gánh nặng. Cuộc sống vốn vất vả và khó nhọc, mẹ cũng chỉ là lần đầu làm mẹ thôi nên mẹ sẽ không tránh khỏi những vấp ngã khiến mẹ mệt đi, sẽ không tránh khỏi những sai sót. Nhìn bóng lưng mẹ ngày đêm chăm lo cho gia đình nhỏ của tụi mình, con đã nghĩ rằng đôi khi mẹ cũng muốn gục ngã lắm chứ nhưng vì chúng con mẹ mạnh mẽ lại đứng lên bước tiếp để nuôi nấng con nên người, thành một người như lúc bấy giờ. Ngày nhỏ, con hay nghĩ mẹ thật nghiêm khắc, nhưng giờ con mới hiểu, tất cả những gì mẹ làm đều vì con. Cảm ơn mẹ đã cho con một tuổi thơ trọn vẹn, dạy con cách sống tử tế và mạnh mẽ. Mẹ là nguồn động viên lớn nhất trong đời con!\n\nNhân dịp 20/10, ngày phụ nữ Việt Nam, con mong mẹ luôn khỏe, hạnh phúc hơn, mỗi giây phút trôi qua trên quãng đường của mẹ đều luôn chan chứa những khoảnh khắc hạnh phúc. Dù mẹ đối mặt với nhiều điều buồn phiền trong cuộc sống xô bồ ngoài kia nhưng con luôn mong rằng mẹ sẽ cười thật nhiều bởi nụ cười của mẹ rất đẹp, thấy nụ cười của mẹ con thấy hạnh phúc theo, mẹ à. Mong rằng những điều tốt đẹp trong cuộc sống này sẽ tới với người mẹ của con, mẹ của con mạnh mẽ lắm có lẽ tới cả những siêu anh hùng trong truyện tranh còn thua cả mẹ của con nữa cơ. Con yêu mẹ rất nhiều.\n\nMẹ à, hình như càng lớn con lại càng khó nói ra những điều trong lòng của mình với mẹ. Nhưng con muốn nói với mẹ rằng con luôn biết ơn tất cả những gì mẹ dành cho con thời gian qua. Nếu có kiếp sống khác, con mong rằng con vẫn làm đứa con trai bé bỏng được mẹ yêu thương như bây giờ.\n\nCảm ơn mẹ vì đã luôn là hậu phương vững chắc, là nơi bình yên nhất để con quay về. Cảm ơn mẹ vì tất cả những hy sinh thầm lặng mà có thể con chưa bao giờ hiểu hết được.\n\nCon xin lỗi vì những lúc còn vô tâm, làm mẹ phải phiền lòng. Con sẽ trưởng thành hơn, sẽ cố gắng hơn nữa để mẹ có thể an lòng và tự hào.\n\nSau cùng con chỉ muốn nói với mẹ rằng: Con yêu mẹ rất nhiều! Con biết con ít khi thể hiện tình cảm, nhưng trong lòng con, mẹ luôn là người quan trọng nhất. Cảm ơn mẹ vì tất cả những gì mẹ đã làm cho con và xin lỗi mẹ vì những lúc con đã khiến mẹ buồn. Liệu rằng lúc mẹ đọc xong bức thư này, con có thể ôm mẹ một cái được không ạ?`;
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
