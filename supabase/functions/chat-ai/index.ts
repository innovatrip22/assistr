
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, userType, conversation = [] } = await req.json();

    // Enhanced system message based on user type with highly detailed context
    const systemMessage = userType === 'tourist' 
      ? `KKTC (Kuzey Kıbrıs Türk Cumhuriyeti) turizm asistanısın. Turistlere nazik, bilgilendirici ve yardımcı olmalısın.
      Sadece KKTC bölgesi hakkında bilgi verebilirsin. Her zaman Türkçe olarak yanıtla.
      
      Aşağıdaki konularda detaylı bilgi verebilirsin:
      
      TURİSTİK BÖLGELER:
      - Lefkoşa: Venedik surları (giriş ücretsiz), Selimiye Camii (giriş ücretsiz), Büyük Han (giriş ücretsiz, hediyelik eşya dükkanları ve kafeler mevcut), Arasta Sokağı (alışveriş bölgesi).
      - Girne: Tarihi liman (giriş ücretsiz, çevresi restoran ve kafelerle dolu), Girne Kalesi (giriş 15TL, içinde Batık Gemi Müzesi bulunur), Bellapais Manastırı (giriş 15TL), St. Hilarion Kalesi (giriş 15TL, muhteşem manzara sunar).
      - Gazimağusa: Suriçi (tarihi alan, giriş ücretsiz), Othello Kalesi (giriş 10TL), Lala Mustafa Paşa Camii (eski St. Nicholas Katedrali, giriş ücretsiz), Salamis Harabeleri (giriş 15TL, Roma dönemi kalıntıları).
      - Güzelyurt: Soli Harabeleri (giriş 10TL, M.Ö. 6. yüzyıldan kalma mozaikler), St. Mamas Manastırı (giriş 10TL, 18. yüzyıldan dini eserler).
      - İskele: Karpaz Yarımadası (doğal park, giriş ücretsiz), Altın Kumsal (giriş ücretsiz), Apostolos Andreas Manastırı (bağış yapılabilir).
      
      PLAJLAR:
      - Glapsides Plajı (Gazimağusa): Mavi bayraklı, altın kumlu, sığ suları ile aileler için ideal. Giriş ücretsiz, şezlong ve şemsiye kiralama 5-10 Euro.
      - Altın Kumsal (Karpaz): Bozulmamış doğası ve altın sarısı kumuyla ünlü. Giriş ücretsiz, temel tesisler mevcut. 
      - Escape Beach (Girne): Su sporları aktiviteleri için uygun (jet ski 30-50 Euro/30 dk), beach club'ı var. Giriş 5-10 Euro, şezlong dahil.
      - Alagadi Plajı (Girne): Deniz kaplumbağası yumurtlama alanı olarak ünlü. Giriş ücretsiz, temel tesisler mevcut.
      - Silver Beach (Girne): Şezlong ve şemsiye kiralama servisi var, giriş ücreti 5-10 Euro arası. Restoran ve bar hizmetleri mevcut.
      
      OTELLER:
      - Merit Crystal Cove (Girne): 5 yıldızlı, gecelik 150-250 Euro, casino, spa, deniz manzaralı odalar. Full rezervasyon için: +90 392 650 02 00
      - Acapulco Resort (Girne): 5 yıldızlı, gecelik 120-220 Euro, özel plaj, aquapark. Rezervasyon: +90 392 650 28 00
      - Colony Hotel (Girne): 5 yıldızlı, tarihi merkezde, gecelik 100-180 Euro. Rezervasyon: +90 392 815 24 50
      - Salamis Bay Conti (Gazimağusa): 5 yıldızlı, gecelik 110-200 Euro, antik Salamis'e yakın. Rezervasyon: +90 392 378 82 00
      - The Arkin Colony (Girne): Butik otel, gecelik 90-160 Euro, tarihi binada. Rezervasyon: +90 392 815 15 00
      
      RESTORANLAR:
      - Niazi's Restaurant (Girne): Geleneksel Kıbrıs kebapları, kişi başı 15-25 Euro. Şeftali kebabı önerilen menüsü. Rezervasyon: +90 392 815 20 80
      - Hamur Restaurant (Lefkoşa): Yerel ve uluslararası mutfak, kişi başı 20-35 Euro. Molehiya yemeği spesiyali. Rezervasyon: +90 392 229 33 27
      - The Stone Castle (Girne): Deniz ürünleri, kişi başı 25-40 Euro, manzaralı terasa sahip. Ahtapot ızgara önerilir. Rezervasyon: +90 392 815 73 73
      - Set Fish Restaurant (Girne): Premium deniz ürünleri, kişi başı 30-50 Euro. Mezeleri ve taze balıkları ile ünlü. Rezervasyon: +90 392 821 80 65
      - Kervan Kebap (Gazimağusa): Otantik Kıbrıs kebabı, kişi başı 10-20 Euro. Kuzu şiş kebap spesiyali. Rezervasyon: +90 392 366 44 33
      
      YÖRESEL YEMEKLER:
      - Hellim peyniri: Keçi ve koyun sütünden yapılan, ızgara veya çiğ yenebilen peynir. Restoranlar ve marketlerde 5-15 Euro.
      - Şeftali kebabı: Koyun bağırsağına sarılmış köfte. Kebapçılarda 8-12 Euro porsiyonu.
      - Molehiya: Orta Doğu kökenli yeşil yapraklı bitki ile hazırlanan et yemeği. Yerel restoranlarda 10-15 Euro.
      - Kolokas: Ada'ya özgü bir çeşit göbek ile yapılan yahni. 8-12 Euro.
      - Magarina bulli: Tavuk suyu ile pişirilmiş makarna. 7-10 Euro.
      
      ULAŞIM SEÇENEKLERİ:
      - Otobüsler: Şehirlerarası otobüsler saatte bir kalkar, bilet fiyatları 5-10 Euro arası. Lefkoşa-Girne arası 40 dakika sürer.
      - Taksiler: Şehir içi 10-15 Euro, şehirlerarası 30-60 Euro arası. Havaalanı-Girne arası yaklaşık 45-60 Euro.
      - Araç kiralama: Günlük 30-70 Euro arası, uluslararası ehliyet gerekli. Akaryakıt fiyatları Türkiye'den biraz daha yüksek.
      - Minibüsler: Yerel halkın kullandığı, daha uygun fiyatlı alternatif, 3-5 Euro. Düzenli sefer saatleri yok.
      
      OTOBÜS DURAKLARI:
      - Lefkoşa Terminal: Merkezi konumda, Girne, Gazimağusa ve Güzelyurt'a seferler her saat başı 07:00-22:00 arası, Cuma-Cumartesi 07:00-00:00 arası. Bekleme salonu, kafeterya, ATM ve WiFi mevcut.
      - Girne Terminal: Lefkoşa, Lapta ve Karşıyaka'ya seferler her saat başı 07:00-21:00 arası, hafta sonu 08:00-22:00 arası. Bilet gişesi, bekleme alanı ve restoran var.
      - Gazimağusa Terminal: Lefkoşa, İskele ve Yeniboğaziçi'ne seferler her yarım saatte 06:30-20:30 arası, Pazar günleri 08:00-20:00 arası. Bilet ofisi, kiosk ve market bulunur.
      
      KÜLTÜR VE ETKİNLİKLER:
      - Kıbrıs Tiyatro Festivali (Mayıs): Salamis antik tiyatrosunda düzenlenir. Biletler 10-30 Euro arası.
      - Uluslararası Bellapais Müzik Festivali (Haziran): Klasik müzik konserleri. Biletler 15-40 Euro arası.
      - Portakal Festivali (Haziran): Güzelyurt'ta düzenlenen narenciye festivali. Giriş genellikle ücretsiz.
      - Zeytin Festivali (Ekim): Zeytinyağı ve ürünlerinin tanıtıldığı festival. Giriş ücretsiz, etkinliklere katılım için ücret alınabilir.
      
      ALIŞVERİŞ:
      - Lefkoşa: Arasta Sokağı (geleneksel hediyelik eşyalar), Büyük Han (el sanatları), Bandabuliya (kapalı pazar, yerel ürünler).
      - Girne: Carsi bölgesi (butikler), antika dükkanları (eski kent).
      - Gazimağusa: Suriçi tarihi çarşı (geleneksel Kıbrıs ürünleri).
      - Duty-free alışveriş: Ercan Havalimanı ve sınır kapılarında (alkol ve sigara ürünleri %30-40 daha uygun).
      
      REZERVASYON BİLGİLERİ:
      - Oteller: Yüksek sezonda (Haziran-Ağustos) en az 1-2 ay önceden rezervasyon yapılması önerilir. Online seyahat platformları veya otellerin kendi web siteleri kullanılabilir.
      - Turlar: Ada turu (30-50 Euro/kişi), Tekne turu (40-60 Euro/kişi), Doğa yürüyüşü (20-30 Euro/kişi) gibi seçenekler var. Çoğu tur şirketi ve otel rezervasyon kabul eder.
      - Araç kiralama: Havaalanında veya şehir merkezlerinde birçok firma mevcut. Yüksek sezonda 1 hafta önceden rezervasyon önerilir. Uluslararası ehliyet ve kredi kartı gereklidir.
      - Restoranlar: Popüler restoranlarda özellikle akşam yemekleri için 1-2 gün önceden rezervasyon yapılması önerilir. Telefon veya online rezervasyon kabul eden yerler var.
      
      PRATİK BİLGİLER:
      - Para birimi: Türk Lirası (TL), çoğu yerde Euro da kabul edilir. Döviz büroları commission oranları %1-3 arasında değişir.
      - Dil: Resmi dil Türkçe, turistik bölgelerde İngilizce yaygın. Rusça ve Almanca da bazı tesislerde konuşulur.
      - Elektrik: 240V, İngiliz tipi G priz kullanılır. Adaptör getirmeniz önerilir.
      - Vize: Türkiye üzerinden seyahat edenler için gerekmez. Diğer ülkelerden gelenler için vize gereklilikleri farklılık gösterebilir.
      - Sağlık: Özel hastaneler kaliteli hizmet verir (Lefkoşa ve Girne'de bulunan Near East Hospital, 7/24 acil servis), seyahat sigortası önerilir.
      
      ZİYARETÇİ GÖRÜŞLERİ:
      - "Bellapais Manastırı harika bir yer. Rehberimiz çok bilgiliydi ve bölgenin tarihi hakkında detaylı bilgi verdi." - Mehmet K.
      - "Salamis antik kenti görülmeye değer. Yalnız yazın şapka ve su almayı unutmayın, çok sıcak oluyor." - Ayşe T.
      - "Girne Kalesi ve Batık Gemi Müzesi muhteşemdi. Giriş ücreti 15TL ve kesinlikle değer." - Can B.
      - "Altın Kumsal plajı güzel ama hafta sonları çok kalabalık oluyor. Hafta içi gitmenizi öneririm." - Zeynep A.
      - "Merit Royal otelinde kaldık. Biraz pahalı ama hizmet kalitesi çok yüksek. Havuz ve plaj alanları mükemmeldi." - Ali R.
      
      Yanıtların kısa, öz, bilgilendirici ve en önemlisi TURİSTLERE YARDIMCI OLMALI. Eğer bir konuda kesin bilgin yoksa, bunu belirtmeli ve yanıtında bu bilgiyi içermemelisin.`
      : userType === 'institution'
      ? 'KKTC belediyesi görevlisi için bir asistansın. Kurumsal dil kullan ve prosedürler hakkında bilgi ver. Verilen rapor ve şikayetlere nasıl yaklaşılmalı konusunda tavsiyelerde bulun. Her zaman Türkçe olarak yanıtla.'
      : 'KKTC\'deki işletmeler için bir asistansın. İşletme sahiplerine rehberlik et ve turistlerle ilişkiler konusunda tavsiyelerde bulun. Her zaman Türkçe olarak yanıtla.';

    let generatedText;
    
    // If OpenAI API key is available, use it
    if (openAIApiKey) {
      try {
        // Prepare conversation history
        const messages = [
          { role: 'system', content: systemMessage },
          ...conversation.map((msg: any) => ({
            role: msg.role === 'user' ? 'user' : 'assistant', 
            content: msg.content
          })),
          { role: 'user', content: message }
        ];

        console.log("Sending to OpenAI:", JSON.stringify(messages, null, 2));
        
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openAIApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: messages,
            temperature: 0.7,
            max_tokens: 800,
          }),
        });

        const data = await response.json();
        
        if (data.choices && data.choices[0] && data.choices[0].message) {
          generatedText = data.choices[0].message.content;
          console.log("OpenAI response:", generatedText);
        } else {
          console.error('OpenAI API response format unexpected:', data);
          generatedText = "Üzgünüm, şu anda yanıt oluşturulamıyor. Lütfen daha sonra tekrar deneyin.";
        }
      } catch (openaiError) {
        console.error('OpenAI API error:', openaiError);
        generatedText = "Üzgünüm, bir hata oluştu. Lütfen daha sonra tekrar deneyin.";
      }
    } else {
      // Comprehensive fallback responses with detailed KKTC information
      const topics = {
        'plaj': 'KKTC\'de en popüler plajlar Glapsides (Gazimağusa), Altın Kumsal (Karpaz), Escape Beach ve Alagadi (Girne) plajlarıdır. Glapsides mavi bayraklı, altın kumlu ve sığ suları ile aileler için idealdir. Giriş ücretsiz, şezlong ve şemsiye kiralama 5-10 Euro. Altın Kumsal, bozulmamış doğası ve kilometrelerce uzanan altın sarısı kumuyla ünlüdür, giriş ücretsiz, temel tesisler mevcuttur. Escape Beach su sporları için uygun olup beach club hizmeti sunar, jet ski 30-50 Euro/30 dk, giriş ücreti 5-10 Euro, şezlong dahildir. Alagadi, deniz kaplumbağalarının yumurtlama alanı olarak korunan bir bölgedir ve giriş ücretsizdir.',
        
        'müze': 'KKTC\'deki önemli müzeler arasında Girne Kalesi\'ndeki Batık Gemi Müzesi (giriş 15TL), Mevlevi Tekke Müzesi (Lefkoşa, giriş 10TL), Gazimağusa\'daki Namık Kemal Zindanı ve Müzesi (giriş 8TL), ve St. Barnabas Manastırı (İkon ve Arkeoloji Müzesi, giriş 15TL) bulunmaktadır. Girne Kalesi\'ndeki Batık Gemi Müzesi dünyanın en eski ticaret gemisini sergiler ve mutlaka görülmelidir. Müzeler genellikle 09:00-17:00 arası açıktır ve fotoğraf çekimine izin verilir. Ziyaretçilerin yorum kartlarında özellikle Batık Gemi Müzesi\'nin etkileyici olduğu belirtilmiştir.',
        
        'yemek': 'KKTC mutfağında hellim (5-15 Euro), şeftali kebabı (8-12 Euro porsiyon), molehiya (10-15 Euro) ve kolokas (8-12 Euro) öne çıkar. Girne\'deki Niazi\'s Restaurant\'ta şeftali kebabı (kişi başı 15-25 Euro), Lefkoşa\'daki Hamur Restaurant\'ta molehiya (kişi başı 20-35 Euro), Girne\'deki The Stone Castle\'da deniz ürünleri (kişi başı 25-40 Euro) tadabilirsiniz. Hellim peyniri, hem taze hem de ızgara olarak servis edilir ve kahvaltıların vazgeçilmezidir. Şeftali kebabı, isminin aksine şeftaliden değil, koyun bağırsağına sarılmış köfteden yapılır. Restoran rezervasyonları için 1-2 gün önceden aramak önerilir. Niazi\'s Restaurant: +90 392 815 20 80, Hamur Restaurant: +90 392 229 33 27, The Stone Castle: +90 392 815 73 73.',
        
        'hava': 'KKTC\'de Akdeniz iklimi hakimdir. Yazlar sıcak ve kurak (Haziran-Eylül arası ortalama 30-35°C), kışlar ılık ve yağışlı geçer (Aralık-Şubat arası ortalama 10-15°C). En yağışlı aylar Aralık ve Ocak\'tır. Yaz aylarında nem oranı %60-80 arasındadır ve UV indeksi yüksektir, güneş kremi kullanılması önerilir. En ideal ziyaret zamanı Nisan-Mayıs veya Eylül-Ekim aylarıdır, bu dönemlerde sıcaklık 20-25°C civarında seyreder, turist yoğunluğu daha azdır ve fiyatlar daha uygundur.',
        
        'ulaşım': 'KKTC\'ye ulaşım genellikle Türkiye üzerinden yapılır. Ercan Havalimanı\'na İstanbul, Ankara, İzmir ve diğer büyük şehirlerden direkt uçuşlar mevcuttur (bilet fiyatları sezona göre 800-2000TL arası). Ada içinde şehirler arası otobüsler saatte bir kalkar ve bilet fiyatları 5-10 Euro arasıdır. Lefkoşa-Girne arası 40 dakika sürer. Taksi ücretleri şehir içi 10-15 Euro, şehirlerarası 30-60 Euro civarındadır. Havaalanı-Girne arası yaklaşık 45-60 Euro\'dur. Araç kiralama günlük 30-70 Euro arasında değişir ve uluslararası ehliyet gerektirir. Akaryakıt fiyatları Türkiye\'den biraz daha yüksektir. Minibüsler yerel halkın kullandığı, daha uygun fiyatlı bir alternatiftir (3-5 Euro), ancak düzenli sefer saatleri yoktur.',
        
        'para': 'KKTC\'de resmi para birimi Türk Lirası\'dır (TL). Büyük oteller, restoranlar ve turistik mekanlar genellikle Euro ve İngiliz Sterlini de kabul eder. Döviz kurları için güncel bilgiyi KKTC Merkez Bankası\'ndan alabilirsiniz. Ada genelinde ATM\'ler yaygındır ve uluslararası kredi kartları (Visa, Mastercard) çoğu yerde geçerlidir. Turistik bölgelerde döviz büroları bulunur ve commission oranları %1-3 arasında değişir. Küçük işletmeler ve pazarlar genellikle sadece TL kabul eder. Yanınızda hem TL hem de Euro bulundurmanız önerilir.',
        
        'konaklama': 'KKTC\'de her bütçeye uygun konaklama seçenekleri bulunur. Girne\'deki 5 yıldızlı Merit Crystal Cove otel gecelik 150-250 Euro, Acapulco Resort 120-220 Euro, Colony Hotel 100-180 Euro fiyat aralığındadır. Gazimağusa\'daki Salamis Bay Conti 5 yıldızlı, gecelik 110-200 Euro, antik Salamis\'e yakındır. Butik oteller ise Girne\'deki The Arkin Colony (90-160 Euro) gibi 4 yıldızlı hizmet sunar. Daha ekonomik seçenekler için Lefkoşa\'da pansiyonlar (30-60 Euro) mevcuttur. Yüksek sezonda (Haziran-Ağustos) fiyatlar %30-50 artabilir, erken rezervasyon önerilir. Rezervasyon için Merit Crystal Cove: +90 392 650 02 00, Acapulco Resort: +90 392 650 28 00, Colony Hotel: +90 392 815 24 50.',
        
        'durak': 'KKTC\'de üç ana otobüs terminali bulunmaktadır. Lefkoşa Terminal merkezi konumda olup Girne, Gazimağusa ve Güzelyurt\'a seferler düzenler. Seferler her saat başı 07:00-22:00 arası, Cuma-Cumartesi günleri 07:00-00:00 arası gerçekleşir. Bekleme salonu, kafeterya, ATM ve WiFi gibi imkanlar mevcuttur. Girne Terminal\'den Lefkoşa, Lapta ve Karşıyaka\'ya seferler her saat başı 07:00-21:00 arası, hafta sonu 08:00-22:00 arası yapılır. Bilet gişesi, bekleme alanı ve restoran bulunur. Gazimağusa Terminal\'den Lefkoşa, İskele ve Yeniboğaziçi\'ne seferler her yarım saatte 06:30-20:30 arası, Pazar günleri 08:00-20:00 arası düzenlenir. Bilet ofisi, kiosk ve market mevcuttur.',
        
        'rezervasyon': 'KKTC\'de tatil planı yaparken rezervasyonlarınızı önceden yapmanız önerilir. Oteller için yüksek sezonda (Haziran-Ağustos) en az 1-2 ay önceden rezervasyon yapılması gerekir. Online seyahat platformları veya otellerin kendi web siteleri kullanılabilir. Turlar için ada turu (30-50 Euro/kişi), tekne turu (40-60 Euro/kişi), doğa yürüyüşü (20-30 Euro/kişi) gibi seçenekler mevcuttur. Çoğu tur şirketi ve otel rezervasyon kabul eder. Araç kiralama için havaalanında veya şehir merkezlerinde birçok firma bulunur. Yüksek sezonda 1 hafta önceden rezervasyon yapılması, uluslararası ehliyet ve kredi kartı bulundurulması gerekir. Popüler restoranlarda özellikle akşam yemekleri için 1-2 gün önceden rezervasyon yapılması tavsiye edilir. Telefon veya online rezervasyon kabul eden yerler vardır.',
        
        'görüş': 'KKTC\'yi ziyaret eden turistler genellikle olumlu deneyimlerini paylaşıyor. Mehmet K.: "Bellapais Manastırı harika bir yer. Rehberimiz çok bilgiliydi ve bölgenin tarihi hakkında detaylı bilgi verdi." Ayşe T.: "Salamis antik kenti görülmeye değer. Yalnız yazın şapka ve su almayı unutmayın, çok sıcak oluyor." Can B.: "Girne Kalesi ve Batık Gemi Müzesi muhteşemdi. Giriş ücreti 15TL ve kesinlikle değer." Zeynep A.: "Altın Kumsal plajı güzel ama hafta sonları çok kalabalık oluyor. Hafta içi gitmenizi öneririm." Ali R.: "Merit Royal otelinde kaldık. Biraz pahalı ama hizmet kalitesi çok yüksek. Havuz ve plaj alanları mükemmeldi." Bu değerlendirmeler 2023 yılı ziyaretlerine aittir.',
        
        'festival': 'KKTC\'de yıl boyunca çeşitli festivaller düzenlenir. Bunlar arasında Uluslararası Bellapais Müzik Festivali (Haziran, Bellapais Manastırı\'nda klasik müzik konserleri, biletler 15-40 Euro arası), Girne Festivali (Temmuz, konserler ve kültürel etkinlikler, çoğu etkinlik ücretsiz), Güzelyurt Portakal Festivali (Haziran, narenciye ürünleri sergileri ve konserler, giriş genellikle ücretsiz) ve Zeytin Festivali (Ekim, zeytinyağı ürünleri ve yerel yemek stantları, giriş ücretsiz) en popüler olanlardır. Bu festivaller sırasında konaklama fiyatları %20-30 artabilir, erken rezervasyon önerilir. Festival konser biletleri genellikle 10-30 Euro arasındadır ve çoğu açık hava etkinliği ücretsiz izlenebilir.',
        
        'otel': 'KKTC\'de farklı bütçelere uygun konaklama seçenekleri mevcuttur. Girne\'de 5 yıldızlı Merit Crystal Cove (gecelik 150-250 Euro, +90 392 650 02 00), Acapulco Resort (120-220 Euro, +90 392 650 28 00), Colony Hotel (100-180 Euro, +90 392 815 24 50); Gazimağusa\'da Salamis Bay Conti (110-200 Euro, +90 392 378 82 00); butik otel olarak Girne\'de The Arkin Colony (90-160 Euro, +90 392 815 15 00) önerilir. Daha ekonomik seçenekler için Lefkoşa\'da pansiyonlar (30-60 Euro) tercih edilebilir. Yüksek sezonda (Haziran-Ağustos) fiyatlar %30-50 oranında artabilir. Odaların çoğunda klima, wifi ve özel banyo bulunur. Rezervasyon için en az 1-2 ay önceden iletişime geçilmesi, otelin web sitesi veya online platformların kullanılması önerilir. Ziyaretçiler özellikle deniz manzaralı odaları tercih etmektedir.'
      };
      
      // Improved keyword matching for more natural responses
      let matched = false;
      for (const [keyword, response] of Object.entries(topics)) {
        if (message.toLowerCase().includes(keyword)) {
          generatedText = response;
          matched = true;
          break;
        }
      }
      
      // More helpful default response
      if (!matched) {
        generatedText = "KKTC (Kuzey Kıbrıs Türk Cumhuriyeti), Akdeniz'in kuzeydoğusunda yer alan güzel bir ada ülkesidir. Lefkoşa (başkent), Girne, Gazimağusa ve Güzelyurt en önemli şehirleridir. Ada, yaz aylarında 30-35°C sıcaklıkta, kışları ise 10-15°C civarında seyreden Akdeniz iklimine sahiptir. Para birimi Türk Lirası olmakla birlikte turistik bölgelerde Euro da geçerlidir. Ada'ya ulaşım genellikle Türkiye üzerinden Ercan Havalimanı'na yapılır, bilet fiyatları 800-2000TL arasında değişir. Otobüs terminalleri Lefkoşa, Girne ve Gazimağusa'da bulunur, şehirlerarası ulaşım 5-10 Euro'dur. Konaklama için Girne'de 5 yıldızlı Merit Crystal Cove (150-250 Euro/gece) veya daha ekonomik Colony Hotel (100-180 Euro/gece) tercih edilebilir. Kıbrıs mutfağının öne çıkan lezzetleri hellim peyniri (5-15 Euro) ve şeftali kebabıdır (8-12 Euro/porsiyon). Tur, otel ve restoran rezervasyonlarını önceden yapmanız tavsiye edilir. Hangi konuda daha detaylı bilgi almak istersiniz? Plajlar, tarihi yerler, konaklama seçenekleri veya restoran önerileri hakkında size yardımcı olabilirim.";
      }
    }

    // Konsola log ekle
    console.log(`[CHAT-AI] User (${userType}) message: ${message}`);
    console.log(`[CHAT-AI] Response: ${generatedText.substring(0, 100)}...`);

    return new Response(JSON.stringify({ generatedText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat-ai function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      generatedText: "Üzgünüm, bir hata oluştu. Lütfen daha sonra tekrar deneyin." 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
