"use client"

import { useEffect, useRef } from "react"

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Try to play the video when component mounts
    if (videoRef.current) {
      const playPromise = videoRef.current.play()

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Video started playing successfully
            console.log("Video is playing")
          })
          .catch((error) => {
            // Auto-play was prevented
            console.log("Auto-play was prevented:", error)
          })
      }
    }
  }, [])

  return (
    <video
      ref={videoRef}
      width={600}
      height={400}
      muted
      loop
      playsInline
      controls
      className="mx-auto aspect-video overflow-hidden rounded-xl object-cover shadow-xl w-full"
    >
      <source src="/videos/tutorial.mp4" type="video/mp4" />
      Afsuski, brauzeringiz video elementini qo'llab-quvvatlamaydi.
    </video>
  )
}
