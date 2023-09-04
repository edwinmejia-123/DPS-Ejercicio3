import React, { useState, useEffect } from "react";
import { destinos } from "../destinos";

export function Form() {
  const [formData, setFormData] = useState({
    site: 1,
    people: 1,
  });
  const [destino, setDestino] = useState(
    destinos.find((param) => param.id === parseInt(formData.site))
  );

  useEffect(() => {
    obtenerDestino();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (!value) {
      return;
    }
    const updatedValue = name === "people" ? parseInt(value || 0) < 0 ? 1 : parseInt(value) : value

    setFormData({
      ...formData,
      [name]: updatedValue
    });
  };

  const subTotal = () => {
    return obtenerPrecio() * parseInt(formData.people).toFixed(2);
  };
  const impuestos = () => {
    return ((obtenerPrecio() * destino.tax) / 100).toFixed(2);
  };

  const total = () => {
    return (subTotal() + impuestos() * formData.people).toFixed(2);
  };

  useEffect(() => {
    obtenerPrecio();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destino]);

  const obtenerPrecio = () => {
    if (formData.people < 2) return destino.price[0];
    if (formData.people < 3) return destino.price[1];
    if (formData.people >= 3 && formData.people < 5) return destino.price[2];
    if (formData.people > 4) return destino.price[3];

    return destino.price[0];
  };

  const obtenerDestino = () => {
    setDestino(destinos.find((param) => param.id === parseInt(formData.site)));
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-semibold mb-4">
        Formulario de paquetes de viajes
      </h1>
      <div className="mb-4">
        <label
          htmlFor="site"
          className="block text-sm font-medium text-gray-700"
        >
          Destino:
        </label>
        <select
          name="site"
          id="site"
          onChange={handleInputChange}
          className="mt-1 p-2 border rounded w-full"
        >
          {destinos.map((destino) => (
            <option key={destino.id} value={destino.id}>
              {destino.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="people"
          className="block text-sm font-medium text-gray-700"
        >
          Cantidad de personas:
        </label>
        <input
          type="number"
          name="people"
          min={1}
          value={formData.people}
          onChange={handleInputChange}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="bg-gray-100 p-4 rounded-lg">
        <h1 className="text-2xl font-semibold mb-2">Factura Desglosada</h1>
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">Concepto</th>
              <th className="border px-4 py-2">Cantidad</th>
              <th className="border px-4 py-2">Precio Unitario</th>
              <th className="border px-4 py-2">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Destino: {destino.name}</td>
              <td className="border px-4 py-2">{formData.people}</td>
              <td className="border px-4 py-2">
                ${obtenerPrecio().toFixed(2)}
              </td>
              <td className="border px-4 py-2">${subTotal()}</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Impuestos por persona</td>
              <td className="border px-4 py-2">{destino.tax}%</td>
              <td className="border px-4 py-2">${impuestos()}</td>
              <td className="border px-4 py-2">
                ${(impuestos() * formData.people).toFixed(2)}
              </td>
            </tr>
            <tr>
              <td className="border px-4 py-2" colSpan="3">
                Total
              </td>
              <td className="border px-4 py-2">${total()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
