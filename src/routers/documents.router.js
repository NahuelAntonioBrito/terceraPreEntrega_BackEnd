import { Router } from "express";
import passport from "passport";

const router = Router();


router.get('/Upload-file/:productId', passport.authenticate('current', { session: false }), async (req, res) => {
    const userId = req.user.user._id;
    const productId = req.params.productId;
    console.log("Upload-file: ", { userId, productId });
    res.render('uploadFile', { userId, productId });
});


export default router;