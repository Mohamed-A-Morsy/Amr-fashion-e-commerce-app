'use client';

import { useState } from 'react';
import { useCart } from '@/lib/context/CartContext';
import { createOrder } from '@/lib/services/googleSheetsApi';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';

export default function CheckoutPage() {
  const { items, subtotal, shipping, total, getOrderItems, clearCart } = useCart();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    notes: '',
    paymentMethod: 'cash_on_delivery',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!items.length) {
      alert('Cart is empty');
      return;
    }

    if (!form.name || !form.email || !form.phone || !form.address || !form.city) {
      alert('Please fill all required fields');
      return;
    }

    try {
      setLoading(true);

      const order = await createOrder({
        customer_name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        notes: form.notes,
        items: getOrderItems(),
        payment_method: form.paymentMethod,
      });

      clearCart();

      router.push(`/order-success?order_id=${order.order_id}`);
    } catch (error) {
      console.error(error);
      alert('Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-2xl font-bold">Checkout</h2>

            <div className="space-y-4">
              <input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded border p-3"
              />

              <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded border p-3"
              />

              <input
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded border p-3"
              />

              <input
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                className="w-full rounded border p-3"
              />

              <input
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="w-full rounded border p-3"
              />

              <textarea
                name="notes"
                placeholder="Notes (optional)"
                value={form.notes}
                onChange={handleChange}
                className="w-full rounded border p-3"
                rows={4}
              />

              <div className="rounded-lg border p-4">
                <h3 className="mb-3 font-semibold">Payment Method</h3>

                <div className="space-y-3">
                  <label className="flex cursor-pointer items-start gap-3 rounded border p-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash_on_delivery"
                      checked={form.paymentMethod === 'cash_on_delivery'}
                      onChange={handleChange}
                      className="mt-1"
                    />
                    <div>
                      <p className="font-medium">Cash on Delivery</p>
                      <p className="text-sm text-muted-foreground">
                        Pay when your order is delivered.
                      </p>
                    </div>
                  </label>

                  <label className="flex cursor-pointer items-start gap-3 rounded border p-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="instapay"
                      checked={form.paymentMethod === 'instapay'}
                      onChange={handleChange}
                      className="mt-1"
                    />
                    <div>
                      <p className="font-medium">Instapay Transfer</p>
                      <p className="text-sm text-muted-foreground">
                        Complete the order, then confirm transfer on WhatsApp.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <Button className="mt-6 w-full" onClick={handleSubmit} disabled={loading}>
              {loading ? 'Processing...' : 'Place Order'}
            </Button>
          </div>

          <div>
            <h2 className="mb-6 text-2xl font-bold">Order Summary</h2>

            <div className="space-y-4">
              {items.map((item, index) => {
                const productPrice = Number(item.product?.price || 0);
                const discount = Number(item.product?.discount || 0);
                const finalPrice = discount
                  ? productPrice - (productPrice * discount) / 100
                  : productPrice;

                return (
                  <div key={index} className="flex justify-between border-b pb-2">
                    <div>
                      <p>
                        {item.product?.name} x {item.quantity}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Size: {item.selectedSize} | Color: {item.selectedColor}
                      </p>
                    </div>

                    <span>${(finalPrice * item.quantity).toFixed(2)}</span>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 space-y-2 border-t pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}