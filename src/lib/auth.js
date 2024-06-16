export function getPayload() {
    const token = localStorage.getItem('token')
 
    if (!token) return false
 
    const parts = token.split('.')
 
    return JSON.parse(atob(parts[1]))
 }
 
 export function isAddedBy(userId) {
     const playload = getPayload()
     if(!playload) return false
     return userId === playload.userId
 }