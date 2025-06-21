"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MapPin, Clock, Phone, Users, ShoppingCart, Navigation, Heart } from "lucide-react"

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

interface StoreModalProps {
  store: Store | null
  isOpen: boolean
  onClose: () => void
}

export default function StoreModal({ store, isOpen, onClose }: StoreModalProps) {
  const [activeTab, setActiveTab] = useState("info")

  if (!store) return null

  const sampleProducts = [
    { id: 1, name: "Yangi non", price: "3,000", image: "/placeholder.svg?height=100&width=100" },
    { id: 2, name: "Toza sut", price: "8,000", image: "/placeholder.svg?height=100&width=100" },
    { id: 3, name: "Organik sabzavot", price: "12,000", image: "/placeholder.svg?height=100&width=100" },
  ]

  const sampleReviews = [
    {
      id: 1,
      name: "Aziz Karimov",
      rating: 5,
      comment: "Juda yaxshi xizmat va sifatli mahsulotlar!",
      date: "2024-01-15",
    },
    { id: 2, name: "Malika Tosheva", rating: 4, comment: "Arzon narxlar va toza mahsulotlar", date: "2024-01-10" },
    { id: 3, name: "Bobur Aliyev", rating: 5, comment: "Har doim yangi mahsulotlar bor", date: "2024-01-08" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-black">{store.name}</DialogTitle>
            <div className="flex items-center space-x-2">
              <Badge className={`${store.isOpen ? "bg-green-600" : "bg-red-500"} text-white`}>
                {store.isOpen ? "Ochiq" : "Yopiq"}
              </Badge>
              {store.deliveryAvailable && <Badge className="bg-blue-600 text-white">Yetkazib berish</Badge>}
            </div>
          </div>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8 mb-6">
          {/* Store Image */}
          <div className="relative">
            <Image
              src={store.image || "/placeholder.svg"}
              alt={store.name}
              width={500}
              height={300}
              className="w-full h-64 object-cover rounded-lg"
            />
            <Button variant="ghost" size="icon" className="absolute top-4 right-4 bg-white/80 hover:bg-white">
              <Heart className="w-5 h-5" />
            </Button>
          </div>

          {/* Store Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-lg">{store.rating}</span>
                <span className="text-gray-500">({store.reviewCount} sharh)</span>
              </div>
              <Badge variant="outline" className="border-green-600 text-green-600">
                {store.category}
              </Badge>
            </div>

            <p className="text-gray-600">{store.description}</p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">{store.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">{store.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">{store.hours}</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <ShoppingCart className="w-5 h-5 text-green-600" />
                <span className="font-medium">{store.productsCount} mahsulot</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-green-600" />
                <span className="font-medium">{store.reviewCount} sharh</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button className="bg-green-600 hover:bg-green-700 text-white">Mahsulotlarni ko'rish</Button>
              <Button
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50"
                onClick={() => {
                  const url = `https://yandex.uz/maps/?rtext=~${store.coordinates.lat},${store.coordinates.lng}&rtt=auto`
                  window.open(url, "_blank")
                }}
              >
                <Navigation className="w-4 h-4 mr-2" />
                Yo'nalish
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">Ma'lumot</TabsTrigger>
            <TabsTrigger value="products">Mahsulotlar</TabsTrigger>
            <TabsTrigger value="reviews">Sharhlar</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="mt-6">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-black mb-3">Do'kon haqida</h4>
                <p className="text-gray-600">{store.description}</p>
              </div>

              <div>
                <h4 className="font-semibold text-black mb-3">Ish vaqti</h4>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Har kuni:</span>
                    <span className="font-medium text-black">{store.hours}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-black mb-3">Xizmatlar</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="border-green-600 text-green-600">
                    Naqd to'lov
                  </Badge>
                  <Badge variant="outline" className="border-green-600 text-green-600">
                    Karta orqali to'lov
                  </Badge>
                  {store.deliveryAvailable && (
                    <Badge variant="outline" className="border-blue-600 text-blue-600">
                      Yetkazib berish
                    </Badge>
                  )}
                  <Badge variant="outline" className="border-green-600 text-green-600">
                    Oldindan buyurtma
                  </Badge>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="products" className="mt-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-black">Mashhur mahsulotlar</h4>
              <div className="grid md:grid-cols-3 gap-4">
                {sampleProducts.map((product) => (
                  <div
                    key={product.id}
                    className="border border-green-100 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={100}
                      height={100}
                      className="w-full h-24 object-cover rounded-lg mb-3"
                    />
                    <h5 className="font-medium text-black mb-1">{product.name}</h5>
                    <p className="text-green-600 font-bold">{product.price} so'm</p>
                  </div>
                ))}
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                Barcha mahsulotlarni ko'rish ({store.productsCount})
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-black">Mijozlar sharhlari</h4>
                <Button variant="outline" size="sm" className="border-green-600 text-green-600 hover:bg-green-50">
                  Sharh yozish
                </Button>
              </div>

              <div className="space-y-4">
                {sampleReviews.map((review) => (
                  <div key={review.id} className="border border-green-100 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-black">{review.name}</span>
                        <div className="flex items-center">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>

              <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                Barcha sharhlarni ko'rish ({store.reviewCount})
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
