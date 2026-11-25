function Concept({ info, children }) {
  return (
    <div
      style={{
        backgroundColor: "#818cf81a",
        borderTopRightRadius: "12px",
        borderBottomRightRadius: "12px",
        borderLeft: "3px solid #818cf8",
        padding: '15px', 
        margin:  '10px 0'
      }}
    >
      <div style={{display: 'flex'}}>
        <p style={{color: '#818cf8', marginRight: '10px'}}>Концепция</p>
      <p>{info}</p>
      </div>
      
      {children}
    </div>
  );
}
export default Concept;
