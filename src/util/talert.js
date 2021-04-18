export async function Alert(msg) {
    await Swal.fire({ text: msg, confirmButtonText: 'OK', buttonsStyling: true });
}

export async function projectAlert(value) {
    const isEdit = (value && value != '');
    let html = `<input type="text" id="pname" class="swal2-input" placeholder="project name">`;
    if (isEdit) {
        html = `<input type="text" id="pname" class="swal2-input" value="${value}" placeholder="project name">`;
    }

    const res = await Swal.fire({
        title: (isEdit ? 'Edit project' : 'Create a new project'),
        html,
        confirmButtonText: (isEdit ? 'Save' : 'Create'),
        cancelButtonText: 'Cancel',
        showCancelButton: true,
        focusConfirm: false,
        preConfirm: () => {
            const title = Swal.getPopup().querySelector('#pname').value;
            if (!title) {
              Swal.showValidationMessage(`Please enter project name.`);
            }
            return { title }
        }
    });

    if (res.isConfirmed) {
        return res.value.title;
    }

    return '';
}

export async function taskAlert(value) {
    let html = `<input type="text" id="pname" class="swal2-input" value="${value}" placeholder="task description">`;
    const res = await Swal.fire({
        title: 'Edit task',
        html,
        confirmButtonText: 'Save',
        cancelButtonText: 'Cancel',
        showCancelButton: true,
        focusConfirm: false,
        preConfirm: () => {
            const title = Swal.getPopup().querySelector('#pname').value;
            if (!title) {
              Swal.showValidationMessage(`Please enter task description.`);
            }
            return { title }
        }
    });

    if (res.isConfirmed) {
        return res.value.title;
    }

    return '';
}


export async function Confirm(msg, fn) {
    let res = await Swal.fire({ text: msg, showCancelButton: true, confirmButtonText: 'Yes', cancelButtonText: 'No', buttonsStyling: true });
    if (res.value) {fn();}
}
