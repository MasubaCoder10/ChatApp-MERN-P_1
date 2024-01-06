export const unreadNotification = (sendNotification)=>{
    return sendNotification.filter((n)=>n.isRead === false);
}