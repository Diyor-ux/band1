"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Star, MapPin, Clock, Phone, Heart, ShoppingCart } from "lucide-react"

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

interface Store {
  id: number
  name: string
  address: string
  phone: string
  hours: string
  rating: number
}

interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [isReserved, setIsReserved] = useState(false)

  const stores: Store[] = [
    {
      id: 1,
      name: "Oila noni",
      address: "Toshkent sh., Yunusobod t.",
      phone: "+998 90 123 45 67",
      hours: "06:00 - 22:00",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Fermer mahsulotlari",
      address: "Toshkent sh., Chilonzor t.",
      phone: "+998 90 987 65 43",
      hours: "07:00 - 21:00",
      rating: 4.9,
    },
    {
      id: 3,
      name: "Yashil bog'",
      address: "Toshkent sh., Mirzo Ulug'bek t.",
      phone: "+998 90 555 44 33",
      hours: "08:00 - 20:00",
      rating: 4.7,
    },
  ]

  if (!product) return null

  const store = stores.find((s) => s.id === product.storeId)

  const handleReserve = () => {
    if (product.available && !isReserved) {
      setIsReserved(true)
      // Bu yerda API chaqiruvi bo'lishi kerak
      setTimeout(() => {
        alert(`${quantity} ${product.unit} ${product.name} muvaffaqiyatli band qilindi!`)
        onClose()
      }, 500)
    }
  }

  const totalPrice = Number.parseInt(product.price.replace(",", "")) * quantity

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-black">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={500}
              height={400}
              className="w-full h-80 object-cover rounded-lg"
            />
            {product.discount && (
              <Badge className="absolute top-4 left-4 bg-green-600 text-white text-lg px-3 py-1">
                -{product.discount}%
              </Badge>
            )}
            <Button variant="ghost" size="icon" className="absolute top-4 right-4 bg-white/80 hover:bg-white">
              <Heart className="w-5 h-5" />
            </Button>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Rating and Category */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{product.rating}</span>
                <span className="text-gray-500">reyting</span>
              </div>
              <Badge variant="outline" className="border-green-600 text-green-600">
                {product.category}
              </Badge>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-green-600">{product.price} so'm</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-400 line-through">{product.originalPrice} so'm</span>
                )}
                <span className="text-gray-500">/{product.unit}</span>
              </div>
              {product.discount && (
                <p className="text-sm text-green-600 font-medium">
                  {product.discount}% chegirma! Tejovingiz:{" "}
                  {product.originalPrice
                    ? Number.parseInt(product.originalPrice.replace(",", "")) -
                      Number.parseInt(product.price.replace(",", ""))
                    : 0}{" "}
                  so'm
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <h4 className="font-semibold text-black mb-2">Mahsulot haqida</h4>
              <p className="text-gray-600">{product.description}</p>
            </div>

            {/* Stock */}
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-sm text-gray-600">Omborda mavjud:</span>
              <span className="font-semibold text-black">
                {product.inStock} {product.unit}
              </span>
            </div>

            {/* Quantity Selector */}
            {product.available && (
              <div className="space-y-3">
                <h4 className="font-semibold text-black">Miqdorni tanlang</h4>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10"
                  >
                    -
                  </Button>
                  <span className="text-xl font-medium w-16 text-center">
                    {quantity} {product.unit}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.min(product.inStock, quantity + 1))}
                    className="w-10 h-10"
                  >
                    +
                  </Button>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-black">Jami: {totalPrice.toLocaleString()} so'm</p>
                </div>
              </div>
            )}

            {/* Reserve Button */}
            <Button
              className={`w-full py-3 text-lg ${
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
                  ? "✓ Muvaffaqiyatli band qilindi"
                  : `${quantity} ${product.unit} band qilish`}
            </Button>
          </div>
        </div>

        {/* Store Information */}
        {store && (
          <div className="mt-8 p-6 bg-green-50 rounded-lg">
            <h4 className="font-semibold text-black mb-4">Do'kon ma'lumotlari</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <ShoppingCart className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-black">{store.name}</p>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600">{store.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">{store.address}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">{store.phone}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-gray-600">{store.hours}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
