import React from "react";
import { firebase } from "../firebase";

const Formulario = () => {
  const [lista, setLista] = React.useState([]);
  const [registro, setRegistro] = React.useState({
    nombre: "",
    descripcion: "",
    unidades: "",
    codigoBarra: "",
    precio: "",
    desechable: false,
    material: "",
  });
  const [modoEdicion, setModoEdicion] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [id, setId] = React.useState("");

  React.useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const db = firebase.firestore();
        const data = await db.collection("ventas").get();
        const array = data.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));
        setLista(array);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerDatos();
  });

  const guardarDatos = async (e) => {
    console.log("resgistro", registro);
    e.preventDefault();
    if (
      !String(registro.unidades).trim() ||
      !registro.descripcion.trim() ||
      !registro.nombre.trim() ||
      !registro.material.trim() ||
      !registro.codigoBarra.trim() ||
      !String(registro.precio).trim()
    ) {
      setError("Hay campos vacios");
      return;
    }

    try {
      const db = firebase.firestore();
      const nuevoCarro = {
        descripcion: registro.descripcion,
        unidades: registro.unidades,
        nombre: registro.nombre,
        codigoBarra: registro.codigoBarra,
        precio: registro.precio,
        desechable: registro.desechable,
        material: registro.material,
      };
      await db.collection("ventas").add(nuevoCarro);
    } catch (error) {
      console.log(error);
    }

    setModoEdicion(false);
    setRegistro({
      descripcion: "",
      unidades: "",
      nombre: "",
      codigoBarra: "",
      precio: "",
      desechable: false,
      material: "",
    });
    setError(null);
  };

  const eliminar = async (id) => {
    try {
      const db = firebase.firestore();
      await db.collection("ventas").doc(id).delete();
    } catch (error) {
      console.log(error);
    }
  };

  const auxEditar = (item) => {
    setRegistro({ ...item });
    setModoEdicion(true);
    setId(item.id);
  };

  const editar = async (e) => {
    e.preventDefault();

    if (
      !String(registro.unidades).trim() ||
      !registro.descripcion.trim() ||
      !registro.nombre.trim() ||
      !registro.material.trim() ||
      !registro.codigoBarra.trim() ||
      !String(registro.precio).trim()
    ) {
      setError("Hay campos vacios");
      return;
    }

    try {
      const db = firebase.firestore();
      await db.collection("ventas").doc(id).update({
        descripcion: registro.descripcion,
        unidades: registro.unidades,
        nombre: registro.nombre,
        codigoBarra: registro.codigoBarra,
        precio: registro.precio,
        desechable: registro.desechable,
        material: registro.material,
      });
    } catch (error) {
      console.log(error);
    }
    setRegistro({
      descripcion: "",
      unidades: "",
      nombre: "",
      codigoBarra: "",
      precio: "",
      desechable: false,
      material: "",
    });
    setModoEdicion(false);
    setError(null);
  };

  const cancelar = () => {
    setRegistro({
      descripcion: "",
      unidades: "",
      nombre: "",
      codigoBarra: "",
      precio: "",
      desechable: false,
      material: "",
    });
    setModoEdicion(false);
    setError(null);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mx-2 ">Ventas</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Listado de Ventas</h4>
          <ul className="list-group">
            {lista.map((item) => (
              <li className="list-group-item bg-info" key={item.id}>
                <span className="lead">
                  {item.nombre} - {item.descripcion} - {item.unidades} -{" "}
                  {item.codigoBarra} -{" "}
                  {item.desechable === true ? "Desechable" : "No desechable"} -{" "}
                  {item.precio} - {item.material}
                </span>
                <button
                  className="btn btn-danger btn-sm float-end mx-2"
                  onClick={() => eliminar(item.id)}
                >
                  Eliminar
                </button>
                <button
                  className="btn btn-warning btn-sm float-end"
                  onClick={() => auxEditar(item)}
                >
                  editar
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {modoEdicion ? "Editar Ventas" : "Agregar Ventas"}
          </h4>
          <form onSubmit={modoEdicion ? editar : guardarDatos}>
            {error ? <span className="text-danger">{error}</span> : null}
            <input
              className="form-control mb-2 bg-info"
              type="text"
              placeholder="Ingrese nombre"
              onChange={(e) =>
                setRegistro({ ...registro, nombre: e.target.value })
              }
              value={registro.nombre}
            />
            <input
              className="form-control mb-2 bg-info"
              type="text"
              placeholder="Ingrese descripcion"
              onChange={(e) =>
                setRegistro({ ...registro, descripcion: e.target.value })
              }
              value={registro.descripcion}
            />
            <input
              className="form-control mb-2 bg-info"
              type="number"
              placeholder="Ingrese unidades"
              onChange={(e) =>
                setRegistro({ ...registro, unidades: e.target.value })
              }
              value={registro.unidades}
            />
            <input
              className="form-control mb-2 bg-info"
              type="text"
              placeholder="Ingrese codigoBarra"
              onChange={(e) =>
                setRegistro({ ...registro, codigoBarra: e.target.value })
              }
              value={registro.codigoBarra}
            />

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
                onChange={(e) => {
                  setRegistro({
                    ...registro,
                    desechable: !registro.desechable,
                  });
                }}
                checked={
                  modoEdicion ? !registro.desechable : registro.desechable
                }
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Es desechable ?
              </label>
            </div>
            <input
              className="form-control mb-2 bg-info"
              type="number"
              placeholder="Ingrese precio"
              onChange={(e) =>
                setRegistro({ ...registro, precio: e.target.value })
              }
              value={registro.precio}
            />
            <input
              className="form-control mb-2 bg-info"
              type="text"
              placeholder="Ingrese material"
              onChange={(e) =>
                setRegistro({ ...registro, material: e.target.value })
              }
              value={registro.material}
            />
            {!modoEdicion ? (
              <button className="btn btn-primary btn-block" type="submit">
                Agregar
              </button>
            ) : (
              <>
                <button className="btn btn-warning btn-block" type="submit">
                  Editar
                </button>
                <button
                  className="btn btn-dark btn-block mx-2"
                  onClick={() => cancelar()}
                >
                  Cancelar
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Formulario;
