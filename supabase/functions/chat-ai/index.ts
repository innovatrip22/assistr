
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

    // Enhanced system message based on user type
    const systemMessage = userType === 'tourist' 
      ? 'KKTC turizm asistanısın. Turistlere nazik ve yardımcı bir şekilde bilgi vermelisin. Sadece KKTC bölgesi hakkında bilgi verebilirsin. Her zaman Türkçe olarak yanıtla.'
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
      // Improved fallback responses if no API key is available
      const topics = {
        'plaj': 'KKTC\'de en popüler plajlar Altın Kum, Glapsides ve Alagadi plajlarıdır. Kristal berraklığındaki suları ve altın kumları ile ünlüdür.',
        'müze': 'KKTC\'deki önemli müzeler arasında Mevlevi Tekke Müzesi, St. Barnabas Manastırı ve Girne Kalesi bulunmaktadır. Bu müzeler adanın zengin tarihini yansıtır.',
        'yemek': 'KKTC mutfağında hellim, şeftali kebabı, molehiya ve kolokas öne çıkar. Özellikle hellim peyniri, hem taze hem de ızgara olarak servis edilir ve çok beğenilir.',
        'hava': 'KKTC\'de yazlar sıcak ve kurak (Haziran-Eylül arası 30-35°C), kışlar ılık ve yağışlı geçer (Aralık-Şubat arası 10-15°C). En iyi ziyaret zamanı ilkbahar ve sonbahardır.',
        'ulaşım': 'KKTC\'de şehirler arası ulaşım genellikle otobüsler ile sağlanır. Ada içinde araç kiralamak da oldukça yaygındır ve turistik bölgeleri keşfetmek için ideal bir seçenektir.',
        'para': 'KKTC\'de resmi para birimi Türk Lirası\'dır. Büyük oteller ve restoranlar genellikle Euro ve İngiliz Sterlini de kabul eder.',
        'konaklama': 'KKTC\'de lüks otellerden butik pansiyonlara kadar çeşitli konaklama seçenekleri bulunur. Özellikle Girne bölgesi, deniz manzaralı otelleriyle ünlüdür.'
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
        generatedText = "KKTC, Akdeniz'in kuzeydoğusunda yer alan güzel bir ada ülkesidir. Tarihi zenginlikleri, güzel plajları ve lezzetli mutfağıyla turistleri cezbeder. Size nasıl yardımcı olabilirim?";
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
