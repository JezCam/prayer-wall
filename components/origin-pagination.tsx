'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { usePagination } from '@/hooks/use-pagination'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import Link from 'next/link'
import { useCallback } from 'react'

type PaginationProps = {
  currentPage: number
  totalPages: number
  paginationItemsToDisplay?: number
}

export default function OriginPagination({
  currentPage,
  totalPages,
  paginationItemsToDisplay = 5,
}: PaginationProps) {
  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage,
    totalPages,
    paginationItemsToDisplay,
  })

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  return (
    <div className='flex flex-col sm:flex-row items-center justify-between gap-6 w-full'>
      {/* Pagination */}
      <div>
        <Pagination>
          <PaginationContent>
            {/* First page button */}
            <PaginationItem>
              <PaginationLink
                className='aria-disabled:pointer-events-none aria-disabled:opacity-50'
                href={currentPage === 1 ? undefined : '?page=1'}
                aria-label='Go to first page'
                aria-disabled={currentPage === 1 ? true : undefined}
                role={currentPage === 1 ? 'link' : undefined}
              >
                <ChevronFirst size={16} strokeWidth={2} aria-hidden='true' />
              </PaginationLink>
            </PaginationItem>
            {/* Previous page button */}
            <PaginationItem>
              <PaginationLink
                className='aria-disabled:pointer-events-none aria-disabled:opacity-50'
                href={
                  currentPage === 1 ? undefined : `?page=${currentPage - 1}`
                }
                aria-label='Go to previous page'
                aria-disabled={currentPage === 1 ? true : undefined}
                role={currentPage === 1 ? 'link' : undefined}
              >
                <ChevronLeft size={16} strokeWidth={2} aria-hidden='true' />
              </PaginationLink>
            </PaginationItem>

            {/* Left ellipsis (...) */}
            {showLeftEllipsis && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {/* Page number links */}
            {pages
              .slice(
                currentPage === 1 ? 0 : currentPage - 2,
                currentPage === 1 ? 3 : Math.min(totalPages, currentPage + 1),
              )
              .map(page => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href={`?page=${page}`}
                    isActive={page === currentPage}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

            {/* Right ellipsis (...) */}
            {showRightEllipsis && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {/* Next page button */}
            <PaginationItem>
              <PaginationLink
                className='aria-disabled:pointer-events-none aria-disabled:opacity-50'
                href={
                  currentPage === totalPages
                    ? undefined
                    : `?page=${currentPage + 1}`
                }
                aria-label='Go to next page'
                aria-disabled={currentPage === totalPages ? true : undefined}
                role={currentPage === totalPages ? 'link' : undefined}
              >
                <ChevronRight size={16} strokeWidth={2} aria-hidden='true' />
              </PaginationLink>
            </PaginationItem>
            {/* Last page button */}
            <PaginationItem>
              <PaginationLink
                className='aria-disabled:pointer-events-none aria-disabled:opacity-50'
                href={
                  currentPage === totalPages ? undefined : `?page=${totalPages}`
                }
                aria-label='Go to last page'
                aria-disabled={currentPage === totalPages ? true : undefined}
                role={currentPage === totalPages ? 'link' : undefined}
              >
                <ChevronLast size={16} strokeWidth={2} aria-hidden='true' />
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Results per page */}
      <div className='flex flex-1 justify-end'>
        <Select
          onValueChange={value =>
            router.push(pathname + '?' + createQueryString('per_page', value))
          }
          defaultValue={searchParams.get('per_page') || '5'}
          aria-label='Results per page'
        >
          <SelectTrigger
            id='results-per-page'
            className='w-full whitespace-nowrap'
          >
            <SelectValue placeholder='Select number of results' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='5'>
              <Link href='?per_page=5'>5 / page</Link>
            </SelectItem>
            <SelectItem value='10'>
              <Link href='?per_page=10'>10 / page</Link>
            </SelectItem>
            <SelectItem value='20'>
              <Link href='?per_page=20'>20 / page</Link>
            </SelectItem>
            <SelectItem value='50'>
              <Link href='?per_page=50'>50 / page</Link>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
