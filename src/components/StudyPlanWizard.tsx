import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FormData {
  studentType: string;
  dailyHours: string;
  startTime: string;
  endTime: string;
  strongSubjects: string[];
  weakSubjects: string[];
}

export const StudyPlanWizard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    studentType: '',
    dailyHours: '',
    startTime: '',
    endTime: '',
    strongSubjects: [],
    weakSubjects: []
  });

  const subjects = [
    { id: 'matematik', name: 'Matematik', color: 'math' },
    { id: 'fizik', name: 'Fizik', color: 'physics' },
    { id: 'kimya', name: 'Kimya', color: 'chemistry' },
    { id: 'biyoloji', name: 'Biyoloji', color: 'biology' },
    { id: 'turkce', name: 'Türkçe', color: 'turkish' },
    { id: 'tarih', name: 'Tarih', color: 'history' },
    { id: 'cografya', name: 'Coğrafya', color: 'geography' },
  ];

  const handleSubjectToggle = (subjectId: string, type: 'strong' | 'weak') => {
    const currentArray = type === 'strong' ? formData.strongSubjects : formData.weakSubjects;
    const otherArray = type === 'strong' ? formData.weakSubjects : formData.strongSubjects;
    
    // Remove from other array if exists
    const newOtherArray = otherArray.filter(id => id !== subjectId);
    
    // Toggle in current array
    const newCurrentArray = currentArray.includes(subjectId)
      ? currentArray.filter(id => id !== subjectId)
      : [...currentArray, subjectId];

    setFormData(prev => ({
      ...prev,
      [type === 'strong' ? 'strongSubjects' : 'weakSubjects']: newCurrentArray,
      [type === 'strong' ? 'weakSubjects' : 'strongSubjects']: newOtherArray
    }));
  };

  const generatePlan = () => {
    // This would typically call an API to generate a personalized plan
    console.log('Generating plan with data:', formData);
    // For demo purposes, we'll just show a success message
    alert('Kişiselleştirilmiş çalışma planınız oluşturuluyor! 🎉');
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="studentType">Öğrenci Durumunuz</Label>
        <Select value={formData.studentType} onValueChange={(value) => setFormData(prev => ({ ...prev, studentType: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Durumunuzu seçin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ea-to-say">EA'dan SAY'a geçiş</SelectItem>
            <SelectItem value="full-say">Tam SAY öğrencisi</SelectItem>
            <SelectItem value="mezun">Mezun öğrenci</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="startTime">Çalışma Başlangıç Saati</Label>
          <Input
            id="startTime"
            type="time"
            value={formData.startTime}
            onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
          />
        </div>
        <div>
          <Label htmlFor="endTime">Çalışma Bitiş Saati</Label>
          <Input
            id="endTime"
            type="time"
            value={formData.endTime}
            onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="dailyHours">Günlük Çalışma Saati</Label>
        <Input
          id="dailyHours"
          placeholder="örn: 6 saat"
          value={formData.dailyHours}
          onChange={(e) => setFormData(prev => ({ ...prev, dailyHours: e.target.value }))}
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Güçlü Olduğunuz Dersler</h3>
        <div className="grid grid-cols-2 gap-3">
          {subjects.map(subject => (
            <div key={subject.id} className="flex items-center space-x-2">
              <Checkbox
                id={`strong-${subject.id}`}
                checked={formData.strongSubjects.includes(subject.id)}
                onCheckedChange={() => handleSubjectToggle(subject.id, 'strong')}
              />
              <Label htmlFor={`strong-${subject.id}`} className="text-sm">
                {subject.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Zayıf Olduğunuz Dersler</h3>
        <div className="grid grid-cols-2 gap-3">
          {subjects.map(subject => (
            <div key={subject.id} className="flex items-center space-x-2">
              <Checkbox
                id={`weak-${subject.id}`}
                checked={formData.weakSubjects.includes(subject.id)}
                onCheckedChange={() => handleSubjectToggle(subject.id, 'weak')}
              />
              <Label htmlFor={`weak-${subject.id}`} className="text-sm">
                {subject.name}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Card className="p-8 card-elevated max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold gradient-text mb-2">
          Kişiselleştirilmiş Çalışma Planı
        </h2>
        <p className="text-muted-foreground">
          Size özel bir çalışma planı oluşturmak için birkaç soruyu yanıtlayın.
        </p>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">
            Adım {step}/2
          </span>
          <div className="flex space-x-2">
            <div className={`w-3 h-3 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-muted'}`} />
            <div className={`w-3 h-3 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
          </div>
        </div>
      </div>

      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}

      <div className="flex justify-between mt-8">
        {step > 1 && (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            Geri
          </Button>
        )}
        
        {step < 2 ? (
          <Button 
            onClick={() => setStep(step + 1)}
            className="ml-auto bg-gradient-primary hover:opacity-90"
            disabled={!formData.studentType}
          >
            Sonraki Adım
          </Button>
        ) : (
          <Button 
            onClick={generatePlan}
            className="ml-auto bg-gradient-success hover:opacity-90"
          >
            Planımı Oluştur 🎯
          </Button>
        )}
      </div>
    </Card>
  );
};