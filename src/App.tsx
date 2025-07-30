import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import './App.css'

const queryClient = new QueryClient()

type ExampleProps = {
  repoName: string
}

function Example({ repoName }: ExampleProps) {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: [repoName],
    queryFn: async () => {
      const response = await fetch(
        `https://api.github.com/repos/TanStack/${repoName}`,
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
      <Example repoName='query' />
      <Example repoName='table' />
    </QueryClientProvider>
  )
}

export default App
