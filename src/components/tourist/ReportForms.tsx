
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AlertTriangle, DollarSign, Building } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Price Report Form Schema
const priceReportSchema = z.object({
  business_name: z.string().min(2, { message: "İşletme adı en az 2 karakter olmalıdır" }),
  product_name: z.string().min(2, { message: "Ürün adı en az 2 karakter olmalıdır" }),
  paid_price: z.coerce.number().positive({ message: "Ödenen fiyat sıfırdan büyük olmalıdır" }),
  normal_price: z.coerce.number().positive({ message: "Normal fiyat sıfırdan büyük olmalıdır" }),
  location: z.string().min(2, { message: "Konum en az 2 karakter olmalıdır" }),
  description: z.string().min(10, { message: "Açıklama en az 10 karakter olmalıdır" })
});

// Fraud Report Form Schema
const fraudReportSchema = z.object({
  location: z.string().min(2, { message: "Konum en az 2 karakter olmalıdır" }),
  description: z.string().min(10, { message: "Açıklama en az 10 karakter olmalıdır" })
});

// Emergency Report Form Schema
const emergencyReportSchema = z.object({
  location: z.string().min(2, { message: "Konum en az 2 karakter olmalıdır" }),
  description: z.string().min(10, { message: "Açıklama en az 10 karakter olmalıdır" })
});

// Price Report Form Component
export const PriceReportForm = ({ 
  onSubmit, 
  isSubmitting 
}: { 
  onSubmit: (data: z.infer<typeof priceReportSchema>) => void;
  isSubmitting: boolean;
}) => {
  const form = useForm<z.infer<typeof priceReportSchema>>({
    resolver: zodResolver(priceReportSchema),
    defaultValues: {
      business_name: "",
      product_name: "",
      paid_price: 0,
      normal_price: 0,
      location: "",
      description: ""
    }
  });

  const handleSubmit = (data: z.infer<typeof priceReportSchema>) => {
    onSubmit(data);
    if (!isSubmitting) {
      form.reset();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-orange-500" />
          Fahiş Fiyat Bildir
        </CardTitle>
        <CardDescription>
          Fahiş fiyatla karşılaştığınız durumları bildirin
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="business_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>İşletme Adı</FormLabel>
                    <FormControl>
                      <Input placeholder="Örn: ABC Restoran" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="product_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ürün/Hizmet Adı</FormLabel>
                    <FormControl>
                      <Input placeholder="Örn: Su, Taksi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="paid_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ödenen Fiyat (₺)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="normal_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Normal Fiyat (₺)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Konum</FormLabel>
                  <FormControl>
                    <Input placeholder="Örn: Konyaaltı, Antalya" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Açıklama</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Lütfen durumu detaylı bir şekilde açıklayın"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Gönderiliyor..." : "Bildir"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

// Fraud Report Form Component
export const FraudReportForm = ({ 
  onSubmit, 
  isSubmitting 
}: { 
  onSubmit: (data: z.infer<typeof fraudReportSchema>) => void;
  isSubmitting: boolean;
}) => {
  const form = useForm<z.infer<typeof fraudReportSchema>>({
    resolver: zodResolver(fraudReportSchema),
    defaultValues: {
      location: "",
      description: ""
    }
  });

  const handleSubmit = (data: z.infer<typeof fraudReportSchema>) => {
    onSubmit(data);
    if (!isSubmitting) {
      form.reset();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          Dolandırıcılık Bildir
        </CardTitle>
        <CardDescription>
          Dolandırıcılık vakalarını bildirin
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Konum</FormLabel>
                  <FormControl>
                    <Input placeholder="Örn: Kaleiçi, Antalya" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Açıklama</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Lütfen dolandırıcılık olayını detaylı bir şekilde açıklayın"
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Gönderiliyor..." : "Bildir"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

// Emergency Report Form Component
export const EmergencyReportForm = ({ 
  onSubmit, 
  isSubmitting 
}: { 
  onSubmit: (data: z.infer<typeof emergencyReportSchema>) => void;
  isSubmitting: boolean;
}) => {
  const form = useForm<z.infer<typeof emergencyReportSchema>>({
    resolver: zodResolver(emergencyReportSchema),
    defaultValues: {
      location: "",
      description: ""
    }
  });

  const handleSubmit = (data: z.infer<typeof emergencyReportSchema>) => {
    onSubmit(data);
    if (!isSubmitting) {
      form.reset();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-600" />
          Acil Durum Bildir
        </CardTitle>
        <CardDescription>
          Acil durumları hızlıca yetkililere bildirin
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Konum</FormLabel>
                  <FormControl>
                    <Input placeholder="Örn: Side, Antalya" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Açıklama</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Lütfen acil durumu detaylı bir şekilde açıklayın"
                      className="min-h-[150px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full" variant="destructive" disabled={isSubmitting}>
              {isSubmitting ? "Gönderiliyor..." : "ACİL BİLDİR"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
