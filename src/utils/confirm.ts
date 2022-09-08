import Swal, { SweetAlertOptions } from "sweetalert2";

const confirm = <T = unknown>(options: SweetAlertOptions<T>) => Swal.fire(options);

export default confirm;
