import { NavLink } from "react-router";

function SwitchTopic({to, children}){
  return (
    
        <NavLink to={to} className="topic-btn">
          {children}
        </NavLink>
  )
}

export default SwitchTopic