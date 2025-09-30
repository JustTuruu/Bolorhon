# 📸 React-д зураг ашиглах заавар

## 1. 🗂️ **Public фолдерт зураг байршуулах** (Энгийн арга)

### Хаана байрлуулах:
```
public/
  images/
    baby-stroller.jpg
    car-seat.jpg  
    toy-set.jpg
    logo.png
```

### Хэрхэн ашиглах:
```jsx
<img src="/images/baby-stroller.jpg" alt="Хүүхдийн тэрэг" />
```

---

## 2. 📁 **src/assets фолдерт зураг байршуулах**

### Хаана байршуулах:
```
src/
  assets/
    images/
      baby-stroller.jpg
      car-seat.jpg
```

### Import хийх:
```jsx
import babyStroller from './assets/images/baby-stroller.jpg';
import carSeat from './assets/images/car-seat.jpg';

// Ашиглах:
<img src={babyStroller} alt="Хүүхдийн тэрэг" />
```

---

## 3. 🌐 **Интернетээс зураг ашиглах**

```jsx
<img 
  src="https://example.com/baby-stroller.jpg" 
  alt="Хүүхдийн тэрэг"
  onError={(e) => {
    e.target.src = "🚗"; // Зураг ачаалагдахгүй бол emoji харуулах
  }}
/>
```

---

## 4. 🔄 **Emoji болон зураг хослуулах** (Одоогийн аргын)

```jsx
const product = {
  id: 1,
  name: 'Хүүхдийн тэрэг',
  image: '/images/baby-stroller.jpg', // Зураг байвал
  emoji: '🚗', // Зураг байхгүй бол emoji
}

// JSX-д:
{product.image.startsWith('/images/') ? (
  <img src={product.image} alt={product.name} />
) : (
  <span>{product.emoji}</span>
)}
```

---

## 5. 📱 **Responsive зураг**

```jsx
<picture>
  <source media="(max-width: 768px)" srcSet="/images/mobile-baby-stroller.jpg" />
  <source media="(min-width: 769px)" srcSet="/images/desktop-baby-stroller.jpg" />
  <img src="/images/baby-stroller.jpg" alt="Хүүхдийн тэрэг" />
</picture>
```

---

## 6. 🎨 **CSS дээр background зураг**

```css
.product-card {
  background-image: url('/images/baby-stroller.jpg');
  background-size: cover;
  background-position: center;
}
```

---

## 🔧 **Танай одоогийн систем:**

✅ **Зураг байвал:** Жинхэнэ зураг харуулна
✅ **Зураг байхгүй бол:** Emoji харуулна  
✅ **Зураг ачаалагдахгүй бол:** Автоматаар emoji руу шилждэг

### Зураг нэмэх алхмууд:
1. `public/images/` фолдерт зураг хий
2. Бүтээгдэхүүний `image` талбарт зам оруул: `/images/filename.jpg`
3. `emoji` талбар нэмж, зураг ачаалагдахгүй үед emoji харуулна

### Жишээ:
```jsx
{
  id: 1,
  name: 'Хүүхдийн тэрэг',
  image: '/images/baby-stroller.jpg', // ← Энд зургийн зам
  emoji: '🚗', // ← Зураг ачаалагдахгүй бол энэ харагдана
}
```

---

## 🎯 **Зөвлөмжүүд:**

1. **Зургийн хэмжээ:** 400x300px, 800x600px гэх мэт
2. **Формат:** JPG (хурдан), PNG (тод), WebP (шинэ)
3. **Нэршээх:** `baby-stroller-red.jpg` гэх мэт тодорхой нэртэй
4. **Хэмжээ багасгах:** TinyPNG, ImageOptim ашигла
5. **Alt текст:** SEO болон хүртээмжийн төлөө заавал бич