import React from "react";

export const RegisterErrors = ({registerErrors}) =>
  <div className='registerErrors'>
    {Object.keys(registerErrors).map((fieldName, i) => {
      if(registerErrors[fieldName].length > 0){
        return (
          <p key={i}>{fieldName} {registerErrors[fieldName]}</p>
        )        
      } else {
        return '';
      }
    })}
  </div>