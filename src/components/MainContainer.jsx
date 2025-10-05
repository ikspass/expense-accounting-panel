import Header from './Header'
import NavBar from './NavBar'
import Footer from './Footer'

const MainContainer = ({children}) => {
  return (
    <div>
      <div className="main-container">
        <NavBar/>
        <div className="text-body main-section">
          {children}
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default MainContainer