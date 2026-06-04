
import './App.css'

function App() {
  type Title = {
    title: string,
  }
  const project: Title = {
    title: "Panahon"
  }

  return (
    <>
      <div className="flex items-center justify-center text-center h-100">
          <h1 className="text-3xl font-bold underline">
            {project.title}
          </h1>
        </div>
      
    </>
  )
}

export default App
