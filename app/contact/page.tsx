'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/lib/context/LanguageContext';
import { Mail, Phone, MapPin } from 'lucide-react';

const contactItems = {
  email: 'support@example.com',
  phoneDisplay: '+20 103 005 5222',
  phoneLink: '+201030088222',
  addressEn: 'Cairo, Egypt',
  addressAr: 'القاهرة، مصر',
};

export default function ContactPage() {
  const { t, isRTL } = useLanguage();

  const cards = [
    {
      icon: Mail,
      title: isRTL ? 'البريد الإلكتروني' : 'Email',
      value: contactItems.email,
      subtext: isRTL ? 'راسلنا مباشرة على البريد الإلكتروني' : 'Send us an email anytime',
      href: `mailto:${contactItems.email}`,
    },
    {
      icon: Phone,
      title: isRTL ? 'رقم الهاتف' : 'Phone',
      value: contactItems.phoneDisplay,
      subtext: isRTL ? 'اتصل بنا مباشرة في مواعيد العمل' : 'Call us directly during business hours',
      href: `tel:${contactItems.phoneLink}`,
    },
    {
      icon: MapPin,
      title: isRTL ? 'العنوان' : 'Address',
      value: isRTL ? contactItems.addressAr : contactItems.addressEn,
      subtext: isRTL ? 'زورنا أو تواصل معنا في أي وقت' : 'Visit us or reach out anytime',
      href: null,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden border-b bg-gradient-to-b from-muted/50 to-background py-20">
          <div className="absolute inset-0 opacity-40">
            <div className="absolute left-10 top-10 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
          </div>

          <div className={`relative mx-auto max-w-6xl px-4 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className="mx-auto max-w-2xl">
              <p className="mb-4 inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
                {isRTL ? 'تواصل معنا' : 'Contact Us'}
              </p>

              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                {isRTL ? 'كل طرق التواصل في مكان واحد' : 'All contact details in one place'}
              </h1>

              <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">
                {isRTL
                  ? 'لو حابب تتواصل معانا، تقدر توصل لنا بسهولة عن طريق البريد الإلكتروني أو التليفون أو العنوان الموضح تحت.'
                  : 'If you would like to reach us, you can contact us بسهولة through email, phone, or the address below.'}
              </p>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-6 md:grid-cols-3">
              {cards.map((item, index) => {
                const Icon = item.icon;

                const content = (
                  <Card className="group h-full rounded-3xl border bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
                      <div className={`mb-5 flex ${isRTL ? 'justify-end' : 'justify-start'}`}>
                        <div className="rounded-2xl bg-primary/10 p-4 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <Icon className="h-6 w-6" />
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold">{item.title}</h3>

                      <p className="mt-3 break-words text-lg font-medium text-foreground">
                        {item.value}
                      </p>

                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {item.subtext}
                      </p>
                    </div>
                  </Card>
                );

                return item.href ? (
                  <a key={index} href={item.href} className="block">
                    {content}
                  </a>
                ) : (
                  <div key={index}>{content}</div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}