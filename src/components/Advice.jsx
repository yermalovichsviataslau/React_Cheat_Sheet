function Advice({info, children}){
  return(
    <div style={{backgroundColor: "#bd631942", padding: '15px', borderRadius: '20px'}}>
      <p style={{color: "#dd7e2f"}}>{info}</p>
      {children}
    </div>
  )
}

export default Advice