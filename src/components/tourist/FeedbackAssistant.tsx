
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { addFeedback } from "@/services";
import { v4 as uuidv4 } from "uuid";

const feedbackSchema = z.object({
  institution: z.string().min(2, { message: "Kurum adı en az 2 karakter olmalıdır" }),
  subject: z.string().min(2, { message: "Konu en az 2 karakter olmalıdır" }),
  message: z.string().min(10, { message: "Mesaj en az 10 karakter olmalıdır" }),
  rating: z.string(),
  type: z.enum(["complaint", "suggestion", "praise"]),
});

const FeedbackAssistant = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof feedbackSchema>>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      institution: "",
      subject: "",
      message: "",
      rating: "5",
      type: "complaint",
    },
  });

  const onSubmit = async (values: z.infer<typeof feedbackSchema>) => {
    setIsSubmitting(true);
    try {
      // Generate a random UUID if the user is using test login
      const userId = user?.id === 'test-user' ? uuidv4() : (user?.id || 'anonymous');

      await addFeedback({
        type: values.type as "chat" | "complaint" | "suggestion" | "praise",
        message: values.message,
        institution: values.institution,
        subject: values.subject,
        user_id: userId,
        rating: parseInt(values.rating)
      });
      
      toast({
        title: "Geri Bildirim Gönderildi",
        description: "Geri bildiriminiz başarıyla gönderildi.",
      });
      
      form.reset();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Geri bildirim gönderilirken hata oluştu",
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-primary" />
          Geri Bildirim Gönder
        </CardTitle>
        <CardDescription>
          Hizmetler ve kurumlar hakkında geri bildirimlerinizi paylaşın
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="institution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kurum/Hizmet</FormLabel>
                  <FormControl>
                    <Input placeholder="Örn: Belediye, Müze, Sahil" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Konu</FormLabel>
                  <FormControl>
                    <Input placeholder="Geri bildirim konusu" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bildirim Türü</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Bildirim türünü seçin" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="complaint">Şikayet</SelectItem>
                      <SelectItem value="suggestion">Öneri</SelectItem>
                      <SelectItem value="praise">Teşekkür/Takdir</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Değerlendirme</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Değerlendirme puanı seçin" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1 - Çok Kötü</SelectItem>
                      <SelectItem value="2">2 - Kötü</SelectItem>
                      <SelectItem value="3">3 - Orta</SelectItem>
                      <SelectItem value="4">4 - İyi</SelectItem>
                      <SelectItem value="5">5 - Çok İyi</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mesaj</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Lütfen geri bildiriminizi detaylı bir şekilde yazın"
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Gönderiliyor..." : "Geri Bildirim Gönder"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default FeedbackAssistant;
