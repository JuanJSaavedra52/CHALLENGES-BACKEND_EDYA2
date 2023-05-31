const Task = require('../models/TaskScheme');

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

const actualizarTask = async (req, res = express.request) => {
    const { id } = req.params;
    const { title } = req.body;

    try {
        // Paso 2: Buscar la tarea por su id
        const task = await Task.findById(id);

        // Paso 3: Verificar si la tarea existe
        if (!task) {
            return res.status(404).json({
                ok: false,
                msg: 'Tarea no encontrada',
            });
        }

        // Verificar si el usuario tiene permiso para actualizar la tarea
        if (!task.user || task.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tienes permiso para actualizar esta tarea',
            });
        }

        // Paso 4: Actualizar y devolver la tarea actualizada
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            { title },
            { new: true }
        );

        res.json({
            ok: true,
            task: updatedTask,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno',
        });
    }
}

const eliminarTask = async (req, res = express.request) => {
    const { id } = req.params;

    try {
        // Paso 2: Buscar la tarea por su id
        const task = await Task.findById(id);

        // Paso 3: Verificar si la tarea existe y si el usuario es el mismo que la creó
        if (!task) {
            return res.status(404).json({
                ok: false,
                msg: 'Tarea no encontrada',
            });
        }

        if (task.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tienes permiso para eliminar esta tarea',
            });
        }

        // Paso 5: Eliminar la tarea
        await Task.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Tarea eliminada',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno',
        });
    }
}

module.exports = {
    crearTask,
    listarTasks,
    actualizarTask,
    eliminarTask
}
