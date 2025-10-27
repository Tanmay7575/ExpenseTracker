const backend_url=import.meta.env.VITE_BACKEND_URL;

export const registerUser = async (user) => {
  try {
    const res = await fetch(`${backend_url}/api/register`, {
      method: "POST",
      credentials: "include", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (res.status === 204) return null;
    let data = null;
    try {
      data = await res.json();
    } catch (err) {
      console.warn("Could not parse JSON response", err);
    }

    if (!res.ok) {
    
      throw new Error(data?.message || `Request failed with status ${res.status}`);
    }

    return data; 
  } catch (err) {
    console.error("registerUser error:", err);
    throw err; 
  }
};

export const loginUser=async(user)=>{
     const response = await fetch(`${backend_url}/api/login`,{
      method:"POST",
      credentials:"include"
      ,
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(user)
    })
       if(!response.ok){
        throw new Error("Something went Wrong");
     };
     return response.json();
}


export const validateToken=async()=>{
     const response=await fetch(`${backend_url}/api/validate_token`,{
        method:"GET",
        credentials:"include"
     });

     if(!response.ok){
        throw new Error("Something went Wrong");
     };
     const data=await response.json();
     return data;
}

export const logout=async()=>{
    const response=await fetch(`${backend_url}/api/logout`,{
        method:"POST",
        credentials:"include"
    });
    if(!response.ok){
        throw new Error("Something went wrong");
    }
    return response.json();
  }

export const forgotPassword=async(email)=>{
  const response=await fetch(`${backend_url}/api/forgot-password`,{
    method:"POST",
    credentials:"include",
    headers:{
      "content-type":"application/json"
        },
        body:JSON.stringify({email}),
  });
   if(!response.ok){
        throw new Error("Something went wrong");
    }
    const data=await response.json();
    return data;
}

export const resetPassword=async(token,password)=>{
  const response = await fetch(`${backend_url}/api/reset-password/${token}`,{
    method:"POST",
    credentials:"include",
    headers:{
      "content-type":"application/json"
    },
    body:JSON.stringify({password}),
  });
   if(!response.ok){
        throw new Error("Something went wrong");
    }
    const data=await response.json();
    return data;
}

export const getAllExpenses=async()=>{
     const response = await fetch(`${backend_url}/api/expense`,{
          method:"GET",
          credentials:"include"
     });
      if(!response.ok){
        throw new Error("Something went wrong");
    }
    const data=await response.json();
    return data;
}

export const addExpense=async(expense)=>{
  const response = await fetch(`${backend_url}/api/expense/createExpense`,{
     method:'POST',
     credentials:"include",
     headers:{
      "content-type":"application/json"
     },
     body:JSON.stringify(expense)
  });
  if(!response.ok){
        throw new Error("Something went wrong");
    }
   return response.json();
}

export const deleteExpense=async(id)=>{
    const response = await fetch(`${backend_url}/api/expense/${id}`,{
      method:"DELETE",
      credentials:"include"
    });
    if(!response.ok){
        throw new Error("Something went wrong");
    };
}

export const updateExpense=async(id,expense)=>{
  const response = await fetch(`${backend_url}/api/expense/${id}`,{
    method:"PUT",
    credentials:"include",
    headers:{
      "content-type":"application/json"
    },
    body:JSON.stringify(expense)
  });
    if(!response.ok){
        throw new Error("Something went wrong");
    };
   
    return response.json();
}