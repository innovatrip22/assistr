
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
    const { message, userType } = await req.json();

    // Sistem mesajı kullanıcı tipine göre ayarla
    const systemMessage = userType === 'tourist' 
      ? 'Antalya turizm asistanısın. Turistlere nazik ve yardımcı bir şekilde bilgi vermelisin. Sadece Antalya bölgesi hakkında bilgi verebilirsin.'
      : userType === 'institution'
      ? 'Antalya belediyesi görevlisi için bir asistansın. Kurumsal dil kullan ve prosedürler hakkında bilgi ver. Verilen rapor ve şikayetlere nasıl yaklaşılmalı konusunda tavsiyelerde bulun.'
      : 'Antalya\'daki işletmeler için bir asistansın. İşletme sahiplerine rehberlik et ve turistlerle ilişkiler konusunda tavsiyelerde bulun.';

    let generatedText;
    
    // If OpenAI API key is available, use it
    if (openAIApiKey) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openAIApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: systemMessage },
              { role: 'user', content: message }
            ],
          }),
        });

        const data = await response.json();
        
        if (data.choices && data.choices[0] && data.choices[0].message) {
          generatedText = data.choices[0].message.content;
        } else {
          console.error('OpenAI API response format unexpected:', data);
          generatedText = "Üzgünüm, şu anda yanıt oluşturulamıyor. Lütfen daha sonra tekrar deneyin.";
        }
      } catch (openaiError) {
        console.error('OpenAI API error:', openaiError);
        generatedText = "Üzgünüm, bir hata oluştu. Lütfen daha sonra tekrar deneyin.";
      }
    } else {
      // Fallback response if no API key is available
      const topics = {
        'plaj': 'Antalya\'da en popüler plajlar Konyaaltı, Lara ve Kaputaş plajlarıdır.',
        'müze': 'Antalya Müzesi, Türkiye\'nin en büyük müzelerinden biridir.',
        'yemek': 'Antalya mutfağında piyaz, şiş köfte ve tandır kebabı öne çıkar.',
        'hava': 'Antalya\'da yazlar sıcak ve kurak, kışlar ılık ve yağışlı geçer.'
      };
      
      // Simple keyword matching for fallback responses
      let matched = false;
      for (const [keyword, response] of Object.entries(topics)) {
        if (message.toLowerCase().includes(keyword)) {
          generatedText = response;
          matched = true;
          break;
        }
      }
      
      if (!matched) {
        generatedText = "Antalya, Türkiye'nin güneyinde, Akdeniz kıyısında yer alan turistik bir şehirdir. Size nasıl yardımcı olabilirim?";
      }
    }

    // Konsola log ekle
    console.log(`[CHAT-AI] User message: ${message}`);
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
