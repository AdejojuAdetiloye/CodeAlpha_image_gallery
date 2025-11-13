
// Gallery Data
const galleryData = [
  {
    id: 1,
    title: "Mountain Vista",
    category: "nature",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
  },
  {
    id: 2,
    title: "Modern Building",
    category: "architecture",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
  },
  {
    id: 3,
    title: "Circuit Board",
    category: "technology",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80"
  },
  {
    id: 4,
    title: "Forest Path",
    category: "nature",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80"
  },
  {
    id: 5,
    title: "City Skyline",
    category: "architecture",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80"
  },
  {
    id: 6,
    title: "Laptop & Coffee",
    category: "technology",
    image: "https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=800&q=80"
  },
  {
    id: 7,
    title: "Ocean Waves",
    category: "nature",
    image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&q=80"
  },
  {
    id: 8,
    title: "Portrait",
    category: "people",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80"
  },
  {
    id: 9,
    title: "Geometric Art",
    category: "abstract",
    image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&q=80"
  },
  {
    id: 10,
    title: "Bridge Architecture",
    category: "architecture",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80"
  },
  {
    id: 11,
    title: "VR Technology",
    category: "technology",
    image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=800&q=80"
  },
  {
    id: 12,
    title: "Team Meeting",
    category: "people",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
  }
];

// State
let currentFilter = 'all';
let currentImageIndex = 0;
let filteredImages = [...galleryData];

// DOM Elements
const gallery = document.getElementById('gallery');
const filterBtns = document.querySelectorAll('.filter-btn');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

// Initialize Gallery
function renderGallery(data) {
  gallery.innerHTML = '';
  data.forEach((item, index) => {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.dataset.category = item.category;
    galleryItem.dataset.index = index;

    galleryItem.innerHTML = `
                    <img src="${item.image}" alt="${item.title}">
                    <div class="gallery-item-overlay">
                        <div class="gallery-item-title">${item.title}</div>
                        <div class="gallery-item-category">${item.category.toUpperCase()}</div>
                    </div>
                `;

    galleryItem.addEventListener('click', () => openLightbox(index));
    gallery.appendChild(galleryItem);
  });
}

// Filter Functionality
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    currentFilter = filter;

    // Hide current items with animation
    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => item.classList.add('hide'));

    // Filter and render new items
    setTimeout(() => {
      if (filter === 'all') {
        filteredImages = [...galleryData];
      } else {
        filteredImages = galleryData.filter(item => item.category === filter);
      }
      renderGallery(filteredImages);
    }, 400);
  });
});

// Lightbox Functions
function openLightbox(index) {
  currentImageIndex = index;
  updateLightboxImage();
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function updateLightboxImage() {
  const currentImage = filteredImages[currentImageIndex];
  lightboxImg.src = currentImage.image;
  lightboxCaption.textContent = `${currentImage.title} - ${currentImage.category.toUpperCase()}`;
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
  updateLightboxImage();
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
  updateLightboxImage();
}

// Event Listeners
lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', nextImage);
lightboxPrev.addEventListener('click', prevImage);

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;

  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') nextImage();
  if (e.key === 'ArrowLeft') prevImage();
});

// Close lightbox when clicking outside image
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Initialize
renderGallery(galleryData);
