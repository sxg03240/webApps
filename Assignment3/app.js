$(document).ready(function() {
    $('a').click(function(e) {
        e.preventDefault();
        var dept_id = $(this).data('dept-id');
        console.log(dept_id)
        window.location.href = 'table.php?id=' + dept_id;
    });
});
