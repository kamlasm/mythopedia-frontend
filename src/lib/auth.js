export function getPayload() {
    const token = localStorage.getItem('token')
 
    if (!token) return false
 
    const parts = token.split('.')
    
    return JSON.parse(atob(parts[1]))
 }
 
 export function isAdmin() {
     const playload = getPayload()
     if(!playload) return false
     if(playload.userIsAdmin) return true
 }

 export function getUserId() {
    const playload = getPayload()
    if(!playload) return false
    return playload.userId
 }