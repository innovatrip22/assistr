
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PresentationSlide = () => {
  return (
    <Card className="max-w-4xl mx-auto shadow-lg border-blue-100">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
        <CardTitle className="text-center text-2xl font-bold">
          AssisTR: Proje Metodolojisi ve Teknik Yaklaşım
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          <p className="text-gray-700 text-lg leading-relaxed">
            AssisTR projesi, modern web teknolojileri kullanarak KKTC turizm ekosistemini dijitalleştiren 
            kapsamlı bir platformdur. Frontend tarafında React, TypeScript ve Tailwind CSS kullanılarak 
            responsive ve kullanıcı dostu arayüzler geliştirilmiştir. Backend altyapısı için Supabase 
            tercih edilmiş, bu sayede gerçek zamanlı veri iletişimi, kullanıcı yetkilendirmesi ve 
            veritabanı yönetimi tek bir platformda entegre edilmiştir. Yapay zeka entegrasyonu için 
            OpenAI API'leri kullanılarak kişiselleştirilmiş seyahat asistanı ve sohbet özellikleri 
            eklenmiştir. Sistem mimarisi üç farklı kullanıcı tipine (turist, işletme, kurum) özel 
            arayüzler sunan katmanlı yapıdadır. Turistler için seyahat planlama algoritması ve gerçek 
            zamanlı harita entegrasyonu, işletmeler için müşteri yönetimi araçları ve kurumlar için 
            veri analizi ve görselleştirme özellikleri geliştirilmiştir. Proje, Agile metodoloji ile 
            kullanıcı geri bildirimlerine dayalı iteratif bir süreçle geliştirilmiş, böylece sürekli 
            iyileştirme ve kullanıcı ihtiyaçlarına hızlı yanıt verme sağlanmıştır.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PresentationSlide;
