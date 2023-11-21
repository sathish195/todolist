import axios from 'axios'

export const  GetData= async()=>{
    try {
        const response = await axios({
          method:'get',
          url: 'https://jsonplaceholder.typicode.com/users/1/todos',
           headers: { 
                  'Content-Type': 'application/json'
                 } ,
                      
        });
        const responseData = await response
        return responseData
       
    
      }catch (err) {
        return err;
      }
     }
 

     export const  GetUers= async()=>{
        try {
            const response = await axios({
              method:'get',
              url: 'https://jsonplaceholder.typicode.com/users',
               headers: { 
                      'Content-Type': 'application/json'
                     } ,
                          
            });
            const responseData = await response
            return responseData.data
           
        
          }catch (err) {
            return err;

          }
         }
    

    