import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const workouts = [
  {
    id: 1,
    title: 'Силовые тренировки',
    description: 'Набор мышечной массы и развитие силы',
    icon: 'Dumbbell',
    image: 'https://cdn.poehali.dev/projects/28a5ff0d-4121-405c-8ee7-2d2f6c2ea616/files/443ac909-767a-4ad4-aaba-c690c80ba6e4.jpg'
  },
  {
    id: 2,
    title: 'Групповые занятия',
    description: 'Энергичные тренировки в команде',
    icon: 'Users',
    image: 'https://cdn.poehali.dev/projects/28a5ff0d-4121-405c-8ee7-2d2f6c2ea616/files/1f817e3c-4356-43be-8851-4af2ff145573.jpg'
  },
  {
    id: 3,
    title: 'Персональные тренировки',
    description: 'Индивидуальный подход с личным тренером',
    icon: 'Target',
    image: 'https://cdn.poehali.dev/projects/28a5ff0d-4121-405c-8ee7-2d2f6c2ea616/files/f788b942-feda-4266-981a-3dfd2d86e7c0.jpg'
  }
];

const trainers = [
  { id: 1, name: 'Алексей Иванов', specialization: 'Силовые тренировки' },
  { id: 2, name: 'Мария Петрова', specialization: 'Групповые занятия' },
  { id: 3, name: 'Дмитрий Сидоров', specialization: 'Кроссфит' },
  { id: 4, name: 'Елена Смирнова', specialization: 'Йога и растяжка' }
];

const schedule = [
  { time: '08:00', workout: 'Йога', trainer: 'Елена Смирнова', spots: 3 },
  { time: '10:00', workout: 'Силовая', trainer: 'Алексей Иванов', spots: 5 },
  { time: '12:00', workout: 'Групповая', trainer: 'Мария Петрова', spots: 2 },
  { time: '14:00', workout: 'Кроссфит', trainer: 'Дмитрий Сидоров', spots: 4 },
  { time: '16:00', workout: 'Силовая', trainer: 'Алексей Иванов', spots: 6 },
  { time: '18:00', workout: 'Групповая', trainer: 'Мария Петрова', spots: 1 },
  { time: '20:00', workout: 'Йога', trainer: 'Елена Смирнова', spots: 4 }
];

export default function Index() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const { toast } = useToast();

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone || !selectedTrainer || !selectedTime) {
      toast({
        title: 'Заполните все поля',
        description: 'Пожалуйста, укажите все данные для записи',
        variant: 'destructive'
      });
      return;
    }

    toast({
      title: 'Запись успешна! 🎉',
      description: `${name}, вы записаны на ${selectedTime} к тренеру ${trainers.find(t => t.id.toString() === selectedTrainer)?.name}`
    });

    setBookingOpen(false);
    setName('');
    setPhone('');
    setSelectedTrainer('');
    setSelectedTime('');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b z-50">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-heading font-bold text-primary">FIT CLUB</h1>
          <div className="hidden md:flex gap-8">
            <a href="#home" className="hover:text-primary transition-colors">Главная</a>
            <a href="#workouts" className="hover:text-primary transition-colors">Тренировки</a>
            <a href="#schedule" className="hover:text-primary transition-colors">Расписание</a>
          </div>
          <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="font-semibold">
                Записаться
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="font-heading text-2xl">Онлайн-запись</DialogTitle>
                <DialogDescription>
                  Выберите тренера, время и оставьте свои контакты
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleBooking} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Ваше имя</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Иван Иванов"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Тренер</Label>
                  <Select value={selectedTrainer} onValueChange={setSelectedTrainer}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тренера" />
                    </SelectTrigger>
                    <SelectContent>
                      {trainers.map((trainer) => (
                        <SelectItem key={trainer.id} value={trainer.id.toString()}>
                          {trainer.name} — {trainer.specialization}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Время</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите время" />
                    </SelectTrigger>
                    <SelectContent>
                      {schedule.map((slot, index) => (
                        <SelectItem key={index} value={slot.time}>
                          {slot.time} — {slot.workout} ({slot.spots} мест)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full" size="lg">
                  Подтвердить запись
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </nav>
      </header>

      <section id="home" className="pt-16 min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl animate-fade-in">
            <h2 className="text-6xl md:text-7xl font-heading font-black mb-6 leading-tight">
              Преврати свое тело в <span className="text-primary">машину</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Профессиональные тренеры, современное оборудование и мотивирующая атмосфера для достижения твоих целей
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="text-lg px-8 py-6" onClick={() => setBookingOpen(true)}>
                Начать тренировки
                <Icon name="ArrowRight" className="ml-2" size={20} />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                <Icon name="Play" className="mr-2" size={20} />
                Смотреть видео
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-8 mt-16">
              <div className="text-center animate-scale-in">
                <div className="text-4xl font-heading font-bold text-primary mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Участников</div>
              </div>
              <div className="text-center animate-scale-in" style={{ animationDelay: '0.1s' }}>
                <div className="text-4xl font-heading font-bold text-primary mb-2">15+</div>
                <div className="text-sm text-muted-foreground">Тренеров</div>
              </div>
              <div className="text-center animate-scale-in" style={{ animationDelay: '0.2s' }}>
                <div className="text-4xl font-heading font-bold text-primary mb-2">1000+</div>
                <div className="text-sm text-muted-foreground">Тренировок</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="workouts" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-heading font-bold mb-4">Направления тренировок</h2>
            <p className="text-xl text-muted-foreground">Выбери свой путь к идеальной форме</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {workouts.map((workout, index) => (
              <Card key={workout.id} className="overflow-hidden group hover:shadow-2xl transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={workout.image} 
                    alt={workout.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 text-white mb-2">
                      <Icon name={workout.icon} size={24} />
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="font-heading text-2xl">{workout.title}</CardTitle>
                  <CardDescription className="text-base">{workout.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Узнать больше
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="schedule" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-heading font-bold mb-4">Расписание на сегодня</h2>
            <p className="text-xl text-muted-foreground">Выбери удобное время и запишись онлайн</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {schedule.map((slot, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-6">
                      <div className="text-3xl font-heading font-bold text-primary w-24">
                        {slot.time}
                      </div>
                      <div>
                        <div className="font-semibold text-lg mb-1">{slot.workout}</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-2">
                          <Icon name="User" size={16} />
                          {slot.trainer}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Icon name="Users" size={16} />
                        {slot.spots} мест
                      </div>
                      <Button onClick={() => {
                        setSelectedTime(slot.time);
                        setBookingOpen(true);
                      }}>
                        Записаться
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-heading font-bold text-2xl mb-4 text-primary">FIT CLUB</h3>
              <p className="text-sm opacity-80">Твой путь к идеальной форме начинается здесь</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Контакты</h4>
              <div className="space-y-2 text-sm opacity-80">
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  +7 (999) 123-45-67
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  info@fitclub.ru
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">График работы</h4>
              <div className="space-y-2 text-sm opacity-80">
                <div>Пн-Пт: 06:00 - 23:00</div>
                <div>Сб-Вс: 08:00 - 22:00</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Социальные сети</h4>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon" className="hover:text-primary">
                  <Icon name="Instagram" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="hover:text-primary">
                  <Icon name="Facebook" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="hover:text-primary">
                  <Icon name="Youtube" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm opacity-60">
            © 2024 FIT CLUB. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
