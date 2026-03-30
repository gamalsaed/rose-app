import { ArrowLeft } from 'lucide-react'
import React from 'react'

  

export default function BackBtn({onBack}:{onBack:()=>void}) {
  return (
     <button
    onClick={onBack}
    className="text-sm text-maroon-600 "
    type="button"
  >
    <div className='w-8 h-8 rounded-full bg-maroon-600 dark:bg-softPink-600 flex items-center justify-center'>
    <ArrowLeft size={20} className='text-white rtl:rotate-180' />
   </div>
   </button>
  )
}
