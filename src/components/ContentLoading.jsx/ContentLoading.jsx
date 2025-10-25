import './ContentLoading.css'

function ContentLoading() {
  return (
    <div className="content-loading">
      <div className="content-spinner">
        <div className="spinner"></div>
        <p>Cargando menú...</p>
      </div>
    </div>
  )
}

export default ContentLoading