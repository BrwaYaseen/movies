'use client'

import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Input } from '@/components/ui/input'
import { addMovieAction } from '@/movies'
import { posterURL } from '@/movies/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const Page = () => {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState<{ id: number; poster_path: string; title: string }[]>([])

  useEffect(() => {
    fetch(`/api/search?query=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then(setMovies)
  }, [query])

  const router = useRouter()

  async function addMovie(id: number) {
    await addMovieAction(id)
    router.push(`/`)
  }
  return (
    <main className="mt-5">
      <div>
        <Input value={query} onChange={(e) => setQuery(e.target.value)} className="mb-5" />
      </div>
      {movies?.length > 0 ? (
        <Carousel>
          <CarouselContent>
            {movies?.map(({ id, poster_path, title }) => (
              <CarouselItem key={id} className="basis-1/6 flex flex-col">
                <Image
                  src={posterURL(poster_path)}
                  alt={title ?? 'poster'}
                  width={600}
                  height={900}
                  className="w-full aspect-[6/9] object-cover"
                />
                <h1 className="text-center font-bold truncate text-xl my-5">{title}</h1>
                <Button onClick={() => addMovie(id)}>Add</Button>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      ) : (
        <p className="text-2xl">Type in a query to find movies</p>
      )}
    </main>
  )
}

export default Page
