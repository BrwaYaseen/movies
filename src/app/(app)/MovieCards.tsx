'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { addVote } from '@/movies'
import { ThumbsUpIcon, VoteIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Media, Movie } from 'payload-types'
import React, { useState } from 'react'

const MovieCards = () => {
  const [movies, setMovies] = useState<Movie[]>()
  return (
    <div className="flex flex-wrap gap-3">
      {movies?.map((movie) => (
        <React.Fragment key={movie.id}>
          <Card className="md:max-w-72">
            <CardHeader>
              <CardTitle>{movie.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Link href={`/movie/${movie.slug}`}>
                <Image
                  src={(movie.poster as Media)?.url ?? ''}
                  alt={(movie.poster as Media)?.text ?? ''}
                  width={(movie.poster as Media)?.width ?? 100}
                  height={(movie.poster as Media)?.height ?? 100}
                />
              </Link>
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <ThumbsUpIcon />
                  <div>{movie.votes}</div>
                </div>
                <Button
                  onClick={async () => {
                    setMovies(await addVote(movie.id))
                  }}
                >
                  <VoteIcon />
                </Button>
              </div>
            </CardContent>
          </Card>
        </React.Fragment>
      ))}
    </div>
  )
}

export default MovieCards
