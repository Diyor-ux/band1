"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Clock, Star, Heart, Package } from "lucide-react"
import YandexMaps from "@/components/yandex-maps"
import { useState, useEffect } from "react"
import ProductModal from "@/components/product-modal"

export default function HomePage() {
  const [reservedCount, setReservedCount] = useState(0)

  useEffect(() => {
    // LocalStorage dan band qilingan mahsulotlar sonini yuklash
    const loadReservedCount = () => {
      try {
        const saved = localStorage.getItem("reservedProducts")
        if (saved) {
          const products = JSON.parse(saved)
          setReservedCount(products.length)
        }
      } catch (error) {
        console.error("Error loading reserved count:", error)
      }
    }

    loadReservedCount()

    // LocalStorage o'zgarishlarini kuzatish
    const handleStorageChange = () => {
      loadReservedCount()
    }

    window.addEventListener("storage", handleStorageChange)

    // Custom event listener for same-tab updates
    window.addEventListener("reservedProductsUpdated", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("reservedProductsUpdated", handleStorageChange)
    }
  }, [])

  const featuredProducts = [
    {
      id: 1,
      name: "Yangi non",
      price: "3,000",
      originalPrice: "3,500",
      image: "/images/products/yangi-non.jpg",
      store: "Oila noni",
      storeId: 1,
      rating: 4.8,
      available: true,
      discount: 15,
      category: "non",
      description: "Har kuni yangi pishirilgan, yumshoq va mazali non. Tabiiy ingredientlardan tayyorlangan.",
      unit: "dona",
      inStock: 50,
    },
    {
      id: 2,
      name: "Toza sut",
      price: "8,000",
      image: "/images/products/toza-sut.jpg",
      store: "Fermer mahsulotlari",
      storeId: 2,
      rating: 4.9,
      available: true,
      category: "sut",
      description: "100% tabiiy fermer suti. Hech qanday qo'shimcha moddalar yo'q.",
      unit: "litr",
      inStock: 25,
    },
    {
      id: 3,
      name: "Qo'y go'shti",
      price: "45,000",
      image: "/images/products/qoy-goshti.jpg",
      store: "Halol go'sht",
      storeId: 5,
      rating: 4.8,
      available: true,
      category: "gosht",
      description: "Yangi qo'y go'shti. Halol va sifatli mahsulot.",
      unit: "kg",
      inStock: 8,
    },
  ]

  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)

  // Barcha 100 ta do'kon ma'lumotlari
  const allStores = [
    // Yunusobod tumani
    {
      name: "Oila noni",
      address: "Yunusobod t., Amir Temur ko'chasi 15",
      phone: "+998 90 123 45 67",
      hours: "06:00 - 22:00",
      rating: 4.8,
      coordinates: { lat: 41.3775, lng: 69.2407 },
    },
    {
      name: "Fermer mahsulotlari",
      address: "Yunusobod t., Bobur ko'chasi 8",
      phone: "+998 90 987 65 43",
      hours: "07:00 - 21:00",
      rating: 4.9,
      coordinates: { lat: 41.3825, lng: 69.2457 },
    },
    {
      name: "Yashil bog'",
      address: "Yunusobod t., Mustaqillik ko'chasi 22",
      phone: "+998 90 555 44 33",
      hours: "08:00 - 20:00",
      rating: 4.7,
      coordinates: { lat: 41.3693, lng: 69.2785 },
    },
    // Chilonzor tumani
    {
      name: "Chilonzor marketi",
      address: "Chilonzor t., Bunyodkor ko'chasi 45",
      phone: "+998 91 234 56 78",
      hours: "08:00 - 23:00",
      rating: 4.6,
      coordinates: { lat: 41.2995, lng: 69.2401 },
    },
    {
      name: "Halol go'sht",
      address: "Chilonzor t., Navoi ko'chasi 12",
      phone: "+998 93 345 67 89",
      hours: "09:00 - 19:00",
      rating: 4.8,
      coordinates: { lat: 41.3045, lng: 69.2351 },
    },
    // Mirzo Ulug'bek tumani
    {
      name: "Mirzo bek marketi",
      address: "Mirzo Ulug'bek t., Universitet ko'chasi 34",
      phone: "+998 94 456 78 90",
      hours: "07:30 - 22:30",
      rating: 4.5,
      coordinates: { lat: 41.3193, lng: 69.2785 },
    },
    {
      name: "Universitet bozori",
      address: "Mirzo Ulug'bek t., Talabalar ko'chasi 67",
      phone: "+998 95 567 89 01",
      hours: "06:00 - 20:00",
      rating: 4.4,
      coordinates: { lat: 41.3243, lng: 69.2835 },
    },
    // Shayxontohur tumani
    {
      name: "Eski shahar marketi",
      address: "Shayxontohur t., Chorsu ko'chasi 89",
      phone: "+998 96 678 90 12",
      hours: "08:00 - 21:00",
      rating: 4.7,
      coordinates: { lat: 41.3267, lng: 69.2401 },
    },
    {
      name: "Chorsu bozori",
      address: "Shayxontohur t., Eski shahar ko'chasi 12",
      phone: "+998 97 789 01 23",
      hours: "05:00 - 19:00",
      rating: 4.9,
      coordinates: { lat: 41.3317, lng: 69.2451 },
    },
    // Bektemir tumani
    {
      name: "Bektemir marketi",
      address: "Bektemir t., Sanoat ko'chasi 45",
      phone: "+998 98 890 12 34",
      hours: "07:00 - 22:00",
      rating: 4.3,
      coordinates: { lat: 41.2067, lng: 69.334 },
    },
    // Qolgan 90 ta do'kon
    ...Array.from({ length: 90 }, (_, i) => ({
      name: `${
        [
          "Mahalla marketi",
          "Yangi do'kon",
          "Oilaviy market",
          "Sifat marketi",
          "Toza mahsulot",
          "Arzon narx",
          "Sog'lom ovqat",
          "Milliy ta'm",
          "Tabiiy mahsulot",
          "Fermer bozori",
          "Mahalliy market",
          "Yangi bozor",
          "Sifatli mahsulot",
          "Toza non",
          "Organik market",
          "Halol ovqat",
          "Mazali mahsulot",
          "Arzon bozor",
          "Sog'liq marketi",
          "Milliy bozor",
        ][i % 20]
      } ${i + 11}`,
      address: `${
        [
          "Yunusobod",
          "Chilonzor",
          "Mirzo Ulug'bek",
          "Shayxontohur",
          "Bektemir",
          "Olmazor",
          "Sergeli",
          "Yakkasaroy",
          "Mirobod",
          "Hamza",
        ][i % 10]
      } t., ${i + 11}-ko'cha ${Math.floor(Math.random() * 100) + 1}`,
      phone: `+998 9${Math.floor(Math.random() * 8) + 1} ${String(Math.floor(Math.random() * 900) + 100)} ${String(
        Math.floor(Math.random() * 90) + 10,
      )} ${String(Math.floor(Math.random() * 90) + 10)}`,
      hours: `${String(Math.floor(Math.random() * 3) + 6).padStart(2, "0")}:00 - ${String(
        Math.floor(Math.random() * 4) + 20,
      ).padStart(2, "0")}:00`,
      rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)),
      coordinates: {
        // Toshkent shahrining haqiqiy koordinatalari oralig'ida
        lat: 41.2 + Math.random() * 0.35, // 41.2 dan 41.55 gacha
        lng: 69.1 + Math.random() * 0.45, // 69.1 dan 69.55 gacha
      },
    })),
  ]

  // Asosiy sahifada ko'rsatiladigan do'konlar (faqat birinchi 3 tasi)
  const featuredStores = allStores.slice(0, 3)

  const handleProductClick = (product: any) => {
    setSelectedProduct(product)
    setIsProductModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-green-50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Image src="/images/logo.png" alt="Mahalliy Market Logo" width={32} height={32} className="w-8 h-8" />
              <h1 className="text-xl font-bold text-black">BAND</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="#" className="text-black hover:text-green-600 transition-colors">
                Bosh sahifa
              </Link>
              <Link href="/products" className="text-black hover:text-green-600 transition-colors">
                Mahsulotlar
              </Link>
              <Link href="/stores" className="text-black hover:text-green-600 transition-colors">
                Do'konlar
              </Link>
              <Link href="#" className="text-black hover:text-green-600 transition-colors">
                Aloqa
              </Link>
            </nav>
            <div className="flex items-center space-x-3">
              <Link href="/reserved">
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 relative">
                  <Package className="w-4 h-4 mr-2" />
                  Band qilingan
                  {reservedCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 min-w-[20px] h-5 flex items-center justify-center rounded-full">
                      {reservedCount}
                    </Badge>
                  )}
                </Button>
              </Link>
              <Button className="bg-green-600 hover:bg-green-700 text-white">Kirish</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-green-100 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-bold text-black leading-tight">
                  Mahalliy mahsulotlarni
                  <span className="text-green-600"> oldindan band qiling</span>
                </h2>
                <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
                  Eng yangi va sifatli mahsulotlarni do'konlardan oldindan buyurtma qiling. Vaqtingizni tejang va kerakli mahsulotlaringizni kafolatlang.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                  Hoziroq buyurtma bering
                </Button>
                <Button
                  variant="outline"
                  className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
                >
                  Do'konlarni ko'ring
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-green-600">100+</div>
                  <div className="text-sm text-gray-600">Do'konlar</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-green-600">500+</div>
                  <div className="text-sm text-gray-600">Mahsulotlar</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl lg:text-3xl font-bold text-green-600">24/7</div>
                  <div className="text-sm text-gray-600">Xizmat</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <Image
                  src="/images/hero-image.png"
                  alt="Mahalliy mahsulotlar va mobil ilova"
                  width={600}
                  height={500}
                  className="w-full h-auto max-w-lg mx-auto"
                  priority
                />
              </div>

              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-200/20 to-green-300/20 rounded-full blur-3xl transform -rotate-6 scale-110"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-black mb-4">Tavsiya etilgan mahsulotlar</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Eng mashhur va sifatli mahsulotlarimiz - mijozlarimiz tomonidan eng ko'p tanlanadi
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="border border-green-50 hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => handleProductClick(product)}
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {product.discount && (
                      <Badge className="absolute top-3 left-3 bg-green-600 text-white text-sm px-3 py-1">
                        -{product.discount}%
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 bg-white/90 hover:bg-white shadow-md"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <CardTitle className="text-xl text-black">{product.name}</CardTitle>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{product.store}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-green-600">{product.price} so'm</span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-400 line-through">{product.originalPrice} so'm</span>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button
                    className={`w-full py-3 text-lg font-semibold ${
                      product.available
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={!product.available}
                  >
                    {product.available ? "Band qilish" : "Mavjud emas"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/products">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                Barcha mahsulotlarni ko'rish
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stores Section */}
      <section className="bg-green-50 py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-black mb-4">Bizning do'konlarimiz</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
       Hamkor do'konlarimiz joylashgan 100+ do'konlarimizdan eng yaqiningizni tanlang
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredStores.map((store, index) => (
              <Card
                key={index}
                className="bg-white border border-green-100 hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <CardTitle className="text-black flex items-center justify-between">
                    {store.name}
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{store.rating}</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{store.address}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Phone className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{store.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{store.hours}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/stores" className="w-full">
                    <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50 py-3">
                      Mahsulotlarni ko'rish
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/stores">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                Barcha do'konlarni ko'rish (100+)
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Map Section - Barcha 100 ta do'kon bilan */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-black mb-4">Do'konlarning joylashuvi</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Yandex haritasida bizning barcha 100 ta do'konimizni toping va eng yaqiningizni tanlang
            </p>
          </div>
          <YandexMaps stores={allStores} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">Bugun buyurtma berishni boshlang</h3>
          <p className="text-lg lg:text-xl text-green-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Mahalliy do'konlarimizdan eng yangi mahsulotlarni oldindan band qiling va vaqtingizni tejab, sifatli
            xizmatdan foydalaning. Bir necha daqiqada buyurtma bering!
          </p>
          <Button className="bg-white text-green-600 hover:bg-green-50 px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            Hoziroq boshlash
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Image src="/images/logo.png" alt="Mahalliy Market Logo" width={32} height={32} className="w-8 h-8" />
                <h4 className="text-xl font-bold">BAND</h4>
              </div>
              <p className="text-gray-400">Mahalliy mahsulotlarni band qilish xizmati</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Xizmatlar</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-green-400 transition-colors">
                    Mahsulot bandi
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-400 transition-colors">
                    Yetkazib berish
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-400 transition-colors">
                    Do'kon qidirish
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Kompaniya</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-green-400 transition-colors">
                    Biz haqimizda
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-400 transition-colors">
                    Aloqa
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-green-400 transition-colors">
                    Yordam
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Aloqa</h5>
              <div className="space-y-2 text-gray-400">
                <p>+998 95 774 17 16</p>
                <p>Ravshanov Muhammaddiyor</p>
                <p>Toshkent, O'zbekiston</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 Mahalliy Market. Barcha huquqlar himoyalangan.</p>
          </div>
        </div>
      </footer>
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
      />
    </div>
  )
}
