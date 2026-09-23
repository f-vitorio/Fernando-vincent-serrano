import { siteConfig, type FormData, type WhatsAppMessage } from '../types';

export function generateWhatsAppLink(data: FormData): string {
  const baseUrl = `https://wa.me/${siteConfig.whatsappNumber}`;
  let message = '';

  switch (data.formType) {
    case 'whatsapp':
      message = `Olá! Vim pelo site da VicentBOX.\n\n`;
      message += `*Nome:* ${data.name}\n`;
      message += `*WhatsApp:* ${data.phone}\n`;
      if (data.objective) message += `*Objetivo:* ${data.objective}\n`;
      if (data.preferredTime) message += `*Melhor horário:* ${data.preferredTime}\n`;
      if (data.injuries) message += `*Lesões/Restrições:* ${data.injuries}\n`;
      message += `\n*Serviço de interesse:* ${getServiceName(data.source)}`;
      break;
    case 'email':
      message = `Olá! Vim pelo site da VicentBOX.\n\n`;
      message += `*Nome:* ${data.name}\n`;
      message += `*E-mail:* ${data.email}\n`;
      message += `*WhatsApp:* ${data.phone}\n`;
      if (data.objective) message += `*Objetivo:* ${data.objective}\n`;
      if (data.injuries) message += `*Lesões/Restrições:* ${data.injuries}\n`;
      message += `\n*Serviço de interesse:* ${getServiceName(data.source)}`;
      break;
  }

  return `${baseUrl}?text=${encodeURIComponent(message)}`;
}

export function generateWhatsAppMessage(data: FormData): WhatsAppMessage {
  return {
    phone: siteConfig.whatsappNumber,
    message: decodeURIComponent(generateWhatsAppLink(data).split('?text=')[1]),
  };
}

function getServiceName(source: FormData['source']): string {
  const names: Record<FormData['source'], string> = {
    treinamento: 'Treinamento Multifuncional',
    corrida: 'Grupo de Corrida',
    consultoria: 'Consultoria Online',
    contato: 'Contato Geral',
    studio: 'Visita ao Studio',
    sobre: 'Informações Gerais',
  };
  return names[source] || 'Serviço não identificado';
}

export function formatPhoneForDisplay(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  }
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
}

export function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 11;
}

export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export function validateFormData(data: FormData): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.name.trim()) {
    errors.name = 'Nome é obrigatório';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Nome deve ter pelo menos 2 caracteres';
  }

  if (!validatePhone(data.phone)) {
    errors.phone = 'WhatsApp inválido. Use formato (DD) 9XXXX-XXXX';
  }

  if (data.formType === 'email') {
    if (!data.email || !validateEmail(data.email)) {
      errors.email = 'E-mail válido é obrigatório';
    }
  }

  if (data.source === 'consultoria' && !data.injuries?.trim()) {
    // injuries is optional but recommended for consultoria
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function getEstimatedTicket(source: FormData['source']): number {
  const tickets: Record<FormData['source'], number> = {
    treinamento: 400,
    corrida: 100,
    consultoria: 40,
    contato: 0,
    studio: 0,
    sobre: 0,
  };
  return tickets[source] || 0;
}