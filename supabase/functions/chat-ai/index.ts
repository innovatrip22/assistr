
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

    // Enhanced system message based on user type with more detailed context
    const systemMessage = userType === 'tourist' 
      ? `KKTC turizm asistanısın. Turistlere nazik ve yardımcı bir şekilde bilgi vermelisin. 
      Sadece KKTC bölgesi hakkında bilgi verebilirsin. Her zaman Türkçe olarak yanıtla.
      
      Bilgi verebileceğin konular:
      - KKTC'deki turistik yerler (Lefkoşa, Girne, Gazimağusa, Güzelyurt vs.)
      - Plajlar ve deniz aktiviteleri
      - Oteller ve konaklama seçenekleri
      - Yerel mutfak ve restoranlar
      - Ulaşım seçenekleri
      - Etkinlikler ve festivaller
      - Alışveriş imkanları
      - Tarihi ve kültürel bilgiler
      
      Yanıtların kısa, öz ve bilgilendirici olmalı. Eğer bir konuda kesin bilgin yoksa, bunu belirtmelisin.`
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
      // Improved fallback responses with more detailed KKTC information
      const topics = {
        'plaj': 'KKTC\'de en popüler plajlar Altın Kum, Glapsides ve Alagadi plajlarıdır. Kristal berraklığındaki suları ve altın kumları ile ünlüdür. Özellikle Alagadi, deniz kaplumbağalarının yumurtlama alanı olarak önemlidir.',
        'müze': 'KKTC\'deki önemli müzeler arasında Mevlevi Tekke Müzesi, St. Barnabas Manastırı ve Girne Kalesi bulunmaktadır. Girne Kalesi\'ndeki Batık Gemi Müzesi dünyanın en eski batık gemisini sergiler ve mutlaka görülmelidir.',
        'yemek': 'KKTC mutfağında hellim, şeftali kebabı, molehiya ve kolokas öne çıkar. Hellim peyniri, hem taze hem de ızgara olarak servis edilir ve oldukça lezzetlidir. Şeftali kebabı ise isminin aksine şeftaliden değil, koyun bağırsağına sarılmış köfteden yapılır.',
        'hava': 'KKTC\'de Akdeniz iklimi hakimdir. Yazlar sıcak ve kurak (Haziran-Eylül arası 30-35°C), kışlar ılık ve yağışlı geçer (Aralık-Şubat arası 10-15°C). En iyi ziyaret zamanı Nisan-Mayıs veya Eylül-Ekim aylarıdır.',
        'ulaşım': 'KKTC\'ye ulaşım genellikle Türkiye üzerinden yapılır. Ercan Havalimanı\'na direkt uçuşlar mevcuttur. Ada içinde şehirler arası ulaşım otobüsler ile sağlanır ve araç kiralamak oldukça yaygındır. Taksi hizmetleri de yaygın olarak kullanılmaktadır.',
        'para': 'KKTC\'de resmi para birimi Türk Lirası\'dır. Büyük oteller, restoranlar ve turistik mekanlar genellikle Euro ve İngiliz Sterlini de kabul eder. Ada genelinde ATM\'ler yaygındır ve kredi kartları çoğu yerde geçerlidir.',
        'konaklama': 'KKTC\'de her bütçeye uygun konaklama seçenekleri bulunur. Girne bölgesi, lüks otelleri ve deniz manzaralı butik pansiyonlarıyla ünlüdür. Lefkoşa\'da şehir otelleri, Gazimağusa\'da ise tarihi dokuya yakın tesisler bulabilirsiniz.',
        'casino': 'KKTC, kumarhane ve casino sektöründe önemli bir merkez haline gelmiştir. Özellikle büyük otellerin içinde çok sayıda casino bulunmaktadır. Bu casinolar 24 saat hizmet vermekte ve farklı oyun seçenekleri sunmaktadır.',
        'üniversite': 'KKTC, birçok üniversiteye ev sahipliği yapmaktadır. Doğu Akdeniz Üniversitesi (DAÜ), Yakın Doğu Üniversitesi, Girne Amerikan Üniversitesi ve Lefke Avrupa Üniversitesi bunların en bilinenleridir. Bu üniversiteler uluslararası öğrenciler için popüler eğitim merkezleridir.',
        'lefkoşa': 'Lefkoşa (Nicosia), KKTC\'nin başkentidir ve halen dünyada bölünmüş tek başkenttir. Venedik surları içindeki eski şehir, tarihi çarşıları, Selimiye Camii (eski St. Sophia Katedrali) ve Büyük Han gibi tarihi yapıları ile ünlüdür.',
        'girne': 'Girne (Kyrenia), KKTC\'nin en popüler turistik şehridir. Tarihi limani, Girne Kalesi, Bellapais Manastırı ve St. Hilarion Kalesi mutlaka görülmesi gereken yerlerdir. Ayrıca şehir, lüks otelleri ve restoranlarıyla da ünlüdür.',
        'festival': 'KKTC\'de yıl boyunca çeşitli festivaller düzenlenir. Bunlar arasında Uluslararası Bellapais Müzik Festivali, Girne Festivali, Portakal Festivali ve Zeytin Festivali en popüler olanlardır. Bu festivaller yerel kültürü deneyimlemek için harika fırsatlardır.'
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
      
      if (!matched) {
        generatedText = "KKTC, Akdeniz'in kuzeydoğusunda yer alan güzel bir ada ülkesidir. Tarihi zenginlikleri, güzel plajları ve lezzetli mutfağıyla turistleri cezbeder. Lefkoşa, Girne ve Gazimağusa en önemli şehirleridir. Size KKTC hakkında hangi konuda yardımcı olabilirim?";
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
