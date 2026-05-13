
import { supabase } from '@/lib/customSupabaseClient';

export const NotificationService = {
  async logNotification({ type, title, message, recipient_email, recipient_phone, status = 'sent' }) {
    try {
      const { error } = await supabase.from('notifications').insert({
        type,
        title,
        message,
        recipient_email,
        status,
        // Assuming we might extend the table schema later for phone, 
        // storing it in message or metadata would be ideal if schema is locked.
        // For now, we'll append to message if phone exists for visibility.
        message: recipient_phone ? `${message} (Sent to: ${recipient_phone})` : message
      });
      if (error) throw error;
      return true;
    } catch (err) {
      console.error('Failed to log notification:', err);
      return false;
    }
  },

  async sendSMS(phone, message) {
    // Mock SMS sending logic
    console.log(`Sending SMS to ${phone}: ${message}`);
    return this.logNotification({
      type: 'sms',
      title: 'SMS Notification',
      message: message,
      recipient_phone: phone,
      status: 'sent'
    });
  },

  async sendOrderConfirmation(orderId, customerEmail, amount, customerPhone) {
    // Email
    await this.logNotification({
      type: 'order',
      title: `Order Confirmation #${orderId}`,
      message: `Order for ₹${amount} received successfully.`,
      recipient_email: customerEmail,
      status: 'sent'
    });

    // SMS
    if (customerPhone) {
      await this.sendSMS(customerPhone, `KochinAds: Order #${orderId} confirmed. Amount: ₹${amount}. Thanks!`);
    }
    return true;
  },

  async sendAdminAlert(title, message) {
    return this.logNotification({
      type: 'alert',
      title: title,
      message: message,
      recipient_email: 'admin@kochinads.com',
      status: 'sent'
    });
  },

  async getNotifications() {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
};
