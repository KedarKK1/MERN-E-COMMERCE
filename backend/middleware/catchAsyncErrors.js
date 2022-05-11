// yeha pe hum ek function le rahe hai aur usme kuch error aaya to catch me ja rhe
// isse use karke hum line of codes bach rhe hai taki bar bar try-catch block likhna na pade
module.exports = (theFunc) => (req,res,next) => {
    Promise.resolve(theFunc(req,res,next)).catch(next);
}