
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
      - Lefkoşa: Venedik surları, Selimiye Camii, Büyük Han, Arasta Sokağı.
      - Girne: Tarihi liman, Girne Kalesi, Bellapais Manastırı, St. Hilarion Kalesi.
      - Gazimağusa: Suriçi, Othello Kalesi, Lala Mustafa Paşa Camii, Salamis Harabeleri.
      - Güzelyurt: Soli Harabeleri, St. Mamas Manastırı.
      - İskele: Karpaz Yarımadası, Altın Kumsal, Apostolos Andreas Manastırı.
      
      PLAJLAR:
      - Glapsides Plajı (Gazimağusa): Mavi bayraklı, altın kumlu, sığ suları ile aileler için ideal.
      - Altın Kumsal (Karpaz): Bozulmamış doğası ve altın sarısı kumuyla ünlü. 
      - Escape Beach (Girne): Su sporları aktiviteleri için uygun, beach club'ı var.
      - Alagadi Plajı (Girne): Deniz kaplumbağası yumurtlama alanı olarak ünlü.
      - Silver Beach (Girne): Şezlong ve şemsiye kiralama servisi var, giriş ücreti 5-10 Euro arası.
      
      OTELLER:
      - Merit Crystal Cove (Girne): 5 yıldızlı, gecelik 150-250 Euro, casino, spa, deniz manzaralı.
      - Acapulco Resort (Girne): 5 yıldızlı, gecelik 120-220 Euro, özel plaj, aquapark.
      - Colony Hotel (Girne): 5 yıldızlı, tarihi merkezde, gecelik 100-180 Euro.
      - Salamis Bay Conti (Gazimağusa): 5 yıldızlı, gecelik 110-200 Euro, antik Salamis'e yakın.
      - The Arkin Colony (Girne): Butik otel, gecelik 90-160 Euro, tarihi binada.
      
      RESTORANLAR:
      - Niazi's Restaurant (Girne): Geleneksel Kıbrıs kebapları, kişi başı 15-25 Euro.
      - Hamur Restaurant (Lefkoşa): Yerel ve uluslararası mutfak, kişi başı 20-35 Euro.
      - The Stone Castle (Girne): Deniz ürünleri, kişi başı 25-40 Euro, manzaralı terasa sahip.
      - Set Fish Restaurant (Girne): Premium deniz ürünleri, kişi başı 30-50 Euro.
      - Kervan Kebap (Gazimağusa): Otantik Kıbrıs kebabı, kişi başı 10-20 Euro.
      
      YÖRESEL YEMEKLER:
      - Hellim peyniri: Keçi ve koyun sütünden yapılan, ızgara veya çiğ yenebilen peynir.
      - Şeftali kebabı: Koyun bağırsağına sarılmış köfte.
      - Molehiya: Orta Doğu kökenli yeşil yapraklı bitki ile hazırlanan et yemeği.
      - Kolokas: Ada'ya özgü bir çeşit göbek ile yapılan yahni.
      - Magarina bulli: Tavuk suyu ile pişirilmiş makarna.
      
      ULAŞIM SEÇENEKLERİ:
      - Otobüsler: Şehirlerarası otobüsler saatte bir kalkar, bilet fiyatları 5-10 Euro arası.
      - Taksiler: Şehir içi 10-15 Euro, şehirlerarası 30-60 Euro arası.
      - Araç kiralama: Günlük 30-70 Euro arası, uluslararası ehliyet gerekli.
      - Minibüsler: Yerel halkın kullandığı, daha uygun fiyatlı alternatif, 3-5 Euro.
      
      KÜLTÜR VE ETKİNLİKLER:
      - Kıbrıs Tiyatro Festivali (Mayıs): Salamis antik tiyatrosunda düzenlenir.
      - Uluslararası Bellapais Müzik Festivali (Haziran): Klasik müzik konserleri.
      - Portakal Festivali (Haziran): Güzelyurt'ta düzenlenen narenciye festivali.
      - Zeytin Festivali (Ekim): Zeytinyağı ve ürünlerinin tanıtıldığı festival.
      
      ALIŞVERİŞ:
      - Lefkoşa: Arasta Sokağı, Büyük Han, Bandabuliya (kapalı pazar).
      - Girne: Carsi bölgesi, antika dükkanları.
      - Gazimağusa: Suriçi tarihi çarşı.
      - Duty-free alışveriş: Ercan Havalimanı ve sınır kapılarında.
      
      PRATİK BİLGİLER:
      - Para birimi: Türk Lirası (TL), çoğu yerde Euro da kabul edilir.
      - Dil: Resmi dil Türkçe, turistik bölgelerde İngilizce yaygın.
      - Elektrik: 240V, İngiliz tipi G priz kullanılır.
      - Vize: Türkiye üzerinden seyahat edenler için gerekmez.
      - Sağlık: Özel hastaneler kaliteli hizmet verir, seyahat sigortası önerilir.
      
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
        'plaj': 'KKTC\'de en popüler plajlar Glapsides (Gazimağusa), Altın Kumsal (Karpaz), Escape Beach ve Alagadi (Girne) plajlarıdır. Glapsides mavi bayraklı, altın kumlu ve sığ suları ile aileler için idealdir. Altın Kumsal, bozulmamış doğası ve kilometrelerce uzanan altın sarısı kumuyla ünlüdür. Escape Beach su sporları için uygun olup beach club hizmeti sunar, giriş ücreti 5-10 Euro arasıdır. Alagadi, deniz kaplumbağalarının yumurtlama alanı olarak korunan bir bölgedir ve giriş ücretsizdir.',
        
        'müze': 'KKTC\'deki önemli müzeler arasında Girne Kalesi\'ndeki Batık Gemi Müzesi (giriş 15TL), Mevlevi Tekke Müzesi (Lefkoşa, giriş 10TL), Gazimağusa\'daki Namık Kemal Zindanı ve Müzesi (giriş 8TL), ve St. Barnabas Manastırı (İkon ve Arkeoloji Müzesi, giriş 15TL) bulunmaktadır. Girne Kalesi\'ndeki Batık Gemi Müzesi dünyanın en eski ticaret gemisini sergiler ve mutlaka görülmelidir. Müzeler genellikle 09:00-17:00 arası açıktır ve fotoğraf çekimine izin verilir.',
        
        'yemek': 'KKTC mutfağında hellim, şeftali kebabı, molehiya ve kolokas öne çıkar. Girne\'deki Niazi\'s Restaurant\'ta şeftali kebabı (kişi başı 15-25 Euro), Lefkoşa\'daki Hamur Restaurant\'ta molehiya (kişi başı 20-35 Euro), Girne\'deki The Stone Castle\'da deniz ürünleri (kişi başı 25-40 Euro) tadabilirsiniz. Hellim peyniri, hem taze hem de ızgara olarak servis edilir ve kahvaltıların vazgeçilmezidir. Şeftali kebabı, isminin aksine şeftaliden değil, koyun bağırsağına sarılmış köfteden yapılır ve genellikle 10-20 Euro arası fiyatlandırılır.',
        
        'hava': 'KKTC\'de Akdeniz iklimi hakimdir. Yazlar sıcak ve kurak (Haziran-Eylül arası ortalama 30-35°C), kışlar ılık ve yağışlı geçer (Aralık-Şubat arası ortalama 10-15°C). En yağışlı aylar Aralık ve Ocak\'tır. Yaz aylarında nem oranı %60-80 arasındadır ve UV indeksi yüksektir, güneş kremi kullanılması önerilir. En ideal ziyaret zamanı Nisan-Mayıs veya Eylül-Ekim aylarıdır, bu dönemlerde sıcaklık 20-25°C civarında seyreder.',
        
        'ulaşım': 'KKTC\'ye ulaşım genellikle Türkiye üzerinden yapılır. Ercan Havalimanı\'na İstanbul, Ankara, İzmir ve diğer büyük şehirlerden direkt uçuşlar mevcuttur (bilet fiyatları sezona göre 800-2000TL arası). Ada içinde şehirler arası otobüsler saatte bir kalkar ve bilet fiyatları 5-10 Euro arasıdır. Taksi ücretleri şehir içi 10-15 Euro, şehirlerarası 30-60 Euro civarındadır. Araç kiralama günlük 30-70 Euro arasında değişir ve uluslararası ehliyet gerektirir. Minibüsler yerel halkın kullandığı, daha uygun fiyatlı bir alternatiftir (3-5 Euro).',
        
        'para': 'KKTC\'de resmi para birimi Türk Lirası\'dır (TL). Büyük oteller, restoranlar ve turistik mekanlar genellikle Euro ve İngiliz Sterlini de kabul eder. Döviz kurları için güncel bilgiyi KKTC Merkez Bankası\'ndan alabilirsiniz. Ada genelinde ATM\'ler yaygındır ve uluslararası kredi kartları (Visa, Mastercard) çoğu yerde geçerlidir. Turistik bölgelerde döviz büroları bulunur ve commission oranları %1-3 arasında değişir. Küçük işletmeler ve pazarlar genellikle sadece TL kabul eder.',
        
        'konaklama': 'KKTC\'de her bütçeye uygun konaklama seçenekleri bulunur. Girne\'deki 5 yıldızlı Merit Crystal Cove otel gecelik 150-250 Euro, Acapulco Resort 120-220 Euro, Colony Hotel 100-180 Euro fiyat aralığındadır. Gazimağusa\'daki Salamis Bay Conti 5 yıldızlı, gecelik 110-200 Euro, antik Salamis\'e yakındır. Butik oteller ise Girne\'deki The Arkin Colony (90-160 Euro) gibi 4 yıldızlı hizmet sunar. Daha ekonomik seçenekler için Lefkoşa\'da pansiyonlar (30-60 Euro) mevcuttur. Yüksek sezonda (Haziran-Ağustos) fiyatlar %30-50 artabilir, erken rezervasyon önerilir.',
        
        'casino': 'KKTC, kumarhane ve casino sektöründe önemli bir merkez haline gelmiştir. Ada genelinde 30\'dan fazla casino hizmet vermektedir. Özellikle Girne ve Lefkoşa\'daki büyük otellerin içinde bulunan casinolar 24 saat hizmet vermekte ve blackjack, rulet, poker, slot makineleri gibi farklı oyun seçenekleri sunmaktadır. Merit Royal Hotel & Casino, Cratos Premium Hotel & Casino, ve Elexus Hotel & Casino en lüks casino otellerindendir. Girişlerde pasaport kontrolü yapılır ve minimum yaş sınırı 18\'dir. Çoğu casino ücretsiz içki servisi ve casino misafirlerine özel indirimli konaklama imkanı sunar.',
        
        'üniversite': 'KKTC, 21 üniversitesiyle bir eğitim merkezi haline gelmiştir. En köklü kurumlar arasında 1979\'da kurulan Doğu Akdeniz Üniversitesi (DAÜ), 1988\'de kurulan Yakın Doğu Üniversitesi ve 1985\'te kurulan Girne Amerikan Üniversitesi bulunur. Yıllık ücretler bölüme göre 3000-10000 Euro arasında değişir. Üniversiteler genellikle Eylül ve Şubat aylarında öğrenci kabul eder. Programların çoğunda eğitim dili İngilizce\'dir. KKTC üniversiteleri Türkiye\'de YÖK tarafından tanınmakta olup, dünya genelinde 100\'den fazla ülkeden öğrenciye ev sahipliği yapmaktadır.',
        
        'lefkoşa': 'Lefkoşa (Nicosia), KKTC\'nin başkentidir ve halen dünyada bölünmüş tek başkenttir. Venedik surları içindeki eski şehirde bulunan Selimiye Camii (eski St. Sophia Katedrali, giriş ücretsiz), Büyük Han (16. yy Osmanlı kervansarayı, ücretsiz), Arasta Sokağı (alışveriş bölgesi) ve Bandabuliya (kapalı pazar) mutlaka görülmesi gereken yerlerdir. Şehir içi ulaşım için yerel otobüsler (3-5TL) veya taksiler (10-15 Euro) kullanılabilir. Lefkoşa\'nın en iyi restoranları Hamur Restaurant (kişi başı 20-35 Euro) ve Sabor Restaurant\'tır (kişi başı 15-30 Euro). Konaklama için Merit Lefkoşa Hotel (gecelik 80-130 Euro) veya Centrum Hotel (50-90 Euro) tercih edilebilir.',
        
        'girne': 'Girne (Kyrenia), KKTC\'nin en popüler turistik şehridir. Tarihi limanı, Girne Kalesi (giriş 15TL), Bellapais Manastırı (giriş 15TL) ve St. Hilarion Kalesi (giriş 15TL) mutlaka görülmesi gereken yerlerdir. Şehrin en iyi plajları Escape Beach ve Denizkızı\'dır (giriş 5-10 Euro). Girne\'de deniz ürünleri için The Stone Castle (kişi başı 25-40 Euro), geleneksel Kıbrıs mutfağı için Niazi\'s Restaurant (kişi başı 15-25 Euro) önerilir. Lüks konaklama için Merit Crystal Cove (gecelik 150-250 Euro), orta bütçe için Colony Hotel (100-180 Euro) tercih edilebilir. Şehir içi ulaşım taksi (10-15 Euro) veya dolmuşlarla (3-5TL) sağlanır.',
        
        'festival': 'KKTC\'de yıl boyunca çeşitli festivaller düzenlenir. Bunlar arasında Uluslararası Bellapais Müzik Festivali (Haziran, Bellapais Manastırı\'nda klasik müzik konserleri), Girne Festivali (Temmuz, konserler ve kültürel etkinlikler), Güzelyurt Portakal Festivali (Haziran, narenciye ürünleri sergileri ve konserler) ve Zeytin Festivali (Ekim, zeytinyağı ürünleri ve yerel yemek stantları) en popüler olanlardır. Bu festivaller sırasında konaklama fiyatları %20-30 artabilir, erken rezervasyon önerilir. Festival konser biletleri genellikle 10-30 Euro arasındadır ve çoğu açık hava etkinliği ücretsiz izlenebilir.',
        
        'gazimağusa': 'Gazimağusa (Famagusta), KKTC\'nin önemli liman ve üniversite şehridir. Suriçi bölgesindeki tarihi surlar, Othello Kalesi (Shakespeare\'in eserine ilham vermiştir, giriş 10TL), Lala Mustafa Paşa Camii (eski St. Nicholas Katedrali, giriş ücretsiz) ve hayalet şehir Maraş görülmeye değerdir. Şehrin kuzeyindeki Salamis antik kenti (giriş 15TL) Roma döneminden kalma tiyatro, hamam ve sütunlarıyla ünlüdür. Plaj olarak Glapsides tercih edilebilir (mavi bayraklı, giriş ücretsiz). Konaklama için Salamis Bay Conti Resort (gecelik 110-200 Euro) veya daha ekonomik Palm Beach Hotel (60-100 Euro) bulunmaktadır. Geleneksel yemekler için Petek Restaurant (kişi başı 15-25 Euro) önerilir.',
        
        'güzelyurt': 'Güzelyurt (Morphou), KKTC\'nin narenciye bahçeleriyle ünlü batı kıyısındaki şehridir. Bölgedeki Soli antik kenti (giriş 10TL) M.Ö. 6. yüzyıldan kalma mozaikleriyle dikkat çeker. St. Mamas Manastırı ve müzesi (giriş 10TL) 18. yüzyıldan kalma dini eserleri sergiler. Her yıl Haziran ayında düzenlenen Portakal Festivali şehrin en önemli etkinliğidir. Bölgenin meşhur ürünleri portakal, limon ve zeytinyağıdır, yerel pazardan satın alınabilir. Konaklama imkanları sınırlıdır, genellikle küçük pansiyon tipi işletmeler (gecelik 30-60 Euro) bulunur. Doğa yürüyüşleri için çevredeki Trodos Dağları idealdir.'
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
        generatedText = "KKTC (Kuzey Kıbrıs Türk Cumhuriyeti), Akdeniz'in kuzeydoğusunda yer alan güzel bir ada ülkesidir. Lefkoşa (başkent), Girne, Gazimağusa ve Güzelyurt en önemli şehirleridir. Ada, yaz aylarında 30-35°C sıcaklıkta, kışları ise 10-15°C civarında seyreden Akdeniz iklimine sahiptir. Para birimi Türk Lirası olmakla birlikte turistik bölgelerde Euro da geçerlidir. Ada'ya ulaşım genellikle Türkiye üzerinden Ercan Havalimanı'na yapılır. Kıbrıs mutfağının öne çıkan lezzetleri hellim peyniri ve şeftali kebabıdır. Hangi konuda daha detaylı bilgi almak istersiniz? Plajlar, tarihi yerler, konaklama seçenekleri veya restoran önerileri hakkında size yardımcı olabilirim.";
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
