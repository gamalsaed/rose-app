export interface SearchTypes {
  message: string
  filters: Filters
}

export interface Filters {
  categories: Category[]
  occasions: Occasion[]
  priceRange: PriceRange
  ratingRange: RatingRange
}

export interface Category {
  _id: string
  name: string
}

export interface Occasion {
  _id: string
  name: string
  image: string
}

export interface PriceRange {
  min: number
  max: number
}

export interface RatingRange {
  min: number
  max: number
}
