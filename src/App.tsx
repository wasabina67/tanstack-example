import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import './App.css'

const queryClient = new QueryClient()

function Example() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['repoData'],
    queryFn: async () => {
      const response = await fetch(
        'https://api.github.com/repos/TanStack/query',
      )
      return await response.json()
    },
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div>
      <h1>{data.full_name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{' '}
      <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
      <div>{isFetching ? 'Updating...' : ''}</div>
    </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}

export default App
