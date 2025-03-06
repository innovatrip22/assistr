import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, CalendarIcon, Clock, Landmark, Coffee, Utensils, Bus, Camera } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { toast } from "sonner";

type InterestType = 'tarih' | 'yemek' | 'kafe' | 'tur' | 'fotograf';

type Activity = {
  time: string;
  activity: string;
  description: string;
};

type DayPlan = {
  day: number;
  activities: Activity[];
};

type TravelPlan = {
  title: string;
  date: string;
  interests: string[];
  days: DayPlan[];
};

const TravelPlanner = () => {
  const [planDate, setPlanDate] = useState<Date | undefined>(new Date());
  const [duration, setDuration] = useState("1");
  const [interests, setInterests] = useState<string[]>([]);
  const [planGenerated, setPlanGenerated] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<TravelPlan | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const toggleInterest = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
      ? prev.filter(i => i !== interest) 
      : [...prev, interest]
    );
  };

  const generateTravelPlan = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const days = parseInt(duration);
      const plan = {
        title: `${days} Günlük KKTC Gezi Planı`,
        date: planDate ? format(planDate, 'dd MMMM yyyy', {locale: tr}) : '',
        interests: interests,
        days: Array.from({length: days}, (_, index) => ({
          day: index + 1,
          activities: [
            {
              time: '09:00',
              activity: index === 0 ? 'Girne Limanı' : index === 1 ? 'Bellapais Manastırı' : 'Salamis Harabeleri',
              description: index === 0 
                ? 'KKTC\'nin en güzel bölgelerinden biri olan Girne Limanı\'nda yürüyüş ve tarihi binalar.' 
                : index === 1 
                ? 'Gotik mimarinin en güzel örneklerinden biri olan Bellapais Manastırı\'nı ziyaret.' 
                : 'Antik dönemden kalma muhteşem Salamis Harabeleri\'ni keşfetme.'
            },
            {
              time: '12:30',
              activity: 'Öğle Yemeği',
              description: index === 0 
                ? 'Girne Limanı\'ndaki otantik bir restoranda yerel KKTC lezzetleri.' 
                : index === 1 
                ? 'Bellapais bölgesindeki tarihi bir restoranda geleneksel yemekler.' 
                : 'Salamis çevresindeki bir restoranda taze balık keyfi.'
            },
            {
              time: '14:00',
              activity: index === 0 ? 'St. Hilarion Kalesi' : index === 1 ? 'Karpaz Milli Parkı' : 'Gazimağusa Surları',
              description: index === 0 
                ? 'Eşsiz manzarası ile St. Hilarion Kalesi\'ni ziyaret ve fotoğraf çekimi.' 
                : index === 1 
                ? 'Muhteşem Karpaz Milli Parkı\'nda doğa yürüyüşü ve yabani eşekleri gözlemleme.' 
                : 'Venedikliler tarafından inşa edilen tarihi Gazimağusa Surları\'nı keşfetme.'
            },
            {
              time: '17:00',
              activity: index === 0 ? 'Girne Kalesi' : index === 1 ? 'Apostolos Andreas Manastırı' : 'Namık Kemal Zindanı',
              description: index === 0 
                ? 'Tarihi Girne Kalesi\'ni ve içindeki Batık Gemi Müzesi\'ni ziyaret.' 
                : index === 1 
                ? 'Karpaz Yarımadası\'nın ucundaki önemli dini merkez Apostolos Andreas Manastırı\'nı ziyaret.' 
                : 'Tarihi öneme sahip Namık Kemal Zindanı ve Gazimağusa\'nın tarihi merkezini keşfetme.'
            },
            {
              time: '20:00',
              activity: 'Akşam Yemeği',
              description: index === 0 
                ? 'Girne\'de deniz manzaralı bir restoranda hellim ve şeftali kebabı tadımı.' 
                : index === 1 
                ? 'Yerel bir restoranda KKTC mutfağının özel lezzetleri molehiya ve kolakas.' 
                : 'Gazimağusa\'da tarihi bir mekanda geleneksel Kıbrıs mezelerini tatma.'
            }
          ]
        }))
      };
      
      setGeneratedPlan(plan);
      setPlanGenerated(true);
      setIsGenerating(false);
      toast.success("Gezi planınız oluşturuldu!");
    }, 2000);
  };

  return (
    <div className="space-y-4">
      {!planGenerated ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Tarih Seçin</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {planDate ? format(planDate, 'PPP', { locale: tr }) : 'Tarih seçin'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={planDate}
                      onSelect={setPlanDate}
                      locale={tr}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Gezi Süresi (Gün)</label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                >
                  <option value="1">1 Gün</option>
                  <option value="2">2 Gün</option>
                  <option value="3">3 Gün</option>
                  <option value="4">4 Gün</option>
                  <option value="5">5 Gün</option>
                  <option value="7">7 Gün</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">İlgi Alanlarınız</label>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  variant={interests.includes('tarih') ? "default" : "outline"} 
                  onClick={() => toggleInterest('tarih')}
                  className="justify-start"
                >
                  <Landmark className="mr-2 h-4 w-4" />
                  Tarih & Kültür
                </Button>
                <Button 
                  variant={interests.includes('yemek') ? "default" : "outline"} 
                  onClick={() => toggleInterest('yemek')}
                  className="justify-start"
                >
                  <Utensils className="mr-2 h-4 w-4" />
                  Yeme & İçme
                </Button>
                <Button 
                  variant={interests.includes('kafe') ? "default" : "outline"} 
                  onClick={() => toggleInterest('kafe')}
                  className="justify-start"
                >
                  <Coffee className="mr-2 h-4 w-4" />
                  Kafeler
                </Button>
                <Button 
                  variant={interests.includes('tur') ? "default" : "outline"} 
                  onClick={() => toggleInterest('tur')}
                  className="justify-start"
                >
                  <Bus className="mr-2 h-4 w-4" />
                  Turlar
                </Button>
                <Button 
                  variant={interests.includes('fotograf') ? "default" : "outline"} 
                  onClick={() => toggleInterest('fotograf')}
                  className="justify-start"
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Fotoğraf Noktaları
                </Button>
              </div>
            </div>
          </div>
          
          <Button 
            className="w-full" 
            onClick={generateTravelPlan} 
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Plan Oluşturuluyor...
              </>
            ) : 'Gezi Planı Oluştur'}
          </Button>
        </>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-primary">{generatedPlan?.title}</h3>
            <Button variant="outline" size="sm" onClick={() => setPlanGenerated(false)}>
              Yeni Plan
            </Button>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarIcon className="h-4 w-4" />
            <span>Başlangıç: {generatedPlan?.date}</span>
            <Clock className="ml-2 h-4 w-4" />
            <span>Süre: {duration} gün</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {generatedPlan?.interests.map((interest: string) => (
              <div key={interest} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                {interest}
              </div>
            ))}
          </div>
          
          <ScrollArea className="h-[400px]">
            <div className="space-y-6">
              {generatedPlan?.days.map((day: DayPlan) => (
                <Card key={day.day}>
                  <CardHeader className="pb-2">
                    <CardTitle>Gün {day.day}</CardTitle>
                    <CardDescription>
                      {planDate ? format(
                        new Date(new Date(planDate).setDate(new Date(planDate).getDate() + day.day - 1)), 
                        'dd MMMM yyyy, EEEE', 
                        {locale: tr}
                      ) : ''}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {day.activities.map((activity, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="w-16 font-medium text-right">{activity.time}</div>
                          <div className="flex-1">
                            <div className="font-medium">{activity.activity}</div>
                            <div className="text-sm text-muted-foreground">{activity.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default TravelPlanner;
