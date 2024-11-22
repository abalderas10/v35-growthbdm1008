'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

const NewsletterSubscribe = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribe:', email);
    setEmail('');
  };

  return (
    <div className="bg-blue-950 text-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <Mail className="w-5 h-5 mr-2" />
        <h3 className="text-lg font-bold">Suscríbete a Nuestro Newsletter</h3>
      </div>
      <p className="text-blue-200 mb-4 text-sm">
        Recibe las últimas noticias y artículos sobre arquitectura, construcción e ingeniería directamente en tu bandeja de entrada.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="email"
          placeholder="Tu correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-blue-900 border-blue-800 text-white placeholder:text-blue-400"
          required
        />
        <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
          Suscribirse
        </Button>
      </form>
    </div>
  );
};

export default NewsletterSubscribe;