import {Router} from 'express'
import UserModel from '../DAO/mongoManager/models/user.model.js'

const router = Router()

router.post('/login', async (req,res) => {
    const {email,password} = req.body
    const user = await UserModel.findOne({email,password})
    if(!user) return res.redirect('/login')

    req.session.user = user
    return res.redirect('/products')
})

router.post('/register', async (req,res) => {
    try{
        const user = req.body
        await UserModel.create(user)
        return res.redirect('/login')
    } catch (error) {
        res.status(500).json({ error: 'Failed to register the user' });
    }   

})

router.get('/logout', (req,res) => {
    req.session.destroy(err => {
        if(err) res.send('Logout error')

        return res.redirect('/login').send('Logout ok!')
    })
})

export default router