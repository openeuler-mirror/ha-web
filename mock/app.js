let file = {
    status: 200,
    message: "success",  
    action: true,
    filepath: 'static/neokylinha-log.tar'
}

export default { 
    "get|api/logs": option => {  
        return file  
    } 

};

