const ENDPOINT = "http://localhost:3000/"

const getCategorias = async () => {
    const response = await axios.get(`${ENDPOINT}categoria`)
    return response.data
}

const getCategoria = async (id) => {
    const response = await axios.get(`${ENDPOINT}categoria/${id}`)
    return response.data
}

const categoriaDelete = async (id) => {
    if (!confirm(`Are you sure you want to delete?`)) {
        return;
    }

    const categoria = await getCategoria(id);
    
    axios.delete(`${ENDPOINT}categorias/` + id)
        .then((response) => {
            Swal.fire(`Categoria '${categoria.id}' deletada`)
            loadTable();
        }, (error) => {
            Swal.fire(`Erro ao deletar a categoria ${error.response.data.error} `);
            loadTable();
            return;
        });

    Swal.fire(`Categoria '${categoria.id}' deletada`)
    loadTable();
};

const getTipos = async () => {
    const response = await axios.get(`${ENDPOINT}tipos`)
    return response.data
}
const loadTable = (sort, type) => {
    if (type)
    {
        axios.get(`${ENDPOINT}categorias?limit=1000&type=${type}&sort=${sort}`)
        .then((response) => {
            const data = response.data;
            var trHTML = '';
            data.forEach(element => {
                trHTML += '<tr>';
                trHTML += '<td>' + element.id + '</td>';
                trHTML += '<td>' + element.descricao + '</td>';
                trHTML += '<td>' + element.preco + '</td>';
                trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showCategoriaEditBox(' + element.id + ')">Edit</button>';
                trHTML += '<button type="button" class="btn btn-outline-danger" onclick="categoriaDelete(' + element.id + ')">Del</button></td>';
                trHTML += "</tr>";
            });
            document.getElementById("mytable").innerHTML = trHTML;
        })
    }
    else
    {
        axios.get(`${ENDPOINT}categoria?limit=1000&sort=${sort}`)
        .then((response) => {
            const data = response.data;
            var trHTML = '';
            data.forEach(element => {
                trHTML += '<tr>';
                trHTML += '<td>' + element.id + '</td>';
                trHTML += '<td>' + element.descricao + '</td>';
                trHTML += '<td>' + element.preco + '</td>';
                trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showCategoriaEditBox(' + element.id + ')">Edit</button>';
                trHTML += '<button type="button" class="btn btn-outline-danger" onclick="categoriaDelete(' + element.id + ')">Del</button></td>';
                trHTML += "</tr>";
            });
            document.getElementById("mytable").innerHTML = trHTML;
        })
    }
};
loadTable('id')

const getDate = async () => {
    const current = new Date();
    const cDate = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
    const cTime = `${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;
    const dateTime = `${cDate} ${cTime}`
    
    return dateTime;
}

const showIngressoCreateBox = async () => {
    const tipos = await getTipos()
    const categorias = await getCategorias()
    
    let tipoOptions = ``
    let categoriaOptions = ``

    for (const tipo of tipos)
    {
        tipoOptions += `<option value="${tipo.id}">${tipo.descricao}</option>`
    }
    for (const categoria of categorias){
        categoriaOptions += `<option value="${categoria.id}">${categoria.descricao}</option>`
    }

    document.addEventListener('input', (e) =>
    {
        createMask(e, 'data', '__/__/____')
    })

    const dateTime = await getDate()

    Swal.fire(
        {
            title: `Registrar Categoria`,
            html:
                `<form id="swal-form">` +
                    `<input name="data_criacao" type="hidden" value="${dateTime}" />` +
                    `</div>` +
                    `<div>` +
                        `<label>Categoria: </label>` +
                        `<input name="descricao" placeholder="descrição" />` +
                    `</div>` +
                    `<div>` +
                        `<label>Valor: </label>` +
                        `<input name="preco" placeholder="Preço em reais" />` +
                    `</div>` +
                `</form>`,
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: async () =>
            {
                try
                {
                    const form = document.getElementById('swal-form')
                    const data = await createNew('categorias', form)
    
                    successPopUp(`Sucesso`, `Ingresso registrado!`)
                }
                catch (error)
                {
                    console.log(error.response.data.error)
                    return false
                }
            }
        }
    )
}

const showCategoriaEditBox = async (id) => {
    const tipos = await getTipos()
    const categorias = await getCategorias()
    const ingresso = await getIngresso(id)

    console.log(ingresso)
    
    let tipoOptions = ``

    for (const tipo of tipos)
    {
        if (ingresso.Tipo.id === tipo.id)
        {
            tipoOptions += `<option selected value="${tipo.id}">${tipo.descricao}</option>`
        }
        else
        {
            tipoOptions += `<option value="${tipo.id}">${tipo.descricao}</option>`
        }
    }

    let categoriaOptions = ``

    for (const categoria of categorias)
    {
        if (ingresso.Categoria.id === categoria.id)
        {
            categoriaOptions += `<option selected value="${categoria.id}">${categoria.descricao}</option>`
        }
        else
        {
            categoriaOptions += `<option value="${categoria.id}">${categoria.descricao}</option>`
        }
    }


    // document.addEventListener('input', (e) =>
    // {
    //     createMask(e, 'data_vencimento', '__/__/____')
    // })

    // const getStatus = () =>
    // {
    //     if (ingresso.situacao === 'Criada')
    //     {
    //         return `<option selected value="Criada">Criada</option>` +
    //             `<option value="Fechada">Fechada</option>` +
    //             `<option value="Cancelada">Cancelada</option>` +
    //             `<option value="Fazendo">Fazendo</option>`
    //     }
    //     else if (ingresso.situacao === 'Fechada')
    //     {
    //         return `<option value="Criada">Criada</option>` +
    //             `<option selected value="Fechada">Fechada</option>` +
    //             `<option value="Cancelada">Cancelada</option>` +
    //             `<option value="Fazendo">Fazendo</option>`
    //     }
    //     else if (ingresso.situacao === 'Cancelada')
    //     {
    //         return `<option value="Criada">Criada</option>` +
    //             `<option value="Fechada">Fechada</option>` +
    //             `<option selected value="Cancelada">Cancelada</option>` +
    //             `<option value="Fazendo">Fazendo</option>`
    //     }
    //     else if (ingresso.situacao === 'Fazendo')
    //     {
    //         return `<option value="Criada">Criada</option>` +
    //             `<option value="Fechada">Fechada</option>` +
    //             `<option value="Cancelada">Cancelada</option>` +
    //             `<option selected value="Fazendo">Fazendo</option>`
    //     }
    // }

    Swal.fire(
        {
            title: `Editar Categoria`,
            html:
                `<form id="swal-form">` +
                    `<input name="id" type="hidden" value="${categoria.id}" />` +
                    `<input name="data" type="hidden" value="${ingresso.data}" />` +
                    `<div>` +
                        `<label>Categoria: </label>` +
                        `<input name="descricao" placeholder="descrição" />` +
                    `</div>` +
                    `<div>` +
                        `<label>Valor: </label>` +
                        `<input name="preco" placeholder="Preço em reais" />` +
                    `</div>` +
                `</form>`,
            focusConfirm: false,
            showCancelButton: true,
            preConfirm: async () =>
            {
                try
                {
                    const form = document.getElementById('swal-form')
                    const data = await edit('ingressos', form)
    
                    successPopUp(`Sucesso`, `Ingresso registrado!`)
                }
                catch (error)
                {
                    console.log(error.response.data.error)
                    return false
                }
            }
        }
    )
}
const showFiltreTypeBox = async () => {
    const tipos = await getTipos()
    let tipoOptions = ``

    for (const tipo of tipos)
    {
        {
            tipoOptions += `<option value="${tipo.id}">${tipo.descricao}</option>`
        }
    }

    const categorias = await getCategorias()
    let categoriaOptions = ``

    for (const categoria of categorias)
    {
        {
            categoriaOptions += `<option value="${categoria.id}">${categoria.descricao}</option>`
        }
    }

    Swal.fire(
        {
            title: 'Filtrar ingressos',
            html: 
                `<form id="swal-form">`+
                    `<div>`+
                        `<label>Filtrar por id:</label>`+
                        `<br/>`+
                        `<select id="id" name="id">`+
                            `<option value="id">ID</option>`+
                        `</select>`+
                    `</div>`+
                    `<div>`+
                        `<label>Filtrar por tipo:</label>`+
                        `<br/>`+
                        `<select id="filtre" name="tipo_id">`+
                            `<option value="all">All</option>`+
                            `${tipoOptions}`+
                        `</select>`+
                    `</div>`+
                    `<div>`+
                        `<label>Filtrar por categoria:</label>`+
                        `<br/>`+
                        `<select id="filtre" name="categoria_id">`+
                            `<option value="all">All</option>`+
                            `${categoriaOptions}`+
                        `</select>`+
                    `</div>`+
                    
                `</form>`
        }
    ).then((result) =>
    {
        if (result.isConfirmed)
        {
            const id = document.getElementById('id').value
            const tipo = document.getElementById('filtre').value
            if (tipo === 'all')
            {
                loadTable(id)
            }
            else
            {
                loadTable(id, tipo)
            }
        }
    })
    
}



const successPopUp = (title, text) =>
{
    Swal.fire(
        {
            icon: 'success',
            title: title,
            text: text,
            timer: 3000,
            timerProgressBar: true,
            customClass: 'popUp'
        }
    )
    .then(() =>
    {
        window.location.reload()
    })
}

const createMask = (e, name, maskExample) =>
{
    if (e.target.name === name)
    {
        let number = e.target.value.replace(/[^\d]/g, '')
  
        if (!number.length)
        {
            e.target.value = ''
            return
        }
            
        let mask = maskExample
            
        number = number.split('')
            
        let output = ''
        let char, index

        for(index in mask)
        {
            const i = Number(index)

            char = mask[i] === '_' ? number.shift() : mask[i]
            output += char
                
            if (number.length === 0) break
        }
        e.target.value = output
    }
}

const createNew = async (path, form) =>
{
    const attributes = await getFormData(form)
    const [id, newObj] = await getObj(attributes)
    
    const result = await axios.post(`${ENDPOINT}categorias`, newObj)
    
    return result.data
}

const edit = async (path, form) =>
{
    const attributes = await getFormData(form)
    const [id, newObj] = await getObj(attributes)
    
    const result = await axios.put(`${ENDPOINT}${path}/${id}`, newObj)
    
    return result.data
}

const getObj = async (attributes) =>
{
    const Obj = {}
    let id = 0

    for (const attribute of attributes)
    {
        if (attribute[0] !== 'id')
        {
            if (attribute[0] === 'data' || attribute[0] === 'data_vencimento')
            {
                Obj[attribute[0]] = attribute[1].toString().split('/').reverse().join('-')
            }
            else
            {
                Obj[attribute[0]] = attribute[1]
            }
        }
        else
        {
            id = Number(attribute[1])
        }
    }

    return [id, Obj]
}

const getFormData = async (form) =>
{
    const formData = new FormData(form)

    let pairs = []
    
    for (const pair of formData.entries())
    {
        pairs.push(pair)
    }
    
    return pairs
}

// const sendEmail = async (email, id) => {
//     const ingresso = await getIngresso(id);

//     var nodemailer = require('nodemailer');
//     let email_user = '';
//     let email_pass = '';
//     let email_to = email;
//     let email_subject = 'ingresso';
//     let email_content = `${ingresso.descricao}`;

//     var transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: email_user,
//         pass: email_pass
//       }
//     });

//     var mailOptions = {
//       from: email_user,
//       to: email_to,
//       subject: email_subject,
//       text: email_content,
//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log('Error: ' + error);
//       }
//       else {
//         console.log('Email sent: ' + info.response);
//       };
//     });
//   }