"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Heart, Search, Filter, ArrowLeft } from "lucide-react"

interface Product {
  id: number
  name: string
  price: string
  originalPrice?: string
  image: string
  store: string
  storeId: number
  rating: number
  available: boolean
  discount?: number
  category: string
  description: string
  unit: string
  inStock: number
}

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const storeParam = searchParams.get("store")

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStore, setSelectedStore] = useState(storeParam || "all")
  const [sortBy, setSortBy] = useState("name")

  // URL parametridan do'kon ID sini olish
  useEffect(() => {
    if (storeParam) {
      setSelectedStore(storeParam)
    }
  }, [storeParam])

  // allProducts massivini to'liq yangilayman - barcha 100 ta do'kon uchun mahsulotlar bilan

  const allProducts: Product[] = [
    // Oila noni (ID: 1) mahsulotlari
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
      name: "Oq non",
      price: "2,500",
      image: "/images/products/oq-non.jpg",
      store: "Oila noni",
      storeId: 1,
      rating: 4.6,
      available: true,
      category: "non",
      description: "Klassik oq non, yumshoq va mazali.",
      unit: "dona",
      inStock: 30,
    },
    {
      id: 3,
      name: "Qora non",
      price: "4,000",
      image: "/images/products/qora-non.jpg",
      store: "Oila noni",
      storeId: 1,
      rating: 4.7,
      available: true,
      category: "non",
      description: "Sog'lom qora non, tolaga boy.",
      unit: "dona",
      inStock: 25,
    },
    {
      id: 4,
      name: "Pirog",
      price: "15,000",
      image: "/images/products/pirog.jpg",
      store: "Oila noni",
      storeId: 1,
      rating: 4.9,
      available: true,
      category: "shirinlik",
      description: "Go'sht bilan pirog, issiq holda.",
      unit: "dona",
      inStock: 12,
    },
    {
      id: 5,
      name: "Kulcha",
      price: "5,000",
      image: "/images/products/kulcha.jpg",
      store: "Oila noni",
      storeId: 1,
      rating: 4.5,
      available: true,
      category: "non",
      description: "An'anaviy o'zbek kulchasi.",
      unit: "dona",
      inStock: 20,
    },

    // Fermer mahsulotlari (ID: 2) mahsulotlari
    {
      id: 6,
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
      id: 7,
      name: "Tvorog",
      price: "15,000",
      originalPrice: "18,000",
      image: "/images/products/tvorog.jpg",
      store: "Fermer mahsulotlari",
      storeId: 2,
      rating: 4.8,
      available: true,
      discount: 17,
      category: "sut",
      description: "Yangi tayyorlangan tvorog. Protein va kaltsiyga boy.",
      unit: "kg",
      inStock: 20,
    },
    {
      id: 8,
      name: "Qaymoq",
      price: "25,000",
      image: "/images/products/qaymoq.jpg",
      store: "Fermer mahsulotlari",
      storeId: 2,
      rating: 4.7,
      available: true,
      category: "sut",
      description: "Tabiiy qaymoq, 20% yog'lilik.",
      unit: "kg",
      inStock: 15,
    },
    {
      id: 9,
      name: "Pishloq",
      price: "35,000",
      image: "/images/products/pishloq.jpg",
      store: "Fermer mahsulotlari",
      storeId: 2,
      rating: 4.6,
      available: true,
      category: "sut",
      description: "Mahalliy pishloq, yumshoq va mazali.",
      unit: "kg",
      inStock: 10,
    },
    {
      id: 10,
      name: "Mahalliy asal",
      price: "25,000",
      image: "/images/products/asal.jpg",
      store: "Fermer mahsulotlari",
      storeId: 2,
      rating: 4.9,
      available: true,
      category: "asal",
      description: "Tog'lardan olingan sof tabiiy asal. Foydali xususiyatlarga boy.",
      unit: "kg",
      inStock: 15,
    },

    // Yashil bog' (ID: 3) mahsulotlari
    {
      id: 11,
      name: "Organik sabzavotlar",
      price: "12,000",
      image: "/images/products/sabzavotlar.jpg",
      store: "Yashil bog'",
      storeId: 3,
      rating: 4.7,
      available: true,
      category: "sabzavot",
      description: "Organik usulda yetishtirilen yangi sabzavotlar to'plami.",
      unit: "kg",
      inStock: 30,
    },
    {
      id: 12,
      name: "Pomidor",
      price: "8,000",
      image: "/images/products/pomidor.jpg",
      store: "Yashil bog'",
      storeId: 3,
      rating: 4.5,
      available: true,
      category: "sabzavot",
      description: "Yangi pomidor, vitamin C ga boy.",
      unit: "kg",
      inStock: 45,
    },
    {
      id: 13,
      name: "Bodring",
      price: "6,000",
      image: "/images/products/bodring.jpg",
      store: "Yashil bog'",
      storeId: 3,
      rating: 4.4,
      available: true,
      category: "sabzavot",
      description: "Yangi bodring, salat uchun ideal.",
      unit: "kg",
      inStock: 30,
    },
    {
      id: 14,
      name: "Karam",
      price: "5,000",
      image: "/images/products/karam.jpg",
      store: "Yashil bog'",
      storeId: 3,
      rating: 4.3,
      available: true,
      category: "sabzavot",
      description: "Yangi karam, vitamin K ga boy.",
      unit: "kg",
      inStock: 25,
    },
    {
      id: 15,
      name: "Sabzi",
      price: "4,000",
      image: "/images/products/sabzi.jpg",
      store: "Yashil bog'",
      storeId: 3,
      rating: 4.6,
      available: true,
      category: "sabzavot",
      description: "Yangi sabzi, osh uchun zarur.",
      unit: "kg",
      inStock: 40,
    },

    // Chilonzor marketi (ID: 4) mahsulotlari
    {
      id: 16,
      name: "Guruch",
      price: "12,000",
      image: "/images/products/yangi-non.jpg",
      store: "Chilonzor marketi",
      storeId: 4,
      rating: 4.5,
      available: true,
      category: "don",
      description: "Sifatli oq guruch, osh uchun ideal.",
      unit: "kg",
      inStock: 100,
    },
    {
      id: 17,
      name: "Makaron",
      price: "8,000",
      image: "/images/products/oq-non.jpg",
      store: "Chilonzor marketi",
      storeId: 4,
      rating: 4.3,
      available: true,
      category: "don",
      description: "Italiya makaron, turli shakllarda.",
      unit: "kg",
      inStock: 50,
    },
    {
      id: 18,
      name: "Yog'",
      price: "18,000",
      image: "/images/products/qaymoq.jpg",
      store: "Chilonzor marketi",
      storeId: 4,
      rating: 4.4,
      available: true,
      category: "yog",
      description: "Tabiiy o'simlik yog'i.",
      unit: "litr",
      inStock: 30,
    },

    // Halol go'sht (ID: 5) mahsulotlari
    {
      id: 19,
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
    {
      id: 20,
      name: "Mol go'shti",
      price: "40,000",
      image: "/images/products/mol-goshti.jpg",
      store: "Halol go'sht",
      storeId: 5,
      rating: 4.7,
      available: true,
      category: "gosht",
      description: "Sifatli mol go'shti, halol.",
      unit: "kg",
      inStock: 12,
    },
    {
      id: 21,
      name: "Tovuq go'shti",
      price: "25,000",
      image: "/images/products/tovuq-goshti.jpg",
      store: "Halol go'sht",
      storeId: 5,
      rating: 4.6,
      available: true,
      category: "gosht",
      description: "Yangi tovuq go'shti, halol.",
      unit: "kg",
      inStock: 15,
    },
    {
      id: 22,
      name: "Qiyma go'sht",
      price: "38,000",
      image: "/images/products/qiyma.jpg",
      store: "Halol go'sht",
      storeId: 5,
      rating: 4.5,
      available: true,
      category: "gosht",
      description: "Yangi qiyma go'sht, manti va chuchvara uchun.",
      unit: "kg",
      inStock: 10,
    },
    {
      id: 23,
      name: "Mol jigari",
      price: "20,000",
      image: "/images/products/jigar.jpg",
      store: "Halol go'sht",
      storeId: 5,
      rating: 4.4,
      available: true,
      category: "gosht",
      description: "Yangi mol jigari, vitamin A ga boy.",
      unit: "kg",
      inStock: 6,
    },
    {
      id: 24,
      name: "Kolbasa",
      price: "35,000",
      image: "/images/products/kolbasa.jpg",
      store: "Halol go'sht",
      storeId: 5,
      rating: 4.3,
      available: true,
      category: "gosht",
      description: "Halol kolbasa, mahalliy ishlab chiqarish.",
      unit: "kg",
      inStock: 20,
    },
    {
      id: 25,
      name: "Baliq",
      price: "30,000",
      image: "/images/products/baliq.jpg",
      store: "Halol go'sht",
      storeId: 5,
      rating: 4.7,
      available: true,
      category: "baliq",
      description: "Yangi baliq, omega-3 ga boy.",
      unit: "kg",
      inStock: 12,
    },

    // Qolgan 95 ta do'kon uchun har biriga 8-10 tadan mahsulot
    ...Array.from({ length: 95 * 8 }, (_, i) => {
      const storeIndex = Math.floor(i / 8) + 6 // 6 dan 100 gacha do'kon ID lari
      const productIndex = i % 8

      const storeNames = [
        "Mirzo bek marketi",
        "Universitet bozori",
        "Eski shahar marketi",
        "Chorsu bozori",
        "Bektemir marketi",
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
      ]

      const productTemplates = [
        {
          name: "Yangi non",
          category: "non",
          price: "3000",
          image: "/images/products/yangi-non.jpg",
          unit: "dona",
          desc: "Har kuni yangi pishirilgan non",
        },
        {
          name: "Toza sut",
          category: "sut",
          price: "8000",
          image: "/images/products/toza-sut.jpg",
          unit: "litr",
          desc: "100% tabiiy fermer suti",
        },
        {
          name: "Yangi sabzavot",
          category: "sabzavot",
          price: "6000",
          image: "/images/products/sabzavotlar.jpg",
          unit: "kg",
          desc: "Organik sabzavotlar to'plami",
        },
        {
          name: "Pomidor",
          category: "sabzavot",
          price: "7000",
          image: "/images/products/pomidor.jpg",
          unit: "kg",
          desc: "Yangi pomidor, vitamin C ga boy",
        },
        {
          name: "Go'sht",
          category: "gosht",
          price: "35000",
          image: "/images/products/qoy-goshti.jpg",
          unit: "kg",
          desc: "Halol go'sht mahsuloti",
        },
        {
          name: "Baliq",
          category: "baliq",
          price: "28000",
          image: "/images/products/baliq.jpg",
          unit: "kg",
          desc: "Yangi baliq, omega-3 ga boy",
        },
        {
          name: "Asal",
          category: "asal",
          price: "22000",
          image: "/images/products/asal.jpg",
          unit: "kg",
          desc: "Tabiiy tog' asali",
        },
        {
          name: "Tvorog",
          category: "sut",
          price: "16000",
          image: "/images/products/tvorog.jpg",
          unit: "kg",
          desc: "Yangi tvorog, protein ga boy",
        },
      ]

      const template = productTemplates[productIndex]
      const storeName = storeNames[(storeIndex - 6) % storeNames.length] + ` ${storeIndex}`

      return {
        id: 26 + i,
        name: `${template.name} ${storeIndex}`,
        price: (Number(template.price) + Math.floor(Math.random() * 2000)).toString(),
        originalPrice:
          Math.random() > 0.7
            ? (Number(template.price) + 2000 + Math.floor(Math.random() * 3000)).toString()
            : undefined,
        image: template.image,
        store: storeName,
        storeId: storeIndex,
        rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)),
        available: Math.random() > 0.05, // 95% mahsulotlar mavjud
        discount: Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 10 : undefined,
        category: template.category,
        description: template.desc + ` - ${storeName}dan`,
        unit: template.unit,
        inStock: Math.floor(Math.random() * 50) + 10,
      }
    }),
  ]

  // Do'konlar ro'yxatini ham yangilayman - barcha 100 ta do'kon
  const stores = [
    { id: 1, name: "Oila noni" },
    { id: 2, name: "Fermer mahsulotlari" },
    { id: 3, name: "Yashil bog'" },
    { id: 4, name: "Chilonzor marketi" },
    { id: 5, name: "Halol go'sht" },
    { id: 6, name: "Mirzo bek marketi 6" },
    { id: 7, name: "Universitet bozori 7" },
    { id: 8, name: "Eski shahar marketi 8" },
    { id: 9, name: "Chorsu bozori 9" },
    { id: 10, name: "Bektemir marketi 10" },
    ...Array.from({ length: 90 }, (_, i) => {
      const storeNames = [
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
      ]
      const storeId = i + 11
      return {
        id: storeId,
        name: `${storeNames[i % storeNames.length]} ${storeId}`,
      }
    }),
  ]

  const categories = [
    { value: "all", label: "Barcha kategoriyalar" },
    { value: "non", label: "Non mahsulotlari" },
    { value: "sut", label: "Sut mahsulotlari" },
    { value: "sabzavot", label: "Sabzavotlar" },
    { value: "gosht", label: "Go'sht mahsulotlari" },
    { value: "baliq", label: "Baliq mahsulotlari" },
    { value: "asal", label: "Asal va shirinliklar" },
    { value: "shirinlik", label: "Shirinliklar" },
    { value: "don", label: "Don mahsulotlari" },
    { value: "yog", label: "Yog' mahsulotlari" },
    { value: "meva", label: "Mevalar" },
  ]

  const filteredProducts = allProducts
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
      const matchesStore = selectedStore === "all" || product.storeId.toString() === selectedStore
      return matchesSearch && matchesCategory && matchesStore
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price":
          return Number.parseInt(a.price.replace(",", "")) - Number.parseInt(b.price.replace(",", ""))
        case "rating":
          return b.rating - a.rating
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

  // Tanlangan do'kon nomi
  const selectedStoreName = stores.find((s) => s.id.toString() === selectedStore)?.name || "Barcha do'konlar"

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-green-50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/stores" className="flex items-center space-x-2 text-green-600 hover:text-green-700">
                <ArrowLeft className="w-5 h-5" />
                <span>Do'konlarga qaytish</span>
              </Link>
              <div className="flex items-center space-x-2">
                <Image src="/images/logo.png" alt="Mahalliy Market Logo" width={32} height={32} className="w-8 h-8" />
                <div>
                  <h1 className="text-xl font-bold text-black">BAND</h1>
                  {selectedStore !== "all" && <p className="text-sm text-gray-600">{selectedStoreName}</p>}
                </div>
              </div>
            </div>
            <Button className="bg-green-600 hover:bg-green-700 text-white">Savatcha (0)</Button>
          </div>
        </div>
      </header>

      {/* Store Info Banner */}
      {selectedStore !== "all" && (
        <section className="bg-green-50 py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-black">{selectedStoreName}</h2>
                <p className="text-sm text-gray-600">{filteredProducts.length} ta mahsulot mavjud</p>
              </div>
              <Button
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50"
                onClick={() => setSelectedStore("all")}
              >
                Barcha do'konlarni ko'rish
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Debug info - faqat development uchun */}
      {process.env.NODE_ENV === "development" && (
        <div className="bg-yellow-50 border border-yellow-200 p-4 m-4 rounded">
          <p className="text-sm">
            <strong>Debug:</strong> Store param: {storeParam}, Selected store: {selectedStore}, Total products:{" "}
            {allProducts.length}, Filtered: {filteredProducts.length}
          </p>
        </div>
      )}

      {/* Filters */}
      <section className="bg-green-50 py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Mahsulot qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-green-200 focus:border-green-600"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="border-green-200 focus:border-green-600">
                <SelectValue placeholder="Kategoriya" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStore} onValueChange={setSelectedStore}>
              <SelectTrigger className="border-green-200 focus:border-green-600">
                <SelectValue placeholder="Do'kon" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Barcha do'konlar</SelectItem>
                {stores.map((store) => (
                  <SelectItem key={store.id} value={store.id.toString()}>
                    {store.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="border-green-200 focus:border-green-600">
                <SelectValue placeholder="Saralash" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nomi bo'yicha</SelectItem>
                <SelectItem value="price">Narxi bo'yicha</SelectItem>
                <SelectItem value="rating">Reyting bo'yicha</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-gray-600">
              <span className="font-semibold text-black">{filteredProducts.length}</span> ta mahsulot topildi
              {selectedStore !== "all" && <span className="text-green-600"> - {selectedStoreName}</span>}
            </p>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">Filtrlar</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">Mahsulot topilmadi</h3>
              <p className="text-gray-600 mb-4">
                {selectedStore !== "all"
                  ? `${selectedStoreName} do'konida mahsulot topilmadi`
                  : "Qidiruv shartlaringizni o'zgartiring yoki filtrlarni tozalang"}
              </p>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="border-green-600 text-green-600 hover:bg-green-50"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("all")
                    setSelectedStore("all")
                  }}
                >
                  Barcha filtrlarni tozalash
                </Button>
                <br />
                <Link href="/stores">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">Do'konlarga qaytish</Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

function ProductCard({ product }: { product: Product }) {
  const [isReserved, setIsReserved] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [imageError, setImageError] = useState(false)

  const handleReserve = () => {
    if (product.available && !isReserved) {
      setIsReserved(true)

      // Band qilingan mahsulotni localStorage ga saqlash
      const reservedProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        store: product.store,
        storeId: product.storeId,
        rating: product.rating,
        category: product.category,
        description: product.description,
        unit: product.unit,
        quantity: quantity,
        totalPrice: Number.parseInt(product.price.replace(",", "")) * quantity,
        reservedAt: new Date().toISOString(),
        reservationId: `${product.id}-${Date.now()}`,
        storePhone: "+998 90 123 45 67", // Bu yerda real do'kon telefoni bo'lishi kerak
        storeAddress: "Do'kon manzili", // Bu yerda real do'kon manzili bo'lishi kerak
      }

      try {
        const existingReserved = localStorage.getItem("reservedProducts")
        const reservedProducts = existingReserved ? JSON.parse(existingReserved) : []
        reservedProducts.push(reservedProduct)
        localStorage.setItem("reservedProducts", JSON.stringify(reservedProducts))

        // Custom event dispatch qilish
        window.dispatchEvent(new Event("reservedProductsUpdated"))

        setTimeout(() => {
          alert(`${quantity} ${product.unit} ${product.name} muvaffaqiyatli band qilindi!`)
        }, 500)
      } catch (error) {
        console.error("Error saving reserved product:", error)
        alert("Xatolik yuz berdi. Qaytadan urinib ko'ring.")
      }
    }
  }

  return (
    <Card className="border border-green-50 hover:shadow-lg transition-all duration-300 group">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden">
          <Image
            src={imageError ? "/placeholder.svg?height=200&width=300" : product.image}
            alt={product.name}
            width={300}
            height={200}
            className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
          {product.discount && (
            <Badge className="absolute top-2 left-2 bg-green-600 text-white">-{product.discount}%</Badge>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Heart className="w-4 h-4" />
          </Button>
          {!product.available && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <Badge variant="secondary" className="bg-red-100 text-red-800">
                Mavjud emas
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <CardTitle className="text-lg text-black line-clamp-1">{product.name}</CardTitle>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600">{product.rating}</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-2">{product.store}</p>
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{product.description}</p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-green-600">{product.price} so'm</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">{product.originalPrice} so'm</span>
            )}
          </div>
          <span className="text-xs text-gray-500">/{product.unit}</span>
        </div>

        {product.available && (
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">Miqdor:</span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="w-8 h-8 p-0"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Button>
              <span className="text-sm font-medium w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="sm"
                className="w-8 h-8 p-0"
                onClick={() => setQuantity(Math.min(product.inStock, quantity + 1))}
              >
                +
              </Button>
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500 mb-3">
          Omborda:{" "}
          <span className="font-medium">
            {product.inStock} {product.unit}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className={`w-full ${
            product.available && !isReserved
              ? "bg-green-600 hover:bg-green-700 text-white"
              : isReserved
                ? "bg-green-100 text-green-800 cursor-default"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!product.available}
          onClick={handleReserve}
        >
          {!product.available
            ? "Mavjud emas"
            : isReserved
              ? "✓ Band qilindi"
              : `${quantity} ${product.unit} band qilish`}
        </Button>
      </CardFooter>
    </Card>
  )
}
