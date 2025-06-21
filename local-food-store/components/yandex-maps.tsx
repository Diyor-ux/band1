"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Clock, Star, X, Navigation, Search, RefreshCw } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Store {
  name: string
  address: string
  phone: string
  hours: string
  rating: number
  coordinates: { lat: number; lng: number }
}

interface YandexMapsProps {
  stores: Store[]
}

declare global {
  interface Window {
    ymaps: any
  }
}

export default function YandexMaps({ stores }: YandexMapsProps) {
  const [selectedStore, setSelectedStore] = useState<Store | null>(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])

  // Filtrlanган do'konlar
  const filteredStores = stores.filter((store) => {
    const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDistrict = selectedDistrict === "all" || store.address.includes(selectedDistrict)
    return matchesSearch && matchesDistrict
  })

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
    { value: "Mirobod", label: "Mirobod" },
    { value: "Hamza", label: "Hamza" },
  ]

  // Fullscreen mode uchun escape key va body scroll
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isFullscreen) {
        setIsFullscreen(false)
      }
    }

    if (isFullscreen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isFullscreen])

  useEffect(() => {
    // Yandex Maps API ni yuklash
    if (!window.ymaps) {
      const script = document.createElement("script")
      script.src = "https://api-maps.yandex.ru/2.1/?apikey=YOUR_API_KEY&lang=uz_UZ"
      script.async = true
      script.onload = () => {
        window.ymaps.ready(initializeMap)
      }
      document.head.appendChild(script)
    } else {
      window.ymaps.ready(initializeMap)
    }
  }, [])

  // Harita yangilanganda markerlarni qayta yaratish
  useEffect(() => {
    if (mapInstanceRef.current && isMapLoaded) {
      updateMapMarkers()
    }
  }, [filteredStores, isMapLoaded])

  const initializeMap = () => {
    if (!mapRef.current || !window.ymaps) return

    const map = new window.ymaps.Map(mapRef.current, {
      center: [41.2995, 69.2401], // Toshkent markazi
      zoom: 11, // Barcha do'konlarni ko'rish uchun zoom kamaytirildi
      controls: ["zoomControl", "fullscreenControl", "geolocationControl", "searchControl"],
    })

    mapInstanceRef.current = map
    setIsMapLoaded(true)
    updateMapMarkers()
  }

  const updateMapMarkers = async () => {
    if (!mapInstanceRef.current || !window.ymaps) return

    setIsRefreshing(true)

    // Eski markerlarni tozalash
    markersRef.current.forEach((marker) => {
      mapInstanceRef.current.geoObjects.remove(marker)
    })
    markersRef.current = []

    // Yangi markerlar qo'shish
    filteredStores.forEach((store, index) => {
      const placemark = new window.ymaps.Placemark(
        [store.coordinates.lat, store.coordinates.lng],
        {
          balloonContentHeader: `<strong style="font-size: 16px; color: #16a34a;">${store.name}</strong>`,
          balloonContentBody: `
            <div style="padding: 12px; max-width: 300px;">
              <div style="margin-bottom: 10px;">
                <strong style="color: #16a34a;">📍 Manzil:</strong><br>
                <span style="color: #666;">${store.address}</span>
              </div>
              <div style="margin-bottom: 10px;">
                <strong style="color: #16a34a;">📞 Telefon:</strong><br>
                <a href="tel:${store.phone.replace(/\s+/g, "")}" style="color: #16a34a; text-decoration: none;">${store.phone}</a>
              </div>
              <div style="margin-bottom: 10px;">
                <strong style="color: #16a34a;">🕒 Ish vaqti:</strong><br>
                <span style="color: #666;">${store.hours}</span>
              </div>
              <div style="margin-bottom: 15px;">
                <strong style="color: #16a34a;">⭐ Reyting:</strong> 
                <span style="color: #f59e0b; font-weight: bold;">${store.rating}</span>
              </div>
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <button onclick="window.selectYandexStore('${store.name}')" 
                  style="background: #16a34a; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 500; font-size: 12px;">
                  📋 Batafsil
                </button>
                <button onclick="window.open('https://yandex.uz/maps/?rtext=~${store.coordinates.lat},${store.coordinates.lng}&rtt=auto', '_blank')"
                  style="background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 500; font-size: 12px;">
                  🧭 Yo'nalish
                </button>
                <button onclick="window.open('/products?store=${index + 1}', '_blank')"
                  style="background: #f59e0b; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 500; font-size: 12px;">
                  🛒 Mahsulotlar
                </button>
              </div>
            </div>
          `,
          balloonContentFooter: `<div style="text-align: center; padding: 8px; background: #f0fdf4; color: #16a34a; font-weight: 500;">Do'kon #${index + 1} • ${store.rating}⭐</div>`,
          hintContent: `${store.name} - ${store.rating}⭐`,
        },
        {
          preset: "islands#greenDotIconWithCaption",
          iconCaption: `${index + 1}`,
          iconCaptionMaxWidth: "50",
        },
      )

      placemark.events.add("click", () => {
        setSelectedStore(store)
      })

      mapInstanceRef.current.geoObjects.add(placemark)
      markersRef.current.push(placemark)
    })

    // Harita ko'rinishini barcha markerlarni qamrab olish uchun sozlash
    if (filteredStores.length > 0) {
      const bounds = []
      filteredStores.forEach((store) => {
        bounds.push([store.coordinates.lat, store.coordinates.lng])
      })
      mapInstanceRef.current.setBounds(bounds, { checkZoomRange: true, zoomMargin: 20 })
    }

    setTimeout(() => setIsRefreshing(false), 1000)
  }

  // Global funksiya do'kon tanlash uchun
  useEffect(() => {
    window.selectYandexStore = (storeName: string) => {
      const store = stores.find((s) => s.name === storeName)
      if (store) {
        setSelectedStore(store)
        setIsFullscreen(true)
      }
    }
  }, [stores])

  const handleStoreSelect = (store: Store) => {
    setSelectedStore(store)
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setCenter([store.coordinates.lat, store.coordinates.lng])
      mapInstanceRef.current.setZoom(15)
    }
  }

  if (isFullscreen) {
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setIsFullscreen(false)
          }
        }}
      >
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-7xl h-full max-h-[95vh] overflow-hidden">
          {/* Header with improved close button */}
          <div className="flex items-center justify-between p-4 border-b border-green-50 bg-white">
            <div>
              <h3 className="text-xl font-bold text-black">Do'konlar haritasi (Yandex Maps)</h3>
              <p className="text-sm text-gray-600">{filteredStores.length} ta do'kon ko'rsatilmoqda</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="border-green-600 text-green-600 hover:bg-green-50"
                onClick={() => updateMapMarkers()}
                disabled={isRefreshing}
              >
                <RefreshCw className={`w-4 h-4 mr-1 ${isRefreshing ? "animate-spin" : ""}`} />
                Yangilash
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setIsFullscreen(false)}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                <X className="w-4 h-4 mr-1" />
                Yopish
              </Button>
            </div>
          </div>

          <div className="flex h-full">
            <div className="flex-1 relative">
              <div ref={mapRef} className="w-full h-full" />

              {/* Floating close button on map */}
              <div className="absolute top-4 right-4 z-10">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setIsFullscreen(false)}
                  className="bg-red-500 hover:bg-red-600 text-white shadow-lg"
                >
                  <X className="w-4 h-4 mr-1" />
                  ESC
                </Button>
              </div>

              {/* Map loading overlay */}
              {isRefreshing && (
                <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Harita yangilanmoqda...</p>
                  </div>
                </div>
              )}
            </div>

            <div className="w-80 bg-green-50 border-l border-green-100 overflow-y-auto">
              {/* Qidiruv va filtrlar */}
              <div className="p-4 border-b border-green-100">
                <div className="space-y-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Do'kon qidirish..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-green-200 focus:border-green-600"
                    />
                  </div>
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
                </div>
              </div>

              {/* Tanlangan do'kon ma'lumotlari */}
              <div className="p-4">
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
                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                          Mahsulotlarni ko'rish
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full border-green-600 text-green-600 hover:bg-green-50"
                          onClick={() => {
                            const url = `https://yandex.uz/maps/?rtext=~${selectedStore.coordinates.lat},${selectedStore.coordinates.lng}&rtt=auto`
                            window.open(url, "_blank")
                          }}
                        >
                          <Navigation className="w-4 h-4 mr-2" />
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
              </div>

              {/* Do'konlar ro'yxati */}
              <div className="p-4 border-t border-green-100">
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-semibold text-black">Do'konlar ro'yxati</h5>
                  <Badge variant="outline" className="border-green-600 text-green-600">
                    {filteredStores.length} ta
                  </Badge>
                </div>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {filteredStores.map((store, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedStore?.name === store.name
                          ? "bg-green-600 text-white"
                          : "bg-white hover:bg-green-100 text-black border border-green-100"
                      }`}
                      onClick={() => handleStoreSelect(store)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{store.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          #{index + 1}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs opacity-75">{store.rating}</span>
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

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="h-96 relative">
        <div ref={mapRef} className="w-full h-full" />

        {!isMapLoaded && (
          <div className="absolute inset-0 bg-green-50 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-600 border-t-transparent mx-auto mb-4"></div>
              <h4 className="text-lg font-semibold text-black mb-2">Yandex harita yuklanmoqda...</h4>
              <p className="text-sm text-gray-600">{stores.length} ta do'kon yuklanmoqda</p>
              <div className="mt-4 bg-white rounded-lg p-3 shadow-sm">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-green-600 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-green-600 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="absolute bottom-4 right-4 space-y-2">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg border border-green-100">
            <div className="flex items-center space-x-3 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse"></div>
                <span className="font-semibold text-black">{stores.length} ta do'kon</span>
              </div>
              <div className="w-px h-4 bg-gray-300"></div>
              <span className="text-gray-600">Jonli harita</span>
            </div>
          </div>
          <Button
            className="w-full bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            onClick={() => setIsFullscreen(true)}
          >
            <Navigation className="w-4 h-4 mr-2" />
            To'liq harita
          </Button>
        </div>
      </div>
    </div>
  )
}
