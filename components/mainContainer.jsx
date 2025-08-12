import Header from './header'

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