function render_display_task(task) {
    let height = document.scrollingElement.scrollTop - $("#task_rows").offset().top;
    height = Math.max(0, height + $(".navbar").outerHeight() + 5);
    $("#display_task").css("padding-top", height + "px");

    let src = "https://mdbootstrap.com/img/Photos/Others/photo8.jpg";
    if (task.image_hash)
        src = "task_images/" + task.id + "/" + task.image_hash;

    $("#display_task_title").text(task.title);
    $("#display_task_text").text(task.description);
    $("#display_task_info").text("$" + task.pay + " per hour, within " + task.days + " days.");
    $("#display_task_time").text("Created at: " + task.create_date);
    $("#display_task_image").attr("src", src)
}

function get_error_text(data, terms) {
    if (!terms) {
        return "Please accept terms and conditions.";
    }
    if (!data.title || data.title.length === 0) {
        return "Title cannot be empty!";
    }
    return undefined;
}

function initalize() {
    $("body").on("click", ".row", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const task_id = $(e.target).closest(".task_elem").attr("data-task-id");
        if (!task_id) return;

        data = { task_id };
        $.ajax({
            type: "GET",
            url: "getTask",
            data,
            success: (data) => {
                render_display_task(data);
                $("#display_task").show();
            },
            error: () => {
                $("#display_task").hide();
            },
            dataType: "json",
        });
    });

    $("#create_task").on("submit", (e) => {
        e.preventDefault();
        e.stopPropagation();

        const form_data = new FormData();

        const title = $("#create_task #title").val();
        const pay = parseInt($("#create_task .pay").val(), 10);
        const days = parseInt($("#create_task .days").val(), 10);
        const description = $("#create_task #description").val();
        const terms = $("#create_task #terms").prop('checked');
        const image = $("#create_task .image_upload");
        const data = { title, pay, days, description, image };

        const error_text = get_error_text(data, terms);
        if (error_text) {
            $("#form_failed p").html(error_text);
            $("#form_failed").show();
            return;
        }
        $("#form_failed").hide();

        function success() {
            window.location.href = '../'
        };
        function error() {
            $("#form_failed p").html("Failed!! Try again.");
            $("#form_failed").show();
        };
        
        for (const property in data) {
            form_data.append(property, data[property]);
        }

        $.ajax({
            url: "create",
            type: "POST",
            data: form_data,
            success,
            error,
            processData: false,
            contentType: false,
        });
    });
}
initalize();