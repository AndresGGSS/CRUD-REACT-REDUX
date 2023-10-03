import { useDispatch } from "react-redux";
import { deleteProductAction, getProductEdit } from "../actions/productActions";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Product = ({ product }) => {
  const { nombre, precio, id } = product;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const confirmDeleteProduct = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, bórralo!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProductAction(id));
      }
    });
  };

  const redirectEdit = (product) => {
    dispatch(getProductEdit(product))
    navigate(`/products/edit/${product.id}`);
  };

  return (
    <tr>
      <td>{nombre}</td>
      <td>
        <span className="font-weight-bold">${precio}</span>
      </td>
      <td className="acciones">
        <button
          type="button"
          onClick={() => redirectEdit(product)}
          className="btn btn-primary mr-2"
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => confirmDeleteProduct(id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Product;
