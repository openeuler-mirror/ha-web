let nodelist={
  "action":true,
  "data":[
      {
          "id":"ns187",
          "is_dc":true,
          "status":"Master",
      },
      {
          "id":"ns188",
          "is_dc":false,
          "status":"Not Running/Standby",
      },
            {
          "id":"ns188",
          "is_dc":false,
          "status":"Not Running/Standby",
      }
  ]
}
  export default {
    "get|api/nodes": option => {
      return {
        status: 200,
        message: "success",
        nodelist: nodelist.data
      };
    }
  
  };
  