let status = false;
let Data = [];
const socket = io();
const table = $('#pir-table').DataTable();
socket.on('success', () => {

    $('#alertMsg').css('display', 'none');
    $('#clientForm').trigger('reset');
    status = !status;
    let printStatus = status ? 'Security ON' : 'Security OFF';
    if (status) {
        $('#email-group').css('display', 'none');
        $('#status').css('color', 'lightgreen');
        $('#table-container').css('display', 'block')
    }
    else {
        $('#email-group').css('display', 'block');
        $('#status').css('color', 'lightcoral')
    }
    $('#status').text(printStatus);
})
socket.on('fail', () => {
    $('#alertMsg').css('display', 'block');
})

socket.on('emailtStatus', (info) => {
    let index = info.indexNum;
    Data[index][3] = info.status
    table.clear();
    table.rows.add(Data).draw(false);
    console.log(Data);
})
socket.on('motionDetected', (newdata) => {
    Data.push(newdata);
    table.clear();
    table.rows.add(Data).draw(false);
})

$('#clientForm').on('submit', (e) => {
    e.preventDefault();
    let result = $('#clientForm').serializeArray().reduce((obj, item) => {
        obj[item.name] = item.value;
        return obj;
    }, {});
    result.status = !status;
    socket.emit('formSubmit', result);
})



