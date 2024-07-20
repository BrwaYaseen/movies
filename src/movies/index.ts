export async function searchMovies(query: string) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
      query,
    )}&include_adult=false&language=en-US&page=1&api_key=${process.env.TMDB_API_KEY}`,
  )
  const { results } = await response.json()
  return results
    .map(({ id, poster_path, title }: { id: string; poster_path: string; title: string }) => ({
      id,
      poster_path,
      title,
    }))
    .filter(({ poster_path }: { poster_path: string }) => !!poster_path)
}
