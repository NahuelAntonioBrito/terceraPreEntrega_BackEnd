import { Router } from "express";
import { 
    getUsersController,
    getUsertByIdController,
    addUserController,
    updateUser,
    deleteUser,
    getAdminsController,
    getPremiumsController,
    getNormalController
} from "../controllers/user.controller";
import fs from 'fs';
import UserModel from '../dao/models/user.model.js'
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.get("/", getUsersController);

router.get("/:uid", getUsertByIdController);

router.post("/", addUserController);

router.put("/:uid", updateUser);

router.delete("/", deleteUser);

router.get('/users/admin', getAdminsController);

router.get('/users/premium', getPremiumsController);

router.get('/users/user', getNormalController);

router.get('/premium/:uid', async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.uid)
        await UserModel.findByIdAndUpdate(req.params.uid, { role: user.role === 'user' ? 'premium' : 'user' })
        res.json({ status: 'success', message: 'Se ha actualizado el rol del usuario' })
    } catch(err) {
        res.json({ status: 'error', error: err.message })
    }
})

router.post('/:uid/documents', upload.single('file'), (req, res) => {
    const fileType = req.body.fileType;

    // Directorio base donde se guardarán los archivos
    const baseDirectory = 'uploads';

    // Lógica para determinar la carpeta de destino según el fileType
    let destinationFolder;

    switch (fileType) {
        case 'document':
            destinationFolder = 'documents';
            break;
        case 'profileImage':
            destinationFolder = 'profiles';
            break;
        case 'productImage':
            destinationFolder = 'products';
            break;
        default:
            // Manejar otros casos si es necesario
            return res.status(400).json({ error: 'Tipo de archivo no válido' });
    }

    // Crear la carpeta de destino si no existe
    const targetDirectory = `${baseDirectory}/${destinationFolder}`;

    if (!fs.existsSync(targetDirectory)) {
        fs.mkdirSync(targetDirectory, { recursive: true });
    }

    // Mover el archivo al directorio de destino
    const sourcePath = req.file.path;
    const targetPath = `${targetDirectory}/${req.file.filename}`;

    fs.renameSync(sourcePath, targetPath);

    res.json({ message: 'Archivo subido exitosamente' });
});


export default router;