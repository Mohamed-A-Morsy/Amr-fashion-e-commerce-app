'use client';

import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/lib/context/LanguageContext';
import { products } from '@/lib/data/products';
import { categories } from '@/lib/data/categories';
import { ArrowRight, ShoppingBag, Star, Truck, RotateCcw } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // استيراد Framer Motion

// إعدادات الأنيميشن الافتراضية للعناصر (Variants)
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.9] }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const { t, isRTL } = useLanguage();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);
  
  // صور التيشيرتات للهيرو (تأكد من وجود صور بخلفية شفافة PNG بجودة عالية)
  const heroTshirts = [
    '/images/tshirtWhite_out.png', // مثال: تيشيرت أبيض
    
  ];

  if (!mounted) return null;

  return (
    <motion.div 
      initial="initial" 
      animate="animate" 
      className="flex min-h-screen flex-col bg-background selection:bg-primary selection:text-primary-foreground overflow-x-hidden"
    >
      <Header />

      <main className="flex-1">
        {/* --- 🔥 New Animated Hero Section 🔥 --- */}
        <section className="relative min-h-[90vh] flex items-center bg-muted/20 pt-20 md:pt-0">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            
            {/* القسم الأيسر: النص المحرك */}
            <motion.div variants={stagger} className="space-y-6 text-center md:text-left">
              <motion.div 
                variants={fadeInUp}
                className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs md:text-sm font-semibold text-primary backdrop-blur-md"
              >
                <span className="mr-2">🚀</span> {isRTL ? 'وصل حديثاً: مجموعة صيف 2024' : 'Just Dropped: Summer 24 Collection'}
              </motion.div>
              
              <motion.h1 
                variants={fadeInUp}
                className="text-balance text-5xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl italic uppercase leading-[0.85]"
              >
                Wear <br /> 
                <span className="text-primary relative">
                  Your
                  <motion.span 
                    className="absolute -bottom-2 left-0 h-2 w-full bg-accent"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 1, duration: 0.8 }}
                  />
                </span><br /> 
                Vibe.
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="mt-6 max-w-lg mx-auto md:mx-0 text-lg text-muted-foreground md:text-xl font-medium"
              >
                Premium cotton tees designed for supreme comfort and standout style. Streetwear, refined.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="mt-10 flex flex-col gap-4 sm:flex-row justify-center md:justify-start">
                <Link href="/shop">
                  <Button size="lg" className="h-14 px-10 text-lg rounded-full w-full sm:w-auto font-bold group">
                    Shop Tees <ShoppingBag className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg" className="h-14 px-10 text-lg rounded-full w-full sm:w-auto font-semibold backdrop-blur-sm">
                    {t('footer.about')}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* القسم الأيمن: عرض التيشيرتات المتحرك (Visual) */}
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-square flex items-center justify-center lg:scale-110"
            >
              {/* دوائر خلفية جمالية محركة */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border-2 border-dashed border-primary/20 rounded-full"
              />
               <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-10 border border-accent/20 rounded-full"
              />

              {/* التيشيرتات المحركة (Parallax effective on hover) */}
              {heroTshirts.map((src, index) => (
                <motion.div
                  key={index}
                  className="absolute"
                  style={{
                    zIndex: heroTshirts.length - index,
                  }}
                  animate={{
                    y: [0, -20, 0], // حركة طفو هادئة
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.5,
                    ease: "easeInOut"
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    zIndex: 10,
                    transition: { duration: 0.2 } 
                  }}
                >
                  <Image 
                    src={src} 
                    alt={`Tshirt ${index + 1}`} 
                    width={500} 
                    height={500} 
                    className={`object-contain ${index === 0 ? 'w-80 md:w-96 lg:w-[450px]' : 'w-60 md:w-72 lg:w-[350px] opacity-70'} drop-shadow-2xl`}
                    // تأثير إزاحة بسيط لكل تيشيرت ليعطي عمق
                    style={{
                        transform: `translateX(${(index - 1) * 80}px) translateY(${(index - 1) * -30}px) rotate(${(index - 1) * -5}deg)`
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>

          </div>
        </section>

        {/* --- Features Section (Animate on Scroll) --- */}
        <motion.section 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="border-b bg-muted/20 py-20"
        >
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-10 md:grid-cols-3">
              {[
                { icon: <Truck />, title: "Express Delivery", desc: "Free on orders over $100. Fast worldwide." },
                { icon: <RotateCcw />, title: "Easy Returns", desc: "30-day hassle-free return policy." },
                { icon: <Star />, title: "Premium Quality", desc: "100% combed cotton. Built to last." },
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  variants={fadeInUp}
                  className="flex flex-col items-center text-center p-8 bg-background rounded-3xl border shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="mb-6 rounded-full bg-primary/10 p-5 text-primary scale-110">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold uppercase tracking-tight">{item.title}</h3>
                  <p className="mt-3 text-muted-foreground font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* --- Featured Products (Modern Cards & Scroll Animate) --- */}
        <motion.section 
           initial="initial"
           whileInView="animate"
           viewport={{ once: true, amount: 0.1 }}
           className="py-24"
        >
          <div className="mx-auto max-w-7xl px-4">
            <motion.div variants={fadeInUp} className="flex items-center justify-between mb-12">
              <h2 className="text-4xl font-extrabold tracking-tighter uppercase italic">Featured Drop</h2>
              <Link href="/shop" className="group">
                <Button variant="ghost" className="rounded-full font-bold">
                  View All <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            <motion.div 
              variants={stagger}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            >
              {featuredProducts.map((product) => (
                <motion.div key={product.id} variants={fadeInUp}>
                  <Link href={`/products/${product.id}`} className="group">
                    <Card className="overflow-hidden rounded-3xl border-none bg-muted/30 transition-all duration-300 hover:bg-muted/50 hover:shadow-2xl hover:-translate-y-2">
                      <div className="relative aspect-[3/4] overflow-hidden">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {product.discount && (
                          <div className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-accent-foreground backdrop-blur-sm">
                            -{product.discount}%
                          </div>
                        )}
                         <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                            <Button className="w-full rounded-full font-bold shadow-lg">Quick View</Button>
                         </div>
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-start gap-2">
                            <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{product.name}</h3>
                            <div className="flex items-center gap-1 flex-shrink-0 mt-0.5">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm font-bold">{product.rating}</span>
                            </div>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2 font-medium">{product.description}</p>
                        <div className="mt-5 flex items-end justify-between">
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-extrabold tracking-tight">
                              ${product.discount
                                ? (product.price * (1 - product.discount / 100)).toFixed(2)
                                : product.price.toFixed(2)}
                            </span>
                            {product.discount && (
                              <span className="text-sm text-muted-foreground line-through font-medium">
                                ${product.price.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <div className="rounded-full bg-background border p-2 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                             <ShoppingBag className="h-5 w-5" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* باقي الأقسام (Categories, New Arrivals, CTA) يجب أيضاً تحديثها بنفس الروح */}
        {/* سأكتفي بهذا القدر ليوضح الفكرة العامة للتغيير الجذري */}

      </main>

      <Footer />
    </motion.div>
  );
}