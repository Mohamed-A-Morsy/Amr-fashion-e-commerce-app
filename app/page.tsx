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
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

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

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  const rotateSceneX = useTransform(springY, [-200, 200], [10, -10]);
  const rotateSceneY = useTransform(springX, [-200, 200], [-12, 12]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleHeroMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);

  const heroTshirts = [
    '/images/tshirtblack_out.png',
    '/images/tshirtwhite_out.png',
    '/images/tshirtblack_out.png',
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
        <section className="relative min-h-[78vh] md:min-h-[82vh] flex items-center bg-muted/20 pt-24 md:pt-12 pb-8 md:pb-6 overflow-hidden">
          <div
            className={`container mx-auto px-4 grid md:grid-cols-2 gap-8 lg:gap-10 items-center ${
              isRTL ? 'md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1' : ''
            }`}
          >
            <motion.div
              variants={stagger}
              className={`space-y-5 text-center ${isRTL ? 'md:text-right' : 'md:text-left'}`}
            >
              <motion.div
                variants={fadeInUp}
                className={`inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs md:text-sm font-semibold text-primary backdrop-blur-md ${
                  isRTL ? 'flex-row-reverse' : ''
                }`}
              >
                <span className={isRTL ? 'ml-2' : 'mr-2'}>🚀</span>
                {t('hero.new_collection')}
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-balance text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl italic uppercase leading-[0.88]"
              >
                {isRTL ? (
                  <>
                    البس <br />
                    <span className="text-primary relative inline-block">
                      بطريقتك
                      <motion.span
                        className="absolute -bottom-2 right-0 h-2 w-full bg-accent"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ delay: 1, duration: 0.8 }}
                        style={{ transformOrigin: 'right' }}
                      />
                    </span>
                    <br />
                    .
                  </>
                ) : (
                  <>
                    Wear <br />
                    <span className="text-primary relative inline-block">
                      Your
                      <motion.span
                        className="absolute -bottom-2 left-0 h-2 w-full bg-accent"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ delay: 1, duration: 0.8 }}
                        style={{ transformOrigin: 'left' }}
                      />
                    </span>
                    <br />
                    Vibe.
                  </>
                )}
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className={`max-w-md text-base text-muted-foreground md:text-lg font-medium ${
                  isRTL ? 'mx-auto md:mr-0 md:ml-auto' : 'mx-auto md:mx-0'
                }`}
              >
                {t('hero.description')}
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className={`pt-2 flex flex-col gap-3 sm:flex-row justify-center ${
                  isRTL ? 'sm:flex-row-reverse md:justify-end' : 'md:justify-start'
                }`}
              >
                <Link href="/shop">
                  <Button
                    size="lg"
                    className={`h-12 px-8 text-base rounded-full w-full sm:w-auto font-bold group ${
                      isRTL ? 'flex-row-reverse' : ''
                    }`}
                  >
                    {t('hero.shop_tees')}
                    <ShoppingBag
                      className={`${isRTL ? 'mr-2' : 'ml-2'} h-5 w-5 group-hover:scale-110 transition-transform`}
                    />
                  </Button>
                </Link>

                <Link href="/about">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 px-8 text-base rounded-full w-full sm:w-auto font-semibold backdrop-blur-sm"
                  >
                    {t('footer.about')}
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isRTL ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              onMouseMove={handleHeroMouseMove}
              onMouseLeave={handleHeroMouseLeave}
              className="relative h-[320px] sm:h-[380px] md:h-[460px] lg:h-[520px] flex items-center justify-center [perspective:1800px]"
            >
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.55, 0.35] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute h-[70%] w-[70%] rounded-full bg-primary/10 blur-3xl"
              />

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-4 rounded-full border border-dashed border-primary/20"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-10 rounded-full border border-accent/20"
              />

              <motion.div
                style={{
                  rotateX: rotateSceneX,
                  rotateY: rotateSceneY,
                  transformStyle: 'preserve-3d',
                }}
                className="relative h-full w-full flex items-center justify-center"
              >
                {heroTshirts.map((src, index) => {
                  const isMain = index === 1;

                  const positions = isRTL
                    ? [
                        {
                          x: 120,
                          y: 35,
                          rotateZ: 14,
                          rotateY: 18,
                          z: -80,
                          width: 'w-40 sm:w-44 md:w-52 lg:w-[250px]',
                          opacity: 'opacity-80',
                        },
                        {
                          x: 0,
                          y: -20,
                          rotateZ: 0,
                          rotateY: 0,
                          z: 120,
                          width: 'w-56 sm:w-64 md:w-72 lg:w-[360px]',
                          opacity: 'opacity-100',
                        },
                        {
                          x: -120,
                          y: 40,
                          rotateZ: -14,
                          rotateY: -18,
                          z: -80,
                          width: 'w-40 sm:w-44 md:w-52 lg:w-[250px]',
                          opacity: 'opacity-80',
                        },
                      ]
                    : [
                        {
                          x: -120,
                          y: 35,
                          rotateZ: -14,
                          rotateY: -18,
                          z: -80,
                          width: 'w-40 sm:w-44 md:w-52 lg:w-[250px]',
                          opacity: 'opacity-80',
                        },
                        {
                          x: 0,
                          y: -20,
                          rotateZ: 0,
                          rotateY: 0,
                          z: 120,
                          width: 'w-56 sm:w-64 md:w-72 lg:w-[360px]',
                          opacity: 'opacity-100',
                        },
                        {
                          x: 120,
                          y: 40,
                          rotateZ: 14,
                          rotateY: 18,
                          z: -80,
                          width: 'w-40 sm:w-44 md:w-52 lg:w-[250px]',
                          opacity: 'opacity-80',
                        },
                      ];

                  const item = positions[index];

                  return (
                    <motion.div
                      key={index}
                      className="absolute"
                      style={{
                        transformStyle: 'preserve-3d',
                        zIndex: isMain ? 30 : 10,
                      }}
                      animate={{
                        y: [item.y, item.y - 14, item.y],
                        rotateY: [item.rotateY, item.rotateY + 180, item.rotateY + 360],
                      }}
                      transition={{
                        y: {
                          duration: 4 + index,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        },
                        rotateY: {
                          duration: isMain ? 10 : 12,
                          repeat: Infinity,
                          ease: 'linear',
                          delay: index * 0.5,
                        },
                      }}
                      whileHover={{
                        scale: 1.05,
                        z: 180,
                        transition: { duration: 0.3 },
                      }}
                    >
                      <div
                        style={{
                          transform: `translate3d(${item.x}px, ${item.y}px, ${item.z}px) rotateZ(${item.rotateZ}deg)`,
                          transformStyle: 'preserve-3d',
                        }}
                        className="relative"
                      >
                        <div
                          style={{
                            transformStyle: 'preserve-3d',
                          }}
                          className="relative"
                        >
                          <div
                            style={{
                              backfaceVisibility: 'hidden',
                              WebkitBackfaceVisibility: 'hidden',
                            }}
                            className={`relative ${item.width} ${item.opacity} drop-shadow-[0_25px_45px_rgba(0,0,0,0.22)]`}
                          >
                            <Image
                              src={src}
                              alt={`Tshirt front ${index + 1}`}
                              width={500}
                              height={500}
                              className="object-contain"
                              priority={isMain}
                            />
                          </div>

                          <div
                            style={{
                              transform: 'rotateY(180deg) scaleX(-1)',
                              backfaceVisibility: 'hidden',
                              WebkitBackfaceVisibility: 'hidden',
                            }}
                            className={`absolute inset-0 ${item.width} ${item.opacity} drop-shadow-[0_25px_45px_rgba(0,0,0,0.18)]`}
                          >
                            <Image
                              src={src}
                              alt={`Tshirt back ${index + 1}`}
                              width={500}
                              height={500}
                              className="object-contain"
                            />
                          </div>
                        </div>

                        <motion.div
                          animate={{ scaleX: [1, 1.05, 1], opacity: [0.14, 0.22, 0.14] }}
                          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                          className="absolute left-1/2 top-[85%] h-5 w-[55%] -translate-x-1/2 rounded-full bg-black/20 blur-xl"
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </section>

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
                { icon: <Truck />, title: t('features.express_delivery'), desc: t('features.express_delivery_desc') },
                { icon: <RotateCcw />, title: t('features.easy_returns'), desc: t('features.easy_returns_desc') },
                { icon: <Star />, title: t('features.premium_quality'), desc: t('features.premium_quality_desc') },
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
      </main>

      {/* <Footer /> */}
    </motion.div>
  );
}