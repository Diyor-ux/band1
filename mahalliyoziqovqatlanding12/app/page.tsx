import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, MapPin, Phone, Star, CheckCircle, Users, MessageCircle, Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white sticky top-0 z-50">
        <div className="flex items-center justify-center">
          <Image src="/images/new-logo.png" width={32} height={32} alt="BAND Logo" className="h-8 w-8" />
          <span className="ml-2 text-xl font-bold text-gray-900">BAND</span>
        </div>
        <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
          <Link href="#xizmatlar" className="text-sm font-medium hover:text-green-600 transition-colors">
            Xizmatlar
          </Link>
          <Link href="#qanday-ishlaydi" className="text-sm font-medium hover:text-green-600 transition-colors">
            Qanday ishlaydi
          </Link>
          <Link href="#aloqa" className="text-sm font-medium hover:text-green-600 transition-colors">
            Aloqa
          </Link>
        </nav>
        {/* Mobile menu button */}
        <Button variant="ghost" size="icon" className="ml-auto md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-8 md:py-16 lg:py-24 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] items-center">
              <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
                <div className="space-y-2">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 mx-auto lg:mx-0 w-fit">
                    Yangi xizmat
                  </Badge>
                  <h1 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none text-gray-900">
                    Mahalliy do'konlardan
                    <span className="text-green-600"> mahsulot band qiling</span>
                  </h1>
                  <p className="max-w-[600px] text-gray-600 text-base md:text-lg mx-auto lg:mx-0">
                    Uydan chiqmasdan turib, mahalliy oziq-ovqat do'konlaridagi eng yangi va sifatli mahsulotlarni
                    oldindan band qiling. Vaqtingizni tejang, sifatli mahsulot oling!
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                  <Button size="lg" className="bg-orange-600 hover:bg-orange-700 w-full sm:w-auto" asChild>
                    <Link href="http://66.42.97.211:3001" target="_blank" rel="noopener noreferrer">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Hoziroq band qiling
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
                    <Link href="https://t.me/RavshanovMuhammaddiyor" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Telegram orqali aloqa
                    </Link>
                  </Button>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-600 justify-center lg:justify-start">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">4.8</span>
                    <span>(2,500+ mijoz)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Bepul xizmat</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center order-first lg:order-last">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ChatGPT%20Image%207%20%D0%B8%D1%8E%D0%BD.%202025%20%D0%B3.%2C%2016_41_44-zjcLodXSH7PUCoZ2L95788sJmynpE3.png"
                  width={600}
                  height={450}
                  alt="Telefon orqali oziq-ovqat mahsulotlarini band qilish"
                  className="mx-auto w-full max-w-md h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="xizmatlar" className="w-full py-12 md:py-20 lg:py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                  ✨ Afzalliklarimiz
                </h2>
                <p className="max-w-[900px] text-gray-600 text-base md:text-lg">
                  Mahalliy do'konlar bilan hamkorlikda, sizga eng yaxshi xizmatni taqdim etamiz
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
              {/* Feature 1 */}
              <Card className="border-2 hover:border-green-200 transition-all duration-300 hover:shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 shrink-0">
                      <span className="text-2xl">🛍️</span>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">1. Mahsulotni oldindan band qilish</CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        Endi siz do'konga borishdan oldin kerakli mahsulotni telefon orqali yoki kompyuter orqali band
                        qilib qo'yishingiz mumkin. Mahsulot siz yetib kelguncha kutib turadi!
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Feature 2 */}
              <Card className="border-2 hover:border-green-200 transition-all duration-300 hover:shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 shrink-0">
                      <span className="text-2xl">⏱️</span>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">2. Vaqtingizni tejang</CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        Do'konga borib, kerakli mahsulot tugab qolgan holatlar endi orqada qoldi. Ilovamiz orqali mavjud
                        mahsulotlarni ko'rib, ularni oldindan tayyorlatib qo'yasiz.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Feature 3 */}
              <Card className="border-2 hover:border-green-200 transition-all duration-300 hover:shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 shrink-0">
                      <span className="text-2xl">💸</span>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">3. Narxlarni oldindan ko'rish imkoniyati</CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        Har bir mahsulot uchun yangilangan narxlar ko'rsatilgan. Qiyoslab ko'rish va to'g'ri tanlov
                        qilish imkoniyati mavjud.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Feature 4 */}
              <Card className="border-2 hover:border-green-200 transition-all duration-300 hover:shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 shrink-0">
                      <span className="text-2xl">📆</span>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">4. Yaroqlilik muddatiga e'tibor bering</CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        Har bir mahsulotning yaroqlilik muddati ilovada aniq ko'rsatilgan. Siz faqat yangiligi
                        kafolatlangan mahsulotlarni tanlaysiz.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Feature 5 */}
              <Card className="border-2 hover:border-green-200 transition-all duration-300 hover:shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 shrink-0">
                      <span className="text-2xl">📦</span>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">5. Mahsulotlar sonini ko'ring</CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        Omborda qancha mahsulot qolganini bilib, band qilishda o'zingizga kerakli miqdorni
                        belgilashingiz mumkin.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Feature 6 */}
              <Card className="border-2 hover:border-green-200 transition-all duration-300 hover:shadow-lg">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 shrink-0">
                      <span className="text-2xl">🔔</span>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">6. Xabarnomalar va eslatmalar</CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        Band qilingan mahsulotni olish muddati tugashiga yaqin sizga eslatma yuboriladi. Hech narsani
                        unutib yubormaysiz.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section
          id="qanday-ishlaydi"
          className="w-full py-12 md:py-20 lg:py-24 bg-gradient-to-br from-blue-50 to-green-50"
        >
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                  📲 Qanday ishlatiladi?
                </h2>
                <p className="max-w-[900px] text-gray-600 text-base md:text-lg">
                  4 ta oddiy qadam bilan mahsulotingizni band qiling
                </p>
              </div>
            </div>

            <div className="mx-auto max-w-4xl">
              <div className="grid gap-8 md:gap-12">
                {/* Step 1 */}
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                  <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-green-600 text-white text-xl md:text-2xl font-bold shadow-lg shrink-0">
                    1
                  </div>
                  <Card className="flex-1 border-2 border-green-200 bg-white shadow-lg">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg md:text-xl text-green-800">
                        Ro'yxatdan o'ting yoki kirish qiling
                      </CardTitle>
                      <CardDescription className="text-sm md:text-base">
                        Telefon raqamingiz orqali tizimga kirish juda oson.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-6 md:gap-8">
                  <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-blue-600 text-white text-xl md:text-2xl font-bold shadow-lg shrink-0">
                    2
                  </div>
                  <Card className="flex-1 border-2 border-blue-200 bg-white shadow-lg">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg md:text-xl text-blue-800">Mahsulotlarni ko'rib chiqing</CardTitle>
                      <CardDescription className="text-sm md:text-base">
                        Mahsulot nomi, narxi, mavjud soni va yaroqlilik muddati bilan tanishing.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                  <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-purple-600 text-white text-xl md:text-2xl font-bold shadow-lg shrink-0">
                    3
                  </div>
                  <Card className="flex-1 border-2 border-purple-200 bg-white shadow-lg">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg md:text-xl text-purple-800">Kerakli mahsulotni tanlang</CardTitle>
                      <CardDescription className="text-sm md:text-base">
                        Miqdorini belgilang va "Band qilish" tugmasini bosing.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col md:flex-row-reverse items-center gap-6 md:gap-8">
                  <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-orange-600 text-white text-xl md:text-2xl font-bold shadow-lg shrink-0">
                    4
                  </div>
                  <Card className="flex-1 border-2 border-orange-200 bg-white shadow-lg">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg md:text-xl text-orange-800">
                        Do'konga boring va mahsulotingizni oling
                      </CardTitle>
                      <CardDescription className="text-sm md:text-base">
                        Mahsulot tayyorlangan bo'ladi — navbat kutishga hojat yo'q!
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Categories */}
        <section className="w-full py-12 md:py-20 lg:py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                  Mahsulot turlari
                </h2>
                <p className="max-w-[900px] text-gray-600 text-base md:text-lg">
                  Barcha turdagi oziq-ovqat mahsulotlarini band qilishingiz mumkin
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-4 py-12 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[
                {
                  name: "Meva-sabzavot",
                  emoji: "🍎🥕",
                  count: "500+",
                  bgColor: "bg-green-100",
                  textColor: "text-green-800",
                },
                {
                  name: "Go'sht mahsulotlari",
                  emoji: "🥩🍗",
                  count: "200+",
                  bgColor: "bg-red-100",
                  textColor: "text-red-800",
                },
                {
                  name: "Sut mahsulotlari",
                  emoji: "🥛🧀",
                  count: "300+",
                  bgColor: "bg-blue-100",
                  textColor: "text-blue-800",
                },
                {
                  name: "Non va shirinliklar",
                  emoji: "🍞🧁",
                  count: "400+",
                  bgColor: "bg-yellow-100",
                  textColor: "text-yellow-800",
                },
                {
                  name: "Ichimliklar",
                  emoji: "🥤🧃",
                  count: "250+",
                  bgColor: "bg-purple-100",
                  textColor: "text-purple-800",
                },
                {
                  name: "Konserva mahsulotlar",
                  emoji: "🥫🍯",
                  count: "150+",
                  bgColor: "bg-orange-100",
                  textColor: "text-orange-800",
                },
                {
                  name: "Muz mahsulotlar",
                  emoji: "🍦❄️",
                  count: "100+",
                  bgColor: "bg-cyan-100",
                  textColor: "text-cyan-800",
                },
                {
                  name: "Boshqa mahsulotlar",
                  emoji: "🛒🍽️",
                  count: "800+",
                  bgColor: "bg-gray-100",
                  textColor: "text-gray-800",
                },
              ].map((category, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105"
                >
                  <CardHeader className="text-center p-4">
                    <div
                      className={`mx-auto h-16 w-16 md:h-20 md:w-20 rounded-full ${category.bgColor} flex items-center justify-center mb-3`}
                    >
                      <span className="text-2xl md:text-3xl">{category.emoji}</span>
                    </div>
                    <CardTitle className={`text-sm md:text-base mb-1 ${category.textColor}`}>{category.name}</CardTitle>
                    <CardDescription className="text-xs md:text-sm font-medium">
                      {category.count} mahsulot
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-20 lg:py-24 bg-green-600 text-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center text-center">
                <Users className="h-8 w-8 md:h-12 md:w-12 mb-4" />
                <div className="text-2xl md:text-3xl font-bold">10,000+</div>
                <div className="text-green-100 text-sm md:text-base">Faol mijozlar</div>
              </div>
              <div className="flex flex-col items-center text-center">
                <ShoppingCart className="h-8 w-8 md:h-12 md:w-12 mb-4" />
                <div className="text-2xl md:text-3xl font-bold">50,000+</div>
                <div className="text-green-100 text-sm md:text-base">Band qilingan mahsulot</div>
              </div>
              <div className="flex flex-col items-center text-center">
                <MapPin className="h-8 w-8 md:h-12 md:w-12 mb-4" />
                <div className="text-2xl md:text-3xl font-bold">200+</div>
                <div className="text-green-100 text-sm md:text-base">Hamkor do'konlar</div>
              </div>
              <div className="flex flex-col items-center text-center">
                <Star className="h-8 w-8 md:h-12 md:w-12 mb-4" />
                <div className="text-2xl md:text-3xl font-bold">4.8/5</div>
                <div className="text-green-100 text-sm md:text-base">Mijoz baholari</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-20 lg:py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-2xl mx-auto">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
                  Bugun boshlab ko'ring!
                </h2>
                <p className="max-w-[600px] text-gray-600 text-base md:text-lg">
                  Telefon raqamingizni qoldiring yoki Telegram orqali to'g'ridan-to'g'ri bog'laning
                </p>
              </div>
              <div className="w-full max-w-sm space-y-4">
                <form className="flex gap-2">
                  <Input type="tel" placeholder="+998 90 123 45 67" className="flex-1" />
                  <Button type="submit" className="bg-green-600 hover:bg-green-700 shrink-0">
                    Yuborish
                  </Button>
                </form>
                <div className="text-center">
                  <span className="text-sm text-gray-500">yoki</span>
                </div>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-green-600 text-green-600 hover:bg-green-50"
                  asChild
                >
                  <Link href="https://t.me/RavshanovMuhammaddiyor" target="_blank" rel="noopener noreferrer">
                    Telegram orqali bog'lanish
                  </Link>
                </Button>
                <p className="text-xs text-gray-500">
                  Ro'yxatdan o'tish orqali siz{" "}
                  <Link href="#" className="underline underline-offset-2 hover:text-green-600">
                    Foydalanish shartlari
                  </Link>
                  ga rozilik bildirasiz
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        id="aloqa"
        className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-gray-50"
      >
        <div className="container mx-auto">
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start">
                <Image src="/images/new-logo.png" width={24} height={24} alt="BAND Logo" className="h-6 w-6" />
                <span className="ml-2 text-xl font-bold">BAND</span>
              </div>
              <p className="text-sm text-gray-600">
                Mahalliy do'konlardan mahsulot band qilish xizmati. Vaqtingizni tejang, sifatli mahsulot oling!
              </p>
            </div>
            <div className="space-y-4 text-center md:text-left">
              <h4 className="text-sm font-semibold">Xizmatlar</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="#" className="hover:text-green-600">
                    Mahsulot band qilish
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-600">
                    Do'kon qidirish
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-600">
                    Narxlarni solishtirish
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4 text-center md:text-left">
              <h4 className="text-sm font-semibold">Yordam</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="#" className="hover:text-green-600">
                    Tez-tez so'raladigan savollar
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-600">
                    Qo'llab-quvvatlash
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://t.me/RavshanovMuhammaddiyor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-600"
                  >
                    Telegram orqali aloqa
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4 text-center md:text-left">
              <h4 className="text-sm font-semibold">Aloqa</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <Phone className="h-4 w-4" />
                  <span>+998 95 774 17 16</span>
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <MessageCircle className="h-4 w-4" />
                  <Link
                    href="https://t.me/RavshanovMuhammaddiyor"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-600"
                  >
                    @RavshanovMuhammaddiyor
                  </Link>
                </div>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <MapPin className="h-4 w-4" />
                  <span>Toshkent, O'zbekiston</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-gray-600">
            <p>&copy; {new Date().getFullYear()} MahalliyMarket. Barcha huquqlar himoyalangan.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
