
# KKTC Turizm Uygulaması

KKTC Turizm Uygulaması turistler, işletmeler ve kurumlar için kapsamlı bir dijital platformdur.

## Projeyi Yerel Bilgisayarınızda Çalıştırma

### Gereksinimler

- [Node.js](https://nodejs.org/) (v16 veya üzeri)
- [Git](https://git-scm.com/)
- Bir kod editörü (VS Code önerilir)

### Adımlar

1. **Projeyi klonlayın**
   ```bash
   git clone https://github.com/your-username/your-project-name.git
   ```

2. **Proje dizinine gidin**
   ```bash
   cd your-project-name
   ```

3. **Gerekli bağımlılıkları yükleyin**
   ```bash
   npm install
   ```

4. **Geliştirme sunucusunu başlatın**
   ```bash
   npm run dev
   ```

5. **Tarayıcınızı açın ve aşağıdaki adrese gidin**
   ```
   http://localhost:8080
   ```

## Supabase Fonksiyonlarını Çalıştırma

Bu proje Supabase Edge Functions kullanmaktadır. Yerel ortamda test etmek için:

1. **Supabase CLI'ı yükleyin**
   ```bash
   npm install -g supabase
   ```

2. **Supabase'e giriş yapın**
   ```bash
   supabase login
   ```

3. **Edge Functions'ı yerel olarak başlatın**
   ```bash
   supabase functions serve
   ```

## Derleme ve Yayınlama

Projeyi yayınlamak için:

1. **Üretim için derleyin**
   ```bash
   npm run build
   ```

2. **Derlenen dosyalar `dist` klasöründe olacaktır**

## Teknolojiler

- React
- TypeScript
- Vite
- Tailwind CSS
- Shadcn/UI
- Supabase
- OpenAI

