import Header from './Header'

const MainContainer = ({children}) => {
  return (
    <>
      <Header/>
      <div>
        {children}
      </div>
    </>
  )
}

export default MainContainer