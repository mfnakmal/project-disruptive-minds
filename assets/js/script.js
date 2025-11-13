// === NAV: Smooth scroll untuk link hash di halaman yang sama ===
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    }
  });
});

// === NAV: Toggle mobile menu ===
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

// === QUIZ: Logic simulasi karier 20 pertanyaan + animasi hasil ===
const quizForm = document.getElementById('careerQuiz');
const quizResultBox = document.getElementById('quizResult');
let resultText = null;
let resultTitle = null;
let resultTagline = null;
let resultIcon = null;

if (quizResultBox) {
  resultText = quizResultBox.querySelector('.result-text');
  resultTitle = document.getElementById('resultTitle');
  resultTagline = document.getElementById('resultTagline');
  resultIcon = document.getElementById('resultIcon');
}

const resetBtn = document.getElementById('resetQuiz');

if (quizForm && quizResultBox && resultText) {
  quizForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(quizForm);

    const scores = { TECH: 0, CREATIVE: 0, SOCIAL: 0, BUSINESS: 0 };

    // q1 sampai q20
    for (let i = 1; i <= 20; i++) {
      const key = 'q' + i;
      const value = formData.get(key);
      if (value && scores[value] !== undefined) {
        scores[value] += 1;
      }
    }

    const totalAnswered = Object.values(scores).reduce((a, b) => a + b, 0);
    if (totalAnswered < 8) {
      quizResultBox.classList.remove('hidden');
      if (resultTitle) resultTitle.textContent = 'Lengkapi Dulu Beberapa Pertanyaan 🙏';
      if (resultTagline) resultTagline.textContent =
        'Jawab lebih banyak pertanyaan agar rekomendasi karier lebih akurat.';
      resultText.textContent =
        'Jawab dulu sebagian besar pertanyaan agar rekomendasi lebih relevan, ya 😊';
      // hapus tema sebelumnya
      quizResultBox.classList.remove('theme-tech', 'theme-creative', 'theme-social', 'theme-business');
      if (resultIcon) resultIcon.textContent = '💡';
      return;
    }

    let bestCategory = null;
    let bestScore = -1;
    for (const key in scores) {
      if (scores[key] > bestScore) {
        bestScore = scores[key];
        bestCategory = key;
      }
    }

    let message = '';
    let title = 'Hasil Rekomendasi Karier';
    let tagline = '';
    let icon = '💡';

    // bersihkan tema sebelumnya
    quizResultBox.classList.remove('theme-tech', 'theme-creative', 'theme-social', 'theme-business');

    switch (bestCategory) {
      case 'TECH':
        title = 'Kecenderunganmu: Tech & Engineering 🚀';
        tagline = 'Kamu tampak nyaman bermain di ranah teknis dan logis.';
        icon = '🚀';
        quizResultBox.classList.add('theme-tech');
        message =
          'Berdasarkan jawabanmu, kamu punya kecenderungan kuat di bidang teknis dan teknologi. ' +
          'Jalur karier yang bisa kamu eksplor antara lain: Software/Web Developer, Mobile Developer, Data Engineer, ' +
          'Machine Learning Engineer, Cloud Engineer, atau Cybersecurity Specialist. ' +
          'Mulailah dengan memperkuat dasar-dasar pemrograman, logika, dan konsep sistem komputer.';
        break;

      case 'CREATIVE':
        title = 'Kecenderunganmu: Creative & Design 🎨';
        tagline = 'Kamu punya sensitifitas visual dan ide yang kuat.';
        icon = '🎨';
        quizResultBox.classList.add('theme-creative');
        message =
          'Jawabanmu menunjukkan kekuatan di sisi kreativitas dan kepekaan visual. ' +
          'Karier yang cocok dieksplor: UI/UX Designer, Graphic/Visual Designer, Motion Designer, Video Editor, ' +
          'atau Content Creator. ' +
          'Bangun portofolio karya, pelajari tools desain (misalnya Figma, Photoshop), dan terus eksplorasi gaya visualmu.';
        break;

      case 'SOCIAL':
        title = 'Kecenderunganmu: Social & Communication 🤝';
        tagline = 'Interaksi, komunikasi, dan kolaborasi adalah kekuatanmu.';
        icon = '🤝';
        quizResultBox.classList.add('theme-social');
        message =
          'Kamu nyaman berinteraksi, berkomunikasi, dan bekerja dengan banyak orang. ' +
          'Karier yang bisa kamu pertimbangkan: Digital Marketer, Community Manager, Trainer, Public Speaker, ' +
          'Customer Experience Specialist, atau peran yang kuat di sisi people & communication. ' +
          'Asah kemampuan presentasi, storytelling, dan kemampuan membangun relasi.';
        break;

      case 'BUSINESS':
        title = 'Kecenderunganmu: Business & Strategy 📊';
        tagline = 'Kamu tertarik pada strategi, angka, dan peluang.';
        icon = '📊';
        quizResultBox.classList.add('theme-business');
        message =
          'Kamu memiliki pola pikir yang terstruktur dan tertarik pada strategi, angka, serta peluang. ' +
          'Karier seperti Product Manager, Business Analyst, Entrepreneur, Project Manager, atau Financial Analyst ' +
          'bisa sangat relevan. Pelajari dasar-dasar bisnis, analisis data sederhana, dan biasakan membuat keputusan berbasis data.';
        break;

      default:
        title = 'Kecenderunganmu Masih Seimbang 💡';
        tagline = 'Ini bukan hal buruk—justru artinya kamu fleksibel dan adaptif.';
        icon = '💡';
        message =
          'Kecenderunganmu cukup seimbang di beberapa kategori. ' +
          'Ini artinya kamu fleksibel dan bisa mengeksplorasi banyak bidang sekaligus. ' +
          'Cobalah beberapa aktivitas nyata di bidang teknologi, desain kreatif, komunikasi, dan bisnis ' +
          'untuk melihat mana yang paling membuatmu bersemangat dalam jangka panjang.';
    }

    if (resultTitle) resultTitle.textContent = title;
    if (resultTagline) resultTagline.textContent = tagline;
    if (resultIcon) resultIcon.textContent = icon;

    quizResultBox.classList.remove('hidden');
    resultText.textContent = message;
  });
}

// tombol reset
if (resetBtn && quizForm && quizResultBox && resultText) {
  resetBtn.addEventListener('click', () => {
    quizForm.reset();
    quizResultBox.classList.add('hidden');
    resultText.textContent = '';
    // reset header & tema
    quizResultBox.classList.remove('theme-tech', 'theme-creative', 'theme-social', 'theme-business');
    if (resultTitle) resultTitle.textContent = 'Hasil Rekomendasi Karier';
    if (resultTagline) resultTagline.textContent =
      'Ini adalah gambaran umum kecenderungan minatmu.';
    if (resultIcon) resultIcon.textContent = '💡';

    window.scrollTo({ top: quizForm.offsetTop - 80, behavior: 'smooth' });
  });
}
