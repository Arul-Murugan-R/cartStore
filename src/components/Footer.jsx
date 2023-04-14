import { Link } from 'react-router-dom'
const Footer = () => {
    return (
        <footer className="text-muted py-5 bottom-0">
    <div className="container">
      {/* <p className="float-end mb-1">
        <Link to="#">Back to top</Link>
      </p> */}
      <p className="mb-1">Album example is © <Link to="mailto:arulmuruganarjun14@gmail.com" target="_black">Web ducky</Link>, but please download and customize it for yourself!</p>
    </div>
  </footer>
    )
}


export default Footer