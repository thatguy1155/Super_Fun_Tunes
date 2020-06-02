export default async function({$auth, next}){
    let user = $auth.user
    if(!user){
        next('/login')
    }
}