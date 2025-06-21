"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, MapPin, Phone, Star, Trash2, Calendar, Package } from "lucide-react"

interface ReservedProduct {
  id: number
  name: string
  price: string
  image: string
  store: string
  storeId: number
  rating: number
  category: string
  description: string
  unit: string
  quantity: number
  totalPrice: number
  reservedAt: string
  reservationId: string
  storePhone: string
  storeAddress: string
}

export default function ReservedProductsPage() {
  const [reservedProducts, setReservedProducts] = useState<ReservedProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // LocalStorage dan band qilingan mahsulotlarni yuklash
    const loadReservedProducts = () => {
      try {
        const saved = localStorage.getItem("reservedProducts")
        if (saved) {
          const products = JSON.parse(saved)
          setReservedProducts(products)
        }
      } catch (error) {
        console.error("Error loading reserved products:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadReservedProducts()
  }, [])

  const removeReservation = (reservationId: string) => {
    const updatedProducts = reservedProducts.filter((p) => p.reservationId !== reservationId)
    setReservedProducts(updatedProducts)
    localStorage.setItem("reservedProducts", JSON.stringify(updatedProducts))
  }

  const getTotalAmount = () => {
    return reservedProducts.reduce((total, product) => total + product.totalPrice, 0)
  }

  const getProductsByStore = () => {
    const grouped = reservedProducts.reduce(
      (acc, product) => {
        if (!acc[product.store]) {
          acc[product.store] = []
        }
        acc[product.store].push(product)
        return acc
      },
      {} as Record<string, ReservedProduct[]>,
    )
    return grouped
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Yuklanmoqda...</p>
        </div>
      </div>
    )
  }

  const productsByStore = getProductsByStore()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-green-50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-green-600 hover:text-green-700">
                <ArrowLeft className="w-5 h-5" />
                <span>Bosh sahifa</span>
              </Link>
              <div className="flex items-center space-x-2">
                <Image src="/images/logo.png" alt="BAND Logo" width={32} height={32} className="w-8 h-8" />
                <div>
                  <h1 className="text-xl font-bold text-black">Band qilingan mahsulotlar</h1>
                  <p className="text-sm text-gray-600">{reservedProducts.length} ta mahsulot</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Jami summa</p>
                <p className="text-lg font-bold text-green-600">{getTotalAmount().toLocaleString()} so'm</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {reservedProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-black mb-2">Hech qanday mahsulot band qilinmagan</h3>
              <p className="text-gray-600 mb-6">
                Mahsulotlarni band qilish uchun do'konlarimizni ko'ring va kerakli mahsulotlarni tanlang
              </p>
              <div className="space-x-4">
                <Link href="/products">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">Mahsulotlarni ko'rish</Button>
                </Link>
                <Link href="/stores">
                  <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
                    Do'konlarni ko'rish
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Summary Card */}
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{reservedProducts.length}</div>
                      <div className="text-sm text-gray-600">Band qilingan mahsulotlar</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{Object.keys(productsByStore).length}</div>
                      <div className="text-sm text-gray-600">Do'konlar soni</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{getTotalAmount().toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Jami summa (so'm)</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Products by Store */}
              {Object.entries(productsByStore).map(([storeName, products]) => (
                <div key={storeName} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-black flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-green-600" />
                      <span>{storeName}</span>
                    </h2>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Phone className="w-4 h-4" />
                        <span>{products[0].storePhone}</span>
                      </div>
                      <Badge variant="outline" className="border-green-600 text-green-600">
                        {products.length} mahsulot
                      </Badge>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((product) => (
                      <ReservedProductCard key={product.reservationId} product={product} onRemove={removeReservation} />
                    ))}
                  </div>

                  <div className="text-right p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      {storeName} jami:
                      <span className="font-bold text-green-600 ml-2">
                        {products.reduce((sum, p) => sum + p.totalPrice, 0).toLocaleString()} so'm
                      </span>
                    </p>
                  </div>
                </div>
              ))}

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4 pt-8">
                <Button
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-50"
                  onClick={() => {
                    if (confirm("Barcha band qilingan mahsulotlarni o'chirmoqchimisiz?")) {
                      setReservedProducts([])
                      localStorage.removeItem("reservedProducts")
                    }
                  }}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Barchasini o'chirish
                </Button>
                <Link href="/products">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">Yana mahsulot qo'shish</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

function ReservedProductCard({
  product,
  onRemove,
}: {
  product: ReservedProduct
  onRemove: (reservationId: string) => void
}) {
  const [imageError, setImageError] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("uz-UZ", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="border border-green-100 hover:shadow-md transition-shadow">
      <CardHeader className="p-0">
        <div className="relative">
          <Image
            src={imageError ? "/placeholder.svg?height=150&width=200" : product.image}
            alt={product.name}
            width={200}
            height={150}
            className="w-full h-32 object-cover rounded-t-lg"
            onError={() => setImageError(true)}
          />
          <Badge className="absolute top-2 left-2 bg-green-600 text-white text-xs">Band qilingan</Badge>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500 hover:text-red-600"
            onClick={() => onRemove(product.reservationId)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-black line-clamp-1">{product.name}</h3>
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-gray-600">{product.rating}</span>
            </div>
          </div>

          <p className="text-xs text-gray-500 line-clamp-2">{product.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">
              {product.quantity} {product.unit}
            </span>
            <span className="text-lg font-bold text-green-600">{product.totalPrice.toLocaleString()} so'm</span>
          </div>

          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(product.reservedAt)}</span>
          </div>

          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            <span>ID: {product.reservationId.slice(-8)}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="w-full space-y-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full border-green-600 text-green-600 hover:bg-green-50"
            onClick={() => {
              const phone = product.storePhone.replace(/\s+/g, "")
              window.open(`tel:${phone}`)
            }}
          >
            <Phone className="w-3 h-3 mr-1" />
            Do'konga qo'ng'iroq
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full text-red-500 border-red-300 hover:bg-red-50"
            onClick={() => onRemove(product.reservationId)}
          >
            <Trash2 className="w-3 h-3 mr-1" />
            Bekor qilish
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
