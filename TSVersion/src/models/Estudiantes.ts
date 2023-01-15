// imports
import { DataTypes } from 'sequelize';
import sequelize from '../database';
import Cursos from './Cursos';
import { comparePassword, hashPassword } from '../utils';
// model definition
const Estudiantes = sequelize.define('estudiantes', {
    id_estudiante: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // grupoactual: {
    //     type: DataTypes.INTEGER,
    //     allowNull: true
    // },
}, {
    timestamps: false,
    hooks: {
        beforeCreate: async (estudiante: any) => {
            estudiante.password = hashPassword(estudiante.password);
        },
    }
});

// definir la relación entre Cursos y Estudiantes
Cursos.hasMany(Estudiantes, {
    foreignKey: 'id_curso'
});
Estudiantes.belongsTo(Cursos, {
    foreignKey: 'id_curso'
});

Estudiantes.prototype.comparePassword = comparePassword;

export default Estudiantes;
module.exports = Estudiantes;
