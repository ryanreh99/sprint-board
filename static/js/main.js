const MIN_TWO_COLUMN_WIDTH = 992

function render_display_task(task) {
    if ($(window).width() >= MIN_TWO_COLUMN_WIDTH) {
        let height = document.scrollingElement.scrollTop - $("#task_rows").offset().top;
        height = Math.max(0, height + $(".navbar").outerHeight() + 5);
        $("#display_task").css("padding-top", height + "px");
    }

    let src = "https://mdbootstrap.com/img/Photos/Others/photo8.jpg";
    if (task.image_hash)
        src = "task_images/" + task.id + "/" + task.image_hash;

    $("#display_task_title").text(task.title);
    $("#display_task_text").text(task.description);
    $("#display_task_info").text("$" + task.pay + " per hour, within " + task.days + " days.");
    $("#display_task_time").text("Created at: " + task.create_date);
    $("#display_task_creator").text("By: " + task.creator);
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

        $.ajax({
            type: "GET",
            url: "tasks/" + task_id,
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

        const error_block = $("#form_failed");
        const error_region = error_block.find("p");
        const error_text = get_error_text(data, terms);
        if (error_text) {
            error_region.html(error_text);
            error_block.show();
            return;
        }
        error_block.hide();

        success = () => {
            window.location.href = '../'
        };
        error = (data) => {
            console.log(data.responseJSON);
            error_region.html("Failed!! Try again.");
            error_region.append($("<p></p>").text(data.responseText));
            error_block.show();
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