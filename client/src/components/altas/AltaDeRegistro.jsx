import Nav from "../Nav/Nav";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Store from "../../store/store";

const AltaDeRegistro = () => {
  const { crearPlanos } = Store(); // Función de la store para crear un nuevo registro
  const [form, setForm] = useState({
    fecha_de_aprob: '',
    num_de_exp: '',
    num_de_ficha: '',
    id_propietario: '',
    ubicacion: '',
    distrito: '',
    zona: '',
    manzana: '',
    parcela: '',
    superficie_cubierta: '',
    final_de_obra: '',
    id_destino: '',
    id_tipo_plano: '',
    direccion_tecnica: '',
    matricula_profesional: '',
    fecha_archivo: ''
  });

  // Maneja los cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearPlanos(form);
      alert('Registro creado con éxito');
      setForm({ 
        fecha_de_aprob: '',
        num_de_exp: '',
        num_de_ficha: '',
        id_propietario: '',
        ubicacion: '',
        distrito: '',
        zona: '',
        manzana: '',
        parcela: '',
        superficie_cubierta: '',
        final_de_obra: '',
        id_destino: '',
        id_tipo_plano: '',
        direccion_tecnica: '',
        matricula_profesional: '',
        fecha_archivo: ''
      });
    } catch (error) {
      console.error('Error al crear registro:', error);
      alert('Error al crear registro');
    }
  };

  return (
    <div>
      <Nav />
      <h3>Alta de registro de plano</h3>
      <form onSubmit={handleSubmit}>
        {/** Campos del formulario **/}
        <input type="date" name="fecha_de_aprob" value={form.fecha_de_aprob} onChange={handleChange} placeholder="Fecha de aprobación" required />
        <input type="text" name="num_de_exp" value={form.num_de_exp} onChange={handleChange} placeholder="N° de expediente" required />
        <input type="text" name="num_de_ficha" value={form.num_de_ficha} onChange={handleChange} placeholder="N° de ficha" required />
        <input type="text" name="id_propietario" value={form.id_propietario} onChange={handleChange} placeholder="ID Propietario" required />
        <input type="text" name="ubicacion" value={form.ubicacion} onChange={handleChange} placeholder="Ubicación" required />
        <input type="number" name="distrito" value={form.distrito} onChange={handleChange} placeholder="Distrito" required />
        <input type="number" name="zona" value={form.zona} onChange={handleChange} placeholder="Zona" required />
        <input type="text" name="manzana" value={form.manzana} onChange={handleChange} placeholder="Manzana" required />
        <input type="text" name="parcela" value={form.parcela} onChange={handleChange} placeholder="Parcela" required />
        <input type="number" name="superficie_cubierta" value={form.superficie_cubierta} onChange={handleChange} placeholder="Superficie Cubierta" required />
        <input type="date" name="final_de_obra" value={form.final_de_obra} onChange={handleChange} placeholder="Certificado Final de Obra" required />
        <input type="text" name="id_destino" value={form.id_destino} onChange={handleChange} placeholder="ID Destino" required />
        <input type="text" name="id_tipo_plano" value={form.id_tipo_plano} onChange={handleChange} placeholder="ID Tipo de Plano" required />
        <input type="text" name="direccion_tecnica" value={form.direccion_tecnica} onChange={handleChange} placeholder="Dirección Técnica" required />
        <input type="text" name="matricula_profesional" value={form.matricula_profesional} onChange={handleChange} placeholder="Matrícula Profesional" required />
        <input type="date" name="fecha_archivo" value={form.fecha_archivo} onChange={handleChange} placeholder="Fecha de Archivo" required />

        <button type="submit">Registrar</button>
      </form>
      <button style={{background: '#18278C',}}><Link to='/' style={{color: 'white'}}>Volver</Link></button>
    </div>
  );
};

export default AltaDeRegistro;