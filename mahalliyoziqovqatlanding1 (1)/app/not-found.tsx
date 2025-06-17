"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
      <div className="text-center space-y-6 p-8">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-gray-900">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700">Sahifa topilmadi</h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki ko'chirilgan.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Bosh sahifaga qaytish
            </Link>
          </Button>

          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Orqaga qaytish
          </Button>
        </div>

        <div className="text-sm text-gray-500">
          <p>Agar muammo davom etsa, biz bilan bog'laning:</p>
          <Link
            href="https://t.me/RavshanovMuhammaddiyor"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:underline"
          >
            @RavshanovMuhammaddiyor
          </Link>
        </div>
      </div>
    </div>
  )
}
