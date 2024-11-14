import { LucideIcon } from 'lucide-react'

export interface NavItem {
  id: number
  title: string
  icon: LucideIcon
}

export interface CaseStudy {
  location: string
  depth: number
  capacity: number
  videoId: string
  description: string
  flag: string
}