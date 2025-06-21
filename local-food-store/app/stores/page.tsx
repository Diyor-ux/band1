"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { ArrowLeft, Clock, MapPin, Phone, Search, ShoppingCart, Star, Users, Navigation } from "lucide-react"

interface Store {
  id: number
  name: string
  category: string
  address: string
  phone: string
  hours: string
  rating: number
  reviewCount: number
  image: string
  description: string
  coordinates: { lat: number; lng: number }
  isOpen: boolean
  deliveryAvailable: boolean
  productsCount: number
}

// 100 ta do'kon ma'lumotlari
const stores: Store[] = [
  // Yunusobod tumani
  {
    id: 1,
    name: "Oila noni",
    category: "non",
    address: "Yunusobod t., Amir Temur ko'chasi 15",
    phone: "+998 90 123 45 67",
    hours: "06:00 - 22:00",
    rating: 4.8,
    reviewCount: 245,
    image: "/placeholder.svg?height=200&width=300",
    description: "Har kuni yangi pishirilgan non va pishiriq mahsulotlari",
    coordinates: { lat: 41.3775, lng: 69.2407 },
    isOpen: true,
    deliveryAvailable: true,
    productsCount: 25,
  },
  {
    id: 2,
    name: "Fermer mahsulotlari",
    category: "sut",
    address: "Yunusobod t., Bobur ko'chasi 8",
    phone: "+998 90 987 65 43",
    hours: "07:00 - 21:00",
    rating: 4.9,
    reviewCount: 189,
    image: "/placeholder.svg?height=200&width=300",
    description: "Tabiiy fermer sut mahsulotlari va organik oziq-ovqat",
    coordinates: { lat: 41.3825, lng: 69.2457 },
    isOpen: true,
    deliveryAvailable: true,
    productsCount: 45,
  },
  {
    id: 3,
    name: "Yashil bog'",
    category: "sabzavot",
    address: "Yunusobod t., Mustaqillik ko'chasi 22",
    phone: "+998 90 555 44 33",
    hours: "08:00 - 20:00",
    rating: 4.7,
    reviewCount: 156,
    image: "/placeholder.svg?height=200&width=300",
    description: "Yangi sabzavot va mevalar, organik mahsulotlar",
    coordinates: { lat: 41.3693, lng: 69.2785 },
    isOpen: false,
    deliveryAvailable: false,
    productsCount: 78,
  },
  // Chilonzor tumani
  {
    id: 4,
    name: "Chilonzor marketi",
    category: "universal",
    address: "Chilonzor t., Bunyodkor ko'chasi 45",
    phone: "+998 91 234 56 78",
    hours: "08:00 - 23:00",
    rating: 4.6,
    reviewCount: 312,
    image: "/placeholder.svg?height=200&width=300",
    description: "Keng assortimentli oziq-ovqat mahsulotlari",
    coordinates: { lat: 41.2995, lng: 69.2401 },
    isOpen: true,
    deliveryAvailable: true,
    productsCount: 156,
  },
  {
    id: 5,
    name: "Halol go'sht",
    category: "gosht",
    address: "Chilonzor t., Navoi ko'chasi 12",
    phone: "+998 93 345 67 89",
    hours: "09:00 - 19:00",
    rating: 4.8,
    reviewCount: 98,
    image: "/placeholder.svg?height=200&width=300",
    description: "Halol go'sht mahsulotlari va kolbasa",
    coordinates: { lat: 41.3045, lng: 69.2351 },
    isOpen: true,
    deliveryAvailable: false,
    productsCount: 32,
  },
  // Qolgan 95 ta do'kon...
  ...Array.from({ length: 95 }, (_, i) => ({
    id: i + 6,
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
      ][i % 10]
    } ${i + 6}`,
    category: ["universal", "non", "sut", "sabzavot", "gosht", "meva", "shirinlik", "organik"][i % 8],
    address: `${
      ["Yunusobod", "Chilonzor", "Mirzo Ulug'bek", "Shayxontohur", "Bektemir", "Olmazor", "Sergeli", "Yakkasaroy"][
        i % 8
      ]
    } t., ${i + 6}-ko'cha ${Math.floor(Math.random() * 100) + 1}`,
    phone: `+998 9${Math.floor(Math.random() * 8) + 1} ${String(Math.floor(Math.random() * 900) + 100)} ${String(
      Math.floor(Math.random() * 90) + 10,
    )} ${String(Math.floor(Math.random() * 90) + 10)}`,
    hours: `${String(Math.floor(Math.random() * 3) + 6).padStart(2, "0")}:00 - ${String(
      Math.floor(Math.random() * 4) + 20,
    ).padStart(2, "0")}:00`,
    rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)),
    reviewCount: Math.floor(Math.random() * 300) + 20,
    image: "/placeholder.svg?height=200&width=300",
    description: `${
      [
        "Sifatli mahsulotlar",
        "Arzon narxlar",
        "Keng assortiment",
        "Toza va yangi",
        "Mahalliy ishlab chiqarish",
        "Organik mahsulotlar",
        "24/7 xizmat",
        "Tez yetkazib berish",
      ][i % 8]
    } va professional xizmat`,
    coordinates: {
      lat: 41.2 + Math.random() * 0.3,
      lng: 69.1 + Math.random() * 0.4,
    },
    isOpen: Math.random() > 0.2,
    deliveryAvailable: Math.random() > 0.3,
    productsCount: Math.floor(Math.random() * 150) + 20,
  })),
]

export default function StoresPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDistrict, setSelectedDistrict] = useState("all")
  const [sortBy, setSortBy] = useState("rating")
  const [showOpenOnly, setShowOpenOnly] = useState(false)

  const categories = [
    { value: "all", label: "Barcha kategoriyalar" },
    { value: "universal", label: "Universal marketlar" },
    { value: "non", label: "Non mahsulotlari" },
    { value: "sut", label: "Sut mahsulotlari" },
    { value: "sabzavot", label: "Sabzavotlar" },
    { value: "gosht", label: "Go'sht mahsulotlari" },
    { value: "meva", label: "Mevalar" },
    { value: "shirinlik", label: "Shirinliklar" },
    { value: "asal", label: "Asal va tabiiy mahsulotlar" },
    { value: "baliq", label: "Baliq mahsulotlari" },
    { value: "organik", label: "Organik mahsulotlar" },
    { value: "bozor", label: "Bozorlar" },
  ]

  const districts = [
    { value: "all", label: "Barcha tumanlar" },
    { value: "Yunusobod", label: "Yunusobod" },
    { value: "Chilonzor", label: "Chilonzor" },
    { value: "Mirzo Ulug'bek", label: "Mirzo Ulug'bek" },
    { value: "Shayxontohur", label: "Shayxontohur" },
    { value: "Bektemir", label: "Bektemir" },
    { value: "Olmazor", label: "Olmazor" },
    { value: "Sergeli", label: "Sergeli" },
    { value: "Yakkasaroy", label: "Yakkasaroy" },
  ]

  const filteredStores = stores
    .filter((store) => {
      const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "all" || store.category === selectedCategory
      const matchesDistrict = selectedDistrict === "all" || store.address.includes(selectedDistrict)
      const matchesOpen = !showOpenOnly || store.isOpen
      return matchesSearch && matchesCategory && matchesDistrict && matchesOpen
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "reviews":
          return b.reviewCount - a.reviewCount
        case "products":
          return b.productsCount - a.productsCount
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-green-50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-green-600 hover:text-green-700">
                <ArrowLeft className="w-5 h-5" />
                <span>Orqaga</span>
              </Link>
              <div className="flex items-center space-x-2">
                <Image src="/images/logo.png" alt="Mahalliy Market Logo" width={32} height={32} className="w-8 h-8" />
                <h1 className="text-xl font-bold text-black">BAND</h1>
              </div>
            </div>
            <Button className="bg-green-600 hover:bg-green-700 text-white">Haritada ko'rish</Button>
          </div>
        </div>
      </header>

      {/* Filters */}
      <section className="bg-green-50 py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-5 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Do'kon qidirish..."
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

            <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
              <SelectTrigger className="border-green-200 focus:border-green-600">
                <SelectValue placeholder="Tuman" />
              </SelectTrigger>
              <SelectContent>
                {districts.map((district) => (
                  <SelectItem key={district.value} value={district.value}>
                    {district.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="border-green-200 focus:border-green-600">
                <SelectValue placeholder="Saralash" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Reyting bo'yicha</SelectItem>
                <SelectItem value="reviews">Sharhlar soni</SelectItem>
                <SelectItem value="products">Mahsulotlar soni</SelectItem>
                <SelectItem value="name">Nomi bo'yicha</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="openOnly"
                checked={showOpenOnly}
                onChange={(e) => setShowOpenOnly(e.target.checked)}
                className="rounded border-green-300 text-green-600 focus:ring-green-500"
              />
              <label htmlFor="openOnly" className="text-sm text-gray-700">
                Faqat ochiq
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              <span className="font-semibold text-black">{filteredStores.length}</span> ta do'kon topildi
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span className="text-sm text-gray-600">Ochiq</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Yopiq</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stores Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredStores.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">Do'kon topilmadi</h3>
              <p className="text-gray-600 mb-4">Qidiruv shartlaringizni o'zgartiring yoki filtrlarni tozalang</p>
              <Button
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedCategory("all")
                  setSelectedDistrict("all")
                  setShowOpenOnly(false)
                }}
              >
                Filtrlarni tozalash
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStores.map((store) => (
                <StoreCard key={store.id} store={store} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

function StoreCard({ store }: { store: Store }) {
  const mapUrl = `https://yandex.uz/maps/?rtext=~${store.coordinates.lat},${store.coordinates.lng}&rtt=auto`

  return (
    <Card className="border border-green-50 hover:shadow-lg transition-all duration-300 group">
      <CardHeader className="p-0">
        <div className="relative overflow-hidden">
          <Image
            src={store.image || "/placeholder.svg"}
            alt={store.name}
            width={300}
            height={200}
            className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2 flex space-x-2">
            <Badge className={`${store.isOpen ? "bg-green-600" : "bg-red-500"} text-white`}>
              {store.isOpen ? "Ochiq" : "Yopiq"}
            </Badge>
            {store.deliveryAvailable && <Badge className="bg-blue-600 text-white">Yetkazib berish</Badge>}
          </div>
          <div className="absolute top-2 right-2">
            <Badge variant="outline" className="bg-white/90 border-green-600 text-green-600">
              {store.category}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <CardTitle className="text-lg text-black line-clamp-1">{store.name}</CardTitle>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{store.rating}</span>
          </div>
        </div>

        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{store.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm line-clamp-1">{store.address}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Phone className="w-4 h-4" />
            <span className="text-sm">{store.phone}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{store.hours}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{store.reviewCount} sharh</span>
          </div>
          <div className="flex items-center space-x-1">
            <ShoppingCart className="w-4 h-4" />
            <span>{store.productsCount} mahsulot</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Mahsulotlarni ko'rish</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem asChild>
              <Link href={`/products?store=${store.id}`}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                <span>Mahsulotlar ({store.productsCount})</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href={mapUrl} target="_blank" rel="noopener noreferrer">
                <Navigation className="mr-2 h-4 w-4" />
                <span>Haritada ko'rish</span>
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <a href={`tel:${store.phone.replace(/\s+/g, "")}`}>
                <Phone className="mr-2 h-4 w-4" />
                <span>Qo'ng'iroq qilish</span>
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  )
}
