const crearTask = async (req, res = express.request) => {
    const task = new Task(req.body);

    try {
        task.user = req.uid;
        const saved = await task.save();
        res.json({
            ok: true,
            task: saved
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            task: 'Internal Error'
        })
    }
}

const listarTasks = async (req, res = express.request) => {
    const tasks = await Task.find()
        .populate('user', 'name');
    try {
        res
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error Interno',
        })
    }
}

const actualizarTask =async (req, res = express.request) => {

}

const eliminarTask =async (req, res = express.request) => {
    
}

module.exports = {
    crearTask,
    listarTasks,
    actualizarTask,
    eliminarTask
}
