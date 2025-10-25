import './Loading.css'

function Loading({ type = "overlay" }) {
  if (type === "content") {
    return (
      <div className="loading-content">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Cargando menú...</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Cargando contenido...</p>
        </div>
      </div>
    </div>
  )
}

export default Loading