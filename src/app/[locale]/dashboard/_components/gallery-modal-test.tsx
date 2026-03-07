'use client'

import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import GalleryModal from './gallery-modal'

//Test Data
const product = {
  imgCover:
    'https://flower.elevateegy.com/uploads/fefa790a-f0c1-42a0-8699-34e8fc065812-cover_image.png',
  images: [
    'https://flower.elevateegy.com/uploads/66c36d5d-c067-46d9-b339-d81be57e0149-image_one.png',
    'https://flower.elevateegy.com/uploads/f27e1903-74cf-4ed6-a42c-e43e35b6dd14-image_three.png',
    'https://flower.elevateegy.com/uploads/500fe197-0e16-4b01-9a0d-031ccb032714-image_two.png',
  ],
}

//GalleryModalTest Component Used to test GalleryModal
export default function GalleryModalTest() {
  // State
  const [open, setOpen] = useState(false)
  const [modalImages, setModalImages] = useState<string[]>([])

  return (
    <div className="flex gap-3 justify-center items-center w-96 mx-auto mt-9">
      {/* Cover */}
      <Button
        variant="outline"
        onClick={() => {
          setModalImages([product.imgCover])
          setOpen(true)
        }}
      >
        View product cover
      </Button>

      {/* Gallery */}
      <Button
        variant="outline"
        onClick={() => {
          setModalImages(product.images)
          setOpen(true)
        }}
      >
        View product gallery
      </Button>

      {/* Reusable Modal */}
      <GalleryModal
        images={modalImages}
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  )
}