var id = 0;
var pageNumber = 1;
var pageSize = 5;
var search = "";
function EditClick() {
    $('.btn-edit').click(function () {
        id = $(this).attr('data-id');
        var name = $(this).attr('data-name');
        var subjectid = $(this).attr('data-subjectid');
        var lecturerid = $(this).attr('data-lecturerid');
        var code = $(this).attr('data-code');
        var node = $(this).attr('data-node');
 
        $('.add-or-edit input[name="name"]').val(name);
        $('.add-or-edit input[name="code"]').val(code);
        $('.add-or-edit #subjectID').val(subjectid);
        $('.add-or-edit #lecturerID').val(lecturerid);
        $('.add-or-edit #node').val(node);

     
    })
}
EditClick();
GetListClass();
GetClass();
function GetClass() {
    $('.btn-detail').click(function () {
        id = $(this).attr('data-id');
        $.ajax({
            url: "/Class/InfoDetail",
            type: "POST",
            dataType: "html",
            data: {
                id: id,
            },
            beforeSend: function () {},
            success: function (res) {
                $('.modal-body').html('');
                $('.modal-body').append(res);
            },
            error: function () { },
            complete: function () { },
        })
    })
}
function GetListClass() {
    $.ajax({
        url: "/Class/ListClass",
        type: "POST",
        dataType: "html",
        data: {
            pageNumber: pageNumber,
            pageSize: pageSize,
            search: search,
        },
        beforeSend: function () {

        },
        success: function (res) {
            $('.list-class').html('');
            $('.list-class').append(res);
            EditClick();
            DeleteClass();
            Pagination();
            GetClass();
         
        },
        error: function () { },
        complete: function () { },
    })
}

function AddClass() {
    $('.btn-createEdit').click(function () {
       var name= $('.add-or-edit input[name="name"]').val();
       var code= $('.add-or-edit input[name="code"]').val();
      var subjectid=  $('.add-or-edit #subjectid').val();
     var lecturerid=$('.add-or-edit #lecturerid').val();
        var node=$('.add-or-edit #node').val();

        //if (Check(code, name, subjectid, lecturerid)) {
            $.ajax({
                url: "/Class/Create",
                type: "POST",
                dataType: "json",
                data: {
                    code: code,
                    name: name,
                    subjectID: subjectid,
                    lecturerID: lecturerid,
                    node: node,
                  

                },
                beforeSend: function () { },
                success: function (res) {

                    if (res) {
                        GetListClass();
                        DefaultValueInput();

                    }

                },
                error: function () { },
                complete: function () { },
            })
        
        
    })

}
AddClass();
function DefaultValueInput() {
    $('.btn-createEdit').click(function () {
        $('.add-or-edit input[name="name"]').val('');
        $('.add-or-edit input[name="code"]').val('');
        $('.add-or-edit #subjectID').val('');
        $('.add-or-edit #lecturerID').val('');
        $('.add-or-edit #node').val('');
     
    })
}
function Update() {
    $('.btn-update').click(function () {

        var name = $('.add-or-edit input[name="name"]').val();
        var code = $('.add-or-edit input[name="code"]').val();
        var subjectid = $('.add-or-edit #subjectID').val();
        var lecturerid = $('.add-or-edit #lecturerID').val();
        var node = $('.add-or-edit #node').val();

        $.ajax({
            url: "/Class/Update",
            type: "POST",
            dataType: "json",
            data: {
                id:id,
                code: code,
                name: name,
                subjectID: subjectid,
                lecturerID: lecturerid,
                node: node,

            },
            beforeSend: function () { },
            success: function (res) {

                if (res) {
                    GetListClass();
                    DefaultValueInput();
                }
            },
            error: function () { },
            complete: function () { },
        })
    })


}
Update();
function DeleteClass() {
    $('.btn-delete').click(function () {
        id = $(this).attr('data-id');
        debugger;
        $.ajax({
            url: "/Class/Delete",
            type: "POST",
            dataType: "json",

            data: {
                id: id
            },

            beforeSend: function () {

            },
            success: function (res) {

                if (res) {
                    GetListClass();
                    DefaultValueInput();
                }

            },
            error: function () { },
            complete: function () { },

        }
        )
    })
}
DeleteClass();
function Pagination() {
    $('.pagination button').click(function () {
        pageNumber = $(this).attr('data-page');
        GetListClass();
    })
}

Search();
function Search() {
    $('input[name="searchname"]').keyup(function () {
        search = $(this).val();
        GetListClass();
    })
}
function Check(code, name, subjectid, lecturerid) {
    if (code.trim() == '' || name.trim() == '' || subjectid.trim() == '' || lecturerid.trim() == '' ){
        $('.error').html('');
        $('.add-or-edit input').each(function () {
            if ($(this).val().trim() == '') {
                var name = $(this).siblings('label').text();
                var row = `<p> ${name} Không đc để trống!<p>`;
                $(this).siblings('.error').append(row);

            }
        })
        return false;
    }
    return true;
}

function Back() {
    $('.btn-back').click(function(){
        GetListClass();
    })
}