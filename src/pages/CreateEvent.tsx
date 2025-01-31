import React, { useState } from 'react';
import api from '../services/api';

const CreateEvent: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState<'EM_BREVE' | 'EM_ANDAMENTO' | 'ENCERRADO'>('EM_BREVE');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !date || !location) {
      setMessage('Por favor, preencha todos os campos');
      return;
    }

    const eventDate = new Date(date);
    if (eventDate <= new Date()) {
      setMessage('A data e hora do evento devem ser no futuro');
      return;
    }

    setLoading(true);

    try {
      await api.post('/events', { title, description, date, location, status });
      setMessage('Evento criado com sucesso!');
      setTitle('');
      setDescription('');
      setDate('');
      setLocation('');
      setStatus('EM_BREVE');
    } catch (error) {
      console.error('Erro ao criar o evento', error);
      setMessage('Erro ao criar o evento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">Criar Evento</h1>
        <form onSubmit={handleCreateEvent} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Título do Evento</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Título do Evento"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Descrição</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Descrição do Evento"
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Data e Hora</label>
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Localização</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Localização do Evento"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status do Evento</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as 'EM_BREVE' | 'EM_ANDAMENTO' | 'ENCERRADO')}
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="EM_BREVE">Em Breve</option>
              <option value="EM_ANDAMENTO">Em Andamento</option>
              <option value="ENCERRADO">Encerrado</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? 'Criando...' : 'Criar Evento'}
          </button>
          {message && <p className={`mt-4 text-center ${message.includes('Erro') ? 'text-red-500' : 'text-green-500'}`}>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
