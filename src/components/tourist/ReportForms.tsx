
import { useState, useRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AlertTriangle, DollarSign, Building, Upload, Mic, MicOff, X } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

// Extended schemas with photo field
const priceReportSchema = z.object({
  business_name: z.string().min(2, { message: "İşletme adı en az 2 karakter olmalıdır" }),
  product_name: z.string().min(2, { message: "Ürün adı en az 2 karakter olmalıdır" }),
  paid_price: z.coerce.number().positive({ message: "Ödenen fiyat sıfırdan büyük olmalıdır" }),
  normal_price: z.coerce.number().positive({ message: "Normal fiyat sıfırdan büyük olmalıdır" }),
  location: z.string().min(2, { message: "Konum en az 2 karakter olmalıdır" }),
  description: z.string().min(10, { message: "Açıklama en az 10 karakter olmalıdır" }),
  photo: z.instanceof(File).optional().nullable(),
});

const fraudReportSchema = z.object({
  location: z.string().min(2, { message: "Konum en az 2 karakter olmalıdır" }),
  description: z.string().min(10, { message: "Açıklama en az 10 karakter olmalıdır" }),
  photo: z.instanceof(File).optional().nullable(),
});

const emergencyReportSchema = z.object({
  location: z.string().min(2, { message: "Konum en az 2 karakter olmalıdır" }),
  description: z.string().min(10, { message: "Açıklama en az 10 karakter olmalıdır" }),
  photo: z.instanceof(File).optional().nullable(),
});

interface ReportFormProps {
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
  isRecording: boolean;
  setIsRecording: (isRecording: boolean) => void;
  setAudioData: (audioData: Blob | null) => void;
  audioData: Blob | null;
}

// Audio Recording Hook
const useAudioRecording = (
  isRecording: boolean, 
  setIsRecording: (state: boolean) => void,
  setAudioData: (data: Blob | null) => void
) => {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  useEffect(() => {
    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
    
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    };
  }, [isRecording]);

  const startRecording = async () => {
    chunksRef.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      mediaRecorderRef.current.addEventListener('dataavailable', (e) => {
        chunksRef.current.push(e.data);
      });
      
      mediaRecorderRef.current.addEventListener('stop', () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioData(audioBlob);
        
        // Stop all tracks from the stream
        stream.getTracks().forEach(track => track.stop());
      });
      
      mediaRecorderRef.current.start();
    } catch (error) {
      console.error('Error starting recording:', error);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  };

  const resetRecording = () => {
    setAudioData(null);
  };

  return { resetRecording };
};

// Photo Preview Component
const PhotoPreview = ({ file, onRemove }: { file: File, onRemove: () => void }) => {
  const [preview, setPreview] = useState<string | null>(null);
  
  useEffect(() => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, [file]);
  
  return (
    <div className="relative inline-block">
      {preview && (
        <>
          <img src={preview} alt="Preview" className="h-20 rounded border object-cover" />
          <button 
            type="button"
            onClick={onRemove}
            className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white"
          >
            <X className="h-3 w-3" />
          </button>
        </>
      )}
    </div>
  );
};

// Audio Recording Controls
const AudioRecordingControls = ({ 
  isRecording, 
  setIsRecording, 
  audioData, 
  resetRecording 
}: { 
  isRecording: boolean, 
  setIsRecording: (state: boolean) => void, 
  audioData: Blob | null,
  resetRecording: () => void
}) => {
  return (
    <div className="mt-4">
      <div className="flex items-center gap-4">
        <Button 
          type="button" 
          variant={isRecording ? "destructive" : "outline"}
          onClick={() => setIsRecording(!isRecording)}
          className="flex items-center gap-2"
        >
          {isRecording ? (
            <>
              <MicOff className="h-4 w-4" /> Kaydı Durdur
            </>
          ) : (
            <>
              <Mic className="h-4 w-4" /> Sesli Anlat
            </>
          )}
        </Button>
        
        {isRecording && <span className="text-sm text-red-500 animate-pulse">Kayıt yapılıyor...</span>}
        
        {audioData && !isRecording && (
          <div className="flex items-center gap-2">
            <audio controls>
              <source src={URL.createObjectURL(audioData)} type="audio/webm" />
              Tarayıcınız audio etiketini desteklemiyor.
            </audio>
            <Button 
              type="button" 
              variant="ghost" 
              size="sm"
              onClick={resetRecording}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

// Price Report Form Component
export const PriceReportForm = ({ 
  onSubmit, 
  isSubmitting,
  isRecording,
  setIsRecording,
  setAudioData,
  audioData
}: ReportFormProps) => {
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const { resetRecording } = useAudioRecording(isRecording, setIsRecording, setAudioData);
  
  const form = useForm<z.infer<typeof priceReportSchema>>({
    resolver: zodResolver(priceReportSchema),
    defaultValues: {
      business_name: "",
      product_name: "",
      paid_price: 0,
      normal_price: 0,
      location: "",
      description: "",
      photo: null
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setPhotoFile(files[0]);
      form.setValue('photo', files[0]);
    }
  };

  const handleSubmit = (data: z.infer<typeof priceReportSchema>) => {
    onSubmit(data);
    if (!isSubmitting) {
      form.reset();
      setPhotoFile(null);
      resetRecording();
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
                    <Input placeholder="Örn: Girne, KKTC" {...field} />
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
            
            {/* Photo Upload */}
            <FormField
              control={form.control}
              name="photo"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Fotoğraf (İsteğe Bağlı)</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Input 
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        {...field}
                        className="cursor-pointer file:cursor-pointer"
                      />
                      {photoFile && (
                        <PhotoPreview 
                          file={photoFile} 
                          onRemove={() => {
                            setPhotoFile(null);
                            form.setValue('photo', null);
                          }} 
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Audio Recording Controls */}
            <AudioRecordingControls 
              isRecording={isRecording}
              setIsRecording={setIsRecording}
              audioData={audioData}
              resetRecording={resetRecording}
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
  isSubmitting,
  isRecording,
  setIsRecording,
  setAudioData,
  audioData
}: ReportFormProps) => {
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const { resetRecording } = useAudioRecording(isRecording, setIsRecording, setAudioData);
  
  const form = useForm<z.infer<typeof fraudReportSchema>>({
    resolver: zodResolver(fraudReportSchema),
    defaultValues: {
      location: "",
      description: "",
      photo: null
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setPhotoFile(files[0]);
      form.setValue('photo', files[0]);
    }
  };

  const handleSubmit = (data: z.infer<typeof fraudReportSchema>) => {
    onSubmit(data);
    if (!isSubmitting) {
      form.reset();
      setPhotoFile(null);
      resetRecording();
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
                    <Input placeholder="Örn: Girne, KKTC" {...field} />
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
            
            {/* Photo Upload */}
            <FormField
              control={form.control}
              name="photo"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Fotoğraf (İsteğe Bağlı)</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Input 
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        {...field}
                        className="cursor-pointer file:cursor-pointer"
                      />
                      {photoFile && (
                        <PhotoPreview 
                          file={photoFile} 
                          onRemove={() => {
                            setPhotoFile(null);
                            form.setValue('photo', null);
                          }} 
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Audio Recording Controls */}
            <AudioRecordingControls 
              isRecording={isRecording}
              setIsRecording={setIsRecording}
              audioData={audioData}
              resetRecording={resetRecording}
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
  isSubmitting,
  isRecording,
  setIsRecording,
  setAudioData,
  audioData
}: ReportFormProps) => {
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const { resetRecording } = useAudioRecording(isRecording, setIsRecording, setAudioData);
  
  const form = useForm<z.infer<typeof emergencyReportSchema>>({
    resolver: zodResolver(emergencyReportSchema),
    defaultValues: {
      location: "",
      description: "",
      photo: null
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setPhotoFile(files[0]);
      form.setValue('photo', files[0]);
    }
  };

  const handleSubmit = (data: z.infer<typeof emergencyReportSchema>) => {
    onSubmit(data);
    if (!isSubmitting) {
      form.reset();
      setPhotoFile(null);
      resetRecording();
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
                    <Input placeholder="Örn: Girne, KKTC" {...field} />
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
            
            {/* Photo Upload */}
            <FormField
              control={form.control}
              name="photo"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Fotoğraf (İsteğe Bağlı)</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Input 
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        {...field}
                        className="cursor-pointer file:cursor-pointer"
                      />
                      {photoFile && (
                        <PhotoPreview 
                          file={photoFile} 
                          onRemove={() => {
                            setPhotoFile(null);
                            form.setValue('photo', null);
                          }} 
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Audio Recording Controls */}
            <AudioRecordingControls 
              isRecording={isRecording}
              setIsRecording={setIsRecording}
              audioData={audioData}
              resetRecording={resetRecording}
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
