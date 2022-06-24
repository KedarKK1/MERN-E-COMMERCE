import React from 'react';
import Helmet from 'react-helmet';

const MetaData = ( { title } ) => {
  return (
    //   jis bhi page pe jaenge ss page ka titlte ye hojaega using helmet
    <Helmet>
        <title>{title}</title>        
    </Helmet>
  )
}

export default MetaData;