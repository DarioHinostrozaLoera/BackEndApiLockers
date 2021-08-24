var DataTypes = require("sequelize").DataTypes;
var _administrador = require("./administrador");
var _alumnos = require("./alumnos");
var _apertura = require("./apertura");
var _cat_accion = require("./cat_accion");
var _cat_estatus_mobiliario = require("./cat_estatus_mobiliario");
var _cat_estatus_user = require("./cat_estatus_user");
var _cat_grado = require("./cat_grado");
var _cat_rol = require("./cat_rol");
var _cat_turno = require("./cat_turno");
var _comunicado = require("./comunicado");
var _comunicado_alumnos = require("./comunicado_alumnos");
var _division = require("./division");
var _gabeta = require("./gabeta");
var _grupo = require("./grupo");
var _grupo_en_curso = require("./grupo_en_curso");
var _historico = require("./historico");
var _locker = require("./locker");
var _periodo_escolar = require("./periodo_escolar");
var _user = require("./user");

function initModels(sequelize) {
  var administrador = _administrador(sequelize, DataTypes);
  var alumnos = _alumnos(sequelize, DataTypes);
  var apertura = _apertura(sequelize, DataTypes);
  var cat_accion = _cat_accion(sequelize, DataTypes);
  var cat_estatus_mobiliario = _cat_estatus_mobiliario(sequelize, DataTypes);
  var cat_estatus_user = _cat_estatus_user(sequelize, DataTypes);
  var cat_grado = _cat_grado(sequelize, DataTypes);
  var cat_rol = _cat_rol(sequelize, DataTypes);
  var cat_turno = _cat_turno(sequelize, DataTypes);
  var comunicado = _comunicado(sequelize, DataTypes);
  var comunicado_alumnos = _comunicado_alumnos(sequelize, DataTypes);
  var division = _division(sequelize, DataTypes);
  var gabeta = _gabeta(sequelize, DataTypes);
  var grupo = _grupo(sequelize, DataTypes);
  var grupo_en_curso = _grupo_en_curso(sequelize, DataTypes);
  var historico = _historico(sequelize, DataTypes);
  var locker = _locker(sequelize, DataTypes);
  var periodo_escolar = _periodo_escolar(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  comunicado.belongsToMany(user, { through: comunicado_alumnos, foreignKey: "id_comunicado", otherKey: "id_user" });
  division.belongsToMany(user, { through: administrador, foreignKey: "id_division", otherKey: "id_user" });
  user.belongsToMany(comunicado, { through: comunicado_alumnos, foreignKey: "id_user", otherKey: "id_comunicado" });
  user.belongsToMany(division, { through: administrador, foreignKey: "id_user", otherKey: "id_division" });
  comunicado.belongsTo(administrador, { as: "id_division_administrador", foreignKey: "id_division"});
  administrador.hasMany(comunicado, { as: "comunicados", foreignKey: "id_division"});
  comunicado.belongsTo(administrador, { as: "id_user_administrador", foreignKey: "id_user"});
  administrador.hasMany(comunicado, { as: "id_user_comunicados", foreignKey: "id_user"});
  historico.belongsTo(cat_accion, { as: "id_accion_cat_accion", foreignKey: "id_accion"});
  cat_accion.hasMany(historico, { as: "historicos", foreignKey: "id_accion"});
  gabeta.belongsTo(cat_estatus_mobiliario, { as: "id_estatus_mobiliario_cat_estatus_mobiliario", foreignKey: "id_estatus_mobiliario"});
  cat_estatus_mobiliario.hasMany(gabeta, { as: "gabeta", foreignKey: "id_estatus_mobiliario"});
  locker.belongsTo(cat_estatus_mobiliario, { as: "id_estatus_mobiliario_cat_estatus_mobiliario", foreignKey: "id_estatus_mobiliario"});
  cat_estatus_mobiliario.hasMany(locker, { as: "lockers", foreignKey: "id_estatus_mobiliario"});
  user.belongsTo(cat_estatus_user, { as: "id_cat_estatus_cat_estatus_user", foreignKey: "id_cat_estatus"});
  cat_estatus_user.hasMany(user, { as: "users", foreignKey: "id_cat_estatus"});
  grupo_en_curso.belongsTo(cat_grado, { as: "id_grado_cat_grado", foreignKey: "id_grado"});
  cat_grado.hasMany(grupo_en_curso, { as: "grupo_en_cursos", foreignKey: "id_grado"});
  user.belongsTo(cat_rol, { as: "id_rol_cat_rol", foreignKey: "id_rol"});
  cat_rol.hasMany(user, { as: "users", foreignKey: "id_rol"});
  grupo_en_curso.belongsTo(cat_turno, { as: "id_turno_cat_turno", foreignKey: "id_turno"});
  cat_turno.hasMany(grupo_en_curso, { as: "grupo_en_cursos", foreignKey: "id_turno"});
  comunicado_alumnos.belongsTo(comunicado, { as: "id_comunicado_comunicado", foreignKey: "id_comunicado"});
  comunicado.hasMany(comunicado_alumnos, { as: "comunicado_alumnos", foreignKey: "id_comunicado"});
  administrador.belongsTo(division, { as: "id_division_division", foreignKey: "id_division"});
  division.hasMany(administrador, { as: "administradors", foreignKey: "id_division"});
  grupo.belongsTo(division, { as: "id_division_division", foreignKey: "id_division"});
  division.hasMany(grupo, { as: "grupos", foreignKey: "id_division"});
  locker.belongsTo(division, { as: "id_division_division", foreignKey: "id_division"});
  division.hasMany(locker, { as: "lockers", foreignKey: "id_division"});
  alumnos.belongsTo(gabeta, { as: "id_gabeta_gabetum", foreignKey: "id_gabeta"});
  gabeta.hasMany(alumnos, { as: "alumnos", foreignKey: "id_gabeta"});
  grupo_en_curso.belongsTo(grupo, { as: "id_grupo_grupo", foreignKey: "id_grupo"});
  grupo.hasMany(grupo_en_curso, { as: "grupo_en_cursos", foreignKey: "id_grupo"});
  alumnos.belongsTo(grupo_en_curso, { as: "id_grupo_curso_grupo_en_curso", foreignKey: "id_grupo_curso"});
  grupo_en_curso.hasMany(alumnos, { as: "alumnos", foreignKey: "id_grupo_curso"});
  gabeta.belongsTo(locker, { as: "id_locker_locker", foreignKey: "id_locker"});
  locker.hasMany(gabeta, { as: "gabeta", foreignKey: "id_locker"});
  comunicado.belongsTo(periodo_escolar, { as: "id_periodo_periodo_escolar", foreignKey: "id_periodo"});
  periodo_escolar.hasMany(comunicado, { as: "comunicados", foreignKey: "id_periodo"});
  grupo_en_curso.belongsTo(periodo_escolar, { as: "id_periodo_periodo_escolar", foreignKey: "id_periodo"});
  periodo_escolar.hasMany(grupo_en_curso, { as: "grupo_en_cursos", foreignKey: "id_periodo"});
  administrador.belongsTo(user, { as: "id_user_user", foreignKey: "id_user"});
  user.hasMany(administrador, { as: "administradors", foreignKey: "id_user"});
  alumnos.belongsTo(user, { as: "id_user_user", foreignKey: "id_user"});
  user.hasMany(alumnos, { as: "alumnos", foreignKey: "id_user"});
  comunicado_alumnos.belongsTo(user, { as: "id_user_user", foreignKey: "id_user"});
  user.hasMany(comunicado_alumnos, { as: "comunicado_alumnos", foreignKey: "id_user"});
  historico.belongsTo(user, { as: "id_user_user", foreignKey: "id_user"});
  user.hasMany(historico, { as: "historicos", foreignKey: "id_user"});
  user.belongsTo(user, { as: "id_user_superior_user", foreignKey: "id_user_superior"});
  user.hasMany(user, { as: "users", foreignKey: "id_user_superior"});

  return {
    administrador,
    alumnos,
    apertura,
    cat_accion,
    cat_estatus_mobiliario,
    cat_estatus_user,
    cat_grado,
    cat_rol,
    cat_turno,
    comunicado,
    comunicado_alumnos,
    division,
    gabeta,
    grupo,
    grupo_en_curso,
    historico,
    locker,
    periodo_escolar,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
