"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Clock, Star, Navigation, X } from "lucide-react"

interface Store {
  name: string
  address: string
  phone: string
  hours: string
  rating: number
  coordinates: { lat: number; lng: number }
}

interface InteractiveMapProps {
  stores: Store[]
}

export default function InteractiveMap({ stores }: InteractiveMapProps) {
  const [selectedStore, setSelectedStore] = useState<Store | null>(null)
  const [isMapOpen, setIsMapOpen] = useState(false)

  const handleStoreClick = (store: Store) => {
    setSelectedStore(store)
  }

  const handleCloseMap = () => {
    setIsMapOpen(false)
    setSelectedStore(null)
  }

  if (!isMapOpen) {
    return (
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="h-96 bg-gradient-to-br from-green-50 to-green-100 relative">
          {/* Simplified Map View */}
          <div className="absolute inset-0 p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
              {stores.map((store, index) => (
                <div
                  key={index}
                  className="relative bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-green-600"
                  onClick={() => handleStoreClick(store)}
                >
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                    <MapPin className="w-3 h-3 text-white" />
                  </div>
                  <h4 className="font-semibold text-black mb-2">{store.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{store.address}</p>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm text-gray-600">{store.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Center overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm mx-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Navigation className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-black">Interaktiv harita</h4>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Do'konlarimizning aniq joylashuvini ko'rish uchun haritani oching
              </p>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={() => setIsMapOpen(true)}>
                Haritani ochish
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl h-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-green-50">
          <h3 className="text-xl font-bold text-black">Do'konlar haritasi</h3>
          <Button variant="ghost" size="icon" onClick={handleCloseMap}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex h-full">
          {/* Map Area */}
          <div className="flex-1 relative bg-green-50">
            <div className="absolute inset-0 p-8">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 h-full">
                {stores.map((store, index) => (
                  <div
                    key={index}
                    className={`relative bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all cursor-pointer border-2 ${
                      selectedStore?.name === store.name
                        ? "border-green-600 bg-green-50"
                        : "border-transparent hover:border-green-600"
                    }`}
                    onClick={() => handleStoreClick(store)}
                    style={{
                      transform: `translate(${index * 20}px, ${index * 30}px)`,
                    }}
                  >
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <Badge className="mb-2 bg-green-600 text-white">#{index + 1}</Badge>
                    <h4 className="font-semibold text-black mb-1">{store.name}</h4>
                    <p className="text-xs text-gray-600 mb-2">{store.address}</p>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-gray-600">{store.rating}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Grid Lines */}
              <div className="absolute inset-0 opacity-10">
                <div className="grid grid-cols-10 grid-rows-10 h-full">
                  {Array.from({ length: 100 }).map((_, i) => (
                    <div key={i} className="border border-green-600"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Store Details Sidebar */}
          <div className="w-80 bg-green-50 border-l border-green-100 p-6 overflow-y-auto">
            {selectedStore ? (
              <Card className="border-green-200">
                <CardHeader>
                  <CardTitle className="text-black flex items-center justify-between">
                    {selectedStore.name}
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{selectedStore.rating}</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-black">Manzil</p>
                      <p className="text-sm text-gray-600">{selectedStore.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Phone className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-black">Telefon</p>
                      <p className="text-sm text-gray-600">{selectedStore.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-black">Ish vaqti</p>
                      <p className="text-sm text-gray-600">{selectedStore.hours}</p>
                    </div>
                  </div>

                  <div className="pt-4 space-y-2">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Mahsulotlarni ko'rish</Button>
                    <Button variant="outline" className="w-full border-green-600 text-green-600 hover:bg-green-50">
                      Yo'nalishni olish
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="text-center py-8">
                <MapPin className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h4 className="font-semibold text-black mb-2">Do'konni tanlang</h4>
                <p className="text-sm text-gray-600">Batafsil ma'lumot olish uchun haritadan do'konni bosing</p>
              </div>
            )}

            {/* Store List */}
            <div className="mt-6">
              <h5 className="font-semibold text-black mb-3">Barcha do'konlar</h5>
              <div className="space-y-2">
                {stores.map((store, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedStore?.name === store.name
                        ? "bg-green-600 text-white"
                        : "bg-white hover:bg-green-100 text-black"
                    }`}
                    onClick={() => handleStoreClick(store)}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{store.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        #{index + 1}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
